import os, sys, re
sys.path.insert(0, '../images'); sys.path.insert(0, '../../piano-basics/images')
from days import DAYS
from kb import keyboard, white_seq
from playwright.sync_api import sync_playwright
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject, DictionaryObject, BooleanObject
ROOT = os.path.dirname(os.path.abspath(__file__)); TMP = os.path.join(ROOT, 'tmp'); os.makedirs(TMP, exist_ok=True)
FONTS = os.path.abspath(os.path.join(ROOT, '../../theme/pianoers/assets/fonts'))
URL = 'https://pianoers.com/teach-yourself-piano/'
OUT = os.path.join(ROOT, '..', '30-day-piano-challenge.pdf')
TITLE = '30-Day Piano Challenge: Teach Yourself Piano in 30 Days'
SUBJECT = 'A printable 30-day plan to teach yourself piano: daily 20-minute tasks, weekly check-ins, a practice log, a tempo log, a video self-check and a certificate.'
KEYWORDS = 'teach yourself piano, learn piano by yourself, how to play piano, how to play piano for beginners, 30-day piano challenge, piano practice plan, learn piano, piano practice log'
FF = f'''@font-face{{font-family:"SG";src:url("file://{FONTS}/schibsted-grotesk-normal-500-800.woff2") format("woff2");font-weight:500 800}}
@font-face{{font-family:"Lora";src:url("file://{FONTS}/lora-normal-400-600.woff2") format("woff2");font-weight:400 600}}
@font-face{{font-family:"Lora";font-style:italic;src:url("file://{FONTS}/lora-italic-400-600.woff2") format("woff2")}}'''
CSS = FF + '''
@page{size:Letter;margin:.7in .75in .8in}
*{box-sizing:border-box}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:"Lora",Georgia,serif;font-size:10.5pt;line-height:1.5;color:#15191c}
h1,h2,h3,th,.eyebrow,.wk,.small,.tag{font-family:"SG",Arial,sans-serif}
h1{font-size:26pt;line-height:1.05;margin:0 0 10pt;font-weight:800}
h2{font-size:17pt;font-weight:800;margin:0 0 6pt}
h3{font-size:12pt;font-weight:800;margin:12pt 0 4pt;color:#2e6475}
p{margin:0 0 7pt} ul,ol{margin:0 0 8pt;padding-left:16pt} li{margin:0 0 3pt}
a{color:#2e6475;text-decoration:none;border-bottom:.6pt solid #9fbcc5}
.eyebrow{font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:#2e6475;margin:0 0 4pt}
.page{break-after:page}.page:last-child{break-after:auto}
table{width:100%;border-collapse:collapse;margin:8pt 0;font-size:9.5pt}
th{text-align:left;font-weight:700;background:#15191c;color:#fff;padding:5pt 7pt}
td{padding:6pt 7pt;border-bottom:.6pt solid #d9e2e5;vertical-align:top}
tr{break-inside:avoid}
.box{width:13pt;height:13pt;border:1.4pt solid #2e6475;border-radius:3pt;display:inline-block}
.day td:first-child{font-family:"SG";font-weight:800;color:#2e6475;width:9%}
.day td:nth-child(2) b{font-family:"SG";font-weight:700;display:block}
.day td:nth-child(3){width:11%} .day td:last-child{width:7%;text-align:center}
.tip{background:#fff8e6;border-left:4pt solid #f6b31e;padding:8pt 11pt;border-radius:4pt;margin:8pt 0}
.check{background:#eef4f6;border-left:4pt solid #2e6475;padding:8pt 11pt;border-radius:4pt;margin:8pt 0}
.lines td{height:26pt}
.small{font-size:8.5pt;color:#56666e}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10pt}
.card{border:.8pt solid #d9e2e5;border-radius:6pt;padding:9pt 11pt}
.cert{border:4pt double #2e6475;border-radius:10pt;height:8.9in;padding:.6in .5in;text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center}
.cert h1{font-size:34pt;margin:8pt 0}
.cert .line{width:5in;border-bottom:1pt solid #15191c;height:34pt;margin:6pt auto}
'''
PH = [('Week 1', 'Find your way around', 0, 7, 'Play both songs for someone, or record them. Can you name any key in under two seconds?'),
      ('Week 2', 'Rhythm and reading', 7, 14, 'Record Twinkle and your C, F and G chords. Is your beat steady when you count out loud?'),
      ('Week 3', 'Chords and both hands', 14, 21, 'Film your hands from the side and from above. Wrists level? Fingers curved?'),
      ('Days 22 to 30', 'Make it music', 21, 30, 'Perform for someone or share your video. Then choose the course you will follow next.')]
