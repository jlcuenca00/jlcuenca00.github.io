(() => {
    if (!document.body.classList.contains("dev-page")) return;

    const section = document.querySelector(".dev-certificates");
    const grid = section?.querySelector(".certificate-grid");
    if (!section || !grid || grid.dataset.registerBuilt === "true") return;

    const certificates = {
        sql: {
            number: "01",
            title: "Introduction to SQL",
            issuer: "Simplilearn SkillUp",
            category: "DATABASE / FOUNDATIONS",
            date: "29 APR 2024",
            certificateCode: "5095970",
        },
        php: {
            number: "02",
            title: "Introduction to PHP",
            issuer: "Simplilearn SkillUp",
            category: "WEB / BACKEND FOUNDATIONS",
            date: "30 APR 2024",
            certificateCode: "5100892",
        },
    };

    const heading = section.querySelector(".section-title h2");
    const description = section.querySelector(".section-title > p");
    const meta = section.querySelector(".section-meta span:last-child");

    if (heading) heading.innerHTML = "CREDENTIAL<br /><span>REGISTER.</span>";
    if (description) description.textContent = "Verified training records. Open any credential to inspect the certificate as a PDF.";
    if (meta) meta.textContent = "PDF ARCHIVE / CURRENT + FUTURE";

    grid.dataset.registerBuilt = "true";
    grid.className = "credential-register reveal is-visible";
    grid.innerHTML = `
        <div class="credential-register__bar" aria-hidden="true">
            <span>02 FILES</span>
            <span>SIMPLILEARN SKILLUP</span>
            <span>PDF / OPEN IN NEW TAB</span>
        </div>

        <a class="credential-record" href="#" data-certificate="sql" aria-label="Open Introduction to SQL certificate PDF in a new tab">
            <span class="credential-record__no">01</span>
            <div class="credential-record__main">
                <span>SIMPLILEARN SKILLUP / DATABASE</span>
                <h3>INTRODUCTION TO SQL</h3>
            </div>
            <div class="credential-record__meta">
                <span>29 APR 2024</span>
                <span>CODE / 5095970</span>
            </div>
            <span class="credential-record__action">OPEN PDF <b>↗</b></span>
        </a>

        <a class="credential-record" href="#" data-certificate="php" aria-label="Open Introduction to PHP certificate PDF in a new tab">
            <span class="credential-record__no">02</span>
            <div class="credential-record__main">
                <span>SIMPLILEARN SKILLUP / WEB + BACKEND</span>
                <h3>INTRODUCTION TO PHP</h3>
            </div>
            <div class="credential-record__meta">
                <span>30 APR 2024</span>
                <span>CODE / 5100892</span>
            </div>
            <span class="credential-record__action">OPEN PDF <b>↗</b></span>
        </a>

        <div class="credential-record credential-record--future" aria-label="Space reserved for future credentials">
            <span class="credential-record__no">03+</span>
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

    function escapePdfText(value) {
        return String(value)
            .replace(/\\/g, "\\\\")
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)")
            .replace(/[^\x20-\x7E]/g, "-");
    }

    function pdfText(font, size, x, y, text, color = "0.18 0.18 0.18") {
        return `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm (${escapePdfText(text)}) Tj ET\n`;
    }

    function circlePath(cx, cy, r) {
        const k = r * 0.5522847498;
        return [
            `${cx + r} ${cy} m`,
            `${cx + r} ${cy + k} ${cx + k} ${cy + r} ${cx} ${cy + r} c`,
            `${cx - k} ${cy + r} ${cx - r} ${cy + k} ${cx - r} ${cy} c`,
            `${cx - r} ${cy - k} ${cx - k} ${cy - r} ${cx} ${cy - r} c`,
            `${cx + k} ${cy - r} ${cx + r} ${cy - k} ${cx + r} ${cy} c`,
        ].join("\n");
    }

    function buildCertificatePdf(data) {
        const content = [];
        content.push("q\n");
        content.push("1 1 1 rg 0 0 842 595 re f\n");

        // Outer frame and graphic accents.
        content.push("0.025 0.14 0.29 RG 14 w 12 12 818 571 re S\n");
        content.push("0.96 0.65 0.07 rg 40 548 300 5 re f\n");
        content.push("0.02 0.14 0.28 rg 615 28 175 540 re f\n");
        content.push("0.96 0.65 0.07 RG 2 w 607 28 m 607 568 l S 798 28 m 798 568 l S\n");
        content.push("0.02 0.63 0.84 rg 14 195 26 62 re f\n");
        content.push("0.98 0.69 0.08 rg 14 133 26 62 re f\n");
        content.push("0.02 0.63 0.84 rg 802 76 26 62 re f\n");
        content.push("0.98 0.69 0.08 rg 802 138 26 62 re f\n");

        // Brand + certificate hierarchy.
        content.push(pdfText("F2", 23, 78, 508, "simplilearn", "0.95 0.58 0.07"));
        content.push(pdfText("F2", 25, 205, 508, "SkillUp", "0.02 0.45 0.72"));
        content.push(pdfText("F1", 24, 78, 425, "CERTIFICATE OF", "0.23 0.23 0.23"));
        content.push(pdfText("F1", 47, 78, 370, "COMPLETION", "0.21 0.21 0.21"));

        content.push(pdfText("F1", 30, 78, 292, "Jake Kevin L. Cuenca", "0.13 0.13 0.13"));
        content.push("0.35 0.35 0.35 RG 0.8 w 78 280 m 516 280 l S\n");
        content.push(pdfText("F1", 13, 78, 248, "has successfully completed the online course:", "0.36 0.36 0.36"));
        content.push(pdfText("F2", 20, 78, 216, data.title, "0.12 0.12 0.12"));

        content.push(pdfText("F1", 12, 78, 168, "This professional has demonstrated initiative and a", "0.39 0.39 0.39"));
        content.push(pdfText("F1", 12, 78, 149, "commitment to deepening their skills and advancing", "0.39 0.39 0.39"));
        content.push(pdfText("F1", 12, 78, 130, "their career. Well done!", "0.39 0.39 0.39"));

        content.push(pdfText("F2", 12, 78, 78, data.date, "0.18 0.18 0.18"));
        content.push(pdfText("F1", 11, 78, 56, `Certificate code : ${data.certificateCode}`, "0.18 0.18 0.18"));
        content.push(pdfText("F1", 11, 468, 72, "Krishna Kumar", "0.37 0.37 0.37"));
        content.push(pdfText("F1", 10, 468, 54, "CEO, Simplilearn", "0.37 0.37 0.37"));

        // Seal on the right banner.
        content.push("0.98 0.69 0.08 rg\n");
        content.push(circlePath(700, 145, 64));
        content.push("f\n");
        content.push("1 1 1 rg\n");
        content.push(circlePath(700, 145, 48));
        content.push("f\n");
        content.push("0.025 0.14 0.29 RG 5 w\n");
        content.push(circlePath(700, 145, 41));
        content.push("S\n");
        content.push(pdfText("F2", 14, 674, 150, "SKILL", "0.02 0.14 0.28"));
        content.push(pdfText("F2", 14, 681, 132, "UP", "0.02 0.45 0.72"));
        content.push("Q\n");

        const stream = content.join("");
        const objects = [
            "<< /Type /Catalog /Pages 2 0 R >>",
            "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
            `<< /Length ${stream.length} >>\nstream\n${stream}endstream`,
        ];

        let pdf = "%PDF-1.4\n%PORTFOLIO-CERTIFICATE\n";
        const offsets = [0];
        objects.forEach((body, index) => {
            offsets.push(pdf.length);
            pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
        });

        const xref = pdf.length;
        pdf += `xref\n0 ${objects.length + 1}\n`;
        pdf += "0000000000 65535 f \n";
        offsets.slice(1).forEach((offset) => {
            pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
        });
        pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
        return pdf;
    }

    function openCertificatePdf(key) {
        const data = certificates[key];
        if (!data) return;

        const pdf = buildCertificatePdf(data);
        const blob = new Blob([new TextEncoder().encode(pdf)], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const opened = window.open(url, "_blank", "noopener,noreferrer");

        if (!opened) {
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.click();
        }

        window.setTimeout(() => URL.revokeObjectURL(url), 120000);
    }

    grid.querySelectorAll("[data-certificate]").forEach((record) => {
        record.addEventListener("click", (event) => {
            event.preventDefault();
            openCertificatePdf(record.dataset.certificate);
        });
    });
})();