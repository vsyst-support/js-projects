const inputBox = document.getElementById("input-box");
const resultBox = document.querySelector(".result-box");
const button = document.querySelector(".fa-solid");

const sections = {
  AdvJS: "Advanced Js Projects",
  HtmlJS: "html css in javascript projects",
};
let names = [

  {
    title: "IOCL BOB Indent Excel Export",
    href: "./javascript-projects/indentExcelExport/index.html",
    date: "15/02/2025",
    description: "IOCL BOB Indent Excel Export",
    youtubelink: "",
    section: sections.AdvJS,
  },
  {
    title: "Age Calculator",
    href: "./javascript-projects/agecalculator/calculator.html",
    date: "1/01/2024",
    description: "calculate your age",
    youtubelink: "https://www.youtube.com/watch?v=w6-9PfboI2g",
    section: sections.AdvJS,
  },
  {
    title: "Crud Operation",
    href: "./javascript-projects/crudOperation/index.html",
    date: "1/01/2024",
    description: "crud operation",
    youtubelink: "https://www.youtube.com/watch?v=KiRKUTDYlG8",
    section: sections.AdvJS,
  },
  {
    title: "QR Code Generator",
    href: "./javascript-projects/qrcodeGenerator/index.html",
    date: "1/01/2024",
    description: "generate your own QR code",
    youtubelink: "https://www.youtube.com/watch?v=g1j9rR-H1lk",
    section: sections.AdvJS,
  },
  {
    title: "Dictionary App",
    href: "./javascript-projects/dictionaryApp/index.html",
    date: "1/01/2024",
    description: "search any word",
    youtubelink: "https://www.youtube.com/watch?v=uqgCF3JIHkA",
    section: sections.AdvJS,
  },

  {
    title: "Tic Tac Toe",
    href: "./javascript-projects/ticTacToe/index.html",
    date: "1/01/2024",
    description: "play game",
    youtubelink: "https://www.youtube.com/watch?v=al_AgC2NSCo",
    section: sections.AdvJS,
  },

  {
    title: "Word Counter",
    href: "./javascript-projects/wordCounter/index.html",
    date: "1/01/2024",
    description: "count your words",
    youtubelink: "https://www.youtube.com/watch?v=mJ3EgpaiB7c",
    section: sections.AdvJS,
  },
  {
    title: "Quote Generator",
    href: "./javascript-projects/quoteGenerator/index.html",
    date: "1/01/2024",
    description: "generate quotes",
    youtubelink: "https://www.youtube.com/watch?v=FiUVwPYYT5A",
    section: sections.AdvJS,
  },
  {
    title: "Dynaimc Text Formatter",
    href: "./javascript-projects/dynamicTextFormatter/index.html",
    date: "1/01/2024",
    description: "text formatter",
    youtubelink: "https://www.youtube.com/watch?v=_pxu75RoiXI",
    section: sections.AdvJS,
  },
  {
    title: "Form Validation",
    href: "./javascript-projects/formValidation/index.html",
    date: "1/01/2024",
    description: "making form validation",
    youtubelink: "https://www.youtube.com/watch?v=fz8bwvn9lA4",
    section: sections.AdvJS,
  },

  {
    title: "Weather App",
    href: "./javascript-projects/weatherApp/index.html",
    date: "1/01/2024",
    description: "viwe weather of all states",
    youtubelink: "https://www.youtube.com/watch?v=2jjR-iGxVYM",
    section: sections.AdvJS,
  },

  {
    title: "Meme Generator",
    href: "./javascript-projects/memeGenerator/index.html",
    date: "1/01/2024",
    description: "generate your meme",
    youtubelink: "https://www.youtube.com/watch?v=io5FcMAdLyQ",
    section: sections.AdvJS,
  },

  {
    title: "Image Editor",
    href: "./javascript-projects/ImageEditor/index.html",
    date: "1/01/2024",
    description: "edit your images",
    youtubelink: "https://www.youtube.com/watch?v=e_QGePW-GBw",
    section: sections.AdvJS,
  },

  {
    title: "Kanban Board JS",
    href: "./javascript-projects/kanbanBoardJs/index.html",
    date: "1/01/2024",
    description: "make kanban board",
    youtubelink: "https://www.youtube.com/watch?v=ijQ6dCughW8",
    section: sections.AdvJS,
  },

  {
    title: "Rgba to Hex Converter",
    href: "./javascript-projects/rgbaToHexConverter/index.html",
    date: "1/01/2024",
    description: "convert rgba to hex",
    youtubelink: "https://www.youtube.com/watch?v=z_XyZDdLnUE",
    section: sections.AdvJS,
  },

  {
    title: "Speed Typing Game",
    href: "./javascript-projects/speedTypingGame/index.html",
    date: "1/01/2024",
    description: "play game to speed typing",
    youtubelink: "https://www.youtube.com/watch?v=R-7eQIHRszQ",
    section: sections.AdvJS,
  },

  {
    title: "Sticky Notes",
    href: "./javascript-projects/stickynotes/src/index.html",
    date: "1/01/2024",
    description: "add sticky notes",
    youtubelink: "https://www.youtube.com/watch?v=Efo7nIUF2JY",
    section: sections.AdvJS,
  },
  {
    title: "Rock Paper",
    href: "./javascript-projects/rockPaper/index.html",
    date: "1/01/2024",
    description: "play rock paper scissor",
    youtubelink: "https://www.youtube.com/watch?v=YZ6MUikiHxE",
    section: sections.AdvJS,
  },
  {
    title: "Rgb to Hex Converter",
    href: "./javascript-projects/rgbToHexConverter/index.html",
    date: "1/01/2024",
    description: "convert rgb to hex",
    youtubelink: "https://www.youtube.com/watch?v=wDCU2XCOh40",
    section: sections.AdvJS,
  },

  {
    title: "Responsive Dip Website HTML",
    href: "./html-css-projects/dipwebresponsive/index.html",
    date: "11/03/2025",
    description: "added masters & transactions pages",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "App Landing Page",
    href: "./html-css-projects/appLandingPage/index.html",
    date: "1/01/2022",
    description: "responsive app landing page",
    youtubelink: "https://www.youtube.com/watch?v=Ms6dJu7xr14",
    section: sections.HtmlJS,
  },
  {
    title: "App Landing Page 1",
    href: "./html-css-projects/appLandingPage-1/index.html",
    date: "1/01/2022",
    description: "app landing page",
    youtubelink: "https://www.youtube.com/watch?v=LpcRvpK8I08",
    section: sections.HtmlJS,
  },
  {
    title: "Multi Page Website",
    href: "./html-css-projects/multiPageWebsite/index.html",
    date: "1/01/2022",
    description: "create multi page website",
    youtubelink: "https://www.youtube.com/watch?v=oYRda7UtuhA",
    section: sections.HtmlJS,
  },
  {
    title: "Video Playlist gallery",
    href: "./html-css-projects/VideoPlaylistGallery/index.html",
    date: "1/01/2022",
    description: "make responsive playlist gallery",
    youtubelink: "https://www.youtube.com/watch?v=z3Y5gJWmVVU",
    section: sections.HtmlJS,
  },
  {
    title: "Admin Dashboard",
    href: "./html-css-projects/adminDashboard/index.html",
    date: "1/01/2022",
    description: "admin dashboard",
    youtubelink: "https://www.youtube.com/watch?v=gdA1G5h-D80",
    section: sections.HtmlJS,
  },

  {
    title: "Admin Dashboard Light & Dark Mode",
    href: "./html-css-projects/dashboardLightDarkTheme/index.html",
    date: "1/01/2022",
    description: "admin dashboard light & dark mode",
    youtubelink: "https://www.youtube.com/watch?v=FaBY9yAUtdg",
    section: sections.HtmlJS,
  },

  {
    title: "Searchbar With Dropdownlist",
    href: "./html-css-projects/searchbarWithDropdownlist/index.html",
    date: "1/01/2022",
    description: "create search bar with dropdownlist",
    youtubelink: "https://www.youtube.com/watch?v=jFzm-O7nwHA",
    section: sections.HtmlJS,
  },

  {
    title: "Youtube Clone",
    href: "./html-css-projects/youtubeClone/index.html",
    date: "1/01/2022",
    description: "responsive youtube clone",
    youtubelink: "https://www.youtube.com/watch?v=pOAwQ0FkVz8",
    section: sections.HtmlJS,
  },

  {
    title: "Card Slider",
    href: "./html-css-projects/cardSlider/index.html",
    date: "1/01/2022",
    description: "make card slider",
    youtubelink: "https://www.youtube.com/watch?v=BKKcGb80MOs",
    section: sections.HtmlJS,
  },

  {
    title: "Faq Coding",
    href: "./html-css-projects/faqCoding/index.html",
    date: "1/01/2022",
    description: "custom faq page",
    youtubelink: "https://www.youtube.com/watch?v=Ei7o-hCBAZ8",
    section: sections.HtmlJS,
  },

  {
    title: "Login & Registration Form",
    href: "./html-css-projects/loginRegistrationForm/index.html",
    date: "1/01/2022",
    description: "create login & registration form",
    youtubelink: "https://www.youtube.com/watch?v=I5_T547tHf0",
    section: sections.HtmlJS,
  },

  {
    title: "Sign In & Sign Up Form",
    href: "./html-css-projects/signInSignUpFrom/index.html",
    date: "1/01/2022",
    description: "registration sign in & sign up form",
    youtubelink: "https://www.youtube.com/watch?v=aAyxSExhwW4",
    section: sections.HtmlJS,
  },

  {
    title: "Responsive Login & Registration Form",
    href: "./html-css-projects/loginRegistrationForm-1/index.html",
    date: "1/01/2022",
    description: "create login & registration form",
    youtubelink: "https://www.youtube.com/watch?v=piG91X4sV2U",
    section: sections.HtmlJS,
  },

  {
    title: "Animated Toast Notification With Progress Bar",
    href: "./html-css-projects/animatedToastNotificatonWithProgressBar/index.html",
    date: "1/01/2022",
    description: "create animated toast notification with progress bar",
    youtubelink: "https://www.youtube.com/watch?v=sTL7KCOf3kg",
    section: sections.HtmlJS,
  },

  {
    title: "Sidebar Menu",
    href: "./html-css-projects/sidebarMenuLightDarkMode/index.html",
    date: "1/01/2022",
    description: "responsive sidebar menu dark/light mode",
    youtubelink: "https://www.youtube.com/watch?v=bFvfqUMjvsA",
    section: sections.HtmlJS,
  },

  {
    title: "Animated Notification Box",
    href: "./html-css-projects/animatedNotificationBox/index.html",
    date: "1/01/2022",
    description: "cool animated notification box",
    youtubelink: "https://www.youtube.com/watch?v=1EN8_OxvPuY",
    section: sections.HtmlJS,
  },

  {
    title: "Images Responsive",
    href: "./html-css-projects/imagesResponsive/index.html",
    date: "1/01/2022",
    description: "make images responsive",
    youtubelink: "https://www.youtube.com/watch?v=Q5m8cCGdiBo",
    section: sections.HtmlJS,
  },

  {
    title: "Dropdown Sidebar Menu",
    href: "./html-css-projects/dropdownSidebarMenu/index.html",
    date: "1/01/2022",
    description: "responsive dropdown sidebar Menu",
    youtubelink: "https://www.youtube.com/watch?v=ES8vJcUqE7s",
    section: sections.HtmlJS,
  },

  {
    title: "Custom Select Box",
    href: "./html-css-projects/customSelectBox/index.html",
    date: "1/01/2022",
    description: "design a custom select box",
    youtubelink: "https://www.youtube.com/watch?v=k4gzE80FKb0",
    section: sections.HtmlJS,
  },

  {
    title: "Drop Menu",
    href: "./html-css-projects/dropMenu/index.html",
    date: "1/01/2022",
    description: "create drop down, drop up, drop left, and drop right",
    youtubelink: "https://www.youtube.com/watch?v=FZr4BQezzOw",
    section: sections.HtmlJS,
  },

  {
    title: "Add Search Functionality To Select Box",
    href: "./html-css-projects/addSearchFunctionalityToSelectBox/index.html",
    date: "1/01/2022",
    description: "add search functionality to select box",
    youtubelink: "https://www.youtube.com/watch?v=VZzWzRVXPcQ",
    section: sections.HtmlJS,
  },

  {
    title: "Zipcode",
    href: "./html-css-projects/zipcode/index.html",
    date: "1/01/2022",
    description: "find city, state info using zip code",
    youtubelink: "https://www.youtube.com/watch?v=ZAtA7uNYh-8",
    section: sections.HtmlJS,
  },

  {
    title: "Drag & Drop",
    href: "./html-css-projects/dragAndDrop/index.html",
    date: "1/01/2022",
    description: "drag & drop elements",
    youtubelink: "https://www.youtube.com/watch?v=mp0PHdpEC7A",
    section: sections.HtmlJS,
  },

  {
    title: "Drag & Drop To Do App",
    href: "./html-css-projects/dragAndDropToDoApp/index.html",
    date: "1/01/2022",
    description: "to do app(drag and drop)",
    youtubelink: "https://www.youtube.com/watch?v=m3StLl-H4CY",
    section: sections.HtmlJS,
  },

  {
    title: "Simple Calculator",
    href: "./html-css-projects/simpleCalculator/index.html",
    date: "1/01/2022",
    description: "simple calculator with javascript",
    youtubelink: "https://www.youtube.com/watch?v=A7SNvcU5EVM",
    section: sections.HtmlJS,
  },

  {
    title: "Working Digital Clock",
    href: "./html-css-projects/WorkingDigitalClock/index.html",
    date: "1/01/2022",
    description: "create working digital clock",
    youtubelink: "https://www.youtube.com/watch?v=eoSfzVz9ur0",
    section: sections.HtmlJS,
  },

  {
    title: "Countdown Timer",
    href: "./html-css-projects/countdownTimer/index.html",
    date: "1/01/2022",
    description: "simple countdown timer",
    youtubelink: "https://www.youtube.com/watch?v=Lnbx2O4MZ3o",
    section: sections.HtmlJS,
  },

  {
    title: "Rotating Countdown Timer",
    href: "./html-css-projects/rotatingCountdownTimer/index.html",
    date: "1/01/2022",
    description: "build rotating countdown timer",
    youtubelink: "https://www.youtube.com/watch?v=VqToCBmqq6w",
    section: sections.HtmlJS,
  },

  {
    title: "Animating Countdown",
    href: "./html-css-projects/animatingCountdown/index.html",
    date: "1/01/2022",
    description: "creating an animating countdown",
    youtubelink: "https://www.youtube.com/watch?v=9bOlAFoFy0A",
    section: sections.HtmlJS,
  },

  {
    title: "Countdown",
    href: "./html-css-projects/countdown/index.html",
    date: "1/01/2022",
    description: "countdown timer",
    youtubelink: "https://www.youtube.com/watch?v=uoA9ywLUxWM",
    section: sections.HtmlJS,
  },

  {
    title: "Circular Progress Bar",
    href: "./html-css-projects/circularProgressBar/index.html",
    date: "1/01/2022",
    description: "make circular progress",
    youtubelink: "https://www.youtube.com/watch?v=mSfsGTIQlxg",
    section: sections.HtmlJS,
  },

  {
    title: "Awesome Circular Progress Bar",
    href: "./html-css-projects/awesomeCircularProgressBar/index.html",
    date: "1/01/2022",
    description: "create awesome circular progress bar",
    youtubelink: "https://www.youtube.com/watch?v=cmAeMnpukaQ",
    section: sections.HtmlJS,
  },

  {
    title: "Animated Circular Progress Bar",
    href: "./html-css-projects/animatedCircularProgressBar/index.html",
    date: "1/01/2022",
    description: "create awesome circular progress bar",
    youtubelink: "https://www.youtube.com/watch?v=FLzFU4HwmEA",
    section: sections.HtmlJS,
  },

  {
    title: "Reading Progress Bar",
    href: "./html-css-projects/readingProgressBar/index.html",
    date: "1/01/2022",
    description: "add reading progress bar to webpage",
    youtubelink: "https://www.youtube.com/watch?v=ubV1jW1JAPY",
    section: sections.HtmlJS,
  },

  {
    title: "Animated Profile Card",
    href: "./html-css-projects/animatedProfileCard/index.html",
    date: "1/01/2022",
    description: "create animated profile card",
    youtubelink: "https://www.youtube.com/watch?v=LlEh6UJ4aMs",
    section: sections.HtmlJS,
  },

  {
    title: "Change Background Color",
    href: "./html-css-projects/changeBackgroundColor/index.html",
    date: "1/01/2022",
    description: "change background color on click",
    youtubelink: "https://www.youtube.com/watch?v=kiVpCxR9efw",
    section: sections.HtmlJS,
  },

  {
    title: "Input Field Text Animation",
    href: "./html-css-projects/inputFieldTextAnimation/index.html",
    date: "1/01/2022",
    description: "create input field text animation",
    youtubelink: "https://www.youtube.com/watch?v=BMphVl9suxA",
    section: sections.HtmlJS,
  },

  {
    title: "Show Hide Password",
    href: "./html-css-projects/showHidePassword/index.html",
    date: "1/01/2022",
    description: "make password show hide",
    youtubelink: "https://www.youtube.com/watch?v=Nnzt6_ISbOk",
    section: sections.HtmlJS,
  },

  {
    title: "Price Range Slider",
    href: "./html-css-projects/priceRangeSlider/index.html",
    date: "1/01/2022",
    description: "price range slider with min-max input",
    youtubelink: "https://www.youtube.com/watch?v=FShnKqPXknI",
    section: sections.HtmlJS,
  },

  {
    title: "Custom Captcha",
    href: "./html-css-projects/customCaptcha/index.html",
    date: "1/01/2022",
    description: "create custom captcha",
    youtubelink: "https://www.youtube.com/watch?v=_0B7wy05WHk",
    section: sections.HtmlJS,
  },

  {
    title: "Alarm Clock",
    href: "./html-css-projects/alarmClock/index.html",
    date: "1/01/2022",
    description: "simple alarm clock",
    youtubelink: "https://www.youtube.com/watch?v=GvG_iMXjeUg",
    section: sections.HtmlJS,
  },

  {
    title: "Vertical Timeline",
    href: "./html-css-projects/verticalTimeline/index.html",
    date: "1/01/2022",
    description: "responsive vertical timeline",
    youtubelink: "https://www.youtube.com/watch?v=-uzOuGlUfDQ",
    section: sections.HtmlJS,
  },

  {
    title: "File Upload With Progress Bar",
    href: "./html-css-projects/fileUploadWithProgressBar/index.html",
    date: "1/01/2022",
    description: "file upload with progress bar",
    youtubelink: "https://www.youtube.com/watch?v=_xDCVt1F6O0",
    section: sections.HtmlJS,
  },

  {
    title: "Coupon Code",
    href: "./html-css-projects/couponCode/index.html",
    date: "1/01/2022",
    description: "make coupon code web design",
    youtubelink: "https://www.youtube.com/watch?v=rCSq64TACn0",
    section: sections.HtmlJS,
  },

  {
    title: "Virtual Credit Card",
    href: "./html-css-projects/virtualCreditCard/index.html",
    date: "1/01/2022",
    description: "make a virtual credit card design ",
    youtubelink: "https://www.youtube.com/watch?v=7V2tGjEYoqo",
    section: sections.HtmlJS,
  },

  {
    title: "Liquid Loader Animation",
    href: "./html-css-projects/liquidLoaderAnimation/index.html",
    date: "1/01/2022",
    description: "create liquid loader animation ",
    youtubelink: "https://www.youtube.com/watch?v=DGmgmILD60A",
    section: sections.HtmlJS,
  },

  {
    title: "Animation Effects",
    href: "./html-css-projects/animationEffects/index.html",
    date: "1/01/2022",
    description: "create animation effect ",
    youtubelink: "https://www.youtube.com/watch?v=Po4ZYm6e0q0",
    section: sections.HtmlJS,
  },

  {
    title: "Firebase Realtime Database",
    href: "./html-css-projects/firebaseRealtimeDatabase/index.html",
    date: "1/01/2022",
    description: "create firebase realtime database to web",
    youtubelink: "https://www.youtube.com/watch?v=2CtQEXwOPXw",
    section: sections.HtmlJS,
  },

  {
    title: "Autocomplete Suggections input",
    href: "./html-css-projects/automaticSuggectionsInput/index.html",
    date: "1/01/2022",
    description: "autocomplete suggections On input field",
    youtubelink: "https://www.youtube.com/watch?v=MO3qC1ouGiA",
    section: sections.HtmlJS,
  },

  {
    title: "Search Bar With Auto-complete search suggestion",
    href: "./html-css-projects/serachbarWithAutocompleteSearchSuggections/index.html",
    date: "1/01/2022",
    description: "search bar with auto-complete search suggestion",
    youtubelink: "https://www.youtube.com/watch?v=QxMBHi_ZiT8",
    section: sections.HtmlJS,
  },
  {
    title: "Svg Tutorial",
    href: "./html-css-projects/svgTutorial/index.html",
    date: "1/01/2022",
    description: "svg tutorial introduction",
    youtubelink: "https://www.youtube.com/watch?v=d_VmuSc3cTs",
    section: sections.HtmlJS,
  },

  {
    title: "Diff",
    href: "./html-css-projects/diff/index.html",
    date: "1/01/2022",
    description: "diff website",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Diff Website Row & Column design",
    href: "./html-css-projects/diffWebsiteRowAndColumn/index.html",
    date: "1/01/2022",
    description: "diff website row & column design",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Dropdown menu",
    href: "./html-css-projects/dropdownMenu/index.html",
    date: "1/01/2022",
    description: "dropdown menu design",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Login Form",
    href: "./html-css-projects/loginForm/index.html",
    date: "1/01/2022",
    description: "create login form",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Reset Password Form",
    href: "./html-css-projects/resetPasswordForm/index.html",
    date: "1/01/2022",
    description: "create reset password form",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Reset Password-1",
    href: "./html-css-projects/resetPassword-1/index.html",
    date: "1/01/2022",
    description: "create reset password design",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Sidebar Menu",
    href: "./html-css-projects/sidebarMenu-1/index.html",
    date: "1/01/2022",
    description: "create sidebar menu",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Dashboard",
    href: "./html-css-projects/dashboard/index.html",
    date: "1/01/2022",
    description: "dashboard design",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Balance",
    href: "./html-css-projects/balance/index.html",
    date: "1/01/2022",
    description: "balance list website",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Activity",
    href: "./html-css-projects/activity/index.html",
    date: "1/01/2022",
    description: "activity design",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Text Stroke",
    href: "./html-css-projects/textStroke/index.html",
    date: "1/01/2022",
    description: "add stroke in text",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "10 Minute sCountdown",
    href: "./html-css-projects/timerCountdown/10-minutesCountdown/index.html",
    date: "1/01/2022",
    description: "create countdown",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "10 Minutes Countdown Completed",
    href: "./html-css-projects/timerCountdown/10minutesCountdownCompleted/index.html",
    date: "1/01/2022",
    description: "create 10 minnutes countdown",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "10 Minutes Countdown Final",
    href: "./html-css-projects/timerCountdown/10-minutesCountdownFinal/index.html",
    date: "1/01/2022",
    description: "create 10 minnutes countdown",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Music Player",
    href: "./javascript-projects/musicPlayer/index.html",
    date: "1/01/2022",
    description: "create a music player",
    youtubelink: "https://www.youtube.com/watch?v=JtrFzoL1joI",
    section: sections.AdvJS,
  },

  {
    title: "Firebase Realtime Data",
    href: "./javascript-projects/firebaseRealtimeData/index.html",
    date: "1/01/2022",
    description: "create a music player",
    youtubelink: "https://www.youtube.com/watch?v=7hB2ASYBkXo",
    section: sections.AdvJS,
  },

  {
    title: "Mixture Introduction Page(pink)",
    href: "./html-css-projects/mixtureIntroductionPage(pink)/index.html",
    date: "1/01/2022",
    description: "make mixture introduction page",
    youtubelink: "",
    section: sections.HtmlJS,
  },

  {
    title: "Vsyst Dzzlo Website",
    href: "./html-css-projects/vsyst-dzzlo-website/index.html",
    date: "1/01/2022",
    description: "make vsyst website",
    youtubelink: "",
    section: sections.HtmlJS,
  },
  {
    title: "Firebase Queue Management",
    href: "./javascript-projects/firebaseQueueManagement/index.html",
    date: "1/01/2022",
    description: "firebase queue management",
    youtubelink: "",
    section: sections.AdvJS,
  },
];

