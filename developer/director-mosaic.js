(() => {
  const start = () => {
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();