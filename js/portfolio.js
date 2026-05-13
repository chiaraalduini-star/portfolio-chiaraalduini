// portfolio.js — filtri per tag multipli

document.addEventListener('DOMContentLoaded', () => {

  // Filtri pulsanti
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.portfolio-card').forEach(card => {
        const tags = card.dataset.tags || '';
        if (filter === 'all' || tags.split('|').includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Tag cliccabili dentro le card
  document.querySelectorAll('.card-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const filter = tag.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
      });
      document.querySelectorAll('.portfolio-card').forEach(card => {
        const tags = card.dataset.tags || '';
        card.style.display = tags.split('|').includes(filter) ? '' : 'none';
      });
    });
  });

});
