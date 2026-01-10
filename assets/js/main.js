/* =========================================================
   Shree Ramkrishna Gau Raksha Sewa Samiti
   main.js
   - Hindi-first language system
   - Safe for GitHub Pages
   - No frameworks, no hacks
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------- LANGUAGE TOGGLE ---------------- */

  const langSelect = document.querySelector("[data-lang-select]");
  const defaultLang = "hi";

  function applyLanguage(lang) {
    fetch(`lang-${lang}.json`)
      .then(response => response.json())
      .then(dictionary => {
        document.querySelectorAll("[data-i18n]").forEach(el => {
          const key = el.getAttribute("data-i18n");
          if (dictionary[key]) {
            el.innerHTML = dictionary[key];
          }
        });
      })
      .catch(() => {
        console.warn("Language file not found:", lang);
      });
  }

  if (langSelect) {
    const savedLang = localStorage.getItem("siteLang") || defaultLang;
    langSelect.value = savedLang;
    applyLanguage(savedLang);

    langSelect.addEventListener("change", function () {
      localStorage.setItem("siteLang", this.value);
      applyLanguage(this.value);
    });
  } else {
    // Apply default language if selector not present
    applyLanguage(localStorage.getItem("siteLang") || defaultLang);
  }

  /* ---------------- MOBILE NAV TOGGLE ---------------- */

  const navToggle = document.querySelector("[data-nav-toggle]");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      siteNav.classList.toggle("nav-open");
    });
  }

});
