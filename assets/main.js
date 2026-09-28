// Baltimore Composers' Forum: small enhancements, no dependencies.
(function () {
  "use strict";

  /* ---------- Name → melody (French musical cryptogram) ----------
     A–G map to themselves; H–N, O–U and V–Z wrap around onto A–G again.
     This is the system Ravel, Debussy and others used in 1909 to spell HAYDN
     (B-A-D-D-G). */
  var LETTERS = "ABCDEFG";
  // staff step (0 = bottom line E4) and frequency for each pitch class, D4..C5
  var PITCH = {
    D: { step: -1, freq: 293.66, name: "D" },
    E: { step: 0, freq: 329.63, name: "E" },
    F: { step: 1, freq: 349.23, name: "F" },
    G: { step: 2, freq: 392.0, name: "G" },
    A: { step: 3, freq: 440.0, name: "A" },
    B: { step: 4, freq: 493.88, name: "B" },
    C: { step: 5, freq: 523.25, name: "C" }
  };

  function encode(text) {
    var out = [];
    text.toUpperCase().replace(/[^A-Z]/g, "").split("").forEach(function (ch) {
      // H keeps its German meaning (B natural), as in the 1909 HAYDN tributes.
      var note = ch === "H" ? "B" : LETTERS[(ch.charCodeAt(0) - 65) % 7];
      out.push({ from: ch, note: note });
    });
    return out.slice(0, 16);
  }

  var svg = document.getElementById("staff");
  var form = document.getElementById("motif-form");
  var input = document.getElementById("motif-name");
  var shareBtn = document.getElementById("motif-share");
  var lettersOut = document.getElementById("motif-letters");
  if (svg && form && input) {
    var NS = "http://www.w3.org/2000/svg";
    var GAP = 12, BOTTOM = 84, STEP_W = 34, LEFT = 26;
    var current = [];
    var ctx = null;
    var playing = false;

    var el = function (tag, attrs) {
      var n = document.createElementNS(NS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    };
    var yOf = function (step) { return BOTTOM - step * (GAP / 2); };

    function render() {
      current = encode(input.value);
      var n = Math.max(current.length, 6);
      var width = LEFT + n * STEP_W + 14;
      svg.setAttribute("viewBox", "0 22 " + width + " 102");
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      for (var i = 0; i < 5; i++) {
        var y = BOTTOM - i * GAP;
        svg.appendChild(el("line", { x1: 4, x2: width - 4, y1: y, y2: y, class: "line" }));
      }
      svg.appendChild(el("line", { x1: 4, x2: 4, y1: BOTTOM - 4 * GAP, y2: BOTTOM, class: "line" }));
      svg.appendChild(el("line", { x1: width - 4, x2: width - 4, y1: BOTTOM - 4 * GAP, y2: BOTTOM, class: "line" }));

      current.forEach(function (c, idx) {
        var p = PITCH[c.note];
        var x = LEFT + idx * STEP_W + STEP_W / 2;
        var y = yOf(p.step);
        var g = el("g", { class: "note", "data-i": idx, tabindex: "-1" });
        var up = p.step < 4;
        g.appendChild(el("ellipse", { cx: x, cy: y, rx: 6.6, ry: 4.7, transform: "rotate(-20 " + x + " " + y + ")" }));
        g.appendChild(up
          ? el("line", { x1: x + 6, x2: x + 6, y1: y - 1, y2: y - 34, class: "stem" })
          : el("line", { x1: x - 6, x2: x - 6, y1: y + 1, y2: y + 34, class: "stem" }));
        var label = el("text", { x: x, y: 118, class: "letter" });
        label.textContent = c.from === c.note ? c.note : c.from + "→" + c.note;
        g.appendChild(label);
        g.addEventListener("click", function () { playOne(idx); });
        svg.appendChild(g);
      });

      if (lettersOut) {
        lettersOut.innerHTML = current.length
          ? "Your melody: <b>" + current.map(function (c) { return c.note; }).join(" ") + "</b>"
          : "Type some letters to hear them.";
      }
    }

    function audio() {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }

    // A soft, piano-like tone: a few decaying partials.
    function tone(freq, when, dur) {
      var a = audio();
      if (!a) return;
      var out = a.createGain();
      out.gain.setValueAtTime(0.0001, when);
      out.gain.exponentialRampToValueAtTime(0.32, when + 0.008);
      out.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      out.connect(a.destination);
      [[1, "triangle", 1], [2, "sine", 0.35], [3, "sine", 0.12]].forEach(function (h) {
        var o = a.createOscillator();
        var g = a.createGain();
        o.type = h[1];
        o.frequency.value = freq * h[0];
        g.gain.value = h[2];
        o.connect(g); g.connect(out);
        o.start(when); o.stop(when + dur + 0.05);
      });
    }

    function light(idx, ms) {
      var g = svg.querySelector('.note[data-i="' + idx + '"]');
      if (!g) return;
      g.classList.add("on");
      setTimeout(function () { g.classList.remove("on"); }, ms);
    }

    function playOne(idx) {
      var a = audio();
      if (!a || !current[idx]) return;
      tone(PITCH[current[idx].note].freq, a.currentTime + 0.01, 1.4);
      light(idx, 320);
    }

    function playAll() {
      var a = audio();
      if (!a || playing || !current.length) return;
      playing = true;
      var beat = 0.3, t0 = a.currentTime + 0.05;
      current.forEach(function (c, idx) {
        var last = idx === current.length - 1;
        tone(PITCH[c.note].freq, t0 + idx * beat, last ? 2.2 : 1.3);
        setTimeout(function () { light(idx, last ? 700 : 260); }, (idx * beat + 0.05) * 1000);
      });
      setTimeout(function () { playing = false; }, current.length * beat * 1000 + 300);
    }

    var params = new URLSearchParams(location.search);
    if (params.get("name")) input.value = params.get("name").slice(0, 18);

    input.addEventListener("input", render);
    form.addEventListener("submit", function (e) { e.preventDefault(); playAll(); });

    if (shareBtn) {
      shareBtn.addEventListener("click", function () {
        var url = location.origin + location.pathname + "?name=" + encodeURIComponent(input.value.trim());
        var text = "Here's what \"" + input.value.trim() + "\" sounds like as a melody:";
        var done = function (msg) {
          shareBtn.textContent = msg;
          setTimeout(function () { shareBtn.textContent = "Share"; }, 1800);
        };
        if (navigator.share) {
          navigator.share({ title: "Baltimore Composers' Forum", text: text, url: url }).catch(function () {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(function () { done("Link copied"); }, function () { done("Copy failed"); });
        } else {
          window.prompt("Copy this link:", url);
        }
      });
    }

    render();
  }

  /* ---------- Composer search ---------- */
  var search = document.getElementById("composer-search");
  var roster = document.getElementById("roster");
  var empty = document.getElementById("roster-empty");
  if (search && roster) {
    var items = Array.prototype.slice.call(roster.children);
    items.forEach(function (li) { li.dataset.name = li.textContent; });
    var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (li) {
        var name = li.dataset.name;
        var i = name.toLowerCase().indexOf(q);
        var hit = !q || i !== -1;
        li.hidden = !hit;
        if (hit) shown++;
        // Highlight inside the composer's link when they have one, so it survives filtering.
        var target = li.querySelector("a") || li;
        target.innerHTML = q && hit
          ? esc(name.slice(0, i)) + "<mark>" + esc(name.slice(i, i + q.length)) + "</mark>" + esc(name.slice(i + q.length))
          : esc(name);
      });
      if (empty) empty.hidden = shown !== 0;
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
