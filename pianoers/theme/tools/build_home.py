# Generates pianoers/home.hbs from the section lists below.
# Edit PATHS / TOPICS / TOOLS, then run: python3 tools/build_home.py
# Every slug may appear in only one list, so no post is shown twice on the homepage.
import os

PATHS = [
    ('beginner', 'I’m a complete beginner',
     'Start from zero. Learn the keys, play your first song today, and follow a plan that works at home.',
     ['teach-yourself-piano', 'piano-basics-a-beginners-guide-to-the-keyboard', 'best-free-piano-learning-apps'],
     '/teach-yourself-piano/', 'Start the free 10-step plan'),
    ('buy', 'I need a piano',
     'Find the right keyboard or digital piano for your level, space and budget, without paying for features you won’t use.',
     ['best-beginner-pianos', 'best-digital-piano', 'yamaha-p-145-review'],
     '/best-beginner-pianos/#finder', 'Find your piano in 30 seconds'),
    ('lessons', 'I want lessons',
     'Compare online piano courses and apps side by side, with real prices, free trials and who each one suits.',
     ['best-piano-lessons-online', 'pianoforall-review', 'piano-marvel-review'],
     '/best-piano-lessons-online/#quiz', 'Take the 1-minute course quiz'),
    ('owner', 'I own a piano',
     'Keep your piano sounding its best: cleaning, humidity, tuning and the small fixes you can do yourself.',
     ['how-to-clean-and-maintain-your-piano', 'climate-control-and-your-piano', 'piano-tuning-when-and-why-its-needed'],
     '/how-to-clean-and-maintain-your-piano/', 'Read the complete care guide'),
]

TOPICS = [
    ('reviews', 'Piano course and app reviews',
     'Honest, hands-on reviews of the courses and apps that promise to teach you piano: what each one does well, what it costs and who should skip it.',
     'Review',
     ['simply-piano-review-the-honest-truth-about-learning-piano-with-an-app', 'flowkey-review', 'skoove-review', 'pianote-review',
      'piano-with-jonny-review', 'hdpiano-review', 'open-studio-jazz-review', 'piano-career-academy-review', 'stephen-ridley',
      'pianovision-review', 'synthesia-piano-review', 'worship-music-academy-review'],
     '/best-piano-lessons-online/', 'See the ranked list'),
    ('practice', 'Practice tips and piano methods',
     'How to practise piano so it sticks, and the method books that actually work for beginners and adults.',
     'Learn',
     ['piano-practice-4-tips-to-successful-sessions', 'best-piano-books-for-adult-beginners', '5-best-piano-methods-to-learn-quickly',
      'bastien-piano-method-is-it-the-right-one-for-you'],
     '/teach-yourself-piano/', 'How to learn piano by yourself'),
    ('instrument', 'Pianos, keyboards and how they work',
     'Acoustic or digital, what’s inside a piano, and the instruments worth a closer look.',
     'Pianos',
     ['acoustic-vs-digital-piano', 'loog-piano', 'how-the-piano-works', 'are-piano-keys-still-made-of-ivory'],
     '/best-digital-piano/', 'The best digital pianos'),
    ('care', 'Piano care and maintenance',
     'Humidity, tuning and do-it-yourself fixes, explained by a concert pianist.',
     'Care',
     ['piano-dehumidifier-101-why-it-is-important', 'piano-humidifier', 'how-to-tune-a-piano-a-simple-guide', 'piano-diy-repair-guide'],
     '/how-to-clean-and-maintain-your-piano/', 'How to clean and maintain your piano'),
    ('pianists', 'Famous pianists',
     'The lives, styles and recordings of pianists worth listening to.',
     'Pianists',
     ['lang-lang-the-biography', 'cole-lam-the-piano-prodigy', 'ahmad-jamal-biography'],
     None, None),
]

