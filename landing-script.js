document.addEventListener("DOMContentLoaded", () => {
    const landing = document.querySelector(".landing");
    const paths = document.querySelectorAll(".path[href]");
    const year = document.querySelector("[data-current-year]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    initLandingCursor();

    if (!landing || prefersReducedMotion) return;

    paths.forEach((path) => {
        path.addEventListener("click", (event) => {
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const destination = path.href;
            if (!destination) return;

            event.preventDefault();
            path.classList.add("is-selected");
            landing.classList.add("is-leaving");

            window.setTimeout(() => {
                window.location.assign(destination);
            }, 180);
        });
    });
});

window.addEventListener("pageshow", () => {
    const landing = document.querySelector(".landing");
    if (!landing) return;

    landing.classList.remove("is-leaving");
    document.querySelectorAll(".path.is-selected").forEach((path) => {
        path.classList.remove("is-selected");
    });
});

function initLandingCursor() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const style = document.createElement("style");
    style.textContent = `
        body.portal-cursor-enabled,
        body.portal-cursor-enabled a,
        body.portal-cursor-enabled button {
            cursor: none !important;
        }

        .portal-cursor-aura,
        .portal-cursor-ring,
        .portal-cursor-dot,
        .portal-cursor-label {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            will-change: transform, opacity;
        }

        .portal-cursor-aura {
            width: 240px;
            height: 240px;
            margin: -120px 0 0 -120px;
            border-radius: 50%;
            background:
                radial-gradient(circle at 35% 50%, rgba(255, 31, 31, 0.2), transparent 42%),
                radial-gradient(circle at 65% 50%, rgba(31, 95, 255, 0.2), transparent 42%);
            filter: blur(12px);
            mix-blend-mode: screen;
            transition: opacity 160ms ease, background 220ms ease;
        }

        .portal-cursor-ring {
            width: 46px;
            height: 46px;
            margin: -23px 0 0 -23px;
            border: 1px solid rgba(255, 255, 255, 0.76);
            border-radius: 50%;
            box-shadow:
                -10px 0 24px rgba(255, 31, 31, 0.18),
                10px 0 24px rgba(31, 95, 255, 0.18);
            transition:
                width 220ms cubic-bezier(0.16, 1, 0.3, 1),
                height 220ms cubic-bezier(0.16, 1, 0.3, 1),
                margin 220ms cubic-bezier(0.16, 1, 0.3, 1),
                border-radius 220ms cubic-bezier(0.16, 1, 0.3, 1),
                border-color 180ms ease,
                background 180ms ease,
                box-shadow 180ms ease,
                opacity 120ms ease;
        }

        .portal-cursor-ring::before,
        .portal-cursor-ring::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            background: rgba(255, 255, 255, 0.44);
            transform: translate(-50%, -50%);
            transition: opacity 160ms ease, background 160ms ease;
        }

        .portal-cursor-ring::before {
            width: calc(100% + 14px);
            height: 1px;
            opacity: 0.35;
        }

        .portal-cursor-ring::after {
            width: 1px;
            height: calc(100% + 14px);
            opacity: 0.35;
        }

        .portal-cursor-dot {
            width: 6px;
            height: 6px;
            margin: -3px 0 0 -3px;
            border-radius: 50%;
            background: #fff;
            box-shadow:
                -4px 0 10px rgba(255, 31, 31, 0.95),
                4px 0 10px rgba(31, 95, 255, 0.95);
            transition: background 160ms ease, box-shadow 160ms ease, opacity 120ms ease;
        }

        .portal-cursor-label {
            margin: 33px 0 0 20px;
            color: rgba(255, 255, 255, 0.82);
            font-family: "JetBrains Mono", monospace;
            font-size: 0.54rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            white-space: nowrap;
            transition: color 160ms ease, opacity 160ms ease;
        }

        body.portal-cursor-visible .portal-cursor-aura,
        body.portal-cursor-visible .portal-cursor-ring,
        body.portal-cursor-visible .portal-cursor-dot,
        body.portal-cursor-visible .portal-cursor-label {
            opacity: 1;
        }

        body.portal-cursor-developer .portal-cursor-aura {
            background: radial-gradient(circle, rgba(255, 31, 31, 0.24), rgba(255, 31, 31, 0.06) 42%, transparent 72%);
        }

        body.portal-cursor-developer .portal-cursor-ring {
            width: 60px;
            height: 60px;
            margin: -30px 0 0 -30px;
            border-radius: 3px;
            border-color: #ff4a4a;
            background: rgba(255, 31, 31, 0.035);
            box-shadow: 0 0 26px rgba(255, 31, 31, 0.22);
        }

        body.portal-cursor-developer .portal-cursor-ring::before,
        body.portal-cursor-developer .portal-cursor-ring::after {
            background: rgba(255, 74, 74, 0.72);
            opacity: 1;
        }

        body.portal-cursor-developer .portal-cursor-dot {
            background: #ff1f1f;
            box-shadow: 0 0 14px rgba(255, 31, 31, 1);
        }

        body.portal-cursor-developer .portal-cursor-label {
            color: #ff7373;
        }

        body.portal-cursor-creator .portal-cursor-aura {
            background: radial-gradient(circle, rgba(31, 95, 255, 0.24), rgba(31, 95, 255, 0.06) 42%, transparent 72%);
        }

        body.portal-cursor-creator .portal-cursor-ring {
            width: 64px;
            height: 64px;
            margin: -32px 0 0 -32px;
            border-radius: 50%;
            border-color: rgba(255, 255, 255, 0.9);
            background:
                radial-gradient(circle, transparent 56%, rgba(31, 95, 255, 0.14) 58% 61%, transparent 63%);
            box-shadow:
                inset 0 0 18px rgba(31, 95, 255, 0.08),
                0 0 26px rgba(31, 95, 255, 0.24);
        }

        body.portal-cursor-creator .portal-cursor-ring::before {
            width: 10px;
            height: 1px;
            left: -1px;
            background: #5d88ff;
            opacity: 1;
            box-shadow: 56px 0 0 #5d88ff;
        }

        body.portal-cursor-creator .portal-cursor-ring::after {
            width: 1px;
            height: 10px;
            top: -1px;
            background: #5d88ff;
            opacity: 1;
            box-shadow: 0 56px 0 #5d88ff;
        }

        body.portal-cursor-creator .portal-cursor-dot {
            background: #1f5fff;
            box-shadow: 0 0 14px rgba(31, 95, 255, 1);
        }

        body.portal-cursor-creator .portal-cursor-label {
            color: #7da4ff;
        }
    `;
    document.head.appendChild(style);

    const aura = document.createElement("div");
    const ring = document.createElement("div");
    const dot = document.createElement("div");
    const label = document.createElement("div");

    aura.className = "portal-cursor-aura";
    ring.className = "portal-cursor-ring";
    dot.className = "portal-cursor-dot";
    label.className = "portal-cursor-label";
    label.textContent = "CHOOSE PATH";

    document.body.append(aura, ring, dot, label);

    let enabled = false;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let auraX = pointerX;
    let auraY = pointerY;
    let pressed = false;

    const enableForMouse = () => {
        if (enabled) return;
        enabled = true;
        document.body.classList.add("portal-cursor-enabled");
    };

    const setPressed = (value) => {
        pressed = value;
    };

    document.addEventListener("mousemove", (event) => {
        enableForMouse();

        pointerX = event.clientX;
        pointerY = event.clientY;

        dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
        label.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
        document.body.classList.add("portal-cursor-visible");

        const target = event.target instanceof Element ? event.target : null;
        const path = target?.closest(".path");
        const isDeveloper = Boolean(path?.classList.contains("path--developer"));
        const isCreator = Boolean(path?.classList.contains("path--creator"));

        document.body.classList.toggle("portal-cursor-developer", isDeveloper);
        document.body.classList.toggle("portal-cursor-creator", isCreator);

        if (isDeveloper) {
            label.textContent = "ENTER DEV";
        } else if (isCreator) {
            label.textContent = "ENTER CREATOR";
        } else {
            label.textContent = "CHOOSE PATH";
        }
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", () => {
        setPressed(false);
        document.body.classList.remove(
            "portal-cursor-visible",
            "portal-cursor-developer",
            "portal-cursor-creator"
        );
    });

    document.addEventListener("mousedown", () => setPressed(true));
    document.addEventListener("mouseup", () => setPressed(false));
    window.addEventListener("blur", () => setPressed(false));

    const render = () => {
        ringX += (pointerX - ringX) * 0.22;
        ringY += (pointerY - ringY) * 0.22;
        auraX += (pointerX - auraX) * 0.085;
        auraY += (pointerY - auraY) * 0.085;

        const pressScale = pressed ? 0.86 : 1;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${pressScale})`;
        aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;

        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
}
