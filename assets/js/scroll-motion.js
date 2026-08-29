(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    const body = document.body;
    const mm = gsap.matchMedia();

    function scrub(target, vars, trigger, options = {}) {
        if (!target || !trigger) return null;
        return gsap.to(target, {
            ease: "none",
            ...vars,
            scrollTrigger: {
                trigger,
                start: options.start || "top bottom",
                end: options.end || "bottom top",
                scrub: options.scrub ?? 0.35,
                invalidateOnRefresh: true,
                ...options.scrollTrigger,
            },
        });
    }

    function revealLine(target, trigger, fromX = -5) {
        if (!target || !trigger) return;
        gsap.fromTo(
            target,
            { xPercent: fromX },
            {
                xPercent: 0,
                ease: "none",
                scrollTrigger: {
                    trigger,
                    start: "top 92%",
                    end: "top 48%",
                    scrub: 0.3,
                    invalidateOnRefresh: true,
                },
            }
        );
    }

    function initDeveloperDesktop() {
        const hero = document.querySelector(".dev-hero");
        const heroTitle = document.querySelector(".dev-hero__title h1");
        const heroAccent = document.querySelector(".dev-hero__title h1 span");
        const heroStatus = document.querySelector(".hero-status");

        scrub(heroTitle, { yPercent: -13, scale: 0.975 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.35,
        });
        scrub(heroAccent, { x: "6vw" }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
        });
        scrub(heroStatus, { yPercent: 90, opacity: 0.22 }, hero, {
            start: "top top",
            end: "bottom 30%",
            scrub: 0.25,
        });

        const work = document.querySelector(".project-index");
        const preview = document.querySelector(".project-preview .preview-window");
        scrub(preview, { y: -58, rotate: -0.5, scale: 1.015 }, work, {
            start: "top 75%",
            end: "bottom 30%",
            scrub: 0.45,
        });

        document.querySelectorAll(".project-row").forEach((row, index) => {
            const name = row.querySelector(".project-name");
            const number = row.querySelector(".project-no");
            const arrow = row.querySelector(".project-arrow");
            gsap.fromTo(
                [number, name],
                { x: index % 2 === 0 ? -28 : 28 },
                {
                    x: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 92%",
                        end: "top 58%",
                        scrub: 0.28,
                    },
                }
            );
            if (arrow) {
                gsap.fromTo(arrow, { x: 24, opacity: 0.15 }, {
                    x: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 88%",
                        end: "top 55%",
                        scrub: 0.25,
                    },
                });
            }
        });

        document.querySelectorAll(".case-card").forEach((card, index) => {
            const image = card.querySelector("img");
            if (!image) return;
            gsap.fromTo(
                image,
                { scale: 1.08, yPercent: index % 2 ? 5 : -5 },
                {
                    scale: 1,
                    yPercent: index % 2 ? -5 : 5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.45,
                    },
                }
            );
        });

        const profile = document.querySelector(".dev-about");
        const portrait = document.querySelector(".profile-portrait");
        const profileCopy = document.querySelector(".profile-copy");
        scrub(portrait, { y: -45, rotate: -0.7 }, profile, { scrub: 0.4 });
        scrub(profileCopy, { y: 32 }, profile, { scrub: 0.35 });

        document.querySelectorAll(".section-title h2, .dev-about h2").forEach((heading, index) => {
            revealLine(heading, heading.closest("section") || heading, index % 2 ? 5 : -5);
            const accent = heading.querySelector("span");
            if (accent) {
                scrub(accent, { x: index % 2 ? "-4vw" : "4vw" }, heading.closest("section") || heading, {
                    start: "top 88%",
                    end: "bottom 45%",
                    scrub: 0.35,
                });
            }
        });

        document.querySelectorAll(".skill-grid article").forEach((card, index) => {
            gsap.fromTo(
                card,
                { y: 26 + index * 7 },
                {
                    y: -16,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 95%",
                        end: "bottom 55%",
                        scrub: 0.3,
                    },
                }
            );
        });

        document.querySelectorAll(".education-card").forEach((card, index) => {
            const year = card.querySelector(".education-year");
            const copy = card.querySelector("div");
            if (year) scrub(year, { y: index % 2 ? 24 : -24 }, card, { scrub: 0.3 });
            if (copy) scrub(copy, { y: index % 2 ? -12 : 12 }, card, { scrub: 0.3 });
        });

        document.querySelectorAll(".certificate-card").forEach((card, index) => {
            const image = card.querySelector(".certificate-preview img");
            if (!image) return;
            gsap.fromTo(
                image,
                { scale: 1.055, yPercent: index % 2 ? 3 : -3 },
                {
                    scale: 1,
                    yPercent: index % 2 ? -3 : 3,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.35,
                    },
                }
            );
        });

        const contact = document.querySelector(".dev-contact");
        const contactTitle = contact?.querySelector("h2");
        if (contactTitle) {
            scrub(contactTitle, { x: "-5vw" }, contact, {
                start: "top 90%",
                end: "bottom bottom",
                scrub: 0.4,
            });
            const accent = contactTitle.querySelector("span");
            scrub(accent, { x: "8vw" }, contact, {
                start: "top 90%",
                end: "bottom bottom",
                scrub: 0.4,
            });
        }
    }

    function initCreatorDesktop() {
        const hero = document.querySelector(".creator-hero");
        const heroImage = document.querySelector(".hero-image img");
        const heroTitle = document.querySelector(".creator-hero h1");
        const heroAccent = document.querySelector(".creator-hero h1 span");
        const heroMeta = document.querySelector(".creator-hero__meta");

        if (heroImage) {
            gsap.fromTo(
                heroImage,
                { scale: 1.02, yPercent: 0 },
                {
                    scale: 1.12,
                    yPercent: 8,
                    ease: "none",
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.45,
                    },
                }
            );
        }
        scrub(heroTitle, { yPercent: -18 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.35,
        });
        scrub(heroAccent, { x: "9vw" }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
        });
        scrub(heroMeta, { y: 70, opacity: 0.2 }, hero, {
            start: "top top",
            end: "bottom 35%",
            scrub: 0.3,
        });

        const intro = document.querySelector(".creator-intro");
        const statement = document.querySelector(".intro-statement");
        scrub(statement, { x: "5vw" }, intro, {
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
        });

        document.querySelectorAll(".creator-section-head").forEach((header, index) => {
            const heading = header.querySelector("h2");
            const copy = header.querySelector(":scope > p");
            if (heading) {
                gsap.fromTo(heading, { xPercent: index % 2 ? 6 : -6 }, {
                    xPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: header,
                        start: "top 92%",
                        end: "top 50%",
                        scrub: 0.35,
                    },
                });
            }
            if (copy) {
                gsap.fromTo(copy, { xPercent: index % 2 ? -10 : 10 }, {
                    xPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: header,
                        start: "top 92%",
                        end: "top 50%",
                        scrub: 0.35,
                    },
                });
            }
        });

        document.querySelectorAll(".gallery-frame").forEach((frame, index) => {
            const image = frame.querySelector("img");
            if (!image) return;
            const direction = index % 2 === 0 ? 1 : -1;
            const travel = frame.classList.contains("gallery-frame--full") ? 7 : 4;

            gsap.fromTo(
                image,
                { scale: 1.09, yPercent: direction * travel },
                {
                    scale: 1.015,
                    yPercent: direction * -travel,
                    ease: "none",
                    scrollTrigger: {
                        trigger: frame,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.42,
                    },
                }
            );

            if (frame.classList.contains("gallery-frame--full") || frame.classList.contains("gallery-frame--wide")) {
                gsap.fromTo(
                    image,
                    { xPercent: direction * 2.2 },
                    {
                        xPercent: direction * -2.2,
                        ease: "none",
                        scrollTrigger: {
                            trigger: frame,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.42,
                        },
                    }
                );
            }
        });

        document.querySelectorAll(".motion-item").forEach((item, index) => {
            const visual = item.querySelector(".motion-visual");
            const copy = item.querySelector(".motion-copy");
            if (visual) {
                gsap.fromTo(visual, { scale: 0.94, y: 45 }, {
                    scale: 1,
                    y: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 95%",
                        end: "bottom 35%",
                        scrub: 0.4,
                    },
                });
            }
            if (copy) {
                gsap.fromTo(copy, { y: 70 + index * 10 }, {
                    y: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 95%",
                        end: "bottom 35%",
                        scrub: 0.35,
                    },
                });
            }
        });

        const about = document.querySelector(".creator-about");
        const aboutTitle = about?.querySelector("h2");
        const aboutCopy = about?.querySelector(".creator-about__copy");
        scrub(aboutTitle, { x: "-6vw" }, about, { scrub: 0.4 });
        scrub(aboutCopy, { y: 45 }, about, { scrub: 0.35 });

        const contact = document.querySelector(".creator-contact");
        const contactTitle = contact?.querySelector("h2");
        scrub(contactTitle, { x: "-5vw" }, contact, {
            start: "top 90%",
            end: "bottom bottom",
            scrub: 0.4,
        });
    }

    function initMobile() {
        const heroTitle = document.querySelector(".dev-hero__title h1, .creator-hero h1");
        const hero = document.querySelector(".dev-hero, .creator-hero");
        scrub(heroTitle, { yPercent: -7 }, hero, {
            start: "top top",
            end: "bottom top",
            scrub: 0.25,
        });

        document.querySelectorAll(".gallery-frame img, .case-card img, .certificate-preview img").forEach((image) => {
            const trigger = image.closest(".gallery-frame, .case-card, .certificate-card");
            if (!trigger) return;
            gsap.fromTo(image, { scale: 1.045 }, {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.2,
                },
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
    window.addEventListener("resize", gsap.utils.debounce ? gsap.utils.debounce(refresh, 150) : refresh, { passive: true });
})();