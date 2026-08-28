document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    initLightbox();
    initCreatorCursor();

    document.querySelectorAll("[data-current-year]").forEach((node) => {
        node.textContent = new Date().getFullYear();
    });

    if (window.PortfolioUI) {
        window.PortfolioUI.initReveal();
    }
});

const photos = [
    { src: "https://live.staticflickr.com/65535/55019831164_97561930b2_b.jpg", alt: "Selected photograph 01" },
    { src: "https://live.staticflickr.com/65535/55019790263_a1e4b36140_b.jpg", alt: "Selected photograph 02" },
    { src: "https://live.staticflickr.com/65535/55019882270_d0fd60ed47_b.jpg", alt: "Selected photograph 03" },
    { src: "https://live.staticflickr.com/65535/55018648587_2157726175_b.jpg", alt: "Selected photograph 04" },
    { src: "https://live.staticflickr.com/65535/55019747288_0946be6844_b.jpg", alt: "Selected photograph 05" },
    { src: "https://live.staticflickr.com/65535/55019564886_12c4f83e2e_b.jpg", alt: "Selected photograph 06" },
    { src: "https://live.staticflickr.com/65535/55018684772_83fed20bca_b.jpg", alt: "Selected photograph 07" },
    { src: "https://live.staticflickr.com/65535/55019831214_2db986e39d_b.jpg", alt: "Selected photograph 08" },
    { src: "https://live.staticflickr.com/65535/55019608466_260405af16_b.jpg", alt: "Selected photograph 09" },
    { src: "https://live.staticflickr.com/65535/55019831159_0c3c87342a_b.jpg", alt: "Selected photograph 10" },
    { src: "https://live.staticflickr.com/65535/55019926420_e353939ec9_b.jpg", alt: "Selected photograph 11" },
    { src: "https://live.staticflickr.com/65535/55019609351_faa7e9edc9_b.jpg", alt: "Selected photograph 12" },
    { src: "https://live.staticflickr.com/65535/55018727342_1c973a3c64_b.jpg", alt: "Selected photograph 13" },
    { src: "https://live.staticflickr.com/65535/55019606561_97c3d7f33c_b.jpg", alt: "Selected photograph 14" },
    { src: "https://live.staticflickr.com/65535/55019564846_6d17bc5256_b.jpg", alt: "Selected photograph 15" },
    { src: "https://live.staticflickr.com/65535/55018684897_445fd4ea70_b.jpg", alt: "Selected photograph 16" },
    { src: "https://live.staticflickr.com/65535/55043524967_611a4dcc90_b.jpg", alt: "Selected photograph 17" },
    { src: "https://live.staticflickr.com/65535/55044684869_1a33ef9035_b.jpg", alt: "Selected photograph 18" },
    { src: "https://live.staticflickr.com/65535/55044684914_dc507dddde_b.jpg", alt: "Selected photograph 19" },
    { src: "https://live.staticflickr.com/65535/55044685184_893a6b55e6_b.jpg", alt: "Lonely television street photograph" },
    { src: "https://live.staticflickr.com/65535/55044603288_31d34eb1bf_b.jpg", alt: "Bawal umihi street photograph" },
    { src: "https://live.staticflickr.com/65535/55043525272_885576db9a_b.jpg", alt: "Checkers street photograph" },
    { src: "https://live.staticflickr.com/65535/55044421176_b0403f0075_b.jpg", alt: "Time bike street photograph" },
    { src: "https://live.staticflickr.com/65535/55044685484_ca67210eaa_b.jpg", alt: "DMW street photograph" },
    { src: "https://live.staticflickr.com/65535/55044420416_17be62686f_b.jpg", alt: "Ghosted street photograph" },
];

const layoutPattern = [
    "wide", "tall", "", "", "wide", "", "", "full", "tall", "", "", "wide",
    "", "", "wide", "full", "", "tall", "", "", "wide", "", "", "wide", "full",
];

let activeIndex = 0;
let lastFocusedElement = null;

