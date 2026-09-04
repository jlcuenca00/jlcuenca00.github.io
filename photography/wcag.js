(() => {
    const start = () => {
        const main = document.querySelector('main');
        if (main && !main.id) main.id = 'main-content';

        if (!document.querySelector('.skip-link')) {
            const skip = document.createElement('a');
            skip.className = 'skip-link';
            skip.href = '#main-content';
            skip.textContent = 'Skip to main content';
            document.body.prepend(skip);
        }

        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.setAttribute('aria-labelledby', 'lightbox-caption-text');
            const caption = document.querySelector('.lightbox-caption');
            const captionText = document.getElementById('lightbox-text');
            if (caption) caption.setAttribute('aria-live', 'polite');
            if (captionText) captionText.id = 'lightbox-caption-text';

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
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
