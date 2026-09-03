(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const setText = (element, value) => {
    if (element && element.textContent !== value) element.textContent = value;
  };

  function ensureFinalRefinement() {
    if (document.querySelector('link[data-final-refinement]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'final-refinement.css?v=20260904-1';
    link.dataset.finalRefinement = 'true';
    document.head.appendChild(link);
  }

  function ensureCursor() {
    const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion || document.body.classList.contains('cursor-enabled')) return;

    let cursor = document.getElementById('cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'cursor';
      cursor.id = 'cursor';
      cursor.setAttribute('aria-hidden', 'true');
      cursor.innerHTML = '<span></span><i id="cursorLabel">VIEW</i>';
      document.body.appendChild(cursor);
    }

    const label = document.getElementById('cursorLabel');
    if (!label) return;

    document.body.classList.add('cursor-enabled');
    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.36;
      y += (ty - y) * 0.36;
      cursor.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    addEventListener('pointermove', (event) => {
      tx = event.clientX;
      ty = event.clientY;
      cursor.style.opacity = '1';
      const target = event.target.closest('[data-cursor],a,button');
      const text = target?.dataset.cursor || (target?.matches('a') ? 'OPEN' : target?.matches('button') ? 'SELECT' : '');
      cursor.classList.toggle('is-active', Boolean(text));
      cursor.classList.toggle('is-blue', Boolean(target?.closest('[data-world-link],.creator-link,.creator-contact')));
      label.textContent = text || 'VIEW';
    }, { passive: true });

    addEventListener('pointerleave', () => { cursor.style.opacity = '0'; });
    addEventListener('beforeunload', () => cancelAnimationFrame(raf), { once: true });
  }

  function updateNavigation() {
    const nav = $('#navLinks');
    if (!nav) return;

    const specs = [
      ['#profile', 'ABOUT'],
      ['#capabilities', 'SKILLS'],
      ['#work', 'PROJECTS'],
      ['#history', 'EDUCATION'],
      ['#credentials', 'CERTS'],
      ['#resume', 'RESUME'],
      ['#contact', 'CONTACT']
    ];

    specs.forEach(([href, label]) => {
      let link = nav.querySelector(`a[href="${href}"]`);
      if (!link) {
        link = document.createElement('a');
        link.href = href;
      }
      setText(link, label);
      if (link !== nav.lastElementChild) nav.appendChild(link);
    });

    const creator = nav.querySelector('[data-world-link]');
    if (creator && creator !== nav.lastElementChild) nav.appendChild(creator);
  }

  function updateHero() {
    const meta = $$('.hero-meta > span');
    setText(meta[0], 'JAKE KEVIN KLAIR L. CUENCA');
    setText(meta[1], '4TH YEAR / BS INFORMATION TECHNOLOGY / DUMAGUETE, PH');

    const portrait = $('.hero-portrait');
    if (portrait) {
      portrait.removeAttribute('aria-hidden');
      portrait.setAttribute('role', 'img');
      portrait.setAttribute('aria-label', 'Jake Kevin Klair L. Cuenca in an Asian College uniform');
    }

    setText(
      $('.hero-foot > p'),
      'Hello! I’m Jake Kevin Klair L. Cuenca, a 4th Year BS Information Technology student focused on expressive front-end design and practical full-stack development.'
    );

    const workLink = $('.hero-foot a[href="#work"]');
    if (workLink) {
      workLink.href = '#profile';
      setText(workLink, 'ABOUT ME ↓');
    }
  }

  function updateAbout() {
    const profile = $('#profile');
    if (!profile) return;

    setText($('.direction-head span', profile), '02 / ABOUT ME');
    setText($('.profile-map-head span:first-child', profile), '02 / ABOUT ME');
    setText($('.profile-manifesto__eyebrow', profile), 'ABOUT / FRONT-END DIRECTION');
    setText(
      $('.profile-manifesto__note', profile),
      'I’m a 4th Year BS Information Technology student in Dumaguete City who enjoys turning ideas into interfaces with clear hierarchy, strong visual personality, and thoughtful interaction. My academic work spans front-end design, full-stack systems, and mobile applications.'
    );
    setText(
      $('.profile-foundation p', profile),
      'My goal is to grow as a front-end / creative developer who can also ship complete full-stack products. Outside development, photography and filmmaking keep me thinking about framing, rhythm, contrast, and visual storytelling.'
    );
  }

  function updateSectionLabels() {
    setText($('#capabilities .section-head > div > span'), '03 / SKILLS');
    setText(
      $('#capabilities .section-head > p'),
      'Four working modes across interface design, visual systems, backend development, and creative production.'
    );
    setText($('#work .direction-head > div > span'), '04 / PROJECTS');
    setText($('#history .direction-head > div > span'), '05 / EDUCATION');
    setText($('#credentials .section-head > div > span'), '06 / CERTIFICATES + ACHIEVEMENTS');
    setText(
      $('#credentials .section-head > p'),
      'Training and developer certifications with title, issuing organization, and issue date. Open the original PDF or verify the issuer credential where available.'
    );
    setText($('.contact-v2__meta > span', $('#contact')), '08 / CONTACT');
  }

  function createResumeSection() {
    if ($('#resume')) return;
    const contact = $('#contact');
    if (!contact) return;

    const section = document.createElement('section');
    section.className = 'resume-audit scene';
    section.id = 'resume';
    section.dataset.signal = 'quiet';
    section.setAttribute('aria-label', 'Resume download');
    section.innerHTML = `
      <div class="resume-audit__board is-visible">
        <div class="resume-audit__actions">
          <a href="resume.pdf" download="Jake-Cuenca-Resume.pdf" data-cursor="PDF">
            <span>CURRENT / 2026</span>
            <strong>RESUME / CV ↓</strong>
          </a>
        </div>
      </div>
    `;

    contact.before(section);
  }

  function reorderSections() {
    const main = $('main');
    if (!main) return;
    ['top', 'profile', 'capabilities', 'work', 'history', 'credentials', 'resume', 'contact'].forEach((id) => {
      const section = document.getElementById(id);
      if (section && section !== main.lastElementChild) main.appendChild(section);
    });
  }

  function updateDocumentMeta() {
    if (document.title !== 'Jake Cuenca — Front-End Designer / Full-Stack Developer') {
      document.title = 'Jake Cuenca — Front-End Designer / Full-Stack Developer';
    }
    const description = $('meta[name="description"]');
    const content = 'Jake Kevin Klair L. Cuenca — 4th Year BS Information Technology student, front-end designer, and full-stack developer. Portfolio of projects, skills, education, certifications, résumé, and contact information.';
    if (description && description.content !== content) description.content = content;
  }

  function applyAudit() {
    updateDocumentMeta();
    updateNavigation();
    updateHero();
    createResumeSection();
    reorderSections();
    updateSectionLabels();
    updateAbout();
  }

  function observeProfileBuild() {
    const profile = $('#profile');
    if (!profile || profile.dataset.requirementsObserver === 'true') return;
    profile.dataset.requirementsObserver = 'true';

    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        updateAbout();
      });
    });
    observer.observe(profile, { childList: true, subtree: true });
  }

  const start = () => {
    ensureFinalRefinement();
    applyAudit();
    observeProfileBuild();
    ensureCursor();
    window.setTimeout(applyAudit, 120);
    window.setTimeout(() => {
      applyAudit();
      ensureCursor();
    }, 420);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();