function renderGallery() {
    const container = document.getElementById("photo-container");
    if (!container) return;

    const fragment = document.createDocumentFragment();

    photos.forEach((photo, index) => {
        const button = document.createElement("button");
        const variant = layoutPattern[index] || "";

        button.type = "button";
        button.className = `gallery-frame reveal${variant ? ` gallery-frame--${variant}` : ""}`;
        button.dataset.index = String(index + 1).padStart(2, "0");
        button.setAttribute("aria-label", `Open ${photo.alt}`);
        button.addEventListener("click", () => openLightbox(index));

        const image = document.createElement("img");
        image.src = photo.src;
        image.alt = photo.alt;
        image.loading = index < 3 ? "eager" : "lazy";
        image.decoding = "async";

        button.appendChild(image);
        fragment.appendChild(button);
    });

    container.appendChild(fragment);
}

function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const close = document.getElementById("close-lightbox");
    const previous = document.getElementById("prev-lightbox");
    const next = document.getElementById("next-lightbox");

    if (!lightbox || !close || !previous || !next) return;

    close.addEventListener("click", closeLightbox);
    previous.addEventListener("click", () => showPhoto(activeIndex - 1));
    next.addEventListener("click", () => showPhoto(activeIndex + 1));

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showPhoto(activeIndex - 1);
        if (event.key === "ArrowRight") showPhoto(activeIndex + 1);
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById("lightbox");
    const close = document.getElementById("close-lightbox");
    if (!lightbox) return;

    lastFocusedElement = document.activeElement;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    showPhoto(index);
    if (close) close.focus();
}

function showPhoto(index) {
    const image = document.getElementById("lightbox-img");
    const count = document.getElementById("lightbox-count");
    const text = document.getElementById("lightbox-text");
    if (!image || !count || !text || !photos.length) return;

    activeIndex = (index + photos.length) % photos.length;
    const photo = photos[activeIndex];

    image.src = photo.src;
    image.alt = photo.alt;
    count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
    text.textContent = photo.alt;
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightbox-img");
    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

    window.setTimeout(() => {
        if (image) {
            image.src = "";
            image.alt = "";
        }
    }, 220);

    if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
    }

    lastFocusedElement = null;
}

