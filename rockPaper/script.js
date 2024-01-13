const SCISSOR = "scissors",
  PAPER = "paper",
  ROCK = "rock";
const moves = ["scissors", "paper", "rock"];
const options = document.querySelector(".game-options");
const message = document.getElementById("message");
const playerOneImg = document.querySelector(".player-1-choice img");
const playerTwoImg = document.querySelector(".player-2-choice img");

let playerOneMove = "";
let playerTwoMove = "";

function getRandomMove() {
  return moves[Math.floor(Math.random() * 3)];
}

options.addEventListener("click", (event) => {
  playerTwoMove = getRandomMove();
  playerOneMove = event.target.dataset.id;
  options.style.pointerEvents = "none";
  console.log(playerOneMove, playerTwoMove);
  playerOneImg.src = `images/${playerOneMove}.png`;
  playerOneImg.classList.remove("animate-1");
  playerTwoImg.src = `images/${playerTwoMove}.png`;
  playerTwoImg.classList.remove("animate-2");
  checkWinner();
});

function checkWinner() {
  if (playerOneMove == playerTwoMove) {
    message.innerHTML = "draw!";
  } else if (
    (playerOneMove == SCISSOR && playerTwoMove == PAPER) ||
    (playerOneMove == PAPER && playerTwoMove == ROCK) ||
    (playerOneMove == ROCK && playerTwoMove == SCISSOR)
  ) {
    message.innerHTML = "you win!";
  } else {
    message.innerHTML = "you lost!";
  }
  restart();
}

function restart() {
  setTimeout(() => {
    playerTwoMove = getRandomMove();
    message.innerHTML = "start!";
    playerOneImg.src = `images/hand.png`;
    playerOneImg.classList.add("animate-1");
    playerTwoImg.src = `images/hand.png`;
    playerTwoImg.classList.add("animate-2");
    options.style.pointerEvents = "";
  }, 2000);
}
