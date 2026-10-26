/* Content is in HTML. JavaScript only enhances previews and movement. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 700px)');
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
  const buttons = [...document.querySelectorAll('[data-preview]')];
  const images = [...document.querySelectorAll('[data-preview-image]')];
  const previewName = document.getElementById('preview-name');
  const previewKind = document.getElementById('preview-kind');
  let active = 'dar';
  function selectProject(button) {
    if (!button || button.dataset.preview === active) return;
    active = button.dataset.preview;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    images.forEach(image => {
      const selected = image.dataset.previewImage === active;
      image.classList.toggle('is-active', selected);
      image.setAttribute('aria-hidden', String(!selected));
    });
    previewName.textContent = button.querySelector('span').textContent;
    previewKind.textContent = button.querySelector('.project-kind').textContent;
  }
  buttons.forEach(button => {
    button.addEventListener('click', () => selectProject(button));
    button.addEventListener('focus', () => selectProject(button));
    button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') selectProject(button);
    });
  });
  // On phones every image is next to its project, so preview controls become plain headings.
  function syncControls() {
    buttons.forEach(button => {
      button.tabIndex = mobile.matches ? -1 : 0;
      if (mobile.matches) {
        button.setAttribute('role', 'heading');
        button.setAttribute('aria-level', '3');
        button.removeAttribute('aria-pressed');
        button.removeAttribute('aria-controls');
      } else {
        button.removeAttribute('role');
        button.removeAttribute('aria-level');
        button.setAttribute('aria-pressed', String(button.dataset.preview === active));
        button.setAttribute('aria-controls', 'project-preview');
      }
    });
  }
  syncControls();
  mobile.addEventListener('change', syncControls);
  // Direct credential/resume anchors also open the native disclosure.
  function openAnchor() {
    const id = location.hash.slice(1);
    if (!id) return;
    const destination = document.getElementById(id);
    if (destination?.tagName === 'DETAILS') destination.open = true;
  }
  openAnchor();
  window.addEventListener('hashchange', openAnchor);
  // Reveal content already visible in HTML; failure cannot leave a blank page.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (reduced.matches) return;
        const picture = entry.target.matches('figure, .about-facts');
        entry.target.animate(picture
          ? [{ transform: 'scale(.97)', opacity: .6 }, { transform: 'scale(1)', opacity: 1 }]
          : [{ transform: 'translateY(24px)', opacity: .5 }, { transform: 'translateY(0)', opacity: 1 }],
          { duration: picture ? 1000 : 750, easing: 'cubic-bezier(.16,1,.3,1)' });
      });
    }, { threshold: .12 });
    document.querySelectorAll('.section-opening, .project, .more-work, .about-facts, .about-story > p, .skills, .record-heading, .record-details, .contact-email, .contact-links').forEach(node => observer.observe(node));
  }
  reduced.addEventListener('change', () => {
    if (reduced.matches) document.getAnimations().forEach(animation => animation.finish());
  });
})();
