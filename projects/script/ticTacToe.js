const gameBoard = document.getElementById("container-board");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";

const cells = document.querySelectorAll(".cell");
const gameState = Array(9).fill(null);

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

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  gameBoard.appendChild(cell);
}

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.dataset.index;

  if (gameState[cellIndex] || checkWinner()) return;

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    setTimeout(() => alert(`${currentPlayer} is WINNER!`), 100);
    return;
  }

  if (checkDraw()) {
    setTimeout(() => alert("Draw!"), 100);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function checkWinner() {
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
  currentPlayer = "X";
});
