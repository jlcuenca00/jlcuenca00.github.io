(() => {
    const container = document.getElementById("photo-container");
    if (!container) return;

    let refreshTimer = null;

    const scheduleRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => {
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        }, 120);
    };

    const classify = (image) => {
        const frame = image.closest(".gallery-frame");
        if (!frame || !image.naturalWidth || !image.naturalHeight) return;

        const portrait = image.naturalHeight > image.naturalWidth;
        const landscape = image.naturalWidth > image.naturalHeight;

        frame.classList.remove("gallery-frame--portrait", "gallery-frame--landscape", "gallery-frame--square");

        if (portrait) {
            frame.classList.add("gallery-frame--portrait", "gallery-frame--tall");
            // Portrait work should never inherit a landscape-spanning crop.
            frame.classList.remove("gallery-frame--wide", "gallery-frame--full");
            frame.dataset.orientation = "portrait";
        } else if (landscape) {
            frame.classList.add("gallery-frame--landscape");
            // A landscape image should not be forced into the old tall treatment.
            frame.classList.remove("gallery-frame--tall");
            frame.dataset.orientation = "landscape";
        } else {
            frame.classList.add("gallery-frame--square");
            frame.classList.remove("gallery-frame--tall", "gallery-frame--wide", "gallery-frame--full");
            frame.dataset.orientation = "square";
        }

        scheduleRefresh();
    };

    const prepare = (image) => {
        if (!(image instanceof HTMLImageElement) || image.dataset.orientationReady === "true") return;
        image.dataset.orientationReady = "true";

        if (image.complete && image.naturalWidth) {
            classify(image);
        } else {
            image.addEventListener("load", () => classify(image), { once: true });
        }
    };

    const scan = (root = container) => {
        root.querySelectorAll?.(".gallery-frame img").forEach(prepare);
    };

    scan();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (!(node instanceof Element)) return;
                if (node.matches(".gallery-frame")) {
                    const image = node.querySelector("img");
                    if (image) prepare(image);
                }
                scan(node);
            });
        });
    });

    observer.observe(container, { childList: true, subtree: true });
})();
