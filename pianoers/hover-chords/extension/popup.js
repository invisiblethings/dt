(function () {
    'use strict';
    var $ = function (id) { return document.getElementById(id); };
    var defaults = { enabled: true, disabledHosts: [], transpose: {}, sound: true };
    var host = null, tabId = null, s = defaults;

    function fmt(n) { return n > 0 ? '+' + n : String(n); }
    function refresh() {
        var on = s.enabled && host && s.disabledHosts.indexOf(host) === -1;
        $('global').checked = s.enabled;
        $('site').checked = !!host && s.disabledHosts.indexOf(host) === -1;
        $('site').disabled = !host || !s.enabled;
        $('sound').checked = s.sound;
        var t = (host && parseInt(s.transpose[host], 10)) || 0;
        $('shift').textContent = fmt(t);
        $('reset').hidden = !t;
        $('up').disabled = $('down').disabled = !on;
    }
    function save(patch) { Object.assign(s, patch); chrome.storage.local.set(patch, refresh); }
    function status() {
        if (tabId === null) return;
        chrome.tabs.sendMessage(tabId, { type: 'hc-status' }, function (r) {
            var el = $('status');
            if (chrome.runtime.lastError || !r) { el.textContent = 'Hover Chords can’t run on this page.'; el.className = 'status'; return; }
            if (!r.active) { el.textContent = 'Off on this site.'; el.className = 'status'; return; }
            if (r.count) { el.textContent = r.count + ' chord' + (r.count === 1 ? '' : 's') + ' found (' + r.distinct + ' different). Hover one to see it.'; el.className = 'status ok'; }
            else { el.textContent = 'No chord sheet found on this page.'; el.className = 'status'; }
        });
    }
    function shiftBy(d) {
        if (!host) return;
        var tr = Object.assign({}, s.transpose);
        var v = ((parseInt(tr[host], 10) || 0) + d);
        if (v > 11) v -= 12; if (v < -11) v += 12;
        if (v) tr[host] = v; else delete tr[host];
        save({ transpose: tr });
    }

    chrome.storage.local.get(defaults, function (v) {
        s = Object.assign({}, defaults, v);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tab = tabs && tabs[0];
            if (tab) {
                tabId = tab.id;
                try { var u = new URL(tab.url); host = u.protocol === 'file:' ? 'local-file' : (/^https?:$/.test(u.protocol) ? u.hostname : null); } catch (e) { host = null; }
            }
            $('host').textContent = host === 'local-file' ? 'Files on this computer' : (host || 'Not available here');
            refresh(); status();
        });
    });
    $('site').addEventListener('change', function () {
        var list = s.disabledHosts.filter(function (h) { return h !== host; });
        if (!this.checked) list.push(host);
        save({ disabledHosts: list });
        setTimeout(status, 300);
    });
    $('global').addEventListener('change', function () { save({ enabled: this.checked }); setTimeout(status, 300); });
    $('sound').addEventListener('change', function () { save({ sound: this.checked }); });
    $('up').addEventListener('click', function () { shiftBy(1); });
    $('down').addEventListener('click', function () { shiftBy(-1); });
    $('reset').addEventListener('click', function () { var tr = Object.assign({}, s.transpose); delete tr[host]; save({ transpose: tr }); });
})();
