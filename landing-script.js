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
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

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
            z-index: 5000;
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
                radial-gradient(circle at 34% 50%, rgba(255, 31, 31, 0.15), transparent 42%),
                radial-gradient(circle at 66% 50%, rgba(31, 95, 255, 0.15), transparent 42%);
            filter: blur(10px);
            mix-blend-mode: screen;
            transition: opacity 180ms ease, background 260ms ease;
        }

        .portal-cursor-ring {
            width: 48px;
            height: 48px;
            margin: -24px 0 0 -24px;
            border: 1px solid rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            background:
                conic-gradient(
                    from 90deg,
                    rgba(31, 95, 255, 0.95) 0 24%,
                    transparent 24% 49%,
                    rgba(255, 31, 31, 0.95) 49% 74%,
                    transparent 74% 100%
                );
            -webkit-mask: radial-gradient(circle, transparent 0 76%, #000 78% 84%, transparent 86%);
            mask: radial-gradient(circle, transparent 0 76%, #000 78% 84%, transparent 86%);
            filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.14));
            transition:
                width 220ms cubic-bezier(0.16, 1, 0.3, 1),
                height 220ms cubic-bezier(0.16, 1, 0.3, 1),
                margin 220ms cubic-bezier(0.16, 1, 0.3, 1),
                border-radius 220ms cubic-bezier(0.16, 1, 0.3, 1),
                border-color 180ms ease,
                background 220ms ease,
                filter 180ms ease,
                opacity 120ms ease;
        }

        .portal-cursor-ring::before,
        .portal-cursor-ring::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            background: rgba(255, 255, 255, 0.42);
            opacity: 0;
            transition: opacity 160ms ease;
        }

        .portal-cursor-ring::before {
            width: calc(100% + 14px);
            height: 1px;
            transform: translate(-50%, -50%);
        }

        .portal-cursor-ring::after {
            width: 1px;
            height: calc(100% + 14px);
            transform: translate(-50%, -50%);
        }

        .portal-cursor-dot {
            width: 5px;
            height: 5px;
            margin: -2.5px 0 0 -2.5px;
            border-radius: 50%;
            background: #fff;
            box-shadow:
                -3px 0 9px rgba(255, 31, 31, 0.8),
                3px 0 9px rgba(31, 95, 255, 0.8);
            transition: background 160ms ease, box-shadow 160ms ease, opacity 120ms ease;
        }

        .portal-cursor-label {
            margin: 34px 0 0 18px;
            color: rgba(255, 255, 255, 0.8);
            font-family: "JetBrains Mono", monospace;
            font-size: 0.52rem;
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
            background: radial-gradient(circle, rgba(255, 31, 31, 0.2), rgba(255, 31, 31, 0.05) 40%, transparent 70%);
        }

        body.portal-cursor-developer .portal-cursor-ring {
            width: 58px;
            height: 58px;
            margin: -29px 0 0 -29px;
            border-radius: 4px;
            border-color: rgba(255, 31, 31, 0.9);
            background: linear-gradient(135deg, rgba(255, 31, 31, 0.12), transparent 52%);
            -webkit-mask: none;
            mask: none;
            filter: drop-shadow(0 0 18px rgba(255, 31, 31, 0.22));
        }

        body.portal-cursor-developer .portal-cursor-ring::before,
        body.portal-cursor-developer .portal-cursor-ring::after {
            opacity: 1;
        }

        body.portal-cursor-developer .portal-cursor-dot {
            background: #ff1f1f;
            box-shadow: 0 0 12px rgba(255, 31, 31, 0.95);
        }

        body.portal-cursor-developer .portal-cursor-label {
            color: #ff6a6a;
        }

        body.portal-cursor-creator .portal-cursor-aura {
            background: radial-gradient(circle, rgba(31, 95, 255, 0.2), rgba(31, 95, 255, 0.05) 40%, transparent 70%);
        }

        body.portal-cursor-creator .portal-cursor-ring {
            width: 62px;
            height: 62px;
            margin: -31px 0 0 -31px;
            border-radius: 50%;
            border-color: rgba(255, 255, 255, 0.82);
            background:
                conic-gradient(
                    #1f5fff 0 5deg,
                    transparent 5deg 85deg,
                    #1f5fff 85deg 95deg,
                    transparent 95deg 175deg,
                    #1f5fff 175deg 185deg,
                    transparent 185deg 265deg,
                    #1f5fff 265deg 275deg,
                    transparent 275deg 355deg,
                    #1f5fff 355deg 360deg
                );
            -webkit-mask: radial-gradient(circle, transparent 0 69%, #000 71% 76%, transparent 78%);
            mask: radial-gradient(circle, transparent 0 69%, #000 71% 76%, transparent 78%);
            filter: drop-shadow(0 0 18px rgba(31, 95, 255, 0.24));
        }

        body.portal-cursor-creator .portal-cursor-dot {
            background: #1f5fff;
            box-shadow: 0 0 12px rgba(31, 95, 255, 0.95);
        }

        body.portal-cursor-creator .portal-cursor-label {
            color: #72a0ff;
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
    document.body.classList.add("portal-cursor-enabled");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let auraX = pointerX;
    let auraY = pointerY;

    document.addEventListener("pointermove", (event) => {
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
        document.body.classList.remove(
            "portal-cursor-visible",
            "portal-cursor-developer",
            "portal-cursor-creator"
        );
    });

    document.addEventListener("pointerdown", () => {
        ring.style.scale = "0.86";
    });

    document.addEventListener("pointerup", () => {
        ring.style.scale = "1";
    });

    const render = () => {
        ringX += (pointerX - ringX) * 0.22;
        ringY += (pointerY - ringY) * 0.22;
        auraX += (pointerX - auraX) * 0.085;
        auraY += (pointerY - auraY) * 0.085;

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;

        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
}
