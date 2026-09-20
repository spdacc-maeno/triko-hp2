/* ==========================================================
   TRIKO site script (vanilla JS, no dependencies)
   - header state on scroll
   - desktop dropdown (keyboard)
   - mobile navigation overlay
   - scroll reveal / figure animation triggers
   - footer year
   ========================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header ---------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- desktop dropdown ---------- */
  document.querySelectorAll('.nav__item--sub').forEach(function (item) {
    var toggle = item.querySelector('.nav__sub-toggle');
    if (!toggle) return;

    var setOpen = function (open) {
      item.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    toggle.addEventListener('click', function () {
      setOpen(!item.classList.contains('is-open'));
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!item.contains(e.target)) setOpen(false);
    });

    item.addEventListener('mouseleave', function () {
      setOpen(false);
    });
  });

  /* ---------- mobile nav ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    var focusables = 'a[href], button:not([disabled])';
    var lastFocus = null;

    var openNav = function () {
      lastFocus = document.activeElement;
      mobileNav.hidden = false;
      document.body.classList.add('nav-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'メニューを閉じる');
      var first = mobileNav.querySelector(focusables);
      if (first) first.focus();
    };

    var closeNav = function () {
      mobileNav.hidden = true;
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'メニューを開く');
      if (lastFocus) lastFocus.focus();
    };

    navToggle.addEventListener('click', function () {
      if (mobileNav.hidden) openNav();
      else closeNav();
    });

    mobileNav.querySelectorAll('a[href]').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (mobileNav.hidden) return;
      if (e.key === 'Escape') {
        closeNav();
        return;
      }
      if (e.key === 'Tab') {
        var items = Array.prototype.filter.call(
          mobileNav.querySelectorAll(focusables),
          function (el) { return el.offsetParent !== null; }
        );
        items.unshift(navToggle);
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    mobileNav.querySelectorAll('.mobile-nav__sub-toggle').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.hidden = open;
      });
    });

    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) {
      if (e.matches && !mobileNav.hidden) closeNav();
    });
  }

  /* ---------- reveal & figures ---------- */
  var revealTargets = document.querySelectorAll('[data-reveal], [data-fig]');
  if (revealTargets.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
      revealTargets.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    var y = new Date().getFullYear();
    if (y > 2026) el.textContent = String(y);
  });
})();
