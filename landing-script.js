document.addEventListener("DOMContentLoaded", () => {
    const landing = document.querySelector(".landing");
    const paths = document.querySelectorAll(".path[href]");
    const year = document.querySelector("[data-current-year]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (!landing || prefersReducedMotion) return;

    paths.forEach((path) => {
        path.addEventListener("click", (event) => {
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const destination = path.href;
            if (!destination) return;

            event.preventDefault();
            path.classList.add("is-selected");
            landing.classList.add("is-leaving");

            window.setTimeout(() => {
                window.location.assign(destination);
            }, 180);
        });
    });
});

window.addEventListener("pageshow", () => {
    const landing = document.querySelector(".landing");
    if (!landing) return;

    landing.classList.remove("is-leaving");
    document.querySelectorAll(".path.is-selected").forEach((path) => {
        path.classList.remove("is-selected");
    });
});
