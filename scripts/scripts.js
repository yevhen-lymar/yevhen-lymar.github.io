const toggleLangBtn = document.getElementById("lang-toggle");
const pageContent = document.getElementById("page-content");
const loader = document.getElementById("loader");
const scrollUpBtn = document.getElementById("up-scroll");
const aboutBtn = document.getElementById("aboutBtn");
const modal = document.getElementById("modal");

let currentLang = "en";
let translations = {};

async function fetchLang() {
  const response = await fetch("../language/translations.json");
  return response.json();
}

async function loadTranslations() {
  try {
    translations = await fetchLang();
    // const savedLang = localStorage.getItem("language") || "en";
    const savedLang = "en";
    updateLanguage(savedLang);
  } catch (error) {
    console.error("Error loading translations: ", error);
  }
}

function updateLanguage(lang) {
  currentLang = lang;

  document.documentElement.setAttribute("lang", lang);

  const elementsToTranslate = document.querySelectorAll("[data-translate]");

  elementsToTranslate.forEach((element) => {
    const key = element.getAttribute("data-translate");

    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  // localStorage.setItem("language", lang);
}

toggleLangBtn.addEventListener("click", () => {
  pageContent.classList.add("hidden");

  setTimeout(() => {
    loader.classList.remove("hidden");
    loader.classList.add("visible");
    setTimeout(() => {
      const newLang = currentLang === "en" ? "uk" : "en";
      updateLanguage(newLang);
      replaceBgBtnLang();
      loader.classList.remove("visible");
      loader.classList.add("hidden");
      pageContent.classList.remove("hidden");
    }, 1500);
  }, 500);
});

async function infoMeInModalWindow() {
  const info = await fetchLang();

  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const pageLang = document.documentElement.getAttribute("lang");

    const title = info[pageLang].info_me_title;
    const text = info[pageLang].info_me_text;

    modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-title-box">
        <h2>${title}</h2>
        <div class="close"><i class="fas fa-xmark"></i></div>
      </div>
      <div class="modal-info-box">
        <div class="modal-text-box">${text}</div>
      </div>
    </div>  
  `;
    modal.style.display = "block";

    modal.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close Modal Window
    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  });
}

function replaceBgBtnLang() {
  const newLang = currentLang;

  if (newLang === "uk") {
    toggleLangBtn.classList.remove("ukraine-bg");
    toggleLangBtn.classList.add("english-bg");
  } else {
    toggleLangBtn.classList.remove("english-bg");
    toggleLangBtn.classList.add("ukraine-bg");
  }
}

infoMeInModalWindow();
document.addEventListener("DOMContentLoaded", loadTranslations);
document.addEventListener("DOMContentLoaded", replaceBgBtnLang);

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollUpBtn.style.display = "block";
  } else {
    scrollUpBtn.style.display = "none";
  }
});

scrollUpBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
