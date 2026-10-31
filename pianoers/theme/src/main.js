/* Pianoers theme. No dependencies; every feature is optional and fails quietly.
   1. Mobile menu            5. Contents list                     9. Playable pianos
   2. Image framing          6. Picks, finder, rail pick, buy bar 10. Ear trainer
   3. Table scrolling        7. ItemList structured data          11. Reading progress
   4. Affiliate links        8. Sound                             12. Share, course quiz, chord taste
                                                                  13-14. Sortable tables, reveal
                                                                  15. Image lightbox  */
(function () {
    'use strict';

    var cfg = window.PZ || {};
    var content = document.querySelector('.pz-content');

    function storageGet(key) { try { return window.sessionStorage.getItem(key); } catch (e) { return null; } }
    function storageSet(key, value) { try { window.sessionStorage.setItem(key, value); } catch (e) { /* private mode */ } }
    function text(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
    function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60); }

    /* 0. Sign-in and newsletter popup (Ghost Portal).
       Portal is about 2.5 MB of script, so the page head leaves it out ({{ghost_head exclude="portal"}}) and it is
       added here, with the same settings, the first time a visitor scrolls, taps or presses a key.
       Update PORTAL_SRC when Ghost updates Portal (or turn off the theme's "Load Portal when needed" setting). */
    (function () {
        if (!cfg.fastPortal) return;
        var PORTAL_SRC = 'https://cdn.jsdelivr.net/ghost/portal@~2.71/umd/portal.min.js';
        var state = 0;               // 0 not started, 1 loading, 2 ready
        var queued = [];             // forms submitted before Portal was ready
        function ready() {
            return !!document.querySelector('#ghost-portal-root iframe');
        }
        function flush() {
            var forms = queued; queued = [];
            forms.forEach(function (f) { try { f.requestSubmit ? f.requestSubmit() : f.submit(); } catch (e) { /* ignore */ } });
        }
        function load() {
            if (state) return;
            var anchor = document.querySelector('script[data-sodo-search]');
            var key = anchor && anchor.getAttribute('data-key');
            var site = String(cfg.siteUrl || window.location.origin).replace(/\/$/, '');
            if (!key) { state = 2; return; }
            state = 1;
            var s = document.createElement('script');
            s.src = PORTAL_SRC; s.defer = true; s.crossOrigin = 'anonymous';
            s.setAttribute('data-i18n', 'true');
            s.setAttribute('data-ghost', site);
            s.setAttribute('data-key', key);
            s.setAttribute('data-api', site + '/ghost/api/content/');
            s.setAttribute('data-locale', anchor.getAttribute('data-locale') || document.documentElement.lang || 'en');
            s.onerror = function () { state = 2; flush(); };
            s.onload = function () {
                var tries = 0;
                (function wait() { if (ready() || ++tries > 60) { state = 2; setTimeout(flush, 120); } else setTimeout(wait, 100); })();
            };
            document.head.appendChild(s);
        }
        function soon() {
            events.forEach(function (n) { window.removeEventListener(n, soon, true); });
            if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 1500 }); else setTimeout(load, 150);
        }
        var events = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'];
        events.forEach(function (n) { window.addEventListener(n, soon, { capture: true, passive: true, once: true }); });
        // Links that open Portal (#/portal/...), magic-link returns (?action=...) and any click on a Portal trigger load it at once.
        var q = window.location.search;
        if (/^#\/(portal|share)/.test(window.location.hash) || /[?&](action|success|stripe)=/.test(q)) load();
        document.addEventListener('click', function (e) {
            if (e.target.closest && e.target.closest('[data-portal],a[href^="#/portal"]')) load();
        }, true);
        // A signup form submitted before Portal is ready waits for it, then submits normally.
        document.addEventListener('submit', function (e) {
            var f = e.target;
            if (state === 2 || !f || !f.matches || !f.matches('form[data-members-form]')) return;
            e.preventDefault(); e.stopImmediatePropagation();
            if (queued.indexOf(f) === -1) queued.push(f);
            f.classList.add('loading');
            load();
        }, true);
        document.addEventListener('focusin', function (e) {
            if (e.target.closest && e.target.closest('form[data-members-form]')) load();
        });
    })();

    /* 1. Mobile menu ------------------------------------------------------- */
    var head = document.getElementById('pz-head');
    var burger = head && head.querySelector('.pz-burger');
    if (burger) {
        var setOpen = function (open) {
            head.classList.toggle('is-open', open);
            burger.setAttribute('aria-expanded', String(open));
            burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        };
        burger.addEventListener('click', function () { setOpen(!head.classList.contains('is-open')); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && head.classList.contains('is-open')) { setOpen(false); burger.focus(); } });
        head.querySelectorAll('.pz-menu a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    }

    /* 2. Image framing: landscape images fill their 16:9 frame; others sit whole on a blurred backdrop. */
    function frame(img) {
        var ratio = img.naturalWidth / img.naturalHeight;
        if (ratio >= 1.45 && ratio <= 2.1) img.parentNode.classList.add('is-fill');
    }
    document.querySelectorAll('.pz-media img').forEach(function (img) {
        if (img.complete && img.naturalWidth) frame(img);
        else img.addEventListener('load', function () { frame(img); }, { once: true });
    });

    /* 3. Wide tables scroll sideways inside their own box. */
    if (content) {
        content.querySelectorAll('table').forEach(function (table) {
            if (table.closest('.pz-table-wrap')) return;
            var wrap = document.createElement('div');
            wrap.className = 'pz-table-wrap';
            table.parentNode.insertBefore(wrap, table);
            wrap.appendChild(table);
        });
    }

    /* 4. Affiliate links always carry rel="sponsored" and open in a new tab.
       The setting takes domains (amzn.to) and this site's own redirect paths (/PFA). */
    var entries = String(cfg.affiliateDomains || '').split(',').map(function (d) { return d.trim().toLowerCase(); }).filter(Boolean);
    var domains = entries.filter(function (d) { return d.charAt(0) !== '/'; }).map(function (d) { return d.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, ''); });
    var paths = entries.filter(function (d) { return d.charAt(0) === '/'; }).map(function (d) { return d.replace(/\/+$/, ''); });
    function isAffiliate(a) {
        if (!a.hostname) return false;
        var host = a.hostname.toLowerCase().replace(/^www\./, '');
        if (host === location.hostname.toLowerCase().replace(/^www\./, '')) {
            var path = a.pathname.toLowerCase().replace(/\/+$/, '');
            return paths.some(function (p) { return path === p; });
        }
        return domains.some(function (d) { return host === d || host.slice(-(d.length + 1)) === '.' + d; });
    }
    function markAffiliate(a) {
        var rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
        ['sponsored', 'nofollow', 'noopener'].forEach(function (r) { if (rel.indexOf(r) === -1) rel.push(r); });
        a.setAttribute('rel', rel.join(' '));
        a.setAttribute('target', '_blank');
    }
    document.querySelectorAll('.gh-content a[href]').forEach(function (a) { if (isAffiliate(a)) markAffiliate(a); });

    /* 5. Contents list: the post's H2 headings, or H2 + H3 when the post has fewer than 3 H2s
       (some posts use H3 for their sections). Shown when there are 3 or more entries. */
    var tocLinks = [];
    if (cfg.toc && content) {
        var tocHeads = function (sel) {
            return Array.prototype.filter.call(content.querySelectorAll(sel), function (h) {
                return !h.closest('.pz-answer, .pz-finder, .pz-game, .kg-signup-card, .kg-header-card, .kg-toggle-card') && text(h);
            });
        };
        var heads = tocHeads('h2');
        if (heads.length < 3) heads = tocHeads('h2, h3');
        if (heads.length >= 3) {
            var items = heads.map(function (h) {
                if (!h.id) h.id = slugify(text(h)) || ('section-' + Math.random().toString(36).slice(2, 7));
                return '<li><a href="#' + h.id + '" data-id="' + h.id + '">' + text(h).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }) + '</a></li>';
            }).join('');
            document.querySelectorAll('.pz-toc, .pz-toc-mobile').forEach(function (box) {
                box.querySelector('.pz-toc-list').innerHTML = items;
                box.hidden = false;
            });
            tocLinks = Array.prototype.slice.call(document.querySelectorAll('.pz-toc a'));
            document.querySelectorAll('.pz-toc-mobile a').forEach(function (a) { a.addEventListener('click', function () { a.closest('details').open = false; }); });
            if ('IntersectionObserver' in window) {
                var io = new IntersectionObserver(function (entries) {
                    entries.forEach(function (en) {
                        if (!en.isIntersecting) return;
                        tocLinks.forEach(function (a) { a.classList.toggle('is-current', a.dataset.id === en.target.id); });
                    });
                }, { rootMargin: '-20% 0px -70% 0px' });
                heads.forEach(function (h) { io.observe(h); });
            }
        }
    }

    /* 6. Picks, finder, rail pick and buy bar ------------------------------ */
    var pickEls = content ? Array.prototype.slice.call(content.querySelectorAll('.pz-pick')) : [];
    var picks = pickEls.map(function (el, i) {
        var buy = el.querySelector('.pz-buy a.pz-btn-buy') || el.querySelector('a.pz-btn-buy');
        var img = el.querySelector('.pz-pick-top img') || el.querySelector('img');
        /* data-name sets a short name for the sticky bar and rail (e.g. "Pianoforall" instead of the card heading). */
        var name = el.getAttribute('data-name') || text(el.querySelector('h2, h3'));
        if (!el.id) el.id = slugify(name) || ('pick-' + (i + 1));
        return {
            el: el, id: el.id, name: name,
            rank: parseInt(el.getAttribute('data-rank'), 10) || (i + 1),
            best: text(el.querySelector('.pz-best')),
            price: el.getAttribute('data-price') || '',
            img: img ? (img.currentSrc || img.src) : '',
            buyHref: buy ? buy.href : '',
            buyRel: buy ? buy.getAttribute('rel') : '',
            buyText: buy ? text(buy) : '',
            /* data-bar-label sets the sticky bar's button text; it defaults to "Check price". */
            barLabel: el.getAttribute('data-bar-label') || ''
        };
    }).sort(function (a, b) { return a.rank - b.rank; });
    var byId = {};
    picks.forEach(function (p) { byId[p.id] = p; });

    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function buyLink(p, label, extraClass) {
        if (!p.buyHref) return '';
        /* Keep the card button's own rel (vendor links that aren't affiliate links carry no "sponsored"). */
        return '<a class="pz-btn pz-btn-buy ' + (extraClass || '') + '" href="' + esc(p.buyHref) + '" rel="' + esc(p.buyRel || 'sponsored nofollow noopener') + '" target="_blank">' + esc(label || p.buyText || 'Check price') + '</a>';
    }

    var current = picks[0] || null;
    var chosen = false;
    var rail = document.querySelector('.pz-rail-pick');
    var bar = document.getElementById('pz-buybar');
    var barClosed = storageGet('pz-buybar-closed') === '1';

    function renderRail() {
        if (!rail || !current) return;
        rail.innerHTML =
            '<span class="pz-eyebrow">' + (chosen ? 'Your match' : 'Top pick') + '</span>' +
            (current.img ? '<img src="' + esc(current.img) + '" alt="" width="248" height="155" loading="lazy" decoding="async">' : '') +
            '<a class="pz-rail-name" href="#' + esc(current.id) + '">' + esc(current.name) + '</a>' +
            (current.price ? '<span class="pz-rail-note">' + esc(current.price) + '</span>' : '') +
            buyLink(current);
        rail.hidden = false;
    }
    function renderBar() {
        if (!bar || !current || !current.buyHref) return;
        bar.innerHTML =
            (current.img ? '<img src="' + esc(current.img) + '" alt="" width="44" height="44" loading="lazy" decoding="async">' : '') +
            '<span class="pz-buybar-text"><b>' + esc(current.name) + '</b><span>' + esc(chosen ? 'Your match' : (current.best || 'Top pick')) + (current.price ? ' · ' + esc(current.price) : '') + '</span></span>' +
            buyLink(current, current.barLabel || 'Check price') +
            '<button class="pz-buybar-close" type="button" aria-label="Hide this bar">×</button>';
        bar.querySelector('.pz-buybar-close').addEventListener('click', function () {
            barClosed = true; storageSet('pz-buybar-closed', '1'); updateBar();
        });
    }
    function updateBar() {
        if (!bar || !current || !current.buyHref || !cfg.stickyBar) return;
        var firstPick = picks[0] && picks[0].el;
        var past = firstPick ? firstPick.getBoundingClientRect().bottom < 0 : false;
        var show = !barClosed && (past || chosen);
        bar.hidden = !show && barClosed;
        bar.classList.toggle('is-shown', show);
        document.body.classList.toggle('has-buybar', show);
    }

    if (picks.length) {
        renderRail();
        if (cfg.stickyBar && bar) {
            renderBar();
            bar.hidden = false;
            window.addEventListener('scroll', updateBar, { passive: true });
            updateBar();
        }
    }

    /* Finder: <div class="pz-finder" data-finder='{...}'> (see README for the format). */
    document.querySelectorAll('.pz-finder').forEach(function (box) {
        var data;
        try { data = JSON.parse(box.getAttribute('data-finder') || (box.querySelector('script[type="application/json"]') || {}).textContent || ''); }
        catch (e) { return; } /* bad JSON: the fallback list stays visible */
        if (!data || !data.questions || !data.matches) return;

        var answers = {};
        var qWrap = document.createElement('div');
        qWrap.className = 'pz-finder-qs';
        qWrap.style.display = 'grid';
        qWrap.style.gap = '18px';
        data.questions.forEach(function (q, qi) {
            var id = 'pz-fq-' + qi + '-' + Math.random().toString(36).slice(2, 6);
            var keys = q.options.map(function (o) {
                return '<button class="pz-key" type="button" aria-pressed="false" data-v="' + esc(o.value) + '">' + esc(o.label) + (o.hint ? '<small>' + esc(o.hint) + '</small>' : '') + '</button>';
            }).join('');
            var q_el = document.createElement('div');
            q_el.className = 'pz-finder-q';
            q_el.innerHTML = '<span class="pz-finder-label" id="' + id + '">' + esc(q.label) + '</span>' +
                '<div class="pz-keys" role="group" aria-labelledby="' + id + '" data-n="' + q.options.length + '" style="--n:' + q.options.length + '">' + keys + '</div>';
            q_el.querySelector('.pz-keys').addEventListener('click', function (e) {
                var key = e.target.closest('.pz-key');
                if (!key) return;
                this.querySelectorAll('.pz-key').forEach(function (k) { k.setAttribute('aria-pressed', String(k === key)); });
                answers[q.id] = key.getAttribute('data-v');
                playNote(60 + qi * 12 + [0, 4, 7, 11, 14][Array.prototype.indexOf.call(this.children, key) % 5], 0.7);
                showResult();
            });
            qWrap.appendChild(q_el);
        });

        var result = document.createElement('div');
        result.className = 'pz-finder-result is-empty';
        result.setAttribute('aria-live', 'polite');
        result.textContent = data.prompt || 'Press one key in each row and your match appears here.';

        function showResult() {
            var keyParts = data.questions.map(function (q) { return answers[q.id]; });
            if (keyParts.some(function (v) { return !v; })) return;
            var m = data.matches[keyParts.join('|')] || data.matches['*'];
            var p = m && byId[m.pick];
            if (!p) return;
            result.className = 'pz-finder-result';
            result.innerHTML =
                (p.img ? '<img src="' + esc(p.img) + '" alt="" width="96" height="96">' : '<span></span>') +
                '<div style="display:grid;gap:4px;min-width:0"><span class="pz-eyebrow">Your match</span><span class="pz-result-name">' + esc(p.name) + '</span>' +
                (m.why ? '<span class="pz-result-why">' + esc(m.why) + '</span>' : '') + '</div>' +
                '<div class="pz-result-acts">' + buyLink(p) + '<a class="pz-btn pz-btn-ghost" href="#' + esc(p.id) + '">Read the verdict</a></div>';
            current = p; chosen = true;
            playChord([60, 64, 67, 72]);
            burstNotes(result, 6);
            renderRail(); renderBar(); updateBar();
        }

        var fallback = box.querySelector('.pz-finder-fallback');
        box.insertBefore(qWrap, fallback || null);
        box.insertBefore(result, fallback || null);
        box.classList.add('is-ready');
    });

    /* Comments: load Ghost's comments app only when the reader scrolls near it. */
    var tpl = document.querySelector('.pz-comments-tpl');
    if (tpl) {
        var loadComments = function () {
            if (!tpl.parentNode) return;
            var frag = tpl.content.cloneNode(true);
            frag.querySelectorAll('script').forEach(function (old) {
                var s = document.createElement('script');
                Array.prototype.forEach.call(old.attributes, function (at) { s.setAttribute(at.name, at.value); });
                s.text = old.text;
                old.parentNode.replaceChild(s, old);
            });
            tpl.parentNode.replaceChild(frag, tpl);
        };
        if ('IntersectionObserver' in window) {
            var cio = new IntersectionObserver(function (entries) {
                if (entries.some(function (en) { return en.isIntersecting; })) { cio.disconnect(); loadComments(); }
            }, { rootMargin: '800px 0px' });
            cio.observe(tpl.parentNode);
        } else { loadComments(); }
    }

    /* 7. ItemList structured data from the pick cards (skipped if the post already has one). */
    if (picks.length >= 2) {
        var hasList = Array.prototype.some.call(document.querySelectorAll('script[type="application/ld+json"]'), function (s) { return /"ItemList"/.test(s.textContent); });
        if (!hasList) {
            var base = window.location.href.split('#')[0];
            var ld = document.createElement('script');
            ld.type = 'application/ld+json';
            ld.textContent = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                itemListOrder: 'https://schema.org/ItemListOrderDescending',
                numberOfItems: picks.length,
                itemListElement: picks.map(function (p, i) { return { '@type': 'ListItem', position: i + 1, name: p.name, url: base + '#' + p.id }; })
            });
            document.head.appendChild(ld);
        }
    }

    /* 8. Sound: a small synthesized piano tone (Web Audio). Only ever starts from a tap or key press. */
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var audioCtx = null;
    function localGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
    function localSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
    function soundOn() { return !!cfg.sounds && localGet('pz-sound') !== 'off'; }
    function ctx() {
        if (!audioCtx) {
            var A = window.AudioContext || window.webkitAudioContext;
            if (!A) return null;
            audioCtx = new A();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }
    function playNote(midi, velocity, delay) {
        if (!soundOn()) return;
        var c = ctx();
        if (!c) return;
        var f = 440 * Math.pow(2, (midi - 69) / 12);
        var t = c.currentTime + (delay || 0);
        var out = c.createGain();
        var vel = velocity || 0.8;
        out.gain.setValueAtTime(0.0001, t);
        out.gain.exponentialRampToValueAtTime(0.2 * vel, t + 0.008);
        out.gain.exponentialRampToValueAtTime(0.07 * vel, t + 0.35);
        out.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
        var lp = c.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(Math.min(9000, f * 10), t);
        lp.frequency.exponentialRampToValueAtTime(Math.max(500, f * 2.5), t + 1.4);
        [1, 2, 3, 4, 5].forEach(function (h, i) {
            var o = c.createOscillator();
            var g = c.createGain();
            o.type = i === 0 ? 'triangle' : 'sine';
            o.frequency.value = f * h * (1 + 0.0005 * h * h);
            g.gain.value = [0.9, 0.42, 0.2, 0.1, 0.05][i];
            o.connect(g); g.connect(lp);
            o.start(t); o.stop(t + 2.3);
        });
        lp.connect(out); out.connect(c.destination);
    }
    function playChord(notes) { notes.forEach(function (n, i) { playNote(n, 0.6, i * 0.07); }); }
    function setSound(on) {
        localSet('pz-sound', on ? 'on' : 'off');
        document.querySelectorAll('.pz-sound').forEach(function (b) {
            b.setAttribute('aria-pressed', String(on));
            b.textContent = on ? 'Sound on' : 'Sound off';
        });
    }
    document.querySelectorAll('.pz-sound').forEach(function (b) {
        if (!cfg.sounds) { b.hidden = true; return; }
        b.addEventListener('click', function () { setSound(!soundOn()); if (soundOn()) playNote(72, 0.6); });
    });
    if (cfg.sounds) setSound(soundOn());

    /* Floating notes rising from whatever was pressed */
    function noteFx(x, y) {
        if (reduceMotion || !cfg.animations) return;
        var s = document.createElement('span');
        s.className = 'pz-note-fx';
        s.textContent = ['♪', '♫', '♩', '♬'][Math.floor(Math.random() * 4)];
        s.style.left = x + 'px';
        s.style.top = y + 'px';
        s.style.setProperty('--dx', (Math.random() * 60 - 30).toFixed(0) + 'px');
        s.style.setProperty('--rot', (Math.random() * 40 - 20).toFixed(0) + 'deg');
        document.body.appendChild(s);
        setTimeout(function () { s.remove(); }, 1150);
    }
    function burstNotes(el, n) {
        var r = el.getBoundingClientRect();
        for (var i = 0; i < n; i++) {
            (function (i) { setTimeout(function () { noteFx(r.left + r.width * (0.15 + Math.random() * 0.7), r.top + 20); }, i * 70); })(i);
        }
    }

    /* 9. Playable pianos ([data-pz-piano]) */
    var NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
    function pressKey(key, fromKeyboard) {
        var note = parseInt(key.getAttribute('data-note'), 10);
        playNote(note, 0.85);
        key.classList.add('is-down');
        setTimeout(function () { key.classList.remove('is-down'); }, 170);
        var r = key.getBoundingClientRect();
        noteFx(r.left + r.width / 2, r.top + 6);
        var piano = key.closest('[data-pz-piano]');
        if (piano) piano.dispatchEvent(new CustomEvent('pz:note', { detail: { note: note, key: key, keyboard: !!fromKeyboard } }));
    }
    var pianos = Array.prototype.slice.call(document.querySelectorAll('[data-pz-piano]'));
    pianos.forEach(function (piano) {
        piano.addEventListener('pointerdown', function (e) {
            var key = e.target.closest('.pz-pk');
            if (!key || e.button > 0) return;
            pressKey(key);
        });
        piano.addEventListener('click', function (e) {
            var key = e.target.closest('.pz-pk');
            if (key && e.detail === 0) pressKey(key, true); /* Enter or Space on a focused key */
        });
    });

    /* Computer keyboard plays the first visible free-play piano (not the ear trainer) */
    var KEYMAP = { a: 60, w: 61, s: 62, e: 63, d: 64, f: 65, t: 66, g: 67, y: 68, h: 69, u: 70, j: 71, k: 72, o: 73, l: 74, p: 75 };
    var freePiano = pianos.filter(function (p) { return !p.closest('[data-pz-game]'); })[0];
    var freeVisible = false;
    if (freePiano && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        Object.keys(KEYMAP).forEach(function (ch) {
            var key = freePiano.querySelector('.pz-pk[data-note="' + KEYMAP[ch] + '"] .pz-pk-kbd');
            if (key) key.textContent = ch.toUpperCase();
        });
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (es) { freeVisible = es[0].isIntersecting; }).observe(freePiano);
        }
        document.addEventListener('keydown', function (e) {
            if (!freeVisible || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
            var tag = (e.target.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return;
            var note = KEYMAP[e.key && e.key.toLowerCase()];
            var key = note && freePiano.querySelector('.pz-pk[data-note="' + note + '"]');
            if (key && key.offsetParent !== null) { e.preventDefault(); pressKey(key, true); }
        });
    }

    /* 10. Ear trainer ([data-pz-game]) */
    document.querySelectorAll('[data-pz-game]').forEach(function (game) {
        var piano = game.querySelector('[data-pz-piano]');
        var playBtn = game.querySelector('.pz-game-play');
        var msg = game.querySelector('.pz-game-msg');
        var streakEl = game.querySelector('[data-streak]');
        var bestEl = game.querySelector('[data-best]');
        if (!piano || !playBtn || !msg) return;
        if (!cfg.sounds) { msg.textContent = 'Turn on piano sounds in the theme settings to play.'; playBtn.disabled = true; return; }
        var link = game.getAttribute('data-link');
        var target = null, last = null, streak = 0;
        var best = parseInt(localGet('pz-ear-best'), 10) || 0;
        bestEl.textContent = best;
        function pool() {
            return Array.prototype.filter.call(piano.querySelectorAll('.pz-pk'), function (k) {
                return k.getAttribute('data-oct') === '1' && (streak >= 5 || k.classList.contains('pz-pk-w'));
            });
        }
        function next() {
            var keys = pool(), pick;
            do { pick = keys[Math.floor(Math.random() * keys.length)]; } while (keys.length > 1 && pick === last);
            last = pick; target = parseInt(pick.getAttribute('data-note'), 10);
            if (!soundOn()) setSound(true);
            playNote(target, 0.9);
            playBtn.textContent = 'Replay the note';
            msg.textContent = streak >= 5 ? 'Bonus round: black keys are in play now. Which key was that?' : 'Which key was that?';
        }
        playBtn.addEventListener('click', function () { if (target === null) next(); else playNote(target, 0.9); });
        piano.addEventListener('pz:note', function (e) {
            if (target === null) return;
            var key = e.detail.key, name = NAMES[target % 12];
            var answer = piano.querySelector('.pz-pk[data-note="' + target + '"]');
            if (e.detail.note === target) {
                streak++;
                if (streak > best) { best = streak; localSet('pz-ear-best', String(best)); }
                key.classList.add('is-right');
                setTimeout(function () { key.classList.remove('is-right'); }, 700);
                target = null;
                if (streak === 5 && link) {
                    msg.innerHTML = 'Five in a row! Your ear is ready for real lessons: <a href="' + link.replace(/"/g, '&quot;') + '">see the best online piano lessons</a>.';
                    burstNotes(game, 10);
                } else {
                    msg.textContent = 'Yes, that was ' + name + '! ' + (streak > 1 ? streak + ' in a row.' : '') ;
                    if (streak % 3 === 0) burstNotes(piano, 6);
                    setTimeout(function () { if (target === null) next(); }, 1100);
                }
            } else {
                key.classList.add('is-wrong');
                if (answer) answer.classList.add('is-right');
                setTimeout(function () { key.classList.remove('is-wrong'); if (answer) answer.classList.remove('is-right'); }, 900);
                msg.textContent = 'Close! It was ' + name + '. Press play for a new note.';
                streak = 0; target = null;
                playBtn.textContent = 'Play a note';
            }
            streakEl.textContent = streak;
            bestEl.textContent = best;
        });
    });

    /* 11. Reading progress, time left, history, resume and Continue reading */
    var HISTORY_KEY = 'pz-history';
    function history() { try { return JSON.parse(localGet(HISTORY_KEY) || '{}') || {}; } catch (e) { return {}; } }
    var hist = history();
    var article = document.querySelector('.pz-article:not(.pz-page)');
    var fill = document.querySelector('.pz-progress-fill');
    var timeLabel = null;
    var tocTitle = document.querySelector('.pz-toc .pz-eyebrow');
    var minutes = article ? parseInt(article.getAttribute('data-minutes'), 10) || 0 : 0;
    if (tocTitle && minutes) { timeLabel = document.createElement('span'); timeLabel.className = 'pz-time-left'; tocTitle.appendChild(timeLabel); }
    function readP() {
        if (!content) return 0;
        var r = content.getBoundingClientRect();
        return Math.max(0, Math.min(1, (window.innerHeight * 0.6 - r.top) / r.height));
    }
    if (article && content) {
        var path = window.location.pathname;
        var h1 = document.querySelector('.pz-title');
        var ticking = false;
        var entry = hist[path] || { p: 0, m: 0 };
        var onScroll = function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                ticking = false;
                var p = readP();
                if (fill) fill.style.setProperty('--p', p.toFixed(4));
                if (timeLabel) timeLabel.textContent = p > 0.97 ? 'Finished. Nice work!' : Math.max(1, Math.ceil(minutes * (1 - p))) + ' min left';
                clearTimeout(saveTimer);
                saveTimer = setTimeout(save, 400); /* save once scrolling settles */
            });
        };
        var saveTimer = null;
        var save = function () {
            var p = readP();
            hist = history();
            hist[path] = { p: p, m: Math.max(p, (hist[path] && hist[path].m) || 0), t: Date.now(), title: h1 ? text(h1) : document.title };
            var keys = Object.keys(hist);
            if (keys.length > 60) { keys.sort(function (a, b) { return hist[a].t - hist[b].t; }).slice(0, keys.length - 60).forEach(function (k) { delete hist[k]; }); }
            localSet(HISTORY_KEY, JSON.stringify(hist));
        };
        window.addEventListener('pagehide', save);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        /* Offer to jump back to where the reader left off */
        if (entry.p > 0.12 && entry.p < 0.92 && !window.location.hash && window.scrollY < 120) {
            var pill = document.createElement('div');
            pill.className = 'pz-resume';
            pill.setAttribute('role', 'status');
            pill.innerHTML = '<span>Pick up where you left off (' + Math.round(entry.p * 100) + '%)</span><button class="pz-resume-go" type="button">Continue</button><button class="pz-resume-x" type="button" aria-label="Dismiss">×</button>';
            document.body.appendChild(pill);
            var closePill = function () { pill.remove(); };
            pill.querySelector('.pz-resume-go').addEventListener('click', function () {
                var r = content.getBoundingClientRect();
                window.scrollTo({ top: window.scrollY + r.top + r.height * entry.p - window.innerHeight * 0.6, behavior: reduceMotion ? 'auto' : 'smooth' });
                closePill();
            });
            pill.querySelector('.pz-resume-x').addEventListener('click', closePill);
            setTimeout(closePill, 12000);
        }
    }

    /* Read badges on article cards */
    document.querySelectorAll('.pz-card-link').forEach(function (a) {
        var e = hist[a.pathname];
        var media = a.querySelector('.pz-card-media');
        if (!e || !media || (e.m || 0) < 0.15) return;
        var b = document.createElement('span');
        b.className = 'pz-badge' + (e.m >= 0.9 ? ' is-done' : '');
        b.textContent = e.m >= 0.9 ? 'Read ✓' : Math.round(e.m * 100) + '% read';
        media.appendChild(b);
    });

    /* "Continue reading" for returning visitors (homepage; fixed pill, so nothing shifts) */
    if (document.body.classList.contains('home-template')) {
        var latest = Object.keys(hist).map(function (k) { return { path: k, e: hist[k] }; })
            .filter(function (x) { return x.e.p > 0.12 && x.e.p < 0.92 && Date.now() - x.e.t < 30 * 864e5 && x.e.title; })
            .sort(function (a, b) { return b.e.t - a.e.t; })[0];
        if (latest) {
            var cont = document.createElement('div');
            cont.className = 'pz-resume';
            cont.setAttribute('role', 'status');
            cont.innerHTML = '<span>Continue reading: <b>' + esc(latest.e.title.slice(0, 48)) + (latest.e.title.length > 48 ? '…' : '') + '</b> (' + Math.round(latest.e.p * 100) + '%)</span>' +
                '<button class="pz-resume-go" type="button">Open</button><button class="pz-resume-x" type="button" aria-label="Dismiss">×</button>';
            document.body.appendChild(cont);
            cont.querySelector('.pz-resume-go').addEventListener('click', function () { window.location.href = latest.path; });
            cont.querySelector('.pz-resume-x').addEventListener('click', function () { cont.remove(); });
            setTimeout(function () { cont.remove(); }, 15000);
        }
    }

    /* 12. Share */
    var canShare = !!(navigator.share || (navigator.clipboard && navigator.clipboard.writeText));
    function pageUrl() { return (document.querySelector('link[rel="canonical"]') || {}).href || window.location.href.split('#')[0]; }
    function shareLink(btn, url, title, message) {
        if (navigator.share) { navigator.share({ title: title, text: message || undefined, url: url }).catch(function () {}); return; }
        navigator.clipboard.writeText(url).then(function () {
            var old = btn.textContent;
            btn.textContent = 'Link copied ✓';
            setTimeout(function () { btn.textContent = old; }, 2000);
        }).catch(function () {});
    }
    var shareBtns = document.querySelectorAll('[data-pz-share]');
    if (shareBtns.length && canShare) {
        document.querySelectorAll('.pz-share-row').forEach(function (r) { r.hidden = false; });
        shareBtns.forEach(function (btn) {
            btn.hidden = false;
            btn.addEventListener('click', function () { shareLink(btn, pageUrl(), document.title); });
        });
    }

    /* 12b. Course quiz ([data-pz-quiz]): data-driven, one question at a time, answers are piano keys.
       Data: a <script type="application/json" class="pz-quiz-data"> inside the box (format in snippets/course-quiz.html).
       Scoring: points per answer, plus "headStart" for the favorite; answers with "requires" limit who can win;
       ties go to the favorite, then to the course listed first. quiz-simulate.py mirrors this exactly. */
    function quizScore(data, chosen) {
        var ids = data.courses.map(function (c) { return c.id; });
        var s = {}, allowed = {}, any = false;
        ids.forEach(function (id) { s[id] = 0; allowed[id] = true; });
        if (s.hasOwnProperty(data.favorite)) s[data.favorite] += data.headStart || 0;
        chosen.forEach(function (o) {
            Object.keys(o.points || {}).forEach(function (id) { if (s.hasOwnProperty(id)) s[id] += o.points[id]; });
            if (o.requires && o.requires.length) ids.forEach(function (id) { if (o.requires.indexOf(id) === -1) allowed[id] = false; });
        });
        ids.forEach(function (id) { if (allowed[id]) any = true; });
        if (!any) ids.forEach(function (id) { allowed[id] = true; });
        var order = ids.slice().sort(function (a, b) {
            return (allowed[b] - allowed[a]) || (s[b] - s[a]) ||
                ((b === data.favorite) - (a === data.favorite)) || (ids.indexOf(a) - ids.indexOf(b));
        });
        return { scores: s, allowed: allowed, order: order };
    }
    function money(n) { return '$' + (Math.round(n * 100) % 100 ? n.toFixed(2) : String(Math.round(n))); }
    function track(ev) { if (Array.isArray(window.dataLayer)) { try { window.dataLayer.push(ev); } catch (e) { /* ignore */ } } }

    document.querySelectorAll('[data-pz-quiz]').forEach(function (box) {
        var data;
        try { data = JSON.parse((box.querySelector('script.pz-quiz-data') || {}).textContent || ''); }
        catch (e) { return; } /* bad JSON: the fallback list stays */
        if (!data || !data.questions || !data.courses || !data.questions.length) return;
        var stage = box.querySelector('.pz-quiz-stage');
        if (!stage) return;
        var course = {};
        data.courses.forEach(function (c) { course[c.id] = c; });
        var fav = course[data.favorite] || data.courses[0];
        var KEY = 'pz-quiz-' + (data.id || 'quiz');
        var answers = [];          /* option index per question */
        var step = 0;
        var uid = Math.random().toString(36).slice(2, 7);
        var SCALE = [0, 4, 7, 12, 16];
        var result = document.createElement('div');
        result.className = 'pz-quiz-result';
        result.setAttribute('aria-live', 'polite');
        result.hidden = true;
        stage.parentNode.insertBefore(result, stage.nextSibling);

        function chosenOpts(a) { return data.questions.map(function (q, i) { return q.options[a[i]]; }); }
        function encode(a) { return a.map(function (v, i) { return data.questions[i].options[v].value; }).join('.'); }
        function decode(str) {
            var parts = String(str || '').split('.');
            if (parts.length !== data.questions.length) return null;
            var a = parts.map(function (v, i) {
                for (var j = 0; j < data.questions[i].options.length; j++) if (data.questions[i].options[j].value === v) return j;
                return -1;
            });
            return a.indexOf(-1) === -1 ? a : null;
        }
        function save() { localSet(KEY, JSON.stringify({ a: encode(answers), t: Date.now() })); }
        function head(n) {
            return '<div class="pz-quiz-top"><span class="pz-quiz-count">' + n + '</span>' +
                (cfg.sounds ? '<button class="pz-sound pz-quiz-sound" type="button" aria-pressed="' + soundOn() + '">' + (soundOn() ? 'Sound on' : 'Sound off') + '</button>' : '') + '</div>';
        }
        function bindSound() {
            var b = stage.querySelector('.pz-quiz-sound');
            if (b) b.addEventListener('click', function () { setSound(!soundOn()); if (soundOn()) playNote(72, 0.6); });
        }

        function showQuestion(i, focus) {
            step = i;
            var q = data.questions[i];
            var id = 'pz-qq-' + uid + '-' + i;
            stage.innerHTML = head('Question ' + (i + 1) + ' of ' + data.questions.length) +
                '<p class="pz-quiz-q" id="' + id + '" tabindex="-1">' + esc(q.label) + '</p>' +
                '<div class="pz-keys pz-quiz-keys" role="group" aria-labelledby="' + id + '" data-n="' + q.options.length + '" style="--n:' + q.options.length + '">' +
                q.options.map(function (o, j) {
                    return '<button class="pz-key" type="button" aria-pressed="' + (answers[i] === j) + '" data-i="' + j + '">' + esc(o.label) + (o.hint ? '<small>' + esc(o.hint) + '</small>' : '') + '</button>';
                }).join('') + '</div>' +
                '<div class="pz-quiz-nav">' + (i > 0 ? '<button class="pz-quiz-back" type="button">← Back</button>' : '<span></span>') +
                '<span class="pz-quiz-dots" aria-hidden="true">' + data.questions.map(function (_, k) { return '<i class="' + (k < i ? 'is-done' : k === i ? 'is-now' : '') + '"></i>'; }).join('') + '</span></div>';
            bindSound();
            stage.querySelector('.pz-keys').addEventListener('click', function (e) {
                var key = e.target.closest('.pz-key');
                if (!key) return;
                var j = parseInt(key.getAttribute('data-i'), 10);
                this.querySelectorAll('.pz-key').forEach(function (k) { k.setAttribute('aria-pressed', String(k === key)); });
                answers[i] = j;
                playNote(60 + [0, 2, 4, 5, 7, 9, 11][i % 7] + SCALE[j % 5] - (j > 2 ? 12 : 0), 0.7);
                var r = key.getBoundingClientRect();
                noteFx(r.left + r.width / 2, r.top + 8);
                var next = function () { if (i + 1 < data.questions.length) showQuestion(i + 1, true); else finish(true); };
                if (reduceMotion) next(); else setTimeout(next, 160);
            });
            var back = stage.querySelector('.pz-quiz-back');
            if (back) back.addEventListener('click', function () { showQuestion(i - 1, true); });
            if (focus) stage.querySelector('.pz-quiz-q').focus({ preventScroll: true });
        }

        function restart() { answers = []; localSet(KEY, ''); result.hidden = true; result.innerHTML = ''; showQuestion(0, true); }
        function showDone(title, note, primary, onPrimary, secondary) {
            stage.innerHTML = head(title) + '<p class="pz-quiz-q" tabindex="-1">' + note + '</p>' +
                '<div class="pz-quiz-acts"><button class="pz-btn pz-btn-buy pz-quiz-go" type="button">' + esc(primary) + '</button>' +
                (secondary ? '<button class="pz-btn pz-btn-ghost pz-quiz-redo" type="button">' + esc(secondary) + '</button>' : '') + '</div>';
            bindSound();
            stage.querySelector('.pz-quiz-go').addEventListener('click', onPrimary);
            var redo = stage.querySelector('.pz-quiz-redo');
            if (redo) redo.addEventListener('click', restart);
        }

        function finish(fromTap, shared) {
            var opts = chosenOpts(answers);
            var sc = quizScore(data, opts);
            var win = course[sc.order[0]];
            if (!shared) save();
            if (shared) showDone('A shared result', 'These are someone else’s answers. Their match: <strong>' + esc(win.name) + '</strong>.', 'Take the quiz yourself', restart);
            else showDone('All ' + data.questions.length + ' answered', 'Your match: <strong>' + esc(win.name) + '</strong>.', 'Change my answers', function () { showQuestion(0, true); }, 'Start over');
            renderResult(sc, opts, win, shared);
            if (fromTap) {
                playChord([60, 64, 67, 72]);
                burstNotes(result, 6);
                track({ event: 'quiz_complete', quiz_id: data.id || 'quiz', quiz_result: win.id });
                result.querySelector('.pz-quiz-name').focus({ preventScroll: true });
                if (!reduceMotion) result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        function ctaLink(c, cls, label) {
            if (!c.cta || !c.cta.href) return '';
            return '<a class="pz-btn ' + cls + '" href="' + esc(c.cta.href) + '" rel="' + (c.cta.sponsored ? 'sponsored nofollow noopener' : 'noopener noreferrer') + '" target="_blank" data-quiz-cta="' + esc(c.id) + '">' + esc(label || c.cta.label) + '</a>';
        }

        function renderResult(sc, opts, win, shared) {
            var s = sc.scores;
            var reasons = [];
            opts.forEach(function (o) {
                if (o.why && o.why[win.id]) reasons.push({ t: o.why[win.id], p: (o.points || {})[win.id] || 0 });
            });
            reasons.sort(function (a, b) { return b.p - a.p; });
            var flags = [];
            opts.forEach(function (o) {
                if (!o.flag || !o.flag[win.id]) return;
                var alt = sc.order.filter(function (id) { return id !== win.id && sc.allowed[id] && !(o.flag[id]); })[0];
                flags.push({ t: o.flag[win.id], alt: alt && course[alt] });
            });
            var runner = course[sc.order.filter(function (id) { return id !== win.id; })[0]];
            var top = Math.max(1, s[sc.order[0]]);
            var gate = opts.filter(function (o) { return o.requires && o.requires.length; })[0];

            var bars = sc.order.map(function (id) {
                var c = course[id], v = s[id], out = !sc.allowed[id];
                return '<li class="' + (id === win.id ? 'is-win' : '') + (out ? ' is-out' : '') + '">' +
                    '<a href="#' + esc(c.pick) + '">' + esc(c.name) + '</a>' +
                    '<span class="pz-bar" aria-hidden="true"><span style="--w:' + Math.max(0, Math.min(1, v / top)).toFixed(3) + '"></span></span>' +
                    '<span class="pz-bar-val">' + v + ' pt' + (Math.abs(v) === 1 ? '' : 's') + (out && gate ? '<small>no ' + esc(gate.requireLabel || 'must-have') + '</small>' : '') + '</span></li>';
            }).join('');

            var costs = data.courses.slice().sort(function (a, b) {
                if (a.year1 == null) return 1; if (b.year1 == null) return -1; return a.year1 - b.year1;
            });
            var maxCost = Math.max.apply(null, costs.filter(function (c) { return c.year1 != null; }).map(function (c) { return c.year1; }).concat([1]));
            var race = costs.map(function (c, i) {
                var known = c.year1 != null;
                return '<li class="' + (c.id === win.id ? 'is-win' : '') + (c.id === fav.id ? ' is-fav' : '') + (known ? '' : ' is-unknown') + '">' +
                    '<span class="pz-race-name">' + esc(c.name) + '</span>' +
                    '<span class="pz-bar" aria-hidden="true">' + (known ? '<span style="--w:' + (c.year1 / maxCost).toFixed(3) + ';--d:' + (i * 90) + 'ms"></span>' : '') + '</span>' +
                    '<span class="pz-bar-val">' + (known ? money(c.year1) : 'check price') + '<small>' + esc(c.year1Note || '') + '</small></span></li>';
            }).join('');

            var side = win.id !== fav.id
                ? '<aside class="pz-quiz-side"><p class="pz-eyebrow">The $' + (fav.year1 || '') + ' option</p><p><strong>' + esc(fav.name) + '</strong> scored ' + s[fav.id] + ' points for you. ' + esc(fav.summary) + ' One payment, no subscription.</p>' +
                    '<div class="pz-quiz-acts">' + ctaLink(fav, 'pz-btn-ghost') + '<a class="pz-quiz-link" href="#' + esc(fav.pick) + '">Read the verdict</a></div></aside>'
                : (runner ? '<aside class="pz-quiz-side"><p class="pz-eyebrow">Runner-up for you</p><p><strong>' + esc(runner.name) + '</strong> (' + s[runner.id] + ' points). ' + esc(runner.summary) + '</p>' +
                    '<div class="pz-quiz-acts">' + ctaLink(runner, 'pz-btn-ghost') + '<a class="pz-quiz-link" href="#' + esc(runner.pick) + '">Read the verdict</a></div></aside>' : '');

            result.innerHTML =
                '<div class="pz-quiz-match">' +
                    '<p class="pz-eyebrow">' + (shared ? 'Their match' : 'Your match') + '</p>' +
                    '<p class="pz-quiz-name" tabindex="-1">' + esc(win.name) + (win.best ? ' <span class="pz-best">' + esc(win.best) + '</span>' : '') + '</p>' +
                    '<p class="pz-quiz-sum">' + esc(win.summary) + '</p>' +
                    (reasons.length ? '<ul class="pz-quiz-why">' + reasons.slice(0, 3).map(function (r) { return '<li>' + esc(r.t) + '</li>'; }).join('') + '</ul>' : '') +
                    flags.map(function (f) { return '<p class="pz-quiz-flag"><strong>Heads-up:</strong> ' + esc(f.t) + (f.alt ? ' If that matters most, look at <a href="#' + esc(f.alt.pick) + '">' + esc(f.alt.name) + '</a> (' + s[f.alt.id] + ' points).' : '') + '</p>'; }).join('') +
                    '<p class="pz-quiz-watch"><strong>Watch out:</strong> ' + esc(win.watch) + '</p>' +
                    '<div class="pz-quiz-acts">' + ctaLink(win, 'pz-btn-buy') + '<a class="pz-btn pz-btn-ghost" href="#' + esc(win.pick) + '">Read the verdict</a>' +
                        (canShare && !shared ? '<button class="pz-btn pz-btn-ghost pz-quiz-share" type="button">Share my result</button>' : '') + '</div>' +
                '</div>' + side +
                '<div class="pz-quiz-panel"><p class="pz-quiz-h">Match scores for all ' + data.courses.length + ' courses</p><ol class="pz-quiz-bars">' + bars + '</ol>' +
                    '<p class="pz-quiz-note">Points from your answers' + (data.headStart ? ', plus the ' + data.headStart + '-point head start for ' + esc(fav.name) : '') + '. Ties go to ' + esc(fav.name) + '.' + (gate ? ' Greyed-out courses don’t offer ' + esc(gate.requireLabel || 'your must-have') + ', so they can’t win.' : '') + '</p></div>' +
                '<div class="pz-quiz-panel pz-race"><p class="pz-quiz-h">The 12-month cost race</p><ol class="pz-quiz-bars">' + race + '</ol>' +
                    '<p class="pz-quiz-note">Cheapest plan you’d keep for a year, from each company’s own price page. Prices checked ' + esc(data.pricesChecked || '') + '; they change, so check before you buy.</p></div>';
            result.hidden = false;
            result.classList.remove('is-in', 'is-static');
            if (!reduceMotion && cfg.animations) {
                void result.offsetWidth; /* start the bars at zero so they grow (transform only: no layout shift) */
                result.classList.add('is-in');
            } else {
                result.classList.add('is-static');
            }

            result.querySelectorAll('[data-quiz-cta]').forEach(function (a) {
                a.addEventListener('click', function () { track({ event: 'quiz_cta_click', quiz_id: data.id || 'quiz', quiz_result: win.id, cta_course: a.getAttribute('data-quiz-cta') }); });
            });
            var sh = result.querySelector('.pz-quiz-share');
            if (sh) sh.addEventListener('click', function () {
                shareLink(sh, pageUrl() + '#quiz=' + encode(answers), document.title, 'My piano course match: ' + win.name + '. Find yours:');
            });

            var p = byId[win.pick];
            if (p) { current = p; chosen = true; renderRail(); renderBar(); updateBar(); }
        }

        /* Start: a shared link (#quiz=...), a saved result, or question 1. Each fits the reserved stage, so nothing shifts. */
        var hash = /^#quiz=(.+)$/.exec(window.location.hash || '');
        var sharedA = hash ? decode(decodeURIComponent(hash[1])) : null;
        var saved = null;
        try { saved = decode((JSON.parse(localGet(KEY) || 'null') || {}).a); } catch (e) { saved = null; }
        if (sharedA) {
            var sw = course[quizScore(data, chosenOpts(sharedA)).order[0]];
            showDone('A shared result', 'Someone shared their result with you: <strong>' + esc(sw.name) + '</strong>. Your answers may point somewhere else.', 'See their result', function () { answers = sharedA.slice(); finish(false, true); }, 'Take the quiz');
            box.scrollIntoView({ block: 'start' });
        } else if (saved) {
            answers = saved;
            var lw = course[quizScore(data, chosenOpts(saved)).order[0]];
            showDone('Welcome back', 'Last time your match was <strong>' + esc(lw.name) + '</strong>.', 'Show my result', function () { finish(false); }, 'Start over');
        } else {
            showQuestion(0, false);
        }
        box.classList.add('is-ready');
    });

    /* 12c. Chord taste ([data-pz-taste]): play C, E, G one at a time, then hear them together. */
    document.querySelectorAll('[data-pz-taste]').forEach(function (box) {
        var piano = box.querySelector('[data-pz-piano]');
        var msg = box.querySelector('.pz-taste-msg');
        var hear = box.querySelector('.pz-taste-hear');
        if (!piano || !msg) return;
        var CHORD = [60, 64, 67];
        var NAME = { 60: 'C', 64: 'E', 67: 'G' };
        var at = 0;
        function keyFor(n) { return piano.querySelector('.pz-pk[data-note="' + n + '"]'); }
        function reset() {
            at = 0;
            piano.querySelectorAll('.pz-pk').forEach(function (k) { k.classList.remove('is-done', 'is-next'); });
            keyFor(CHORD[0]).classList.add('is-next');
        }
        function chord() {
            playChord(CHORD);
            CHORD.forEach(function (n) { var k = keyFor(n); k.classList.add('is-down'); setTimeout(function () { k.classList.remove('is-down'); }, 600); });
        }
        box.classList.add('is-ready');
        reset();
        msg.textContent = cfg.sounds ? 'Step 1: press C, the white key just left of the two black keys.' : 'Sound is off on this site, but you can still find the three keys.';
        if (hear) hear.addEventListener('click', function () { chord(); });
        piano.addEventListener('pz:note', function (e) {
            var n = e.detail.note;
            if (at >= CHORD.length) { reset(); }
            if (n === CHORD[at]) {
                e.detail.key.classList.remove('is-next');
                e.detail.key.classList.add('is-done');
                at++;
                if (at < CHORD.length) {
                    keyFor(CHORD[at]).classList.add('is-next');
                    msg.textContent = 'Nice, that’s ' + NAME[n] + '. Now ' + NAME[CHORD[at]] + (at === 1 ? ': skip one white key to the right.' : ': skip one more white key.');
                } else {
                    msg.textContent = 'Now all three together: that’s a C major chord. One hand shape, and you can already play the first chord of hundreds of songs.';
                    setTimeout(chord, reduceMotion ? 0 : 450);
                    burstNotes(piano, 5);
                }
            } else {
                msg.textContent = 'That was ' + NAMES[n % 12] + '. Look for the glowing key: ' + NAME[CHORD[at]] + '.';
            }
        });
    });

    /* 13. Sortable tables: tap a column heading to sort */
    if (content) {
        content.querySelectorAll('table').forEach(function (table) {
            var head = table.tHead && table.tHead.rows[0];
            var body = table.tBodies[0];
            if (!head || !body || body.rows.length < 3 || table.querySelector('[rowspan], [colspan]')) return;
            Array.prototype.forEach.call(head.cells, function (th, col) {
                var label = th.textContent;
                th.innerHTML = '';
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'pz-sort';
                btn.textContent = label;
                btn.setAttribute('aria-label', 'Sort by ' + label.trim());
                th.appendChild(btn);
                btn.addEventListener('click', function () {
                    var dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
                    Array.prototype.forEach.call(head.cells, function (c) { c.removeAttribute('aria-sort'); });
                    th.setAttribute('aria-sort', dir);
                    var rows = Array.prototype.slice.call(body.rows);
                    var num = function (r) { var m = (r.cells[col] ? r.cells[col].textContent : '').replace(/,/g, '').match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : NaN; };
                    var numeric = rows.every(function (r) { return !isNaN(num(r)); });
                    rows.sort(function (a, b) {
                        var x = numeric ? num(a) - num(b) : text(a.cells[col]).localeCompare(text(b.cells[col]));
                        return dir === 'ascending' ? x : -x;
                    });
                    rows.forEach(function (r) { body.appendChild(r); });
                    playNote(dir === 'ascending' ? 67 : 60, 0.4);
                });
            });
        });
    }

    /* 14. Scroll reveal: only elements that start below the fold, so nothing visible ever blinks */
    if (cfg.animations && !reduceMotion && 'IntersectionObserver' in window) {
        var revealIO = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                en.target.classList.add('is-in');
                revealIO.unobserve(en.target);
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        var fold = window.innerHeight;
        document.querySelectorAll('.pz-card, .pz-pick, .pz-answer, .pz-finder, .pz-game, .pz-author, .pz-signup, .pz-content > figure, .pz-content > .kg-card, .pz-table-wrap, .pz-home-section > .pz-section-head, .pz-related > h2')
            .forEach(function (el, i) {
                if (el.getBoundingClientRect().top < fold) return;
                el.classList.add('pz-reveal');
                if (el.classList.contains('pz-card')) el.style.transitionDelay = ((Array.prototype.indexOf.call(el.parentNode.children, el) % 3) * 70) + 'ms';
                revealIO.observe(el);
            });
    }

    /* 15. Image lightbox: tap any article image to open it full size, then zoom, pan and browse */
    (function () {
        if (!content) return;
        var skip = '.pz-author, .pz-author-box, .pz-card, .pz-related, .pz-quiz, .pz-taste, .pz-piano, .pz-game, .pz-finder, .pz-home-section, .kg-bookmark-card, .kg-product-card, .kg-header-card, .kg-signup-card';
        function eligible(img) {
            if (img.closest('a') || img.closest(skip)) return false;
            var w = parseInt(img.getAttribute('width'), 10) || img.naturalWidth || 0;
            return !w || w >= 320;
        }
        function bigSrc(img) {
            var best = '', bw = 0;
            (img.getAttribute('srcset') || '').split(',').forEach(function (part) {
                var bits = part.trim().split(/\s+/);
                var w = parseInt(bits[1], 10) || 0;
                if (bits[0] && w >= bw) { best = bits[0]; bw = w; }
            });
            var src = best || img.currentSrc || img.src;
            return src.replace(/\/size\/w\d+(?:h\d+)?\//, '/').replace(/\/content\/images\/format\/[a-z]+\//, '/content/images/');
        }
        function caption(img) {
            var fig = img.closest('figure');
            var cap = fig && fig.querySelector('figcaption');
            return cap ? text(cap) : (img.getAttribute('alt') || '');
        }
        var imgs = Array.prototype.filter.call(content.querySelectorAll('img'), eligible);
        if (!imgs.length) return;

        var box, stage, pic, capEl, countEl, prevBtn, nextBtn, zoomBtn, lastFocus, index = 0;
        var scale = 1, tx = 0, ty = 0, pointers = {}, startDist = 0, startScale = 1, drag = null, swipe = null, lastTap = 0, downAt = null, moved = false, ptype = '';
        var MAX = 4;

        function el(tag, cls, attrs) {
            var e = document.createElement(tag);
            if (cls) e.className = cls;
            Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
            return e;
        }
        function icon(path) { return '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="' + path + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
        function build() {
            box = el('div', 'pz-lb', { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Image viewer', hidden: '' });
            var bar = el('div', 'pz-lb-bar');
            countEl = el('span', 'pz-lb-count', { 'aria-live': 'polite' });
            zoomBtn = el('button', 'pz-lb-btn', { type: 'button', 'aria-label': 'Zoom in' });
            zoomBtn.innerHTML = icon('M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.6-4.6M11 8v6M8 11h6');
            var close = el('button', 'pz-lb-btn', { type: 'button', 'aria-label': 'Close' });
            close.innerHTML = icon('M6 6l12 12M18 6L6 18');
            bar.appendChild(countEl); bar.appendChild(zoomBtn); bar.appendChild(close);
            stage = el('div', 'pz-lb-stage');
            pic = el('img', 'pz-lb-img', { alt: '', draggable: 'false' });
            stage.appendChild(pic);
            prevBtn = el('button', 'pz-lb-btn pz-lb-nav pz-lb-prev', { type: 'button', 'aria-label': 'Previous image' });
            prevBtn.innerHTML = icon('M15 5l-7 7 7 7');
            nextBtn = el('button', 'pz-lb-btn pz-lb-nav pz-lb-next', { type: 'button', 'aria-label': 'Next image' });
            nextBtn.innerHTML = icon('M9 5l7 7-7 7');
            capEl = el('p', 'pz-lb-cap');
            box.appendChild(bar); box.appendChild(stage); box.appendChild(prevBtn); box.appendChild(nextBtn); box.appendChild(capEl);
            document.body.appendChild(box);

            close.addEventListener('click', hide);
            zoomBtn.addEventListener('click', function () { zoomTo(scale > 1 ? 1 : 2.5); });
            prevBtn.addEventListener('click', function () { go(-1); });
            nextBtn.addEventListener('click', function () { go(1); });
            stage.addEventListener('click', function (e) { if (e.target === stage && scale === 1) hide(); });
            box.addEventListener('keydown', onKey);
            stage.addEventListener('wheel', onWheel, { passive: false });
            pic.addEventListener('pointerdown', onDown);
            stage.addEventListener('pointermove', onMove);
            stage.addEventListener('pointerup', onUp);
            stage.addEventListener('pointercancel', onUp);
        }
        function apply(animate) {
            pic.style.transition = animate ? 'transform .2s ease' : 'none';
            pic.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
            box.classList.toggle('is-zoomed', scale > 1);
            zoomBtn.setAttribute('aria-label', scale > 1 ? 'Zoom out' : 'Zoom in');
            zoomBtn.innerHTML = icon(scale > 1 ? 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.6-4.6M8 11h6' : 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.6-4.6M11 8v6M8 11h6');
        }
        function clamp() {
            var r = stage.getBoundingClientRect();
            var w = pic.offsetWidth * scale, h = pic.offsetHeight * scale;
            var mx = Math.max(0, (w - r.width) / 2), my = Math.max(0, (h - r.height) / 2);
            tx = Math.min(mx, Math.max(-mx, tx)); ty = Math.min(my, Math.max(-my, ty));
        }
        function zoomTo(s, cx, cy) {
            var r = stage.getBoundingClientRect();
            var ox = (cx === undefined ? r.left + r.width / 2 : cx) - (r.left + r.width / 2);
            var oy = (cy === undefined ? r.top + r.height / 2 : cy) - (r.top + r.height / 2);
            s = Math.min(MAX, Math.max(1, s));
            tx = ox - (ox - tx) * (s / scale); ty = oy - (oy - ty) * (s / scale);
            scale = s;
            if (scale === 1) { tx = 0; ty = 0; }
            clamp(); apply(true);
        }
        function toggleAt(x, y) { zoomTo(scale > 1 ? 1 : 2.5, x, y); }
        function onWheel(e) {
            e.preventDefault();
            zoomTo(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY);
        }
        function dist() {
            var p = Object.keys(pointers).map(function (k) { return pointers[k]; });
            return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        }
        function onDown(e) {
            pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
            downAt = { x: e.clientX, y: e.clientY }; moved = false; ptype = e.pointerType;
            try { stage.setPointerCapture(e.pointerId); } catch (err) { }
            var n = Object.keys(pointers).length;
            if (n === 2) { startDist = dist(); startScale = scale; drag = null; swipe = null; return; }
            if (scale > 1) drag = { x: e.clientX - tx, y: e.clientY - ty };
            else swipe = { x: e.clientX, y: e.clientY, t: Date.now() };
            if (e.pointerType !== 'mouse') {
                var now = Date.now();
                if (now - lastTap < 300) { toggleAt(e.clientX, e.clientY); lastTap = 0; swipe = null; }
                else lastTap = now;
            }
        }
        function onMove(e) {
            if (!pointers[e.pointerId]) return;
            pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
            if (downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 6) moved = true;
            var n = Object.keys(pointers).length;
            if (n === 2 && startDist) {
                var p = Object.keys(pointers).map(function (k) { return pointers[k]; });
                zoomTo(startScale * dist() / startDist, (p[0].x + p[1].x) / 2, (p[0].y + p[1].y) / 2);
                pic.style.transition = 'none';
            } else if (drag) {
                tx = e.clientX - drag.x; ty = e.clientY - drag.y; clamp(); apply(false);
            } else if (swipe) {
                pic.style.transition = 'none';
                pic.style.transform = 'translate(' + (e.clientX - swipe.x) + 'px,0)';
            }
        }
        function onUp(e) {
            var wasMouseTap = ptype === 'mouse' && !moved && downAt && Object.keys(pointers).length === 1;
            delete pointers[e.pointerId];
            if (wasMouseTap && e.type === 'pointerup') { drag = null; swipe = null; downAt = null; toggleAt(e.clientX, e.clientY); return; }
            if (Object.keys(pointers).length < 2) startDist = 0;
            if (swipe && scale === 1) {
                var dx = e.clientX - swipe.x, dy = e.clientY - swipe.y;
                swipe = null;
                if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) && imgs.length > 1) { go(dx < 0 ? 1 : -1); return; }
                if (dy > 110 && Math.abs(dy) > Math.abs(dx)) { hide(); return; }
                apply(true);
            }
            drag = null;
        }
        function onKey(e) {
            if (e.key === 'Escape') { e.preventDefault(); hide(); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
            else if (e.key === '+' || e.key === '=') zoomTo(scale * 1.4);
            else if (e.key === '-') zoomTo(scale / 1.4);
            else if (e.key === 'Tab') {
                var f = Array.prototype.filter.call(box.querySelectorAll('button'), function (b) { return !b.hidden; });
                var i = f.indexOf(document.activeElement);
                if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
                else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
            }
        }
        function show(i) {
            index = (i + imgs.length) % imgs.length;
            var img = imgs[index];
            scale = 1; tx = 0; ty = 0;
            box.classList.add('is-loading');
            pic.onload = function () { box.classList.remove('is-loading'); };
            pic.onerror = function () { if (pic.src !== img.currentSrc) pic.src = img.currentSrc || img.src; };
            pic.src = img.currentSrc || img.src;
            var full = bigSrc(img);
            if (full && full !== pic.src) {
                var pre = new Image();
                pre.onload = function () { if (imgs[index] === img) pic.src = full; };
                pre.src = full;
            }
            pic.alt = img.getAttribute('alt') || '';
            var c = caption(img);
            capEl.textContent = c; capEl.hidden = !c;
            countEl.textContent = imgs.length > 1 ? (index + 1) + ' / ' + imgs.length + (window.innerWidth <= 640 ? ' · swipe for more' : '') : '';
            prevBtn.hidden = nextBtn.hidden = imgs.length < 2;
            apply(false);
        }
        function go(d) { show(index + d); }
        function open(i) {
            if (!box) build();
            lastFocus = document.activeElement;
            box.hidden = false;
            document.documentElement.classList.add('pz-lb-open');
            show(i);
            requestAnimationFrame(function () { box.classList.add('is-open'); });
            box.querySelector('.pz-lb-bar .pz-lb-btn:last-child').focus();
        }
        function hide() {
            if (!box || box.hidden) return;
            box.classList.remove('is-open');
            box.hidden = true;
            pointers = {}; drag = null; swipe = null;
            document.documentElement.classList.remove('pz-lb-open');
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }
        imgs.forEach(function (img, i) {
            img.classList.add('pz-zoomable');
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'Open larger image' + (img.alt ? ': ' + img.alt : ''));
            img.addEventListener('click', function (e) { e.preventDefault(); open(i); });
            img.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
            });
        });
    })();

})();
