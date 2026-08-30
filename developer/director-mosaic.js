(() => {
  const start = () => {
    const root = document.getElementById("affiliationConstellation");
    if (!root || root.dataset.chapterReady === "true") return;

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
        category: "TECHNICAL WORKING GROUP",
        period: "2021 → 2023",
        institution: "Bayawan City Science and Technology Education Center",
        roles: ["CREATIVE HEAD / 2021—2023", "FOUNDING MEMBER", "VIDEO / PHOTO / GRAPHICS"]
      },
      aemt: {
        index: "05",
        title: "AEMT",
        category: "AUGUSTINIAN EVENTS MANAGEMENT TEAM",
        period: "SECONDARY SCHOOL",
        institution: "Saint Augustine Academy of Bayawan, Inc.",
        roles: ["PIONEER MEMBER", "VIDEO / PHOTO / GRAPHICS"]
      }
    };

    const makeRoles = (items) => {
      const wrap = document.createElement("div");
      wrap.className = "aff-spread__roles";
      items.forEach((role) => {
        const span = document.createElement("span");
        span.textContent = role;
        wrap.appendChild(span);
      });
      return wrap;
    };

    const makeOrg = (key, variant = "") => {
      const item = records[key];
      const article = document.createElement("article");
      article.className = `aff-spread__org aff-spread__org--${key}${variant ? ` ${variant}` : ""}`;
      article.tabIndex = 0;

      const meta = document.createElement("div");
      meta.className = "aff-spread__meta";
      const left = document.createElement("span");
      left.textContent = `${item.index} / ${item.category}`;
      const right = document.createElement("span");
      right.textContent = item.period;
      meta.append(left, right);

      const title = document.createElement("h3");
      title.className = "aff-spread__title";
      title.textContent = item.title;

      const institution = document.createElement("p");
      institution.className = "aff-spread__institution";
      institution.textContent = item.institution;

      article.append(meta, title, institution, makeRoles(item.roles));
      return article;
    };

    const makeChapterHead = (eyebrow, title, note) => {
      const head = document.createElement("header");
      head.className = "aff-chapter__head";
      const tiny = document.createElement("span");
      tiny.textContent = eyebrow;
      const h = document.createElement("h3");
      h.textContent = title;
      const p = document.createElement("p");
      p.textContent = note;
      head.append(tiny, h, p);
      return head;
    };

    const campus = document.createElement("section");
    campus.className = "aff-chapter aff-chapter--campus";
    campus.appendChild(makeChapterHead(
      "01 / TERTIARY",
      "ASIAN COLLEGE",
      "Leadership, campus media, and creative organization work under one institution."
    ));

    const campusField = document.createElement("div");
    campusField.className = "aff-chapter__field aff-chapter__field--campus";
    campusField.append(
      makeOrg("acclaimed", "aff-spread__org--hero"),
      makeOrg("ccse"),
      makeOrg("acer")
    );
    campus.appendChild(campusField);

    const secondary = document.createElement("section");
    secondary.className = "aff-chapter aff-chapter--secondary";
    secondary.appendChild(makeChapterHead(
      "02 / SECONDARY",
      "CREATIVE TEAMS",
      "Early production, event, photography, video, and graphics work."
    ));

    const secondaryField = document.createElement("div");
    secondaryField.className = "aff-chapter__field aff-chapter__field--secondary";
    secondaryField.append(makeOrg("twg"), makeOrg("aemt"));
    secondary.appendChild(secondaryField);

    root.dataset.chapterReady = "true";
    root.className = "affiliation-constellation affiliation-spread";
    root.replaceChildren(campus, secondary);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();