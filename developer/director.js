/* Progressive-enhancement boot.
   This defer script runs after the DOM is parsed but before DOMContentLoaded, so we can
   prevent decorative continuous loops from starting on touch / lower-end hardware. */
(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const compact = window.matchMedia("(max-width: 900px)").matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const memory = Number(navigator.deviceMemory || 0);
  const cores = Number(navigator.hardwareConcurrency || 0);
  const lowPower = reduced || Boolean(connection?.saveData) || (memory > 0 && memory <= 4) || (cores > 0 && cores <= 4);

  root.classList.toggle("perf-touch", touch);
  root.classList.toggle("perf-compact", compact);
  root.classList.toggle("perf-low", lowPower);

  window.__portfolioPerf = { reduced, touch, compact, lowPower };

  if (touch || lowPower) {
    document.getElementById("signalCanvas")?.remove();
    document.getElementById("cursor")?.remove();
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  const perf = window.__portfolioPerf || {};
  const lowPower = Boolean(perf.lowPower);

  loadPolish();
  initHeroPolish();
  initProjectReel();
  initEducationLevels();
  initAffiliationSwitchboard();
  initContactGlow();
  initPerformancePostLoad();

  function appendStylesheet(selector, href, dataKey) {
    if (document.querySelector(selector)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset[dataKey] = "true";
    document.head.appendChild(link);
  }

  function appendScript(selector, src, dataKey) {
    if (document.querySelector(selector)) return;
    const script = document.createElement("script");
    script.src = src;
    script.dataset[dataKey] = "true";
    document.head.appendChild(script);
  }

  function loadPolish() {
    appendStylesheet('link[data-director-polish]', "director-polish.css?v=20260831-2", "directorPolish");
    appendStylesheet('link[data-director-final]', "director-final.css?v=20260831-3", "directorFinal");
    appendStylesheet('link[data-director-tune]', "director-tune.css?v=20260831-1", "directorTune");
    appendStylesheet('link[data-director-mosaic]', "director-mosaic.css?v=20260831-7", "directorMosaic");
    appendStylesheet('link[data-hero-polish]', "hero-polish.css?v=20260901-1", "heroPolish");
    appendStylesheet('link[data-hero-role-swap]', "hero-role-swap.css?v=20260901-2", "heroRoleSwap");
    appendStylesheet('link[data-requirements-audit]', "requirements-audit.css?v=20260904-1", "requirementsAudit");

    appendScript('script[data-director-mosaic]', "director-mosaic.js?v=20260904-1", "directorMosaic");
    appendScript('script[data-requirements-audit]', "requirements-audit.js?v=20260904-1", "requirementsAudit");

    /* Must be last so responsive/performance safeguards win the cascade. */
    appendStylesheet('link[data-responsive-performance]', "responsive-performance.css?v=20260904-1", "responsivePerformance");
  }

  function initHeroPolish() {
    const poster = document.getElementById("heroPoster");
    if (!poster || !finePointer || reducedMotion || lowPower) return;

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

      if (finePointer && !reducedMotion && !lowPower) {
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
    /* Affiliation markup is rebuilt by director-mosaic.js into role-first records. */
  }

  function initContactGlow() {
    const section = document.getElementById("contactGlow");
    if (!section || !finePointer || reducedMotion || lowPower) return;

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

  function initPerformancePostLoad() {
    const root = document.documentElement;

    /* Browser-native image scheduling: the hero remains immediate, everything below can wait. */
    document.querySelectorAll("main img").forEach((img) => {
      img.decoding = "async";
      if (!img.closest(".hero")) {
        img.loading = "lazy";
        try { img.fetchPriority = "low"; } catch (_) {}
      }
    });

    const setVisibility = () => root.classList.toggle("page-hidden", document.hidden);
    document.addEventListener("visibilitychange", setVisibility, { passive: true });
    setVisibility();

    /* Keep compact-state CSS correct after orientation / viewport changes. */
    const compactQuery = window.matchMedia("(max-width: 900px)");
    const syncCompact = () => {
      root.classList.toggle("perf-compact", compactQuery.matches);
      window.__portfolioPerf = { ...(window.__portfolioPerf || {}), compact: compactQuery.matches };
    };
    compactQuery.addEventListener?.("change", syncCompact);
    syncCompact();

    /* Mobile menu keyboard escape, without adding a document-wide pointer listener. */
    const nav = document.getElementById("siteNav");
    const toggle = document.getElementById("navToggle");
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !nav?.classList.contains("is-open")) return;
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.focus();
    });
  }
});
