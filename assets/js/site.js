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

    function initAnchorScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (event) => {
                const targetId = anchor.getAttribute("href");
                if (!targetId || targetId === "#") return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
            });
        });
    }

    function initSmoothWheel() {
        if (prefersReducedMotion) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;

        let current = window.scrollY;
        let target = current;
        let frame = null;
        let animating = false;

        const clampTarget = () => {
            const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            target = Math.max(0, Math.min(target, max));
        };

        const render = () => {
            const distance = target - current;
            current += distance * 0.14;

            if (Math.abs(distance) < 0.5) {
                current = target;
                window.scrollTo(0, current);
                frame = null;
                animating = false;
                return;
            }

            window.scrollTo(0, current);
            frame = requestAnimationFrame(render);
        };

        const start = () => {
            if (frame !== null) return;
            animating = true;
            frame = requestAnimationFrame(render);
        };

        window.addEventListener("wheel", (event) => {
            if (event.defaultPrevented || event.ctrlKey || document.body.classList.contains("no-scroll")) return;

            const targetElement = event.target instanceof Element ? event.target : null;
            const nativeScroller = targetElement?.closest("textarea, select, [data-native-scroll]");
            if (nativeScroller) return;

            event.preventDefault();

            const multiplier = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
            target += event.deltaY * multiplier;
            clampTarget();
            start();
        }, { passive: false });

        window.addEventListener("resize", clampTarget, { passive: true });
        window.addEventListener("scroll", () => {
            if (animating) return;
            current = window.scrollY;
            target = current;
        }, { passive: true });

        window.addEventListener("keydown", (event) => {
            if (["Home", "End", "PageUp", "PageDown", "ArrowUp", "ArrowDown", " "].includes(event.key)) {
                if (frame !== null) cancelAnimationFrame(frame);
                frame = null;
                animating = false;
                current = window.scrollY;
                target = current;
            }
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
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        });
    }

    function initSiteUI() {
        initReveal();
        initAnchorScroll();
        initSmoothWheel();
        initBackToTop();
    }

    window.PortfolioUI = {
        initReveal,
        initAnchorScroll,
        initSmoothWheel,
        initBackToTop,
        initSiteUI,
    };

    document.addEventListener("DOMContentLoaded", initSiteUI);
})();