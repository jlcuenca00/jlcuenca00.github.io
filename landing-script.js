// Both portfolio destinations remain ordinary links, including with JavaScript off.
(() => {
  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = new Date().getFullYear();
  });
})();
