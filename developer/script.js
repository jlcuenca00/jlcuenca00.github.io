document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js-ready");

  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  initScrollProgress();
  initReveal();
  initSignalCanvas(reducedMotion);
  initHero(reducedMotion);
  initProjects(reducedMotion);
  initDuality(reducedMotion);
  initCapabilities();
  initTimeline();
  initAffiliations();
  initCursor(reducedMotion);
  initWorldTransition(reducedMotion);
});

function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  const update = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = `${Math.min(100, Math.max(0, (window.scrollY / max) * 100))}%`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}

function initReveal() {
  const targets = [
    ...document.querySelectorAll(".scene-head, .work-shell, .duality, .capability-modes, .capability-field, .timeline, .affiliations, .credential-card, .contact__poster, .contact__links"),
  ];
  if (!("IntersectionObserver" in window)) return;
  targets.forEach((el) => el.classList.add("reveal-on-scroll"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
  targets.forEach((el) => observer.observe(el));
}

function initSignalCanvas(reducedMotion) {
  const canvas = document.getElementById("signalCanvas");
  if (!canvas || reducedMotion) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  const modes = {
    type: { density: 0.72, rings: 1, pulse: 0.55 },
    network: { density: 1, rings: 2, pulse: 0.95 },
    dual: { density: 0.78, rings: 2, pulse: 0.68 },
    nodes: { density: 1.08, rings: 3, pulse: 0.72 },
    timeline: { density: 0.64, rings: 1, pulse: 0.48 },
    quiet: { density: 0.35, rings: 0, pulse: 0.2 },
    signal: { density: 0.82, rings: 4, pulse: 1 },
  };
  let mode = "type";
  let width = 0;
  let height = 0;
  let dpr = 1;
  let last = 0;
  let frameId = 0;
  let visible = !document.hidden;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, width < 800 ? 1.15 : 1.4);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  window.addEventListener("pointermove", (event) => {
    pointer.tx = event.clientX / Math.max(1, width);
    pointer.ty = event.clientY / Math.max(1, height);
  }, { passive: true });

  const scenes = [...document.querySelectorAll(".scene[data-signal]")];
  if ("IntersectionObserver" in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const candidate = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (candidate?.target?.dataset.signal) mode = candidate.target.dataset.signal;
    }, { threshold: [0.18, 0.35, 0.55] });
    scenes.forEach((scene) => sceneObserver.observe(scene));
  }

  document.addEventListener("visibilitychange", () => {
    visible = !document.hidden;
    if (visible && !frameId) frameId = requestAnimationFrame(draw);
  });

  function draw(time) {
    frameId = 0;
    if (!visible) return;
    if (time - last < 22) {
      frameId = requestAnimationFrame(draw);
      return;
    }
    last = time;
    pointer.x += (pointer.tx - pointer.x) * 0.055;
    pointer.y += (pointer.ty - pointer.y) * 0.055;

    ctx.clearRect(0, 0, width, height);
    const state = modes[mode] || modes.type;
    const px = pointer.x * width;
    const py = pointer.y * height;
    const spacing = Math.max(54, 84 / state.density);
    const drift = Math.sin(time * 0.00035) * 9;

    ctx.lineWidth = 1;
    for (let x = ((-drift % spacing) + spacing) % spacing; x < width; x += spacing) {
      const distance = Math.abs(x - px);
      const alpha = 0.018 + Math.max(0, 1 - distance / 520) * 0.026 * state.density;
      ctx.strokeStyle = `rgba(255,41,41,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = ((drift % spacing) + spacing) % spacing; y < height; y += spacing) {
      const distance = Math.abs(y - py);
      const alpha = 0.014 + Math.max(0, 1 - distance / 420) * 0.022 * state.density;
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const nodeCount = Math.round(7 + state.density * 7);
    for (let i = 0; i < nodeCount; i++) {
      const seed = i * 91.73;
      const nx = ((Math.sin(seed * 1.31 + time * 0.00008) + 1) * 0.5) * width;
      const ny = ((Math.cos(seed * 1.77 - time * 0.00006) + 1) * 0.5) * height;
      const dx = px - nx;
      const dy = py - ny;
      const dist = Math.hypot(dx, dy);
      const near = Math.max(0, 1 - dist / 440);
      const r = 1.1 + near * 1.6;
      ctx.fillStyle = `rgba(255,41,41,${0.11 + near * 0.28})`;
      ctx.fillRect(nx - r / 2, ny - r / 2, r, r);
      if (near > 0.17) {
        ctx.strokeStyle = `rgba(255,41,41,${near * 0.08})`;
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    }

    for (let i = 0; i < state.rings; i++) {
      const radius = 70 + i * 58 + Math.sin(time * 0.0012 + i) * 7;
      ctx.strokeStyle = `rgba(255,41,41,${0.035 + state.pulse * 0.018})`;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    const scanY = ((time * 0.028) % (height + 180)) - 90;
    ctx.strokeStyle = `rgba(255,41,41,${0.018 + state.pulse * 0.018})`;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(width, scanY);
    ctx.stroke();

    frameId = requestAnimationFrame(draw);
  }
  frameId = requestAnimationFrame(draw);
}

function initHero(reducedMotion) {
  const hero = document.querySelector(".hero");
  const lines = [...document.querySelectorAll(".kinetic-line")];
  const rotator = document.getElementById("heroRotator");
  if (!hero || !lines.length) return;

  const words = ["INTERACTION", "MOTION", "SYSTEMS", "TYPOGRAPHY", "INTERFACES"];
  let wordIndex = 0;
  let wordTimer = null;

  if (rotator && !reducedMotion) {
    wordTimer = window.setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotator.animate(
        [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-10px)" }],
        { duration: 170, fill: "forwards", easing: "ease" }
      ).finished.then(() => {
        rotator.textContent = words[wordIndex];
        rotator.animate(
          [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 260, fill: "forwards", easing: "cubic-bezier(.16,1,.3,1)" }
        );
      });
    }, 2300);
  }

  if (!reducedMotion && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      lines.forEach((line, index) => {
        const direction = index === 0 ? 1 : -1;
        line.style.transform = `translate3d(${nx * 14 * direction}px, ${ny * 8}px, 0) skewX(${nx * 1.4 * direction}deg)`;
      });
    }, { passive: true });
    hero.addEventListener("pointerleave", () => {
      lines.forEach((line) => { line.style.transform = "translate3d(0,0,0) skewX(0deg)"; });
    });
  }

  window.addEventListener("pagehide", () => { if (wordTimer) clearInterval(wordTimer); }, { once: true });
}

function initProjects(reducedMotion) {
  const shell = document.getElementById("workShell");
  if (!shell) return;
  const tabs = [...shell.querySelectorAll(".work-tab")];
  const image = document.getElementById("workImage");
  const number = document.getElementById("workNumber");
  const type = document.getElementById("workType");
  const year = document.getElementById("workYear");
  const role = document.getElementById("workRole");
  const name = document.getElementById("workName");
  const description = document.getElementById("workDescription");
  const stack = document.getElementById("workStack");
  const link = document.getElementById("workLink");
  const progress = document.getElementById("workProgress");

  const projects = {
    dar: {
      number: "01", type: "GOVERNMENT WORKFLOW SYSTEM", year: "2026", role: "LEAD / INTEGRATOR / FULL-STACK",
      name: "DAR-LTCMS", image: "assets/dar-ltcms.svg", alt: "Stylized interface preview of DAR-LTCMS",
      description: "Land Transfer Clearance & Monitoring System for DAR Negros Oriental — administrative processing, records, mapping, monitoring, reporting, and auditable clearance workflows.",
      stack: "LARAVEL 12 / PHP / POSTGRESQL / BLADE / JAVASCRIPT", href: "https://darltcms.me/"
    },
    periphora: {
      number: "02", type: "MOBILE E-COMMERCE INTERFACE", year: "2025", role: "INDIVIDUAL / FRONT-END / FLUTTER",
      name: "PERIPHORA", image: "assets/periphora.svg", alt: "Stylized mobile interface preview of Periphora",
      description: "A dark-theme e-commerce mobile experience for tech peripherals with reusable widgets, animated browsing, cart and checkout flows, and interaction-focused UI.",
      stack: "FLUTTER / DART / REUSABLE WIDGETS / MOBILE UI", href: "https://github.com/jlcuenca00/periphora"
    },
    todo: {
      number: "03", type: "MOBILE TASK INTERACTION", year: "2025", role: "INDIVIDUAL / MOBILE APP",
      name: "FLUTTER TO-DO", image: "assets/flutter-todo.svg", alt: "Stylized interface preview of Flutter To-Do",
      description: "A compact task-management app built around clear add/manage flows, slide-to-delete interaction, and a visual system based on Asian College branding.",
      stack: "FLUTTER / DART / MOBILE INTERACTION", href: "https://github.com/jlcuenca00/to_do_app"
    }
  };

  let active = "dar";
  let interacted = false;
  let switchTimer = null;
  let autoTimer = null;
  let progressFrame = 0;
  let progressStart = performance.now();
  const duration = 4300;

  const render = (id, user = false) => {
    if (!projects[id] || (id === active && user)) return;
    if (user) interacted = true;
    active = id;
    const item = projects[id];
    shell.dataset.active = id;
    shell.classList.add("is-switching");
    tabs.forEach((tab) => {
      const on = tab.dataset.project === id;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });
    clearTimeout(switchTimer);
    switchTimer = window.setTimeout(() => {
      image.src = item.image;
      image.alt = item.alt;
      number.textContent = item.number;
      type.textContent = item.type;
      year.textContent = item.year;
      role.textContent = item.role;
      name.textContent = item.name;
      description.textContent = item.description;
      stack.textContent = item.stack;
      link.href = item.href;
      shell.classList.remove("is-switching");
    }, reducedMotion ? 0 : 150);
    progressStart = performance.now();
  };

  tabs.forEach((tab) => {
    const choose = () => render(tab.dataset.project, true);
    tab.addEventListener("mouseenter", choose);
    tab.addEventListener("focus", choose);
    tab.addEventListener("click", choose);
  });

  const cycle = () => {
    if (interacted || document.hidden) return;
    const ids = Object.keys(projects);
    render(ids[(ids.indexOf(active) + 1) % ids.length]);
  };

  if (!reducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target !== shell) return;
        if (entry.isIntersecting) {
          if (!autoTimer) autoTimer = setInterval(cycle, duration);
        } else {
          clearInterval(autoTimer); autoTimer = null;
        }
      });
    }, { threshold: 0.3 });
    observer.observe(shell);
  }

  function animateProgress(now) {
    if (progress) {
      const value = interacted ? 100 : Math.min(100, ((now - progressStart) / duration) * 100);
      progress.style.width = `${value}%`;
    }
    progressFrame = requestAnimationFrame(animateProgress);
  }
  if (!reducedMotion) progressFrame = requestAnimationFrame(animateProgress);
  else if (progress) progress.style.width = "100%";

  window.addEventListener("pagehide", () => {
    clearInterval(autoTimer);
    cancelAnimationFrame(progressFrame);
  }, { once: true });
}

function initDuality(reducedMotion) {
  const root = document.getElementById("duality");
  if (!root) return;
  const design = root.querySelector(".duality__panel--design");
  const systems = root.querySelector(".duality__panel--systems");
  const images = [...root.querySelectorAll(".duality__portrait img")];
  const caption = root.querySelector(".duality__portrait figcaption strong");
  let portraitIndex = 0;
  let portraitTimer = null;

  const setPortrait = (index) => {
    portraitIndex = (index + images.length) % images.length;
    images.forEach((img, i) => img.classList.toggle("is-active", i === portraitIndex));
    if (caption) caption.textContent = `${String(portraitIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
  };
  if (images.length > 1 && !reducedMotion) portraitTimer = setInterval(() => setPortrait(portraitIndex + 1), 4200);
  root.querySelector(".duality__portrait")?.addEventListener("click", () => setPortrait(portraitIndex + 1));

  if (!reducedMotion && window.matchMedia("(pointer:fine)").matches) {
    root.addEventListener("pointermove", (event) => {
      const rect = root.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      root.style.setProperty("--balance", `${ratio * 100}%`);
      root.style.setProperty("--balance-num", (ratio * 100).toFixed(1));
      if (design && systems) {
        design.style.opacity = `${0.58 + (1 - ratio) * 0.42}`;
        systems.style.opacity = `${0.58 + ratio * 0.42}`;
        design.style.transform = `translateX(${ratio * -7}px)`;
        systems.style.transform = `translateX(${(1 - ratio) * 7}px)`;
      }
    }, { passive: true });
    root.addEventListener("pointerleave", () => {
      root.style.setProperty("--balance", "50%");
      root.style.setProperty("--balance-num", "50");
      if (design && systems) {
        design.style.opacity = ""; systems.style.opacity = "";
        design.style.transform = ""; systems.style.transform = "";
      }
    });
  }
  window.addEventListener("pagehide", () => clearInterval(portraitTimer), { once: true });
}

function initCapabilities() {
  const field = document.getElementById("capabilityField");
  if (!field) return;
  const modes = [...document.querySelectorAll(".capability-mode")];
  const tokens = [...field.querySelectorAll("span[data-groups]")];

  const activate = (mode) => {
    field.dataset.mode = mode;
    modes.forEach((button) => button.classList.toggle("is-active", button.dataset.mode === mode));
    let accentUsed = false;
    tokens.forEach((token, index) => {
      const match = token.dataset.groups.split(/\s+/).includes(mode);
      token.classList.toggle("is-match", match);
      const accent = match && !accentUsed && (index % 3 === 0 || index === 0);
      token.classList.toggle("is-accent", accent);
      if (accent) accentUsed = true;
      token.style.transform = match ? `translateY(${(index % 3 - 1) * 3}px)` : "";
    });
  };
  modes.forEach((button) => button.addEventListener("click", () => activate(button.dataset.mode)));
  activate("frontend");
}

function initTimeline() {
  const root = document.getElementById("timeline");
  if (!root) return;
  const points = [...root.querySelectorAll(".timeline-point")];
  const period = document.getElementById("historyPeriod");
  const level = document.getElementById("historyLevel");
  const school = document.getElementById("historySchool");
  const copy = document.getElementById("historyCopy");

  const history = {
    primary: {
      period: "2011 — 2017", level: "PRIMARY EDUCATION", school: "SANTA CATALINA CENTRAL ELEMENTARY SCHOOL",
      copy: "Completed primary education and graduated with High Honors."
    },
    high: {
      period: "2017 — 2021", level: "SECONDARY / FIRST YEAR — FOURTH YEAR", school: "SAINT AUGUSTINE ACADEMY OF BAYAWAN, INC.",
      copy: "Graduated with Honors. Pioneer member of the Augustinian Events Management Team (AEMT), contributing as Video Editor, Photographer, and Graphics Designer."
    },
    senior: {
      period: "2021 — 2023", level: "SENIOR HIGH SCHOOL / GRADE 11 — 12", school: "BAYAWAN CITY SCIENCE AND TECHNOLOGY EDUCATION CENTER",
      copy: "Graduated with High Honors. Founding member of the Technical Working Group (TWG) as Video Editor, Photographer, and Graphics Designer; Creative Head from 2021–2023."
    },
    college: {
      period: "2023 — PRESENT", level: "TERTIARY / BSIT / 4TH YEAR", school: "ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY — DUMAGUETE CITY",
      copy: "Bachelor of Science in Information Technology student. Current academic chapter focused on systems development, interaction design, and integrating practical software for real workflows."
    }
  };

  const render = (id) => {
    const item = history[id];
    if (!item) return;
    points.forEach((point) => point.classList.toggle("is-active", point.dataset.history === id));
    const detail = root.querySelector(".timeline-detail");
    detail?.animate([{ opacity: .2, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 320, easing: "cubic-bezier(.16,1,.3,1)" });
    period.textContent = item.period;
    level.textContent = item.level;
    school.textContent = item.school;
    copy.textContent = item.copy;
  };
  points.forEach((point) => {
    point.addEventListener("mouseenter", () => render(point.dataset.history));
    point.addEventListener("focus", () => render(point.dataset.history));
    point.addEventListener("click", () => render(point.dataset.history));
  });
}

function initAffiliations() {
  const root = document.getElementById("affiliations");
  if (!root) return;
  const tabs = [...root.querySelectorAll(".aff-tab")];
  const detail = root.querySelector(".aff-detail");
  const number = document.getElementById("affNumber");
  const title = document.getElementById("affTitle");
  const category = document.getElementById("affCategory");
  const period = document.getElementById("affPeriod");
  const institution = document.getElementById("affInstitution");
  const description = document.getElementById("affDescription");
  const roles = document.getElementById("affRoles");
  let active = "acclaimed";
  let timer = null;

  const data = {
    acclaimed: { number:"01", title:"ACCLAIMED", category:"CAMPUS CREATIVE ORGANIZATION", period:"FOUNDING → 2026", institution:"ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY — DUMAGUETE CITY", description:"Campus creative organization for photography, video, design, event coverage, and visual communication.", roles:[["2025–2026","PUBLIC INFORMATION OFFICER"],["2024–2025","PRESIDENT"],["FOUNDING","FOUNDING MEMBER"]] },
    ccse: { number:"02", title:"COLLEGE OF COMPUTER STUDIES & ENGINEERING", category:"COLLEGE LEADERSHIP", period:"2024 → PRESENT", institution:"ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY — DUMAGUETE CITY", description:"Student leadership work within the College of Computer Studies and Engineering.", roles:[["2024–PRESENT","VICE PRESIDENT"],["2024–2025","IT TREASURER"]] },
    acer: { number:"03", title:"ACER CHRONICLES", category:"SCHOOL PAPER / VISUAL JOURNALISM", period:"2024 → PRESENT", institution:"ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY — DUMAGUETE CITY", description:"School publication work focused on visual documentation and photojournalism.", roles:[["2024–PRESENT","PHOTOJOURNALIST"]] },
    twg: { number:"04", title:"TECHNICAL WORKING GROUP", category:"SECONDARY SCHOOL CREATIVE TEAM", period:"2021 → 2023", institution:"BAYAWAN CITY SCIENCE AND TECHNOLOGY EDUCATION CENTER", description:"Creative production team for school events and media, covering video, photography, and graphics.", roles:[["2021–2023","CREATIVE HEAD"],["FOUNDING","FOUNDING MEMBER"],["CREATIVE ROLE","VIDEO / PHOTO / GRAPHICS"]] },
    aemt: { number:"05", title:"AUGUSTINIAN EVENTS MANAGEMENT TEAM", category:"SECONDARY SCHOOL EVENT / CREATIVE TEAM", period:"SECONDARY SCHOOL", institution:"SAINT AUGUSTINE ACADEMY OF BAYAWAN, INC.", description:"Pioneer event-production work spanning video editing, photography, and graphics design.", roles:[["PIONEER","PIONEER MEMBER"],["CREATIVE ROLE","VIDEO / PHOTO / GRAPHICS"]] }
  };

  const render = (id) => {
    if (!data[id] || id === active) return;
    active = id;
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.aff === id));
    detail.classList.add("is-switching");
    clearTimeout(timer);
    timer = setTimeout(() => {
      const item = data[id];
      number.textContent = item.number;
      title.textContent = item.title;
      category.textContent = item.category;
      period.textContent = item.period;
      institution.textContent = item.institution;
      description.textContent = item.description;
      roles.innerHTML = item.roles.map(([date, role]) => `<div><span>${date}</span><strong>${role}</strong></div>`).join("");
      detail.classList.remove("is-switching");
    }, 130);
  };
  tabs.forEach((tab) => {
    tab.addEventListener("mouseenter", () => render(tab.dataset.aff));
    tab.addEventListener("focus", () => render(tab.dataset.aff));
    tab.addEventListener("click", () => render(tab.dataset.aff));
  });
}

function initCursor(reducedMotion) {
  const cursor = document.getElementById("devCursor");
  const label = document.getElementById("cursorLabel");
  if (!cursor || reducedMotion || !window.matchMedia("(pointer:fine)").matches) return;
  document.body.classList.add("cursor-enabled");
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;
  let raf = 0;

  const loop = () => {
    raf = 0;
    x += (tx - x) * 0.42;
    y += (ty - y) * 0.42;
    cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
    if (Math.abs(tx - x) > .1 || Math.abs(ty - y) > .1) raf = requestAnimationFrame(loop);
  };
  window.addEventListener("pointermove", (event) => {
    tx = event.clientX; ty = event.clientY;
    cursor.style.opacity = "1";
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => { cursor.style.opacity = "0"; });
  document.addEventListener("pointerover", (event) => {
    const target = event.target.closest("[data-cursor], a, button");
    const text = target?.dataset.cursor || (target?.matches("a") ? "OPEN" : target?.matches("button") ? "SELECT" : "");
    label.textContent = text;
    cursor.classList.toggle("has-label", Boolean(text));
  });
  document.addEventListener("pointerout", (event) => {
    if (!event.relatedTarget?.closest?.("[data-cursor], a, button")) cursor.classList.remove("has-label");
  });
}

function initWorldTransition(reducedMotion) {
  const overlay = document.getElementById("worldTransition");
  if (!overlay) return;
  document.querySelectorAll("a.world-switch[data-world='creator']").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (reducedMotion || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const href = link.href;
      const x = event.clientX || window.innerWidth / 2;
      const y = event.clientY || window.innerHeight / 2;
      overlay.style.transform = `translate3d(${x}px,${y}px,0) scale(0)`;
      overlay.classList.remove("is-active");
      void overlay.offsetWidth;
      overlay.classList.add("is-active");
      setTimeout(() => { window.location.href = href; }, 510);
    });
  });
}
