import re, os, sys, html as H
from PIL import Image
from playwright.sync_api import sync_playwright
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject, DictionaryObject, BooleanObject
sys.path.insert(0, '../images')
from kb import keyboard, white_seq

ROOT = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(ROOT, '..', 'images')
TMP = os.path.join(ROOT, 'tmp'); os.makedirs(TMP, exist_ok=True)
FONTS = os.path.abspath(os.path.join(ROOT, '../../theme/pianoers/assets/fonts'))
SITE = 'https://pianoers.com'
PAGE_URL = SITE + '/piano-basics-a-beginners-guide-to-the-keyboard/'
OUT = os.path.join(ROOT, '..', 'piano-basics-beginners-guide.pdf')
TITLE = 'Piano Basics for Beginners: The Complete Guide (2026)'
SUBJECT = ('Learn piano from zero: the 88 keys, middle C, finger numbers, reading music, rhythm, '
           'your first chords and scale, and a 20-minute practice plan.')
KEYWORDS = ('piano basics, piano for beginners, beginner piano guide, piano keys names, middle C, '
            'how to read piano music, grand staff, piano finger numbers, first piano chords, '
            'C major scale, piano practice plan, easy piano songs, learn piano')

def jpg(name):
    p = os.path.join(TMP, name + '.jpg')
    if not os.path.exists(p):
        im = Image.open(os.path.join(IMG, name + '.webp')).convert('RGB')
        im.thumbnail((1500, 3000)); im.save(p, 'JPEG', quality=82, optimize=True)
    return 'file://' + p

src = open(os.path.join(ROOT, '..', 'article.src.html')).read()
print_edits = [
    ('Every section has a diagram you can keep open while you sit at the piano, and two interactive tools let you hear chords and train your ear right on this page.',
     'Every section has a diagram you can keep on your music stand, and the last pages give you a practice log to fill in.'),
    ('<p>Hear it for yourself. Press the dotted keys one at a time, then play the full chord:</p>\n{{taste}}\n',
     '<p class="tip"><b>Try it now:</b> put your right thumb on C, finger 3 on E and finger 5 on G. Play them one at a time, then all together. That is C major. Move the same shape up to F and to G, then try A minor.</p>\n'),
    ('You can start from day one with a simple game: hear a note and find it.</p>\n{{ear}}',
     'You can start from day one with a simple game: hear a note and find it.</p>\n'
     f'<p class="tip"><b>Ear game:</b> ask a friend to play one of the white keys from C to B while you look away, then find it. Playing alone? Use the free <a href="{PAGE_URL}#ear-training">Name that note trainer on Pianoers.com</a>.</p>'),
    ('<p>Bookmark this page and come back to the diagrams whenever you need them. Every pianist started exactly where you are now.</p>',
     '<p>Keep this guide by your piano and come back to the diagrams whenever you need them. Every pianist started exactly where you are now.</p>'),
    ('The <a href="#ways-to-learn">comparison table below</a>', 'The <a href="#ways-to-learn">comparison table</a> later in this guide'),
]
src = re.sub(r'<div class="pz-answer pz-download">.*?</div>\n', '', src, flags=re.S)
src = re.sub(r'\n<li><strong>Print it:</strong>.*?</li>', '', src)
for a, b in print_edits:
    assert a in src, a[:60]; src = src.replace(a, b)

def fig(m):
    name, alt, cap = m[1], m[2], m[3]
    return f'<figure><img src="{jpg(name)}" alt="{alt}"><figcaption>{cap}</figcaption></figure>'
body = re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}', fig, src)
body = re.sub(r'\[\[([^|\]]+)\|([^\]]+)\]\]', lambda m: f'<a href="{SITE}/{m[1]}/">{m[2]}</a>', body)
body = body.replace('href="/teach-yourself-piano/"', f'href="{SITE}/teach-yourself-piano/"')
body = body.replace('<p class="pz-eyebrow">Quick answer</p>', '<p class="eyebrow">At a glance</p>')
body = body.replace('class="pz-answer"', 'class="answer"')
assert '{{' not in body and '[[' not in body

heads = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', body)

def strip(t): return H.unescape(re.sub(r'<[^>]+>', '', t))

