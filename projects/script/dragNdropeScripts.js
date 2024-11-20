const UNSPLASH_ACCESS_KEY = "xI-ooV26sB_X8NCbPR16bWsmQyBI2mOWzwV2kD3T3wQ";
const image = document.getElementById("fill");
const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");

async function loadRandomImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`
    );

    const data = await response.json();
    const IMAGE_URL = data.urls.regular;

    image.style.backgroundImage = `url(${IMAGE_URL})`;
  } catch (error) {
    console.log("Помилка: ", error);
  }
}

loadRandomImage();

fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);

for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
}

function dragStart() {
  //   console.log("drag start");
  fill.className += " hold";
  setTimeout(() => {
    fill.className = "invisible";
  }, 10);
}
function dragEnd() {
  //   console.log("drag End");
  fill.className = "fill";
}
function dragOver(e) {
  //   console.log("drag Over");
  e.preventDefault();
}
function dragEnter(e) {
  //   console.log("drag Enter");
  e.preventDefault();
  e.target.className += " hovered";
}
function dragLeave(e) {
  //   console.log("drag Leave");
  e.target.className = "empty";
}
function dragDrop(e) {
  //   console.log("drag Drop");
  e.target.className = "empty";
  e.target.append(fill);
}
