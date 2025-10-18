document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('menu-button');
  const nav = document.getElementById('primary-nav');

  if (button && nav) {
    const toggleMenu = () => {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      button.classList.toggle('open', open);
    };

    button.addEventListener('click', toggleMenu);

    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          button.setAttribute('aria-expanded', 'false');
          button.classList.remove('open');
        }
      });
    });
  }
});
