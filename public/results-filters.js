(() => {
  function init() {
    const root = document.querySelector('[data-results-index]');
    if (!root || root.dataset.filtersReady) return;
    const form = root.querySelector('form');
    const cards = Array.from(root.querySelectorAll('[data-result-year]'));
    const count = root.querySelector('[data-results-count]');
    const empty = root.querySelector('[data-results-empty]');
    if (!form || !count || !empty) return;
    root.dataset.filtersReady = 'true';
    const update = () => {
      const year = form.elements.namedItem('year').value;
      const sport = form.elements.namedItem('sport').value;
      const category = form.elements.namedItem('category').value;
      let shown = 0;
      for (const card of cards) {
        card.hidden = !((!year || card.dataset.resultYear === year) &&
          (!sport || card.dataset.resultSports.split(' ').includes(sport)) &&
          (!category || card.dataset.resultCategory === category));
        if (!card.hidden) shown++;
      }
      count.textContent = String(shown);
      empty.hidden = shown !== 0;
    };
    form.addEventListener('change', update);
    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('reset', () => setTimeout(update, 0));
    form.hidden = false;
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
