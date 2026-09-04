(() => {
  const mobileQuery = window.matchMedia('(max-width: 800px), (hover: none), (pointer: coarse)');

  const init = () => {
    const poster = document.getElementById('heroPoster');
    if (!poster || poster.dataset.mobileFlipReady === 'true') return;

    poster.dataset.mobileFlipReady = 'true';

    const syncAccessibility = () => {
      const mobile = mobileQuery.matches;
      const system = poster.classList.contains('is-system-view');

      if (mobile) {
        poster.setAttribute('role', 'button');
        poster.tabIndex = 0;
        poster.setAttribute('aria-pressed', system ? 'true' : 'false');
        poster.setAttribute('aria-label', system ? 'Show front-end side' : 'Show full-stack side');
      } else {
        poster.removeAttribute('role');
        poster.removeAttribute('aria-pressed');
        poster.removeAttribute('aria-label');
        poster.removeAttribute('tabindex');
        poster.classList.remove('is-system-view');
      }
    };

    const toggle = () => {
      if (!mobileQuery.matches) return;
      poster.classList.toggle('is-system-view');
      syncAccessibility();
    };

    poster.addEventListener('click', (event) => {
      if (!mobileQuery.matches) return;
      if (event.target.closest('a, button')) return;
      toggle();
    });

    poster.addEventListener('keydown', (event) => {
      if (!mobileQuery.matches || !['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      toggle();
    });

    mobileQuery.addEventListener?.('change', syncAccessibility);
    syncAccessibility();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
