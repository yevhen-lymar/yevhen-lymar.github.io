const screens = document.querySelectorAll(".screen");
const choose_insect_btn = document.querySelectorAll(".choose-insect-btn");
const startBtn = document.getElementById("start-btn");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
const game_container = document.getElementById("game-container");
const reloadBtn = document.getElementById("reload-btn");

reloadBtn.addEventListener("click", () => location.reload());

let seconds = 0;
let score = 0;
let selected_insect = {};

startBtn.addEventListener("click", () => {
  screens[0].classList.add("up");
});

choose_insect_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selected_insect = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let minute = Math.floor(seconds / 60);
  let second = seconds % 60;
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  timeEl.innerHTML = `Time: ${minute}:${second}`;
  seconds++;
}

function createInsect() {
  const insect = document.createElement("div");
  insect.classList.add("insect");

  const { x, y } = getRandomLocation();

  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `
  <img src="${selected_insect.src}" alt="${
    selected_insect.alt
  }" style="transform: rotate(${Math.random() * 360}deg)" />
  `;

  insect.addEventListener("click", catchInsect);

  game_container.appendChild(insect);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchInsect() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => {
    this.remove(this);
  }, 2000);
  addInsects();
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
}
