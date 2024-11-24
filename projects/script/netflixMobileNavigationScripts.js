const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const nav = document.querySelectorAll(".nav");

openBtn.addEventListener("click", () => {
  nav.forEach((navEl) => {
    navEl.classList.add("visible");
  });
});

closeBtn.addEventListener("click", () => {
  nav.forEach((navEl) => {
    navEl.classList.remove("visible");
  });
});
