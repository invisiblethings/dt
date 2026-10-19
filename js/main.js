// Tom Brier site scripts: mobile menu, click-to-load YouTube players, composition filter.
(function () {
  'use strict';

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // YouTube facade: the link works without JS; with JS, clicking swaps in a privacy-friendly player.
  document.querySelectorAll('.video a[data-yt]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(a.dataset.yt) + '?autoplay=1&rel=0';
      f.title = a.dataset.title || 'Video player';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      a.replaceWith(f);
    });
  });

  // Composition table filter
  var input = document.getElementById('comp-filter');
  if (input) {
    var rows = document.querySelectorAll('#comp-table tbody tr');
    var count = document.getElementById('comp-count');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase(), n = 0;
      rows.forEach(function (r) {
        var show = !q || r.textContent.toLowerCase().indexOf(q) !== -1;
        r.hidden = !show;
        if (show) n++;
      });
      if (count) count.textContent = n + ' of ' + rows.length + ' shown';
    });
  }
})();
