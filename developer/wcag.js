(() => {
  const start = () => {
    const main = document.querySelector('main');
    if (main) {
      if (!main.id) main.id = 'main-content';
      main.setAttribute('tabindex', '-1');
    }

    if (!document.querySelector('.skip-link')) {
      const skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#main-content';
      skip.textContent = 'Skip to main content';
      skip.addEventListener('click', () => requestAnimationFrame(() => main?.focus({ preventScroll: true })));
      document.body.prepend(skip);
    }

    const nav = document.getElementById('siteNav');
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
      const syncToggle = () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
        navToggle.querySelectorAll('span').forEach(span => span.setAttribute('aria-hidden', 'true'));
      };
      syncToggle();
      new MutationObserver(syncToggle).observe(navToggle, { attributes: true, attributeFilter: ['aria-expanded'] });
    }

    const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const syncCurrent = () => {
      navLinks.forEach(link => {
        if (link.classList.contains('is-active')) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    if (nav) new MutationObserver(syncCurrent).observe(nav, { subtree: true, attributes: true, attributeFilter: ['class'] });
    syncCurrent();

    const capCards = [...document.querySelectorAll('.cap-card')];
    const syncCaps = () => capCards.forEach(card => {
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', card.classList.contains('is-active') ? 'true' : 'false');
      const heading = card.querySelector('h3')?.textContent?.replace(/\s+/g, ' ').trim();
      if (heading) card.setAttribute('aria-label', `${heading} skills`);
    });
    capCards.forEach(card => {
      card.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        card.click();
      });
      card.addEventListener('click', () => requestAnimationFrame(syncCaps));
      card.addEventListener('focus', () => requestAnimationFrame(syncCaps));
    });
    syncCaps();

    const educationRoot = document.getElementById('educationV2');
    if (educationRoot) {
      const tabs = [...educationRoot.querySelectorAll('[data-edu-level]')];
      const panels = [...educationRoot.querySelectorAll('[data-edu-panel]')];

      const syncEducation = () => {
        tabs.forEach((tab, index) => {
          const key = tab.dataset.eduLevel;
          const selected = tab.getAttribute('aria-selected') === 'true' || tab.classList.contains('is-active');
          const tabId = `education-tab-${key}`;
          const panelId = `education-panel-${key}`;
          tab.id = tabId;
          tab.setAttribute('role', 'tab');
          tab.setAttribute('aria-controls', panelId);
          tab.tabIndex = selected ? 0 : -1;
          const panel = panels.find(item => item.dataset.eduPanel === key);
          if (panel) {
            panel.id = panelId;
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', tabId);
            panel.tabIndex = 0;
            panel.hidden = !selected;
          }
          if (index === 0 && !tabs.some(item => item.getAttribute('aria-selected') === 'true')) tab.tabIndex = 0;
        });
      };

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => requestAnimationFrame(syncEducation));
        tab.addEventListener('focus', () => requestAnimationFrame(syncEducation));
        tab.addEventListener('keydown', event => {
          let nextIndex = null;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
          if (event.key === 'Home') nextIndex = 0;
          if (event.key === 'End') nextIndex = tabs.length - 1;
          if (nextIndex === null) return;
          event.preventDefault();
          tabs[nextIndex].focus();
          tabs[nextIndex].click();
        });
      });

      new MutationObserver(syncEducation).observe(educationRoot, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'aria-selected', 'data-active']
      });
      syncEducation();
    }

    const affiliationButtons = [...document.querySelectorAll('[data-aff-v2], .aff-strip')];
    const syncAffiliations = () => affiliationButtons.forEach(button => {
      if (!button.matches('button')) return;
      const expanded = button.getAttribute('aria-expanded') === 'true' || button.classList.contains('is-open');
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      const name = button.querySelector('.aff-strip__name, strong')?.textContent?.trim();
      if (name && !button.getAttribute('aria-label')) button.setAttribute('aria-label', `${name} affiliation details`);
    });
    affiliationButtons.forEach(button => {
      button.addEventListener('click', () => requestAnimationFrame(syncAffiliations));
      button.addEventListener('focus', () => requestAnimationFrame(syncAffiliations));
    });
    syncAffiliations();

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      if (link.dataset.wcagNewTab === 'true') return;
      link.dataset.wcagNewTab = 'true';
      const existing = link.getAttribute('aria-label');
      const label = existing || link.textContent.trim().replace(/\s+/g, ' ');
      if (label && !/new tab/i.test(label)) link.setAttribute('aria-label', `${label} — opens in a new tab`);
    });

    document.querySelectorAll('main > section[id]').forEach(section => {
      section.setAttribute('tabindex', '-1');
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
