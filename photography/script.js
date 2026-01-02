document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    initUI();
    initLightbox();
});

/* =========================================
   OPTIMIZED CONFIGURATION
   ========================================= */
const portfolioData = [
    {
        src: "https://live.staticflickr.com/65535/55019831164_97561930b2_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019831164_97561930b2.jpg",
        type: "tall",
        alt: "Skull Post",
    },
    {
        src: "https://live.staticflickr.com/65535/55019790263_a1e4b36140_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019790263_a1e4b36140.jpg",
        type: "short",
        alt: "Electric Lines",
    },
    {
        src: "https://live.staticflickr.com/65535/55019882270_d0fd60ed47_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019882270_d0fd60ed47.jpg",
        type: "tall",
        alt: "Queen",
    },
    {
        src: "https://live.staticflickr.com/65535/55018648587_2157726175_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55018648587_2157726175.jpg",
        type: "short",
        alt: "Boat in the Bay",
    },
    {
        src: "https://live.staticflickr.com/65535/55019747288_0946be6844_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019747288_0946be6844.jpg",
        type: "short",
        alt: "Night Shore",
    },
    {
        src: "https://live.staticflickr.com/65535/55019564886_12c4f83e2e_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019564886_12c4f83e2e.jpg",
        type: "tall",
        alt: "Flowing Dress",
    },
    {
        src: "https://live.staticflickr.com/65535/55018684772_83fed20bca_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55018684772_83fed20bca.jpg",
        type: "short",
        alt: "Contrast",
    },
    {
        src: "https://live.staticflickr.com/65535/55019831214_2db986e39d_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019831214_2db986e39d.jpg",
        type: "tall",
        alt: "Flowers",
    },
    {
        src: "https://live.staticflickr.com/65535/55019608466_260405af16_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019608466_260405af16.jpg",
        type: "tall",
        alt: "Woman Walking",
    },

    {
        src: "https://live.staticflickr.com/65535/55019831159_0c3c87342a_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019831159_0c3c87342a.jpg",
        type: "short",
        alt: "Horns",
    },
    {
        src: "https://live.staticflickr.com/65535/55019926420_e353939ec9_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019926420_e353939ec9.jpg",
        type: "tall",
        alt: "Portrait",
    },
    {
        src: "https://live.staticflickr.com/65535/55019609351_faa7e9edc9_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019609351_faa7e9edc9.jpg",
        type: "short",
        alt: "City Lights",
    },
    {
        src: "https://live.staticflickr.com/65535/55018727342_1c973a3c64_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55018727342_1c973a3c64.jpg",
        type: "short",
        alt: "Man",
    },

    {
        src: "https://live.staticflickr.com/65535/55019606561_97c3d7f33c_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019606561_97c3d7f33c.jpg",
        type: "tall",
        alt: "Mirror",
    },
    {
        src: "https://live.staticflickr.com/65535/55019564846_6d17bc5256_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55019564846_6d17bc5256.jpg",
        type: "short",
        alt: "Church",
    },

    {
        src: "https://live.staticflickr.com/65535/55018684897_445fd4ea70_b.jpg",
        thumb: "https://live.staticflickr.com/65535/55018684897_445fd4ea70.jpg",
        type: "tall",
        alt: "Building",
    },

    { spacer: true, type: "tall" },
    { spacer: true, type: "short" },
];

function renderGallery() {
    const container = document.getElementById("photo-container");
    const columnCount = 4;
    const columns = [];

    // 1. Create Column Elements
    for (let i = 0; i < columnCount; i++) {
        const col = document.createElement("div");
        col.className = "column photo-col";
        container.appendChild(col);
        columns.push(col);
    }

    // 2. Distribute Images
    portfolioData.forEach((item, index) => {
        const targetColumn = columns[index % columnCount];
        const card = document.createElement("div");

        // REMOVED 'tilt' class to disable 3D effect
        card.className = `placeholder ${item.type} hidden`;

        if (!item.spacer && item.src) {
            const img = document.createElement("img");

            // --- PERFORMANCE OPTIMIZATIONS ---
            img.loading = "lazy";
            img.decoding = "async";
            img.fetchPriority = "low";

            img.src = item.thumb || item.src;
            img.alt = item.alt || "";

            card.onclick = () => openLightbox(item.src);
            card.appendChild(img);
        }

        targetColumn.appendChild(card);
    });

    // Removed initTiltEffect() call
    initScrollReveal();
}

/* =========================================
   LIGHTBOX LOGIC
   ========================================= */
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.getElementById("close-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active");
        setTimeout(() => {
            lightboxImg.src = "";
        }, 300);
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
            setTimeout(() => {
                lightboxImg.src = "";
            }, 300);
        }
    });
}

function openLightbox(fullResSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = fullResSrc;
    lightbox.classList.add("active");
}

/* =========================================
   STANDARD UI LOGIC
   ========================================= */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    });
    document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));
}

function initUI() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth" });
        });
    });

    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) backToTopBtn.classList.add("visible");
            else backToTopBtn.classList.remove("visible");
        });
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

function filterGallery(category) {
    const container = document.getElementById("photo-container");
    const films = document.querySelector(".film-grid");
    const btns = document.querySelectorAll(".tab-btn");
    const gallerySection = document.querySelector(".gallery");

    gallerySection.classList.add("fade-out");

    setTimeout(() => {
        btns.forEach((btn) => btn.classList.remove("active"));
        if (category === "photos") {
            container.style.display = "flex";
            films.classList.add("hidden-tab");
            btns[0].classList.add("active");
        } else {
            container.style.display = "none";
            films.classList.remove("hidden-tab");
            btns[1].classList.add("active");
        }
        gallerySection.classList.remove("fade-out");
    }, 300);
}
