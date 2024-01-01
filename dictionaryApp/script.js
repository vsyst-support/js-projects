const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonyms .list"),
  infoText = wrapper.querySelector(".info-text"),
  volumeIcon = wrapper.querySelector(".word i");
removeIcon = wrapper.querySelector(".search span");
// const resultDiv = document.getElementById("result");
let audio;

// data function
function data(result, word) {
  if (result.title) {
    // if api return the message of can't find word
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
  } else {
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0],
      phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`,
      synonymsData = result[0].meanings[0],
      meaningData = result[0].meanings;

    // let's pass the particular response data to a particular html element
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions.definition;
    document.querySelector(".example span").innerText = definitions.example;
    audio = new Audio("https:" + result[0].phonetics[0].audio); // creating new audio obj and passing audio src

    // if (synonymsData.synonyms.length === 0 || !synonymsData) {
    //   // if there is no synonyms then hide the synonyms
    //   synonyms.parentElement.style.display = "none";
    // } else {
    //   synonyms.parentElement.style.display = "block";
    //   console.log("synonymsData", synonymsData);
    //   synonyms.innerHTML = "";
    //   for (let i = 0; i < 5; i++) {
    //     // getting only 5 synonyms out of many
    //     let tag = `<span onclick=search('${synonymsData.synonyms[i]}')>${synonymsData.synonyms[i]},</span>`;
    //     synonyms.insertAdjacentHTML("beforeend", tag); // passing all 5 synonyms inside synonyms div
    //   }
    // }
    console.log(result);
    for (let m = 0; m < 5; m++) {
      // getting only 5 synonyms out of many
      if (meaningData[m]?.synonyms.length > 0) {
        // console.log("meaning", meaningData[m]);
        synonyms.parentElement.style.display = "block";
        // console.log("meaningData[m].synonyms", meaningData[m].synonyms);
        synonyms.innerHTML = "";
        for (let i = 0; i < meaningData[m].synonyms.length; i++) {
          // getting only 5 synonyms out of many
          let tag = `<span onclick=search('${meaningData[m].synonyms[i]}')>${meaningData[m].synonyms[i]},</span>`;
          synonyms.insertAdjacentHTML("beforeend", tag); // passing all 5 synonyms inside synonyms div
          // return;
        }
      } else {
        // synonyms.parentElement.style.display = "none";
      }
    }
  }
}

function search(word) {
  searchInput.value = word;
  fetchApi(word);
  wrapper.classList.remove("active");
}

// fetch api function
wrapper.classList.remove("active");
function fetchApi(word) {
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  //   // api response and returning it with parsing into js obj and in another then
  //   //   method calling data function with passing api response and searched word as an argument
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});

volumeIcon.addEventListener("click", () => {
  audio.play();
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.style.color = "#9a9a9a";
  infoText.innerHTML =
    "Type a word and press enter to get meaning, example, pronunciation and synonyms of that typed word.";
});
