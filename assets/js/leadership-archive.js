(() => {
    if (!document.body.classList.contains('dev-page')) return;

    const root = document.querySelector('.dev-education .achievement-list');
    if (!root || root.dataset.archiveBuilt === 'true') return;

    root.dataset.archiveBuilt = 'true';
    root.className = 'achievement-list leadership-index';
    root.innerHTML = `
        <header class="leadership-index__intro">
            <div>
                <span>LEADERSHIP / MEDIA</span>
                <h3>ROLES OUTSIDE THE CLASSROOM.</h3>
            </div>
            <p>A compact record of campus leadership, publication work, and creative-team experience.</p>
        </header>

        <div class="leadership-index__groups">
            <section class="leadership-index__group" aria-labelledby="leadership-tertiary-title">
                <header class="leadership-index__group-head">
                    <span>01 / TERTIARY</span>
                    <h4 id="leadership-tertiary-title">ASIAN COLLEGE OF SCIENCE AND TECHNOLOGY — DUMAGUETE CITY</h4>
                    <span>2023–PRESENT</span>
                </header>

                <div class="leadership-index__rows" role="list">
                    <div class="leadership-index__row" role="listitem"><span class="leadership-index__no">01.1</span><span class="leadership-index__org">ACCLAIMED</span><strong>Public Information Officer</strong><span class="leadership-index__date">2025–2026</span></div>
                    <div class="leadership-index__row" role="listitem"><span class="leadership-index__no">01.2</span><span class="leadership-index__org">ACCLAIMED</span><strong>President</strong><span class="leadership-index__date">2024–2025</span></div>
                    <div class="leadership-index__row" role="listitem"><span class="leadership-index__no">01.3</span><span class="leadership-index__org">ACCLAIMED</span><strong>Founding Member</strong><span class="leadership-index__date">FOUNDING</span></div>
                    <div class="leadership-index__row" role="listitem"><span class="leadership-index__no">01.4</span><span class="leadership-index__org">COLLEGE OF COMPUTER STUDIES &amp; ENGINEERING</span><strong>Vice President</strong><span class="leadership-index__date">2024–PRESENT</span></div>
                    <div class="leadership-index__row" role="listitem"><span class="leadership-index__no">01.5</span><span class="leadership-index__org">COLLEGE OF COMPUTER STUDIES &amp; ENGINEERING</span><strong>IT Treasurer</strong><span class="leadership-index__date">2024–2025</span></div>
                    <div class="leadership-index__row" role="listitem"><span class="leadership-index__no">01.6</span><span class="leadership-index__org">ACER CHRONICLES / SCHOOL PAPER</span><strong>Photojournalist</strong><span class="leadership-index__date">2024–PRESENT</span></div>
                </div>
            </section>

            <section class="leadership-index__group" aria-labelledby="leadership-secondary-title">
                <header class="leadership-index__group-head">
                    <span>02 / SECONDARY</span>
                    <h4 id="leadership-secondary-title">CREATIVE TEAMS — BCSTEC / SAINT AUGUSTINE</h4>
                    <span>2017–2023</span>
                </header>

                <div class="leadership-index__rows" role="list">
                    <div class="leadership-index__row leadership-index__row--detail" role="listitem"><span class="leadership-index__no">02.1</span><span class="leadership-index__org">BCSTEC / TWG</span><strong>Creative Head</strong><span class="leadership-index__date">2021–2023</span><small>Video Editor / Photographer / Graphics Designer</small></div>
                    <div class="leadership-index__row leadership-index__row--detail" role="listitem"><span class="leadership-index__no">02.2</span><span class="leadership-index__org">BCSTEC / TWG</span><strong>Founding Member</strong><span class="leadership-index__date">FOUNDING</span><small>Video Editor / Photographer / Graphics Designer</small></div>
                    <div class="leadership-index__row leadership-index__row--detail" role="listitem"><span class="leadership-index__no">02.3</span><span class="leadership-index__org">SAINT AUGUSTINE / AEMT</span><strong>Pioneer Member</strong><span class="leadership-index__date">PIONEER</span><small>Video Editor / Photographer / Graphics Designer</small></div>
                </div>
            </section>
        </div>
    `;

    if (window.PortfolioUI?.initReveal) window.PortfolioUI.initReveal(root);
})();