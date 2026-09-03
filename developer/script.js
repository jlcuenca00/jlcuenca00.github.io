document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  initIntro();
  initReveal();
  initNavigation();
  initProgress();
  initCursor();
  initHeroReveal();
  initProjects();
  initPortraits();
  initCapabilities();
  initHistory();
  initCertificateTilt();
  initSignalCanvas();
  initWorldTransition();

  function initIntro() {
    const loader = document.getElementById("introLoader");
    if (!loader) return;
    if (reducedMotion) {
      loader.remove();
      return;
    }

    let seen = false;
    try { seen = sessionStorage.getItem("jc-dev-intro") === "1"; } catch (_) {}
    const delay = seen ? 80 : 760;
    window.setTimeout(() => {
      loader.classList.add("is-done");
      try { sessionStorage.setItem("jc-dev-intro", "1"); } catch (_) {}
      window.setTimeout(() => loader.remove(), 700);
    }, delay);
  }

  function initReveal() {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    if (!elements.length) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    elements.forEach((el) => observer.observe(el));
  }

  function initNavigation() {
    const nav = document.getElementById("siteNav");
    const toggle = document.getElementById("navToggle");
    const links = [...document.querySelectorAll(".nav-links a[href^='#']")];

    toggle?.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        nav?.classList.remove("is-open");
        toggle?.setAttribute("aria-expanded", "false");
      });
    });

    if (!("IntersectionObserver" in window)) return;
    const sectionMap = new Map(links.map((link) => [link.getAttribute("href")?.slice(1), link]));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.remove("is-active"));
      sectionMap.get(visible.target.id)?.classList.add("is-active");
    }, { threshold: [0.22, 0.4, 0.62], rootMargin: "-18% 0px -50% 0px" });
    document.querySelectorAll("main > section[id]").forEach((section) => observer.observe(section));
  }

  function initProgress() {
    const bar = document.getElementById("pageProgress");
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / max))})`;
      ticking = false;
    };
    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function initCursor() {
    if (!finePointer || reducedMotion) return;
    const cursor = document.getElementById("cursor");
    const label = document.getElementById("cursorLabel");
    if (!cursor || !label) return;

    document.body.classList.add("cursor-enabled");
    let tx = innerWidth / 2, ty = innerHeight / 2;
    let x = tx, y = ty;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.36;
      y += (ty - y) * 0.36;
      cursor.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    addEventListener("pointermove", (event) => {
      tx = event.clientX;
      ty = event.clientY;
      cursor.style.opacity = "1";
      const target = event.target.closest("[data-cursor],a,button");
      const text = target?.dataset.cursor || (target?.matches("a") ? "OPEN" : target?.matches("button") ? "SELECT" : "");
      cursor.classList.toggle("is-active", Boolean(text));
      cursor.classList.toggle("is-blue", Boolean(target?.closest("[data-world-link],.creator-link,.creator-contact")));
      label.textContent = text || "VIEW";
    }, { passive: true });

    addEventListener("pointerleave", () => { cursor.style.opacity = "0"; });
    addEventListener("beforeunload", () => cancelAnimationFrame(raf), { once: true });
  }

  function initHeroReveal() {
    const poster = document.getElementById("heroPoster");
    const cross = poster?.querySelector(".hero-cross");
    if (!poster || !finePointer || reducedMotion) return;

    const update = (event) => {
      const rect = poster.getBoundingClientRect();
      const px = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
      const py = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
      poster.style.setProperty("--rx", `${px}px`);
      poster.style.setProperty("--ry", `${py}px`);
      poster.style.setProperty("--rr", `${Math.min(220, Math.max(150, rect.width * 0.14))}px`);
      if (cross) {
        cross.style.left = `${px}px`;
        cross.style.top = `${py}px`;
      }
    };
    poster.addEventListener("pointermove", update, { passive: true });
    poster.addEventListener("pointerleave", () => poster.style.setProperty("--rr", "0px"));
  }

  function initProjects() {
    const showcase = document.getElementById("projectShowcase");
    const media = showcase?.querySelector(".project-media");
    const tabs = [...document.querySelectorAll(".project-index__item")];
    if (!showcase || !media || !tabs.length) return;

    const data = {
      dar: {
        no: "01", type: "GOVERNMENT WORKFLOW SYSTEM", name: "DAR-LTCMS",
        role: "LEAD / INTEGRATOR / FULL-STACK", stack: "LARAVEL 12 / PHP / POSTGRESQL / BLADE / JS", year: "2026",
        image: "assets/dar-ltcms.svg", alt: "DAR-LTCMS interface preview",
        description: "Land transfer clearance, parcel records, mapping, monitoring, reporting, and auditable workflow for DAR Negros Oriental.",
        href: "https://darltcms.me/"
      },
      fourfold: {
        no: "02", type: "PERSONALITY TEST EXPERIENCE", name: "FOURFOLD",
        role: "INDIVIDUAL / FRONT-END", stack: "FLASK / PYTHON / JAVASCRIPT / RESPONSIVE UI", year: "2026",
        image: "assets/fourfold.svg", alt: "Fourfold personality test interface preview",
        description: "A focused 15-question personality test with keyboard controls, refresh-safe progress, 16 original profiles, and percentage-based preference breakdowns.",
        href: "https://github.com/jlcuenca00/mbti-test"
      },
      todo: {
        no: "03", type: "MOBILE TASK INTERACTION", name: "FLUTTER TO-DO",
        role: "INDIVIDUAL / MOBILE APP", stack: "FLUTTER / DART / INTERACTION DESIGN", year: "2025",
        image: "assets/flutter-todo.svg", alt: "Flutter To-Do interface preview",
        description: "A focused task manager with add/manage flows, slide-to-delete interaction, and a clean interface built around everyday use.",
        href: "https://github.com/jlcuenca00/to_do_app"
      }
    };

    const els = {
      image: document.getElementById("projectImage"), no: document.getElementById("projectNo"), type: document.getElementById("projectType"),
      name: document.getElementById("projectName"), role: document.getElementById("projectRole"), stack: document.getElementById("projectStack"),
      year: document.getElementById("projectYear"), description: document.getElementById("projectDescription"), link: document.getElementById("projectLink")
    };

    let active = "dar";
    let timer = 0;
    let inView = false;
    let paused = false;

    const render = (key, force = false) => {
      if (!data[key] || (key === active && !force)) return;
      active = key;
      const item = data[key];
      showcase.classList.add("is-switching");
      tabs.forEach((tab) => {
        const selected = tab.dataset.project === key;
        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        const progress = tab.querySelector("i");
        if (progress) {
          progress.style.transition = "none";
          progress.style.width = "0";
          requestAnimationFrame(() => {
            progress.style.transition = selected && !reducedMotion ? "width 5.8s linear" : "none";
            progress.style.width = selected ? "100%" : "0";
          });
        }
      });

      window.setTimeout(() => {
        showcase.dataset.project = key;
        els.image.src = item.image; els.image.alt = item.alt;
        els.no.textContent = item.no; els.type.textContent = item.type; els.name.textContent = item.name;
        els.role.textContent = item.role; els.stack.textContent = item.stack; els.year.textContent = item.year;
        els.description.textContent = item.description; els.link.href = item.href;
        window.setTimeout(() => showcase.classList.remove("is-switching"), 80);
      }, reducedMotion ? 0 : 170);
    };

    const next = () => {
      const keys = Object.keys(data);
      render(keys[(keys.indexOf(active) + 1) % keys.length]);
    };

    tabs.forEach((tab) => {
      const activate = () => { paused = true; render(tab.dataset.project); };
      tab.addEventListener("mouseenter", activate);
      tab.addEventListener("focus", activate);
      tab.addEventListener("click", activate);
    });
    showcase.addEventListener("mouseleave", () => { paused = false; });
    showcase.addEventListener("mouseenter", () => { paused = true; });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { threshold: 0.35 }).observe(showcase);
    } else inView = true;

    if (!reducedMotion) timer = window.setInterval(() => { if (inView && !paused) next(); }, 5900);
    render("dar", true);

    if (finePointer && !reducedMotion) {
      media.addEventListener("pointermove", (event) => {
        const rect = media.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - .5;
        const ny = (event.clientY - rect.top) / rect.height - .5;
        media.style.setProperty("--tilt-y", `${nx * 2.1}deg`);
        media.style.setProperty("--tilt-x", `${ny * -1.6}deg`);
      }, { passive: true });
      media.addEventListener("pointerleave", () => {
        media.style.setProperty("--tilt-y", "0deg");
        media.style.setProperty("--tilt-x", "0deg");
      });
    }

    addEventListener("beforeunload", () => clearInterval(timer), { once: true });
  }

  function initPortraits() {
    const stack = document.getElementById("portraitStack");
    const images = [...stack?.querySelectorAll("img") || []];
    const counter = document.getElementById("portraitCounter");
    if (!stack || !images.length) return;
    let index = 0;
    let timer = 0;
    let visible = true;

    const show = (next) => {
      index = (next + images.length) % images.length;
      images.forEach((img, i) => img.classList.toggle("is-active", i === index));
      if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
    };
    stack.addEventListener("click", () => show(index + 1));
    if ("IntersectionObserver" in window) new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .25 }).observe(stack);
    if (!reducedMotion) timer = window.setInterval(() => { if (visible) show(index + 1); }, 3300);
    addEventListener("beforeunload", () => clearInterval(timer), { once: true });
  }

  function initCapabilities() {
    const cards = [...document.querySelectorAll(".cap-card")];
    if (!cards.length) return;
    const activate = (card) => cards.forEach((item) => item.classList.toggle("is-active", item === card));
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => activate(card));
      card.addEventListener("focus", () => activate(card));
      card.addEventListener("click", () => activate(card));
    });
  }

  function initHistory() {
    const stage = document.getElementById("historyStage");
    const viewButtons = [...document.querySelectorAll("[data-history-view]")];
    const panels = [...document.querySelectorAll("[data-history-panel]")];
    if (!stage) return;

    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const view = button.dataset.historyView;
        stage.dataset.view = view;
        viewButtons.forEach((item) => item.classList.toggle("is-active", item === button));
        panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.historyPanel === view));
      });
    });

    const education = {
      primary: { period: "2011 — 2017", level: "PRIMARY EDUCATION", school: "SANTA CATALINA CENTRAL ELEMENTARY SCHOOL", location: "SANTA CATALINA", note: "Primary education.", award: "GRADUATED WITH HIGH HONORS" },
      high: { period: "2017 — 2021", level: "SECONDARY / HIGH SCHOOL", school: "SAINT AUGUSTINE ACADEMY OF BAYAWAN, INC.", location: "BAYAWAN CITY", note: "Pioneer member of AEMT — video editing, photography, and graphics design.", award: "GRADUATED WITH HONORS" },
      senior: { period: "2021 — 2023", level: "SENIOR HIGH / GRADE 11–12", school: "BAYAWAN CITY SCIENCE AND TECHNOLOGY EDUCATION CENTER", location: "BAYAWAN CITY", note: "Founding member of TWG; Creative Head from 2021–2023.", award: "GRADUATED WITH HIGH HONORS" },
      college: { period: "2023 — PRESENT", level: "TERTIARY / 4TH YEAR", school: "ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY", location: "DUMAGUETE CITY", note: "Bachelor of Science in Information Technology.", award: "CURRENT" }
    };
    const eduButtons = [...document.querySelectorAll("[data-edu]")];
    const eduDetail = document.querySelector(".edu-detail");
    const eduEls = { period: document.getElementById("eduPeriod"), level: document.getElementById("eduLevel"), school: document.getElementById("eduSchool"), location: document.getElementById("eduLocation"), note: document.getElementById("eduNote"), award: document.getElementById("eduAward") };
    eduButtons.forEach((button) => button.addEventListener("click", () => {
      const item = education[button.dataset.edu]; if (!item) return;
      eduButtons.forEach((b) => b.classList.toggle("is-active", b === button));
      Object.keys(eduEls).forEach((key) => { if (eduEls[key]) eduEls[key].textContent = item[key]; });
      if (!reducedMotion) eduDetail?.animate([{ opacity:.25, transform:"translateY(10px)" }, { opacity:1, transform:"translateY(0)" }], { duration:360, easing:"cubic-bezier(.16,1,.3,1)" });
    }));

    const affiliations = {
      acclaimed: { category:"CAMPUS CREATIVE ORGANIZATION", period:"FOUNDING → 2026", title:"ACCLAIMED", institution:"ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY — DUMAGUETE CITY", roles:[["2025–2026","PUBLIC INFORMATION OFFICER"],["2024–2025","PRESIDENT"],["FOUNDING","FOUNDING MEMBER"]] },
      ccse: { category:"COLLEGE LEADERSHIP", period:"2024 → PRESENT", title:"CCSE", institution:"COLLEGE OF COMPUTER STUDIES AND ENGINEERING / ASIAN COLLEGE", roles:[["2024–PRESENT","VICE PRESIDENT"],["2024–2025","IT TREASURER"]] },
      acer: { category:"SCHOOL PAPER / VISUAL JOURNALISM", period:"2024 → PRESENT", title:"ACER CHRONICLES", institution:"ASIAN COLLEGE SCHOOL PAPER TEAM", roles:[["2024–PRESENT","PHOTOJOURNALIST"]] },
      twg: { category:"SECONDARY CREATIVE TEAM", period:"2021 → 2023", title:"TWG / BCSTEC", institution:"BAYAWAN CITY SCIENCE AND TECHNOLOGY EDUCATION CENTER", roles:[["2021–2023","CREATIVE HEAD"],["FOUNDING","FOUNDING MEMBER"],["CREATIVE ROLE","VIDEO / PHOTO / GRAPHICS"]] },
      aemt: { category:"EVENT / CREATIVE TEAM", period:"SECONDARY SCHOOL", title:"AEMT", institution:"SAINT AUGUSTINE ACADEMY OF BAYAWAN, INC.", roles:[["PIONEER","PIONEER MEMBER"],["CREATIVE ROLE","VIDEO / PHOTO / GRAPHICS"]] }
    };
    const affButtons = [...document.querySelectorAll("[data-aff]")];
    const affCard = document.querySelector(".aff-card");
    const affEls = { category:document.getElementById("affCategory"), period:document.getElementById("affPeriod"), title:document.getElementById("affTitle"), institution:document.getElementById("affInstitution"), roles:document.getElementById("affRoles") };
    affButtons.forEach((button) => {
      const activate = () => {
        const item = affiliations[button.dataset.aff]; if (!item) return;
        affButtons.forEach((b) => b.classList.toggle("is-active", b === button));
        affEls.category.textContent = item.category; affEls.period.textContent = item.period; affEls.title.textContent = item.title; affEls.institution.textContent = item.institution;
        affEls.roles.innerHTML = item.roles.map(([date, role]) => `<div><span>${date}</span><strong>${role}</strong></div>`).join("");
        if (!reducedMotion) affCard?.animate([{ opacity:.3, transform:"translateX(10px)" }, { opacity:1, transform:"translateX(0)" }], { duration:320, easing:"cubic-bezier(.16,1,.3,1)" });
      };
      button.addEventListener("mouseenter", activate);
      button.addEventListener("focus", activate);
      button.addEventListener("click", activate);
    });
  }

  function initCertificateTilt() {
    if (!finePointer || reducedMotion) return;
    document.querySelectorAll(".certificate-paper").forEach((paper) => {
      paper.addEventListener("pointermove", (event) => {
        const rect = paper.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - .5;
        const ny = (event.clientY - rect.top) / rect.height - .5;
        paper.style.setProperty("--cy", `${nx * 1.7}deg`);
        paper.style.setProperty("--cx", `${ny * -1.25}deg`);
      }, { passive:true });
      paper.addEventListener("pointerleave", () => {
        paper.style.setProperty("--cy", "0deg"); paper.style.setProperty("--cx", "0deg");
      });
    });
  }

  function initSignalCanvas() {
    const canvas = document.getElementById("signalCanvas");
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d", { alpha:true });
    if (!ctx) return;

    const dpr = Math.min(devicePixelRatio || 1, 1.25);
    let width = 0, height = 0, mode = "hero", running = true;
    const pointer = { x: innerWidth * .5, y: innerHeight * .5, active:false };
    const points = Array.from({ length: 24 }, (_, i) => ({
      x: Math.random(), y: Math.random(), vx:(Math.random()-.5)*.00004, vy:(Math.random()-.5)*.00004, seed:i
    }));

    const resize = () => {
      width = innerWidth; height = innerHeight;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    resize(); addEventListener("resize", resize, { passive:true });
    addEventListener("pointermove", (event) => { pointer.x = event.clientX; pointer.y = event.clientY; pointer.active = true; }, { passive:true });
    addEventListener("pointerleave", () => { pointer.active = false; });
    document.addEventListener("visibilitychange", () => { running = !document.hidden; });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        const entry = entries.filter((e) => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
        if (entry) mode = entry.target.dataset.signal || "hero";
      }, { threshold:[.2,.45,.7], rootMargin:"-20% 0px -45% 0px" }).observe(document.querySelector(".hero"));
      const obs = new IntersectionObserver((entries) => {
        const entry = entries.filter((e) => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
        if (entry) mode = entry.target.dataset.signal || mode;
      }, { threshold:[.2,.45,.7], rootMargin:"-20% 0px -45% 0px" });
      document.querySelectorAll(".scene[data-signal]").forEach((section) => obs.observe(section));
    }

    let last = 0;
    const draw = (time) => {
      requestAnimationFrame(draw);
      if (!running || time - last < 34) return;
      last = time;
      ctx.clearRect(0,0,width,height);
      const quiet = mode === "quiet";
      const lineAlpha = quiet ? .035 : mode === "network" ? .12 : .07;
      const maxDistance = mode === "network" ? 190 : mode === "grid" ? 145 : 165;

      points.forEach((p) => {
        p.x += p.vx * (mode === "contact" ? 1.5 : 1);
        p.y += p.vy;
        if (p.x < -.04) p.x = 1.04; if (p.x > 1.04) p.x = -.04;
        if (p.y < -.04) p.y = 1.04; if (p.y > 1.04) p.y = -.04;
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const a = points[i], ax = a.x * width, ay = a.y * height;
        ctx.fillStyle = quiet ? "rgba(255,45,45,.12)" : "rgba(255,45,45,.28)";
        ctx.fillRect(ax, ay, 1.4, 1.4);
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j], bx = b.x * width, by = b.y * height;
          const dx = ax - bx, dy = ay - by, dist = Math.hypot(dx,dy);
          if (dist > maxDistance) continue;
          ctx.strokeStyle = `rgba(255,45,45,${lineAlpha * (1 - dist/maxDistance)})`;
          ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
        }
      }

      if (pointer.active && !quiet) {
        const r = mode === "dual" ? 58 : 42;
        ctx.strokeStyle = "rgba(255,45,45,.18)";
        ctx.beginPath(); ctx.arc(pointer.x,pointer.y,r,0,Math.PI*2); ctx.stroke();
        ctx.fillStyle = "rgba(255,45,45,.45)";
        ctx.fillRect(pointer.x-1,pointer.y-1,2,2);
      }
    };
    requestAnimationFrame(draw);
  }

  function initWorldTransition() {
    const overlay = document.getElementById("worldTransition");
    if (!overlay) return;
    document.querySelectorAll("[data-world-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reducedMotion) return;
        event.preventDefault();
        const href = link.href;
        const x = event.clientX || innerWidth * .5;
        const y = event.clientY || innerHeight * .5;
        overlay.style.left = `${x}px`; overlay.style.top = `${y}px`;
        overlay.classList.add("is-active");
        window.setTimeout(() => { location.href = href; }, 610);
      });
    });
  }
});
