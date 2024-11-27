const UNSPLASH_ACCESS_KEY = "xI-ooV26sB_X8NCbPR16bWsmQyBI2mOWzwV2kD3T3wQ";
const UNSPLAHS_URL = "https://api.unsplash.com/photos/random?client_id=";

const container = document.querySelector(".container");
const modal = document.getElementById("modal");

const rows = 20;

// for (let i = 0; i < rows * 3; i++) {
//     const img = document.createElement("img");
//     img.src =
// }

async function fetchData() {
  const response = await fetch(
    `${UNSPLAHS_URL}${UNSPLASH_ACCESS_KEY}&count=${rows}`
  );
  return response.json();
}

async function loadImg() {
  const imgs = await fetchData();
//   console.log(imgs);

  imgs.forEach((image) => {
    const img = document.createElement("img");
    img.src = image.urls.regular;
    img.alt = image.alt_description;
    container.appendChild(img);

    img.addEventListener("click", () => {
      modal.innerHTML = `
      <div class="modal-content">
        <img src="${image.urls.regular}" alt="${image.alt_description}" />
        </div>
      `;
      modal.style.display = "block";

      window.addEventListener("click", (e) => {
        if (e.target == modal) {
          modal.style.display = "none";
        }
      });
    });
  });
}

loadImg();

function getRandomSize() {
  return `${getRandomNr()}x${getRandomNr()}`;
}

function getRandomNr() {
  return Math.floor(Math.random() * 10) + 300;
}

// console.log(getRandomNr());
// console.log(getRandomSize());
// console.log(`${UNSPLAHS_URL}${UNSPLASH_ACCESS_KEY}&count=${rows}`);