let sortedNames = [];

const input = document.getElementById("inputBox");
const root = document.getElementById("root");

const displayWebsites = ({ websites, sortedNames }) => {
  for (let website of sortedNames) {
    websites =
      websites +
      `
      
      <div class="card">
        <div>
          <h5 style="width:200px;"><a href=${website.href}>${website.title}</a></h5>
          <p style="width:200px; font-size:18px; color: #616161; margin-top:5px;">${website.description}</p>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top:5px; align-items:flex-end;">
          <div style="font-size:18px; color: #616161;">${website.date}</div>
            <a href=${website.youtubelink}>
              <img  src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052" height="22" alt="logo">
            </a>
        </div>
      </div>
    
    `;
  }
  return websites;
};

window.onload = () => {
  let websites = "";
  const advjsdata = names
    .filter((ele) => ele.section === sections.AdvJS)
    .sort((a, b) => (a.title < b.title ? -1 : 1));
  const htmljsdata = names
    .filter((ele) => ele.section === sections.HtmlJS)
    .sort((a, b) => (a.title < b.title ? -1 : 1));
  const AdvJSWeb = displayWebsites({ websites, sortedNames: advjsdata });
  const htmljsWeb = displayWebsites({ websites, sortedNames: htmljsdata });

  //   console.log(websites);
  root.innerHTML = `
    <div style="font-size:24px; margin-top:15px; font-weight:bold;">
      <p style="background-color: #D3D3D3; padding:10px; text-align:center;">${sections.AdvJS}</p>
      <div style="display: flex; flex-wrap: wrap">${AdvJSWeb}<div>
    </div>
    
    <div style="font-size:24px; margin-top:15px; font-weight:bold;">
      <p  style="background-color: #D3D3D3; padding:10px;  text-align:center;">${sections.HtmlJS}</p>
      <div style="display: flex; flex-wrap: wrap">${htmljsWeb}<div>
    </div>
  `;
};

