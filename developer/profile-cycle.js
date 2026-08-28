document.addEventListener("DOMContentLoaded", () => {
    const portrait = document.querySelector(".profile-portrait");
    if (!portrait) return;

    const images = [...portrait.querySelectorAll(".profile-portrait__image")];
    const counter = portrait.querySelector("[data-portrait-counter]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (images.length < 2) return;

    let index = Math.max(0, images.findIndex((image) => image.classList.contains("is-active")));
    let timer = null;

    const show = (nextIndex) => {
        index = (nextIndex + images.length) % images.length;
        images.forEach((image, imageIndex) => {
            image.classList.toggle("is-active", imageIndex === index);
        });

        if (counter) {
            counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
        }
    };

    const stop = () => {
        if (timer) window.clearInterval(timer);
        timer = null;
    };

    const start = () => {
        stop();
        if (reducedMotion) return;
        timer = window.setInterval(() => show(index + 1), 3600);
    };

    portrait.addEventListener("click", () => {
        show(index + 1);
        start();
    });

    portrait.addEventListener("mouseenter", stop);
    portrait.addEventListener("mouseleave", start);
    portrait.addEventListener("focus", stop);
    portrait.addEventListener("blur", start);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stop();
        else start();
    });

    show(index);
    start();
});