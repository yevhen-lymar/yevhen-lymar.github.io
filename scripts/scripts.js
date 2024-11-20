const toggleLangBtn = document.getElementById("lang-toggle");
const pageContent = document.getElementById("page-content");
const loader = document.getElementById("loader");
const scrollUpBtn = document.getElementById("up-scroll");

let currentLang = "en";
let translations = {};

async function loadTranslations() {
  try {
    const response = await fetch("../language/translations.json");
    translations = await response.json();
    // console.log(translations)
    const savedLang = localStorage.getItem("language") || "en";
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
  localStorage.setItem("language", lang);
}

toggleLangBtn.addEventListener("click", toggleLanguage);

function toggleLanguage() {
  pageContent.classList.add("hidden");

  setTimeout(() => {
    loader.classList.remove("hidden");
    loader.classList.add("visible");
    setTimeout(() => {
      const newLang = currentLang === "en" ? "uk" : "en";
      updateLanguage(newLang);
      loader.classList.remove("visible");
      loader.classList.add("hidden");
      pageContent.classList.remove("hidden");
    }, 1500);
  }, 500);
}

document.addEventListener("DOMContentLoaded", loadTranslations);

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
