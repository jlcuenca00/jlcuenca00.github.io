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
            roles: [
                ["PHOTOJOURNALIST", "2024–PRESENT"],
            ],
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
    root.className = "achievement-list affiliation-scene";
    root.innerHTML = `
        <header class="affiliation-scene__intro">
            <div>
                <span>LEADERSHIP / MEDIA</span>
                <h3>AFFILIATION INDEX.</h3>
            </div>
            <p>Five organizations. Move through the index to inspect the role history attached to each one.</p>
        </header>

        <div class="affiliation-experience" data-active="01">
            <nav class="affiliation-index" aria-label="Leadership and media affiliations">
                ${affiliations.map((item, index) => `
                    <button class="affiliation-index__item${index === 0 ? " is-active" : ""}" type="button" data-affiliation="${item.id}" aria-pressed="${index === 0 ? "true" : "false"}">
                        <span>${item.number}</span>
                        <strong>${item.short}</strong>
                        <i>↗</i>
                    </button>
                `).join("")}
            </nav>

            <article class="affiliation-stage" aria-live="polite">
                <div class="affiliation-stage__scan" aria-hidden="true"></div>
                <div class="affiliation-stage__topline">
                    <span data-affiliation-category>${affiliations[0].category}</span>
                    <span data-affiliation-period>${affiliations[0].period}</span>
                </div>
                <div class="affiliation-stage__identity">
                    <span class="affiliation-stage__number" data-affiliation-number>${affiliations[0].number}</span>
                    <h4 data-affiliation-title>${affiliations[0].title}</h4>
                </div>
                <div class="affiliation-stage__context">
                    <p data-affiliation-institution>${affiliations[0].institution}</p>
                    <p data-affiliation-description>${affiliations[0].description}</p>
                </div>
                <div class="affiliation-stage__roles" data-affiliation-roles>
                    ${affiliations[0].roles.map(([role, date]) => `
                        <div><strong>${role}</strong><span>${date}</span></div>
                    `).join("")}
                </div>
            </article>
        </div>
    `;

    const experience = root.querySelector(".affiliation-experience");
    const stage = root.querySelector(".affiliation-stage");
    const buttons = [...root.querySelectorAll(".affiliation-index__item")];
    const title = root.querySelector("[data-affiliation-title]");
    const number = root.querySelector("[data-affiliation-number]");
    const category = root.querySelector("[data-affiliation-category]");
    const period = root.querySelector("[data-affiliation-period]");
    const institution = root.querySelector("[data-affiliation-institution]");
    const description = root.querySelector("[data-affiliation-description]");
    const roles = root.querySelector("[data-affiliation-roles]");

    let activeId = affiliations[0].id;
    let transitionTimer = null;

    const render = (id, focus = false) => {
        if (id === activeId && !focus) return;
        const item = affiliations.find((entry) => entry.id === id);
        if (!item) return;

        activeId = id;
        buttons.forEach((button) => {
            const active = button.dataset.affiliation === id;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
        });

        stage.classList.remove("is-resolving");
        stage.classList.add("is-changing");
        clearTimeout(transitionTimer);

        window.setTimeout(() => {
            experience.dataset.active = item.number;
            title.textContent = item.title;
            number.textContent = item.number;
            category.textContent = item.category;
            period.textContent = item.period;
            institution.textContent = item.institution;
            description.textContent = item.description;
            roles.innerHTML = item.roles.map(([role, date]) => `
                <div><strong>${role}</strong><span>${date}</span></div>
            `).join("");

            stage.classList.remove("is-changing");
            stage.classList.add("is-resolving");
            transitionTimer = window.setTimeout(() => stage.classList.remove("is-resolving"), 480);
        }, 150);
    };

    buttons.forEach((button) => {
        const activate = () => render(button.dataset.affiliation);
        button.addEventListener("mouseenter", activate);
        button.addEventListener("focus", activate);
        button.addEventListener("click", activate);
    });

    root.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
        const current = buttons.findIndex((button) => button.dataset.affiliation === activeId);
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const next = (current + direction + buttons.length) % buttons.length;
        event.preventDefault();
        buttons[next].focus();
        render(buttons[next].dataset.affiliation, true);
    });

    if (window.PortfolioUI?.initReveal) window.PortfolioUI.initReveal(root);
})();