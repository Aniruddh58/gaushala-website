const DEFAULT_LANG = 'hi';

function getBasePath() {
  const path = window.location.pathname;
  return path.includes('/gaushala-website/')
    ? '/gaushala-website/'
    : '/';
}

async function loadLanguage(lang) {
  try {
    const response = await fetch(`${getBasePath()}lang-${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) el.textContent = translations[key];
    });

    localStorage.setItem('lang', lang);
  } catch (e) {
    console.error('Language error', e);
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
  const toggle = document.querySelector('.menu-toggle');
  const navGroup = document.querySelector('.nav-group');

  if (toggle && navGroup) {
    toggle.addEventListener('click', () => {
      navGroup.classList.toggle('active');
    });
  }
});
