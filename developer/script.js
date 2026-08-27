document.addEventListener("DOMContentLoaded", () => {
    const rows = [...document.querySelectorAll(".project-row[data-project]")];
    const preview = document.querySelector(".preview-window");
    const title = document.getElementById("preview-title");
    const subtitle = document.getElementById("preview-subtitle");
    const stack = document.getElementById("preview-stack");
    const year = document.getElementById("preview-year");

    document.querySelectorAll("[data-current-year]").forEach((node) => {
        node.textContent = new Date().getFullYear();
    });

    initDeveloperCursor();

    if (!rows.length || !preview || !title || !subtitle || !stack || !year) return;

    const activate = (row) => {
        rows.forEach((item) => item.classList.toggle("is-active", item === row));

        preview.dataset.preview = row.dataset.project || "dar";
        title.textContent = row.dataset.title || "SELECTED PROJECT";
        subtitle.textContent = row.dataset.subtitle || "Project preview";
        stack.textContent = row.dataset.stack || "";
        year.textContent = row.dataset.year || "";

        const number = preview.querySelector(".preview-visual strong");
        const rowNumber = row.querySelector(".project-no");
        if (number && rowNumber) number.textContent = rowNumber.textContent;
    };

    rows.forEach((row) => {
        row.addEventListener("mouseenter", () => activate(row));
        row.addEventListener("focus", () => activate(row));
    });
});

function initDeveloperCursor() {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

    const style = document.createElement("style");
    style.textContent = `
        .dev-page.dev-cursor-enabled,
        .dev-page.dev-cursor-enabled a,
        .dev-page.dev-cursor-enabled button {
            cursor: none !important;
        }

        .dev-cursor-glow,
        .dev-cursor-frame,
        .dev-cursor-dot {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 5000;
            pointer-events: none;
            opacity: 0;
            will-change: transform, opacity;
        }

        .dev-cursor-glow {
            width: 210px;
            height: 210px;
            margin: -105px 0 0 -105px;
            border-radius: 50%;
            background:
                linear-gradient(rgba(255, 42, 42, 0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 42, 42, 0.07) 1px, transparent 1px),
                radial-gradient(circle, rgba(255, 42, 42, 0.12), rgba(255, 42, 42, 0.03) 36%, transparent 68%);
            background-size: 18px 18px, 18px 18px, auto;
            mask-image: radial-gradient(circle, #000 0 42%, transparent 72%);
            -webkit-mask-image: radial-gradient(circle, #000 0 42%, transparent 72%);
            mix-blend-mode: screen;
            transition: opacity 160ms ease;
        }

        .dev-cursor-frame {
            width: 34px;
            height: 34px;
            margin: -17px 0 0 -17px;
            border: 1px solid rgba(255, 42, 42, 0.8);
            box-shadow: 0 0 22px rgba(255, 42, 42, 0.16);
            transition:
                width 180ms cubic-bezier(0.16, 1, 0.3, 1),
                height 180ms cubic-bezier(0.16, 1, 0.3, 1),
                margin 180ms cubic-bezier(0.16, 1, 0.3, 1),
                border-color 180ms ease,
                background 180ms ease,
                opacity 120ms ease;
        }

        .dev-cursor-frame::before,
        .dev-cursor-frame::after {
            content: "";
            position: absolute;
            background: rgba(255, 42, 42, 0.68);
        }

        .dev-cursor-frame::before {
            top: 50%;
            left: -8px;
            width: calc(100% + 16px);
            height: 1px;
        }

        .dev-cursor-frame::after {
            top: -8px;
            left: 50%;
            width: 1px;
            height: calc(100% + 16px);
        }

        .dev-cursor-dot {
            width: 5px;
            height: 5px;
            margin: -2.5px 0 0 -2.5px;
            background: #ff2a2a;
            box-shadow: 0 0 12px rgba(255, 42, 42, 0.9);
            transition: opacity 120ms ease, transform 80ms ease;
        }

        .dev-cursor-enabled.dev-cursor-visible .dev-cursor-glow,
        .dev-cursor-enabled.dev-cursor-visible .dev-cursor-frame,
        .dev-cursor-enabled.dev-cursor-visible .dev-cursor-dot {
            opacity: 1;
        }

        .dev-cursor-enabled.dev-cursor-active .dev-cursor-frame {
            width: 54px;
            height: 54px;
            margin: -27px 0 0 -27px;
            border-color: rgba(255, 255, 255, 0.78);
            background: rgba(255, 42, 42, 0.045);
        }

        .dev-cursor-enabled.dev-cursor-project .dev-cursor-frame {
            width: 72px;
            height: 72px;
            margin: -36px 0 0 -36px;
            border-color: #ff2a2a;
            background:
                linear-gradient(135deg, rgba(255, 42, 42, 0.09), transparent 48%);
        }

        .dev-cursor-enabled.dev-cursor-project .dev-cursor-frame::before,
        .dev-cursor-enabled.dev-cursor-project .dev-cursor-frame::after {
            background: rgba(255, 255, 255, 0.52);
        }

        .dev-cursor-enabled.dev-cursor-project .dev-cursor-dot {
            transform: scale(0.55);
        }
    `;
    document.head.appendChild(style);

    const glow = document.createElement("div");
    const frame = document.createElement("div");
    const dot = document.createElement("div");
    glow.className = "dev-cursor-glow";
    frame.className = "dev-cursor-frame";
    dot.className = "dev-cursor-dot";
    document.body.append(glow, frame, dot);
    document.body.classList.add("dev-cursor-enabled");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let frameX = pointerX;
    let frameY = pointerY;
    let glowX = pointerX;
    let glowY = pointerY;

    const interactiveSelector = "a, button, [role='button']";

    document.addEventListener("pointermove", (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
        document.body.classList.add("dev-cursor-visible");

        const target = event.target instanceof Element ? event.target : null;
        document.body.classList.toggle("dev-cursor-active", Boolean(target?.closest(interactiveSelector)));
        document.body.classList.toggle("dev-cursor-project", Boolean(target?.closest(".project-row")));
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", () => {
        document.body.classList.remove("dev-cursor-visible", "dev-cursor-active", "dev-cursor-project");
    });

    document.addEventListener("pointerdown", () => frame.style.scale = "0.86");
    document.addEventListener("pointerup", () => frame.style.scale = "1");

    const render = () => {
        frameX += (pointerX - frameX) * 0.24;
        frameY += (pointerY - frameY) * 0.24;
        glowX += (pointerX - glowX) * 0.095;
        glowY += (pointerY - glowY) * 0.095;

        frame.style.transform = `translate3d(${frameX}px, ${frameY}px, 0)`;
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
}
