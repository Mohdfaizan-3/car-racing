const startContainer = document.querySelector(".starts");
const gameContainer = document.querySelector(".game");
const scoreContainer = document.querySelector(".score");

let player = { speed: 3, score: 0 };
let highest = 0;

startContainer.addEventListener("click", startGame);

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function keydown(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function keyup(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function playGame() {
  let car = document.querySelector(".car");

  let road = gameContainer.getBoundingClientRect();

  if (player.start) {
    moveLine();
    moveOppCar(car);
    if (keys.ArrowUp && player.y > road.top) {
      player.y -= player.speed;
    }

    if (keys.ArrowDown && player.y < road.bottom - 130) {
      player.y += player.speed;
    }

    if (keys.ArrowLeft && player.x > 35) {
      player.x -= player.speed;
    }

    if (keys.ArrowRight && player.x < road.width - 40) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(playGame);

    player.score++;

    if (player.score >= highest) {
      highest = player.score;
    }

    scoreContainer.innerText =
      "your score: " +
      player.score +
      " | " +
      "Highest Score: " +
      highest;
  }
}

function isCollide(a, b) {
  let aR = a.getBoundingClientRect();
  let br = b.getBoundingClientRect();
  console.log("aR", aR);
  console.log("br", br);
  return !(
    aR.bottom < br.top ||
    aR.top > br.bottom ||
    aR.right < br.left ||
    aR.left > br.right
  );
}
function endgame() {
  player.start = false;
  startContainer.classList.remove("hide");
}

function moveLine() {
  let lines = document.querySelectorAll(".line");
  lines.forEach((item) => {
    if (item.y >= 700) {
      item.y -= 700;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function moveOppCar(car) {
  let otherCars = document.querySelectorAll(".oppcar");
  otherCars.forEach((item) => {
    if (isCollide(car, item)) {
      endgame();
    }

    if (item.y >= 700) {
      item.y -= 800;
      item.style.left =
        Math.floor(Math.random() * 400) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function startGame() {
  startContainer.classList.add("hide");
  gameContainer.innerHTML = "";
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(playGame);

  // create car
  let carDiv = document.createElement("div");
  carDiv.setAttribute("class", "car");
  let carBody = document.createElement("i");
  carBody.classList.add("fa", "fa-car");
  carDiv.appendChild(carBody);
  gameContainer.appendChild(carDiv);

  player.x = carDiv.offsetLeft;
  player.y = carDiv.offsetTop;

  for (let i = 0; i < 5; i++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "line");
    roadLine.y = i * 140;
    roadLine.style.top = roadLine.y + "px";
    gameContainer.appendChild(roadLine);
  }
  for (let i = 0; i < 3; i++) {
    let oppCar = document.createElement("div");
    oppCar.setAttribute("class", "oppcar");
    let carBody = document.createElement("i");
    carBody.classList.add("fa", "fa-car");
    carBody.style.color = "red";
    oppCar.appendChild(carBody);
    oppCar.y = (i + 1) * 350 * -1;
    oppCar.style.top = oppCar.y + "px";
    oppCar.style.left =
      Math.floor(Math.random() * 350) + "px";
    gameContainer.appendChild(oppCar);
  }
}