practice_log = '<h2 id="practice-log" class="newpage">Practice log</h2><p>Fill in one row each time you practise. Aim for 20 minutes, five or six days a week, and write one small goal for each session.</p><table class="log"><thead><tr><th>Date</th><th>Minutes</th><th>Warm-up / scale</th><th>Piece and bars</th><th>Goal for today</th><th>✓</th></tr></thead><tbody>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>' * 18 + '</tbody></table>'
W = white_seq('C3', 'B4'); kb, kw = keyboard(W, 0, 0, 44, 170, 27, 106, {}, {}, None, None, 14, 11)
worksheet = (f'<h2 id="note-worksheet" class="newpage">Worksheet: name the keys</h2><p>Write the letter name on each white key. Start by finding every C (just left of the two black keys), then fill in the rest. Answers: the white keys run C D E F G A B, again and again.</p>'
             f'<div class="kbw"><svg viewBox="-2 -2 {kw+4} 174" width="100%">{kb}</svg></div>'
             '<p>Now circle middle C (the fourth C on an 88-key piano), and shade the three black keys that sit between F and B.</p>'
             '<h3>Rhythm check</h3><table><thead><tr><th>Note</th><th>Beats in 4/4</th></tr></thead><tbody><tr><td>Whole note</td><td class="blank"></td></tr><tr><td>Half note</td><td class="blank"></td></tr><tr><td>Dotted half note</td><td class="blank"></td></tr><tr><td>Quarter note</td><td class="blank"></td></tr><tr><td>Eighth note</td><td class="blank"></td></tr></tbody></table>'
             '<p class="small">Answers: 4, 2, 3, 1, ½.</p>')
reading = [('best-piano-lessons-online', 'The best online piano lessons, tested by a teacher'),
           ('teach-yourself-piano', 'How to learn piano by yourself: a step-by-step plan'),
           ('best-beginner-pianos', 'The best beginner keyboards and digital pianos'),
           ('best-digital-piano', 'The best digital pianos at every level'),
           ('best-free-piano-learning-apps', 'The best free and paid piano learning apps'),
           ('best-piano-books-for-adult-beginners', 'Piano books that work for adult beginners'),
           ('piano-practice-4-tips-to-successful-sessions', 'Piano practice: four tips for sessions that work'),
           ('pianoforall-review', 'Pianoforall review'), ('piano-marvel-review', 'Piano Marvel review')]
back = ('<h2 id="keep-learning" class="newpage">Keep learning with Pianoers</h2>'
        f'<p>This guide is the print edition of <a href="{PAGE_URL}">Piano Basics for Beginners</a> on Pianoers.com, where you can also hear the chords and play the ear-training game. These guides take you further:</p><ul class="reading">'
        + ''.join(f'<li><a href="{SITE}/{s}/">{t}</a><span>pianoers.com/{s}/</span></li>' for s, t in reading) + '</ul>'
        f'<p class="small">© 2026 Pianoers.com. You may print and share this guide for personal and teaching use. Please don’t sell it or republish it online; link to {PAGE_URL} instead.</p>')
extra_heads = [('note-worksheet', 'Worksheet: name the keys'), ('practice-log', 'Practice log'), ('keep-learning', 'Keep learning with Pianoers')]

def toc(pages):
    rows = ''.join(f'<li><a href="#{i}"><span>{strip(t)}</span><i></i><b>{pages.get(i, "")}</b></a></li>' for i, t in heads + extra_heads)
    return f'<section class="toc"><p class="eyebrow">Contents</p><h1>Inside this guide</h1><ol>{rows}</ol></section>'

