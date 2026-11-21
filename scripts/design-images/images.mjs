// Guide illustrations. Every fact shown here comes from the guide it
// illustrates (src/pages/learn/*.astro); change both together.

const WHITE = [0, 2, 4, 5, 7, 9, 11];
const NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_AFTER = { 0: 1, 1: 3, 3: 6, 4: 8, 5: 10 }; // white index in octave -> semitone

/** Keyboard starting on C. hl maps semitone offset -> colour; names shows note names on lit keys. */
function kb({ whites = 14, hl = {}, w = 300, h = 120, names = true, stroke = '#1b1915' }) {
  const ww = w / whites, bw = ww * 0.6, bh = h * 0.62;
  let svg = `<svg width="${w}" height="${h + (names ? 26 : 0)}" viewBox="0 0 ${w} ${h + (names ? 26 : 0)}" xmlns="http://www.w3.org/2000/svg">`;
  for (let i = 0; i < whites; i++) {
    const semi = WHITE[i % 7] + 12 * Math.floor(i / 7);
    const fill = hl[semi] ?? '#fff';
    svg += `<rect x="${i * ww + 0.75}" y="0.75" width="${ww - 1.5}" height="${h - 1.5}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
    if (names && hl[semi]) svg += `<text x="${i * ww + ww / 2}" y="${h + 20}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="16" fill="#1b1915">${NAMES[i % 7]}</text>`;
  }
  for (let i = 0; i < whites - 1; i++) {
    const s = BLACK_AFTER[i % 7];
    if (s === undefined) continue;
    const semi = s + 12 * Math.floor(i / 7);
    svg += `<rect x="${(i + 1) * ww - bw / 2}" y="0.75" width="${bw}" height="${bh}" rx="3" fill="${hl[semi] ?? '#1b1915'}" stroke="${stroke}" stroke-width="1.5"/>`;
  }
  return svg + '</svg>';
}
const B = '#c8962e', R = '#e9a58f', BL = '#9cc0e6';

const head = (eyebrow, title, sub = '') => `<p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}`;

