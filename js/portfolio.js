document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  function applyFilter(filter) {
    buttons.forEach(button => {
      button.classList.toggle('active', button.dataset.filter === filter);
    });

    cards.forEach(card => {
      card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  const requestedFilter = new URLSearchParams(window.location.search).get('filter');
  const hasRequestedFilter = Array.from(buttons).some(button => button.dataset.filter === requestedFilter);
  applyFilter(hasRequestedFilter ? requestedFilter : 'all');
});
