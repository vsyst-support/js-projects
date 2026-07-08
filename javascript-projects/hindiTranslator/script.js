(() => {
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  const convertBtn = document.getElementById('convertBtn');
  const copyBtn = document.getElementById('copyBtn');
  const clearBtn = document.getElementById('clearBtn');
  const liveToggle = document.getElementById('liveToggle');
  const charCount = document.getElementById('charCount');
  const detected = document.getElementById('detected');
  const toast = document.getElementById('toast');

  let mode = 'auto';
  let debounceTimer = null;
  let requestSeq = 0; // guards against out-of-order async responses

  // Common Hinglish / romanized-Hindi function words used for auto-detection.
  const HINGLISH_WORDS = new Set([
    'hai','hain','ho','hoon','hun','tha','thi','the','hoga','hogi','honge',
    'mera','meri','mere','tera','teri','tere','uska','uski','uske','apna','apni','apne',
    'main','mai','mein','me','tum','tu','aap','hum','ham','woh','wo','yeh','ye','vah',
    'kya','kyu','kyun','kyon','kaise','kaisa','kaisi','kab','kahan','kaha','kaun','kitna','kitni',
    'nahi','nahin','na','mat','haan','han','ji','bhi','hi','to','toh','ab','phir','fir',
    'aur','ya','lekin','magar','par','se','ko','ka','ki','ke','pe','par','tak','liye',
    'kar','karo','karna','karta','karti','karte','raha','rahi','rahe','gaya','gayi','gaye',
    'chahiye','sakta','sakti','sakte','wala','wali','wale','vala','achha','accha','acha',
    'bahut','bohot','thoda','zyada','jyada','sab','kuch','kuchh','koi','abhi','kal','aaj',
    'bhai','yaar','yar','arre','are','bas','matlab','samajh','pata','dekho','suno','chalo',
    'ghar','paani','pani','khana','naam','baat','din','raat','log','dost','pyaar','pyar','dil'
  ]);

  function detectHinglish(text) {
    const words = text.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);
    if (!words.length) return false;
    const hits = words.filter(w => HINGLISH_WORDS.has(w)).length;
    // One strong hit in a short phrase, or ≥15% density in longer text.
    return words.length <= 4 ? hits >= 1 : hits / words.length >= 0.15;
  }

  // --- Engines -------------------------------------------------------------

  // Hinglish → Hindi via Google Input Tools transliteration.
  async function transliterate(text) {
    const lines = text.split('\n');
    const results = [];
    for (const line of lines) {
      if (!line.trim()) { results.push(line); continue; }
      const url = 'https://inputtools.google.com/request?itc=hi-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&text=' + encodeURIComponent(line);
      const res = await fetch(url);
      if (!res.ok) throw new Error('Transliteration service returned ' + res.status);
      const data = await res.json();
      if (data[0] !== 'SUCCESS') throw new Error('Transliteration failed');
      results.push(data[1]?.[0]?.[1]?.[0] ?? line);
    }
    return results.join('\n');
  }

  // English → Hindi via Google Translate public endpoint.
  async function translate(text) {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=hi&dt=t&q=' + encodeURIComponent(text);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Translation service returned ' + res.status);
    const data = await res.json();
    return (data[0] || []).map(seg => seg[0]).join('');
  }

  // --- Unicode → Kruti Dev transcoding ---------------------------------------
  // Kruti Dev 011 is a legacy (non-Unicode) font: it draws Devanagari glyphs at
  // ASCII positions, so Unicode Hindi must be transcoded before display.

  // Ordered: ASCII punctuation first (Kruti reuses those codes for letters, and
  // later rules emit ASCII), then conjuncts before their sub-sequences.
  const KRUTI_MAP = [
    ['?', '\\'], ['-', '&'], ['.', '-'], [',', ']'], [':', '%'],
    ['"', 'ß'], ["'", '^'], ['(', '¼'], [')', '½'], ['{', '¿'], ['}', 'À'], ['=', '¾'],
    ['क़', 'd+'], ['ख़', '[k+'], ['ग़', 'x+'], ['ज़', 't+'], ['ड़', 'M+'], ['ढ़', '<+'], ['फ़', 'Q+'],
    ['क्ष्', '{'], ['क्ष', '{k'], ['त्र्', '«'], ['त्र', '='], ['ज्ञ', 'K'], ['श्र', 'J'],
    ['द्ध', ')'], ['द्व', '}'], ['द्य', '|'], ['द्द', 'í'], ['दृ', 'n`'], ['द्र', 'nz'],
    ['ट्ट', 'ê'], ['ट्ठ', 'ë'], ['ड्ड', 'ì'], ['ड्ढ', 'ï'],
    ['ट्र', 'Vª'], ['ड्र', 'Mª'], ['ढ्र', '<ª'], ['क्र', 'Ø'], ['फ्र', 'Ý'],
    ['ह्न', 'à'], ['ह्य', 'á'], ['हृ', 'â'], ['ह्म', 'ã'], ['ह्र', 'ä'],
    ['रु', ':'], ['रू', '#'],
    ['्र', 'z'],
    ['क्', 'D'], ['ख्', '['], ['ग्', 'X'], ['घ्', '?'], ['ङ्', '³~'],
    ['च्', 'P'], ['ज्', 'T'], ['झ्', '>'], ['ञ्', '¥~'],
    ['ट्', 'V~'], ['ठ्', 'B~'], ['ड्', 'M~'], ['ढ्', '<~'], ['ण्', '.'],
    ['त्', 'R'], ['थ्', 'F'], ['द्', 'n~'], ['ध्', '/'], ['न्', 'U'],
    ['प्', 'I'], ['फ्', '¶'], ['ब्', 'C'], ['भ्', 'H'], ['म्', 'E'],
    ['य्', '¸'], ['ल्', 'Y'], ['व्', 'O'], ['श्', "'"], ['ष्', '"'], ['स्', 'L'], ['ह्', 'º'],
    ['ओ', 'vks'], ['औ', 'vkS'], ['आ', 'vk'], ['ऑ', 'vkW'], ['अ', 'v'],
    ['ई', 'bZ'], ['इ', 'b'], ['ऊ', 'Å'], ['उ', 'm'], ['ऋ', '_'], ['ऐ', ',s'], ['ए', ','],
    ['ो', 'ks'], ['ौ', 'kS'], ['ॉ', 'kW'], ['ा', 'k'], ['ी', 'h'], ['ु', 'q'], ['ू', 'w'],
    ['ृ', '`'], ['े', 's'], ['ै', 'S'], ['ं', 'a'], ['ँ', '¡'], ['ः', '%'], ['़', '+'], ['्', '~'],
    ['क', 'd'], ['ख', '[k'], ['ग', 'x'], ['घ', '?k'], ['ङ', '³'],
    ['च', 'p'], ['छ', 'N'], ['ज', 't'], ['झ', '>k'], ['ञ', '¥'],
    ['ट', 'V'], ['ठ', 'B'], ['ड', 'M'], ['ढ', '<'], ['ण', '.k'],
    ['त', 'r'], ['थ', 'Fk'], ['द', 'n'], ['ध', '/k'], ['न', 'u'],
    ['प', 'i'], ['फ', 'Q'], ['ब', 'c'], ['भ', 'Hk'], ['म', 'e'],
    ['य', ';'], ['र', 'j'], ['ल', 'y'], ['ळ', 'G'], ['व', 'o'],
    ['श', "'k"], ['ष', '"k'], ['स', 'l'], ['ह', 'g'],
    ['।', 'A'], ['॥', 'AA'], ['ॐ', '¬'],
    // Numbers always come out as English digits, whatever the input used.
    ['०', '0'], ['१', '1'], ['२', '2'], ['३', '3'], ['४', '4'],
    ['५', '5'], ['६', '6'], ['७', '7'], ['८', '8'], ['९', '9']
  ];

  const CONS = 'क-ह\\u0958-\\u095F';
  const CLUSTER = '[' + CONS + ']़?(?:्[' + CONS + ']़?)*';
  const I_MOVE = new RegExp('(' + CLUSTER + ')ि', 'g');
  // Reph: र् renders as a mark ('Z') AFTER the cluster and its vowel matras.
  const REPH = new RegExp('र्(' + CLUSTER + '[ाीुूृेैोौ]*)', 'g');

  function toKrutiDev(text) {
    text = text.replace(/[​-‍]/g, '');
    text = text.replace(I_MOVE, 'f$1'); // chhoti-i matra precedes its cluster
    text = text.replace(REPH, '$1Z');
    for (const [u, k] of KRUTI_MAP) text = text.split(u).join(k);
    return text;
  }

  // Inverse table (Kruti code → Unicode) for copying real Hindi out of the
  // Kruti-encoded pane. Longest codes first; where two sources share a code the
  // later (Devanagari) one wins; digits are skipped so numerals stay Devanagari.
  // Applied in a single regex pass so one replacement's output can never be
  // re-consumed by a later rule.
  const UNI_PAIRS = (() => {
    const m = new Map();
    for (const [u, k] of KRUTI_MAP) {
      if (/^[0-9]$/.test(k)) continue; // English digits stay English on copy
      m.set(k, u);
    }
    return [...m.entries()].sort((a, b) => b[0].length - a[0].length);
  })();
  const UNI_LOOKUP = new Map(UNI_PAIRS);
  const UNI_RE = new RegExp(
    UNI_PAIRS.map(([k]) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');

  function krutiToUnicode(text) {
    text = text.replace(UNI_RE, s => UNI_LOOKUP.get(s));
    // 'f' (chhoti-i) moves back after its cluster; 'Z' (reph) back before it.
    text = text.replace(new RegExp('f(' + CLUSTER + ')', 'g'), '$1ि');
    text = text.replace(new RegExp('(' + CLUSTER + '[ािीुूृेैोौ]*)Z', 'g'), 'र्$1');
    return text;
  }

  let krutiFontChecked = false;
  function warnIfKrutiMissing() {
    if (krutiFontChecked) return;
    krutiFontChecked = true;
    try {
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = '32px monospace';
      const base = ctx.measureText('vkbZ eSa').width;
      ctx.font = '32px "Kruti Dev 011", "Kruti Dev 010", monospace';
      if (ctx.measureText('vkbZ eSa').width === base) {
        showToast('⚠ Kruti Dev 011 font is not installed on this computer');
      }
    } catch {}
  }

  // --- UI ------------------------------------------------------------------

  function setOutput(text, cls) {
    output.className = 'output' + (cls ? ' ' + cls : '');
    output.textContent = text;
    // Editable only when holding a real conversion, not a placeholder/error.
    output.contentEditable = cls ? 'false' : 'true';
  }

  // Re-converting used to rebuild the output as plain text, wiping WYSIWYG
  // formatting. Instead, keep the formatted DOM for the unchanged prefix of
  // the text and replace only from the first changed character onward.
  function updateOutputPreservingFormat(newText) {
    const oldText = output.textContent;
    if (newText === oldText) return;
    let L = 0;
    const max = Math.min(oldText.length, newText.length);
    while (L < max && oldText[L] === newText[L]) L++;

    const walker = document.createTreeWalker(output, NodeFilter.SHOW_TEXT);
    let pos = 0, node, splitNode = null, splitOffset = 0;
    while ((node = walker.nextNode())) {
      const len = node.textContent.length;
      if (pos + len >= L) { splitNode = node; splitOffset = L - pos; break; }
      pos += len;
    }
    if (splitNode) {
      splitNode.textContent = splitNode.textContent.slice(0, splitOffset);
      const range = document.createRange();
      range.setStartAfter(splitNode);
      range.setEnd(output, output.childNodes.length);
      range.deleteContents();
    }
    output.appendChild(document.createTextNode(newText.slice(L)));
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1600);
  }

  async function convert() {
    const text = input.value.trim();
    detected.textContent = '';
    if (!text) {
      setOutput('Hindi output will appear here…', 'empty');
      return;
    }
    const seq = ++requestSeq;
    convertBtn.disabled = true;
    // If the pane already holds a (possibly formatted) conversion, keep it on
    // screen while converting instead of replacing it with a placeholder.
    const preserving = outputHasText();
    if (preserving) output.style.opacity = '0.6';
    else setOutput('Converting…', 'loading');
    try {
      let useHinglish = mode === 'hinglish' || (mode === 'auto' && detectHinglish(text));
      const result = useHinglish ? await transliterate(text) : await translate(text);
      if (seq !== requestSeq) return; // a newer request superseded this one
      const kruti = toKrutiDev(result) || '—';
      if (preserving) updateOutputPreservingFormat(kruti);
      else setOutput(kruti);
      if (paraSpacing > 0) ensureBlockLines();
      warnIfKrutiMissing();
      if (mode === 'auto') {
        detected.textContent = useHinglish
          ? 'Detected: Hinglish (transliterated)'
          : 'Detected: English (translated)';
      }
    } catch (err) {
      if (seq !== requestSeq) return;
      setOutput('Could not reach the conversion service. Check your internet connection and try again.\n\n(' + err.message + ')', 'error');
    } finally {
      if (seq === requestSeq) {
        convertBtn.disabled = false;
        output.style.opacity = '';
      }
    }
  }

  function scheduleLiveConvert() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(convert, 500);
  }

  input.addEventListener('input', () => {
    charCount.textContent = input.value.length;
    if (liveToggle.checked) scheduleLiveConvert();
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); convert(); }
  });

  convertBtn.addEventListener('click', convert);

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.mode;
      if (input.value.trim()) convert();
    });
  });

  // Copies Unicode Devanagari (readable anywhere), not the raw Kruti codes,
  // plus an HTML flavor so formatting survives pasting into Word/Docs/Gmail.
  copyBtn.addEventListener('click', async () => {
    if (output.classList.contains('empty') || output.classList.contains('error') || output.classList.contains('loading')) return;
    // innerText (not textContent) keeps line breaks from block-line paragraphs.
    const plain = krutiToUnicode(output.innerText);
    try {
      const tmp = document.createElement('div');
      tmp.innerHTML = output.innerHTML;
      const walker = document.createTreeWalker(tmp, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) n.textContent = krutiToUnicode(n.textContent);
      const html = '<div style="font-family:\'Nirmala UI\',\'Mangal\',sans-serif;">' +
        tmp.innerHTML.replace(/\n/g, '<br>') + '</div>';
      await navigator.clipboard.write([new ClipboardItem({
        'text/plain': new Blob([plain], { type: 'text/plain' }),
        'text/html': new Blob([html], { type: 'text/html' })
      })]);
      showToast('Hindi text copied ✓');
    } catch {
      try {
        await navigator.clipboard.writeText(plain);
        showToast('Hindi text copied ✓');
      } catch {
        showToast('Copy failed — select the text manually');
      }
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    charCount.textContent = '0';
    detected.textContent = '';
    setOutput('Hindi output will appear here…', 'empty');
    input.focus();
  });

  // --- Font size (Word-style A− / A+) ---------------------------------------

  const fontDecBtn = document.getElementById('fontDecBtn');
  const fontIncBtn = document.getElementById('fontIncBtn');
  const fontSizeVal = document.getElementById('fontSizeVal');
  const FONT_MIN = 12, FONT_MAX = 36, FONT_DEFAULT = 17;

  let fontSize = parseInt(localStorage.getItem('hindiConverterFontSize'), 10);
  if (!(fontSize >= FONT_MIN && fontSize <= FONT_MAX)) fontSize = FONT_DEFAULT;

  function applyFontSize() {
    document.documentElement.style.setProperty('--text-size', fontSize + 'px');
    fontSizeVal.textContent = fontSize;
    fontDecBtn.disabled = fontSize <= FONT_MIN;
    fontIncBtn.disabled = fontSize >= FONT_MAX;
    localStorage.setItem('hindiConverterFontSize', fontSize);
  }

  fontDecBtn.addEventListener('click', () => { fontSize = Math.max(FONT_MIN, fontSize - 1); applyFontSize(); });
  fontIncBtn.addEventListener('click', () => { fontSize = Math.min(FONT_MAX, fontSize + 1); applyFontSize(); });
  applyFontSize();

  // --- WYSIWYG formatting tools ----------------------------------------------
  // The output pane is contenteditable once it holds a conversion; the toolbar
  // formats the current selection (or the whole text if nothing is selected).

  const FMT_COMMANDS = {
    boldBtn: 'bold',
    italicBtn: 'italic',
    underlineBtn: 'underline',
    strikeBtn: 'strikeThrough',
    subBtn: 'subscript',
    supBtn: 'superscript',
    alignLeftBtn: 'justifyLeft',
    alignCenterBtn: 'justifyCenter',
    alignRightBtn: 'justifyRight',
    alignJustifyBtn: 'justifyFull',
    clearFmtBtn: 'removeFormat'
  };

  function outputHasText() {
    return !(output.classList.contains('empty') || output.classList.contains('error') || output.classList.contains('loading'));
  }

  function ensureSelectionInOutput() {
    const sel = window.getSelection();
    if (!sel.rangeCount || !output.contains(sel.getRangeAt(0).commonAncestorContainer)) {
      const range = document.createRange();
      range.selectNodeContents(output);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  function runFmt(cmd) {
    if (!outputHasText()) { showToast('Convert some text first'); return; }
    output.focus();
    ensureSelectionInOutput();
    document.execCommand(cmd, false, null);
    updateFmtStates();
  }

  Object.keys(FMT_COMMANDS).forEach(id => {
    const btn = document.getElementById(id);
    // mousedown+preventDefault keeps the click from stealing the text selection
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', () => runFmt(FMT_COMMANDS[id]));
  });

  function updateFmtStates() {
    const sel = window.getSelection();
    const inside = sel.rangeCount > 0 && output.contains(sel.getRangeAt(0).commonAncestorContainer);
    for (const [id, cmd] of Object.entries(FMT_COMMANDS)) {
      if (cmd === 'removeFormat') continue;
      let on = false;
      if (inside) { try { on = document.queryCommandState(cmd); } catch {} }
      document.getElementById(id).classList.toggle('active', on);
    }
  }
  document.addEventListener('selectionchange', updateFmtStates);

  // --- Line & paragraph spacing tool ---------------------------------------------

  const lsBtn = document.getElementById('lsBtn');
  const lsMenu = document.getElementById('lsMenu');
  let lineSpacing = parseFloat(localStorage.getItem('hindiConverterLineSpacing'));
  if (!(lineSpacing >= 1 && lineSpacing <= 3)) lineSpacing = 1.7;
  let paraSpacing = parseInt(localStorage.getItem('hindiConverterParaSpacing'), 10);
  if (!(paraSpacing >= 0)) paraSpacing = 0;

  // Paragraph spacing needs block lines: plain "\n" text can't take margins,
  // so loose newline-separated lines are wrapped into one <div> per line
  // (keeping inline formatting; blank lines become empty paragraphs).
  function ensureBlockLines() {
    if (!outputHasText()) return;
    const loose = Array.from(output.childNodes).some(n => n.nodeType === 3 && n.textContent.includes('\n'));
    if (!loose) return;
    const frag = document.createDocumentFragment();
    while (output.firstChild) frag.appendChild(output.firstChild);
    const lines = [[]];
    Array.from(frag.childNodes).forEach(child => {
      if (child.nodeType === 3 && child.textContent.includes('\n')) {
        child.textContent.split('\n').forEach((part, i) => {
          if (i > 0) lines.push([]);
          if (part) lines[lines.length - 1].push(document.createTextNode(part));
        });
      } else {
        lines[lines.length - 1].push(child);
      }
    });
    lines.forEach(nodes => {
      const div = document.createElement('div');
      if (nodes.length) nodes.forEach(n => div.appendChild(n));
      else div.appendChild(document.createElement('br'));
      output.appendChild(div);
    });
  }

  function applySpacing() {
    document.documentElement.style.setProperty('--line-height', lineSpacing);
    document.documentElement.style.setProperty('--para-gap', paraSpacing + 'px');
    lsMenu.querySelectorAll('[data-line]').forEach(b =>
      b.classList.toggle('active', parseFloat(b.dataset.line) === lineSpacing));
    lsMenu.querySelectorAll('[data-para]').forEach(b =>
      b.classList.toggle('active', parseInt(b.dataset.para, 10) === paraSpacing));
    localStorage.setItem('hindiConverterLineSpacing', lineSpacing);
    localStorage.setItem('hindiConverterParaSpacing', paraSpacing);
    if (paraSpacing > 0) ensureBlockLines();
  }

  lsBtn.addEventListener('mousedown', e => e.preventDefault());
  lsBtn.addEventListener('click', () => { lsMenu.hidden = !lsMenu.hidden; });

  lsMenu.querySelectorAll('.bd-item').forEach(b => {
    b.addEventListener('mousedown', e => e.preventDefault());
    b.addEventListener('click', () => {
      if (b.dataset.line) lineSpacing = parseFloat(b.dataset.line);
      else paraSpacing = parseInt(b.dataset.para, 10);
      applySpacing();
      lsMenu.hidden = true;
    });
  });

  applySpacing();

  // --- Color tools: highlight + font color (Word-style split buttons) ---------

  // Highlighted spans get dark text inline so they stay readable in dark mode
  // (and in the white-page PDF). data-auto-ink marks colors this code set
  // itself, so it never overwrites a font color the user chose explicitly.
  function normalizeHighlights() {
    // Also visit [data-auto-ink] spans whose background was removed entirely
    // (e.g. by "No color"), so the auto-set dark ink is reverted with it.
    output.querySelectorAll('[style*="background"], [data-auto-ink]').forEach(sp => {
      const bg = sp.style.backgroundColor;
      const hasBg = bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)';
      if (hasBg) {
        if (!sp.style.color || sp.dataset.autoInk === '1') {
          sp.style.color = '#1f2430';
          sp.dataset.autoInk = '1';
        }
      } else if (sp.dataset.autoInk === '1') {
        sp.style.color = '';
        delete sp.dataset.autoInk;
      }
    });
  }

  function prepareFmtSelection() {
    if (!outputHasText()) { showToast('Convert some text first'); return false; }
    output.focus();
    ensureSelectionInOutput();
    document.execCommand('styleWithCSS', false, true);
    return true;
  }

  function applyHighlight(color) {
    if (!prepareFmtSelection()) return;
    if (!document.execCommand('hiliteColor', false, color)) {
      document.execCommand('backColor', false, color);
    }
    normalizeHighlights();
  }

  function applyFontColor(color) {
    if (!prepareFmtSelection()) return;
    if (color === 'auto') {
      // "Automatic" = remove the inline color: paint a sentinel color, then
      // strip it, so the text follows the theme (and stays dark in the PDF).
      document.execCommand('foreColor', false, '#010203');
      output.querySelectorAll('[style*="color"]').forEach(sp => {
        if (sp.style.color === 'rgb(1, 2, 3)') sp.style.color = '';
      });
    } else {
      document.execCommand('foreColor', false, color);
      // A user-chosen color on a highlighted span outranks the auto dark ink.
      output.querySelectorAll('[data-auto-ink]').forEach(sp => {
        if (sp.style.color && sp.style.color !== 'rgb(31, 36, 48)') delete sp.dataset.autoInk;
      });
    }
    normalizeHighlights();
  }

  function setupColorTool({ btnId, arrowId, paletteId, swatchId, customId, storageKey, defaultColor, apply }) {
    const btn = document.getElementById(btnId);
    // With an arrow: split button (main click applies, arrow opens palette).
    // Without: the main button opens the palette directly.
    const arrowBtn = arrowId ? document.getElementById(arrowId) : null;
    const palette = document.getElementById(paletteId);
    const swatch = document.getElementById(swatchId);
    const customInput = document.getElementById(customId);
    let current = localStorage.getItem(storageKey) || defaultColor;
    let savedRange = null;
    swatch.style.background = current;

    const setCurrent = c => {
      current = c;
      swatch.style.background = c;
      localStorage.setItem(storageKey, c);
    };

    const togglePalette = () => {
      palette.hidden = !palette.hidden;
      if (!palette.hidden && /^#/.test(current)) customInput.value = current;
    };

    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', () => (arrowBtn ? apply(current) : togglePalette()));

    if (arrowBtn) {
      arrowBtn.addEventListener('mousedown', e => e.preventDefault());
      arrowBtn.addEventListener('click', togglePalette);
    }

    palette.querySelectorAll('[data-color]').forEach(b => {
      b.addEventListener('mousedown', e => e.preventDefault());
      b.addEventListener('click', () => {
        const color = b.dataset.color;
        if (/^#/.test(color)) setCurrent(color);
        apply(color);
        palette.hidden = true;
      });
    });

    // The native picker dialog steals focus from the output pane, so the
    // selection is saved before it opens and restored after. The handler sits
    // on the whole "More colors…" label — clicking its text must save (and
    // not collapse) the selection just like clicking the color square itself.
    const customLabel = customInput.closest('label') || customInput;
    customLabel.addEventListener('mousedown', e => {
      e.preventDefault();
      const sel = window.getSelection();
      savedRange = (sel.rangeCount && output.contains(sel.getRangeAt(0).commonAncestorContainer))
        ? sel.getRangeAt(0).cloneRange()
        : null;
    });
    customInput.addEventListener('change', () => {
      setCurrent(customInput.value);
      output.focus();
      if (savedRange) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange);
        savedRange = null;
      }
      apply(current);
      palette.hidden = true;
    });
  }

  setupColorTool({
    btnId: 'hlBtn', paletteId: 'hlPalette', swatchId: 'hlSwatch',
    customId: 'hlCustomInput', storageKey: 'hindiConverterHlColor', defaultColor: '#fff176',
    apply: applyHighlight
  });
  setupColorTool({
    btnId: 'fcBtn', paletteId: 'fcPalette', swatchId: 'fcSwatch',
    customId: 'fcCustomInput', storageKey: 'hindiConverterFontColor', defaultColor: '#d32f2f',
    apply: applyFontColor
  });

  // --- Border tool -------------------------------------------------------------
  // No execCommand exists for borders, so the selection is wrapped in a span
  // carrying the border style. currentColor keeps it theme- and PDF-friendly.

  const BORDER_STYLES = {
    box: { border: '1.5px solid currentColor', padding: '1px 4px', borderRadius: '3px' },
    top: { borderTop: '1.5px solid currentColor' },
    bottom: { borderBottom: '1.5px solid currentColor' },
    left: { borderLeft: '1.5px solid currentColor', paddingLeft: '4px' },
    right: { borderRight: '1.5px solid currentColor', paddingRight: '4px' }
  };

  function applyBorder(type) {
    if (!prepareFmtSelection()) return;
    const sel = window.getSelection();
    let range = sel.getRangeAt(0);
    if (range.collapsed) {
      // No selection: apply to the whole text, like the other tools.
      range = document.createRange();
      range.selectNodeContents(output);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (type === 'none') {
      output.querySelectorAll('[data-border]').forEach(sp => {
        if (range.intersectsNode(sp)) {
          ['border', 'borderTop', 'borderBottom', 'borderLeft', 'borderRight',
           'padding', 'paddingLeft', 'paddingRight', 'borderRadius'].forEach(p => { sp.style[p] = ''; });
          delete sp.dataset.border;
        }
      });
      return;
    }
    const span = document.createElement('span');
    span.dataset.border = type;
    Object.assign(span.style, BORDER_STYLES[type]);
    span.appendChild(range.extractContents());
    range.insertNode(span);
    const nr = document.createRange();
    nr.selectNodeContents(span);
    sel.removeAllRanges();
    sel.addRange(nr);
  }

  const bdBtn = document.getElementById('bdBtn');
  const bdArrowBtn = document.getElementById('bdArrowBtn');
  const bdMenu = document.getElementById('bdMenu');
  let bdType = localStorage.getItem('hindiConverterBorder') || 'box';

  bdBtn.addEventListener('mousedown', e => e.preventDefault());
  bdBtn.addEventListener('click', () => applyBorder(bdType));

  bdArrowBtn.addEventListener('mousedown', e => e.preventDefault());
  bdArrowBtn.addEventListener('click', () => { bdMenu.hidden = !bdMenu.hidden; });

  bdMenu.querySelectorAll('[data-border]').forEach(b => {
    b.addEventListener('mousedown', e => e.preventDefault());
    b.addEventListener('click', () => {
      const type = b.dataset.border;
      if (type !== 'none') {
        bdType = type;
        localStorage.setItem('hindiConverterBorder', bdType);
      }
      applyBorder(type);
      bdMenu.hidden = true;
    });
  });

  document.addEventListener('click', e => {
    document.querySelectorAll('.hl-palette').forEach(p => {
      if (!p.hidden && !p.closest('.hl-ctl').contains(e.target)) p.hidden = true;
    });
  });

  // --- Bullets / numbering tool -------------------------------------------------
  // The output holds plain newlines rather than paragraph blocks, so the native
  // insert-list command would produce a single bullet. Instead the selection is
  // split into lines (keeping inline formatting) and rebuilt as <ul>/<ol>.

  function fragmentToLines(frag) {
    const lines = [[]];
    Array.from(frag.childNodes).forEach(child => {
      if (child.nodeType === 3 && child.textContent.includes('\n')) {
        child.textContent.split('\n').forEach((part, i) => {
          if (i > 0) lines.push([]);
          if (part) lines[lines.length - 1].push(document.createTextNode(part));
        });
      } else if (child.nodeType === 1 && (child.tagName === 'DIV' || child.tagName === 'P')) {
        if (lines[lines.length - 1].length) lines.push([]);
        Array.from(child.childNodes).forEach(n => lines[lines.length - 1].push(n));
        lines.push([]);
      } else {
        lines[lines.length - 1].push(child);
      }
    });
    return lines.filter(l => l.length);
  }

  function applyList(kind) {
    if (!prepareFmtSelection()) return;
    const sel = window.getSelection();
    let range = sel.getRangeAt(0);
    if (range.collapsed) {
      range = document.createRange();
      range.selectNodeContents(output);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    // Inside an existing list: same kind toggles it off, other kind converts it.
    const anc = range.commonAncestorContainer;
    const list = (anc.nodeType === 1 ? anc : anc.parentElement).closest('ul, ol');
    if (list && output.contains(list)) {
      if (list.tagName.toLowerCase() === kind) {
        const frag = document.createDocumentFragment();
        Array.from(list.children).forEach((li, i) => {
          if (i) frag.appendChild(document.createTextNode('\n'));
          while (li.firstChild) frag.appendChild(li.firstChild);
        });
        list.replaceWith(frag);
      } else {
        const el = document.createElement(kind);
        while (list.firstChild) el.appendChild(list.firstChild);
        list.replaceWith(el);
      }
      return;
    }

    const lines = fragmentToLines(range.extractContents());
    if (!lines.length) return;
    const el = document.createElement(kind);
    lines.forEach(nodes => {
      const li = document.createElement('li');
      nodes.forEach(n => li.appendChild(n));
      el.appendChild(li);
    });
    range.insertNode(el);
    const nr = document.createRange();
    nr.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(nr);
  }

  [['bulletBtn', 'ul'], ['numberBtn', 'ol']].forEach(([id, kind]) => {
    const btn = document.getElementById(id);
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', () => applyList(kind));
  });


  // --- PDF export ------------------------------------------------------------

  const pdfBtn = document.getElementById('pdfBtn');
  let html2pdfPromise = null;

  // html2pdf.js (html2canvas + jsPDF) is loaded lazily on first use; it renders
  // text through the browser, so Devanagari conjuncts/matras shape correctly.
  function loadHtml2Pdf() {
    if (window.html2pdf) return Promise.resolve();
    if (!html2pdfPromise) {
      html2pdfPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        s.onload = resolve;
        s.onerror = () => { html2pdfPromise = null; reject(new Error('Could not load the PDF library')); };
        document.head.appendChild(s);
      });
    }
    return html2pdfPromise;
  }

  // Kruti Dev has no glyphs for Devanagari numerals; the browser falls back to
  // another font on screen, but html2canvas (PDF) and Word don't fall back
  // reliably — so numeral runs get an explicit Devanagari font. Devanagari
  // numerals never occur inside tags/attributes, so a string replace is safe.
  function tagNumerals(html) {
    return html.replace(/[०-९]+/g,
      '<span style="font-family:\'Nirmala UI\',\'Mangal\',sans-serif;">$&</span>');
  }

  // Exports can't rely on native list markers: html2canvas and Word draw them
  // in the list's font (Kruti Dev), which garbles the digits and the dot. So
  // lists become plain lines with literal १./• markers in a Devanagari font.
  function flattenLists(root) {
    let list;
    while ((list = root.querySelector('ol, ul'))) {
      const isOl = list.tagName === 'OL';
      const frag = document.createDocumentFragment();
      Array.from(list.children).forEach((li, i) => {
        const line = document.createElement('div');
        line.style.margin = '2px 0';
        const marker = document.createElement('span');
        marker.style.fontFamily = "'Nirmala UI','Mangal',sans-serif";
        marker.textContent = isOl ? (i + 1) + '. ' : '• ';
        line.appendChild(marker);
        while (li.firstChild) line.appendChild(li.firstChild);
        frag.appendChild(line);
      });
      list.replaceWith(frag);
    }
  }

  // The spacing CSS vars don't reach detached export DOM, so paragraph gaps are
  // baked in as inline margins on the top-level blocks.
  function applyParaGaps(root) {
    Array.from(root.children).forEach(c => {
      if (/^(DIV|P|UL|OL)$/.test(c.tagName)) c.style.marginBottom = paraSpacing + 'px';
    });
  }

  function buildPdfContent() {
    const el = document.createElement('div');
    el.style.cssText = 'width:180mm;padding:4mm;background:#fff;color:#1f2430;' +
      'font-family:"Kruti Dev 011","Kruti Dev 010",sans-serif;' +
      'font-size:' + fontSize + 'pt;line-height:' + lineSpacing + ';white-space:pre-wrap;word-wrap:break-word;';
    el.innerHTML = tagNumerals(output.innerHTML); // keeps WYSIWYG formatting in the PDF
    flattenLists(el);
    applyParaGaps(el);
    return el;
  }

  pdfBtn.addEventListener('click', async () => {
    if (output.classList.contains('empty') || output.classList.contains('error') || output.classList.contains('loading')) {
      showToast('Convert some text first');
      return;
    }
    pdfBtn.disabled = true;
    const oldLabel = pdfBtn.textContent;
    pdfBtn.textContent = 'Creating PDF…';
    try {
      await loadHtml2Pdf();
      await window.html2pdf().set({
        margin: [15, 15, 18, 15],
        filename: 'hindi-translation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      }).from(buildPdfContent()).save();
      showToast('PDF downloaded ✓');
    } catch (err) {
      showToast('PDF failed: ' + err.message);
    } finally {
      pdfBtn.disabled = false;
      pdfBtn.textContent = oldLabel;
    }
  });

  // --- Word export -------------------------------------------------------------
  // Word opens HTML-based .doc files natively, so no library is needed. The
  // text is exported in Kruti Dev encoding with the Kruti Dev 011 font (must be
  // installed in Windows for Word to render it). Font names use single quotes —
  // double quotes would terminate the style="..." attribute and break the font.

  const wordBtn = document.getElementById('wordBtn');

  wordBtn.addEventListener('click', () => {
    if (!outputHasText()) { showToast('Convert some text first'); return; }
    const style = "font-family:'Kruti Dev 011','Kruti Dev 010';" +
      'font-size:' + fontSize + 'pt;line-height:' + lineSpacing + ';color:#1f2430;';
    // Word ignores plain newlines in HTML, so line breaks become <br>.
    const tmp = document.createElement('div');
    tmp.innerHTML = tagNumerals(output.innerHTML);
    flattenLists(tmp);
    applyParaGaps(tmp);
    const body = tmp.innerHTML.replace(/\n/g, '<br>');
    const html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
      'xmlns="http://www.w3.org/TR/REC-html40">' +
      '<head><meta charset="utf-8"><title>Hindi</title>' +
      "<style>body, div, p, span, li { font-family: 'Kruti Dev 011', 'Kruti Dev 010'; }</style>" +
      '</head>' +
      '<body><div style="' + style + '">' + body + '</div></body></html>';
    // A UTF-8 BOM makes Word detect the encoding (Devanagari-safe).
    const blob = new Blob(['﻿' + html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hindi-translation.doc';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Word file downloaded ✓');
  });
})();
