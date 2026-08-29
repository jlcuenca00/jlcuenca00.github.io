(() => {
    if (!document.body.classList.contains('dev-page')) return;

    const root = document.querySelector('.dev-education .achievement-list');
    if (!root || root.dataset.archiveBuilt === 'true') return;

    root.dataset.archiveBuilt = 'true';
    root.classList.add('leadership-archive');
    root.innerHTML = `
        <header class="leadership-archive__head">
            <div>
                <span>LEADERSHIP / MEDIA</span>
                <h3>ORGANIZATIONS<br /><em>&amp; ROLES.</em></h3>
            </div>
            <p>Grouped by the organizations and creative teams where the work actually happened.</p>
        </header>

        <div class="leadership-archive__grid">
            <article class="leadership-group leadership-group--feature" data-org="acclaimed">
                <header class="leadership-group__head">
                    <span class="leadership-group__index">01</span>
                    <div>
                        <p>CAMPUS CREATIVE ORGANIZATION / PRIMARY AFFILIATION</p>
                        <h4>ACCLAIMED</h4>
                    </div>
                    <span class="leadership-group__range">FOUNDING → 2026</span>
                </header>
                <div class="leadership-roles">
                    <div class="leadership-role"><span>2025–2026</span><strong>PUBLIC INFORMATION OFFICER</strong></div>
                    <div class="leadership-role"><span>2024–2025</span><strong>PRESIDENT</strong></div>
                    <div class="leadership-role"><span>FOUNDING</span><strong>FOUNDING MEMBER</strong></div>
                </div>
            </article>

            <article class="leadership-group leadership-group--college" data-org="ccse">
                <header class="leadership-group__head">
                    <span class="leadership-group__index">02</span>
                    <div>
                        <p>COLLEGE LEADERSHIP</p>
                        <h4>COLLEGE OF COMPUTER STUDIES<br />AND ENGINEERING</h4>
                    </div>
                </header>
                <div class="leadership-roles">
                    <div class="leadership-role"><span>2024–PRESENT</span><strong>VICE PRESIDENT</strong></div>
                    <div class="leadership-role"><span>2024–2025</span><strong>IT TREASURER</strong></div>
                </div>
            </article>

            <article class="leadership-group leadership-group--publication" data-org="acer">
                <header class="leadership-group__head">
                    <span class="leadership-group__index">03</span>
                    <div>
                        <p>PUBLICATION / VISUAL JOURNALISM</p>
                        <h4>ACER<br />CHRONICLES</h4>
                    </div>
                </header>
                <div class="leadership-roles">
                    <div class="leadership-role"><span>2024–PRESENT</span><strong>PHOTOJOURNALIST</strong></div>
                </div>
            </article>

            <article class="leadership-group leadership-group--creative" data-org="creative-teams">
                <header class="leadership-group__head">
                    <span class="leadership-group__index">04</span>
                    <div>
                        <p>SECONDARY SCHOOL CREATIVE TEAMS</p>
                        <h4>BCSTEC / AEMT</h4>
                    </div>
                    <span class="leadership-group__range">VIDEO / PHOTO / GRAPHICS</span>
                </header>
                <div class="leadership-roles leadership-roles--three">
                    <div class="leadership-role"><span>2021–2023</span><strong>CREATIVE HEAD — TWG</strong><small>Technical Working Group of BCSTEC</small></div>
                    <div class="leadership-role"><span>FOUNDING</span><strong>FOUNDING MEMBER — TWG</strong><small>Video Editor / Photographer / Graphics Designer</small></div>
                    <div class="leadership-role"><span>PIONEER</span><strong>PIONEER MEMBER — AEMT</strong><small>Video Editor / Photographer / Graphics Designer</small></div>
                </div>
            </article>
        </div>
    `;

    if (window.PortfolioUI?.initReveal) window.PortfolioUI.initReveal(root);
})();