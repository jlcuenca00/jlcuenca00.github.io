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
    if (!document.querySelector('script[data-director-final]')) {
      const script = document.createElement("script");
      script.src = "director-final.js?v=20260831-3";
      script.dataset.directorFinal = "true";
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
    const root = document.getElementById("affiliationConstellation");
    const buttons = root ? Array.from(root.querySelectorAll("[data-aff-v2]")) : [];
    const readout = root ? root.querySelector(".aff-readout") : null;
    if (!root || !buttons.length || !readout) return;

    const data = {
      acclaimed: { index:"01", category:"CAMPUS CREATIVE ORGANIZATION", period:"FOUNDING → 2026", title:"ACCLAIMED", institution:"Asian College of Science and Technology — Dumaguete City", roles:["PIO / 2025—2026","PRESIDENT / 2024—2025","FOUNDING MEMBER"] },
      ccse: { index:"02", category:"COLLEGE LEADERSHIP", period:"2024 → PRESENT", title:"CCSE", institution:"College of Computer Studies and Engineering / Asian College", roles:["VICE PRESIDENT / 2024—PRESENT","IT TREASURER / 2024—2025"] },
      acer: { index:"03", category:"SCHOOL PAPER / VISUAL JOURNALISM", period:"2024 → PRESENT", title:"ACER CHRONICLES", institution:"Asian College school paper team", roles:["PHOTOJOURNALIST / 2024—PRESENT"] },
      twg: { index:"04", category:"SECONDARY CREATIVE TEAM", period:"2021 → 2023", title:"TWG / BCSTEC", institution:"Bayawan City Science and Technology Education Center", roles:["CREATIVE HEAD / 2021—2023","FOUNDING MEMBER","VIDEO / PHOTO / GRAPHICS"] },
      aemt: { index:"05", category:"EVENT / CREATIVE TEAM", period:"SECONDARY SCHOOL", title:"AEMT", institution:"Saint Augustine Academy of Bayawan, Inc.", roles:["PIONEER MEMBER","VIDEO / PHOTO / GRAPHICS"] }
    };

    const category = document.getElementById("affV2Category");
    const period = document.getElementById("affV2Period");
    const title = document.getElementById("affV2Title");
    const institution = document.getElementById("affV2Institution");
    const roles = document.getElementById("affV2Roles");

    const writeRoles = (items) => {
      roles.replaceChildren(...items.map((label) => {
        const span = document.createElement("span");
        span.textContent = label;
        return span;
      }));
    };

    const write = (item) => {
      readout.dataset.index = item.index;
      category.textContent = item.category;
      period.textContent = item.period;
      title.textContent = item.title;
      institution.textContent = item.institution;
      writeRoles(item.roles);
    };

    const activate = (button) => {
      const item = data[button.dataset.affV2];
      if (!item) return;
      buttons.forEach((node) => node.classList.toggle("is-active", node === button));

      if (reducedMotion || typeof readout.animate !== "function") {
        write(item);
        return;
      }

      const out = readout.animate([
        { opacity:1, transform:"translateY(0)" },
        { opacity:.18, transform:"translateY(8px)" }
      ], { duration:120, easing:"ease-in", fill:"forwards" });
      out.onfinish = () => {
        write(item);
        readout.animate([
          { opacity:.18, transform:"translateY(10px)" },
          { opacity:1, transform:"translateY(0)" }
        ], { duration:360, easing:"cubic-bezier(.16,1,.3,1)", fill:"forwards" });
      };
    };

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => activate(button));
      button.addEventListener("focus", () => activate(button));
      button.addEventListener("click", () => activate(button));
    });

    write(data.acclaimed);
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