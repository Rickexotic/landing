const mobileToggle = document.getElementById('mobileToggle');
const menu = document.getElementById('menu');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const scrollToTopBtn = document.getElementById('scrollToTop');
const assistantButton = document.getElementById('assistantButton');
const dropdownTrigger = document.querySelector('.dropdown-trigger');
const servicesDropdown = document.getElementById('servicesDropdown');

function setMenuOpen(isOpen) {
  menu.classList.toggle('active', isOpen);
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
  mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  mobileToggle.textContent = isOpen ? '✕' : '☰';
}

function setDropdownOpen(isOpen) {
  dropdownTrigger.setAttribute('aria-expanded', String(isOpen));
  servicesDropdown.classList.toggle('open', isOpen);
  dropdownTrigger.parentElement.classList.toggle('open', isOpen);
}

mobileToggle.addEventListener('click', () => {
  const isOpen = !menu.classList.contains('active');
  setMenuOpen(isOpen);
});

dropdownTrigger.addEventListener('click', () => {
  const isOpen = dropdownTrigger.getAttribute('aria-expanded') !== 'true';
  setDropdownOpen(isOpen);
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  });
});

document.addEventListener('click', event => {
  if (!event.target.closest('.menu-item')) {
    setDropdownOpen(false);
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('active')) {
    setMenuOpen(false);
    mobileToggle.focus();
  }
});

// Scrollspy — highlight active nav link based on scroll position
const spySections = ['home', 'services', 'about', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

function updateScrollSpy() {
  if (!spySections.length) return;
  const scrollY = window.scrollY + 120;
  let activeId = spySections[0].id;
  spySections.forEach(section => {
    if (section.offsetTop <= scrollY) activeId = section.id;
  });
  document.querySelectorAll('.menu > a, .menu-item > .menu-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isActive = href === `#${activeId}` ||
      (activeId === 'services' && link.classList.contains('dropdown-trigger'));
    link.classList.toggle('active', isActive);
  });
}

window.addEventListener('scroll', updateScrollSpy, { passive: true });
updateScrollSpy();

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  html.setAttribute('data-theme', 'dark');
  themeToggle.setAttribute('aria-pressed', 'true');
}

themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme');
  const isDark = theme !== 'dark';
  if (isDark) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
  themeToggle.setAttribute('aria-pressed', String(isDark));
});

if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  html.setAttribute('data-theme', 'dark');
  themeToggle.setAttribute('aria-pressed', 'true');
}

window.addEventListener('scroll', () => {
  if (scrollToTopBtn) scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
});

scrollToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

assistantButton?.addEventListener('click', () => {
  window.location.href = 'mailto:contact@46and2consulting.com?subject=Assistant%20Request';
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 991) {
    setMenuOpen(false);
    setDropdownOpen(false);
  }
});
