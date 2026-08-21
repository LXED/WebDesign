/* ---------- ACTIVE NAV LINK ---------- */

/* Marks the current page in the header. This lives in JS so the nav markup can
   stay character-identical in all three HTML files. Works under file:// too. */
function setActiveNavLink() {
  var current = pageName(window.location.pathname);

  document.querySelectorAll('.navbar .menu a').forEach(function (link) {
    /* skip the Wiki and anything else pointing off-site */
    if (link.host !== window.location.host) return;

    if (pageName(link.pathname) === current) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

/* last path segment, with a bare directory treated as index.html */
function pageName(pathname) {
  var last = pathname.split('/').pop();
  return last === '' ? 'index.html' : last.toLowerCase();
}

/* ---------- HEADER: TRANSPARENT OVER THE VIDEO, SOLID ONCE SCROLLED ---------- */

function initScrollHeader() {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  var ticking = false;

  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 80);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  update(); /* a reload part-way down the page has to start out solid */
}

/* ---------- DEMO BUTTON ---------- */

function initDemoButton() {
  var actionBtn = document.getElementById('action-btn');
  var message = document.getElementById('message');

  if (!actionBtn || !message) return;

  actionBtn.addEventListener('click', function () {
    message.textContent = 'Hello! You clicked the button.';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setActiveNavLink();
  initScrollHeader();
  initDemoButton();
});
