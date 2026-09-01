(() => {
  const ensureProfileStyles = () => {
    if (document.querySelector('link[data-profile-identity]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'profile-identity.css?v=20260901-1';
    link.dataset.profileIdentity = 'true';
    document.head.appendChild(link);
  };

  const buildProfile = () => {
    const root = document.getElementById('profile');
    if (!root || root.dataset.identityReady === 'true') return;

    root.dataset.identityReady = 'true';
    root.innerHTML = `
      <header class="profile-identity-head" data-reveal>
        <div>
          <span>02 / PROFILE</span>
          <h2 id="profileTitle">I DESIGN THE<br><em>FEEL.</em><br>I BUILD THE<br>LOGIC.</h2>
        </div>
        <p>Visual direction on the surface. Full-stack thinking underneath. I work across both so the interface and the system feel like one product.</p>
      </header>

      <div class="profile-axis" id="profileAxis" data-active="balanced" data-reveal>
        <article class="profile-axis__panel profile-axis__panel--surface" tabindex="0" data-profile-mode="surface">
          <div class="profile-axis__top">
            <span class="profile-axis__eyebrow">01 / FRONT-END DIRECTION</span>
            <small>SURFACE / EXPERIENCE</small>
          </div>

          <div>
            <div class="profile-axis__word">SURFACE</div>
            <p class="profile-axis__statement">I care about how an interface reads, responds, moves, and feels before a user ever thinks about the code underneath it.</p>
          </div>

          <div class="profile-axis__bottom">
            <div class="profile-axis__tags"><span>INTERACTION</span><span>TYPOGRAPHY</span><span>MOTION</span><span>RESPONSIVE UI</span></div>
            <span class="profile-axis__no">A / 01</span>
          </div>
        </article>

        <article class="profile-axis__panel profile-axis__panel--system" tabindex="0" data-profile-mode="system">
          <div class="profile-axis__top">
            <span class="profile-axis__eyebrow">02 / FULL-STACK CAPABILITY</span>
            <small>SYSTEM / PRODUCT</small>
          </div>

          <div>
            <div class="profile-axis__word">SYSTEM</div>
            <p class="profile-axis__statement">I also build the workflows, data structures, validation, APIs, and backend decisions that let the interface become an actual product.</p>
          </div>

          <div class="profile-axis__bottom">
            <div class="profile-axis__tags"><span>LARAVEL</span><span>PHP</span><span>POSTGRESQL</span><span>WORKFLOWS</span></div>
            <span class="profile-axis__no">B / 02</span>
          </div>
        </article>

        <div class="profile-axis__bridge" aria-hidden="true">↔</div>
      </div>

      <div class="profile-facts" data-reveal>
        <div class="profile-fact"><span>PROGRAM</span><strong>BS INFORMATION TECHNOLOGY</strong></div>
        <div class="profile-fact"><span>STATUS</span><strong>4TH YEAR / 2023—PRESENT</strong></div>
        <div class="profile-fact"><span>DIRECTION</span><strong>FRONT-END DESIGN</strong></div>
        <div class="profile-fact"><span>CAPABILITY</span><strong>FULL-STACK DEVELOPMENT</strong></div>
      </div>
    `;

    /* This profile is injected after the site's original reveal observer has
       already registered its targets. Make these new reveal nodes visible here
       so they cannot remain stuck in the hidden pre-reveal state. */
    requestAnimationFrame(() => {
      root.querySelectorAll('[data-reveal]').forEach((element) => {
        element.classList.add('is-visible');
      });
    });

    const axis = root.querySelector('#profileAxis');
    const panels = [...root.querySelectorAll('[data-profile-mode]')];
    const setMode = (mode) => { if (axis) axis.dataset.active = mode; };
    panels.forEach((panel) => {
      const mode = panel.dataset.profileMode;
      panel.addEventListener('mouseenter', () => setMode(mode));
      panel.addEventListener('focus', () => setMode(mode));
      panel.addEventListener('click', () => setMode(mode));
    });
    axis?.addEventListener('mouseleave', () => setMode('balanced'));
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
        primary: "PUBLIC INFORMATION OFFICER",
        primaryDate: "2025—2026",
        secondary: ["PRESIDENT / 2024—2025", "FOUNDING MEMBER"],
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
        primary: "CREATIVE HEAD",
        primaryDate: "2021—2023",
        secondary: ["FOUNDING MEMBER"],
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
    buildProfile();
    buildAffiliations();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();