def week(i, ph):
    a, b, s, e, chk = ph
    rows = ''.join(f'<tr class="day"><td>Day {k+1}</td><td><b>{DAYS[k][0]}</b>{DAYS[k][1]}</td><td>___ min</td><td><span class="box"></span></td></tr>' for k in range(s, e))
    return (f'<section class="page" id="week-{i+1}"><p class="eyebrow">{a}</p><h2>{b}</h2>'
            '<p>About 20 minutes a day: a 3-minute warm-up, then today\'s task, then play something you enjoy. Tick the box when you are done.</p>'
            f'<table><thead><tr><th>Day</th><th>Today\'s task</th><th>Time</th><th>Done</th></tr></thead><tbody>{rows}</tbody></table>'
            f'<div class="check"><b>Check-in:</b> {chk}</div>'
            '<h3>Notes</h3><table class="lines"><tbody>' + '<tr><td></td></tr>' * (4 if e - s > 7 else 6) + '</tbody></table></section>')
intro = ('<section class="page" id="how-to-use"><p class="eyebrow">How to use this plan</p><h1>Teach yourself piano in 30 days</h1>'
 f'<p>This is the printable companion to the free guide <a href="{URL}">How to Play Piano: Teach Yourself Step by Step</a> on Pianoers.com. Each day has one small task that takes about 20 minutes. By day 30 you will play melodies with both hands, know four chords that fit thousands of songs, read simple notes and play with a steady beat.</p>'
 '<h3>Each session</h3><ol><li><b>Warm up (3 min):</b> the five-finger pattern in C position, each hand.</li><li><b>Today\'s task (12 min):</b> slowly, hands separately first.</li><li><b>Play for fun (5 min):</b> anything you enjoy, including earlier songs.</li></ol>'
 '<h3>Five rules that make it work</h3><ol><li><b>Little and often.</b> Twenty minutes, five or six days a week, beats one long session.</li><li><b>Slow is fast.</b> If you make the same mistake twice, halve the speed.</li><li><b>Count out loud</b> and use a metronome.</li><li><b>Fix the hard bars first</b> instead of always starting from the top.</li><li><b>Missed a day?</b> Just carry on tomorrow. Don\'t try to catch up twice.</li></ol>'
 '<div class="tip"><b>The tools on the website:</b> play your first song on an on-screen keyboard, use the free metronome, work out how long your goals will take, and tick off the challenge online.</div>'
 '<h3>My goal</h3><p class="small">Write one sentence, for example: "In a year I want to play Let It Be and sing along."</p><table class="lines"><tbody><tr><td></td></tr><tr><td></td></tr></tbody></table>'
 '<h3>My practice time</h3><p class="small">When and where will you practise? Link it to something you already do every day.</p><table class="lines"><tbody><tr><td></td></tr></tbody></table></section>')
W = white_seq('C4', 'C5')
kb, kw = keyboard(W, 0, 0, 60, 150, 36, 94, {}, {n: n[0] for n in W}, None, None, 14, 11)
cheat = ('<section class="page" id="cheat-sheet"><p class="eyebrow">Cheat sheet</p><h2>C position, songs and chords</h2>'
 f'<div class="card" style="margin:6pt 0 10pt"><svg viewBox="-2 -2 {kw+4} 154" width="100%">{kb}</svg><p class="small" style="margin:4pt 0 0">Right thumb (1) on middle C, then fingers 2, 3, 4 and 5 on D, E, F and G. Left hand: finger 5 on the C below middle C.</p></div>'
 '<div class="grid2"><div class="card"><h3 style="margin-top:0">First songs (right hand)</h3><p><b>Ode to Joy:</b> E E F G | G F E D | C C D E | E· D D</p><p><b>Mary Had a Little Lamb:</b> E D C D | E E E | D D D | E G G</p><p><b>Twinkle, Twinkle:</b> C C G G | A A G | F F E E | D D C</p><p class="small">"·" means hold the note a little longer. For Twinkle, stretch finger 5 up to A.</p></div>'
 '<div class="card"><h3 style="margin-top:0">Four chords</h3><table><tbody><tr><td><b>C</b></td><td>C E G</td></tr><tr><td><b>G</b></td><td>G B D</td></tr><tr><td><b>Am</b></td><td>A C E</td></tr><tr><td><b>F</b></td><td>F A C</td></tr></tbody></table><p class="small">Right-hand fingers 1 3 5. Loop C, G, Am, F with four beats each.</p></div></div>'
 '<div class="grid2" style="margin-top:10pt"><div class="card"><h3 style="margin-top:0">C major scale</h3><p>Right hand: 1 2 3, thumb under, 1 2 3 4 5<br>Left hand: 5 4 3 2 1, finger 3 over, 3 2 1</p></div>'
 '<div class="card"><h3 style="margin-top:0">Counting</h3><p>Whole note 4 beats · half note 2 · quarter note 1 · eighth note ½. A dot adds half the value.</p></div></div></section>')
