(() => {
    if (!document.body.classList.contains('dev-page')) return;

    const rows = [...document.querySelectorAll('.project-row[data-project]')];
    const section = document.querySelector('.project-index');
    if (!rows.length || !section) return;

    section.classList.add('project-scene-enabled');

    const heading = section.querySelector('.index-heading');
    const kicker = heading?.querySelector('.index-kicker');
    const title = heading?.querySelector('h2');
    const note = heading?.querySelector(':scope > p');
    const preview = section.querySelector('.preview-window');
    const previewTitle = document.getElementById('preview-title');
    const previewSubtitle = document.getElementById('preview-subtitle');
    const previewStack = document.getElementById('preview-stack');
    const previewRole = document.getElementById('preview-role');
    const previewYear = document.getElementById('preview-year');
    const previewImage = document.getElementById('preview-image');
    const previewLink = document.getElementById('preview-link');

    if (kicker) kicker.textContent = '01 / PROJECT INDEX';
    if (title) title.innerHTML = 'SELECTED <span>SYSTEMS.</span>';
    if (note) note.textContent = 'Choose a project. The active system takes the stage.';

    let activeRow = null;

    const syncPreview = (row, index) => {
        if (!preview) return;

        const number = row.querySelector('.project-no')?.textContent || String(index + 1).padStart(2, '0');
        preview.dataset.preview = row.dataset.project || 'dar';
        preview.dataset.stageNumber = number;

        if (previewTitle) previewTitle.textContent = row.dataset.title || 'SELECTED PROJECT';
        if (previewSubtitle) previewSubtitle.textContent = row.dataset.subtitle || 'Project preview';
        if (previewStack) previewStack.textContent = row.dataset.stack || '';
        if (previewRole) previewRole.textContent = row.dataset.role || '';
        if (previewYear) previewYear.textContent = row.dataset.year || '';

        if (previewImage && row.dataset.image) {
            previewImage.src = row.dataset.image;
            previewImage.alt = row.dataset.alt || `${row.dataset.title || 'Selected project'} visual`;
        }

        if (previewLink && row.dataset.href) previewLink.href = row.dataset.href;

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && preview.animate) {
            preview.animate(
                [
                    { opacity: 0.72, transform: 'translateY(7px) scale(0.994)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)' },
                ],
                { duration: 430, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
            );
        }
    };

    const activate = (row, index) => {
        if (!row || row === activeRow) return;
        activeRow = row;

        rows.forEach((item) => {
            const active = item === row;
            item.classList.toggle('is-scroll-active', active);
            item.classList.toggle('is-active', active);
            item.setAttribute('aria-current', active ? 'true' : 'false');
            item.style.removeProperty('opacity');
        });

        syncPreview(row, index);
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

    rows.forEach((row, index) => {
        row.addEventListener('pointerenter', () => activate(row, index));
        row.addEventListener('focus', () => activate(row, index));
    });

    activate(rows[0], 0);
})();