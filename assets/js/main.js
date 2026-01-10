const DEFAULT_LANG = 'hi';

function getBasePath() {
  // Works for both localhost and GitHub Pages
  const path = window.location.pathname;
  return path.includes('/gaushala-website/')
    ? '/gaushala-website/'
    : '/';
}

async function loadLanguage(lang) {
  const base = getBasePath();

  try {
    const response = await fetch(`${base}lang-${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    localStorage.setItem('lang', lang);
  } catch (err) {
    console.error('Language load failed:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;
  const selector = document.querySelector('[data-lang-select]');

  if (selector) {
    selector.value = savedLang;
    selector.addEventListener('change', e => {
      loadLanguage(e.target.value);
    });
  }

  loadLanguage(savedLang);
});
