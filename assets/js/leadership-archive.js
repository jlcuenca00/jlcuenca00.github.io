(() => {
    if (!document.body.classList.contains('dev-page')) return;

    const root = document.querySelector('.dev-education .achievement-list');
    if (!root || root.dataset.archiveBuilt === 'true') return;

    root.dataset.archiveBuilt = 'true';
    root.className = 'achievement-list leadership-cards';
    root.innerHTML = `
        <header class="leadership-cards__intro">
            <div>
                <span>LEADERSHIP / MEDIA</span>
                <h3>SELECTED ROLES.</h3>
            </div>
            <p>Campus leadership, publication work, and creative-team experience grouped by institution.</p>
        </header>

        <div class="leadership-cards__stack">
            <section class="institution-card institution-card--college" aria-labelledby="leadership-college-card-title">
                <header class="institution-card__head">
                    <div>
                        <span>01 / TERTIARY</span>
                        <h4 id="leadership-college-card-title">ASIAN COLLEGE</h4>
                        <p>Asian College of Science and Technology — Dumaguete City</p>
                    </div>
                    <span class="institution-card__range">2023–PRESENT</span>
                </header>

                <div class="organization-cards organization-cards--three">
                    <article class="organization-card organization-card--accent">
                        <header>
                            <span>01A / CAMPUS CREATIVE ORGANIZATION</span>
                            <h5>ACCLAIMED</h5>
                        </header>
                        <div class="organization-card__roles">
                            <div class="organization-role"><strong>Public Information Officer</strong><span>2025–2026</span></div>
                            <div class="organization-role"><strong>President</strong><span>2024–2025</span></div>
                            <div class="organization-role"><strong>Founding Member</strong><span>FOUNDING</span></div>
                        </div>
                    </article>

                    <article class="organization-card">
                        <header>
                            <span>01B / COLLEGE LEADERSHIP</span>
                            <h5>CCSE</h5>
                            <p>College of Computer Studies and Engineering</p>
                        </header>
                        <div class="organization-card__roles">
                            <div class="organization-role"><strong>Vice President</strong><span>2024–PRESENT</span></div>
                            <div class="organization-role"><strong>IT Treasurer</strong><span>2024–2025</span></div>
                        </div>
                    </article>

                    <article class="organization-card">
                        <header>
                            <span>01C / SCHOOL PAPER</span>
                            <h5>ACER CHRONICLES</h5>
                            <p>Visual journalism / student publication</p>
                        </header>
                        <div class="organization-card__roles">
                            <div class="organization-role"><strong>Photojournalist</strong><span>2024–PRESENT</span></div>
                        </div>
                    </article>
                </div>
            </section>

            <section class="institution-card institution-card--secondary" aria-labelledby="leadership-secondary-card-title">
                <header class="institution-card__head">
                    <div>
                        <span>02 / SECONDARY</span>
                        <h4 id="leadership-secondary-card-title">CREATIVE TEAMS</h4>
                        <p>Video, photography, graphics, and event-production experience.</p>
                    </div>
                    <span class="institution-card__range">2017–2023</span>
                </header>

                <div class="organization-cards organization-cards--two">
                    <article class="organization-card">
                        <header>
                            <span>02A / BCSTEC</span>
                            <h5>TECHNICAL WORKING GROUP</h5>
                            <p>TWG</p>
                        </header>
                        <div class="organization-card__roles">
                            <div class="organization-role organization-role--detail"><strong>Creative Head</strong><span>2021–2023</span><small>Video Editor / Photographer / Graphics Designer</small></div>
                            <div class="organization-role organization-role--detail"><strong>Founding Member</strong><span>FOUNDING</span><small>Video Editor / Photographer / Graphics Designer</small></div>
                        </div>
                    </article>

                    <article class="organization-card">
                        <header>
                            <span>02B / SAINT AUGUSTINE</span>
                            <h5>AEMT</h5>
                            <p>Augustinian Events Management Team</p>
                        </header>
                        <div class="organization-card__roles">
                            <div class="organization-role organization-role--detail"><strong>Pioneer Member</strong><span>PIONEER</span><small>Video Editor / Photographer / Graphics Designer</small></div>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    `;

    if (window.PortfolioUI?.initReveal) window.PortfolioUI.initReveal(root);
})();