tempo = ('<section class="page" id="tempo-log"><p class="eyebrow">Tempo log</p><h2>Climb the tempo ladder</h2><p>Start at the speed where you play a passage perfectly. After three clean runs in a row, go 4 bpm faster. After a mistake, step back down 4 bpm.</p>'
 '<table class="lines"><thead><tr><th style="width:14%">Date</th><th>Piece and bars</th><th style="width:16%">Start bpm</th><th style="width:16%">End bpm</th><th style="width:14%">Goal bpm</th></tr></thead><tbody>' + '<tr><td></td><td></td><td></td><td></td><td></td></tr>' * 14 + '</tbody></table></section>')
video = ('<section class="page" id="video-check"><p class="eyebrow">Be your own teacher</p><h2>Video self-check</h2><p>Film the same piece on day 21 and day 30, from three angles. Tick what looks right, and note what to work on.</p>'
 '<table><thead><tr><th>Angle</th><th>Check</th><th>Day 21</th><th>Day 30</th></tr></thead><tbody>'
 + ''.join(f'<tr><td>{a}</td><td>{c}</td><td><span class="box"></span></td><td><span class="box"></span></td></tr>' for a, c in [('Side', 'Wrists level, not sagging'), ('Side', 'Fingers curved, knuckles firm'), ('Above', 'Fingers match the numbers'), ('Above', 'The thumb passes under smoothly'), ('Behind', 'Shoulders down and loose'), ('Behind', 'Elbows slightly in front of the body'), ('Listen', 'A steady beat'), ('Listen', 'Even volume'), ('Listen', 'No pauses at the hard bars')])
 + '</tbody></table><h3>What to work on next</h3><table class="lines"><tbody>' + '<tr><td></td></tr>' * 4 + '</tbody></table></section>')
cert = ('<section class="page" id="certificate"><div class="cert"><p class="eyebrow">Pianoers.com</p><p style="font-family:SG;font-size:13pt;margin:0">Certificate of completion</p><h1>30-Day Piano Challenge</h1><p>This certifies that</p><div class="line"></div>'
 '<p>practised the piano for 30 days and taught themselves to play melodies with both hands, four chords, the C major scale, and simple music from the page.</p><div style="display:flex;gap:.6in;margin-top:18pt"><div><div class="line" style="width:2.2in"></div><p class="small">Date</p></div><div><div class="line" style="width:2.2in"></div><p class="small">First song I performed</p></div></div>'
 f'<p class="small" style="margin-top:22pt">What next? Choose your course at <a href="https://pianoers.com/best-piano-lessons-online/">pianoers.com/best-piano-lessons-online</a></p></div></section>')
heads = [('how-to-use', 'How to use this plan'), ('cheat-sheet', 'Cheat sheet'), ('week-1', 'Week 1'), ('week-2', 'Week 2'), ('week-3', 'Week 3'), ('week-4', 'Days 22 to 30'), ('tempo-log', 'Tempo log'), ('video-check', 'Video self-check'), ('certificate', 'Certificate')]
body = intro + cheat + ''.join(week(i, ph) for i, ph in enumerate(PH)) + tempo + video + cert
DOC = (f'<!doctype html><html lang="en-US"><head><meta charset="utf-8"><title>{TITLE}</title><meta name="author" content="Pianoers"><meta name="description" content="{SUBJECT}"><meta name="keywords" content="{KEYWORDS}"><style>{CSS}</style></head><body>'
       + body.replace('<h1>Teach yourself piano in 30 days</h1>', '<h1>Teach yourself piano in 30 days</h1>') + '</body></html>')
