(() => {
    if (!document.body.classList.contains('dev-page')) return;

    const rows = [...document.querySelectorAll('.project-row[data-project]')];
    const section = document.querySelector('.project-index');
    if (!rows.length || !section) return;

    section.classList.add('project-scene-enabled');

    const activate = (row, index) => {
        rows.forEach((item) => {
            item.classList.toggle('is-scroll-active', item === row);
            item.setAttribute('aria-current', item === row ? 'true' : 'false');
        });

        row.dispatchEvent(new Event('mouseenter'));
        document.body.dataset.activeProject = row.dataset.project || String(index + 1);
        section.dataset.activeProject = String(index + 1).padStart(2, '0');
        document.dispatchEvent(new CustomEvent('portfolio:projectchange', {
            detail: {
                index,
                project: row.dataset.project,
                title: row.dataset.title,
            },
        }));
    };

    if (!('IntersectionObserver' in window)) {
        activate(rows[0], 0);
        return;
    }

    const visibility = new Map(rows.map((row) => [row, 0]));
    let activeRow = rows[0];

    const chooseActive = () => {
        let best = activeRow;
        let score = -1;
        rows.forEach((row) => {
            const ratio = visibility.get(row) || 0;
            if (ratio > score) {
                score = ratio;
                best = row;
            }
        });

        if (best && best !== activeRow) {
            activeRow = best;
            activate(best, rows.indexOf(best));
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => visibility.set(entry.target, entry.intersectionRatio));
        chooseActive();
    }, {
        root: null,
        rootMargin: '-24% 0px -34% 0px',
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1],
    });

    rows.forEach((row, index) => {
        observer.observe(row);
        row.addEventListener('mouseenter', () => activate(row, index));
        row.addEventListener('focus', () => activate(row, index));
    });

    activate(rows[0], 0);
})();