CSS = f'''
@font-face{{font-family:"SG";src:url("file://{FONTS}/schibsted-grotesk-normal-500-800.woff2") format("woff2");font-weight:500 800}}
@font-face{{font-family:"Lora";src:url("file://{FONTS}/lora-normal-400-600.woff2") format("woff2");font-weight:400 600}}
@font-face{{font-family:"Lora";font-style:italic;src:url("file://{FONTS}/lora-italic-400-600.woff2") format("woff2");font-weight:400 600}}
@page{{size:Letter;margin:0.75in 0.8in 0.8in}}
*{{box-sizing:border-box}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{margin:0;font-family:"Lora",Georgia,serif;font-size:10.6pt;line-height:1.55;color:#15191c}}
h1,h2,h3,th,.eyebrow,figcaption,.toc,.small,.tip b{{font-family:"SG",Arial,sans-serif}}
h1{{font-size:28pt;line-height:1.05;margin:0 0 18pt;font-weight:800;letter-spacing:-.01em}}
h2{{font-size:17pt;line-height:1.15;font-weight:800;margin:22pt 0 8pt;padding-top:8pt;border-top:2.5pt solid #2e6475;break-after:avoid;color:#15191c}}
h3{{font-size:12pt;font-weight:800;margin:14pt 0 4pt;break-after:avoid;color:#2e6475}}
p,li{{orphans:3;widows:3}} p{{margin:0 0 7pt}} ul,ol{{margin:0 0 8pt;padding-left:16pt}} li{{margin:0 0 3pt}}
a{{color:#2e6475;text-decoration:none;border-bottom:.6pt solid #9fbcc5}}
strong,b{{font-weight:600}}
.eyebrow{{font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:#2e6475;margin:0 0 4pt}}
.answer{{background:#eef4f6;border-left:4pt solid #2e6475;padding:12pt 14pt;margin:0 0 12pt;border-radius:4pt}}
.answer h2{{border:0;padding:0;margin:0 0 6pt;font-size:14pt}}
.tip{{background:#fff8e6;border-left:4pt solid #f6b31e;padding:9pt 12pt;border-radius:4pt}}
figure{{margin:10pt 0 12pt;break-inside:avoid}} figure img{{width:100%;display:block;border-radius:5pt;border:.6pt solid #d9e2e5}}
figcaption{{font-size:8.5pt;color:#56666e;margin-top:4pt}}
table{{width:100%;border-collapse:collapse;margin:6pt 0 12pt;font-size:9.2pt;break-inside:auto}}
tr{{break-inside:avoid}} thead{{display:table-header-group}}
th{{text-align:left;font-weight:700;background:#15191c;color:#fff;padding:5pt 7pt}}
td{{padding:5pt 7pt;border-bottom:.6pt solid #d9e2e5;vertical-align:top}}
tbody tr:nth-child(even) td{{background:#f6f8f9}}
.newpage{{break-before:page}}
.toc h1{{font-size:24pt;margin-bottom:10pt}} .toc ol{{list-style:none;padding:0;margin:0;font-size:10pt}}
.toc li{{margin:0;counter-increment:t}} .toc a{{display:flex;align-items:baseline;gap:6pt;border:0;color:#15191c;padding:2.6pt 0;border-bottom:.5pt solid #e3e9eb}}
.toc a span::before{{content:counter(t,decimal-leading-zero);color:#2e6475;font-weight:800;display:inline-block;width:22pt}}
.toc i{{flex:1}} .toc b{{font-weight:700;color:#2e6475}}
.log td{{height:27pt}} .log th:nth-child(1){{width:12%}} .log th:nth-child(2){{width:10%}} .log th:last-child{{width:5%}}
.kbw{{margin:12pt 0;break-inside:avoid}} td.blank{{width:40%}}
.reading{{list-style:none;padding:0}} .reading li{{padding:6pt 0;border-bottom:.5pt solid #e3e9eb;display:flex;flex-direction:column}}
.reading a{{font-family:"SG",Arial,sans-serif;font-weight:700;border:0;font-size:11pt}} .reading span{{font-size:8.5pt;color:#56666e;font-family:"SG",Arial,sans-serif}}
.small{{font-size:8.5pt;color:#56666e;margin-top:14pt}}
'''

def doc(pages):
    return (f'<!doctype html><html lang="en-US"><head><meta charset="utf-8"><title>{TITLE}</title>'
            f'<meta name="author" content="Pianoers"><meta name="description" content="{SUBJECT}"><meta name="keywords" content="{KEYWORDS}">'
            f'<style>{CSS}</style></head><body>{toc(pages)}<div class="newpage"></div>'
            f'<h1>Piano Basics for Beginners</h1>{body}{worksheet}{practice_log}{back}</body></html>')

FOOT = ('<div style="width:100%;font-family:Arial,sans-serif;font-size:7.5pt;color:#56666e;padding:0 0.8in;display:flex;justify-content:space-between">'
        '<span>Piano Basics for Beginners · Pianoers.com</span><span><span class="pageNumber"></span></span></div>')