export const IMAGES = [
  {
    file: 'piano-chords-for-beginners-c-f-g-a-minor',
    title: 'Your first four piano chords: C, F, G and A minor',
    description: 'Keyboard diagrams of the four piano chords beginners learn first: C major (C E G), F major (F A C), G major (G B D) and A minor (A C E).',
    keywords: ['piano chords for beginners', 'C major chord', 'F major chord', 'G major chord', 'A minor chord', 'piano chord chart', 'keyboard chords'],
    alt: 'Keyboard diagrams showing C major (C E G), F major (F A C), G major (G B D) and A minor (A C E) highlighted',
    page: '/learn/piano-chords-for-beginners',
    css: `.grid{display:grid;grid-template-columns:repeat(2,318px);gap:16px;position:absolute;right:56px;top:50%;transform:translateY(-50%)}
          .grid .card{padding:16px 18px 10px}.grid h3{font-family:Fraunces;font-size:26px;font-weight:600;margin-bottom:10px}.grid h3 span{font-family:Inter;font-size:16px;color:var(--muted);font-weight:500;margin-left:8px}
          .left{width:380px;margin-top:40px}.left h1{font-size:54px}.left .sub{font-size:21px}`,
    html: `<div class="frame"><div class="left">${head('Piano chords for beginners', 'Your first four chords', 'Major chord: a root note plus the notes 4 and 7 semitones above it. Minor: lower the middle note by one.')}</div></div>
      <div class="grid">
        <div class="card"><h3>C major<span>C · E · G</span></h3>${kb({ whites: 10, hl: { 0: B, 4: B, 7: B }, w: 280, h: 116 })}</div>
        <div class="card"><h3>F major<span>F · A · C</span></h3>${kb({ whites: 10, hl: { 5: B, 9: B, 12: B }, w: 280, h: 116 })}</div>
        <div class="card"><h3>G major<span>G · B · D</span></h3>${kb({ whites: 10, hl: { 7: B, 11: B, 14: B }, w: 280, h: 116 })}</div>
        <div class="card"><h3>A minor<span>A · C · E</span></h3>${kb({ whites: 10, hl: { 9: BL, 12: BL, 16: BL }, w: 280, h: 116 })}</div>
      </div>`,
  },
  {
    file: 'how-to-play-piano-by-ear-three-steps',
    title: 'How to play a song on piano by ear in three steps',
    description: 'Three steps to play piano by ear: find the key, work out the chords from the bass line, then pick out the melody. Includes the I–V–vi–IV progression in C (C G Am F).',
    keywords: ['play piano by ear', 'how to play piano by ear', 'learn songs by ear', 'chord progressions', 'I V vi IV', 'ear training piano'],
    alt: 'Three steps to play piano by ear: find the key, work out the chords, pick out the melody, with the progression C G Am F',
    page: '/learn/play-piano-by-ear',
    css: `.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px}.steps .card{padding:28px 28px 32px}
          .n{width:44px;height:44px;border-radius:50%;background:var(--brass);display:grid;place-items:center;font-family:Fraunces;font-weight:700;font-size:24px;margin-bottom:14px}
          .steps h3{font-family:Fraunces;font-size:34px;font-weight:600;line-height:1.1}.steps p{font-size:22px;color:var(--muted);margin-top:10px}
          .prog{margin-top:40px;display:flex;align-items:center;gap:14px;font-size:23px;color:var(--muted);margin-left:260px}.prog b{font-family:Fraunces;font-size:32px;color:var(--ink)}`,
    html: `<div class="frame">${head('Playing by ear', 'Work out any song in three steps')}
      <div class="steps">
        <div class="card"><div class="n">1</div><h3>Find the key</h3><p>The note that sounds like home.</p></div>
        <div class="card"><div class="n">2</div><h3>Work out the chords</h3><p>Let the bass line guide you.</p></div>
        <div class="card"><div class="n">3</div><h3>Pick out the melody</h3><p>Play it on top of the chords.</p></div>
      </div>
      <div class="prog">Learn by sound first: <span class="chip">I–V–vi–IV</span> <b>C · G · Am · F</b></div></div>`,
  },
  {
    file: 'piano-practice-routine-20-minute-plan',
    title: 'A 20-minute piano practice routine for beginners',
    description: 'A 20-minute beginner piano practice plan: 2 minutes warm-up, 5 minutes review, 10 minutes on one new thing, 3 minutes playing for fun. Practise most days.',
    keywords: ['piano practice routine', 'how to practice piano', 'piano practice plan', 'beginner piano practice', '20 minute practice', 'adult piano practice'],
    alt: 'Timeline of a 20-minute piano practice session: 2 minutes warm-up, 5 minutes review, 10 minutes one new thing, 3 minutes play for fun',
    page: '/learn/piano-practice-routine',
    css: `.bar{display:flex;height:120px;border-radius:18px;overflow:hidden;margin-top:56px;border:1.5px solid var(--ink)}
          .bar div{display:flex;align-items:center;justify-content:center;font-family:Fraunces;font-weight:700;font-size:38px;border-right:1.5px solid var(--ink)}.bar div:last-child{border-right:0}
          .legend{display:grid;grid-template-columns:2fr 5fr 10fr 3fr;gap:0;margin-top:14px}
          .legend div{padding-right:14px;font-size:21px;line-height:1.3;color:var(--muted)}.legend b{display:block;font-size:24px;color:var(--ink)}
          .note{margin-top:36px;font-size:23px;margin-left:260px}`,
    html: `<div class="frame">${head('Piano practice routine', 'A 20-minute practice plan')}
      <div class="bar"><div style="flex:2;background:#f4e7c8">2</div><div style="flex:5;background:#e9d3a3">5</div><div style="flex:10;background:#c8962e">10 minutes</div><div style="flex:3;background:#9cc0e6">3</div></div>
      <div class="legend"><div><b>Warm up</b>relax</div><div><b>Review</b>something you already know</div><div><b>One new thing</b>in small, slow sections</div><div><b>Play</b>for fun</div></div>
      <p class="note"><span class="chip">Most days</span> beats one long session a week.</p></div>`,
  },
  {
    file: 'how-long-to-learn-piano-milestones',
    title: 'How long does it take to learn piano? Realistic milestones',
    description: 'Realistic piano milestones for adult beginners practising 20 to 30 minutes most days: first chords in your first week, simple accompaniment in a few weeks to 3 months, solid beginner in 6 to 12 months, early intermediate in 1 to 3 years.',
    keywords: ['how long does it take to learn piano', 'learn piano timeline', 'piano milestones', 'adult beginner piano', 'piano progress'],
    alt: 'Staircase of piano milestones: first chords in week one, simple accompaniment in weeks to 3 months, solid beginner at 6 to 12 months, early intermediate at 1 to 3 years, advanced after many years',
    page: '/learn/how-long-does-it-take-to-learn-piano',
    css: `.stairs{position:absolute;left:64px;right:64px;bottom:96px;height:330px;display:grid;grid-template-columns:repeat(5,1fr);gap:14px;align-items:end}
          .st{background:var(--card);border:1.5px solid var(--line);border-top:6px solid var(--brass);border-radius:14px;padding:16px 16px;display:flex;flex-direction:column;justify-content:flex-start}
          .st b{font-family:Fraunces;font-size:24px;line-height:1.1}.st span{font-size:17px;color:var(--muted);margin-top:6px}`,
    html: `<div class="frame">${head('With 20–30 minutes most days', 'How long does it take to learn piano?')}</div>
      <div class="stairs">
        <div class="st" style="height:110px"><b>First chords</b><span>Your first week</span></div>
        <div class="st" style="height:165px"><b>Simple accompaniment</b><span>A few weeks to 3 months</span></div>
        <div class="st" style="height:220px"><b>Solid beginner</b><span>6 to 12 months</span></div>
        <div class="st" style="height:275px"><b>Early intermediate</b><span>1 to 3 years</span></div>
        <div class="st" style="height:330px;border-top-color:var(--ink)"><b>Advanced</b><span>Many years</span></div>
      </div>`,
  },
  {
    file: 'choosing-a-keyboard-61-76-88-keys',
    title: 'Choosing a keyboard or digital piano: 61, 76 or 88 keys',
    description: 'How to choose a beginner keyboard: 88 weighted keys if space and budget allow, otherwise 61 or 76 full-size, touch-sensitive keys with a sustain pedal socket.',
    keywords: ['choosing a keyboard', 'best keyboard for beginners', 'digital piano for beginners', '88 keys vs 61 keys', 'weighted keys', 'touch sensitive keyboard'],
    alt: 'Three keyboards compared by size, 88, 76 and 61 keys, next to a checklist: full-size keys, touch-sensitive, sustain pedal socket, weighted keys a bonus',
    page: '/learn/choosing-a-keyboard',
    css: `.kbs{position:absolute;left:64px;top:210px;display:flex;flex-direction:column;gap:16px}.kbs p{font-size:20px;margin-top:2px}.kbs p b{font-family:Fraunces;font-size:22px;margin-right:8px}
          .check{position:absolute;right:64px;top:210px;width:330px}.check h3{font-family:Fraunces;font-size:24px;margin-bottom:10px}
          .check li{list-style:none;font-size:19px;padding:7px 0 7px 34px;position:relative}.check li::before{content:'✓';position:absolute;left:0;top:5px;width:24px;height:24px;border-radius:50%;background:var(--soft);color:var(--brass-ink);font-weight:800;font-size:15px;display:grid;place-items:center}`,
    html: `<div class="frame">${head('Choosing a keyboard', 'Your first keyboard or digital piano')}</div>
      <div class="kbs">
        <div>${kb({ whites: 52, w: 700, h: 58, names: false })}<p><b>88 keys</b>weighted, if space and budget allow</p></div>
        <div>${kb({ whites: 45, w: 606, h: 58, names: false })}<p><b>76 keys</b>fine to start</p></div>
        <div>${kb({ whites: 36, w: 485, h: 58, names: false })}<p><b>61 keys</b>the minimum</p></div>
      </div>
      <div class="card check"><h3>Look for</h3><ul style="padding:0"><li>Full-size keys</li><li>Touch-sensitive keys</li><li>A sustain pedal socket</li><li>Weighted keys: a bonus</li></ul></div>`,
  },
  {
    file: 'learn-piano-online-what-you-need',
    title: 'Learn piano online: what you need to start',
    description: 'What adults need to learn piano online: a keyboard with at least 61 touch-sensitive keys, a structured course followed in order, and 15 to 30 minutes most days.',
    keywords: ['learn piano online', 'online piano lessons', 'learn piano as an adult', 'piano course online', 'piano lessons at home'],
    alt: 'Three things you need to learn piano online: a keyboard with 61 or more touch-sensitive keys, a structured course, and 15 to 30 minutes most days',
    page: '/learn/learn-piano-online',
    css: `.need{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px}.need .card{padding:28px 28px 32px}
          .ic{height:86px;display:flex;align-items:center;margin-bottom:12px}.need h3{font-family:Fraunces;font-size:30px;font-weight:600;line-height:1.08}.need p{font-size:21px;color:var(--muted);margin-top:8px}`,
    html: `<div class="frame">${head('Learn piano online', 'What you need to start')}
      <div class="need">
        <div class="card"><div class="ic">${kb({ whites: 10, w: 190, h: 70, names: false, hl: { 0: B, 4: B, 7: B } })}</div><h3>A keyboard</h3><p>At least 61 touch-sensitive keys</p></div>
        <div class="card"><div class="ic"><svg width="86" height="86" viewBox="0 0 86 86"><rect x="2" y="10" width="82" height="62" rx="12" fill="#1b1915"/><path d="M36 28 L58 41 L36 54 Z" fill="#c8962e"/><rect x="24" y="78" width="38" height="6" rx="3" fill="#1b1915"/></svg></div><h3>A structured course</h3><p>One you follow in order</p></div>
        <div class="card"><div class="ic"><svg width="86" height="86" viewBox="0 0 86 86"><circle cx="43" cy="43" r="38" fill="#fff" stroke="#1b1915" stroke-width="5"/><path d="M43 43 L43 5 A38 38 0 0 1 81 43 Z" fill="#c8962e"/><circle cx="43" cy="43" r="38" fill="none" stroke="#1b1915" stroke-width="5"/><path d="M43 18 V43 H62" stroke="#1b1915" stroke-width="5" fill="none" stroke-linecap="round"/></svg></div><h3>15–30 minutes</h3><p>Most days, not once a week</p></div>
      </div></div>`,
  },
  {
    file: 'piano-backing-tracks-four-styles',
    title: 'Piano backing tracks in four styles: ballad, pop, blues shuffle and boogie',
    description: 'Play-along piano backing tracks: choose a chord progression, key, style and tempo. Drums and bass loop after a one-bar count-in in ballad, pop, slow blues shuffle or rock and roll boogie style.',
    keywords: ['piano backing tracks', 'play along tracks piano', 'piano practice tracks', 'chord progression backing track', 'blues shuffle backing track'],
    alt: 'Four backing track styles, ballad, pop, slow blues shuffle and rock and roll boogie, each with what to play, under a one-bar count-in',
    page: '/learn/piano-backing-tracks',
    css: `.styles{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:44px}.styles .card{padding:24px 22px 26px}
          .styles h3{font-family:Fraunces;font-size:28px;line-height:1.08;min-height:62px}.styles p{font-size:19px;color:var(--muted);margin-top:8px;line-height:1.35}
          .beats{display:flex;gap:8px;margin-top:14px}.beats i{width:26px;height:26px;border-radius:50%;border:2px solid var(--ink);display:inline-block}.beats i.on{background:var(--brass)}
          .count{margin-top:36px;display:flex;gap:12px;align-items:center;font-size:22px;margin-left:260px}.count b{width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-family:Fraunces;font-size:21px}`,
    html: `<div class="frame">${head('Play-along backing tracks', 'Play the chords, the band plays along')}
      <div class="styles">
        <div class="card"><h3>Ballad</h3><div class="beats"><i class="on"></i><i></i><i></i><i></i></div><p>Bass note on beat 1, then a slow broken chord</p></div>
        <div class="card"><h3>Pop</h3><div class="beats"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div><p>A chord on every beat</p></div>
        <div class="card"><h3>Slow blues shuffle</h3><div class="beats"><i></i><i class="on"></i><i></i><i class="on"></i></div><p>Chords on the off-beats, lazy and swung</p></div>
        <div class="card"><h3>Rock ’n’ roll boogie</h3><div class="beats"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div><p>Chords on every beat over a walking bass</p></div>
      </div>
      <div class="count">One-bar count-in <b>1</b><b>2</b><b>3</b><b>4</b></div></div>`,
  },
];
