(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function updateNavigation() {
    const nav = $('#navLinks');
    if (!nav) return;

    nav.innerHTML = `
      <a href="#profile">ABOUT</a>
      <a href="#capabilities">SKILLS</a>
      <a href="#work">PROJECTS</a>
      <a href="#history">EDUCATION</a>
      <a href="#credentials">CERTS</a>
      <a href="#resume">RESUME</a>
      <a href="#contact">CONTACT</a>
      <a class="creator-link" href="../photography/index.html" data-world-link data-cursor="ENTER">CREATOR ↗</a>
    `;
  }

  function updateHero() {
    const meta = $$('.hero-meta > span');
    if (meta[0]) meta[0].textContent = 'JAKE KEVIN KLAIR L. CUENCA';
    if (meta[1]) meta[1].textContent = '4TH YEAR / BS INFORMATION TECHNOLOGY / DUMAGUETE, PH';

    const intro = $('.hero-foot > p');
    if (intro) {
      intro.textContent = 'Hello! I’m Jake Kevin Klair L. Cuenca, a 4th Year BS Information Technology student focused on expressive front-end design and practical full-stack development.';
    }

    const workLink = $('.hero-foot a[href="#work"]');
    if (workLink) {
      workLink.href = '#profile';
      workLink.textContent = 'ABOUT ME ↓';
    }
  }

  function updateAbout() {
    const profile = $('#profile');
    if (!profile) return;

    const oldHeadLabel = $('.direction-head span', profile);
    if (oldHeadLabel) oldHeadLabel.textContent = '02 / ABOUT ME';

    const mapHead = $('.profile-map-head span:first-child', profile);
    if (mapHead) mapHead.textContent = '02 / ABOUT ME';

    const eyebrow = $('.profile-manifesto__eyebrow', profile);
    if (eyebrow) eyebrow.textContent = 'ABOUT / FRONT-END DIRECTION';

    const bio = $('.profile-manifesto__note', profile);
    if (bio) {
      bio.textContent = 'I’m a 4th Year BS Information Technology student in Dumaguete City who enjoys turning ideas into interfaces with clear hierarchy, strong visual personality, and thoughtful interaction. My academic work spans front-end design, full-stack systems, and mobile applications.';
    }

    const foundation = $('.profile-foundation p', profile);
    if (foundation) {
      foundation.textContent = 'My goal is to grow as a front-end / creative developer who can also ship complete full-stack products. Outside development, photography and filmmaking keep me thinking about framing, rhythm, contrast, and visual storytelling.';
    }
  }

  function updateSectionLabels() {
    const skills = $('#capabilities .section-head > div > span');
    if (skills) skills.textContent = '03 / SKILLS';

    const projects = $('#work .direction-head > div > span');
    if (projects) projects.textContent = '04 / PROJECTS';

    const education = $('#history .direction-head > div > span');
    if (education) education.textContent = '05 / EDUCATION';

    const credentials = $('#credentials .section-head > div > span');
    if (credentials) credentials.textContent = '06 / CERTIFICATES + ACHIEVEMENTS';

    const credentialsCopy = $('#credentials .section-head > p');
    if (credentialsCopy) credentialsCopy.textContent = 'Training and developer certifications with title, issuing organization, and issue date. Open the original PDF or verify the issuer credential where available.';

    const contact = $('.contact-v2__meta > span', $('#contact'));
    if (contact) contact.textContent = '08 / CONTACT';
  }

  function createResumeSection() {
    if ($('#resume')) return;
    const contact = $('#contact');
    if (!contact) return;

    const section = document.createElement('section');
    section.className = 'resume-audit scene';
    section.id = 'resume';
    section.dataset.signal = 'quiet';
    section.setAttribute('aria-labelledby', 'resumeTitle');
    section.innerHTML = `
      <header class="section-head is-visible">
        <div><span>07 / RESUME / CV</span><h2 id="resumeTitle">THE RECORD.<br><i>ONE PDF.</i></h2></div>
        <p>Open or download the current résumé. It summarizes my academic background, technical work, selected projects, leadership/media experience, and development direction.</p>
      </header>

      <div class="resume-audit__board is-visible">
        <div class="resume-audit__statement">
          <span>PDF / CURRENT / PORTFOLIO</span>
          <h3>READY<br>WHEN THE<br><i>DETAILS MATTER.</i></h3>
          <p>A concise record for applications, collaborations, academic review, and project discussions.</p>
        </div>

        <div class="resume-audit__index" aria-label="Resume content overview">
          <div><span>01</span><strong>CAREER DIRECTION</strong></div>
          <div><span>02</span><strong>EDUCATION</strong></div>
          <div><span>03</span><strong>SKILLS + PROJECTS</strong></div>
          <div><span>04</span><strong>LEADERSHIP + TRAINING</strong></div>
        </div>

        <div class="resume-audit__actions">
          <a href="resume.pdf" target="_blank" rel="noopener" data-cursor="PDF"><span>OPEN IN NEW TAB</span><strong>OPEN CV ↗</strong></a>
          <a href="resume.pdf" download="Jake-Cuenca-Resume.pdf" data-cursor="PDF"><span>SAVE A COPY</span><strong>DOWNLOAD PDF ↓</strong></a>
        </div>
      </div>
    `;

    contact.before(section);
  }

  function reorderSections() {
    const main = $('main');
    if (!main) return;

    const order = ['top', 'profile', 'capabilities', 'work', 'history', 'credentials', 'resume', 'contact'];
    order.forEach((id) => {
      const section = document.getElementById(id);
      if (section) main.appendChild(section);
    });
  }

  function updateDocumentMeta() {
    document.title = 'Jake Cuenca — Front-End Designer / Full-Stack Developer';
    const description = $('meta[name="description"]');
    if (description) {
      description.content = 'Jake Kevin Klair L. Cuenca — 4th Year BS Information Technology student, front-end designer, and full-stack developer. Portfolio of projects, skills, education, certifications, résumé, and contact information.';
    }
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
    applyAudit();
    observeProfileBuild();
    window.setTimeout(applyAudit, 120);
    window.setTimeout(applyAudit, 420);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();