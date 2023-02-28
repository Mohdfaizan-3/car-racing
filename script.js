const startContainer = document.querySelector(".start");
const gameContainer = document.querySelector(".game");
const scoreContainer = document.querySelector(".score");


function startGame() {
  startContainer.classList.add('hide');
}

startContainer.addEventListener('click',startGame)