document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".side");
    const loader = document.getElementById("fullscreen-loader");

    // Developer Elements
    const termBox = document.querySelector(".terminal-box");
    const cmdOutput = document.getElementById("cmd-output");
    const accessMsg = document.querySelector(".access-granted");
    const matrixRain = document.querySelector(".matrix-rain");

    // Creator Elements
    const shutter = document.querySelector(".shutter-iris");
    const flash = document.querySelector(".camera-flash");
    const lensText = document.querySelector(".lens-text");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = link.getAttribute("href");
            const isDeveloper = link.classList.contains("left");

            // 1. ACTIVATE LOADER
            loader.classList.add("active");

            if (isDeveloper) {
                // === DEVELOPER MODE: SYSTEM BREACH ===
                loader.classList.add("mode-dev");
                termBox.style.display = "block";
                matrixRain.style.display = "block";

                // Fill Matrix Rain with Random Hex
                let rainHTML = "";
                for (let i = 0; i < 400; i++) {
                    rainHTML +=
                        Math.floor(Math.random() * 16777215).toString(16) + " ";
                }
                matrixRain.innerText = rainHTML;

                // Start Shake & Alarm
                loader.classList.add("breach-alert");
                termBox.classList.add("shake");

                // Fast Terminal Typing
                let lines = [
                    "> INITIALIZING FORCE_ENTRY...",
                    "> BYPASSING FIREWALL [ROOT]...",
                    "> DECRYPTING KEYS...",
                    "> OVERRIDE SUCCESSFUL.",
                ];

                let delay = 0;
                lines.forEach((line, index) => {
                    setTimeout(() => {
                        cmdOutput.innerHTML += `<div class="cmd-line">${line}</div>`;
                    }, delay);
                    delay += 150; // Very fast typing
                });

                // ACCESS GRANTED FLASH
                setTimeout(() => {
                    termBox.classList.remove("shake");
                    loader.classList.remove("breach-alert");
                    accessMsg.style.display = "block";
                }, 800);
            } else {
                // === CREATOR MODE: STUDIO FLASH ===
                loader.classList.add("mode-creator");
                shutter.style.display = "block";

                // 1. TRIGGER FLASHBANG
                flash.classList.add("flash-bang");

                // 2. SNAP SHUTTER (Tiny delay to sync with flash peak)
                setTimeout(() => {
                    shutter.classList.add("shutter-snap");
                }, 100);

                // 3. SHOW TEXT "CAPTURED"
                setTimeout(() => {
                    lensText.classList.add("focused");
                }, 400);
            }

            // 2. NAVIGATE
            setTimeout(() => {
                window.location.href = href;
            }, 1800);
        });
    });
});