TOOLS = [
    ('/best-beginner-pianos/#finder', 'Piano finder', 'Answer three questions, get a keyboard that fits.', 'M4 7h16M4 12h10M4 17h6'),
    ('/best-piano-lessons-online/#quiz', 'Course quiz', 'Find the online course that suits how you learn.', 'M9 9a3 3 0 1 1 4 2.8c-.8.4-1 1-1 1.7V15M12 18h.01'),
    ('/teach-yourself-piano/#ty-song-h', 'Play your first song', 'Follow the glowing keys and play Ode to Joy.', 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'),
    ('/teach-yourself-piano/#ty-metro-h', 'Metronome', 'A free click with a tempo ladder and tap tempo.', 'M12 3 6 21h12L12 3zM12 14l5-6'),
    ('/teach-yourself-piano/#ty-calc-h', 'How long will it take?', 'See your own dated piano milestones.', 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'),
    ('/piano-basics-a-beginners-guide-to-the-keyboard/#chords', 'Hear a chord', 'Press three keys and hear your first chord.', 'M5 20V8M12 20V4M19 20v-9'),
]

ALL = [s for p in PATHS for s in p[3]] + [s for t in TOPICS for s in t[4]]
assert len(ALL) == len(set(ALL)), 'A slug appears in more than one section'

ARROW = '{{> "icons/arrow"}}'


def tab(i, p):
    sel = 'true' if i == 0 else 'false'
    ti = '' if i == 0 else ' tabindex="-1"'
    return (f'<button class="pz-path-tab" type="button" role="tab" id="pz-tab-{p[0]}" '
            f'aria-controls="pz-path-{p[0]}" aria-selected="{sel}"{ti}>{p[1]}</button>')


def panel(p):
    key, _, intro, slugs, href, cta = p
    return f'''    <div class="pz-path-panel" id="pz-path-{key}" role="tabpanel" aria-labelledby="pz-tab-{key}">
        <p class="pz-path-intro">{intro}</p>
        <div class="pz-hc-grid">
            {{{{#get "posts" filter="slug:[{','.join(slugs)}]" limit="3" as |picks|}}}}{{{{#foreach picks}}}}{{{{> "home-card" size="feature"}}}}{{{{/foreach}}}}{{{{/get}}}}
        </div>
        <a class="pz-btn pz-btn-buy pz-path-cta" href="{href}">{cta} {ARROW}</a>
    </div>'''


def tool(t):
    href, name, text, path = t
    return (f'<li><a class="pz-tool" href="{href}"><span class="pz-tool-icon" aria-hidden="true">'
            f'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round"><path d="{path}"/></svg></span>'
            f'<span class="pz-tool-name">{name}</span><span class="pz-tool-text">{text}</span></a></li>')


def topic(t):
    key, title, intro, label, slugs, href, cta = t
    more = f'\n        <a class="pz-more" href="{href}">{cta} {ARROW}</a>' if href else ''
    return f'''<section class="pz-wrap pz-home-section pz-topic" aria-labelledby="pz-topic-{key}">
    <div class="pz-section-head">
        <div><h2 id="pz-topic-{key}" class="pz-section-title">{title}</h2><p class="pz-section-dek">{intro}</p></div>{more}
    </div>
    <div class="pz-hc-list">
        {{{{#get "posts" filter="slug:[{','.join(slugs)}]" limit="{len(slugs)}" as |items|}}}}{{{{#foreach items}}}}{{{{> "home-card" label="{label}"}}}}{{{{/foreach}}}}{{{{/get}}}}
    </div>
</section>'''


HOME = '''{{!< default}}
{{!-- Generated by tools/build_home.py. Edit the lists there, not this file.
     Every post appears once: the journey tabs and the topic sections each list their own posts by slug,
     and "New on Pianoers" shows any post that is in none of those lists, so new posts appear there
     automatically. See INSTALL.md, "Homepage sections". --}}
<section class="pz-home-hero">
    <div class="pz-wrap pz-home-hero-inner">
        <div class="pz-home-hero-copy">
            <span class="pz-eyebrow">Piano advice from a real teacher</span>
            <h1 class="pz-home-title">{{#if @custom.homepage_heading}}{{@custom.homepage_heading}}{{else}}{{@site.title}}{{/if}}</h1>
            {{#if @site.description}}<p class="pz-dek">{{@site.description}}</p>{{/if}}
            <button class="pz-home-search" type="button" data-ghost-search>{{> "icons/search"}}<span>Search {{#if pagination.total}}{{pagination.total}} {{/if}}piano guides and reviews</span></button>
            <div class="pz-home-actions">
                {{#if @custom.header_button_text}}
                    <a class="pz-btn pz-btn-buy" href="{{@custom.header_button_url}}">{{@custom.header_button_text}} ARROW</a>
                {{/if}}
                <a class="pz-btn pz-btn-ghost" href="/teach-yourself-piano/">Start learning free</a>
            </div>
            <ul class="pz-home-trust">
                <li>Written by a piano teacher</li>
                <li>Prices and plans rechecked</li>
                <li>Affiliate links never decide our picks</li>
            </ul>
        </div>
        <div class="pz-home-hero-play">
            <div class="pz-play-head">
                <span class="pz-eyebrow">Go on, play a few notes</span>
                <button class="pz-sound" type="button" aria-pressed="true">Sound on</button>
            </div>
            {{> "piano" label="Playable piano: tap the keys"}}
            <p class="pz-play-hint">Tap the keys<span class="pz-play-hint-keys">, or play them with your computer keyboard: A to K</span>.</p>
        </div>
    </div>
</section>

<section class="pz-wrap pz-home-section pz-paths" aria-labelledby="pz-paths-h">
    <div class="pz-section-head"><div><h2 id="pz-paths-h" class="pz-section-title">Where are you on your piano journey?</h2><p class="pz-section-dek">Pick where you are today, and start with the three guides that matter most.</p></div></div>
    <div class="pz-path-tabs" role="tablist" aria-label="Choose your starting point">TABS</div>
PANELS
</section>
<script>
(function () {
    var tabs = [].slice.call(document.querySelectorAll('.pz-path-tab'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    function show(i, focus) {
        tabs.forEach(function (t, k) {
            var on = k === i;
            t.setAttribute('aria-selected', on ? 'true' : 'false');
            t.tabIndex = on ? 0 : -1;
            panels[k].hidden = !on;
        });
        if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { show(i); });
        t.addEventListener('keydown', function (e) {
            var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (n) { e.preventDefault(); show((i + n + tabs.length) % tabs.length, true); }
        });
    });
    show(0);
})();
</script>

{{#get "posts" filter="slug:-[ALLSLUGS]" limit="3" as |fresh|}}
    {{#if fresh}}
        <section class="pz-wrap pz-home-section" aria-labelledby="pz-new-h">
            <div class="pz-section-head"><h2 id="pz-new-h" class="pz-section-title">New on Pianoers</h2></div>
            <div class="pz-hc-grid">{{#foreach fresh}}{{> "home-card" size="feature" label="New"}}{{/foreach}}</div>
        </section>
    {{/if}}
{{/get}}

<section class="pz-wrap pz-home-section" aria-labelledby="pz-tools-h">
    <div class="pz-section-head"><div><h2 id="pz-tools-h" class="pz-section-title">Free piano tools</h2><p class="pz-section-dek">Interactive tools to choose, learn and practise. No sign-up needed.</p></div></div>
    <ul class="pz-tools">TOOLS</ul>
</section>

<section class="pz-wrap pz-home-section pz-home-duo">
    {{#if @custom.homepage_ear_game}}{{> "ear-game"}}{{/if}}
    <div class="pz-challenge-promo">
        <span class="pz-eyebrow">Free 30-day plan</span>
        <h2 class="pz-section-title">Teach yourself piano in 30 days</h2>
        <p>Twenty minutes a day, one small task at a time. By day 30 you play with both hands, know four chords that fit thousands of songs, and read simple music.</p>
        <ol class="pz-challenge-steps"><li><b>Week 1</b> Find your way around</li><li><b>Week 2</b> Rhythm and reading</li><li><b>Week 3</b> Chords and both hands</li><li><b>Days 22–30</b> Make it music</li></ol>
        <a class="pz-btn pz-btn-buy" href="/teach-yourself-piano/#the-30-day-teach-yourself-piano-plan">Start the challenge ARROW</a>
    </div>
</section>

TOPICS

{{#get "authors" limit="1" order="count.posts desc" as |authors|}}{{#foreach authors}}
<section class="pz-wrap pz-home-section" aria-labelledby="pz-teacher-h">
    <div class="pz-teacher{{#if profile_image}} has-img{{/if}}">
        {{#if profile_image}}<img class="pz-teacher-img" src="{{img_url profile_image size="s" format="webp"}}" alt="{{name}}" width="160" height="160" loading="lazy" decoding="async">{{/if}}
        <div class="pz-teacher-copy">
            <span class="pz-eyebrow">Meet your teacher</span>
            <h2 id="pz-teacher-h" class="pz-section-title">{{name}}</h2>
            {{#if bio}}<p>{{bio}}</p>{{/if}}
            <ul class="pz-teacher-points"><li>Every guide is written for real beginners and adult learners.</li><li>Reviews say who should skip a product, not just who should buy it.</li><li>Prices, plans and free trials are rechecked and dated.</li></ul>
            <a class="pz-more" href="{{url}}">More about {{name}} ARROW</a>
        </div>
    </div>
</section>
{{/foreach}}{{/get}}
'''

out = (HOME.replace('TABS', ''.join(tab(i, p) for i, p in enumerate(PATHS)))
       .replace('PANELS', '\n'.join(panel(p) for p in PATHS))
       .replace('ALLSLUGS', ','.join(ALL))
       .replace('TOOLS', ''.join(tool(t) for t in TOOLS))
       .replace('TOPICS', '\n\n'.join(topic(t) for t in TOPICS))
       .replace('ARROW', ARROW))
path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'pianoers', 'home.hbs')
open(path, 'w').write(out)
print(f'home.hbs written: {len(ALL)} posts placed, {len(PATHS)} journey tabs, {len(TOPICS)} topic sections')
