document.addEventListener("DOMContentLoaded", () => {
    const portrait = document.querySelector(".profile-portrait");
    if (!portrait) return;

    const images = [...portrait.querySelectorAll(".profile-portrait__image")];
    const counter = portrait.querySelector("[data-portrait-counter]");
    if (images.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intervalMs = 3600;
    let activeIndex = Math.max(0, images.findIndex((image) => image.classList.contains("is-active")));
    let timer = null;

    const show = (index) => {
        activeIndex = (index + images.length) % images.length;
        images.forEach((image, imageIndex) => {
            const isActive = imageIndex === activeIndex;
            image.classList.toggle("is-active", isActive);
            image.setAttribute("aria-hidden", String(!isActive));
        });

        if (counter) {
            counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
        }
    };

    const stop = () => {
        if (timer) window.clearInterval(timer);
        timer = null;
    };

    const start = () => {
        if (reducedMotion || timer || document.hidden) return;
        timer = window.setInterval(() => show(activeIndex + 1), intervalMs);
    };

    portrait.addEventListener("click", () => {
        show(activeIndex + 1);
        stop();
        start();
    });

    portrait.addEventListener("mouseenter", stop);
    portrait.addEventListener("mouseleave", start);
    portrait.addEventListener("focusin", stop);
    portrait.addEventListener("focusout", start);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stop();
        else start();
    });

    show(activeIndex);
    start();
});
