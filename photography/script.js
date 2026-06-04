document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    initLightbox();
    initGalleryTabs();

    if (window.PortfolioUI) {
        window.PortfolioUI.initReveal();
    }
});

const photos = [
    {
        src: "https://live.staticflickr.com/65535/55019831164_97561930b2_b.jpg",
        alt: "Portfolio photograph 1",
    },
    {
        src: "https://live.staticflickr.com/65535/55019790263_a1e4b36140_b.jpg",
        alt: "Portfolio photograph 2",
    },
    {
        src: "https://live.staticflickr.com/65535/55019882270_d0fd60ed47_b.jpg",
        alt: "Portfolio photograph 3",
    },
    {
        src: "https://live.staticflickr.com/65535/55018648587_2157726175_b.jpg",
        alt: "Portfolio photograph 4",
    },
    {
        src: "https://live.staticflickr.com/65535/55019747288_0946be6844_b.jpg",
        alt: "Portfolio photograph 5",
    },
    {
        src: "https://live.staticflickr.com/65535/55019564886_12c4f83e2e_b.jpg",
        alt: "Portfolio photograph 6",
    },
    {
        src: "https://live.staticflickr.com/65535/55018684772_83fed20bca_b.jpg",
        alt: "Portfolio photograph 7",
    },
    {
        src: "https://live.staticflickr.com/65535/55019831214_2db986e39d_b.jpg",
        alt: "Portfolio photograph 8",
    },
    {
        src: "https://live.staticflickr.com/65535/55019608466_260405af16_b.jpg",
        alt: "Portfolio photograph 9",
    },
    {
        src: "https://live.staticflickr.com/65535/55019831159_0c3c87342a_b.jpg",
        alt: "Portfolio photograph 10",
    },
    {
        src: "https://live.staticflickr.com/65535/55019926420_e353939ec9_b.jpg",
        alt: "Portfolio photograph 11",
    },
    {
        src: "https://live.staticflickr.com/65535/55019609351_faa7e9edc9_b.jpg",
        alt: "Portfolio photograph 12",
    },
    {
        src: "https://live.staticflickr.com/65535/55018727342_1c973a3c64_b.jpg",
        alt: "Portfolio photograph 13",
    },
    {
        src: "https://live.staticflickr.com/65535/55019606561_97c3d7f33c_b.jpg",
        alt: "Portfolio photograph 14",
    },
    {
        src: "https://live.staticflickr.com/65535/55019564846_6d17bc5256_b.jpg",
        alt: "Portfolio photograph 15",
    },
    {
        src: "https://live.staticflickr.com/65535/55018684897_445fd4ea70_b.jpg",
        alt: "Portfolio photograph 16",
    },
    {
        src: "https://live.staticflickr.com/65535/55043524967_611a4dcc90_b.jpg",
        alt: "Portfolio photograph 17",
    },
    {
        src: "https://live.staticflickr.com/65535/55044684869_1a33ef9035_b.jpg",
        alt: "Portfolio photograph 18",
    },
    {
        src: "https://live.staticflickr.com/65535/55044684914_dc507dddde_b.jpg",
        alt: "Portfolio photograph 19",
    },
    {
        src: "https://live.staticflickr.com/65535/55044685184_893a6b55e6_b.jpg",
        alt: "Lonely television street photograph",
    },
    {
        src: "https://live.staticflickr.com/65535/55044603288_31d34eb1bf_b.jpg",
        alt: "Bawal umihi street photograph",
    },
    {
        src: "https://live.staticflickr.com/65535/55043525272_885576db9a_b.jpg",
        alt: "Checkers street photograph",
    },
    {
        src: "https://live.staticflickr.com/65535/55044421176_b0403f0075_b.jpg",
        alt: "Time bike street photograph",
    },
    {
        src: "https://live.staticflickr.com/65535/55044685484_ca67210eaa_b.jpg",
        alt: "DMW street photograph",
    },
    {
        src: "https://live.staticflickr.com/65535/55044420416_17be62686f_b.jpg",
        alt: "Ghosted street photograph",
    },
];

let lastFocusedElement = null;

function renderGallery() {
    const container = document.getElementById("photo-container");
    if (!container) return;

    const shuffledPhotos = shuffleArray([...photos]);

    shuffledPhotos.forEach((photo) => {
        const item = document.createElement("button");
        item.className = "gallery-item reveal";
        item.type = "button";
        item.setAttribute("aria-label", `Open ${photo.alt}`);
        item.addEventListener("click", () => openLightbox(photo));

        const image = document.createElement("img");
        image.src = photo.src;
        image.alt = photo.alt;
        image.loading = "lazy";
        image.decoding = "async";

        image.addEventListener("load", () => {
            const aspectRatio = image.naturalWidth / image.naturalHeight;
            item.style.flexGrow = aspectRatio;
            item.style.flexBasis = `${aspectRatio * 200}px`;
        });

        item.appendChild(image);
        container.appendChild(item);
    });
}

function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.getElementById("close-lightbox");

    if (!lightbox || !closeBtn) return;

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
}

function openLightbox(photo) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (!lightbox || !lightboxImg) return;

    lastFocusedElement = document.activeElement;

    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    const closeBtn = document.getElementById("close-lightbox");
    if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (!lightbox || !lightboxImg) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

    window.setTimeout(() => {
        lightboxImg.src = "";
        lightboxImg.alt = "";
    }, 220);

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

function initGalleryTabs() {
    const tabs = document.querySelectorAll("[data-gallery-tab]");
    const container = document.getElementById("photo-container");
    const films = document.querySelector(".film-grid");
    const gallerySection = document.querySelector(".gallery");

    if (!tabs.length || !container || !films || !gallerySection) return;

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const category = tab.dataset.galleryTab;
            setActiveGallery(category, tabs, container, films, gallerySection);
        });
    });
}

function setActiveGallery(category, tabs, container, films, gallerySection) {
    gallerySection.classList.add("fade-out");

    window.setTimeout(() => {
        tabs.forEach((tab) => {
            const isActive = tab.dataset.galleryTab === category;
            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
        });

        if (category === "photos") {
            container.style.display = "";
            films.classList.add("hidden-tab");
        } else {
            container.style.display = "none";
            films.classList.remove("hidden-tab");

            if (window.PortfolioUI) {
                window.PortfolioUI.initReveal(films);
            }
        }

        gallerySection.classList.remove("fade-out");
    }, 220);
}

function shuffleArray(array) {
    for (let index = array.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }

    return array;
}
