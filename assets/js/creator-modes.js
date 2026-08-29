(() => {
    if (!document.body.classList.contains('photography-page')) return;

    const gallery = document.querySelector('.editorial-gallery');
    const head = document.querySelector('.selected-work .creator-section-head');
    if (!gallery || !head) return;

    const controls = document.createElement('div');
    controls.className = 'creator-view-modes';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Photography gallery view');
    controls.innerHTML = `
        <button type="button" data-gallery-mode="exhibition" class="is-active" aria-pressed="true">EXHIBITION</button>
        <span>/</span>
        <button type="button" data-gallery-mode="index" aria-pressed="false">INDEX</button>
    `;
    head.appendChild(controls);

    const buttons = [...controls.querySelectorAll('button[data-gallery-mode]')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const capture = () => new Map(
        [...gallery.querySelectorAll('.gallery-frame')].map((item) => [item, item.getBoundingClientRect()])
    );

    const animateFlip = (before) => {
        if (reduceMotion) return;
        requestAnimationFrame(() => {
            gallery.querySelectorAll('.gallery-frame').forEach((item) => {
                const first = before.get(item);
                if (!first) return;
                const last = item.getBoundingClientRect();
                const dx = first.left - last.left;
                const dy = first.top - last.top;
                const sx = first.width / Math.max(last.width, 1);
                const sy = first.height / Math.max(last.height, 1);

                item.animate([
                    {
                        transformOrigin: 'top left',
                        transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
                        opacity: 0.72,
                    },
                    {
                        transformOrigin: 'top left',
                        transform: 'translate(0, 0) scale(1, 1)',
                        opacity: 1,
                    },
                ], {
                    duration: 720,
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    fill: 'both',
                });
            });
        });
    };

    const setMode = (mode) => {
        const indexMode = mode === 'index';
        const before = capture();
        document.body.classList.toggle('creator-index-mode', indexMode);
        document.body.dataset.galleryMode = indexMode ? 'index' : 'exhibition';

        buttons.forEach((button) => {
            const active = button.dataset.galleryMode === mode;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        animateFlip(before);
        sessionStorage.setItem('creator-gallery-mode', mode);
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => setMode(button.dataset.galleryMode || 'exhibition'));
    });

    const saved = sessionStorage.getItem('creator-gallery-mode');
    if (saved === 'index') setMode('index');
    else document.body.dataset.galleryMode = 'exhibition';
})();