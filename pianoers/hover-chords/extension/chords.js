(function (g) {
    'use strict';
    var SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    var LETTER = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    var FULL = /^([A-G])([#b♯♭]?)(.*?)(?:\/([A-G])([#b♯♭]?))?$/;

    function acc(a) { return a === '#' || a === '♯' ? 1 : a === 'b' || a === '♭' ? -1 : 0; }
    function pc(letter, a) { return (LETTER[letter] + acc(a) + 12) % 12; }

    function parseSuffix(s) {
        var r = { third: 4, fifth: 7, seventh: null, extra: [], power: false, minor: false };
        var maj = false, dim = false, m;
        s = s.replace(/[()]/g, '').replace(/Δ/g, 'maj');
        if ((m = s.match(/^(maj|Maj|MAJ|ma(?=\d)|M(?!aj))/))) { maj = true; s = s.slice(m[0].length); }
        else if ((m = s.match(/^(min|mi(?!n)|m|-)/))) {
            r.third = 3; r.minor = true; s = s.slice(m[0].length);
            if ((m = s.match(/^(maj|Maj|M)/))) { maj = true; s = s.slice(m[0].length); }
        }
        else if ((m = s.match(/^(dim|°)/))) { r.third = 3; r.fifth = 6; dim = true; s = s.slice(m[0].length); }
        else if ((m = s.match(/^(aug|\+)/))) { r.fifth = 8; s = s.slice(m[0].length); }
        else if ((m = s.match(/^ø/))) { r.third = 3; r.fifth = 6; r.seventh = 10; s = s.slice(1); if (s.charAt(0) === '7') s = s.slice(1); }
        function sev() { return dim ? 9 : maj ? 11 : 10; }
        if ((m = s.match(/^(6\/9|69|13|11|9|7|6|5)/))) {
            var n = m[1]; s = s.slice(n.length);
            if (n === '5') { if (r.third !== 4 || maj) return null; r.power = true; }
            else if (n === '6') r.extra.push(9);
            else if (n === '69' || n === '6/9') { r.extra.push(9); r.extra.push(14); }
            else if (n === '7') r.seventh = sev();
            else if (n === '9') { r.seventh = sev(); r.extra.push(14); }
            else if (n === '11') { r.seventh = sev(); r.extra.push(14); r.extra.push(17); }
            else if (n === '13') { r.seventh = sev(); r.extra.push(14); r.extra.push(21); }
        } else if (maj && s.length && !/^(sus|add)/.test(s)) return null;
        while (s.length) {
            if ((m = s.match(/^sus(2|4)?/))) { r.third = m[1] === '2' ? 2 : 5; s = s.slice(m[0].length); continue; }
            if ((m = s.match(/^add(13|11|9|6|4|2)/))) { r.extra.push({ 13: 21, 11: 17, 9: 14, 6: 9, 4: 5, 2: 2 }[m[1]]); s = s.slice(m[0].length); continue; }
            if ((m = s.match(/^([b#♭♯+-])(13|11|9|5)/))) {
                var up = m[1] === '#' || m[1] === '♯' || m[1] === '+';
                var deg = m[2];
                if (deg === '5') r.fifth = up ? 8 : 6;
                else r.extra.push({ 9: 14, 11: 17, 13: 21 }[deg] + (up ? 1 : -1));
                s = s.slice(m[0].length); continue;
            }
            if ((m = s.match(/^(,|\s)/))) { s = s.slice(1); continue; }
            return null;
        }
        return r;
    }

    function parse(name) {
        if (!name || name.length > 16) return null;
        var m = String(name).trim().match(FULL);
        if (!m) return null;
        var q = parseSuffix(m[3]);
        if (!q) return null;
        var root = pc(m[1], m[2]);
        var tones = q.power ? [0, 7] : [0, q.third, q.fifth];
        if (q.seventh !== null) tones.push(q.seventh);
        q.extra.forEach(function (x) { if (tones.indexOf(x) === -1) tones.push(x); });
        tones = tones.filter(function (t, i, a) { return a.indexOf(t) === i; }).sort(function (a, b) { return a - b; });
        var flats = acc(m[2]) < 0 || (!m[2] && m[1] === 'F') || (acc(m[2]) === 0 && q.minor && /[DGC]/.test(m[1]));
        if (acc(m[2]) > 0) flats = false;
        return {
            name: String(name).trim(), root: root, rootName: m[1] + (m[2] || ''), suffix: m[3],
            bass: m[4] ? pc(m[4], m[5]) : null, bassName: m[4] ? m[4] + (m[5] || '') : null,
            tones: tones, flats: flats, minor: q.minor
        };
    }

    function noteName(p, flats) { return (flats ? FLAT : SHARP)[((p % 12) + 12) % 12]; }

    var LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    function degreeOf(t, ch) {
        var m = { 0: 1, 1: 9, 2: 2, 3: 3, 4: 3, 5: 4, 7: 5, 10: 7, 11: 7, 13: 9, 14: 9, 15: 9, 17: 11, 18: 11, 20: 13, 21: 13 };
        if (t === 6) return ch.tones.indexOf(7) === -1 ? 5 : 11;
        if (t === 8) return ch.tones.indexOf(7) === -1 ? 5 : 13;
        if (t === 9) return ch.tones.indexOf(10) === -1 && ch.tones.indexOf(11) === -1 && ch.tones.indexOf(6) !== -1 && ch.tones.indexOf(7) === -1 ? 7 : 6;
        return m[t] || 1;
    }
    function spell(ch, t) {
        var target = (ch.root + t) % 12;
        var deg = degreeOf(t, ch);
        var li = (LETTERS.indexOf(ch.rootName.charAt(0)) + deg - 1) % 7;
        var letter = LETTERS[li];
        var diff = ((target - LETTER[letter]) % 12 + 18) % 12 - 6;
        if (diff === 0) return letter;
        if (diff === 1) return letter + '#';
        if (diff === -1) return letter + 'b';
        return noteName(target, ch.flats);
    }
    function toneNames(ch) { return ch.tones.map(function (t) { return spell(ch, t); }); }

    function voicing(ch, inversion) {
        var base = 12 + ch.root;
        var notes = ch.tones.map(function (t) { return base + t; });
        var names = {};
        ch.tones.forEach(function (t) { names[(ch.root + t) % 12] = spell(ch, t); });
        var inv = ((inversion || 0) % notes.length + notes.length) % notes.length;
        var close = notes.filter(function (n) { return n - base < 12; });
        var upper = notes.filter(function (n) { return n - base >= 12; });
        for (var i = 0; i < inv && i < close.length; i++) close[i] += 12;
        notes = close.concat(upper).sort(function (a, b) { return a - b; });
        var bass = null;
        if (ch.bass !== null) {
            bass = ch.bass;
            while (bass >= notes[0]) bass -= 12;
            while (bass < notes[0] - 12) bass += 12;
        }
        return {
            notes: notes, bass: bass, inversions: Math.min(close.length, 4),
            label: function (abs) { return abs === bass ? ch.bassName : (names[((abs % 12) + 12) % 12] || noteName(abs, ch.flats)); }
        };
    }

    function transposeName(name, steps) {
        if (!steps) return name;
        var m = String(name).match(FULL);
        if (!m) return name;
        var useFlat = acc(m[2]) < 0 || (!m[2] && m[1] === 'F' && steps < 0);
        if (acc(m[2]) > 0) useFlat = false;
        var root = noteName(pc(m[1], m[2]) + steps, useFlat);
        var bass = m[4] ? '/' + noteName(pc(m[4], m[5]) + steps, useFlat) : '';
        return root + m[3] + bass;
    }

    function inversionLabel(i) { return ['Root position', '1st inversion', '2nd inversion', '3rd inversion'][i] || (i + 'th inversion'); }

    g.HoverChords = { toneNames: toneNames, parse: parse, voicing: voicing, noteName: noteName, transposeName: transposeName, inversionLabel: inversionLabel };
})(typeof window !== 'undefined' ? window : globalThis);