FOOT = ('<div style="width:100%;font-family:Arial,sans-serif;font-size:7.5pt;color:#56666e;padding:0 .75in;display:flex;justify-content:space-between">'
        '<span>30-Day Piano Challenge · Pianoers.com/teach-yourself-piano</span><span class="pageNumber"></span></div>')
hk, hw = keyboard(white_seq('C3', 'B5'), 0, 0, 46, 270, 28, 170, {'C4': '#f6b31e', 'E4': '#f6b31e', 'G4': '#f6b31e'}, {}, None, None, 20, 14)
COVER = f'''<!doctype html><html lang="en-US"><head><meta charset="utf-8"><style>{FF}
@page{{size:Letter;margin:0}}html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{margin:0;width:8.5in;height:11in;overflow:hidden;position:relative;background:#1d4a57;color:#fff;font-family:"SG",Arial,sans-serif}}
.t{{position:absolute;left:.85in;right:.85in;top:1.2in}}.e{{font-size:12pt;letter-spacing:.18em;color:#f6b31e;font-weight:700;text-transform:uppercase}}
h1{{font-size:60pt;line-height:.95;margin:14pt 0 18pt;font-weight:800;letter-spacing:-.02em}}p{{font-family:Lora,serif;font-size:16pt;line-height:1.4;color:#d3e3e8;margin:0;max-width:5.8in}}
ul{{list-style:none;padding:0;margin:26pt 0 0;display:grid;grid-template-columns:1fr 1fr;gap:7pt 18pt;font-size:11.5pt;max-width:5.8in}}li::before{{content:"";display:inline-block;width:7pt;height:7pt;border-radius:50%;background:#f6b31e;margin-right:8pt}}
.kb{{position:absolute;left:-.5in;bottom:1.7in;transform:rotate(-7deg)}}.b{{position:absolute;left:.85in;right:.85in;bottom:.55in;display:flex;justify-content:space-between;font-size:10.5pt;letter-spacing:.14em;font-weight:700;color:#9fc6d1}}
</style></head><body><svg class="kb" width="{hw+4}" height="274" viewBox="-2 -2 {hw+4} 274">{hk}</svg>
<div class="t"><div class="e">Free printable plan</div><h1>30-Day Piano<br>Challenge</h1><p>Teach yourself piano in 20 minutes a day, from your first note to playing with both hands.</p>
<ul><li>A task for every day</li><li>Weekly check-ins</li><li>Cheat sheet</li><li>Tempo log</li><li>Video self-check</li><li>Certificate for day 30</li></ul></div>
<div class="b"><span>PIANOERS.COM</span><span>TEACH YOURSELF PIANO</span></div></body></html>'''
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome'); pg = b.new_page()
    def render(html, path, footer=True):
        f = os.path.join(TMP, 'page.html'); open(f, 'w').write(html); pg.goto('file://' + f, wait_until='networkidle'); pg.wait_for_timeout(400)
        kw = dict(path=path, print_background=True, prefer_css_page_size=True, outline=True, tagged=True)
        if footer: kw.update(display_header_footer=True, header_template='<span></span>', footer_template=FOOT)
        pg.pdf(**kw)
    bp = os.path.join(TMP, 'body.pdf'); cp = os.path.join(TMP, 'cover.pdf')
    render(DOC, bp); render(COVER, cp, footer=False); b.close()
w = PdfWriter(clone_from=bp); w.insert_page(PdfReader(cp).pages[0], 0)
w.add_metadata({'/Title': TITLE, '/Author': 'Pianoers', '/Subject': SUBJECT, '/Keywords': KEYWORDS, '/Creator': 'Pianoers.com', '/Producer': 'Pianoers.com'})
w._root_object[NameObject('/Lang')] = TextStringObject('en-US')
w._root_object[NameObject('/ViewerPreferences')] = DictionaryObject({NameObject('/DisplayDocTitle'): BooleanObject(True)})
w.page_mode = '/UseOutlines'
with open(OUT, 'wb') as f: w.write(f)
r = PdfReader(OUT); print('pages', len(r.pages), 'KB', os.path.getsize(OUT) // 1024, 'tagged', '/StructTreeRoot' in r.trailer['/Root'], 'outline', len(r.outline))
