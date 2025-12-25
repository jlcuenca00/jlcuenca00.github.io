document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize the Gallery
    renderGallery();

    // 2. Initialize Core UI Features (Nav, Scroll, BackToTop)
    initUI();
});

/* =========================================
   SCALABLE GALLERY CONFIGURATION
   Add your images here.
   - src: Path to image
   - type: "tall" (Portrait 2:3) or "short" (Landscape 3:2)
   - alt: Description (optional)
   ========================================= */
const portfolioData = [
    { src: "images/onin.JPG", type: "short", alt: "Onin Portrait" },
    { src: "images/can.JPG", type: "short", alt: "Candles" },
    { src: "images/q.png", type: "short", alt: "Q Model" },
    { src: "images/wut.JPG", type: "short", alt: "Night City" },
    { src: "images/go.png", type: "tall", alt: "Gown Blue" },
    { src: "images/fly.png", type: "short", alt: "Flowing Dress" },
    { src: "images/chu.JPG", type: "short", alt: "Church" },
    // Add new images easily here:
    // { src: "images/new-photo.jpg", type: "tall" },
    // You can also add "spacers" (empty boxes) if you want the aesthetic gaps:
    { spacer: true, type: "tall" },
    { spacer: true, type: "short" },
];

function renderGallery() {
    const container = document.getElementById("photo-container");
    const columnCount = 4; // Number of columns you want
    const columns = [];

    // 1. Create Column Elements
    for (let i = 0; i < columnCount; i++) {
        const col = document.createElement("div");
        col.className = "column photo-col";
        container.appendChild(col);
        columns.push(col);
    }

    // 2. Distribute Images (Round Robin)
    // This distributes images 1->2->3->4->1->2...
    portfolioData.forEach((item, index) => {
        const columnIndex = index % columnCount;
        const targetColumn = columns[columnIndex];

        const card = document.createElement("div");
        // Add base classes
        card.className = `placeholder ${item.type} tilt hidden`;

        // Add content (Image or Empty Spacer)
        if (!item.spacer && item.src) {
            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.alt || "";
            card.appendChild(img);
        }

        targetColumn.appendChild(card);
    });

    // 3. Re-Initialize Effects (Tilt & Scroll Reveal)
    // We must do this AFTER the HTML is injected
    initTiltEffect();
    initScrollReveal();
}

/* =========================================
   EFFECTS & UI LOGIC
   ========================================= */

function initTiltEffect() {
    const tiltCards = document.querySelectorAll(".tilt");

    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Sensitivity settings
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = "none";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
            card.style.transition = "transform 0.5s ease-out";
        });
    });
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));
}

function initUI() {
    // --- SMOOTH SCROLL FOR NAV ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // --- BACK TO TOP ---
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

// --- FILTER FUNCTION (Connected to buttons) ---
function filterGallery(category) {
    const container = document.getElementById("photo-container"); // The new wrapper
    const films = document.querySelector(".film-grid");
    const btns = document.querySelectorAll(".tab-btn");
    const gallerySection = document.querySelector(".gallery");

    gallerySection.classList.add("fade-out");

    setTimeout(() => {
        btns.forEach((btn) => btn.classList.remove("active"));

        if (category === "photos") {
            container.style.display = "flex"; // Show photo wrapper
            films.classList.add("hidden-tab");
            btns[0].classList.add("active");
        } else {
            container.style.display = "none"; // Hide photo wrapper
            films.classList.remove("hidden-tab");
            btns[1].classList.add("active");
        }
        gallerySection.classList.remove("fade-out");
    }, 300);
}
