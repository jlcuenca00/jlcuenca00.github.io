(() => {
    if (!document.body.classList.contains('dev-page')) return;

    const root = document.querySelector('.dev-education .achievement-list');
    if (!root || root.dataset.archiveBuilt === 'true') return;

    root.dataset.archiveBuilt = 'true';
    root.className = 'achievement-list leadership-ledger';
    root.innerHTML = `
        <header class="leadership-ledger__intro">
            <div>
                <span>LEADERSHIP / MEDIA</span>
                <h3>ROLES OUTSIDE<br /><em>THE CLASSROOM.</em></h3>
            </div>
            <p>Campus leadership, publication work, and creative-team experience — organized as a record instead of a wall of cards.</p>
        </header>

        <div class="leadership-ledger__chapters">
            <section class="leadership-chapter" aria-labelledby="leadership-college-title">
                <aside class="leadership-chapter__rail">
                    <span class="leadership-chapter__index">01 / TERTIARY</span>
                    <h4 id="leadership-college-title">ASIAN COLLEGE</h4>
                    <p>Asian College of Science and Technology — Dumaguete City.</p>
                    <span class="leadership-chapter__range">2023–PRESENT</span>
                </aside>

                <div class="leadership-records" role="list">
                    <div class="leadership-record" role="listitem">
                        <span class="leadership-record__org">ACCLAIMED</span>
                        <strong>Public Information Officer</strong>
                        <span class="leadership-record__date">2025–2026</span>
                    </div>
                    <div class="leadership-record" role="listitem">
                        <span class="leadership-record__org">ACCLAIMED</span>
                        <strong>President</strong>
                        <span class="leadership-record__date">2024–2025</span>
                    </div>
                    <div class="leadership-record" role="listitem">
                        <span class="leadership-record__org">ACCLAIMED</span>
                        <strong>Founding Member</strong>
                        <span class="leadership-record__date">FOUNDING</span>
                    </div>
                    <div class="leadership-record" role="listitem">
                        <span class="leadership-record__org">COLLEGE OF COMPUTER STUDIES &amp; ENGINEERING</span>
                        <strong>Vice President</strong>
                        <span class="leadership-record__date">2024–PRESENT</span>
                    </div>
                    <div class="leadership-record" role="listitem">
                        <span class="leadership-record__org">COLLEGE OF COMPUTER STUDIES &amp; ENGINEERING</span>
                        <strong>IT Treasurer</strong>
                        <span class="leadership-record__date">2024–2025</span>
                    </div>
                    <div class="leadership-record" role="listitem">
                        <span class="leadership-record__org">ACER CHRONICLES / SCHOOL PAPER</span>
                        <strong>Photojournalist</strong>
                        <span class="leadership-record__date">2024–PRESENT</span>
                    </div>
                </div>
            </section>

            <section class="leadership-chapter" aria-labelledby="leadership-secondary-title">
                <aside class="leadership-chapter__rail">
                    <span class="leadership-chapter__index">02 / SECONDARY</span>
                    <h4 id="leadership-secondary-title">CREATIVE TEAMS</h4>
                    <p>BCSTEC Technical Working Group and Augustinian Events Management Team.</p>
                    <span class="leadership-chapter__range">2017–2023</span>
                </aside>

                <div class="leadership-records" role="list">
                    <div class="leadership-record" role="listitem">
                        <span class="leadership-record__org">BCSTEC / TWG</span>
                        <strong>Creative Head</strong>
                        <span class="leadership-record__date">2021–2023</span>
                        <small>Video Editor / Photographer / Graphics Designer</small>
                    </div>
                    <div class="leadership-record" role="listitem">
                        <span class="leadership-record__org">BCSTEC / TWG</span>
                        <strong>Founding Member</strong>
                        <span class="leadership-record__date">FOUNDING</span>
                        <small>Video Editor / Photographer / Graphics Designer</small>
                    </div>
                    <div class="leadership-record" role="listitem">
                        <span class="leadership-record__org">SAINT AUGUSTINE / AEMT</span>
                        <strong>Pioneer Member</strong>
                        <span class="leadership-record__date">PIONEER</span>
                        <small>Video Editor / Photographer / Graphics Designer</small>
                    </div>
                </div>
            </section>
        </div>
    `;

    if (window.PortfolioUI?.initReveal) window.PortfolioUI.initReveal(root);
})();