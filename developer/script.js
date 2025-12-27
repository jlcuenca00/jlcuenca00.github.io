document.addEventListener("DOMContentLoaded", () => {
    // --- SCROLL REVEAL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    // --- SMOOTH SCROLL FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    // --- BACK TO TOP BUTTON LOGIC ---
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

/* =========================================
   COMMAND CENTER LOGIC
   ========================================= */

const terminalData = {
    whoami: `USER: Jake Cuenca
ROLE: Full Stack Developer
LOC: Philippines
STATUS: Seeking new challenges...
--------------------------------
BIO: Third-year IT student specializing in scalable web architecture and visual storytelling.`,

    stack: `[LOADED MODULES]
> Frontend: React, HTML5, CSS3
> Backend: Node.js, PHP, Python
> Database: MySQL
> Tools: Git, VS Code, Figma`,

    history: `[TIMELINE]
2023: Initial Commit (Python Logic)
2024: Web Dev Protocols (HTML/CSS)
2025: System Upgrade (Full Stack Integration)`,

    clear: "CLEAR",
};

function runCmd(cmd) {
    const output = document.getElementById("term-output");

    // 1. Remove ANY existing cursors from previous commands
    const existingCursors = output.querySelectorAll(".cursor");
    existingCursors.forEach((cursor) => cursor.remove());

    // 2. Handle Clear Command
    if (cmd === "clear") {
        output.innerHTML = `
            <div class="term-line system-msg"><span class="prompt">>></span> TERMINAL PURGED.</div>
            <div class="term-line system-msg"><span class="prompt">>></span> SYSTEM_READY...</div>
        `;
        return;
    }

    // 3. Create Command Line
    const cmdLine = document.createElement("div");
    cmdLine.className = "term-line";
    cmdLine.innerHTML = `<span class="prompt">root@jake:~$</span> <span class="cmd-input">${cmd}.exe</span>`;
    output.appendChild(cmdLine);

    // 4. Create Response Block
    const respLine = document.createElement("div");
    respLine.className = "response";
    output.appendChild(respLine);

    // 5. Scroll to bottom
    output.scrollTop = output.scrollHeight;

    // 6. Typewriter Effect
    const content = terminalData[cmd];
    let i = 0;

    function typeWriter() {
        if (i < content.length) {
            respLine.textContent += content.charAt(i);
            i++;
            output.scrollTop = output.scrollHeight;
            setTimeout(typeWriter, 10);
        } else {
            // Only add cursor when typing is done
            respLine.innerHTML += '<span class="cursor">█</span>';
        }
    }

    typeWriter();
}
