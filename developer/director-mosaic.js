(() => {
  const ensureProfileStyles = () => {
    if (document.querySelector('link[data-profile-identity]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'profile-identity.css?v=20260901-2';
    link.dataset.profileIdentity = 'true';
    document.head.appendChild(link);
  };

  const ensureCapabilityStyles = () => {
    if (document.querySelector('link[data-capabilities-polish]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'capabilities-polish.css?v=20260901-2';
    link.dataset.capabilitiesPolish = 'true';
    document.head.appendChild(link);
  };

  const buildProfile = () => {
    const root = document.getElementById('profile');
    if (!root || root.dataset.identityReady === 'manifesto') return;

    root.dataset.identityReady = 'manifesto';
    root.innerHTML = `
      <header class="profile-map-head" data-reveal>
        <span>02 / PROFILE</span>
        <span>JAKE CUENCA / WORKING IDENTITY / 2026</span>
      </header>

      <div class="profile-map" id="profileMap" data-reveal>
        <svg class="profile-route-line" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
          <path d="M120 500 C190 330 280 210 470 190 C690 165 760 90 875 105 C930 120 945 235 890 300 C835 362 720 380 640 480 C555 586 370 590 225 525" />
          <path d="M120 500 C190 330 280 210 470 190 C690 165 760 90 875 105 C930 120 945 235 890 300 C835 362 720 380 640 480 C555 586 370 590 225 525" />
        </svg>

        <div class="profile-manifesto">
          <span class="profile-manifesto__eyebrow">FRONT-END DIRECTION / FULL-STACK FOUNDATION</span>
          <h2>I WANT<br>THE WEB<br>TO <em>FEEL</em><br><i>DESIGNED.</i></h2>
          <p class="profile-manifesto__note">I am most interested in the point where clarity, visual personality, and interaction meet. The interface should make sense first — then leave an impression.</p>
        </div>

        <button class="profile-node profile-node--01 is-active" type="button" data-profile-principle="read" data-label="01 / READ CLEARLY" data-copy="Hierarchy comes first. A user should know where to look, what matters, and what happens next without fighting the interface.">
          <span>01</span><strong>READ CLEARLY</strong>
        </button>
        <button class="profile-node profile-node--02" type="button" data-profile-principle="respond" data-label="02 / RESPOND NATURALLY" data-copy="Motion and feedback should explain state and intention — not exist just because animation is possible.">
          <span>02</span><strong>RESPOND NATURALLY</strong>
        </button>
        <button class="profile-node profile-node--03" type="button" data-profile-principle="distinct" data-label="03 / FEEL DISTINCT" data-copy="A useful product can still have a point of view. Typography, rhythm, and composition are part of how a digital product is remembered.">
          <span>03</span><strong>FEEL DISTINCT</strong>
        </button>
        <button class="profile-node profile-node--04" type="button" data-profile-principle="real" data-label="04 / WORK FOR REAL" data-copy="The design has to survive real content, real devices, real workflows, and real users. That is where full-stack experience becomes useful.">
          <span>04</span><strong>WORK FOR REAL</strong>
        </button>

        <div class="profile-readout" id="profileReadout" aria-live="polite">
          <span>01 / READ CLEARLY</span>
          <p>Hierarchy comes first. A user should know where to look, what matters, and what happens next without fighting the interface.</p>
        </div>

        <aside class="profile-foundation">
          <span>UNDER THE SURFACE</span>
          <strong>FULL-STACK WHEN THE PRODUCT NEEDS IT.</strong>
          <p>Backend experience helps me design around actual data, validation, workflows, permissions, and product constraints instead of treating UI as a detached layer.</p>
        </aside>
      </div>

      <div class="profile-identity-line" data-reveal>
        <span>PROGRAM</span><strong>BS INFORMATION TECHNOLOGY</strong><i></i>
        <span>STATUS</span><strong>4TH YEAR / 2023—PRESENT</strong><i></i>
        <span>BASED</span><strong>DUMAGUETE CITY</strong><i></i>
        <span>DIRECTION</span><strong>FRONT-END DESIGN</strong>
      </div>
    `;

    requestAnimationFrame(() => {
      root.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
    });

    const map = root.querySelector('#profileMap');
    const readout = root.querySelector('#profileReadout');
    const nodes = [...root.querySelectorAll('[data-profile-principle]')];

    const activate = (node) => {
      if (!node || !readout) return;
      nodes.forEach((item) => item.classList.toggle('is-active', item === node));
      readout.classList.add('is-changing');
      window.setTimeout(() => {
        const label = readout.querySelector('span');
        const copy = readout.querySelector('p');
        if (label) label.textContent = node.dataset.label || '';
        if (copy) copy.textContent = node.dataset.copy || '';
        readout.classList.remove('is-changing');
      }, 120);
    };

    nodes.forEach((node) => {
      node.addEventListener('mouseenter', () => activate(node));
      node.addEventListener('focus', () => activate(node));
      node.addEventListener('click', () => activate(node));
    });

    if (map && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let raf = 0;
      map.addEventListener('pointermove', (event) => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const rect = map.getBoundingClientRect();
          map.style.setProperty('--mx', `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
          map.style.setProperty('--my', `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
        });
      }, { passive: true });
      map.addEventListener('pointerleave', () => {
        map.style.setProperty('--mx', '50%');
        map.style.setProperty('--my', '50%');
      });
    }
  };

  const buildAffiliations = () => {
    const root = document.getElementById("affiliationConstellation");
    if (!root || root.dataset.positionReady === "true") return;

    const records = [
      {
        index: "01",
        org: "ACCLAIMED",
        category: "CAMPUS CREATIVE ORGANIZATION",
        institution: "Asian College of Science and Technology — Dumaguete City",
        period: "FOUNDING → 2026",
        primary: "FOUNDING MEMBER",
        primaryDate: "",
        secondary: ["PRESIDENT / 2024—2025", "PUBLIC INFORMATION OFFICER / 2025—2026"],
        craft: []
      },
      {
        index: "02",
        org: "CCSE",
        category: "COLLEGE LEADERSHIP",
        institution: "College of Computer Studies and Engineering / Asian College",
        period: "2024 → PRESENT",
        primary: "VICE PRESIDENT",
        primaryDate: "2024—PRESENT",
        secondary: ["IT TREASURER / 2024—2025"],
        craft: []
      },
      {
        index: "03",
        org: "ACER CHRONICLES",
        category: "PUBLICATION / VISUAL JOURNALISM",
        institution: "Asian College publication team",
        period: "2024 → PRESENT",
        primary: "PHOTOJOURNALIST",
        primaryDate: "2024—PRESENT",
        secondary: [],
        craft: ["CAMPUS EVENTS", "VISUAL STORYTELLING"]
      },
      {
        index: "04",
        org: "TWG / BCSTEC",
        category: "TECHNICAL WORKING GROUP",
        institution: "Bayawan City Science and Technology Education Center",
        period: "2021 → 2023",
        primary: "FOUNDING MEMBER",
        primaryDate: "",
        secondary: ["CREATIVE HEAD / 2021—2023"],
        craft: ["VIDEO", "PHOTOGRAPHY", "GRAPHICS"]
      },
      {
        index: "05",
        org: "AEMT",
        category: "AUGUSTINIAN EVENTS MANAGEMENT TEAM",
        institution: "Saint Augustine Academy of Bayawan, Inc.",
        period: "SECONDARY SCHOOL",
        primary: "PIONEER MEMBER",
        primaryDate: "",
        secondary: [],
        craft: ["VIDEO EDITOR", "PHOTOGRAPHER", "GRAPHICS DESIGNER"]
      }
    ];

    const intro = document.createElement("header");
    intro.className = "aff-position__intro";
    intro.innerHTML = `
      <div>
        <span>LEADERSHIP / MEDIA</span>
        <h3>ROLES<br><em>IN PRACTICE.</em></h3>
      </div>
      <p>Positions first. Organizations provide the context; the work and responsibility carry the visual weight.</p>
    `;

    const list = document.createElement("div");
    list.className = "aff-position__list";

    records.forEach((item) => {
      const row = document.createElement("article");
      row.className = "aff-position__row";
      row.tabIndex = 0;
      row.dataset.index = item.index;
      row.dataset.org = item.org;

      const rail = document.createElement("div");
      rail.className = "aff-position__rail";
      rail.innerHTML = `<span>${item.index}</span><span>${item.period}</span>`;

      const context = document.createElement("div");
      context.className = "aff-position__context";
      context.innerHTML = `<span>${item.category}</span><h4>${item.org}</h4><p>${item.institution}</p>`;

      const role = document.createElement("div");
      role.className = "aff-position__role";
      const roleMeta = item.primaryDate ? `<span>${item.primaryDate}</span>` : "";
      role.innerHTML = `<div class="aff-position__primary"><strong>${item.primary}</strong>${roleMeta}</div>`;

      if (item.secondary.length) {
        const secondary = document.createElement("div");
        secondary.className = "aff-position__secondary";
        item.secondary.forEach((text) => {
          const span = document.createElement("span");
          span.textContent = text;
          secondary.appendChild(span);
        });
        role.appendChild(secondary);
      }

      if (item.craft.length) {
        const craft = document.createElement("div");
        craft.className = "aff-position__craft";
        item.craft.forEach((text) => {
          const span = document.createElement("span");
          span.textContent = text;
          craft.appendChild(span);
        });
        role.appendChild(craft);
      }

      row.append(rail, context, role);
      list.appendChild(row);
    });

    root.dataset.positionReady = "true";
    root.className = "affiliation-constellation affiliation-positions";
    root.replaceChildren(intro, list);
  };

  const start = () => {
    ensureProfileStyles();
    ensureCapabilityStyles();
    buildProfile();
    buildAffiliations();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();