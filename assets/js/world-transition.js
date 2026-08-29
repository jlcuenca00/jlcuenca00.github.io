(() => {
    if (!document.body.matches('.dev-page, .photography-page')) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const currentWorld = document.body.classList.contains('dev-page') ? 'dev' : 'creator';

    const overlay = document.createElement('div');
    overlay.className = 'world-transition-layer';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<span class="world-transition-label"></span>';
    document.body.appendChild(overlay);

    const label = overlay.querySelector('.world-transition-label');

    const resolveTarget = (anchor) => {
        const href = anchor.getAttribute('href') || '';
        if (href.includes('/photography/') || href.includes('../photography')) return 'creator';
        if (href.includes('/developer/') || href.includes('../developer')) return 'dev';
        return null;
    };

    const matchingLinks = [...document.querySelectorAll('a[href]')].filter((anchor) => {
        const target = resolveTarget(anchor);
        return target && target !== currentWorld;
    });

    const animateOut = (target, x, y, href) => {
        const isCreator = target === 'creator';
        overlay.className = `world-transition-layer is-running is-${target}`;
        overlay.style.setProperty('--origin-x', `${x}px`);
        overlay.style.setProperty('--origin-y', `${y}px`);
        label.textContent = isCreator ? 'ENTER // LIGHT' : 'ENTER // DATA';

        if (reduceMotion) {
            location.href = href;
            return;
        }

        const shape = isCreator
            ? [`circle(0 at ${x}px ${y}px)`, `circle(150vmax at ${x}px ${y}px)`]
            : [`polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`, 'polygon(-20vw -20vh, 120vw -20vh, 120vw 120vh, -20vw 120vh)'];

        overlay.animate([
            { clipPath: shape[0], opacity: 1 },
            { clipPath: shape[1], opacity: 1 },
        ], {
            duration: isCreator ? 760 : 650,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            fill: 'forwards',
        });

        label.animate([
            { opacity: 0, transform: 'translateY(14px)' },
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0.8, transform: 'translateY(-4px)' },
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
        });

        sessionStorage.setItem('portfolio-world-entry', target);
        setTimeout(() => { location.href = href; }, isCreator ? 620 : 540);
    };

    matchingLinks.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const target = resolveTarget(anchor);
            if (!target) return;
            event.preventDefault();
            const x = Number.isFinite(event.clientX) && event.clientX > 0 ? event.clientX : innerWidth / 2;
            const y = Number.isFinite(event.clientY) && event.clientY > 0 ? event.clientY : innerHeight / 2;
            animateOut(target, x, y, anchor.href);
        });
    });

    const entry = sessionStorage.getItem('portfolio-world-entry');
    if (entry === currentWorld && !reduceMotion) {
        sessionStorage.removeItem('portfolio-world-entry');
        overlay.className = `world-transition-layer is-entry is-${currentWorld}`;
        overlay.style.clipPath = 'inset(0)';
        label.textContent = currentWorld === 'creator' ? 'LIGHT // ONLINE' : 'DATA // ONLINE';

        overlay.animate([
            { opacity: 1, clipPath: 'inset(0 0 0 0)' },
            { opacity: 1, clipPath: currentWorld === 'creator' ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)' },
        ], {
            duration: 700,
            delay: 80,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            fill: 'forwards',
        }).finished.finally(() => {
            overlay.className = 'world-transition-layer';
            overlay.style.clipPath = '';
        });
    }
})();