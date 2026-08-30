(() => {
  const start = () => {
    const root = document.getElementById("affiliationConstellation");
    if (!root || root.dataset.scoreReady === "true") return;

    const records = [
      {
        index: "01",
        title: "ACCLAIMED",
        category: "CAMPUS CREATIVE ORGANIZATION",
        period: "FOUNDING → 2026",
        institution: "Asian College of Science and Technology — Dumaguete City",
        roles: ["PUBLIC INFORMATION OFFICER / 2025—2026", "PRESIDENT / 2024—2025", "FOUNDING MEMBER"]
      },
      {
        index: "02",
        title: "CCSE",
        category: "COLLEGE LEADERSHIP",
        period: "2024 → PRESENT",
        institution: "College of Computer Studies and Engineering / Asian College",
        roles: ["VICE PRESIDENT / 2024—PRESENT", "IT TREASURER / 2024—2025"]
      },
      {
        index: "03",
        title: "ACER CHRONICLES",
        category: "SCHOOL PAPER / VISUAL JOURNALISM",
        period: "2024 → PRESENT",
        institution: "Asian College school paper team",
        roles: ["PHOTOJOURNALIST / 2024—PRESENT"]
      },
      {
        index: "04",
        title: "TWG / BCSTEC",
        category: "TECHNICAL WORKING GROUP",
        period: "2021 → 2023",
        institution: "Bayawan City Science and Technology Education Center",
        roles: ["CREATIVE HEAD / 2021—2023", "FOUNDING MEMBER", "VIDEO / PHOTO / GRAPHICS"]
      },
      {
        index: "05",
        title: "AEMT",
        category: "AUGUSTINIAN EVENTS MANAGEMENT TEAM",
        period: "SECONDARY SCHOOL",
        institution: "Saint Augustine Academy of Bayawan, Inc.",
        roles: ["PIONEER MEMBER", "VIDEO / PHOTO / GRAPHICS"]
      }
    ];

    const intro = document.createElement("header");
    intro.className = "aff-score__intro";
    const introTitle = document.createElement("h3");
    introTitle.innerHTML = "LEAD.<br><span>CREATE.</span><br>DOCUMENT.";
    const introCopy = document.createElement("p");
    introCopy.textContent = "Leadership, publication, and creative-team work across campus and secondary organizations.";
    intro.append(introTitle, introCopy);

    const list = document.createElement("div");
    list.className = "aff-score__list";

    records.forEach((item) => {
      const row = document.createElement("article");
      row.className = "aff-score__row";
      row.tabIndex = 0;
      row.dataset.index = item.index;

      const index = document.createElement("span");
      index.className = "aff-score__index";
      index.textContent = item.index;

      const identity = document.createElement("div");
      identity.className = "aff-score__identity";
      const kicker = document.createElement("span");
      kicker.className = "aff-score__kicker";
      kicker.textContent = item.category;
      const title = document.createElement("h4");
      title.className = "aff-score__title";
      title.textContent = item.title;
      identity.append(kicker, title);

      const details = document.createElement("div");
      details.className = "aff-score__details";
      const institution = document.createElement("p");
      institution.className = "aff-score__institution";
      institution.textContent = item.institution;
      const roles = document.createElement("div");
      roles.className = "aff-score__roles";
      item.roles.forEach((role) => {
        const span = document.createElement("span");
        span.textContent = role;
        roles.appendChild(span);
      });
      details.append(institution, roles);

      const period = document.createElement("span");
      period.className = "aff-score__period";
      period.textContent = item.period;

      row.append(index, identity, details, period);
      list.appendChild(row);
    });

    root.dataset.scoreReady = "true";
    root.className = "affiliation-constellation affiliation-score";
    root.replaceChildren(intro, list);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();