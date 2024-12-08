const screens = document.querySelectorAll(".screen");
const players = document.querySelectorAll(".player-name");
const gameBoard = document.getElementById("container-board");
const infoPl = document.querySelector(".container-info-pl");
const go = document.querySelector(".container-go");
// buttons
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");
const reloadBtn = document.getElementById("reloadBtn");
const nextMove = document.getElementById("nextMove");
const firstMove = document.getElementById("firstMove");
// players
const firstPlayerInput = document.getElementById("firstPlayerInput");
const secondPlayerInput = document.getElementById("secondPlayerInput");
const onePlayerName = document.getElementById("playerOneName");
const twoPlayerName = document.getElementById("playerTwoName");
const firstPlayerName = document.getElementById("firstPlayerName");
const secondPlayerName = document.getElementById("secondPlayerName");
const firstPlayerScoreInput = document.getElementById("firstPlayerScore");
const secondPlayerScoreInput = document.getElementById("secondPlayerScore");

reloadBtn.addEventListener("click", () => location.reload());

let firstPlayer = "";
let secondPlayer = "";

startBtn.addEventListener("click", () => {
  firstPlayer = firstPlayerInput.value;
  secondPlayer = secondPlayerInput.value;
  onePlayerName.innerText = firstPlayerInput.value;
  twoPlayerName.innerText = secondPlayerInput.value;

  firstPlayerName.innerHTML = `<strong>${firstPlayerInput.value}</strong> plays for X`;
  secondPlayerName.innerHTML = `<strong>${secondPlayerInput.value}</strong> plays for O`;

  players.forEach((player) => {
    player.classList.add("in");
  });
  screens[0].classList.add("up");

  setTimeout(() => {
    infoPl.classList.add("hidden");
    setTimeout(() => {
      go.classList.remove("hidden");
    }, 750);
  }, 1500);

  setTimeout(() => {
    screens[1].classList.add("up");
  }, 3000);
});

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  gameBoard.appendChild(cell);
}

let currentPlayer = "X";
let firstPlayerScore = 0;
let secondPlayerScore = 0;
let winnerPlayer = "";
let draw = "";
let winner = "";

const cells = document.querySelectorAll(".cell");
const gameState = Array(9).fill(null);

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.dataset.index;

  if (gameState[cellIndex] || checkWinner()) return;

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  winnerPlayer = currentPlayer === "X" ? firstPlayer : secondPlayer;

  if (checkWinner()) {
    winner = `${winnerPlayer} is WINNER!`;
    setTimeout(() => alert(winner), 100);
    return;
  }

  if (checkDraw()) {
    setTimeout(() => alert("Draw!"), 100);
    draw = "Draw";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  firstMove.innerText = "next";
  nextMove.innerHTML = currentPlayer;
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      hightlightWinningCells(combination);
      return true;
    }
  }
  return false;
}

function hightlightWinningCells(combination) {
  combination.forEach((index) => {
    cells[index].classList.add("cell-win");
  });
}

function checkDraw() {
  return gameState.every((cell) => cell !== null);
}

restartBtn.addEventListener("click", () => {
  gameState.fill(null);
 
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("cell-win");
  });
  // currentPlayer = "X";
  firstMove.innerText = "first";
  nextMove.innerText = currentPlayer;

  if (draw === "Draw") {
    firstPlayerScore++;
    secondPlayerScore++;
  } else if (winner === `${firstPlayer} is WINNER!`) {
    firstPlayerScore++;
  } else if (winner === `${secondPlayer} is WINNER!`) {
    secondPlayerScore++;
  }
  firstPlayerScoreInput.innerText = firstPlayerScore;
  secondPlayerScoreInput.innerText = secondPlayerScore;

  draw = "";
  winner = "";
});
