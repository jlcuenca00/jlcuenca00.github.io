(() => {
    if (!document.body.classList.contains("dev-page")) return;

    const section = document.querySelector(".dev-certificates");
    const grid = section?.querySelector(".certificate-grid");
    if (!section || !grid || grid.dataset.registerBuilt === "true") return;

    const heading = section.querySelector(".section-title h2");
    const description = section.querySelector(".section-title > p");
    const meta = section.querySelector(".section-meta span:last-child");

    if (heading) heading.innerHTML = "CERTIFICATE<br /><span>FOLIO.</span>";
    if (description) description.textContent = "Selected certifications presented as a credential folio. Open any card to view the original issued PDF.";
    if (meta) meta.textContent = "04 ORIGINAL PDF RECORDS / 02 ISSUERS";

    grid.dataset.registerBuilt = "true";
    grid.className = "credential-folio reveal is-visible";
    grid.innerHTML = `
        <article class="credential-card" data-issuer="SIMPLILEARN">
            <a class="credential-card__paper" href="assets/certificates/intro-sql.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open original Introduction to SQL certificate PDF in a new tab">
                <div class="credential-card__corner credential-card__corner--tl"></div>
                <div class="credential-card__corner credential-card__corner--br"></div>
                <header>
                    <span>01 / CERTIFICATE OF COMPLETION</span>
                    <strong>SIMPLILEARN SKILLUP</strong>
                </header>
                <div class="credential-card__body">
                    <span>THIS CERTIFIES THE COMPLETION OF</span>
                    <h3>INTRODUCTION<br />TO SQL</h3>
                    <p>JAKE KEVIN KLAIR L. CUENCA</p>
                </div>
                <footer>
                    <div><span>ISSUED</span><strong>29 APR 2024</strong></div>
                    <div><span>CODE</span><strong>5095970</strong></div>
                    <div class="credential-card__seal"><span>01</span></div>
                </footer>
            </a>
            <div class="credential-card__actions"><a href="assets/certificates/intro-sql.pdf" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL PDF ↗</a></div>
        </article>

        <article class="credential-card" data-issuer="SIMPLILEARN">
            <a class="credential-card__paper" href="assets/certificates/intro-php.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open original Introduction to PHP certificate PDF in a new tab">
                <div class="credential-card__corner credential-card__corner--tl"></div>
                <div class="credential-card__corner credential-card__corner--br"></div>
                <header>
                    <span>02 / CERTIFICATE OF COMPLETION</span>
                    <strong>SIMPLILEARN SKILLUP</strong>
                </header>
                <div class="credential-card__body">
                    <span>THIS CERTIFIES THE COMPLETION OF</span>
                    <h3>INTRODUCTION<br />TO PHP</h3>
                    <p>JAKE KEVIN KLAIR L. CUENCA</p>
                </div>
                <footer>
                    <div><span>ISSUED</span><strong>30 APR 2024</strong></div>
                    <div><span>CODE</span><strong>5100892</strong></div>
                    <div class="credential-card__seal"><span>02</span></div>
                </footer>
            </a>
            <div class="credential-card__actions"><a href="assets/certificates/intro-php.pdf" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL PDF ↗</a></div>
        </article>

        <article class="credential-card credential-card--featured" data-issuer="FREECODECAMP">
            <a class="credential-card__paper" href="assets/certificates/freecodecamp-front-end-libraries.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open original Front-End Development Libraries V8 certificate PDF in a new tab">
                <div class="credential-card__corner credential-card__corner--tl"></div>
                <div class="credential-card__corner credential-card__corner--br"></div>
                <header>
                    <span>03 / DEVELOPER CERTIFICATION</span>
                    <strong>FREECODECAMP</strong>
                </header>
                <div class="credential-card__body">
                    <span>APPROXIMATELY 300 HOURS OF WORK</span>
                    <h3>FRONT-END DEVELOPMENT<br />LIBRARIES V8</h3>
                    <p>JAKE KEVIN KLAIR L. CUENCA</p>
                </div>
                <footer>
                    <div><span>ISSUED</span><strong>18 MAY 2025</strong></div>
                    <div><span>TYPE</span><strong>DEVELOPER CERTIFICATION</strong></div>
                    <div class="credential-card__seal"><span>03</span></div>
                </footer>
            </a>
            <div class="credential-card__actions">
                <a href="assets/certificates/freecodecamp-front-end-libraries.pdf" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL PDF ↗</a>
                <a href="https://freecodecamp.org/certification/gojooo/front-end-development-libraries" target="_blank" rel="noopener noreferrer">VERIFY ↗</a>
            </div>
        </article>

        <article class="credential-card credential-card--featured" data-issuer="FREECODECAMP">
            <a class="credential-card__paper" href="assets/certificates/freecodecamp-responsive-web-design.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open original Legacy Responsive Web Design V8 certificate PDF in a new tab">
                <div class="credential-card__corner credential-card__corner--tl"></div>
                <div class="credential-card__corner credential-card__corner--br"></div>
                <header>
                    <span>04 / DEVELOPER CERTIFICATION</span>
                    <strong>FREECODECAMP</strong>
                </header>
                <div class="credential-card__body">
                    <span>APPROXIMATELY 300 HOURS OF WORK</span>
                    <h3>LEGACY RESPONSIVE<br />WEB DESIGN V8</h3>
                    <p>JAKE KEVIN KLAIR L. CUENCA</p>
                </div>
                <footer>
                    <div><span>ISSUED</span><strong>11 FEB 2025</strong></div>
                    <div><span>TYPE</span><strong>DEVELOPER CERTIFICATION</strong></div>
                    <div class="credential-card__seal"><span>04</span></div>
                </footer>
            </a>
            <div class="credential-card__actions">
                <a href="assets/certificates/freecodecamp-responsive-web-design.pdf" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL PDF ↗</a>
                <a href="https://freecodecamp.org/certification/gojooo/responsive-web-design" target="_blank" rel="noopener noreferrer">VERIFY ↗</a>
            </div>
        </article>

        <div class="credential-card credential-card--future" aria-label="Space reserved for future credentials">
            <div class="credential-card__paper">
                <header><span>05+ / ARCHIVE</span><strong>FUTURE CREDENTIAL</strong></header>
                <div class="credential-card__body"><span>EXPANDABLE RECORD</span><h3>MORE<br />CERTIFICATES</h3><p>READY FOR THE NEXT UPLOAD</p></div>
                <footer><div><span>STATUS</span><strong>OPEN SLOT</strong></div><div class="credential-card__seal"><span>+</span></div></footer>
            </div>
        </div>
    `;

    if (window.PortfolioUI?.initReveal) window.PortfolioUI.initReveal(grid);
})();