/* Pianoers theme. No dependencies; every feature is optional and fails quietly.
   1. Mobile menu            5. Contents list
   2. Image framing          6. Picks, finder, rail pick and buy bar
   3. Table scrolling        7. ItemList structured data
   4. Affiliate links                                                        */
(function () {
    'use strict';

    var cfg = window.PZ || {};
    var content = document.querySelector('.pz-content');

    function storageGet(key) { try { return window.sessionStorage.getItem(key); } catch (e) { return null; } }
    function storageSet(key, value) { try { window.sessionStorage.setItem(key, value); } catch (e) { /* private mode */ } }
    function text(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
    function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60); }

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
        var name = text(el.querySelector('h2, h3'));
        if (!el.id) el.id = slugify(name) || ('pick-' + (i + 1));
        return {
            el: el, id: el.id, name: name,
            rank: parseInt(el.getAttribute('data-rank'), 10) || (i + 1),
            best: text(el.querySelector('.pz-best')),
            price: el.getAttribute('data-price') || '',
            img: img ? (img.currentSrc || img.src) : '',
            buyHref: buy ? buy.href : '',
            buyText: buy ? text(buy) : ''
        };
    }).sort(function (a, b) { return a.rank - b.rank; });
    var byId = {};
    picks.forEach(function (p) { byId[p.id] = p; });

    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function buyLink(p, label, extraClass) {
        if (!p.buyHref) return '';
        return '<a class="pz-btn pz-btn-buy ' + (extraClass || '') + '" href="' + esc(p.buyHref) + '" rel="sponsored nofollow noopener" target="_blank">' + esc(label || p.buyText || 'Check price') + '</a>';
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
            buyLink(current, 'Check price') +
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
    var shareBtns = document.querySelectorAll('[data-pz-share]');
    if (shareBtns.length && (navigator.share || (navigator.clipboard && navigator.clipboard.writeText))) {
        document.querySelectorAll('.pz-share-row').forEach(function (r) { r.hidden = false; });
        shareBtns.forEach(function (btn) {
            btn.hidden = false;
            btn.addEventListener('click', function () {
                var url = (document.querySelector('link[rel="canonical"]') || {}).href || window.location.href;
                var title = document.title;
                if (navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
                navigator.clipboard.writeText(url).then(function () {
                    var old = btn.textContent;
                    btn.textContent = 'Link copied ✓';
                    setTimeout(function () { btn.textContent = old; }, 2000);
                }).catch(function () {});
            });
        });
    }

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

})();
