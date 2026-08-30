(() => {
  const start = () => {
    const root = document.getElementById("affiliationConstellation");
    if (!root || root.dataset.creditsReady === "true") return;

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

    root.dataset.creditsReady = "true";
    root.className = "affiliation-constellation affiliation-credits";
    root.replaceChildren();

    oldButtons.forEach((oldButton, idx) => {
      const item = records[oldButton.dataset.affV2];
      if (!item) return;

      const band = document.createElement("button");
      band.type = "button";
      band.className = `credit-band${idx === 0 ? " is-active" : ""}`;
      band.dataset.index = item.index;
      band.setAttribute("aria-label", `${item.title}. ${item.institution}. ${item.roles.join(", ")}`);

      const meta = document.createElement("div");
      meta.className = "credit-band__meta";
      const label = document.createElement("span");
      label.textContent = `${item.index} / ${item.category}`;
      const period = document.createElement("span");
      period.textContent = item.period;
      meta.append(label, period);

      const trackWrap = document.createElement("div");
      trackWrap.className = "credit-band__track-wrap";
      const track = document.createElement("div");
      track.className = "credit-band__track";

      for (let i = 0; i < 3; i += 1) {
        const title = document.createElement("strong");
        title.className = i % 2 === 0 ? "credit-band__title" : "credit-band__echo";
        title.textContent = item.title;
        const slash = document.createElement("span");
        slash.className = "credit-band__slash";
        slash.textContent = "/";
        track.append(title, slash);
      }
      trackWrap.appendChild(track);

      const foot = document.createElement("div");
      foot.className = "credit-band__foot";
      const institution = document.createElement("p");
      institution.className = "credit-band__institution";
      institution.textContent = item.institution;
      const roles = document.createElement("div");
      roles.className = "credit-band__roles";
      item.roles.forEach((role) => {
        const roleItem = document.createElement("span");
        roleItem.textContent = role;
        roles.appendChild(roleItem);
      });
      foot.append(institution, roles);

      band.append(meta, trackWrap, foot);
      root.appendChild(band);

      const activate = () => {
        Array.from(root.querySelectorAll(".credit-band")).forEach((node) => node.classList.toggle("is-active", node === band));
      };

      band.addEventListener("mouseenter", activate);
      band.addEventListener("focus", activate);
      band.addEventListener("click", activate);

      band.addEventListener("pointermove", (event) => {
        const rect = band.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        band.style.setProperty("--mx", `${x.toFixed(1)}%`);
        band.style.setProperty("--my", `${y.toFixed(1)}%`);
      }, { passive: true });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
