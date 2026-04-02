// portfolio.js — logica filtri e URL params

document.addEventListener('DOMContentLoaded', () => {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  // Legge il filtro dall'URL (?filter=branding)
  const params = new URLSearchParams(window.location.search);
  const urlFilter = params.get('filter') || 'all';

  function applyFilter(filter) {
    btns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
    cards.forEach(c => {
      const show = filter === 'all' || c.dataset.category === filter;
      c.style.display = show ? '' : 'none';
    });
  }

  applyFilter(urlFilter);

  btns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });
});
