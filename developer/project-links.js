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

  const restoreContactSwitchboard = () => {
    const contact = document.getElementById('contact');
    const glow = contact?.querySelector('.contact-glow');
    const hero = contact?.querySelector('.contact-v2__hero');
    let actions = contact?.querySelector('.contact-v2__actions');
    if (!contact || !glow || !hero) return;

    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'contact-v2__actions';
    }

    // Original repo composition: statement on the left, four destinations on the right.
    if (actions.parentElement !== glow || actions.previousElementSibling !== hero) {
      hero.insertAdjacentElement('afterend', actions);
    }

    actions.innerHTML = `
      <a href="mailto:cuencajakekevin@gmail.com" data-cursor="MAIL">
        <span>01 / EMAIL</span><strong>CUENCAJAKEKEVIN@GMAIL.COM</strong><i>↗</i>
      </a>
      <a href="https://github.com/jlcuenca00" target="_blank" rel="noopener noreferrer" data-cursor="OPEN">
        <span>02 / GITHUB</span><strong>JLCUENCA00</strong><i>↗</i>
      </a>
      <a href="resume.pdf" target="_blank" rel="noopener noreferrer" data-cursor="PDF">
        <span>03 / RESUME</span><strong>OPEN CV</strong><i>↗</i>
      </a>
      <a class="contact-v2__creator" href="../photography/index.html" data-world-link data-cursor="ENTER">
        <span>04 / OTHER WORLD</span><strong>ENTER CREATOR</strong><i>↗</i>
      </a>
    `;
  };

  const addCiscoCertificates = () => {
    const credentials = document.getElementById('credentials');
    const folio = credentials?.querySelector('.certificate-folio');
    if (!credentials || !folio) return;

    const description = credentials.querySelector('.section-head > p');
    if (description) {
      description.textContent = 'Training and developer certifications with title, issuing organization, and issue date. Open each certificate record or verify the issuer credential where available.';
    }

    if (!folio.querySelector('[data-certificate="networking-basics"]')) {
      folio.insertAdjacentHTML('beforeend', `
        <article class="certificate-card" data-certificate="networking-basics" data-cursor="OPEN">
          <a class="certificate-paper" href="assets/certificates/networking-basics.html" target="_blank" rel="noopener noreferrer" aria-label="Open Networking Basics certificate record in a new tab">
            <header><span>05 / COURSE CERTIFICATE</span><strong>CISCO NETWORKING ACADEMY</strong></header>
            <div class="certificate-body"><small>DICT-ITU DTC INITIATIVE</small><p>JAKE KEVIN KLAIR CUENCA</p><h3>NETWORKING<br />BASICS</h3></div>
            <footer><div><span>ISSUED</span><strong>24 OCT 2025</strong></div><div><span>TYPE</span><strong>COURSE COMPLETION</strong></div><i>CISCO</i></footer>
          </a>
        </article>
      `);
    }

    if (!folio.querySelector('[data-certificate="intro-cybersecurity"]')) {
      folio.insertAdjacentHTML('beforeend', `
        <article class="certificate-card" data-certificate="intro-cybersecurity" data-cursor="OPEN">
          <a class="certificate-paper" href="assets/certificates/introduction-to-cybersecurity.html" target="_blank" rel="noopener noreferrer" aria-label="Open Introduction to Cybersecurity certificate record in a new tab">
            <header><span>06 / COURSE CERTIFICATE</span><strong>CISCO NETWORKING ACADEMY</strong></header>
            <div class="certificate-body"><small>NETWORKING ACADEMY</small><p>JAKE KEVIN CUENCA</p><h3>INTRODUCTION TO<br />CYBERSECURITY</h3></div>
            <footer><div><span>ISSUED</span><strong>30 AUG 2026</strong></div><div><span>CERT ID</span><strong>2A90BEC1…FFDAE9</strong></div><i>CISCO</i></footer>
          </a>
          <a class="certificate-verify" href="https://www.netacad.com/recognitions/verify/2a90bec1-e9c3-4b48-932a-1e8564ffdae9" target="_blank" rel="noopener noreferrer">VERIFY ↗</a>
        </article>
      `);
    }
  };

  const sync = () => {
    syncProjectLinks();
    restoreContactSwitchboard();
    addCiscoCertificates();
  };

  ensureWcag();
  sync();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync, { once: true });
  }

  // requirements-audit.js performs late normalization passes; restore intended
  // contact/certificate structure after those passes as well.
  window.setTimeout(sync, 180);
  window.setTimeout(sync, 560);
})();
