/* =========================================================
   Bernard Katada — portfolio
   Small progressive-enhancement layer. The page is fully
   readable and navigable with JavaScript disabled.
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    // No animation support (or the user asked for none): show everything now.
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    // Anything already on screen is shown straight away rather than being left
    // to the observer. The negative rootMargin above pulls the trigger line up
    // above the viewport floor, and the honour goes to elements sitting just
    // above it — the hero's social tiles land below the line in a 100svh hero
    // and would otherwise stay at opacity 0 until the first scroll.
    requestAnimationFrame(function () {
      var vh = window.innerHeight;
      revealables.forEach(function (el) {
        if (el.getBoundingClientRect().top < vh) {
          el.classList.add('is-in');
        } else {
          revealObserver.observe(el);
        }
      });
    });
  }

  /* ---------- nav: solidify once the hero starts scrolling away ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var ticking = false;
    var syncNav = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 24);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(syncNav);
    }, { passive: true });
    syncNav();
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
