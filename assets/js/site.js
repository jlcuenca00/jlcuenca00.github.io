(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function initReveal(root = document) {
        const elements = root.querySelectorAll(".reveal, .hidden");

        if (!elements.length) return;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            elements.forEach((el) => {
                el.classList.add("is-visible", "show");
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries, activeObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible", "show");
                    activeObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.12 }
        );

        elements.forEach((el) => {
            if (el.dataset.revealObserved === "true") return;
            el.dataset.revealObserved = "true";
            observer.observe(el);
        });
    }

    function initSmoothScroll() {
        if (prefersReducedMotion || typeof window.Lenis !== "function") {
            return null;
        }

        const config = window.PortfolioSmoothScrollConfig || {
            lerp: 0.2,
            wheelMultiplier: 1,
            smoothWheel: true,
            syncTouch: false,
            autoRaf: true,
            anchors: true,
            stopInertiaOnNavigate: true,
            respectReducedMotion: true,
        };

        const lenis = new window.Lenis(config);
        window.PortfolioLenis = lenis;
        return lenis;
    }

    function initAnchorScroll(lenis) {
        // Lenis handles anchor navigation itself when `anchors: true` is enabled.
        if (lenis) return;

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (event) => {
                const targetId = anchor.getAttribute("href");
                if (!targetId || targetId === "#") return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start",
                });

                if (history.pushState) {
                    history.pushState(null, "", targetId);
                }
            });
        });
    }

    function initBackToTop(lenis) {
        const backToTopBtn = document.getElementById("backToTop");
        if (!backToTopBtn) return;

        const toggleVisibility = () => {
            backToTopBtn.classList.toggle("visible", window.scrollY > 320);
        };

        toggleVisibility();
        window.addEventListener("scroll", toggleVisibility, { passive: true });

        backToTopBtn.addEventListener("click", () => {
            if (lenis) {
                lenis.scrollTo(0);
                return;
            }

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        });
    }

    function initSiteUI() {
        const lenis = initSmoothScroll();
        initReveal();
        initAnchorScroll(lenis);
        initBackToTop(lenis);
    }

    window.PortfolioUI = {
        initReveal,
        initSmoothScroll,
        initAnchorScroll,
        initBackToTop,
        initSiteUI,
    };

    document.addEventListener("DOMContentLoaded", initSiteUI);
})();