// window.onload = () => {
//   let websites = "";
//   sortedNames = names.sort((a, b) => (a.title < b.title ? -1 : 1));
//   const htmlWeb = displayWebsites({ websites, sortedNames });

//   //   console.log(websites);
//   root.innerHTML = htmlWeb;
// };

input.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  let websites = "";
  const advjsdata = names
    .filter((ele) => ele.section === sections.AdvJS)
    ?.filter((textwebsites) => {
      return (
        textwebsites.title.toLowerCase().includes(searchString) ||
        textwebsites.description.toLowerCase().includes(searchString)
      );
    })
    .sort((a, b) => (a.title < b.title ? -1 : 1));
  const htmljsdata = names
    .filter((ele) => ele.section === sections.HtmlJS)
    ?.filter((textwebsites) => {
      return (
        textwebsites.title.toLowerCase().includes(searchString) ||
        textwebsites.description.toLowerCase().includes(searchString)
      );
    })
    .sort((a, b) => (a.title < b.title ? -1 : 1));

  const AdvJSWeb = displayWebsites({ websites, sortedNames: advjsdata });
  const htmljsWeb = displayWebsites({
    websites,
    sortedNames: htmljsdata,
  });

  root.innerHTML = `
  <div style="font-size:24px; margin-top:15px; font-weight:bold;">
    <p style="background-color: #D3D3D3; padding:10px; text-align:center;">${sections.AdvJS}</p>
    <div style="display: flex; flex-wrap: wrap">${AdvJSWeb}<div>
  </div>
  <br>
  <div style="font-size:24px; margin-top:15px; font-weight:bold;">
    <p style="background-color: #D3D3D3; padding:10px; text-align:center;">${sections.HtmlJS}</p>
    <div style="display: flex; flex-wrap: wrap">${htmljsWeb}<div>
  </div>
`;
});

// input.addEventListener("keyup", (e) => {
//   const searchString = e.target.value;
//   let websites = "";
//   sortedNames = names.sort((a, b) => (a.title < b.title ? -1 : 1));

//   const filterWebsites = sortedNames?.filter((title) => {
//     return (
//       title.title.toLowerCase().includes(searchString) ||
//       title.description.toLowerCase().includes(searchString)
//     );
//   });
//   const htmlWeb = displayWebsites({ websites, sortedNames: filterWebsites });

//   root.innerHTML = htmlWeb;
// });
