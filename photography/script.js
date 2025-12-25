document.addEventListener("DOMContentLoaded", () => {
    // --- 3D TILT EFFECT ---
    const tiltCards = document.querySelectorAll(".tilt");

    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            // Scale 1.05 for visible pop
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = "none";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
            card.style.transition = "transform 0.5s ease-out";
        });
    });

    // --- SCROLL REVEAL ---
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
});

// --- FILTER ---
function filterGallery(category) {
    const gallerySection = document.querySelector(".gallery");
    const photos = document.querySelectorAll(".photo-col");
    const films = document.querySelector(".film-grid");
    const btns = document.querySelectorAll(".tab-btn");

    gallerySection.classList.add("fade-out");

    setTimeout(() => {
        btns.forEach((btn) => btn.classList.remove("active"));

        if (category === "photos") {
            photos.forEach((col) => (col.style.display = "flex"));
            films.classList.add("hidden-tab");
            btns[0].classList.add("active");
        } else {
            photos.forEach((col) => (col.style.display = "none"));
            films.classList.remove("hidden-tab");
            btns[1].classList.add("active");
        }
        gallerySection.classList.remove("fade-out");
    }, 300);
}
