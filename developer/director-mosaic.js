(() => {
  const start = () => {
    const root = document.getElementById("affiliationConstellation");
    if (!root || root.dataset.accordionReady === "true") return;

    const records = {
      acclaimed: {
        index: "01",
        title: "ACCLAIMED",
        category: "CAMPUS CREATIVE ORGANIZATION",
        period: "FOUNDING → 2026",
        institution: "Asian College of Science and Technology — Dumaguete City",
        roles: [
          ["PUBLIC INFORMATION OFFICER", "2025—2026"],
          ["PRESIDENT", "2024—2025"],
          ["FOUNDING MEMBER", "FOUNDING"]
        ]
      },
      ccse: {
        index: "02",
        title: "CCSE",
        category: "COLLEGE LEADERSHIP",
        period: "2024 → PRESENT",
        institution: "College of Computer Studies and Engineering / Asian College",
        roles: [
          ["VICE PRESIDENT", "2024—PRESENT"],
          ["IT TREASURER", "2024—2025"]
        ]
      },
      acer: {
        index: "03",
        title: "ACER CHRONICLES",
        category: "SCHOOL PAPER / VISUAL JOURNALISM",
        period: "2024 → PRESENT",
        institution: "Asian College school paper team",
        roles: [["PHOTOJOURNALIST", "2024—PRESENT"]]
      },
      twg: {
        index: "04",
        title: "TWG / BCSTEC",
        category: "SECONDARY CREATIVE TEAM",
        period: "2021 → 2023",
        institution: "Bayawan City Science and Technology Education Center",
        roles: [
          ["CREATIVE HEAD", "2021—2023"],
          ["FOUNDING MEMBER", "FOUNDING"],
          ["VIDEO / PHOTO / GRAPHICS", "CREATIVE"]
        ]
      },
      aemt: {
        index: "05",
        title: "AEMT",
        category: "EVENT / CREATIVE TEAM",
        period: "SECONDARY SCHOOL",
        institution: "Saint Augustine Academy of Bayawan, Inc.",
        roles: [
          ["PIONEER MEMBER", "PIONEER"],
          ["VIDEO / PHOTO / GRAPHICS", "CREATIVE"]
        ]
      }
    };

    const sourceKeys = ["acclaimed", "ccse", "acer", "twg", "aemt"];
    root.dataset.accordionReady = "true";
    root.className = "affiliation-constellation affiliation-accordion";
    root.replaceChildren();

    const panels = sourceKeys.map((key) => {
      const item = records[key];
      const panel = document.createElement("button");
      panel.type = "button";
      panel.className = "aff-rail";
      panel.dataset.index = item.index;
      panel.dataset.key = key;
      panel.setAttribute("aria-expanded", "false");

      const top = document.createElement("div");
      top.className = "aff-rail__top";
      const label = document.createElement("span");
      label.textContent = `${item.index} / ${item.category}`;
      const period = document.createElement("span");
      period.className = "aff-rail__period";
      period.textContent = item.period;
      top.append(label, period);

      const center = document.createElement("div");
      center.className = "aff-rail__center";
      const title = document.createElement("h3");
      title.className = "aff-rail__title";
      title.textContent = item.title;
      const institution = document.createElement("p");
      institution.className = "aff-rail__institution";
      institution.textContent = item.institution;
      center.append(title, institution);

      const detail = document.createElement("div");
      detail.className = "aff-rail__detail";
      const roles = document.createElement("div");
      roles.className = "aff-rail__roles";
      item.roles.forEach(([role, date]) => {
        const row = document.createElement("div");
        row.className = "aff-rail__role";
        const strong = document.createElement("strong");
        strong.textContent = role;
        const small = document.createElement("small");
        small.textContent = date;
        row.append(strong, small);
        roles.appendChild(row);
      });
      detail.appendChild(roles);

      const hint = document.createElement("span");
      hint.className = "aff-rail__hint";
      hint.textContent = "OPEN RECORD +";

      panel.append(top, center, detail, hint);
      root.appendChild(panel);
      return panel;
    });

    const setActive = (panel) => {
      root.classList.toggle("has-active", Boolean(panel));
      panels.forEach((node) => {
        const active = node === panel;
        node.classList.toggle("is-active", active);
        node.setAttribute("aria-expanded", active ? "true" : "false");
      });
    };

    const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

    panels.forEach((panel) => {
      if (finePointer) panel.addEventListener("mouseenter", () => setActive(panel));
      panel.addEventListener("focus", () => setActive(panel));
      panel.addEventListener("click", () => {
        setActive(panel.classList.contains("is-active") ? null : panel);
      });
    });

    if (finePointer) {
      root.addEventListener("mouseleave", () => {
        if (!root.contains(document.activeElement)) setActive(null);
      });
    }

    root.addEventListener("focusout", () => {
      requestAnimationFrame(() => {
        if (!root.contains(document.activeElement) && !root.matches(":hover")) setActive(null);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
