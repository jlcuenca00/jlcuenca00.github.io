(() => {
  const start = () => {
    const root = document.getElementById("affiliationConstellation");
    if (!root || root.dataset.stackReady === "true") return;

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

    const buttons = Array.from(root.querySelectorAll("[data-aff-v2]"));
    if (!buttons.length) return;

    root.dataset.stackReady = "true";
    root.classList.add("affiliation-stack");

    const readout = root.querySelector(".aff-readout");
    if (readout) readout.hidden = true;
    const core = root.querySelector(".affiliation-core");
    if (core) core.hidden = true;

    const setOpen = (target) => {
      buttons.forEach((button) => {
        const open = button === target;
        button.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", open ? "true" : "false");
      });
    };

    buttons.forEach((button, idx) => {
      const item = records[button.dataset.affV2];
      if (!item) return;

      button.className = `aff-strip${idx === 0 ? " is-open" : ""}`;
      button.dataset.index = item.index;
      button.setAttribute("aria-expanded", idx === 0 ? "true" : "false");

      button.replaceChildren();

      const index = document.createElement("span");
      index.className = "aff-strip__index";
      index.textContent = item.index;

      const name = document.createElement("strong");
      name.className = "aff-strip__name";
      name.textContent = item.title;

      const category = document.createElement("small");
      category.className = "aff-strip__category";
      category.textContent = item.category;

      const period = document.createElement("em");
      period.className = "aff-strip__period";
      period.textContent = item.period;

      const drawer = document.createElement("div");
      drawer.className = "aff-strip__drawer";

      const institution = document.createElement("p");
      institution.textContent = item.institution;

      const roles = document.createElement("div");
      roles.className = "aff-strip__roles";
      item.roles.forEach((role) => {
        const roleChip = document.createElement("span");
        roleChip.textContent = role;
        roles.appendChild(roleChip);
      });

      drawer.append(institution, roles);
      button.append(index, name, category, period, drawer);

      button.addEventListener("click", () => setOpen(button));
      button.addEventListener("focus", () => setOpen(button));
      button.addEventListener("mouseenter", () => setOpen(button));
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
