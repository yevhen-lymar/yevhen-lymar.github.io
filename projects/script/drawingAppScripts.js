const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const saveEl = document.getElementById("save");
const toolbox = document.getElementById("toolbox");

const ctx = canvas.getContext("2d");

let size = 20;
let isPressed = false;
colorEl.value = "#000000";
let color = colorEl.value;
console.log(color);
let x;
let y;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;

  //   console.log(isPressed, x, y);
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;

  //   console.log(isPressed, x, y);
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    // console.log(x2, y2);
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

canvas.addEventListener("touchstart", (e) => {
  isPressed = true;
  const touch = e.touches[0];
  x = touch.clientX - canvas.offsetLeft;
  y = touch.clientY - canvas.offsetTop;
});

canvas.addEventListener("touchend", () => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("touchmove", (e) => {
  if (isPressed) {
    e.preventDefault(); // Відключаємо стандартну прокрутку
    const touch = e.touches[0];
    const x2 = touch.clientX - canvas.offsetLeft;
    const y2 = touch.clientY - canvas.offsetTop;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => {
  color = e.target.value;
  console.log(e.target.value);
});

clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveEl.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "canvas_image.png";
  link.click();
});

function resizeCanvas() {
  const originalSize = 600;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  if (windowWidth < 550) {
    canvas.width = windowWidth - 40;
    canvas.height = windowHeight - 300;
    toolbox.style.width = windowWidth - 40 + 4 + "px";
  } else {
    canvas.width = originalSize;
    canvas.height = originalSize;
    toolbox.style.width = originalSize + 4 + "px";
  }
  // console.log(windowWidth, windowHeight, toolbox.style.width);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
