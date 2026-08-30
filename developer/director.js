document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  loadPolish();
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
      link.href = "director-mosaic.css?v=20260831-2";
      link.dataset.directorMosaic = "true";
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[data-director-mosaic]')) {
      const script = document.createElement("script");
      script.src = "director-mosaic.js?v=20260831-2";
      script.dataset.directorMosaic = "true";
      document.head.appendChild(script);
    }
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
    // Affiliation markup is rebuilt by director-mosaic.js into the final static poster.
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
