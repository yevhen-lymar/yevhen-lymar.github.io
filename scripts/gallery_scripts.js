// scroll variables
const scrollUpBtn = document.getElementById("up-scroll");
// modal window variables
const modal = document.getElementById("modal");
const IMAGES = document.querySelectorAll(".gallery-item img");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// modal window & slide images function

let currentIndex = 0;

function showImageInModal(index) {
  currentIndex = index;
  modalImg.src = IMAGES[currentIndex].src;
  modalTitle.innerText = IMAGES[currentIndex].alt;
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("show");
    modalImg.classList.add("show");
  }, 500);
}

function hideModal() {
  modal.classList.remove("show");
  modalImg.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
}

IMAGES.forEach((img, index) => {
  img.addEventListener("click", () => showImageInModal(index));
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
  showImageInModal(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % IMAGES.length;
  showImageInModal(currentIndex);
});

closeBtn.addEventListener("click", () => hideModal());

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

// Scroll function

function resetViwport() {
  window.scrollTo({
    top: 0,
  });
}

function scrollToUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollUpBtn.style.display = "block";
  } else {
    scrollUpBtn.style.display = "none";
  }
});

scrollUpBtn.addEventListener("click", scrollToUp);