hk, hw = keyboard(white_seq('C3', 'B5'), 0, 0, 46, 270, 28, 170, {'C4': '#f6b31e'}, {'C4': 'C'}, None, None, 20, 14)
COVER = f'''<!doctype html><html lang="en-US"><head><meta charset="utf-8"><style>
@font-face{{font-family:"SG";src:url("file://{FONTS}/schibsted-grotesk-normal-500-800.woff2") format("woff2");font-weight:500 800}}
@font-face{{font-family:"Lora";src:url("file://{FONTS}/lora-normal-400-600.woff2") format("woff2")}}
@page{{size:Letter;margin:0}}html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{margin:0;width:8.5in;height:11in;overflow:hidden;position:relative;background:#15191c;color:#fff;font-family:"SG",Arial,sans-serif}}
.glow{{position:absolute;inset:0;background:radial-gradient(6in 5in at 70% 85%,rgb(46 100 117/60%),transparent 70%)}}
.t{{position:absolute;left:.85in;right:.85in;top:1.25in}}
.e{{font-size:12pt;letter-spacing:.18em;color:#f6b31e;font-weight:700;text-transform:uppercase}}
h1{{font-size:62pt;line-height:.95;margin:14pt 0 18pt;font-weight:800;letter-spacing:-.02em}}
p{{font-family:Lora,serif;font-size:16pt;line-height:1.4;color:#c9d4d8;margin:0;max-width:5.6in}}
ul{{list-style:none;padding:0;margin:26pt 0 0;display:grid;grid-template-columns:1fr 1fr;gap:7pt 18pt;font-size:11.5pt;color:#e6edef;max-width:5.8in}}
li::before{{content:"";display:inline-block;width:7pt;height:7pt;border-radius:50%;background:#f6b31e;margin-right:8pt}}
.kb{{position:absolute;left:-.6in;bottom:1.7in;transform:rotate(-7deg)}}
.b{{position:absolute;left:.85in;right:.85in;bottom:.55in;display:flex;justify-content:space-between;font-size:10.5pt;letter-spacing:.14em;font-weight:700;color:#7fa9b6}}
</style></head><body><svg class="kb" width="{hw+4}" height="274" viewBox="-2 -2 {hw+4} 274">{hk}</svg>
<div class="t"><div class="e">The complete beginner’s guide · 2026 edition</div><h1>Piano Basics<br>for Beginners</h1>
<p>Keys, notes, reading music, rhythm, chords, scales, practice and your first songs, in the order you need them.</p>
<ul><li>12 printable diagrams</li><li>First chords and scale</li><li>20-minute practice plan</li><li>Easy first songs</li><li>Note-naming worksheet</li><li>Practice log</li></ul></div>
<div class="b"><span>PIANOERS.COM</span><span>FREE PRINTABLE GUIDE</span></div></body></html>'''

def heading_pages(pdf_path, offset=0):
    r = PdfReader(pdf_path); found = {}
    texts = [re.sub(r'\s+', ' ', p.extract_text() or '') for p in r.pages]
    for i, t in heads + extra_heads:
        name = re.sub(r'\s+', ' ', strip(t)).strip()
        for n, tx in enumerate(texts[1:], start=1):
            if name in tx and 'Inside this guide' not in tx:
                found[i] = n + 1 + offset; break
    return found, len(r.pages)

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome')
    pg = b.new_page()
    def render(html, path, footer=True):
        f = os.path.join(TMP, 'page.html'); open(f, 'w').write(html)
        pg.goto('file://' + f, wait_until='networkidle'); pg.wait_for_timeout(500)
        kw = dict(path=path, print_background=True, prefer_css_page_size=True, outline=True, tagged=True)
        if footer: kw.update(display_header_footer=True, header_template='<span></span>', footer_template=FOOT)
        pg.pdf(**kw)
    body_pdf = os.path.join(TMP, 'body.pdf'); cover_pdf = os.path.join(TMP, 'cover.pdf')
    pages = {i: '00' for i, _ in heads + extra_heads}
    render(doc(pages), body_pdf)
    pages, n = heading_pages(body_pdf)
    render(doc(pages), body_pdf)
    pages2, n = heading_pages(body_pdf)
    assert pages2 == pages, (pages, pages2)
    missing = [i for i, _ in heads + extra_heads if i not in pages]
    render(COVER, cover_pdf, footer=False)
    b.close()

w = PdfWriter(clone_from=body_pdf)
w.insert_page(PdfReader(cover_pdf).pages[0], 0)
w.add_metadata({'/Title': TITLE, '/Author': 'Pianoers', '/Subject': SUBJECT, '/Keywords': KEYWORDS,
                '/Creator': 'Pianoers.com', '/Producer': 'Pianoers.com'})
w._root_object[NameObject('/Lang')] = TextStringObject('en-US')
w._root_object[NameObject('/ViewerPreferences')] = DictionaryObject({NameObject('/DisplayDocTitle'): BooleanObject(True)})
w.page_mode = '/UseOutlines'
w.compress_identical_objects()
with open(OUT, 'wb') as f: w.write(f)
print('pages', len(PdfReader(OUT).pages), 'size KB', os.path.getsize(OUT) // 1024, 'missing toc', missing)
