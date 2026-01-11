/* =========================================================
   Shree Ramkrishna Gau Raksha Sewa Samiti
   FINAL MAIN JS
   Hamburger + Language (LOCKED & SAFE)
   ========================================================= */

const DEFAULT_LANG = "hi";

/* ---------- BASE PATH (GitHub Pages safe) ---------- */
function getBasePath() {
  const path = window.location.pathname;
  return path.includes("/gaushala-website/")
    ? "/gaushala-website/"
    : "/";
}

/* ---------- LANGUAGE LOADER ---------- */
async function loadLanguage(lang) {
  const base = getBasePath();

  try {
    const response = await fetch(`${base}lang-${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    localStorage.setItem("lang", lang);
  } catch (err) {
    console.error("Language load failed:", err);
  }
}

/* ---------- DOM READY ---------- */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== LANGUAGE ===== */
  const savedLang = localStorage.getItem("lang") || DEFAULT_LANG;
  const selector = document.querySelector("[data-lang-select]");

  if (selector) {
    selector.value = savedLang;

    selector.addEventListener("change", e => {
      loadLanguage(e.target.value);
    });
  }

  loadLanguage(savedLang);

  /* ===== HAMBURGER MENU ===== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navGroup = document.querySelector(".nav-group");

  if (menuToggle && navGroup) {
    menuToggle.addEventListener("click", () => {
      navGroup.classList.toggle("active");
    });
  }
});
