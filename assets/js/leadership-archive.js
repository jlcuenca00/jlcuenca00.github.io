(() => {
    if (!document.body.classList.contains('dev-page')) return;

    const root = document.querySelector('.dev-education .achievement-list');
    if (!root || root.dataset.archiveBuilt === 'true') return;

    root.dataset.archiveBuilt = 'true';
    root.classList.add('leadership-archive', 'leadership-archive--institutional');
    root.innerHTML = `
        <header class="leadership-archive__head leadership-archive__head--compact">
            <div>
                <span>LEADERSHIP / MEDIA</span>
                <h3>ORGANIZATIONS<br /><em>&amp; ROLES.</em></h3>
            </div>
            <p>Leadership, publication, and creative-team work grouped by the schools where each role belonged.</p>
        </header>

        <div class="institution-stack">
            <section class="institution-record institution-record--college" aria-labelledby="institution-college-title">
                <header class="institution-record__head">
                    <div class="institution-record__meta">
                        <span>01 / TERTIARY</span>
                        <span>2023–PRESENT</span>
                    </div>
                    <h4 id="institution-college-title">ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY</h4>
                    <p>Dumaguete City — campus leadership, creative organization work, and student publication.</p>
                </header>

                <div class="organization-records organization-records--college">
                    <article class="organization-record organization-record--primary">
                        <header>
                            <span>01A</span>
                            <div>
                                <p>CAMPUS CREATIVE ORGANIZATION</p>
                                <h5>ACCLAIMED</h5>
                            </div>
                        </header>
                        <div class="role-list">
                            <div class="role-line"><span>2025–2026</span><strong>Public Information Officer</strong></div>
                            <div class="role-line"><span>2024–2025</span><strong>President</strong></div>
                            <div class="role-line"><span>FOUNDING</span><strong>Founding Member</strong></div>
                        </div>
                    </article>

                    <article class="organization-record">
                        <header>
                            <span>01B</span>
                            <div>
                                <p>COLLEGE LEADERSHIP</p>
                                <h5>COLLEGE OF COMPUTER STUDIES AND ENGINEERING</h5>
                            </div>
                        </header>
                        <div class="role-list">
                            <div class="role-line"><span>2024–PRESENT</span><strong>Vice President</strong></div>
                            <div class="role-line"><span>2024–2025</span><strong>IT Treasurer</strong></div>
                        </div>
                    </article>

                    <article class="organization-record">
                        <header>
                            <span>01C</span>
                            <div>
                                <p>SCHOOL PAPER / VISUAL JOURNALISM</p>
                                <h5>ACER CHRONICLES</h5>
                            </div>
                        </header>
                        <div class="role-list">
                            <div class="role-line"><span>2024–PRESENT</span><strong>Photojournalist</strong></div>
                        </div>
                    </article>
                </div>
            </section>

            <section class="institution-record institution-record--secondary" aria-labelledby="institution-secondary-title">
                <header class="institution-record__head">
                    <div class="institution-record__meta">
                        <span>02 / SECONDARY</span>
                        <span>CREATIVE TEAMS</span>
                    </div>
                    <h4 id="institution-secondary-title">BCSTEC / SAINT AUGUSTINE</h4>
                    <p>Earlier creative-team work in video, photography, graphics, and event production.</p>
                </header>

                <div class="organization-records organization-records--secondary">
                    <article class="organization-record">
                        <header>
                            <span>02A</span>
                            <div>
                                <p>BCSTEC TECHNICAL WORKING GROUP</p>
                                <h5>TWG</h5>
                            </div>
                        </header>
                        <div class="role-list">
                            <div class="role-line"><span>2021–2023</span><strong>Creative Head</strong></div>
                            <div class="role-line"><span>FOUNDING</span><strong>Founding Member</strong><small>Video Editor / Photographer / Graphics Designer</small></div>
                        </div>
                    </article>

                    <article class="organization-record">
                        <header>
                            <span>02B</span>
                            <div>
                                <p>AUGUSTINIAN EVENTS MANAGEMENT TEAM</p>
                                <h5>AEMT</h5>
                            </div>
                        </header>
                        <div class="role-list">
                            <div class="role-line"><span>PIONEER</span><strong>Pioneer Member</strong><small>Video Editor / Photographer / Graphics Designer</small></div>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    `;

    if (window.PortfolioUI?.initReveal) window.PortfolioUI.initReveal(root);
})();