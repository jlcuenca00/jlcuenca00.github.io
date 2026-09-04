(() => {
    const start = () => {
        const main = document.querySelector('main');
        if (main) {
            if (!main.id) main.id = 'main-content';
            main.setAttribute('tabindex', '-1');
        }

        if (!document.querySelector('.skip-link')) {
            const skip = document.createElement('a');
            skip.className = 'skip-link';
            skip.href = '#main-content';
            skip.textContent = 'Skip to main content';
            skip.addEventListener('click', () => requestAnimationFrame(() => main?.focus({ preventScroll: true })));
            document.body.prepend(skip);
        }

        const gallery = document.getElementById('photo-container');
        if (gallery) gallery.removeAttribute('aria-live');

        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.removeAttribute('aria-label');
            lightbox.setAttribute('aria-labelledby', 'lightbox-text');
            lightbox.setAttribute('aria-describedby', 'lightbox-count');

            const caption = document.querySelector('.lightbox-caption');
            if (caption) caption.setAttribute('aria-live', 'polite');

            const pageRegions = [
                document.querySelector('.creator-nav'),
                document.querySelector('main'),
                document.querySelector('.creator-footer')
            ].filter(Boolean);

            const syncDialogIsolation = () => {
                const open = lightbox.classList.contains('active') && lightbox.getAttribute('aria-hidden') !== 'true';
                pageRegions.forEach(region => {
                    if (open) region.setAttribute('inert', '');
                    else region.removeAttribute('inert');
                });
            };

            const observer = new MutationObserver(syncDialogIsolation);
            observer.observe(lightbox, { attributes: true, attributeFilter: ['class', 'aria-hidden'] });
            syncDialogIsolation();

            lightbox.addEventListener('keydown', event => {
                if (event.key !== 'Tab' || !lightbox.classList.contains('active')) return;
                const focusable = [...lightbox.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')]
                    .filter(element => !element.hasAttribute('hidden') && element.getClientRects().length > 0);
                if (!focusable.length) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            });
        }

        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            if (link.dataset.wcagNewTab === 'true') return;
            link.dataset.wcagNewTab = 'true';
            const existing = link.getAttribute('aria-label');
            const label = existing || link.textContent.trim().replace(/\s+/g, ' ');
            if (label && !/new tab/i.test(label)) link.setAttribute('aria-label', `${label} — opens in a new tab`);
        });

        document.querySelectorAll('main > section[id]').forEach(section => section.setAttribute('tabindex', '-1'));
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
