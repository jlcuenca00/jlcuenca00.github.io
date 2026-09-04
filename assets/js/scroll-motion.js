(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    const body = document.body;
    const mm = gsap.matchMedia();

    /* Motion may translate/scale readable content, but must not make that content
       fail contrast while it enters the viewport. Keep settle animations opaque. */
    const settle = (target, fromVars, trigger, options = {}) => {
        if (!target || !trigger) return null;
        return gsap.fromTo(
            target,
            { ...fromVars, opacity: 1 },
            {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger,
                    start: options.start || "top 92%",
                    end: options.end || "top 54%",
                    scrub: options.scrub ?? 0.26,
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
                    scrub: options.scrub ?? 0.32,
                    invalidateOnRefresh: true,
                },
            }
        );
    };

    const chapterTitle = (heading) => {
        if (!heading) return;
        const opener = heading.closest(".section-title, .creator-section-head") || heading.parentElement || heading;
        settle(heading, { y: 86, scale: 0.94 }, opener, {
            start: "top 88%",
            end: "top 40%",
            scrub: 0.28,
        });
    };

    function initDeveloperDesktop() {
        const hero = document.querySelector(".dev-hero");
        const heroTitle = document.querySelector(".dev-hero__title h1");
        const heroStatus = document.querySelector(".hero-status");

        parallax(heroTitle, { yPercent: 0, scale: 1 }, { yPercent: -6, scale: 0.99 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.28,
        });
        parallax(heroStatus, { y: 0, opacity: 1 }, { y: 28, opacity: 1 }, hero, {
            start: "top top",
            end: "bottom 35%",
            scrub: 0.22,
        });

        document.querySelectorAll(".project-row").forEach((row, index) => {
            settle(row.querySelector(".project-no"), { x: -18 }, row, { end: "top 62%" });
            settle(row.querySelector(".project-name"), { x: index % 2 ? 28 : -28 }, row, { end: "top 58%" });
            settle(row.querySelector(".project-arrow"), { x: 16 }, row, { end: "top 62%" });
        });

        const preview = document.querySelector(".project-preview .preview-window");
        const work = document.querySelector(".project-layout");
        parallax(preview, { y: 10, rotation: 0.18 }, { y: -16, rotation: -0.18 }, work, {
            start: "top 86%",
            end: "bottom 30%",
            scrub: 0.34,
        });

        document.querySelectorAll(".case-card").forEach((card, index) => {
            settle(card, { y: 48 + index * 6 }, card, {
                start: "top 94%",
                end: "top 60%",
                scrub: 0.28,
            });
            const image = card.querySelector("img");
            parallax(image, { scale: 1.045, yPercent: 2 }, { scale: 1.01, yPercent: -2 }, card, {
                scrub: 0.3,
            });
        });

        document.querySelectorAll(".dev-skills > .section-title h2, .dev-education > .section-title h2, .dev-certificates > .section-title h2").forEach(chapterTitle);

        const profileHeading = document.querySelector(".dev-about h2");
        settle(profileHeading, { y: 70 }, profileHeading, {
            start: "top 90%",
            end: "top 56%",
            scrub: 0.25,
        });

        const portrait = document.querySelector(".profile-portrait");
        const profile = document.querySelector(".dev-about");
        parallax(portrait, { y: 12 }, { y: -12 }, profile, { scrub: 0.28 });

        document.querySelectorAll(".skill-grid article").forEach((item, index) => {
            settle(item, { y: 28 + index * 3 }, item, {
                start: "top 95%",
                end: "top 66%",
                scrub: 0.21,
            });
        });

        document.querySelectorAll(".education-card, .achievement-list > div").forEach((item, index) => {
            settle(item, { y: 24 + (index % 3) * 6 }, item, {
                start: "top 95%",
                end: "top 68%",
                scrub: 0.2,
            });
        });

        document.querySelectorAll(".certificate-card").forEach((card, index) => {
            settle(card, { y: 34 + index * 5 }, card, {
                start: "top 94%",
                end: "top 64%",
                scrub: 0.22,
            });
            const image = card.querySelector(".certificate-preview img");
            parallax(image, { scale: 1.025, yPercent: 1 }, { scale: 1, yPercent: -1 }, card, {
                scrub: 0.25,
            });
        });

        [document.querySelector(".cv-copy h2"), document.querySelector(".dev-contact h2")].forEach((heading) => {
            settle(heading, { y: 70, scale: 0.96 }, heading, {
                start: "top 90%",
                end: "top 56%",
                scrub: 0.24,
            });
        });

        document.querySelectorAll(".contact-links a").forEach((link, index) => {
            settle(link, { x: 28 + index * 6 }, link, {
                start: "top 96%",
                end: "top 72%",
                scrub: 0.18,
            });
        });
    }

    function initCreatorDesktop() {
        const hero = document.querySelector(".creator-hero");
        const heroImage = document.querySelector(".hero-image img");
        const heroTitle = document.querySelector(".creator-hero h1");
        const heroMeta = document.querySelector(".creator-hero__meta");

        parallax(heroImage, { scale: 1.02, yPercent: 0 }, { scale: 1.065, yPercent: 4 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.34,
        });
        parallax(heroTitle, { yPercent: 0 }, { yPercent: -6 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.28,
        });
        parallax(heroMeta, { y: 0, opacity: 1 }, { y: 26, opacity: 1 }, hero, {
            start: "top top",
            end: "bottom 35%",
            scrub: 0.22,
        });

        const intro = document.querySelector(".intro-statement");
        settle(intro, { y: 46 }, intro, {
            start: "top 92%",
            end: "top 58%",
            scrub: 0.24,
        });

        document.querySelectorAll(".selected-work .creator-section-head h2, .motion-section .creator-section-head h2").forEach(chapterTitle);

        document.querySelectorAll(".gallery-frame").forEach((frame, index) => {
            settle(frame, { y: 24 + (index % 4) * 6 }, frame, {
                start: "top 96%",
                end: "top 74%",
                scrub: 0.18,
            });

            const image = frame.querySelector("img");
            const direction = index % 2 === 0 ? 1 : -1;
            parallax(
                image,
                { scale: 1.04, yPercent: direction * 2 },
                { scale: 1.01, yPercent: direction * -2 },
                frame,
                { scrub: 0.25 }
            );
        });

        document.querySelectorAll(".motion-item").forEach((item, index) => {
            settle(item, { y: 48 + index * 8 }, item, {
                start: "top 94%",
                end: "top 60%",
                scrub: 0.24,
            });
            const visual = item.querySelector(".motion-visual");
            parallax(visual, { scale: 0.98, y: 12 }, { scale: 1, y: -12 }, item, {
                scrub: 0.25,
            });
        });

        const aboutHeading = document.querySelector(".creator-about h2");
        const aboutCopy = document.querySelector(".creator-about__copy");
        settle(aboutHeading, { y: 72, scale: 0.96 }, aboutHeading, {
            start: "top 90%",
            end: "top 54%",
            scrub: 0.24,
        });
        settle(aboutCopy, { y: 38 }, aboutCopy, {
            start: "top 92%",
            end: "top 64%",
            scrub: 0.2,
        });

        const contactHeading = document.querySelector(".creator-contact h2");
        settle(contactHeading, { y: 72, scale: 0.96 }, contactHeading, {
            start: "top 90%",
            end: "top 54%",
            scrub: 0.24,
        });

        document.querySelectorAll(".creator-contact__links a").forEach((link, index) => {
            settle(link, { x: 28 + index * 8 }, link, {
                start: "top 96%",
                end: "top 72%",
                scrub: 0.18,
            });
        });
    }

    function initMobile() {
        const heroTitle = document.querySelector(".dev-hero__title h1, .creator-hero h1");
        const hero = document.querySelector(".dev-hero, .creator-hero");
        parallax(heroTitle, { yPercent: 0 }, { yPercent: -3 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.18,
        });

        document.querySelectorAll(".gallery-frame, .case-card, .certificate-card, .skill-grid article").forEach((item) => {
            settle(item, { y: 18 }, item, {
                start: "top 96%",
                end: "top 76%",
                scrub: 0.15,
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
