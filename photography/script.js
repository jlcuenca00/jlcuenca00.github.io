document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    initUI();
    initLightbox();
});

/* =========================================
   OPTIMIZED CONFIGURATION
   ========================================= */
const portfolioData = [
    { src: "images/punk.JPG", type: "tall", alt: "Onin Portrait" },
    { src: "images/bot.JPG", type: "short", alt: "Candles" },
    { src: "images/q.png", type: "tall", alt: "Queen" },
    { src: "images/chu.JPG", type: "short", alt: "Church" },
    { src: "images/wut.JPG", type: "short", alt: "Night City" },
    { src: "images/can.JPG", type: "tall", alt: "Flowing Dress" },
    { src: "images/ong.JPG", type: "short", alt: "Contrast" },
    { src: "images/flo.JPG", type: "tall", alt: "Rose Model" },
    { src: "images/bui.JPG", type: "tall", alt: "Building" },
    { src: "images/hor.JPG", type: "short", alt: "Horns" },

    //{ src: "images/go.png", type: "tall", alt: "Zen Garden" },
    //{ src: "images/fly.png", type: "short", alt: "Zen Garden" },
    // Spacers for aesthetic gaps
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

        // Add "tilt" class for effect
        card.className = `placeholder ${item.type} tilt hidden`;

        if (!item.spacer && item.src) {
            const img = document.createElement("img");

            // Lazy Load + Lightbox setup
            img.loading = "lazy";
            img.src = item.thumb || item.src;
            img.alt = item.alt || "";

            card.onclick = () => openLightbox(item.src);
            card.appendChild(img);
        }

        targetColumn.appendChild(card);
    });

    initTiltEffect();
    initScrollReveal();
}

/* =========================================
   HYBRID TILT EFFECT (JS Rotation + CSS Scale)
   ========================================= */
function initTiltEffect() {
    const tiltCards = document.querySelectorAll(".tilt");

    // Disable tilt on touch devices for performance
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    tiltCards.forEach((card) => {
        let isHovering = false;

        card.addEventListener("mouseenter", () => {
            isHovering = true;
        });

        card.addEventListener("mousemove", (e) => {
            if (!isHovering) return;

            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                // JS ONLY handles Transform (Rotate/Perspective)
                // CSS handles Scale property independently
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });

        card.addEventListener("mouseleave", () => {
            isHovering = false;
            // Clear transform so CSS transition can smoothly return it to 0
            card.style.transform = "";
        });
    });
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
