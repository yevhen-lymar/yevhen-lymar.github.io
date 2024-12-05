const screens = document.querySelectorAll(".screen");
const gameBoard = document.getElementById("container-board");
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");
const reloadBtn = document.getElementById("reloadBtn");
const nextMove = document.getElementById("nextMove");
const firstMove = document.getElementById("firstMove");
const firstPlayerInput = document.getElementById("firstPlayerInput");
const secondPlayerInput = document.getElementById("secondPlayerInput");
const firstPlayerName = document.getElementById("firstPlayerName");
const secondPlayerName = document.getElementById("secondPlayerName");
const firstPlayerScoreInput = document.getElementById("firstPlayerScore");
const secondPlayerScoreInput = document.getElementById("secondPlayerScore");

reloadBtn.addEventListener("click", () => location.reload());

let firstPlayer = "";
let secondPlayer = "";

startBtn.addEventListener("click", () => {
  screens[0].classList.add("up");

  firstPlayerName.innerHTML = `<strong>${firstPlayerInput.value}</strong> plays for X`;
  secondPlayerName.innerHTML = `<strong>${secondPlayerInput.value}</strong> plays for O`;

  firstPlayer = firstPlayerInput.value;
  secondPlayer = secondPlayerInput.value;
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
    setTimeout(() => alert(`${winnerPlayer} is WINNER!`), 100);
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
  nextMove.innerHTML = currentPlayer;

  if (draw === "Draw") {
    firstPlayerScore++;
    secondPlayerScore++;
  } else if (winnerPlayer === firstPlayer) {
    firstPlayerScore++;
  } else {
    secondPlayerScore++;
  }

  firstPlayerScoreInput.innerText = firstPlayerScore;
  secondPlayerScoreInput.innerText = secondPlayerScore;
});
