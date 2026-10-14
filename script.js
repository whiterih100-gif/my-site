const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeLabel = document.querySelector('.theme-label');
let savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('moru-theme') || 'light';
} catch {
  // The theme switch still works for this visit if storage is unavailable.
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  const nextMode = isDark ? '라이트 모드' : '다크 모드';
  themeIcon.textContent = isDark ? '☀' : '☾';
  themeLabel.textContent = nextMode;
  themeToggle.setAttribute('aria-label', `${nextMode}로 전환`);
  themeToggle.title = `${nextMode}로 전환`;
}

setTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem('moru-theme', nextTheme);
  } catch {
    // Keep the selected theme for the current page even if it cannot be saved.
  }
  setTheme(nextTheme);
});

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '메뉴 열기');
  primaryNav.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
  primaryNav.classList.toggle('is-open', !isOpen);
});

primaryNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});
