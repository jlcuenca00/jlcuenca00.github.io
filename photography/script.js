document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    initUI();
    initLightbox();
});

/* =========================================
   1. EDIT YOUR PHOTOS HERE
   Paste image links inside quotes, separated by commas.
   ========================================= */
const photoLinks = [
    "https://live.staticflickr.com/65535/55019831164_97561930b2_b.jpg",
    "https://live.staticflickr.com/65535/55019790263_a1e4b36140_b.jpg",
    "https://live.staticflickr.com/65535/55019882270_d0fd60ed47_b.jpg",
    "https://live.staticflickr.com/65535/55018648587_2157726175_b.jpg",
    "https://live.staticflickr.com/65535/55019747288_0946be6844_b.jpg",
    "https://live.staticflickr.com/65535/55019564886_12c4f83e2e_b.jpg",
    "https://live.staticflickr.com/65535/55018684772_83fed20bca_b.jpg",
    "https://live.staticflickr.com/65535/55019831214_2db986e39d_b.jpg",
    "https://live.staticflickr.com/65535/55019608466_260405af16_b.jpg",
    "https://live.staticflickr.com/65535/55019831159_0c3c87342a_b.jpg",
    "https://live.staticflickr.com/65535/55019926420_e353939ec9_b.jpg",
    "https://live.staticflickr.com/65535/55019609351_faa7e9edc9_b.jpg",
    "https://live.staticflickr.com/65535/55018727342_1c973a3c64_b.jpg",
    "https://live.staticflickr.com/65535/55019606561_97c3d7f33c_b.jpg",
    "https://live.staticflickr.com/65535/55019564846_6d17bc5256_b.jpg",
    "https://live.staticflickr.com/65535/55018684897_445fd4ea70_b.jpg",
    "https://live.staticflickr.com/65535/55043524967_611a4dcc90_b.jpg",
    "https://live.staticflickr.com/65535/55044684869_1a33ef9035_b.jpg",
    "https://live.staticflickr.com/65535/55044684914_dc507dddde_b.jpg",
    "https://live.staticflickr.com/65535/55044685184_893a6b55e6_b.jpg", //lonely tv
    "https://live.staticflickr.com/65535/55044603288_31d34eb1bf_b.jpg", //bawal umihi
    "https://live.staticflickr.com/65535/55043525272_885576db9a_b.jpg", //checkers
    "https://live.staticflickr.com/65535/55044421176_b0403f0075_b.jpg", //time bik
    "https://live.staticflickr.com/65535/55044685484_ca67210eaa_b.jpg", //dmw
    "https://live.staticflickr.com/65535/55044420416_17be62686f_b.jpg", //ghosted
];

function renderGallery() {
    const container = document.getElementById("photo-container");
    if (!container) return;

    photoLinks.forEach((src) => {
        const div = document.createElement("div");
        div.className = "gallery-item hidden";

        // Lightbox Trigger
        div.onclick = () => openLightbox(src);

        const img = document.createElement("img");
        img.src = src;
        img.loading = "lazy";

        /* --- ASPECT RATIO CALCULATION ---
           This detects the image shape (16:9, 3:2, 2:3, 1:1) and tells
           CSS exactly how wide this box should be relative to its height.
           This prevents cropping and weird stretching. */
        img.onload = () => {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            div.style.flexGrow = aspectRatio;
            // 350 matches the CSS height to ensure calculations align
            div.style.flexBasis = aspectRatio * 350 + "px";
        };

        div.appendChild(img);
        container.appendChild(div);
    });

    initScrollReveal();
}

/* =========================================
   LIGHTBOX LOGIC
   ========================================= */
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.getElementById("close-lightbox");

    if (!lightbox || !closeBtn) return;

    closeBtn.addEventListener("click", () => closeLightbox());
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active"))
            closeLightbox();
    });
}

function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = src;
    lightbox.classList.add("active");
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.classList.remove("active");
    setTimeout(() => {
        lightboxImg.src = "";
    }, 300);
}

/* =========================================
   UI & ANIMATIONS
   ========================================= */
function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

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

    if (!container || !films) return;

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
