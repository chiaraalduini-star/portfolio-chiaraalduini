/* main.js — Chiara Alduini Portfolio
   Runs on all pages. No conflicts. */

// ── Header scroll border ──
;(function () {
  var hdr = document.querySelector('header');
  if (!hdr) return;
  window.addEventListener('scroll', function () {
    hdr.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}());

// Apply the shared editorial treatment to text links, excluding navigation and controls.
;(function () {
  var excludedSelector = '.logo, .project-card, .case-card, .pillar, .portfolio-cta-link, .about-cta, .filter-bar, .cv-btn, #cookie-banner';

  document.querySelectorAll('a[href]').forEach(function (link) {
    if (link.closest(excludedSelector)) return;
    if (link.classList.contains('pillar-tag') && !link.closest('.lab-case-content, .lab-next-project')) return;
    link.classList.add('editorial-link');
  });

  document.querySelectorAll('.case-cta, .pillar h3, .pillar .pillar-tag').forEach(function (link) {
    link.classList.add('editorial-link');
  });
}());

// Metadata tags are informational and must not trigger their parent card links.
;(function () {
  var tagSelector = '.case-tag-item, .project-tag, .case-tag, .tag';

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!(target instanceof Element) || !target.closest(tagSelector) || !target.closest('a')) return;

    e.preventDefault();
    e.stopPropagation();
  }, true);
}());

// Count email-link intent only after Analytics consent; a click is not a sent enquiry.
;(function () {
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;
    var link = target.closest('a[href^="mailto:"]');
    if (!link || localStorage.getItem('cookie-consent') !== 'accepted' ||
        window['ga-disable-G-3Y2FTS95M5'] !== false || typeof window.gtag !== 'function') return;

    window.gtag('event', 'contact_email_click');
  });
}());

// ── Scroll reveal ──
;(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length || !window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  els.forEach(function (el) { io.observe(el); });
}());

// ── Hamburger menu ──
;(function () {
  var btn  = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-nav');
  if (!btn || !menu) return;
  var editionsToggle = menu.querySelector('.mobile-submenu-toggle');
  var editionsSubmenu = menu.querySelector('#mobile-editions-submenu');
  var header = document.getElementById('header');

  function closeEditions() {
    if (!editionsToggle || !editionsSubmenu) return;
    editionsToggle.setAttribute('aria-expanded', 'false');
    editionsToggle.setAttribute('aria-label', 'Show Editions collections');
    editionsToggle.querySelector('span').textContent = '+';
    editionsSubmenu.hidden = true;
    menu.classList.remove('submenu-open');
  }

  function openMenu() {
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('open');
    if (header) header.classList.add('menu-open');
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    closeEditions();
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('open');
    if (header) header.classList.remove('menu-open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Toggle on button click
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (editionsToggle && editionsSubmenu) {
    editionsToggle.addEventListener('click', function () {
      var expanded = editionsToggle.getAttribute('aria-expanded') !== 'true';
      editionsToggle.setAttribute('aria-expanded', String(expanded));
      editionsToggle.setAttribute('aria-label', expanded ? 'Hide Editions collections' : 'Show Editions collections');
      editionsToggle.querySelector('span').textContent = expanded ? '−' : '+';
      editionsSubmenu.hidden = !expanded;
      menu.classList.toggle('submenu-open', expanded);
    });
  }

  // Close on menu link click
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') &&
        !menu.contains(e.target) &&
        !btn.contains(e.target)) {
      closeMenu();
    }
  });
}());
