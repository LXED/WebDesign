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

  /* scroll distance over which the bar goes from its resting tint to fully
     solid. Bigger number = slower fade. */
  var RAMP = 320;

  var ticking = false;
  var last = -1;

  function update() {
    /* rounded to 2dp so we only touch the DOM when it actually changes */
    var progress = Math.round(Math.min(window.scrollY / RAMP, 1) * 100) / 100;

    if (progress !== last) {
      last = progress;
      nav.style.setProperty('--nav-progress', progress);
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  update(); /* a reload part-way down the page must not start out clear */
}

document.addEventListener('DOMContentLoaded', function () {
  setActiveNavLink();
  initScrollHeader();
});
