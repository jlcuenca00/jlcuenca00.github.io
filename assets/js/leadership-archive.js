(() => {
    if (!document.body.classList.contains("dev-page")) return;

    const root = document.querySelector(".dev-education .achievement-list");
    if (!root || root.dataset.archiveBuilt === "true") return;

    const affiliations = [
        {
            id: "acclaimed",
            number: "01",
            short: "ACCLAIMED",
            title: "ACCLAIMED",
            institution: "ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY — DUMAGUETE CITY",
            category: "CAMPUS CREATIVE ORGANIZATION",
            period: "FOUNDING → 2026",
            description: "Campus creative organization for photography, video, design, event coverage, and visual communication.",
            roles: [
                ["PUBLIC INFORMATION OFFICER", "2025–2026"],
                ["PRESIDENT", "2024–2025"],
                ["FOUNDING MEMBER", "FOUNDING"],
            ],
        },
        {
            id: "ccse",
            number: "02",
            short: "CCSE",
            title: "COLLEGE OF COMPUTER STUDIES & ENGINEERING",
            institution: "ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY — DUMAGUETE CITY",
            category: "COLLEGE LEADERSHIP",
            period: "2024 → PRESENT",
            description: "Student leadership work within the College of Computer Studies and Engineering.",
            roles: [
                ["VICE PRESIDENT", "2024–PRESENT"],
                ["IT TREASURER", "2024–2025"],
            ],
        },
        {
            id: "acer",
            number: "03",
            short: "ACER CHRONICLES",
            title: "ACER CHRONICLES",
            institution: "ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY — DUMAGUETE CITY",
            category: "SCHOOL PAPER / VISUAL JOURNALISM",
            period: "2024 → PRESENT",
            description: "School publication work focused on visual documentation and photojournalism.",
            roles: [["PHOTOJOURNALIST", "2024–PRESENT"]],
        },
        {
            id: "twg",
            number: "04",
            short: "TWG / BCSTEC",
            title: "TECHNICAL WORKING GROUP",
            institution: "BAYAWAN CITY SCIENCE AND TECHNOLOGY EDUCATION CENTER",
            category: "SECONDARY SCHOOL CREATIVE TEAM",
            period: "2021 → 2023",
            description: "Creative production team for school events and media, covering video, photography, and graphics.",
            roles: [
                ["CREATIVE HEAD", "2021–2023"],
                ["FOUNDING MEMBER", "FOUNDING"],
                ["VIDEO / PHOTO / GRAPHICS", "CREATIVE ROLE"],
            ],
        },
        {
            id: "aemt",
            number: "05",
            short: "AEMT",
            title: "AUGUSTINIAN EVENTS MANAGEMENT TEAM",
            institution: "SAINT AUGUSTINE ACADEMY OF BAYAWAN, INC.",
            category: "SECONDARY SCHOOL EVENT / CREATIVE TEAM",
            period: "SECONDARY SCHOOL",
            description: "Pioneer event-production work spanning video editing, photography, and graphics design.",
            roles: [
                ["PIONEER MEMBER", "PIONEER"],
                ["VIDEO / PHOTO / GRAPHICS", "CREATIVE ROLE"],
            ],
        },
    ];

    root.dataset.archiveBuilt = "true";
    // Important: drop the legacy `achievement-list` class completely.
    // Older education CSS and ScrollTrigger selectors target that class and would
    // otherwise force this component back into the previous three-column layout.
    root.className = "affiliation-showcase";
    root.innerHTML = `
        <header class="affiliation-showcase__intro">
            <div>
                <span>LEADERSHIP / MEDIA</span>
                <h3>SELECTED AFFILIATIONS.</h3>
            </div>
            <p>Organizations, publications, and creative teams that shaped how I lead, document, and build with others.</p>
        </header>

        <div class="affiliation-showcase__selector" role="tablist" aria-label="Affiliations">
            ${affiliations.map((item, index) => `
                <button class="affiliation-tab${index === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" data-affiliation="${item.id}">
                    <span>${item.number}</span>
                    <strong>${item.short}</strong>
                </button>
            `).join("")}
        </div>

        <article class="affiliation-panel" data-active="01" aria-live="polite">
            <div class="affiliation-panel__meta">
                <span data-affiliation-category>${affiliations[0].category}</span>
                <span data-affiliation-period>${affiliations[0].period}</span>
            </div>

            <div class="affiliation-panel__main">
                <div class="affiliation-panel__identity">
                    <span class="affiliation-panel__number" data-affiliation-number>${affiliations[0].number}</span>
                    <h4 data-affiliation-title>${affiliations[0].title}</h4>
                </div>
                <div class="affiliation-panel__copy">
                    <p class="affiliation-panel__institution" data-affiliation-institution>${affiliations[0].institution}</p>
                    <p data-affiliation-description>${affiliations[0].description}</p>
                </div>
            </div>

            <div class="affiliation-panel__roles" data-affiliation-roles>
                ${affiliations[0].roles.map(([role, date]) => `
                    <div><span>${date}</span><strong>${role}</strong></div>
                `).join("")}
            </div>
        </article>
    `;

    const panel = root.querySelector(".affiliation-panel");
    const tabs = [...root.querySelectorAll(".affiliation-tab")];
    const title = root.querySelector("[data-affiliation-title]");
    const number = root.querySelector("[data-affiliation-number]");
    const category = root.querySelector("[data-affiliation-category]");
    const period = root.querySelector("[data-affiliation-period]");
    const institution = root.querySelector("[data-affiliation-institution]");
    const description = root.querySelector("[data-affiliation-description]");
    const roles = root.querySelector("[data-affiliation-roles]");

    let activeId = affiliations[0].id;
    let timer = null;

    const render = (id) => {
        if (id === activeId) return;
        const item = affiliations.find((entry) => entry.id === id);
        if (!item) return;

        activeId = id;
        tabs.forEach((tab) => {
            const active = tab.dataset.affiliation === id;
            tab.classList.toggle("is-active", active);
            tab.setAttribute("aria-selected", active ? "true" : "false");
        });

        panel.classList.add("is-switching");
        clearTimeout(timer);
        timer = window.setTimeout(() => {
            panel.dataset.active = item.number;
            title.textContent = item.title;
            number.textContent = item.number;
            category.textContent = item.category;
            period.textContent = item.period;
            institution.textContent = item.institution;
            description.textContent = item.description;
            roles.innerHTML = item.roles.map(([role, date]) => `
                <div><span>${date}</span><strong>${role}</strong></div>
            `).join("");
            panel.classList.remove("is-switching");
            panel.classList.add("is-entering");
            window.setTimeout(() => panel.classList.remove("is-entering"), 420);
        }, 120);
    };

    tabs.forEach((tab) => {
        tab.addEventListener("mouseenter", () => render(tab.dataset.affiliation));
        tab.addEventListener("focus", () => render(tab.dataset.affiliation));
        tab.addEventListener("click", () => render(tab.dataset.affiliation));
    });

    root.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft"].includes(event.key)) return;
        const current = tabs.findIndex((tab) => tab.dataset.affiliation === activeId);
        const step = event.key === "ArrowRight" ? 1 : -1;
        const next = (current + step + tabs.length) % tabs.length;
        event.preventDefault();
        tabs[next].focus();
        render(tabs[next].dataset.affiliation);
    });

    if (window.PortfolioUI?.initReveal) window.PortfolioUI.initReveal(root);
})();