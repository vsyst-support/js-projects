const inputBox = document.getElementById("input-box");
const resultBox = document.querySelector(".result-box");
const button = document.querySelector(".fa-solid");

let names = [
  {
    title: "Age Calculator",
    href: "./agecalculator/calculator.html",
    date: "1/01/2024",
    description: "calculate your age",
    youtubelink: "https://www.youtube.com/watch?v=w6-9PfboI2g",
  },
  {
    title: "QR Code Generator",
    href: "./qrcodeGenerator/index.html",
    date: "1/01/2024",
    description: "generate your own QR code",
    youtubelink: "https://www.youtube.com/watch?v=g1j9rR-H1lk",
  },
  {
    title: "Dictionary App",
    href: "./dictionaryApp/index.html",
    date: "1/01/2024",
    description: "search any word",
    youtubelink: "https://www.youtube.com/watch?v=uqgCF3JIHkA",
  },

  {
    title: "Tic Tac Toe",
    href: "./ticTacToe/index.html",
    date: "1/01/2024",
    description: "play game",
    youtubelink: "https://www.youtube.com/watch?v=al_AgC2NSCo",
  },

  {
    title: "Word Counter",
    href: "./wordCounter/index.html",
    date: "1/01/2024",
    description: "count your words",
    youtubelink: "https://www.youtube.com/watch?v=mJ3EgpaiB7c",
  },
  {
    title: "Quote Generator",
    href: "./quoteGenerator/index.html",
    date: "1/01/2024",
    description: "generate quotes",
    youtubelink: "https://www.youtube.com/watch?v=FiUVwPYYT5A",
  },
  {
    title: "Crud Operation",
    href: "./crudOperation/index.html",
    date: "1/01/2024",
    description: "crud operation",
    youtubelink: "https://www.youtube.com/watch?v=KiRKUTDYlG8",
  },
  {
    title: "Dynaimc Text Formatter",
    href: "./dynamicTextFormatter/index.html",
    date: "1/01/2024",
    description: "text formatter",
    youtubelink: "https://www.youtube.com/watch?v=_pxu75RoiXI",
  },
  {
    title: "Form Validation",
    href: "./formValidation/index.html",
    date: "1/01/2024",
    description: "making form validation",
    youtubelink: "https://www.youtube.com/watch?v=fz8bwvn9lA4",
  },

  {
    title: "Weather App",
    href: "./weatherApp/index.html",
    date: "1/01/2024",
    description: "viwe weather of all states",
    youtubelink: "https://www.youtube.com/watch?v=2jjR-iGxVYM",
  },

  {
    title: "Meme Generator",
    href: "./memeGenerator/index.html",
    date: "1/01/2024",
    description: "generate your meme",
    youtubelink: "https://www.youtube.com/watch?v=io5FcMAdLyQ",
  },

  {
    title: "Image Editor",
    href: "./ImageEditor/index.html",
    date: "1/01/2024",
    description: "edit your images",
    youtubelink: "https://www.youtube.com/watch?v=e_QGePW-GBw",
  },

  {
    title: "Kanban Board JS",
    href: "./kanbanBoardJs/index.html",
    date: "1/01/2024",
    description: "make kanban board",
    youtubelink: "https://www.youtube.com/watch?v=ijQ6dCughW8",
  },

  {
    title: "Rgba to Hex Converter",
    href: "./rgbaToHexConverter/index.html",
    date: "1/01/2024",
    description: "convert rgba to hex",
    youtubelink: "https://www.youtube.com/watch?v=z_XyZDdLnUE",
  },

  {
    title: "Speed Typing Game",
    href: "./speedTypingGame/index.html",
    date: "1/01/2024",
    description: "play game to speed typing",
    youtubelink: "https://www.youtube.com/watch?v=R-7eQIHRszQ",
  },

  {
    title: "Sticky Notes",
    href: "./stickynotes/src/index.html",
    date: "1/01/2024",
    description: "add sticky notes",
    youtubelink: "https://www.youtube.com/watch?v=Efo7nIUF2JY",
  },
  {
    title: "Rock Paper",
    href: "./rockPaper/index.html",
    date: "1/01/2024",
    description: "play rock paper scissor",
    youtubelink: "https://www.youtube.com/watch?v=YZ6MUikiHxE",
  },
  {
    title: "Rgb to Hex Converter",
    href: "./rgbToHexConverter/index.html",
    date: "1/01/2024",
    description: "convert rgb to hex",
    youtubelink: "https://www.youtube.com/watch?v=wDCU2XCOh40",
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
      
      <div style="background-color: white; border-radius: 20px; width:18%; height:100px; padding: 10px 20px; margin: 10px; border: 1px solid #CDCDCD;">
      <h5><a href=${website.href}>${website.title}</a></h5>
      <p style="font-size:18px; color: #616161; margin-top:5px;">${website.description}</p>
      <div style="display: flex; justify-content: space-between; margin-top:5px;">
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
  sortedNames = names.sort((a, b) => (a.title < b.title ? -1 : 1));
  const htmlWeb = displayWebsites({ websites, sortedNames });

  //   console.log(websites);
  root.innerHTML = htmlWeb;
};

input.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  let websites = "";
  sortedNames = names.sort((a, b) => (a.title < b.title ? -1 : 1));

  const filterWebsites = sortedNames?.filter((character) => {
    return (
      character.title.toLowerCase().includes(searchString) ||
      character.description.toLowerCase().includes(searchString)
    );
  });
  const htmlWeb = displayWebsites({ websites, sortedNames: filterWebsites });

  root.innerHTML = htmlWeb;
});
