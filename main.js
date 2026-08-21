document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };

  menuButton?.addEventListener('click', () => {
    if (!nav) return;
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const sections = document.querySelectorAll('main > section');
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    sections.forEach((section) => section.classList.add('reveal-ready'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
  }

  const parallaxItems = document.querySelectorAll('[data-parallax]');
  let framePending = false;
  const updateParallax = () => {
    if (!reduceMotion.matches) {
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 0);
        const rect = item.parentElement.getBoundingClientRect();
        item.style.transform = `translate3d(0, ${(window.innerHeight / 2 - rect.top) * speed}px, 0)`;
      });
    }
    framePending = false;
  };
  window.addEventListener('scroll', () => {
    if (!framePending && parallaxItems.length) {
      window.requestAnimationFrame(updateParallax);
      framePending = true;
    }
  }, { passive: true });
  updateParallax();
});
