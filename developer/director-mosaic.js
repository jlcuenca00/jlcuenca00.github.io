(() => {
  const start = () => {
    const root = document.getElementById("affiliationConstellation");
    if (!root || root.dataset.mosaicReady === "true") return;

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
    if (!oldButtons.length) return;

    root.dataset.mosaicReady = "true";
    root.className = "affiliation-constellation affiliation-mosaic";
    root.replaceChildren();

    oldButtons.forEach((oldButton, idx) => {
      const item = records[oldButton.dataset.affV2];
      if (!item) return;

      const card = document.createElement("button");
      card.type = "button";
      card.className = `aff-card${idx === 0 ? " is-open" : ""}`;
      card.dataset.index = item.index;
      card.dataset.affiliation = oldButton.dataset.affV2;
      card.setAttribute("aria-pressed", idx === 0 ? "true" : "false");

      const meta = document.createElement("div");
      meta.className = "aff-card__meta";
      const index = document.createElement("span");
      index.textContent = `${item.index} / ${item.category}`;
      const period = document.createElement("span");
      period.textContent = item.period;
      meta.append(index, period);

      const body = document.createElement("div");
      body.className = "aff-card__body";
      const title = document.createElement("h3");
      title.textContent = item.title;
      const institution = document.createElement("p");
      institution.className = "aff-card__institution";
      institution.textContent = item.institution;
      body.append(title, institution);

      const foot = document.createElement("div");
      foot.className = "aff-card__foot";
      const signal = document.createElement("span");
      signal.className = "aff-card__signal";
      signal.textContent = "ROLE RECORD";
      const roles = document.createElement("div");
      roles.className = "aff-card__roles";
      item.roles.forEach((role) => {
        const chip = document.createElement("span");
        chip.textContent = role;
        roles.appendChild(chip);
      });
      foot.append(signal, roles);

      card.append(meta, body, foot);
      root.appendChild(card);

      const activate = () => {
        Array.from(root.querySelectorAll(".aff-card")).forEach((node) => {
          const active = node === card;
          node.classList.toggle("is-open", active);
          node.setAttribute("aria-pressed", active ? "true" : "false");
        });
      };

      card.addEventListener("mouseenter", activate);
      card.addEventListener("focus", activate);
      card.addEventListener("click", activate);

      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", `${x.toFixed(1)}%`);
        card.style.setProperty("--my", `${y.toFixed(1)}%`);
      }, { passive: true });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "50%");
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
