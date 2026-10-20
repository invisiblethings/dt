/* AXE Contracting Group: progressive enhancement only. Every page works without JS. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (_) {}
    return null;
  }

  /* ---- theme: vellum <-> blueprint */
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cur = doc.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = cur === "dark" ? "light" : "dark";
      doc.dataset.theme = next;
      store("axe-theme", next);
    });
  });

  /* ---- mobile menu */
  var menu = document.querySelector(".menu");
  var nav = document.getElementById("nav");
  if (menu && nav) {
    menu.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menu.setAttribute("aria-expanded", "false");
        menu.focus();
      }
    });
  }

  /* ---- draw-in on scroll (drawings + gantt) */
  var drawables = document.querySelectorAll(".drawing, .gantt");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-drawn");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    drawables.forEach(function (d) { io.observe(d); });
  } else {
    drawables.forEach(function (d) { d.classList.add("is-drawn"); });
  }

  /* ---- hero: drawing <-> built slider */
  var build = document.querySelector(".build");
  if (build) {
    var range = build.querySelector(".build__range");
    var set = function (v) { build.style.setProperty("--pos", v + "%"); };
    range.addEventListener("input", function () { set(range.value); });
    if (!reduce) {
      // one slow sweep on load so people see it's interactive
      var t0 = null, from = 92, to = 50, dur = 1600, touched = false;
      range.addEventListener("pointerdown", function () { touched = true; });
      range.addEventListener("keydown", function () { touched = true; });
      var step = function (t) {
        if (touched) return;
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var v = from + (to - from) * eased;
        set(v);
        range.value = v;
        if (p < 1) requestAnimationFrame(step);
      };
      set(from);
      setTimeout(function () { requestAnimationFrame(step); }, 500);
    }
  }

  /* ---- scope builder -> project summary */
  var sb = document.querySelector("[data-scope-builder]");
  var form = document.querySelector(".form");
  if (sb && form) {
    var msg = form.querySelector("[name=message]");
    var svc = form.querySelector("[name=service]");
    var labels = { type: "Project", building: "Building", size: "Size", timing: "Timing", extras: "Notes" };
    var auto = "";
    var compose = function () {
      var lines = [];
      Object.keys(labels).forEach(function (g) {
        var on = Array.prototype.map.call(sb.querySelectorAll('.chip[data-group="' + g + '"][aria-pressed="true"]'), function (c) { return c.textContent; });
        if (on.length) lines.push(labels[g] + ": " + on.join(", "));
      });
      // replace only the block the builder wrote; keep whatever the visitor typed
      var typed = auto && msg.value.indexOf(auto) === 0 ? msg.value.slice(auto.length) : msg.value;
      auto = lines.length ? lines.join("\n") + "\n\n" : "";
      msg.value = auto + typed;
      // preselect the service dropdown from the first project type, unless the visitor picked one
      var first = sb.querySelector('.chip[data-group="type"][aria-pressed="true"]');
      if (svc && (!svc.value || svc.dataset.auto === "1")) {
        svc.value = first ? first.dataset.service : "";
        svc.dataset.auto = first ? "1" : "";
      }
    };
    if (svc) svc.addEventListener("change", function () { svc.dataset.auto = ""; });
    sb.addEventListener("click", function (ev) {
      var chip = ev.target.closest(".chip");
      if (!chip) return;
      chip.setAttribute("aria-pressed", chip.getAttribute("aria-pressed") === "true" ? "false" : "true");
      compose();
    });
  }

  /* ---- estimate form submit */
  if (form) {
    var status = form.querySelector(".form__status");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (f) {
        var bad = !f.value.trim();
        f.setAttribute("aria-invalid", String(bad));
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) { status.textContent = "Please fill in your name, phone and a short project summary."; return; }
      if (form.querySelector("[name=_gotcha]").value) return;
      var data = new FormData(form);
      if (form.dataset.mode === "endpoint") {
        status.textContent = "Sending…";
        fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            location.href = "/thank-you/";
          })
          .catch(function () {
            status.textContent = "That didn't go through. Please call us or email " + form.dataset.email + ".";
          });
      } else {
        var body = ["Name: " + data.get("name"), "Phone: " + data.get("phone"), "Email: " + data.get("email"), "ZIP: " + data.get("zip"), "Service: " + data.get("service"), "", data.get("message")].join("\n");
        location.href = "mailto:" + form.dataset.email + "?subject=" + encodeURIComponent("Estimate request: " + (data.get("service") || "project") + " (" + data.get("name") + ")") + "&body=" + encodeURIComponent(body);
        status.textContent = "Your email app should open with the request ready to send. If it doesn't, call us.";
      }
    });
  }
})();
