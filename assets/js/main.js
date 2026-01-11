const DEFAULT_LANG = 'hi';

function getBasePath() {
  return window.location.pathname.includes('/gaushala-website/')
    ? '/gaushala-website/'
    : '/';
}

async function loadLanguage(lang) {
  try {
    const response = await fetch(`${getBasePath()}lang-${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    localStorage.setItem('lang', lang);
  } catch (e) {
    console.error('Language load failed', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  /* Language */
  const selector = document.querySelector('[data-lang-select]');
  const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;

  if (selector) {
    selector.value = savedLang;
    selector.addEventListener('change', e => loadLanguage(e.target.value));
  }

  loadLanguage(savedLang);

  /* Mobile Menu */
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navGroup');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});
