(function () {
    'use strict';
    if (window.__hoverChords) return;
    window.__hoverChords = true;
    var H = window.HoverChords;
    if (!H || !document.body) return;

    var HOST = location.hostname || 'local-file';
    var SITE = 'https://pianoers.com/?utm_source=hover-chords&utm_medium=extension';
    var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, OPTION: 1, CODE: 1, SVG: 1, MATH: 1, TITLE: 1, HEAD: 1, BUTTON: 1, KBD: 1, SAMP: 1 };
    var SEPARATOR = /^(\|+|:?\|\|?:?|-+|\/|%|\*+|x\d+|\(x\d+\)|\d+x|\.+|,|N\.?C\.?|n\.?c\.?|\(|\)|\[|\]|→|>|<)$/;
    var settings = { enabled: true, disabledHosts: [], transpose: {}, sound: true };
    var active = false;
    var spans = [];
    var pending = [];
    var strongCount = 0;
    var weakSeen = {};
    var weakCount = 0;
    var observer = null;

    function siteOn() { return settings.enabled && settings.disabledHosts.indexOf(HOST) === -1; }
    function shift() { return parseInt(settings.transpose[HOST], 10) || 0; }

    function isChord(tok) { return !!H.parse(tok); }
    function stripWrap(tok) {
        var m = tok.match(/^([(\[{]*)(.*?)([)\]}.,:;*]*)$/);
        return m ? { pre: m[1].length, core: m[2] } : { pre: 0, core: tok };
    }
    function chordish(el) {
        for (var n = el, i = 0; n && n !== document.body && i < 6; n = n.parentElement, i++) {
            if (n.tagName === 'PRE') return true;
            var c = ((n.className && n.className.baseVal !== undefined ? n.className.baseVal : n.className) || '') + ' ' + (n.id || '');
            if (/chord|akkord|acorde|accord/i.test(c)) return true;
        }
        return false;
    }

    function analyse(node) {
        var text = node.nodeValue;
        var ranges = [];
        var strong = false;
        var re = /\[([A-G][^\]\s]{0,14})\]/g, m;
        while ((m = re.exec(text))) {
            if (isChord(m[1])) { ranges.push({ start: m.index + 1, end: m.index + 1 + m[1].length, name: m[1] }); strong = true; }
        }
        if (ranges.length) return { ranges: ranges, strong: true };
        var pos = 0;
        text.split('\n').forEach(function (line) {
            var tokRe = /\S+/g, t, found = [], ok = true, chords = 0;
            while ((t = tokRe.exec(line))) {
                var tok = t[0];
                if (SEPARATOR.test(tok)) continue;
                var parts = tok.split(/(?=[|])|(?<=[|])/);
                var off = t.index;
                for (var i = 0; i < parts.length; i++) {
                    var p = parts[i];
                    if (!p || SEPARATOR.test(p)) { off += p.length; continue; }
                    var w = stripWrap(p);
                    if (w.core && isChord(w.core)) { found.push({ start: pos + off + w.pre, end: pos + off + w.pre + w.core.length, name: w.core }); chords++; }
                    else { ok = false; break; }
                    off += p.length;
                }
                if (!ok) break;
            }
            if (ok && chords) {
                ranges = ranges.concat(found);
                if (chords >= 2) strong = true;
            }
            pos += line.length + 1;
        });
        if (!ranges.length) return null;
        if (!strong && chordish(node.parentElement)) strong = true;
        return { ranges: ranges, strong: strong };
    }

    function weakAllowed() {
        if (strongCount >= 2) return true;
        var names = Object.keys(weakSeen);
        return weakCount >= 6 && names.length >= 3 && names.some(function (n) { return n.length > 1; });
    }

    function wrap(node, ranges) {
        if (!node.parentNode) return;
        var text = node.nodeValue, frag = document.createDocumentFragment(), last = 0;
        ranges.sort(function (a, b) { return a.start - b.start; }).forEach(function (r) {
            if (r.start < last) return;
            if (r.start > last) frag.appendChild(document.createTextNode(text.slice(last, r.start)));
            var s = document.createElement('span');
            s.className = 'hc-chord';
            s.setAttribute('data-hc-orig', r.name);
            s.setAttribute('tabindex', '0');
            s.setAttribute('role', 'button');
            s.textContent = H.transposeName(r.name, shift());
            s.setAttribute('aria-label', 'Show piano chord ' + s.textContent);
            frag.appendChild(s);
            spans.push(s);
            last = r.end;
        });
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
    }

    function scan(root) {
        if (!root || !siteOn()) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (n) {
                var p = n.parentElement;
                if (!p || SKIP[p.tagName] || p.closest('.hc-chord, #hover-chords-root, [contenteditable=""], [contenteditable="true"], code, svg')) return NodeFilter.FILTER_REJECT;
                var v = n.nodeValue;
                if (v.length > 20000 || !/[A-G]/.test(v)) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        var found = [], n;
        while ((n = walker.nextNode())) {
            var a = analyse(n);
            if (a) found.push({ node: n, ranges: a.ranges, strong: a.strong });
        }
        var perParent = new Map();
        found.forEach(function (f) {
            var gp = f.node.parentElement && (f.node.parentElement.parentElement || f.node.parentElement);
            perParent.set(gp, (perParent.get(gp) || 0) + f.ranges.length);
        });
        found.forEach(function (f) {
            if (!f.strong) {
                var gp = f.node.parentElement && (f.node.parentElement.parentElement || f.node.parentElement);
                if (perParent.get(gp) >= 3 && gp && !/^(OL|UL|TABLE|TBODY|TR|SELECT|NAV)$/.test(gp.tagName)) f.grouped = true;
            }
        });
        found.forEach(function (f) {
            if (f.strong) { strongCount += f.ranges.length; wrap(f.node, f.ranges); }
            else if (!f.grouped) return;
            else {
                f.ranges.forEach(function (r) { weakSeen[r.name] = 1; });
                weakCount += f.ranges.length;
                pending.push(f);
            }
        });
        if (weakAllowed() && pending.length) {
            var list = pending; pending = [];
            list.forEach(function (f) { wrap(f.node, f.ranges); });
        }
    }

    function unwrapAll() {
        hide(true);
        spans.forEach(function (s) {
            if (!s.parentNode) return;
            var parent = s.parentNode;
            parent.replaceChild(document.createTextNode(s.getAttribute('data-hc-orig')), s);
            parent.normalize();
        });
        spans = []; pending = []; strongCount = 0; weakSeen = {}; weakCount = 0;
    }

    function retranspose() {
        var t = shift();
        spans.forEach(function (s) {
            s.textContent = H.transposeName(s.getAttribute('data-hc-orig'), t);
            s.setAttribute('aria-label', 'Show piano chord ' + s.textContent);
        });
        if (pop && current) render();
    }

    var queue = [], timer = null;
    function observe() {
        if (observer) return;
        observer = new MutationObserver(function (muts) {
            muts.forEach(function (m) {
                m.addedNodes.forEach(function (n) {
                    if (n.nodeType === 1 && n.id !== 'hover-chords-root' && !n.classList.contains('hc-chord')) queue.push(n);
                    else if (n.nodeType === 3 && n.parentElement && !n.parentElement.closest('.hc-chord, #hover-chords-root')) queue.push(n.parentElement);
                });
            });
            if (queue.length && !timer) timer = setTimeout(function () {
                timer = null;
                var q = queue; queue = [];
                observer.disconnect();
                q.forEach(function (el) { if (el.isConnected) scan(el); });
                observer.observe(document.body, { childList: true, subtree: true });
            }, 400);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    function stopObserving() { if (observer) { observer.disconnect(); observer = null; } }

    var hostEl = null, shadow = null, pop = null, current = null, inversion = 0, pinned = false, hideTimer = null, showTimer = null;
    var CSS = ':host{all:initial}' +
        '.pop{position:fixed;z-index:2147483646;width:max-content;max-width:min(340px,calc(100vw - 16px));box-sizing:border-box;padding:12px 14px 10px;border-radius:14px;background:#ffffff;color:#15191c;border:1px solid #d9e2e5;box-shadow:0 10px 30px rgb(21 25 28/18%),0 2px 6px rgb(21 25 28/8%);font:500 14px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;opacity:0;transform:translateY(4px);transition:opacity .12s ease,transform .12s ease}' +
        '.pop.on{opacity:1;transform:none}' +
        '.head{display:flex;align-items:baseline;gap:10px;margin-bottom:8px;padding-right:28px}' +
        '.name{font-size:22px;font-weight:800;letter-spacing:-.01em}' +
        '.notes{color:#56666e;font-size:13.5px;font-weight:600}' +
        '.x{position:absolute;top:8px;right:8px;width:28px;height:28px;border:0;border-radius:50%;background:transparent;color:#56666e;font-size:18px;line-height:28px;cursor:pointer;display:none}' +
        '.pin .x{display:block}.x:hover{background:#f3f6f7}' +
        'svg{display:block;width:100%;height:auto}' +
        '.row{display:flex;align-items:center;gap:6px;margin-top:9px}' +
        'button.b{appearance:none;border:1px solid #d9e2e5;background:#f3f6f7;color:#15191c;border-radius:9px;height:30px;padding:0 10px;font:700 13px system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px}' +
        'button.b:hover{background:#e2eef1}button.b:focus-visible,.x:focus-visible{outline:3px solid #f6b31e;outline-offset:1px}' +
        '.play{background:#f6b31e!important;border-color:#f6b31e!important;color:#1b1400!important}' +
        '.inv{flex:1;text-align:center;color:#56666e;font-size:12.5px;font-weight:600;white-space:nowrap}' +
        '.hint{margin-top:7px;color:#56666e;font-size:12px}' +
        '.foot{display:none;margin-top:8px;padding-top:7px;border-top:1px solid #e6ecee;font-size:12px;color:#56666e}' +
        '.pin .foot{display:block}.pin .hint{display:none}' +
        '.foot a{color:#2e6475;font-weight:700;text-decoration:none}.foot a:hover{text-decoration:underline}' +
        '@media (prefers-color-scheme:dark){.pop{background:#1b2226;color:#eef3f5;border-color:#33414a}.notes,.inv,.hint,.foot,.x{color:#a9b8bf}button.b{background:#26323a;border-color:#33414a;color:#eef3f5}button.b:hover{background:#2f3e47}.x:hover{background:#26323a}.foot{border-color:#33414a}.foot a{color:#8fd0e0}}' +
        '@media (prefers-reduced-motion:reduce){.pop{transition:none}}';

    function ensurePop() {
        if (pop) return;
        hostEl = document.createElement('div');
        hostEl.id = 'hover-chords-root';
        shadow = hostEl.attachShadow({ mode: 'open' });
        var style = document.createElement('style');
        style.textContent = CSS;
        pop = document.createElement('div');
        pop.className = 'pop';
        pop.setAttribute('role', 'dialog');
        pop.setAttribute('aria-label', 'Piano chord');
        pop.innerHTML = '<button class="x" type="button" aria-label="Close">×</button><div class="head"><span class="name"></span><span class="notes"></span></div><div class="kb"></div>' +
            '<div class="row"><button class="b play" type="button">▶ Play</button><button class="b prev" type="button" aria-label="Previous inversion">‹</button><span class="inv"></span><button class="b next" type="button" aria-label="Next inversion">›</button></div>' +
            '<div class="hint">Click the chord to pin it</div>' +
            '<div class="foot">Learn more piano chords at <a href="' + SITE + '" target="_blank" rel="noopener">Pianoers.com</a></div>';
        shadow.appendChild(style); shadow.appendChild(pop);
        document.documentElement.appendChild(hostEl);
        pop.querySelector('.x').addEventListener('click', function () { hide(true); });
        pop.querySelector('.play').addEventListener('click', function () { play(); });
        pop.querySelector('.prev').addEventListener('click', function () { setInv(inversion - 1); });
        pop.querySelector('.next').addEventListener('click', function () { setInv(inversion + 1); });
        pop.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
        pop.addEventListener('mouseleave', function () { if (!pinned) scheduleHide(); });
        pop.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { e.preventDefault(); var c = current; hide(true); if (c) c.focus(); }
            else if (e.key === 'ArrowLeft') setInv(inversion - 1);
            else if (e.key === 'ArrowRight') setInv(inversion + 1);
        });
    }

    function keyboardSVG(v) {
        var all = v.notes.slice(); if (v.bass !== null) all.push(v.bass);
        var lo = Math.floor(Math.min.apply(null, all) / 12) * 12, hi = Math.floor(Math.max.apply(null, all) / 12) * 12 + 12;
        if (hi - lo < 24) hi = lo + 24;
        var WHITE = [0, 2, 4, 5, 7, 9, 11], BLACK = { 1: 0, 3: 1, 6: 3, 8: 4, 10: 5 };
        var ww = 22, wh = 84, bw = 14, bh = 52;
        var whites = (hi - lo) / 12 * 7, width = whites * ww;
        var lit = {}; v.notes.forEach(function (n) { lit[n] = 'c'; }); if (v.bass !== null) lit[v.bass] = 'b';
        var s = '<svg viewBox="-1 -1 ' + (width + 2) + ' ' + (wh + 2) + '" width="' + (width + 2) + '" style="max-width:100%" role="img" aria-label="Piano keyboard">';
        var wi = 0, blacks = '';
        for (var n = lo; n < hi; n++) {
            var p = n % 12;
            if (WHITE.indexOf(p) !== -1) {
                var x = wi * ww, f = lit[n] === 'c' ? '#f6b31e' : lit[n] === 'b' ? '#7fc3d4' : '#ffffff';
                s += '<rect x="' + x + '" y="0" width="' + ww + '" height="' + wh + '" rx="3" fill="' + f + '" stroke="#9aa9ae" stroke-width="1"/>';
                if (lit[n]) s += '<text x="' + (x + ww / 2) + '" y="' + (wh - 8) + '" text-anchor="middle" font-size="10" font-weight="800" fill="#15191c" font-family="system-ui,Arial">' + esc(v.label(n)) + '</text>';
                if (p === 0) s += '<text x="' + (x + ww / 2) + '" y="' + (wh - (lit[n] ? 22 : 8)) + '" text-anchor="middle" font-size="8" fill="#8a989e" font-family="system-ui,Arial">C' + (3 + (n / 12 | 0)) + '</text>';
                wi++;
            } else {
                var bx = wi * ww - bw / 2, bf = lit[n] === 'c' ? '#d18f00' : lit[n] === 'b' ? '#2e8fa8' : '#1c2226';
                blacks += '<rect x="' + bx + '" y="0" width="' + bw + '" height="' + bh + '" rx="2.5" fill="' + bf + '"/>';
                if (lit[n]) blacks += '<text x="' + (bx + bw / 2) + '" y="' + (bh - 6) + '" text-anchor="middle" font-size="7.5" font-weight="800" fill="#ffffff" font-family="system-ui,Arial">' + esc(v.label(n)) + '</text>';
            }
        }
        return s + blacks + '</svg>';
    }
    function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

    function chordFor(span) { return H.parse(span.textContent.trim()); }

    function render() {
        var ch = chordFor(current);
        if (!ch) return;
        var v = H.voicing(ch, inversion);
        pop.querySelector('.name').textContent = ch.name;
        pop.querySelector('.notes').textContent = H.toneNames(ch).join(' · ') + (ch.bassName ? '  (bass ' + ch.bassName + ')' : '');
        pop.querySelector('.kb').innerHTML = keyboardSVG(v);
        var invs = Math.max(1, v.inversions);
        pop.querySelector('.inv').textContent = H.inversionLabel(((inversion % invs) + invs) % invs);
        pop.querySelector('.prev').hidden = pop.querySelector('.next').hidden = invs < 2;
    }
    function setInv(i) { inversion = i; render(); place(); if (pinned) play(); }

    function place() {
        var r = current.getBoundingClientRect(), pr = pop.getBoundingClientRect();
        var vw = document.documentElement.clientWidth, vh = window.innerHeight;
        var left = Math.min(Math.max(8, r.left + r.width / 2 - pr.width / 2), vw - pr.width - 8);
        var top = r.bottom + 8;
        if (top + pr.height > vh - 8 && r.top - pr.height - 8 > 8) top = r.top - pr.height - 8;
        pop.style.left = left + 'px'; pop.style.top = Math.max(8, top) + 'px';
    }

    function show(span, pin) {
        ensurePop();
        clearTimeout(hideTimer);
        if (pin) clearTimeout(showTimer);
        if (current !== span) inversion = 0;
        current = span;
        pinned = !!pin;
        pop.classList.toggle('pin', pinned);
        render();
        pop.style.left = '-9999px'; pop.style.top = '0px';
        requestAnimationFrame(function () { place(); pop.classList.add('on'); });
    }
    function scheduleHide() { clearTimeout(hideTimer); hideTimer = setTimeout(function () { hide(false); }, 220); }
    function hide(force) {
        if (!pop || (pinned && !force)) return;
        pinned = false;
        pop.classList.remove('on', 'pin');
        pop.style.left = '-9999px';
        current = null;
    }

    var ac = null;
    function play() {
        if (!settings.sound || !current) return;
        var ch = chordFor(current);
        if (!ch) return;
        var v = H.voicing(ch, inversion);
        try {
            ac = ac || new (window.AudioContext || window.webkitAudioContext)();
            if (ac.state === 'suspended') ac.resume();
            var notes = (v.bass !== null ? [v.bass] : []).concat(v.notes);
            var master = ac.createGain();
            master.gain.value = 0.32 / Math.sqrt(notes.length);
            master.connect(ac.destination);
            var t0 = ac.currentTime + 0.02;
            notes.forEach(function (n, i) {
                var f = 440 * Math.pow(2, (48 + n - 69) / 12), t = t0 + i * 0.028;
                [[1, 1, 'triangle'], [2, 0.35, 'sine'], [3, 0.12, 'sine']].forEach(function (h) {
                    var o = ac.createOscillator(), g = ac.createGain();
                    o.type = h[2]; o.frequency.value = f * h[0];
                    g.gain.setValueAtTime(0.0001, t);
                    g.gain.exponentialRampToValueAtTime(h[1], t + 0.008);
                    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4 / h[0]);
                    o.connect(g); g.connect(master);
                    o.start(t); o.stop(t + 2.5);
                });
            });
        } catch (e) { }
    }

    function onOver(e) {
        var s = e.target.closest && e.target.closest('.hc-chord');
        if (!s || !active) return;
        clearTimeout(hideTimer); clearTimeout(showTimer);
        if (pinned && current) return;
        showTimer = setTimeout(function () { if (!pinned) show(s, false); }, 140);
    }
    function onOut(e) {
        var s = e.target.closest && e.target.closest('.hc-chord');
        if (!s) return;
        clearTimeout(showTimer);
        if (!pinned) scheduleHide();
    }
    function onClick(e) {
        var s = e.target.closest && e.target.closest('.hc-chord');
        if (s && active) {
            e.preventDefault(); e.stopPropagation();
            show(s, true); play();
            return;
        }
        if (pinned && hostEl && !e.composedPath().includes(hostEl)) hide(true);
    }
    function onKey(e) {
        var s = e.target.closest && e.target.closest('.hc-chord');
        if (s && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault(); show(s, true); play();
            setTimeout(function () { var b = pop && pop.querySelector('.play'); if (b) b.focus(); }, 30);
        } else if (e.key === 'Escape' && pinned) hide(true);
    }
    function onScroll() { if (pop && current && pop.classList.contains('on')) { if (pinned) place(); else hide(false); } }

    var style = document.createElement('style');
    style.id = 'hover-chords-style';
    style.textContent = '.hc-chord{cursor:pointer;border-radius:3px;text-decoration:underline dotted;text-decoration-color:rgba(246,179,30,.9);text-underline-offset:3px;text-decoration-thickness:2px}.hc-chord:hover,.hc-chord:focus-visible{background:rgba(246,179,30,.22);outline:none}';

    function activate() {
        if (active) return;
        active = true;
        if (!style.isConnected) (document.head || document.documentElement).appendChild(style);
        scan(document.body);
        observe();
        document.addEventListener('mouseover', onOver, true);
        document.addEventListener('mouseout', onOut, true);
        document.addEventListener('click', onClick, true);
        document.addEventListener('keydown', onKey, true);
        window.addEventListener('scroll', onScroll, { passive: true, capture: true });
        window.addEventListener('resize', onScroll, { passive: true });
    }
    function deactivate() {
        if (!active) return;
        active = false;
        stopObserving();
        unwrapAll();
        if (style.isConnected) style.remove();
        document.removeEventListener('mouseover', onOver, true);
        document.removeEventListener('mouseout', onOut, true);
        document.removeEventListener('click', onClick, true);
        document.removeEventListener('keydown', onKey, true);
        window.removeEventListener('scroll', onScroll, true);
        window.removeEventListener('resize', onScroll);
    }
    function apply() { if (siteOn()) { activate(); retranspose(); } else deactivate(); }

    chrome.storage.local.get(settings, function (s) {
        settings = Object.assign(settings, s || {});
        apply();
    });
    chrome.storage.onChanged.addListener(function (changes, area) {
        if (area !== 'local') return;
        var before = shift();
        Object.keys(changes).forEach(function (k) { settings[k] = changes[k].newValue; });
        if (siteOn() !== active) apply();
        else if (shift() !== before) retranspose();
    });
    chrome.runtime.onMessage.addListener(function (msg, sender, reply) {
        if (msg && msg.type === 'hc-status') {
            var names = {};
            spans.forEach(function (s) { if (s.isConnected) names[s.textContent] = 1; });
            reply({ host: HOST, count: spans.filter(function (s) { return s.isConnected; }).length, distinct: Object.keys(names).length, active: active });
        }
    });
})();
