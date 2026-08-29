(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function loadStylesheet(href) {
        if (!href || document.querySelector(`link[href="${href}"]`)) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    }

    // Layer structural overrides progressively: broad redesign -> chapter system -> targeted refinements.
    if (document.body?.classList.contains("dev-page")) {
        loadStylesheet("layout-v2.css?v=20260830-2");
        loadStylesheet("layout-v3.css?v=20260830-1");
        loadStylesheet("layout-v4.css?v=20260830-1");
    } else if (document.body?.classList.contains("photography-page")) {
        loadStylesheet("layout-v2.css?v=20260830-2");
        loadStylesheet("layout-v3.css?v=20260830-1");
        loadStylesheet("layout-v4.css?v=20260830-1");
        loadStylesheet("layout-v5.css?v=20260830-1");
    }

    function initReveal(root = document) {
        const elements = root.querySelectorAll(".reveal, .hidden");
        if (!elements.length) return;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            elements.forEach((el) => el.classList.add("is-visible", "show"));
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

    function initAnchorScroll() {
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

                if (history.pushState) history.pushState(null, "", targetId);
            });
        });
    }

    function initBackToTop() {
        const backToTopBtn = document.getElementById("backToTop");
        if (!backToTopBtn) return;

        const toggleVisibility = () => {
            backToTopBtn.classList.toggle("visible", window.scrollY > 320);
        };

        toggleVisibility();
        window.addEventListener("scroll", toggleVisibility, { passive: true });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        });
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
                if (existing.dataset.loaded === "true") resolve();
                else existing.addEventListener("load", resolve, { once: true });
                return;
            }

            const script = document.createElement("script");
            script.src = src;
            script.defer = true;
            script.addEventListener("load", () => {
                script.dataset.loaded = "true";
                resolve();
            }, { once: true });
            script.addEventListener("error", reject, { once: true });
            document.head.appendChild(script);
        });
    }

    async function initGalleryOrientation() {
        if (!document.body.classList.contains("photography-page")) return;
        try {
            await loadScript("../assets/js/gallery-orientation.js?v=20260830-2");
        } catch (error) {
            console.warn("Gallery orientation enhancement unavailable.", error);
        }
    }

    async function initScrollMotion() {
        if (prefersReducedMotion) return;
        if (!document.body.matches(".dev-page, .photography-page")) return;

        try {
            await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js");
            await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js");
            await loadScript("../assets/js/scroll-motion.js?v=20260830-3");
        } catch (error) {
            console.warn("Scroll motion enhancement unavailable; native scrolling remains active.", error);
        }
    }

    function initDeveloperProjectCleanup() {
        if (!document.body.classList.contains("dev-page")) return;
        document.querySelector(".case-grid")?.remove();
    }

    function initSiteUI() {
        initDeveloperProjectCleanup();
        initReveal();
        initAnchorScroll();
        initBackToTop();
        initGalleryOrientation();
        initScrollMotion();
    }

    window.PortfolioUI = {
        initReveal,
        initAnchorScroll,
        initBackToTop,
        initGalleryOrientation,
        initScrollMotion,
        initDeveloperProjectCleanup,
        initSiteUI,
    };

    document.addEventListener("DOMContentLoaded", initSiteUI);
})();