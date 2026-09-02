document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  loadPolish();
  initHeroPolish();
  initProjectReel();
  initProfileSpread();
  initEducationLevels();
  initAffiliationSwitchboard();
  initContactGlow();

  function loadPolish() {
    if (!document.querySelector('link[data-director-polish]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "director-polish.css?v=20260831-2";
      link.dataset.directorPolish = "true";
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[data-director-final]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "director-final.css?v=20260831-3";
      link.dataset.directorFinal = "true";
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[data-director-tune]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "director-tune.css?v=20260831-1";
      link.dataset.directorTune = "true";
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[data-director-mosaic]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "director-mosaic.css?v=20260831-7";
      link.dataset.directorMosaic = "true";
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[data-hero-polish]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "hero-polish.css?v=20260901-1";
      link.dataset.heroPolish = "true";
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[data-hero-role-swap]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "hero-role-swap.css?v=20260901-2";
      link.dataset.heroRoleSwap = "true";
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[data-requirements-audit]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "requirements-audit.css?v=20260902-1";
      link.dataset.requirementsAudit = "true";
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[data-director-mosaic]')) {
      const script = document.createElement("script");
      script.src = "director-mosaic.js?v=20260902-1";
      script.dataset.directorMosaic = "true";
      document.head.appendChild(script);
    }
    if (!document.querySelector('script[data-requirements-audit]')) {
      const script = document.createElement("script");
      script.src = "requirements-audit.js?v=20260902-1";
      script.dataset.requirementsAudit = "true";
      document.head.appendChild(script);
    }
  }

  function initHeroPolish() {
    const poster = document.getElementById("heroPoster");
    if (!poster || !finePointer || reducedMotion) return;
    let raf = 0;
    const update = (event) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = poster.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        poster.style.setProperty("--hx", ((x - .5) * 2).toFixed(3));
        poster.style.setProperty("--hy", ((y - .5) * 2).toFixed(3));
        poster.style.setProperty("--hero-glow-x", `${(x * 100).toFixed(1)}%`);
        poster.style.setProperty("--hero-glow-y", `${(y * 100).toFixed(1)}%`);
      });
    };
    poster.addEventListener("pointerenter", () => poster.classList.add("is-tracking"));
    poster.addEventListener("pointermove", update, { passive: true });
    poster.addEventListener("pointerleave", () => {
      if (raf) cancelAnimationFrame(raf);
      poster.classList.remove("is-tracking");
      poster.style.setProperty("--hx", "0");
      poster.style.setProperty("--hy", "0");
      poster.style.setProperty("--hero-glow-x", "50%");
      poster.style.setProperty("--hero-glow-y", "50%");
    });
  }

  function initProjectReel() {
    const reel = document.getElementById("projectReel");
    const panels = Array.from(document.querySelectorAll("[data-project-panel]"));
    if (!reel || !panels.length) return;
    const activate = (panel) => panels.forEach((item) => item.classList.toggle("is-active", item === panel));
    panels.forEach((panel) => {
      panel.addEventListener("mouseenter", () => activate(panel));
      panel.addEventListener("focus", () => activate(panel));
      panel.addEventListener("pointerdown", () => activate(panel));
      if (finePointer && !reducedMotion) {
        panel.addEventListener("pointermove", (event) => {
          const rect = panel.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - .5;
          const ny = (event.clientY - rect.top) / rect.height - .5;
          panel.style.setProperty("--panel-x", `${nx * -10}px`);
          panel.style.setProperty("--panel-y", `${ny * -8}px`);
        }, { passive: true });
        panel.addEventListener("pointerleave", () => {
          panel.style.setProperty("--panel-x", "0px");
          panel.style.setProperty("--panel-y", "0px");
        });
      }
    });
  }

  function initProfileSpread() {
    const collage = document.getElementById("profileCollage");
    const frames = collage ? Array.from(collage.querySelectorAll(".profile-frame")) : [];
    if (!collage || !frames.length) return;
    let active = 0;
    let visible = true;
    let timer = 0;
    const show = (index) => {
      active = (index + frames.length) % frames.length;
      frames.forEach((frame, i) => frame.classList.toggle("is-active", i === active));
    };
    frames.forEach((frame, i) => {
      frame.addEventListener("mouseenter", () => show(i));
      frame.addEventListener("click", () => show(i));
    });
    if (finePointer && !reducedMotion) {
      collage.addEventListener("pointermove", (event) => {
        const rect = collage.getBoundingClientRect();
        collage.style.setProperty("--px", ((((event.clientX - rect.left) / rect.width) - .5) * 2).toFixed(3));
        collage.style.setProperty("--py", ((((event.clientY - rect.top) / rect.height) - .5) * 2).toFixed(3));
      }, { passive: true });
      collage.addEventListener("pointerleave", () => {
        collage.style.setProperty("--px", "0");
        collage.style.setProperty("--py", "0");
      });
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .25 }).observe(collage);
    }
    if (!reducedMotion) {
      timer = window.setInterval(() => { if (visible) show(active + 1); }, 3600);
      window.addEventListener("beforeunload", () => clearInterval(timer), { once: true });
    }
  }

  function initEducationLevels() {
    const root = document.getElementById("educationV2");
    const buttons = root ? Array.from(root.querySelectorAll("[data-edu-level]")) : [];
    const panels = root ? Array.from(root.querySelectorAll("[data-edu-panel]")) : [];
    if (!root || !buttons.length || !panels.length) return;
    const activate = (key) => {
      root.dataset.active = key;
      buttons.forEach((button) => {
        const selected = button.dataset.eduLevel === key;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", selected ? "true" : "false");
      });
      panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.eduPanel === key));
    };
    buttons.forEach((button) => {
      button.addEventListener("click", () => activate(button.dataset.eduLevel));
      button.addEventListener("focus", () => activate(button.dataset.eduLevel));
    });
  }

  function initAffiliationSwitchboard() {
    // Affiliation markup is rebuilt by director-mosaic.js into role-first editorial records.
  }

  function initContactGlow() {
    const section = document.getElementById("contactGlow");
    if (!section || !finePointer || reducedMotion) return;
    let raf = 0;
    section.addEventListener("pointermove", (event) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        section.style.setProperty("--gx", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
        section.style.setProperty("--gy", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
      });
    }, { passive: true });
    section.addEventListener("pointerleave", () => {
      section.style.setProperty("--gx", "68%");
      section.style.setProperty("--gy", "30%");
    });
  }
});