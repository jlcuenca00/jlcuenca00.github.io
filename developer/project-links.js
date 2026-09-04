(() => {
  const FOURFOLD_URL = 'https://mbti-test-khip.onrender.com/';

  const ensureWcag = () => {
    if (document.querySelector('script[data-wcag-developer]')) return;
    const script = document.createElement('script');
    script.src = 'wcag.js?v=20260904-2';
    script.async = false;
    script.dataset.wcagDeveloper = 'true';
    document.head.appendChild(script);
  };

  const syncProjectLinks = () => {
    const fourfold = document.querySelector('[data-project-panel="fourfold"]');
    if (!fourfold) return;

    fourfold.href = FOURFOLD_URL;
    fourfold.setAttribute('aria-label', 'Fourfold personality test project — open live app in new tab');

    const action = fourfold.querySelector('.project-panel__open');
    if (action) action.textContent = 'LIVE ↗';
  };

  ensureWcag();
  syncProjectLinks();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncProjectLinks, { once: true });
  }
})();
