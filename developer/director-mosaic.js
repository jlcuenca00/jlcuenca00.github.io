(() => {
  const start = () => {
    const root = document.getElementById("affiliationConstellation");
    if (!root || root.dataset.posterReady === "true") return;

    const records = {
      acclaimed: {
        index: "01",
        title: "ACCLAIMED",
        category: "CAMPUS CREATIVE ORGANIZATION",
        period: "FOUNDING → 2026",
        institution: "Asian College of Science and Technology — Dumaguete City",
        roles: ["PUBLIC INFORMATION OFFICER / 2025—2026", "PRESIDENT / 2024—2025", "FOUNDING MEMBER"]
      },
      ccse: {
        index: "02",
        title: "CCSE",
        category: "COLLEGE LEADERSHIP",
        period: "2024 → PRESENT",
        institution: "College of Computer Studies and Engineering / Asian College",
        roles: ["VICE PRESIDENT / 2024—PRESENT", "IT TREASURER / 2024—2025"]
      },
      acer: {
        index: "03",
        title: "ACER CHRONICLES",
        category: "SCHOOL PAPER / VISUAL JOURNALISM",
        period: "2024 → PRESENT",
        institution: "Asian College school paper team",
        roles: ["PHOTOJOURNALIST / 2024—PRESENT"]
      },
      twg: {
        index: "04",
        title: "TWG / BCSTEC",
        category: "SECONDARY CREATIVE TEAM",
        period: "2021 → 2023",
        institution: "Bayawan City Science and Technology Education Center",
        roles: ["CREATIVE HEAD / 2021—2023", "FOUNDING MEMBER", "VIDEO / PHOTO / GRAPHICS"]
      },
      aemt: {
        index: "05",
        title: "AEMT",
        category: "EVENT / CREATIVE TEAM",
        period: "SECONDARY SCHOOL",
        institution: "Saint Augustine Academy of Bayawan, Inc.",
        roles: ["PIONEER MEMBER", "VIDEO / PHOTO / GRAPHICS"]
      }
    };

    const oldButtons = Array.from(root.querySelectorAll("[data-aff-v2]"));
    if (!oldButtons.length && root.dataset.mosaicReady !== "true") return;

    root.dataset.posterReady = "true";
    root.className = "affiliation-constellation affiliation-poster";
    root.replaceChildren();

    const sourceKeys = ["acclaimed", "ccse", "acer", "twg", "aemt"];

    sourceKeys.forEach((key) => {
      const item = records[key];
      const node = document.createElement("article");
      node.className = `aff-poster__item aff-poster__item--${key}`;
      node.tabIndex = 0;
      node.dataset.index = item.index;

      const meta = document.createElement("div");
      meta.className = "aff-poster__meta";
      const label = document.createElement("span");
      label.textContent = `${item.index} / ${item.category}`;
      const period = document.createElement("span");
      period.textContent = item.period;
      meta.append(label, period);

      const title = document.createElement("h3");
      title.className = "aff-poster__title";
      title.textContent = item.title;

      const institution = document.createElement("p");
      institution.className = "aff-poster__institution";
      institution.textContent = item.institution;

      const roles = document.createElement("div");
      roles.className = "aff-poster__roles";
      item.roles.forEach((role) => {
        const roleLine = document.createElement("span");
        roleLine.textContent = role;
        roles.appendChild(roleLine);
      });

      node.append(meta, title, institution, roles);
      root.appendChild(node);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