function initCreatorCursor() {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

    const style = document.createElement("style");
    style.textContent = `
        .photography-page.creator-cursor-enabled,
        .photography-page.creator-cursor-enabled a,
        .photography-page.creator-cursor-enabled button {
            cursor: none !important;
        }

        .creator-cursor-light,
        .creator-cursor-ring,
        .creator-cursor-dot {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 5000;
            pointer-events: none;
            opacity: 0;
            will-change: transform, opacity;
        }

        .creator-cursor-light {
            width: 250px;
            height: 250px;
            margin: -125px 0 0 -125px;
            border-radius: 50%;
            background: radial-gradient(
                circle,
                rgba(47, 103, 255, 0.16) 0%,
                rgba(47, 103, 255, 0.075) 28%,
                rgba(47, 103, 255, 0.025) 48%,
                transparent 70%
            );
            filter: blur(8px);
            mix-blend-mode: screen;
            transition: opacity 180ms ease;
        }

        .creator-cursor-ring {
            width: 42px;
            height: 42px;
            margin: -21px 0 0 -21px;
            border: 1px solid rgba(255, 255, 255, 0.72);
            border-radius: 50%;
            box-shadow:
                inset 0 0 0 1px rgba(47, 103, 255, 0.12),
                0 0 26px rgba(47, 103, 255, 0.16);
            transition:
                width 240ms cubic-bezier(0.16, 1, 0.3, 1),
                height 240ms cubic-bezier(0.16, 1, 0.3, 1),
                margin 240ms cubic-bezier(0.16, 1, 0.3, 1),
                border-color 180ms ease,
                background 180ms ease,
                opacity 120ms ease;
        }

        .creator-cursor-ring::before,
        .creator-cursor-ring::after {
            content: "";
            position: absolute;
            inset: -5px;
            border-radius: 50%;
            pointer-events: none;
        }

        .creator-cursor-ring::before {
            background: conic-gradient(
                from 0deg,
                #2f67ff 0 3deg,
                transparent 3deg 87deg,
                #2f67ff 87deg 93deg,
                transparent 93deg 177deg,
                #2f67ff 177deg 183deg,
                transparent 183deg 267deg,
                #2f67ff 267deg 273deg,
                transparent 273deg 357deg,
                #2f67ff 357deg 360deg
            );
            -webkit-mask: radial-gradient(circle, transparent 0 62%, #000 64% 69%, transparent 71%);
            mask: radial-gradient(circle, transparent 0 62%, #000 64% 69%, transparent 71%);
            opacity: 0.72;
        }

        .creator-cursor-ring::after {
            content: "VIEW";
            inset: 50% auto auto 50%;
            width: auto;
            height: auto;
            color: #fff;
            font-family: "JetBrains Mono", monospace;
            font-size: 0.55rem;
            letter-spacing: 0.14em;
            opacity: 0;
            transform: translate(-47%, -50%);
            transition: opacity 160ms ease;
        }

        .creator-cursor-dot {
            width: 4px;
            height: 4px;
            margin: -2px 0 0 -2px;
            border-radius: 50%;
            background: #2f67ff;
            box-shadow: 0 0 12px rgba(47, 103, 255, 0.95);
            transition: opacity 120ms ease;
        }

        .creator-cursor-enabled.creator-cursor-visible .creator-cursor-light,
        .creator-cursor-enabled.creator-cursor-visible .creator-cursor-ring,
        .creator-cursor-enabled.creator-cursor-visible .creator-cursor-dot {
            opacity: 1;
        }

        .creator-cursor-enabled.creator-cursor-active .creator-cursor-ring {
            width: 56px;
            height: 56px;
            margin: -28px 0 0 -28px;
            border-color: rgba(47, 103, 255, 0.92);
            background: rgba(47, 103, 255, 0.04);
        }

        .creator-cursor-enabled.creator-cursor-gallery .creator-cursor-ring {
            width: 76px;
            height: 76px;
            margin: -38px 0 0 -38px;
            border-color: rgba(255, 255, 255, 0.88);
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
        }

        .creator-cursor-enabled.creator-cursor-gallery .creator-cursor-ring::after {
            opacity: 1;
        }

        .creator-cursor-enabled.creator-cursor-gallery .creator-cursor-dot {
            opacity: 0;
        }

        .creator-cursor-enabled.creator-cursor-gallery .creator-cursor-light {
            opacity: 0.72;
        }

        .creator-cursor-enabled.creator-cursor-lightbox .creator-cursor-light {
            opacity: 0.25;
        }
    `;
    document.head.appendChild(style);

    const light = document.createElement("div");
    const ring = document.createElement("div");
    const dot = document.createElement("div");
    light.className = "creator-cursor-light";
    ring.className = "creator-cursor-ring";
    dot.className = "creator-cursor-dot";
    document.body.append(light, ring, dot);
    document.body.classList.add("creator-cursor-enabled");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let lightX = pointerX;
    let lightY = pointerY;
    let pressed = false;

    const interactiveSelector = "a, button, [role='button']";

    document.addEventListener("pointermove", (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
        document.body.classList.add("creator-cursor-visible");

        const target = event.target instanceof Element ? event.target : null;
        document.body.classList.toggle("creator-cursor-active", Boolean(target?.closest(interactiveSelector)));
        document.body.classList.toggle("creator-cursor-gallery", Boolean(target?.closest(".gallery-frame")));
        document.body.classList.toggle("creator-cursor-lightbox", Boolean(target?.closest(".lightbox.active")));
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", () => {
        pressed = false;
        document.body.classList.remove(
            "creator-cursor-visible",
            "creator-cursor-active",
            "creator-cursor-gallery",
            "creator-cursor-lightbox"
        );
    });

    document.addEventListener("pointerdown", () => { pressed = true; });
    document.addEventListener("pointerup", () => { pressed = false; });
    document.addEventListener("pointercancel", () => { pressed = false; });
    window.addEventListener("blur", () => { pressed = false; });

    const render = () => {
        ringX += (pointerX - ringX) * 0.2;
        ringY += (pointerY - ringY) * 0.2;
        lightX += (pointerX - lightX) * 0.07;
        lightY += (pointerY - lightY) * 0.07;

        const pressScale = pressed ? 0.9 : 1;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${pressScale})`;
        light.style.transform = `translate3d(${lightX}px, ${lightY}px, 0)`;
        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
}
