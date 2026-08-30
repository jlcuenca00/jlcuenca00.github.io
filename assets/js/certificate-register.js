(() => {
    if (!document.body.classList.contains("dev-page")) return;

    const section = document.querySelector(".dev-certificates");
    const grid = section?.querySelector(".certificate-grid");
    if (!section || !grid || grid.dataset.registerBuilt === "true") return;

    const heading = section.querySelector(".section-title h2");
    const description = section.querySelector(".section-title > p");
    const meta = section.querySelector(".section-meta span:last-child");

    if (heading) heading.innerHTML = "CREDENTIAL<br /><span>REGISTER.</span>";
    if (description) description.textContent = "Selected certifications and training records. Open the original issued PDF or verify supported credentials at the issuer.";
    if (meta) meta.textContent = "ORIGINAL PDF ARCHIVE / VERIFIED + EXPANDABLE";

    grid.dataset.registerBuilt = "true";
    grid.className = "credential-register reveal is-visible";
    grid.innerHTML = `
        <div class="credential-register__bar" aria-hidden="true">
            <span>04 FILES</span>
            <span>02 ISSUERS / SIMPLILEARN + FREECODECAMP</span>
            <span>ORIGINAL PDF / NEW TAB</span>
        </div>

        <article class="credential-record">
            <span class="credential-record__no">01</span>
            <div class="credential-record__main">
                <span>SIMPLILEARN SKILLUP / DATABASE</span>
                <h3>INTRODUCTION TO SQL</h3>
            </div>
            <div class="credential-record__meta">
                <span>29 APR 2024</span>
                <span>CODE / 5095970</span>
            </div>
            <div class="credential-record__actions">
                <a class="credential-record__action" href="assets/certificates/intro-sql.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open original Introduction to SQL certificate PDF in a new tab">OPEN CERTIFICATE <b>↗</b></a>
            </div>
        </article>

        <article class="credential-record">
            <span class="credential-record__no">02</span>
            <div class="credential-record__main">
                <span>SIMPLILEARN SKILLUP / WEB + BACKEND</span>
                <h3>INTRODUCTION TO PHP</h3>
            </div>
            <div class="credential-record__meta">
                <span>30 APR 2024</span>
                <span>CODE / 5100892</span>
            </div>
            <div class="credential-record__actions">
                <a class="credential-record__action" href="assets/certificates/intro-php.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open original Introduction to PHP certificate PDF in a new tab">OPEN CERTIFICATE <b>↗</b></a>
            </div>
        </article>

        <article class="credential-record credential-record--featured">
            <span class="credential-record__no">03</span>
            <div class="credential-record__main">
                <span>FREECODECAMP / DEVELOPER CERTIFICATION / ~300 HOURS</span>
                <h3>FRONT-END DEVELOPMENT LIBRARIES V8</h3>
            </div>
            <div class="credential-record__meta">
                <span>18 MAY 2025</span>
                <span>DEVELOPER CERTIFICATION</span>
            </div>
            <div class="credential-record__actions">
                <a class="credential-record__action" href="assets/certificates/freecodecamp-front-end-libraries.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open original Front-End Development Libraries V8 certificate PDF in a new tab">OPEN CERTIFICATE <b>↗</b></a>
                <a class="credential-record__verify" href="https://freecodecamp.org/certification/gojooo/front-end-development-libraries" target="_blank" rel="noopener noreferrer">VERIFY ↗</a>
            </div>
        </article>

        <article class="credential-record credential-record--featured">
            <span class="credential-record__no">04</span>
            <div class="credential-record__main">
                <span>FREECODECAMP / DEVELOPER CERTIFICATION / ~300 HOURS</span>
                <h3>LEGACY RESPONSIVE WEB DESIGN V8</h3>
            </div>
            <div class="credential-record__meta">
                <span>11 FEB 2025</span>
                <span>DEVELOPER CERTIFICATION</span>
            </div>
            <div class="credential-record__actions">
                <a class="credential-record__action" href="assets/certificates/freecodecamp-responsive-web-design.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open original Legacy Responsive Web Design V8 certificate PDF in a new tab">OPEN CERTIFICATE <b>↗</b></a>
                <a class="credential-record__verify" href="https://freecodecamp.org/certification/gojooo/responsive-web-design" target="_blank" rel="noopener noreferrer">VERIFY ↗</a>
            </div>
        </article>

        <div class="credential-record credential-record--future" aria-label="Space reserved for future credentials">
            <span class="credential-record__no">05+</span>
            <div class="credential-record__main">
                <span>ARCHIVE / EXPANDABLE</span>
                <h3>MORE CREDENTIALS</h3>
            </div>
            <div class="credential-record__meta">
                <span>READY FOR UPLOAD</span>
                <span>FUTURE RECORDS</span>
            </div>
            <span class="credential-record__action">COMING NEXT</span>
        </div>
    `;

    if (window.PortfolioUI?.initReveal) window.PortfolioUI.initReveal(grid);
})();