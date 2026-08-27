document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    initLightbox();

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
