/* Mold Remediation NYC: progressive enhancement. Every form works without this file. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var track = function (name, params) { try { if (window.gtag) window.gtag('event', name, params || {}); } catch (e) {} };

  /* ---------- mobile nav ---------- */
  var toggle = $('.nav-toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var open = d.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  /* ---------- live NYC clock in the top bar ---------- */
  var clock = $('[data-nyc-clock]');
  function tick() {
    try {
      var t = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }).format(new Date());
      var h = +new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }).format(new Date());
      var late = h < 7 || h >= 21;
      clock.textContent = 'It’s ' + t + ' in NYC. ' + (late ? 'Yes, we’re still answering.' : 'We’re open 24 hours.');
    } catch (e) {}
  }
  if (clock) { tick(); setInterval(tick, 30000); }

  /* ---------- call tracking ---------- */
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-track="call"]');
    if (a) track('phone_call_click', { page: location.pathname });
  });

  /* ---------- ZIP checker ---------- */
  var zipData = $('#zip-data');
  $$('[data-zipcheck]').forEach(function (box) {
    if (!zipData) return;
    var data = JSON.parse(zipData.textContent);
    var input = $('input', box), out = $('.zip-out', box), btn = $('button', box);
    function miles(a, b) {
      var R = 3958.8, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
      var x = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.pow(Math.sin(dLng / 2), 2);
      return 2 * R * Math.asin(Math.sqrt(x));
    }
    function check() {
      var z = (input.value || '').replace(/\D/g, '').slice(0, 5);
      if (z.length < 5) { out.textContent = 'Enter a 5-digit ZIP code.'; return; }
      var hood = data.hoods.filter(function (h) { return h.z.indexOf(z) > -1; })[0];
      var boro = data.pre.filter(function (p) { return p.p.some(function (x) { return z.indexOf(x) === 0; }); })[0];
      track('zip_check', { zip: z });
      if (hood) {
        out.innerHTML = '<span class="yes">✓ Yes, we cover ' + z + '.</span> ' + hood.n + ', ' + hood.b + ' is about ' + miles(data.hq, hood).toFixed(1) + ' miles from our Flatbush base. <a href="' + hood.u + '">See ' + hood.n + ' →</a>';
      } else if (boro) {
        out.innerHTML = '<span class="yes">✓ Yes, we cover ' + z + ' in ' + boro.b + '.</span> Open 24 hours. <a href="' + boro.u + '">Mold removal in ' + boro.b + ' →</a>';
      } else {
        out.innerHTML = 'That ZIP looks outside the five boroughs. Call <a href="tel:+13473691545">(347) 369-1545</a> and we will tell you if we can help.';
      }
    }
    btn.addEventListener('click', check);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); check(); } });
    input.addEventListener('input', function () { if (input.value.replace(/\D/g, '').length === 5) check(); });
  });

  /* ---------- mold clock ---------- */
  $$('[data-moldclock]').forEach(function (c) {
    var range = $('input[type=range]', c), stages = $$('.stage', c), time = $('[data-mc-time]', c);
    var levels = stages.map(function (s) { return (s.className.match(/stage-(\w+)/) || [])[1]; });
    function set(i) {
      stages.forEach(function (s, k) { s.hidden = k !== i; });
      c.dataset.stage = i;
      c.dataset.level = levels[i];
      c.style.setProperty('--p', Math.max(5, (i / (stages.length - 1)) * 100));
      var label = $('h3 span', stages[i]).textContent;
      time.textContent = label;
      range.setAttribute('aria-valuetext', label + ': ' + $('h3', stages[i]).lastChild.textContent);
    }
    range.addEventListener('input', function () { set(+range.value); });
    range.addEventListener('change', function () { track('mold_clock', { stage: range.value }); });
    set(0);
  });

  /* ---------- building explorer ---------- */
  $$('[data-explorer]').forEach(function (bx) {
    var btns = $$('[data-spot-btn]', bx), hots = $$('.hot', bx);
    function open(i, scroll) {
      btns.forEach(function (b, k) {
        var on = k === i;
        b.setAttribute('aria-expanded', on);
        b.nextElementSibling.hidden = !on;
      });
      hots.forEach(function (h, k) { h.classList.toggle('on', k === i); });
      if (scroll && window.innerWidth < 900) btns[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    btns.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
    hots.forEach(function (h, i) { h.addEventListener('click', function () { open(i, true); track('hotspot', { id: i }); }); });
    open(1);
  });

  /* ---------- multi-step estimate form ---------- */
  $$('form[data-steps]').forEach(function (f) {
    var steps = $$('.step', f), dots = $$('.stepper li', f), cur = 0;
    function show(i) {
      cur = i;
      steps.forEach(function (s, k) { s.classList.toggle('active', k === i); });
      dots.forEach(function (li, k) { li.classList.toggle('on', k === i); li.classList.toggle('done', k < i); });
    }
    function valid(step) {
      var ok = true;
      $$('input, select, textarea', step).forEach(function (el) {
        el.classList.remove('err');
        if (!el.checkValidity()) { el.classList.add('err'); if (ok) el.focus(); ok = false; }
      });
      return ok;
    }
    $$('[data-next]', f).forEach(function (b) { b.addEventListener('click', function () { if (valid(steps[cur])) { show(cur + 1); track('form_step', { step: cur + 1 }); } }); });
    $$('[data-prev]', f).forEach(function (b) { b.addEventListener('click', function () { show(cur - 1); }); });
    f.addEventListener('submit', function (e) {
      for (var i = 0; i < steps.length; i++) { if (!valid(steps[i])) { e.preventDefault(); show(i); return; } }
      track('generate_lead', { form: 'estimate', page: location.pathname });
    });
    show(0);
  });
  $$('form.form-callback').forEach(function (f) { f.addEventListener('submit', function () { track('generate_lead', { form: 'callback', page: location.pathname }); }); });

  /* ---------- photo form: previews + client-side compression (Netlify limit: 8 MB/request) ---------- */
  $$('form[data-photo-form]').forEach(function (f) {
    var MAX = 7.5 * 1024 * 1024;
    $$('[data-drop] input[type=file]', f).forEach(function (input) {
      input.addEventListener('change', function () {
        var file = input.files && input.files[0], prev = input.parentNode.querySelector('.drop-preview');
        if (!file) { prev.hidden = true; return; }
        prev.src = URL.createObjectURL(file); prev.hidden = false;
        if (file.size < 900 * 1024 || !window.DataTransfer || !/^image\/(jpe?g|png|webp|heic)/i.test(file.type)) return;
        var img = new Image();
        img.onload = function () {
          var s = Math.min(1, 1800 / Math.max(img.width, img.height)), c = d.createElement('canvas');
          c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(function (blob) {
            if (!blob || blob.size >= file.size) return;
            try {
              var dt = new DataTransfer();
              dt.items.add(new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }));
              input.files = dt.files;
            } catch (e) {}
          }, 'image/jpeg', 0.82);
        };
        img.src = prev.src;
      });
    });
    f.addEventListener('submit', function (e) {
      var total = $$('input[type=file]', f).reduce(function (n, i) { return n + (i.files[0] ? i.files[0].size : 0); }, 0);
      if (total > MAX) {
        e.preventDefault();
        var note = $('[data-size-note]', f);
        note.innerHTML = '<b style="color:#c8321f">Those photos are too large together (' + (total / 1048576).toFixed(1) + ' MB). Remove one or send smaller photos.</b>';
        return;
      }
      track('generate_lead', { form: 'photo-quote' });
    });
  });

  /* ---------- lazy Google Map (loads near viewport, or on tap) ---------- */
  $$('[data-map]').forEach(function (m) {
    function load() {
      if (m.dataset.loaded) return; m.dataset.loaded = 1;
      var f = d.createElement('iframe');
      f.src = m.dataset.map; f.loading = 'lazy'; f.title = 'Google Map: Mold Remediation NYC, 1138 Ocean Ave, Brooklyn';
      f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
      m.appendChild(f);
      f.addEventListener('load', function () { var b = $('.map-facade', m); if (b) b.remove(); });
    }
    $('.map-facade', m).addEventListener('click', load);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { load(); io.disconnect(); } }, { rootMargin: '300px' });
      io.observe(m);
    }
  });

  /* ---------- cost estimator ---------- */
  var est = $('[data-estimator]');
  if (est) {
    var E = JSON.parse($('#est-data').textContent);
    var fmt = function (n) { return '$' + (Math.round(n / 50) * 50).toLocaleString('en-US'); };
    var pick = function (name, list) { var v = (est.querySelector('input[name="' + name + '"]:checked') || {}).value; return list.filter(function (x) { return x.id === v; })[0] || list[0]; };
    var summary = '';
    function calc() {
      var s = pick('e-size', E.sizes), l = pick('e-loc', E.locations), c = pick('e-cond', E.conditions), rb = $('#e-rebuild').checked;
      var f = l.f * c.f, lo = s.low * f, hi = s.high * f, rlo = rb ? s.rebuild[0] * c.f : 0, rhi = rb ? s.rebuild[1] * c.f : 0;
      $('[data-est-rem]', est).textContent = fmt(lo) + ' – ' + fmt(hi);
      $('[data-est-reb]', est).textContent = rb ? fmt(rlo) + ' – ' + fmt(rhi) : 'Not included';
      $('[data-est-total]', est).textContent = fmt(lo + rlo) + ' – ' + fmt(hi + rhi) + (s.id === 'x' ? '+' : '');
      summary = 'Cost estimator: ' + s.label + ', ' + l.label + ', ' + c.label + (rb ? ', with rebuild' : '') + ' → ' + $('[data-est-total]', est).textContent;
    }
    est.addEventListener('change', calc); calc();
    $('[data-est-send]', est).addEventListener('click', function () {
      var f = $('#estimate form') || $('form[name="estimate"]');
      if (f) { f.elements.details.value = summary; track('estimator_send'); }
    });
  }

  /* ---------- mold risk check ---------- */
  var quiz = $('[data-quiz]');
  if (quiz) {
    var qs = $$('.q', quiz), bar = $('[data-quiz-bar]', quiz), res = $('[data-quiz-result]', quiz), answers = [];
    var go = function (i) { qs.forEach(function (q, k) { q.hidden = k !== i; }); res.hidden = i < qs.length; bar.style.width = (i / qs.length * 100) + '%'; };
    qs.forEach(function (q, i) {
      $$('.q-opt', q).forEach(function (b) {
        b.addEventListener('click', function () {
          answers[i] = { p: +b.dataset.pts, q: $('legend', q).lastChild.textContent, a: b.dataset.label };
          if (i + 1 < qs.length) go(i + 1); else finish();
        });
      });
    });
    $$('[data-quiz-back]', quiz).forEach(function (b) { b.addEventListener('click', function () { var i = qs.indexOf(b.closest('.q')); go(i - 1); }); });
    $('[data-quiz-restart]', quiz).addEventListener('click', function () { answers = []; go(0); });
    function finish() {
      var score = answers.reduce(function (n, a) { return n + a.p; }, 0), max = 26, r;
      if (score <= 5) r = ['Likely surface mildew: a cleaning job', 'From your answers, this sounds like surface growth you can probably clean yourself. Keep an eye on it: if it comes back within a few weeks, there is moisture in the material.', ['Wear gloves and an N95 mask; ventilate the room.', 'Clean non-porous surfaces with detergent and water, then dry thoroughly.', 'Run the bathroom fan for 30 minutes after showers, or crack a window.', 'If it returns, <a href="/photo-quote/">send us photos</a>.']];
      else if (score <= 11) r = ['Possible hidden moisture: worth a professional look', 'Some of your answers point to moisture inside the building materials, not just on the surface. A free on-site estimate will tell you how far it goes before it gets bigger.', ['Don’t paint over it or scrub it hard; that spreads spores.', 'Find and fix any leak, or report it to your landlord or super.', 'Take photos now for your records.']];
      else r = ['Remediation job: call a licensed pro', 'Your answers suggest mold growing in building materials and likely a bigger area than you can see. That is professional remediation, and over 10 sq ft New York requires a licensed assessor and a licensed remediator.', ['Keep the room closed off and avoid disturbing the mold.', 'Stop any active water source if you can.', 'Call us for a free on-site estimate. We answer 24/7.']];
      $('[data-r-title]', res).textContent = r[0];
      $('[data-r-text]', res).textContent = r[1];
      $('[data-r-tips]', res).innerHTML = '<ul class="ticks">' + r[2].map(function (t) { return '<li>✓ ' + t + '</li>'; }).join('') + '</ul>';
      $('[data-r-meter]', res).style.left = 'calc(' + Math.min(100, score / max * 100) + '% - 3px)';
      go(qs.length);
      var f = $('#estimate form') || $('form[name="estimate"]');
      if (f) f.elements.details.value = 'Mold Risk Check (' + score + '/' + max + ', ' + r[0] + '): ' + answers.map(function (a) { return a.q + ' → ' + a.a; }).join(' | ');
      track('risk_check_complete', { score: score });
      res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
})();
