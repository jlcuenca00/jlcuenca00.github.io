(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    const body = document.body;
    const mm = gsap.matchMedia();

    const settle = (target, fromVars, trigger, options = {}) => {
        if (!target || !trigger) return null;
        return gsap.fromTo(
            target,
            fromVars,
            {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger,
                    start: options.start || "top 92%",
                    end: options.end || "top 52%",
                    scrub: options.scrub ?? 0.28,
                    invalidateOnRefresh: true,
                },
            }
        );
    };

    const parallax = (target, fromVars, toVars, trigger, options = {}) => {
        if (!target || !trigger) return null;
        return gsap.fromTo(
            target,
            fromVars,
            {
                ...toVars,
                ease: "none",
                scrollTrigger: {
                    trigger,
                    start: options.start || "top bottom",
                    end: options.end || "bottom top",
                    scrub: options.scrub ?? 0.35,
                    invalidateOnRefresh: true,
                },
            }
        );
    };

    function initDeveloperDesktop() {
        const hero = document.querySelector(".dev-hero");
        const heroTitle = document.querySelector(".dev-hero__title h1");
        const heroStatus = document.querySelector(".hero-status");

        parallax(heroTitle, { yPercent: 0, scale: 1 }, { yPercent: -8, scale: 0.985 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.32,
        });
        parallax(heroStatus, { y: 0, opacity: 1 }, { y: 36, opacity: 0.32 }, hero, {
            start: "top top",
            end: "bottom 35%",
            scrub: 0.25,
        });

        document.querySelectorAll(".project-row").forEach((row, index) => {
            const name = row.querySelector(".project-name");
            const number = row.querySelector(".project-no");
            const arrow = row.querySelector(".project-arrow");
            settle(number, { x: -20, opacity: 0.25 }, row);
            settle(name, { x: index % 2 ? 34 : -34, opacity: 0.58 }, row, { end: "top 56%" });
            settle(arrow, { x: 18, opacity: 0.2 }, row);
        });

        const preview = document.querySelector(".project-preview .preview-window");
        const work = document.querySelector(".project-index");
        parallax(preview, { y: 16, rotation: 0.25 }, { y: -22, rotation: -0.25 }, work, {
            start: "top 80%",
            end: "bottom 25%",
            scrub: 0.4,
        });

        document.querySelectorAll(".case-card").forEach((card, index) => {
            settle(card, { y: 54 + index * 8, opacity: 0.35 }, card, {
                start: "top 94%",
                end: "top 57%",
                scrub: 0.32,
            });
            const image = card.querySelector("img");
            parallax(image, { scale: 1.055, yPercent: 2.5 }, { scale: 1.01, yPercent: -2.5 }, card, {
                scrub: 0.38,
            });
        });

        const portrait = document.querySelector(".profile-portrait");
        const profile = document.querySelector(".dev-about");
        parallax(portrait, { y: 18 }, { y: -18 }, profile, { scrub: 0.34 });

        // Headings enter and settle. They do not keep drifting after reaching readability.
        document.querySelectorAll(".section-title h2, .dev-about h2, .dev-contact h2, .cv-copy h2").forEach((heading) => {
            const section = heading.closest("section") || heading;
            settle(heading, { y: 72, opacity: 0.3 }, section, {
                start: "top 90%",
                end: "top 48%",
                scrub: 0.3,
            });
        });

        document.querySelectorAll(".skill-grid article").forEach((item, index) => {
            settle(item, { y: 34 + index * 4, opacity: 0.4 }, item, {
                start: "top 94%",
                end: "top 62%",
                scrub: 0.24,
            });
        });

        document.querySelectorAll(".education-card, .achievement-list > div").forEach((item, index) => {
            settle(item, { y: 26 + (index % 3) * 8, opacity: 0.42 }, item, {
                start: "top 95%",
                end: "top 64%",
                scrub: 0.24,
            });
        });

        document.querySelectorAll(".certificate-card").forEach((card, index) => {
            settle(card, { y: 38 + index * 7, opacity: 0.4 }, card, {
                start: "top 94%",
                end: "top 60%",
                scrub: 0.28,
            });
            const image = card.querySelector(".certificate-preview img");
            parallax(image, { scale: 1.035, yPercent: 1.6 }, { scale: 1, yPercent: -1.6 }, card, {
                scrub: 0.3,
            });
        });

        document.querySelectorAll(".contact-links a").forEach((link, index) => {
            settle(link, { x: 36 + index * 10, opacity: 0.3 }, link, {
                start: "top 96%",
                end: "top 68%",
                scrub: 0.22,
            });
        });
    }

    function initCreatorDesktop() {
        const hero = document.querySelector(".creator-hero");
        const heroImage = document.querySelector(".hero-image img");
        const heroTitle = document.querySelector(".creator-hero h1");
        const heroMeta = document.querySelector(".creator-hero__meta");

        parallax(heroImage, { scale: 1.02, yPercent: 0 }, { scale: 1.08, yPercent: 5 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
        });
        parallax(heroTitle, { yPercent: 0 }, { yPercent: -9 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.32,
        });
        parallax(heroMeta, { y: 0, opacity: 1 }, { y: 32, opacity: 0.3 }, hero, {
            start: "top top",
            end: "bottom 35%",
            scrub: 0.25,
        });

        const intro = document.querySelector(".intro-statement");
        settle(intro, { y: 54, opacity: 0.35 }, document.querySelector(".creator-intro"), {
            start: "top 92%",
            end: "top 52%",
            scrub: 0.28,
        });

        document.querySelectorAll(".creator-section-head h2, .creator-about h2, .creator-contact h2").forEach((heading) => {
            const section = heading.closest("section") || heading;
            settle(heading, { y: 68, opacity: 0.3 }, section, {
                start: "top 90%",
                end: "top 48%",
                scrub: 0.3,
            });
        });

        document.querySelectorAll(".gallery-frame").forEach((frame, index) => {
            settle(frame, { y: 28 + (index % 4) * 8, opacity: 0.35 }, frame, {
                start: "top 96%",
                end: "top 72%",
                scrub: 0.22,
            });

            const image = frame.querySelector("img");
            const direction = index % 2 === 0 ? 1 : -1;
            parallax(
                image,
                { scale: 1.055, yPercent: direction * 2.8 },
                { scale: 1.01, yPercent: direction * -2.8 },
                frame,
                { scrub: 0.32 }
            );
        });

        document.querySelectorAll(".motion-item").forEach((item, index) => {
            settle(item, { y: 58 + index * 12, opacity: 0.35 }, item, {
                start: "top 94%",
                end: "top 56%",
                scrub: 0.3,
            });
            const visual = item.querySelector(".motion-visual");
            parallax(visual, { scale: 0.97, y: 18 }, { scale: 1, y: -18 }, item, {
                scrub: 0.32,
            });
        });

        const aboutCopy = document.querySelector(".creator-about__copy");
        settle(aboutCopy, { y: 50, opacity: 0.35 }, document.querySelector(".creator-about"), {
            start: "top 88%",
            end: "top 50%",
            scrub: 0.28,
        });

        document.querySelectorAll(".creator-contact__links a").forEach((link, index) => {
            settle(link, { x: 34 + index * 12, opacity: 0.3 }, link, {
                start: "top 96%",
                end: "top 70%",
                scrub: 0.22,
            });
        });
    }

    function initMobile() {
        const heroTitle = document.querySelector(".dev-hero__title h1, .creator-hero h1");
        const hero = document.querySelector(".dev-hero, .creator-hero");
        parallax(heroTitle, { yPercent: 0 }, { yPercent: -4 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.22,
        });

        document.querySelectorAll(".gallery-frame, .case-card, .certificate-card, .skill-grid article").forEach((item) => {
            settle(item, { y: 22, opacity: 0.45 }, item, {
                start: "top 96%",
                end: "top 74%",
                scrub: 0.18,
            });
        });
    }

    if (body.classList.contains("dev-page")) {
        mm.add("(min-width: 900px)", initDeveloperDesktop);
        mm.add("(max-width: 899px)", initMobile);
    }

    if (body.classList.contains("photography-page")) {
        mm.add("(min-width: 900px)", initCreatorDesktop);
        mm.add("(max-width: 899px)", initMobile);
    }

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
})();
