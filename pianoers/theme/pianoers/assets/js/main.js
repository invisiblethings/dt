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

    /* 4. Affiliate links always carry rel="sponsored" and open in a new tab. */
    var domains = String(cfg.affiliateDomains || '').split(',').map(function (d) { return d.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, ''); }).filter(Boolean);
    function isAffiliate(a) {
        if (!domains.length || !a.hostname) return false;
        var host = a.hostname.toLowerCase().replace(/^www\./, '');
        return domains.some(function (d) { d = d.replace(/^www\./, ''); return host === d || host.slice(-(d.length + 1)) === '.' + d; });
    }
    function markAffiliate(a) {
        var rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
        ['sponsored', 'nofollow', 'noopener'].forEach(function (r) { if (rel.indexOf(r) === -1) rel.push(r); });
        a.setAttribute('rel', rel.join(' '));
        a.setAttribute('target', '_blank');
    }
    document.querySelectorAll('.gh-content a[href]').forEach(function (a) { if (isAffiliate(a)) markAffiliate(a); });

    /* 5. Contents list from the post's H2 headings (3 or more). */
    var tocLinks = [];
    if (cfg.toc && content) {
        var heads = Array.prototype.filter.call(content.querySelectorAll('h2'), function (h) {
            return !h.closest('.pz-answer, .pz-finder, .kg-signup-card, .kg-header-card') && text(h);
        });
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
})();
