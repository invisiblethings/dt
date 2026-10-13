/*!
 * Alter Phase Roofing — chat widget (vanilla JS, no dependencies, Shadow DOM isolated)
 *
 * Embed (one line, anywhere in the page):
 *   <script src="https://YOUR-WORKER.workers.dev/widget.js" async></script>
 *
 * Optional data attributes on that script tag:
 *   data-api="https://YOUR-WORKER.workers.dev"   API base (defaults to the script's own origin)
 *   data-phone="(929) 370-1552"                  number shown in the widget
 *   data-phone-tel="+19293701552"                number dialed by call buttons
 *   data-teaser-delay="7000"                     ms before the proactive teaser (0 = never)
 *   data-turnstile-sitekey="0x..."               enables Cloudflare Turnstile (pair with TURNSTILE_SECRET)
 *
 * JS API: window.AlterPhaseChat.open() / .close() / .reset()
 */
(function () {
  'use strict';
  if (window.AlterPhaseChat) return;

  /* ====================================================================== */
  /* Configuration — tweak freely                                           */
  /* ====================================================================== */
  var TIMING = {
    readMin: 600, // "reading" pause before the typing dots appear (ms)
    readMax: 1200,
    msPerCharMin: 25, // typing speed range (ms per character)
    msPerCharMax: 40,
    typeMin: 1200, // clamp for the typing time of one bubble (ms)
    typeMax: 4500,
    jitter: 250, // +/- random jitter added to typing time
    betweenBubblesMin: 350, // pause between two bubbles of the same reply
    betweenBubblesMax: 800,
    greetingRead: 450, // pause before the greeting starts typing on first open
    teaserDelay: 7000, // ms after page load before the teaser bubble shows
  };

  var COPY = {
    name: 'Alex',
    title: 'Alter Phase Virtual Assistant',
    status: 'Typically replies in a minute',
    teaser: 'Got a leak or need a free roof estimate? I can help 👋',
    greeting: [
      "Hey there! I'm Alex, the virtual assistant for Alter Phase Roofing.",
      'What can I help you with today?',
    ],
    chips: ['Free estimate', 'Roof repair', 'Roof replacement', 'Leak emergency', 'Gutters & siding'],
    placeholder: 'Type your message…',
    privacy: 'By sharing your info you agree to be contacted about your estimate.',
    reviews: '104 Google reviews',
    licensed: 'Licensed & Insured',
    leadSaved: 'Your details were sent to the Alter Phase team',
    offline: [
      "Sorry, I'm having trouble connecting right now.",
      'You can call us at {PHONE}, or leave your name and number below and we’ll call you back.',
    ],
  };

  var STORAGE_KEY = 'apchat:v1';
  var SESSION_TEASER_KEY = 'apchat:teaser';
  var EXPIRY_MS = 24 * 60 * 60 * 1000;
  var MAX_STORED = 60;

  /* ====================================================================== */
  /* Setup                                                                  */
  /* ====================================================================== */
  var script =
    document.currentScript ||
    document.querySelector('script[data-ap-chat],script[src*="/widget.js"],script[src*="/chat.js"]');
  var ds = (script && script.dataset) || {};
  var API = (ds.api || (script && script.src ? new URL(script.src, location.href).origin : '')).replace(/\/+$/, '');
  var PHONE = ds.phone || '(929) 370-1552';
  var PHONE_TEL = ds.phoneTel || '+1' + PHONE.replace(/\D/g, '').slice(-10);
  if (ds.teaserDelay != null && ds.teaserDelay !== '') TIMING.teaserDelay = Number(ds.teaserDelay);
  var TURNSTILE_KEY = ds.turnstileSitekey || '';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobileMq = window.matchMedia ? window.matchMedia('(max-width: 600px)') : { matches: false };

  function now() {
    return Date.now();
  }
  function rand(a, b) {
    return a + Math.random() * (b - a);
  }
  function sleep(ms) {
    return new Promise(function (r) {
      setTimeout(r, Math.max(0, ms));
    });
  }
  function typingMs(text) {
    var perChar = rand(TIMING.msPerCharMin, TIMING.msPerCharMax);
    var t = (text || '').length * perChar + rand(-TIMING.jitter, TIMING.jitter);
    return Math.min(TIMING.typeMax, Math.max(TIMING.typeMin, t));
  }
  function uid() {
    var a = new Uint8Array(12);
    (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a) : a.forEach(function (_, i) { a[i] = Math.random() * 256; });
    return 'c_' + Array.prototype.map.call(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }
  function track(event, params) {
    try {
      window.dataLayer = window.dataLayer || [];
      var o = { event: event };
      for (var k in params || {}) o[k] = params[k];
      window.dataLayer.push(o);
    } catch (e) {}
  }
  function store(kind) {
    try {
      return window[kind];
    } catch (e) {
      return null;
    }
  }

  /* ---------------------------- state ----------------------------------- */
  function freshState() {
    var params = new URLSearchParams(location.search);
    var utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(function (k) {
      if (params.get(k)) utm[k] = params.get(k).slice(0, 120);
    });
    return {
      id: uid(),
      messages: [],
      createdAt: now(),
      updatedAt: now(),
      leadKey: '',
      leadState: null,
      leadStatus: 'none',
      emergencyShown: false,
      firstTouch: { landingPage: location.href, referrer: document.referrer || '', utm: utm },
    };
  }
  function loadState() {
    try {
      var raw = store('localStorage') && localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && s.id && now() - (s.updatedAt || 0) < EXPIRY_MS && Array.isArray(s.messages)) return s;
      }
    } catch (e) {}
    return freshState();
  }
  var state = loadState();
  function save() {
    state.updatedAt = now();
    state.messages = state.messages.slice(-MAX_STORED);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }
  function pageContext() {
    return {
      url: location.href,
      title: document.title,
      referrer: state.firstTouch.referrer,
      landingPage: state.firstTouch.landingPage,
      utm: state.firstTouch.utm,
    };
  }

  /* ====================================================================== */
  /* Styles                                                                 */
  /* ====================================================================== */
  var CSS = [
    ':host{all:initial}',
    '*,*::before,*::after{box-sizing:border-box}',
    '.ap{--navy:#01306e;--navy2:#0a4a9e;--red:#ea4b43;--red-d:#d23b33;--amber:#ffc752;--dark:#11121a;--text:#3a3a42;--muted:#686878;--line:#e7eaf1;--bot:#f1f4f9;--green:#22c55e;',
    'font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:15px;line-height:1.45;color:var(--text);-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}',
    'button,input,textarea{font:inherit;color:inherit}',
    'button{cursor:pointer;border:0;background:none;padding:0}',
    'a{color:inherit}',
    '.sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}',
    ':focus-visible{outline:3px solid var(--amber);outline-offset:2px}',

    /* launcher */
    '.launch{position:fixed;right:24px;bottom:24px;z-index:2147483000;width:62px;height:62px;border-radius:50%;background:linear-gradient(145deg,#f05a52,var(--red-d));color:#fff;display:grid;place-items:center;box-shadow:0 10px 28px rgba(234,75,67,.42),0 3px 8px rgba(17,18,26,.18);transition:transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s}',
    '.launch:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 14px 34px rgba(234,75,67,.5),0 4px 10px rgba(17,18,26,.2)}',
    '.launch:active{transform:scale(.96)}',
    '.launch svg{width:28px;height:28px;transition:transform .25s,opacity .2s;grid-area:1/1}',
    '.launch .i-close{opacity:0;transform:rotate(-90deg) scale(.6)}',
    '.ap.open .launch .i-chat{opacity:0;transform:rotate(90deg) scale(.6)}',
    '.ap.open .launch .i-close{opacity:1;transform:none}',
    '.launch::before{content:"";position:absolute;inset:0;border-radius:50%;background:var(--red);z-index:-1;animation:pulse 2.8s cubic-bezier(.2,.6,.3,1) infinite}',
    '.ap.open .launch::before,.ap.seen .launch::before{animation:none;opacity:0}',
    '@keyframes pulse{0%{transform:scale(1);opacity:.5}70%,100%{transform:scale(1.55);opacity:0}}',
    '.badge{position:absolute;top:-3px;right:-3px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:var(--navy);color:#fff;font-size:12px;font-weight:700;display:grid;place-items:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(1,48,110,.35);transform:scale(0);transition:transform .25s cubic-bezier(.3,1.6,.5,1)}',
    '.badge.on{transform:scale(1)}',

    /* teaser */
    '.teaser{position:fixed;right:24px;bottom:100px;z-index:2147483000;max-width:316px;background:#fff;border-radius:18px 18px 4px 18px;box-shadow:0 18px 44px rgba(17,18,26,.18),0 2px 8px rgba(17,18,26,.08);padding:14px 38px 14px 14px;display:flex;gap:11px;align-items:flex-start;opacity:0;transform:translateY(10px) scale(.96);transform-origin:bottom right;pointer-events:none;transition:opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1)}',
    '.teaser.on{opacity:1;transform:none;pointer-events:auto}',
    '.teaser-body{text-align:left;color:var(--dark);font-size:14.5px;line-height:1.4;font-weight:500}',
    '.teaser-body b{display:block;font-size:12px;font-weight:600;color:var(--muted);margin-bottom:3px}',
    '.teaser-x{position:absolute;top:8px;right:8px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;color:var(--muted)}',
    '.teaser-x:hover{background:var(--bot);color:var(--dark)}',
    '.teaser-x svg{width:14px;height:14px}',

    /* avatar */
    '.av{position:relative;flex:none;width:38px;height:38px;border-radius:50%;background:linear-gradient(145deg,#ffd77d,var(--amber));display:grid;place-items:center;color:var(--navy);box-shadow:inset 0 0 0 2px rgba(255,255,255,.6)}',
    '.av svg{width:21px;height:21px}',
    '.av .dot{position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border-radius:50%;background:var(--green);border:2px solid #fff}',

    /* panel */
    '.panel{position:fixed;right:24px;bottom:100px;z-index:2147483001;width:384px;height:min(660px,calc(100vh - 124px));max-height:calc(100dvh - 124px);background:#fff;border-radius:22px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 80px rgba(1,24,60,.28),0 6px 20px rgba(17,18,26,.12);opacity:0;transform:translateY(18px) scale(.97);transform-origin:bottom right;visibility:hidden;transition:opacity .22s ease,transform .3s cubic-bezier(.2,.8,.2,1),visibility 0s linear .3s}',
    '.ap.open .panel{opacity:1;transform:none;visibility:visible;transition:opacity .22s ease,transform .3s cubic-bezier(.2,.8,.2,1),visibility 0s}',

    /* header */
    '.hd{position:relative;flex:none;color:#fff;background:radial-gradient(120% 140% at 100% 0%,#0d55b0 0%,rgba(13,85,176,0) 55%),linear-gradient(140deg,var(--navy) 0%,#023a82 100%);padding:16px 14px 0 18px}',
    '.hd-row{display:flex;align-items:center;gap:12px}',
    '.hd .av{width:46px;height:46px;box-shadow:0 0 0 3px rgba(255,255,255,.16)}',
    '.hd .av svg{width:25px;height:25px}',
    '.hd .av .dot{border-color:var(--navy);width:13px;height:13px}',
    '.hd-txt{flex:1;min-width:0}',
    '.hd-name{font-size:17px;font-weight:700;letter-spacing:-.01em;line-height:1.2;display:flex;align-items:center;gap:8px}',
    '.hd-tag{font-size:10.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;background:rgba(255,255,255,.14);padding:2px 7px;border-radius:999px;color:#dfe8f7}',
    '.hd-sub{font-size:12.5px;color:#c9d6ec;margin-top:3px;display:flex;align-items:center;gap:6px}',
    '.hd-sub i{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 0 3px rgba(34,197,94,.22);flex:none}',
    '.hd-btn{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;background:rgba(255,255,255,.12);transition:background .15s,transform .15s;text-decoration:none}',
    '.hd-btn:hover{background:rgba(255,255,255,.22)}',
    '.hd-btn svg{width:19px;height:19px}',
    '.hd-call{background:var(--red);box-shadow:0 4px 14px rgba(234,75,67,.45)}',
    '.hd-call:hover{background:#f05a52;transform:translateY(-1px)}',
    '.trust{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:14px -14px 0 -18px;padding:9px 18px;background:rgba(0,10,30,.22);font-size:12px;color:#e4ebf7;font-weight:500}',
    '.trust span{display:flex;align-items:center;gap:6px;white-space:nowrap}',
    '.stars{color:var(--amber);letter-spacing:1px;font-size:13px}',
    '.g{width:14px;height:14px;flex:none}',
    '.chk{width:15px;height:15px;color:var(--amber)}',

    /* log */
    '.log{flex:1;overflow-y:auto;overscroll-behavior:contain;padding:18px 16px 8px;background:linear-gradient(#fff,#fbfcfe);scroll-behavior:smooth}',
    '.day{text-align:center;font-size:11.5px;color:var(--muted);margin:0 0 14px;font-weight:500}',
    '.row{display:flex;gap:8px;align-items:flex-end;margin:3px 0;animation:in .28s cubic-bezier(.2,.8,.2,1) both}',
    '.row.u{justify-content:flex-end}',
    '.row .av{width:28px;height:28px;box-shadow:none}',
    '.row .av svg{width:16px;height:16px}',
    '.row .sp{width:28px;flex:none}',
    '.row.gap{margin-top:12px}',
    '@keyframes in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    '.b{max-width:78%;padding:10px 14px;border-radius:18px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere}',
    '.row.a .b{background:var(--bot);color:var(--dark);border-bottom-left-radius:6px}',
    '.row.u .b{background:var(--navy);color:#fff;border-bottom-right-radius:6px;box-shadow:0 2px 8px rgba(1,48,110,.18)}',
    '.b a{font-weight:600;text-decoration:underline;text-underline-offset:2px}',
    '.row.a .b a{color:var(--navy)}',
    '.typing .b{padding:13px 16px;display:flex;gap:5px;align-items:center}',
    '.typing i{width:7px;height:7px;border-radius:50%;background:#9aa3b5;animation:blink 1.3s infinite both}',
    '.typing i:nth-child(2){animation-delay:.18s}.typing i:nth-child(3){animation-delay:.36s}',
    '@keyframes blink{0%,60%,100%{opacity:.35;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}',
    '.note{display:flex;align-items:center;justify-content:center;gap:6px;margin:12px auto 6px;font-size:12px;color:#18794e;background:#ecfbf3;border:1px solid #c9f0da;border-radius:999px;padding:5px 12px;width:max-content;max-width:100%;animation:in .3s both}',
    '.note svg{width:14px;height:14px;flex:none}',

    /* chips */
    '.chips{display:flex;flex-wrap:wrap;gap:7px;padding:8px 0 4px 36px;animation:in .3s both}',
    '.chip{border:1.5px solid #c9d4e6;color:var(--navy);background:#fff;border-radius:999px;padding:7px 13px;font-size:13.5px;font-weight:600;line-height:1.2;transition:background .15s,border-color .15s,color .15s,transform .15s}',
    '.chip:hover{border-color:var(--navy);background:var(--navy);color:#fff;transform:translateY(-1px)}',
    '.chip.hot{border-color:#f5b6b2;color:#b42318}',
    '.chip.hot:hover{background:var(--red-d);border-color:var(--red-d);color:#fff}',

    /* cards */
    '.card{margin:10px 0 6px 36px;border-radius:16px;padding:14px;animation:in .3s both}',
    '.card h4{margin:0 0 4px;font-size:14.5px;color:var(--dark);font-weight:700}',
    '.card p{margin:0 0 10px;font-size:13px;color:var(--text)}',
    '.card.em{background:#fff4f3;border:1px solid #fbd0cd}',
    '.cta{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:11px 14px;border-radius:12px;background:var(--red-d);color:#fff;font-weight:700;font-size:15px;text-decoration:none;box-shadow:0 6px 16px rgba(210,59,51,.3);transition:transform .15s,background .15s}',
    '.cta:hover{background:#c0322b;transform:translateY(-1px)}',
    '.cta svg{width:17px;height:17px}',
    '.card.form{background:#f6f8fc;border:1px solid var(--line)}',
    '.fld{display:block;margin-bottom:8px}',
    '.fld span{display:block;font-size:12px;font-weight:600;color:var(--dark);margin-bottom:4px}',
    '.fld input{width:100%;padding:10px 12px;border-radius:10px;border:1.5px solid #d5dbe7;background:#fff;font-size:15px;outline:none;transition:border-color .15s,box-shadow .15s}',
    '.fld input:focus{border-color:var(--navy);box-shadow:0 0 0 3px rgba(1,48,110,.12)}',
    '.hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}',
    '.err{color:#b42318;font-size:12.5px;margin:0 0 8px;min-height:0}',
    '.ok{color:#18794e;font-weight:600;font-size:14px}',

    /* composer */
    '.cmp{flex:none;border-top:1px solid var(--line);background:#fff;padding:10px 12px 8px}',
    '.cmp-row{display:flex;align-items:flex-end;gap:8px;background:#f5f7fb;border:1.5px solid transparent;border-radius:16px;padding:5px 5px 5px 14px;transition:border-color .15s,background .15s,box-shadow .15s}',
    '.cmp-row:focus-within{border-color:var(--navy);background:#fff;box-shadow:0 0 0 3px rgba(1,48,110,.1)}',
    'textarea{flex:1;resize:none;border:0;outline:none;background:transparent;font-size:15px;line-height:1.4;max-height:120px;min-height:22px;padding:8px 0;color:var(--dark)}',
    'textarea::placeholder{color:#8a8a9a}',
    'textarea:focus,textarea:focus-visible{outline:none}',
    '.send{flex:none;width:40px;height:40px;border-radius:12px;background:var(--red-d);color:#fff;display:grid;place-items:center;transition:background .15s,transform .15s,opacity .15s}',
    '.send:hover{background:#c0322b}',
    '.send:disabled{opacity:.4;cursor:default;background:#9aa3b5}',
    '.send svg{width:18px;height:18px}',
    '.foot{font-size:11px;color:var(--muted);text-align:center;margin-top:7px;line-height:1.35}',

    /* mobile: full-screen sheet */
    '@media (max-width:600px){',
    '.launch{right:16px;bottom:calc(76px + env(safe-area-inset-bottom,0px));width:58px;height:58px}',
    '.teaser{right:16px;left:16px;max-width:none;bottom:calc(146px + env(safe-area-inset-bottom,0px))}',
    '.panel{inset:0;width:100%;height:100%;max-height:none;border-radius:0;transform:translateY(40px);transform-origin:bottom center}',
    '.ap.open .launch,.ap.open .teaser{opacity:0;pointer-events:none;visibility:hidden}',
    '.hd{padding-top:calc(14px + env(safe-area-inset-top,0px));padding-left:calc(16px + env(safe-area-inset-left,0px));padding-right:calc(12px + env(safe-area-inset-right,0px))}',
    '.trust{margin-left:calc(-16px - env(safe-area-inset-left,0px));margin-right:calc(-12px - env(safe-area-inset-right,0px));padding-left:16px;padding-right:16px}',
    '.cmp{padding-bottom:calc(8px + env(safe-area-inset-bottom,0px))}',
    'textarea,.fld input{font-size:16px}',
    '.b{max-width:84%}',
    '}',
    '@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.typing i{opacity:.7}}',
  ].join('\n');

  /* ====================================================================== */
  /* Icons                                                                  */
  /* ====================================================================== */
  var I = {
    chat: '<svg class="i-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.8L3 21l1.9-5.1A8 8 0 0 1 3.6 11.5 8.4 8.4 0 0 1 12.3 3 8.4 8.4 0 0 1 21 11.5z"/><path d="M8.5 11.5h.01M12.3 11.5h.01M16 11.5h.01" stroke-width="2.6"/></svg>',
    close: '<svg class="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    roof: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 11.5 12 4l9.5 7.5"/><path d="M5 10v9.5h14V10"/><path d="M10 19.5v-5h4v5"/><path d="M16.5 6.4V4.5h2v3.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7"/></svg>',
    check: '<svg class="chk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5 4.5 5.5v6c0 4.6 3.2 8.5 7.5 10 4.3-1.5 7.5-5.4 7.5-10v-6z" stroke-width="2"/><path d="m8.5 12 2.4 2.4 4.6-4.8"/></svg>',
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    google: '<svg class="g" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',
  };

  /* ====================================================================== */
  /* DOM                                                                    */
  /* ====================================================================== */
  function ensureFont() {
    try {
      if (document.querySelector('link[href*="family=Inter"]')) return;
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    } catch (e) {}
  }

  function h(tag, attrs, html) {
    var el = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === 'class') el.className = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k]);
    }
    if (html) el.innerHTML = html; // only ever used with static markup defined in this file
    return el;
  }

  var host, root, wrap, launcher, badge, teaser, panel, log, input, sendBtn, chipsEl;
  var isOpen = false;
  var busy = false;
  var unread = 0;
  var greetingRunning = false;
  var lastFocus = null;

  function avatar(dot) {
    return '<span class="av" aria-hidden="true">' + I.roof + (dot ? '<span class="dot"></span>' : '') + '</span>';
  }

  function build() {
    // A custom tag (not a div) so theme rules like `div:empty{display:none}` never match the host.
    host = h('alterphase-chat', { id: 'alterphase-chat', 'data-nosnippet': '' });
    host.style.cssText =
      'all:initial!important;display:block!important;position:fixed!important;z-index:2147483000!important;width:0!important;height:0!important;bottom:0!important;right:0!important;margin:0!important;padding:0!important;border:0!important;transform:none!important;filter:none!important;';
    root = host.attachShadow({ mode: 'open' });
    var style = h('style');
    style.textContent = CSS;
    root.appendChild(style);

    wrap = h('div', { class: 'ap' });
    root.appendChild(wrap);

    // Teaser
    teaser = h('div', { class: 'teaser', role: 'complementary', 'aria-label': 'Chat invitation' });
    teaser.innerHTML =
      avatar(true) +
      '<button class="teaser-body" type="button"><b>' + COPY.name + ' · Alter Phase Roofing</b><span></span></button>' +
      '<button class="teaser-x" type="button" aria-label="Dismiss chat invitation">' + I.x + '</button>';
    teaser.querySelector('.teaser-body span').textContent = COPY.teaser;
    wrap.appendChild(teaser);

    // Launcher
    launcher = h('button', {
      class: 'launch',
      type: 'button',
      'aria-label': 'Chat with Alter Phase Roofing',
      'aria-expanded': 'false',
      'aria-controls': 'ap-panel',
    });
    launcher.innerHTML = I.chat + I.close + '<span class="badge" aria-hidden="true"></span>';
    badge = launcher.querySelector('.badge');
    wrap.appendChild(launcher);

    // Panel
    panel = h('section', { class: 'panel', id: 'ap-panel', role: 'dialog', 'aria-label': 'Chat with Alter Phase Roofing' });
    panel.innerHTML =
      '<header class="hd">' +
      '<div class="hd-row">' +
      avatar(true) +
      '<div class="hd-txt"><div class="hd-name"><span>' + COPY.name + '</span><span class="hd-tag">AI</span></div>' +
      '<div class="hd-sub" style="margin-top:2px;color:#e4ebf7;font-weight:500">' + COPY.title + '</div>' +
      '<div class="hd-sub"><i></i><span>' + COPY.status + '</span></div></div>' +
      '<a class="hd-btn hd-call" data-call="header" href="tel:' + PHONE_TEL + '" aria-label="Call Alter Phase Roofing at ' + PHONE + '">' + I.phone + '</a>' +
      '<button class="hd-btn hd-min" type="button" aria-label="Minimize chat">' + I.close.replace('class="i-close"', '') + '</button>' +
      '</div>' +
      '<div class="trust"><span>' + I.google + '<span class="stars" aria-hidden="true">★★★★★</span><span class="sr">5 stars,</span>' + COPY.reviews + '</span>' +
      '<span>' + I.check + COPY.licensed + '</span></div>' +
      '</header>' +
      '<div class="log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages" tabindex="0"></div>' +
      '<form class="cmp" novalidate>' +
      '<div class="cmp-row"><label class="sr" for="ap-input">Message</label>' +
      '<textarea id="ap-input" rows="1" maxlength="1000" autocomplete="off" enterkeyhint="send"></textarea>' +
      '<button class="send" type="submit" aria-label="Send message">' + I.send + '</button></div>' +
      '<div class="foot">AI assistant · ' + COPY.privacy + '</div>' +
      '</form>';
    wrap.appendChild(panel);
    log = panel.querySelector('.log');
    input = panel.querySelector('textarea');
    input.placeholder = COPY.placeholder;
    sendBtn = panel.querySelector('.send');

    (document.body || document.documentElement).appendChild(host);

    // Events
    launcher.addEventListener('click', function () {
      isOpen ? close() : open('launcher');
    });
    teaser.querySelector('.teaser-body').addEventListener('click', function () {
      open('teaser');
    });
    teaser.querySelector('.teaser-x').addEventListener('click', function (e) {
      e.stopPropagation();
      hideTeaser();
      setUnread(0);
    });
    panel.querySelector('.hd-min').addEventListener('click', close);
    panel.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      sendFromInput();
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        sendFromInput();
      }
    });
    input.addEventListener('input', function () {
      autosize();
      updateSend();
    });
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        e.stopPropagation();
        close();
      }
    });
    wrap.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="tel:"]');
      if (a) track('chatbot_call_click', { chatbot_call_location: a.getAttribute('data-call') || 'message' });
    });
    updateSend();
  }

  function autosize() {
    input.style.height = 'auto';
    input.style.height = Math.min(120, input.scrollHeight) + 'px';
  }
  function updateSend() {
    sendBtn.disabled = busy || !input.value.trim();
    wrap.setAttribute('data-busy', busy ? '1' : '0'); // handy for automated tests
  }
  function scrollDown() {
    requestAnimationFrame(function () {
      log.scrollTop = log.scrollHeight;
    });
  }
  function setUnread(n) {
    unread = n;
    badge.textContent = n > 9 ? '9+' : String(n);
    badge.classList.toggle('on', n > 0);
    launcher.setAttribute('aria-label', 'Chat with Alter Phase Roofing' + (n ? ' (' + n + ' new message' + (n > 1 ? 's' : '') + ')' : ''));
  }

  /* -------------------------- text rendering ---------------------------- */
  var LINK_RE = /(\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b)|([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})|((?:https?:\/\/)?(?:www\.)?alterphaseroofing\.com(?:\/[^\s]*)?)/g;
  function renderText(el, text) {
    var last = 0;
    var m;
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(text))) {
      if (m.index > last) el.appendChild(document.createTextNode(text.slice(last, m.index)));
      var a = document.createElement('a');
      var tok = m[0];
      if (m[1]) {
        var d = tok.replace(/\D/g, '');
        a.href = 'tel:+1' + d.slice(-10);
      } else if (m[2]) {
        a.href = 'mailto:' + tok;
      } else {
        tok = tok.replace(/[.,!?)]+$/, '');
        a.href = /^https?:/.test(tok) ? tok : 'https://' + tok;
        a.target = '_blank';
        a.rel = 'noopener';
      }
      a.textContent = tok;
      el.appendChild(a);
      last = m.index + tok.length;
      LINK_RE.lastIndex = last;
    }
    if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
  }

  var lastRole = null;
  function addBubble(role, text, opts) {
    opts = opts || {};
    var isA = role === 'assistant';
    var row = h('div', { class: 'row ' + (isA ? 'a' : 'u') + (lastRole && lastRole !== role ? ' gap' : '') });
    if (isA) {
      if (lastRole !== 'assistant') row.innerHTML = avatar(false);
      else row.appendChild(h('span', { class: 'sp' }));
    }
    var b = h('div', { class: 'b' });
    if (!isA) b.appendChild(h('span', { class: 'sr', text: 'You said: ' }));
    renderText(b, text);
    row.appendChild(b);
    log.appendChild(row);
    lastRole = role;
    if (!opts.restore) {
      state.messages.push({ role: role, content: text });
      save();
      if (isA && !isOpen) setUnread(unread + 1);
    }
    scrollDown();
    return row;
  }

  var typingEl = null;
  function showTyping() {
    hideTyping();
    typingEl = h('div', { class: 'row a typing' + (lastRole === 'user' ? ' gap' : '') });
    typingEl.innerHTML = (lastRole !== 'assistant' ? avatar(false) : '<span class="sp"></span>') + '<div class="b" role="status"><span class="sr">' + COPY.name + ' is typing</span><i></i><i></i><i></i></div>';
    log.appendChild(typingEl);
    scrollDown();
  }
  function hideTyping() {
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
    typingEl = null;
  }

  function showChips(list) {
    clearChips();
    if (!list || !list.length) return;
    chipsEl = h('div', { class: 'chips', role: 'group', 'aria-label': 'Suggested replies' });
    list.slice(0, 6).forEach(function (c) {
      var b = h('button', { class: 'chip' + (/emergency|leak/i.test(c) ? ' hot' : ''), type: 'button', text: c });
      b.addEventListener('click', function () {
        send(c);
      });
      chipsEl.appendChild(b);
    });
    log.appendChild(chipsEl);
    scrollDown();
  }
  function clearChips() {
    if (chipsEl && chipsEl.parentNode) chipsEl.parentNode.removeChild(chipsEl);
    chipsEl = null;
  }

  function showNote(text) {
    var n = h('div', { class: 'note', role: 'status' }, I.ok);
    n.appendChild(document.createTextNode(text));
    log.appendChild(n);
    lastRole = null;
    scrollDown();
  }

  function showEmergencyCard() {
    if (state.emergencyShown) return;
    state.emergencyShown = true;
    save();
    var c = h('div', { class: 'card em' });
    c.innerHTML =
      '<h4>Water coming in right now?</h4><p>Calling is the fastest way to get help from our team.</p>' +
      '<a class="cta" data-call="emergency" href="tel:' + PHONE_TEL + '">' + I.phone + '<span>Call ' + PHONE + '</span></a>';
    log.appendChild(c);
    lastRole = null;
    scrollDown();
  }

  var formEl = null;
  function showLeadForm() {
    if (formEl || isCaptured()) return;
    formEl = h('form', { class: 'card form', novalidate: '' });
    formEl.innerHTML =
      '<h4>Get a call back</h4><p>Leave your name and number and someone from our team will reach out.</p>' +
      '<label class="fld"><span>First name</span><input name="firstName" autocomplete="given-name" maxlength="60" required></label>' +
      '<label class="fld"><span>Phone</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" required></label>' +
      '<label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>' +
      '<p class="err" role="alert"></p>' +
      '<button class="cta" type="submit">' + I.phone + '<span>Request a call back</span></button>';
    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      submitLeadForm();
    });
    log.appendChild(formEl);
    lastRole = null;
    scrollDown();
  }

  function submitLeadForm() {
    var f = formEl;
    var err = f.querySelector('.err');
    var name = f.firstName.value.trim();
    var phone = f.phone.value.trim();
    var digits = phone.replace(/\D/g, '');
    if (digits.length === 11 && digits[0] === '1') digits = digits.slice(1);
    if (!name) {
      err.textContent = 'Please add your first name.';
      f.firstName.focus();
      return;
    }
    if (digits.length !== 10) {
      err.textContent = 'Please enter a 10-digit US phone number.';
      f.phone.focus();
      return;
    }
    err.textContent = '';
    var btn = f.querySelector('button');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending…';
    withToken(function (token) {
      fetch(API + '/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({
          conversationId: state.id,
          firstName: name,
          phone: phone,
          website: f.website.value,
          page: pageContext(),
          leadState: state.leadState,
          messages: state.messages.slice(-30),
          turnstileToken: token,
        }),
      })
        .then(function (r) {
          return r.json().then(function (j) {
            if (!r.ok || !j.ok) throw new Error(j.error || 'failed');
            return j;
          });
        })
        .then(function (j) {
          state.leadKey = j.leadKey || state.leadKey;
          state.leadState = j.leadState || state.leadState;
          markCaptured('complete' === (j.leadStatus || '') ? 'complete' : 'partial', 'form');
          f.innerHTML = '';
          var ok = h('p', { class: 'ok', role: 'status' });
          ok.textContent = 'Thanks, ' + name + '! Someone from our team will call you soon. If it’s urgent, call ' + PHONE + '.';
          f.appendChild(ok);
          scrollDown();
        })
        .catch(function () {
          btn.disabled = false;
          btn.querySelector('span').textContent = 'Request a call back';
          err.textContent = 'Sorry, that didn’t go through. Please call us at ' + PHONE + '.';
        });
    });
  }

  function isCaptured() {
    return state.leadStatus === 'partial' || state.leadStatus === 'complete';
  }
  function markCaptured(status, source, extra) {
    var before = state.leadStatus;
    var rank = { none: 0, partial: 1, complete: 2 };
    if ((rank[status] || 0) <= (rank[before] || 0)) return;
    state.leadStatus = status;
    save();
    var ev = { chatbot_lead_status: status, chatbot_lead_source: source };
    if (extra && extra.service) ev.chatbot_service = extra.service;
    if (extra && extra.urgency) ev.chatbot_urgency = extra.urgency;
    track('chatbot_lead', ev);
    if (before === 'none') showNote(COPY.leadSaved);
    if (formEl && formEl.parentNode && source !== 'form') {
      formEl.parentNode.removeChild(formEl);
      formEl = null;
    }
  }

  /* ---------------------------- Turnstile -------------------------------- */
  var tsId = null;
  var tsCb = null;
  function withToken(cb) {
    if (!TURNSTILE_KEY) return cb('');
    var done = false;
    var finish = function (t) {
      if (!done) {
        done = true;
        cb(t || '');
      }
    };
    setTimeout(function () {
      finish('');
    }, 8000);
    function run() {
      try {
        tsCb = finish;
        if (tsId === null) {
          var div = document.createElement('div');
          div.style.cssText = 'position:fixed;bottom:0;left:0;z-index:2147483002';
          document.body.appendChild(div);
          tsId = window.turnstile.render(div, {
            sitekey: TURNSTILE_KEY,
            execution: 'execute',
            appearance: 'interaction-only',
            callback: function (t) {
              tsCb && tsCb(t);
            },
            'error-callback': function () {
              tsCb && tsCb('');
            },
          });
        } else window.turnstile.reset(tsId);
        window.turnstile.execute(tsId);
      } catch (e) {
        finish('');
      }
    }
    if (window.turnstile) return run();
    var s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = run;
    s.onerror = function () {
      finish('');
    };
    document.head.appendChild(s);
  }
  function getToken() {
    return new Promise(function (r) {
      withToken(r);
    });
  }

  /* ------------------------------ API ----------------------------------- */
  function callChat() {
    return getToken().then(function (token) {
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () {
        ctrl && ctrl.abort();
      }, 25000);
      return fetch(API + '/chat', {
        method: 'POST',
        // text/plain keeps this a "simple" CORS request (no preflight round-trip)
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({
          conversationId: state.id,
          messages: state.messages.slice(-40).map(function (m) {
            return { role: m.role, content: m.content };
          }),
          page: pageContext(),
          leadKey: state.leadKey,
          leadState: state.leadState,
          hp: '',
          turnstileToken: token,
        }),
        signal: ctrl ? ctrl.signal : undefined,
      })
        .then(function (r) {
          clearTimeout(timer);
          return r
            .json()
            .catch(function () {
              return {};
            })
            .then(function (j) {
              if (j && Array.isArray(j.replies) && j.replies.length) return j;
              throw new Error('HTTP ' + r.status);
            });
        })
        .catch(function (e) {
          clearTimeout(timer);
          throw e;
        });
    });
  }

  function offlineReplies() {
    return COPY.offline.map(function (s) {
      return s.replace('{PHONE}', PHONE);
    });
  }

  /* ---------------------------- conversation ---------------------------- */
  function sendFromInput() {
    var t = input.value;
    if (!t.trim() || busy) return;
    input.value = '';
    autosize();
    send(t);
  }

  function userCount() {
    return state.messages.filter(function (m) {
      return m.role === 'user';
    }).length;
  }

  function send(text) {
    text = String(text || '').trim().slice(0, 1000);
    if (!text || busy) return;
    busy = true;
    updateSend();
    clearChips();
    addBubble('user', text);
    track('chatbot_message', { chatbot_message_count: userCount() });

    var t0 = now();
    var read = rand(TIMING.readMin, TIMING.readMax);
    var api = callChat().catch(function () {
      return { replies: offlineReplies(), showLeadForm: true, failed: true };
    });

    return sleep(read)
      .then(function () {
        showTyping();
        return api;
      })
      .then(function (data) {
        var replies = data.replies.slice(0, 3);
        // Total wait = max(API time, human delay for the first bubble)
        var wait = t0 + read + typingMs(replies[0]) - now();
        return sleep(wait).then(function () {
          return deliver(replies, data);
        });
      })
      .then(null, function () {})
      .then(function () {
        busy = false;
        updateSend();
      });
  }

  function deliver(replies, data) {
    var i = 0;
    function next() {
      hideTyping();
      addBubble('assistant', replies[i]);
      i++;
      if (i < replies.length) {
        return sleep(rand(TIMING.betweenBubblesMin, TIMING.betweenBubblesMax)).then(function () {
          showTyping();
          return sleep(typingMs(replies[i])).then(next);
        });
      }
      return after(data);
    }
    return next();
  }

  function after(data) {
    if (data.leadKey) state.leadKey = data.leadKey;
    if (data.leadState) state.leadState = data.leadState;
    save();
    if (data.leadSaved) {
      var ls = data.leadState || {};
      markCaptured(data.leadStatus === 'complete' ? 'complete' : 'partial', 'chat', { service: ls.service, urgency: ls.urgency });
    }
    if (data.emergency) showEmergencyCard();
    if (data.showLeadForm) showLeadForm();
    else showChips(data.quickReplies);
  }

  function greet() {
    if (state.messages.length || greetingRunning) return;
    greetingRunning = true;
    busy = true;
    updateSend();
    var lines = COPY.greeting.slice();
    var i = 0;
    function step() {
      showTyping();
      return sleep(Math.min(typingMs(lines[i]), i === 0 ? 1300 : 1100)).then(function () {
        hideTyping();
        addBubble('assistant', lines[i]);
        i++;
        if (i < lines.length) return sleep(rand(TIMING.betweenBubblesMin, TIMING.betweenBubblesMax)).then(step);
      });
    }
    sleep(TIMING.greetingRead)
      .then(step)
      .then(function () {
        showChips(COPY.chips);
        greetingRunning = false;
        busy = false;
        updateSend();
      });
  }

  function restore() {
    if (!state.messages.length) return;
    log.appendChild(h('div', { class: 'day', text: 'Earlier conversation' }));
    state.messages.forEach(function (m) {
      addBubble(m.role, m.content, { restore: true });
    });
    if (isCaptured()) showNote(COPY.leadSaved);
  }

  /* ---------------------------- open / close ---------------------------- */
  var savedOverflow = '';
  function open(trigger) {
    if (isOpen) return;
    isOpen = true;
    lastFocus = document.activeElement;
    hideTeaser(true);
    setUnread(0);
    wrap.classList.add('open', 'seen');
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', 'Close chat');
    if (mobileMq.matches) {
      savedOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
    track('chatbot_open', { chatbot_trigger: trigger || 'api' });
    setTimeout(function () {
      if (!mobileMq.matches || !state.messages.length) input.focus({ preventScroll: true });
      scrollDown();
    }, reduceMotion ? 0 : 260);
    greet();
  }
  function close() {
    if (!isOpen) return;
    isOpen = false;
    wrap.classList.remove('open');
    launcher.setAttribute('aria-expanded', 'false');
    setUnread(0);
    if (mobileMq.matches) document.documentElement.style.overflow = savedOverflow;
    try {
      launcher.focus({ preventScroll: true });
    } catch (e) {}
  }

  var teaserTimer = null;
  function scheduleTeaser() {
    if (!TIMING.teaserDelay || TIMING.teaserDelay < 0) return;
    var ss = store('sessionStorage');
    try {
      if (ss && ss.getItem(SESSION_TEASER_KEY)) return;
    } catch (e) {}
    if (state.messages.length) return; // returning visitors already know the chat
    teaserTimer = setTimeout(function () {
      if (isOpen) return;
      teaser.classList.add('on');
      setUnread(1);
      try {
        ss && ss.setItem(SESSION_TEASER_KEY, '1');
      } catch (e) {}
    }, TIMING.teaserDelay);
  }
  function hideTeaser() {
    clearTimeout(teaserTimer);
    teaser.classList.remove('on');
    try {
      sessionStorage.setItem(SESSION_TEASER_KEY, '1');
    } catch (e) {}
  }

  /* ------------------------------- init --------------------------------- */
  function init() {
    ensureFont();
    build();
    restore();
    scheduleTeaser();
    window.AlterPhaseChat = {
      open: function () {
        open('api');
      },
      close: close,
      reset: function () {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        state = freshState();
        log.innerHTML = '';
        lastRole = null;
        formEl = null;
        chipsEl = null;
        if (isOpen) greet();
      },
      send: function (t) {
        open('api');
        return send(t);
      },
      version: '1.0.0',
    };
  }
  window.AlterPhaseChat = { loading: true };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
