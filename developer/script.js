document.addEventListener("DOMContentLoaded", () => {
    const rows = [...document.querySelectorAll(".project-row[data-project]")];
    const preview = document.querySelector(".preview-window");
    const title = document.getElementById("preview-title");
    const subtitle = document.getElementById("preview-subtitle");
    const stack = document.getElementById("preview-stack");
    const year = document.getElementById("preview-year");

    document.querySelectorAll("[data-current-year]").forEach((node) => {
        node.textContent = new Date().getFullYear();
    });

    if (!rows.length || !preview || !title || !subtitle || !stack || !year) return;

    const activate = (row) => {
        rows.forEach((item) => item.classList.toggle("is-active", item === row));

        preview.dataset.preview = row.dataset.project || "dar";
        title.textContent = row.dataset.title || "SELECTED PROJECT";
        subtitle.textContent = row.dataset.subtitle || "Project preview";
        stack.textContent = row.dataset.stack || "";
        year.textContent = row.dataset.year || "";

        const number = preview.querySelector(".preview-visual strong");
        const rowNumber = row.querySelector(".project-no");
        if (number && rowNumber) number.textContent = rowNumber.textContent;
    };

    rows.forEach((row) => {
        row.addEventListener("mouseenter", () => activate(row));
        row.addEventListener("focus", () => activate(row));
    });
});
