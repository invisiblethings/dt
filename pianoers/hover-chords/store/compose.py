import os
from playwright.sync_api import sync_playwright
from PIL import Image
SRC='file://'+os.path.abspath('src')+'/'
OUT=os.path.abspath('assets')
FONT='<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">'
BASE='''*{box-sizing:border-box;margin:0}body{width:WWpx;height:HHpx;overflow:hidden;font-family:"Schibsted Grotesk",Arial,sans-serif;color:#15191c;position:relative;
background:radial-gradient(circle at 85% 10%,#3b7f93 0,#2e6475 30%,#163a46 75%)}
.eyebrow{font-size:20px;font-weight:800;letter-spacing:.16em;color:#f6b31e;text-transform:uppercase}
h1{font-size:62px;line-height:1.02;font-weight:800;color:#fff;letter-spacing:-.015em;margin:14px 0 18px}
.sub{font-size:24px;line-height:1.38;color:#d6e7ec;font-weight:500}
.brand{position:absolute;left:64px;bottom:40px;display:flex;align-items:center;gap:12px;color:#fff;font-weight:800;font-size:22px}
.brand small{display:block;font-size:15px;font-weight:600;color:#a9cbd5}
.win{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 30px 60px rgb(0 0 0/35%),0 4px 12px rgb(0 0 0/20%)}
.bar{height:34px;background:#e9eef0;display:flex;align-items:center;gap:7px;padding:0 14px}
.bar i{width:11px;height:11px;border-radius:50%;background:#c9d3d7;display:block}
.bar span{margin-left:14px;flex:1;height:20px;border-radius:999px;background:#fff;font-size:12px;color:#56666e;line-height:20px;padding-left:12px}
.shot{display:block;width:100%}
.pop{position:absolute;filter:drop-shadow(0 18px 30px rgb(0 0 0/30%))}
.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.chip{background:rgb(255 255 255/12%);border:1px solid rgb(255 255 255/22%);color:#fff;border-radius:999px;padding:8px 14px;font-size:19px;font-weight:700}
.chip.y{background:#f6b31e;border-color:#f6b31e;color:#1b1400}
.ticks{margin-top:26px;display:grid;gap:12px}
.ticks div{display:flex;gap:12px;align-items:center;color:#fff;font-size:21px;font-weight:600}
.ticks b{width:30px;height:30px;border-radius:50%;background:#f6b31e;color:#1b1400;display:grid;place-items:center;font-size:17px;flex:none}
'''
ICON='<img src="'+SRC+'../../extension/icons/icon128.png" width="44" height="44">'
def brand(): return f'<div class="brand">{ICON}<div>Hover Chords<small>by Pianoers.com</small></div></div>'
def win(img,url,w): return f'<div class="win" style="width:{w}px"><div class="bar"><i></i><i></i><i></i><span>{url}</span></div><img class="shot" src="{SRC}{img}"></div>'
def page(w,h,body):
    css=BASE.replace('WW',str(w)).replace('HH',str(h))
    return f'<!doctype html><html><head><meta charset="utf-8">{FONT}<style>{css}</style></head><body>{body}</body></html>'
L='position:absolute;left:64px;top:%dpx;width:%dpx'
shots={
'screenshot-1-see-any-chord':page(1280,800,f'''<div style="{L%(150,430)}"><div class="eyebrow">Piano chord finder</div><h1>See any chord on a piano keyboard</h1><p class="sub">Hover a chord on any chord sheet. Hover Chords lights up the keys, names the notes and plays it for you.</p></div>
<div style="position:absolute;right:56px;top:96px">{win('page-pinned.png','songsheets.example.com/amazing-grace',700)}</div>{brand()}'''),
'screenshot-2-hover-click-hear':page(1280,800,f'''<div style="{L%(170,430)}"><div class="eyebrow">Hover. Click. Hear.</div><h1>Hover to see it, click to hear it</h1><p class="sub">Hover shows the chord instantly. Click to pin it, play it with a real piano-like sound, and keep it open while you play along.</p></div>
<div style="position:absolute;right:56px;top:96px">{win('page-hover.png','songsheets.example.com/amazing-grace',700)}</div>{brand()}'''),
'screenshot-3-inversions':page(1280,800,f'''<div style="{L%(170,420)}"><div class="eyebrow">Learn every voicing</div><h1>Every inversion, one click</h1><p class="sub">Step through root position, 1st, 2nd and 3rd inversions with the arrow buttons or your arrow keys. Find the shape that flows into the next chord.</p></div>
<img class="pop" src="{SRC}pop-c-root.png" style="right:300px;top:70px;width:388px">
<img class="pop" src="{SRC}pop-c-inv1.png" style="right:150px;top:285px;width:388px">
<img class="pop" src="{SRC}pop-c-inv2.png" style="right:20px;top:500px;width:388px">{brand()}'''),
'screenshot-4-transpose':page(1280,800,f'''<div style="{L%(110,800)}"><div class="eyebrow">Change the key</div><h1 style="font-size:56px">Transpose the whole song in one click</h1></div>
<div style="position:absolute;left:64px;top:345px;display:flex;align-items:center;gap:22px">
<div><div style="color:#d6e7ec;font-weight:800;font-size:19px;margin-bottom:8px">ORIGINAL KEY: G</div>{win('sheet-original.png','songsheets.example.com',400)}</div>
<div style="color:#f6b31e;font-size:56px;font-weight:800">&#8594;</div>
<div><div style="color:#f6b31e;font-weight:800;font-size:19px;margin-bottom:8px">TRANSPOSED +2: A</div>{win('sheet-transposed.png','songsheets.example.com',400)}</div></div>
<img src="{SRC}popup.png" style="position:absolute;right:56px;top:96px;width:250px;border-radius:14px;box-shadow:0 30px 60px rgb(0 0 0/35%)">{brand()}'''),
'screenshot-5-real-chord-sheets':page(1280,800,f'''<div style="{L%(110,640)}"><div class="eyebrow">Built for real chord sheets</div><h1 style="font-size:54px">Understands the chords musicians actually write</h1>
<div class="chips"><span class="chip y">C</span><span class="chip y">Am7</span><span class="chip">Cmaj7</span><span class="chip">F#m7b5</span><span class="chip">Bdim7</span><span class="chip">Gsus4</span><span class="chip">Cadd9</span><span class="chip">E7#9</span><span class="chip">C6/9</span><span class="chip">D/F#</span><span class="chip">Bb13</span><span class="chip">[C]ChordPro</span></div>
<div class="ticks"><div><b>&#10003;</b>Correct note spelling: C7 shows Bb, not A#</div><div><b>&#10003;</b>No account, no tracking, works offline</div><div><b>&#10003;</b>Leaves normal text alone</div></div></div>
<img class="pop" src="{SRC}pop-gb.png" style="right:40px;top:120px;width:420px">
<img class="pop" src="{SRC}pop-em.png" style="right:120px;top:420px;width:380px">{brand()}'''),
'small-promo-tile-440x280':page(440,280,f'''<div style="position:absolute;left:28px;top:28px;display:flex;align-items:center;gap:12px"><img src="{SRC}../../extension/icons/icon128.png" width="56" height="56"><div style="color:#fff;font-weight:800;font-size:29px;line-height:1">Hover Chords<div style="font-size:15px;color:#a9cbd5;font-weight:600;margin-top:5px">Piano chords on any chord sheet</div></div></div>
<div style="position:absolute;left:28px;top:178px;color:#fff;font-weight:800;font-size:40px;line-height:1">Am</div>
<svg viewBox="0 0 300 96" width="300" style="position:absolute;left:116px;top:150px;filter:drop-shadow(0 12px 20px rgb(0 0 0/30%))"><rect x="0" y="0" width="30" height="96" rx="3" fill="#ffffff" stroke="#9aa9ae"/><rect x="30" y="0" width="30" height="96" rx="3" fill="#ffffff" stroke="#9aa9ae"/><rect x="60" y="0" width="30" height="96" rx="3" fill="#ffffff" stroke="#9aa9ae"/><rect x="90" y="0" width="30" height="96" rx="3" fill="#ffffff" stroke="#9aa9ae"/><rect x="120" y="0" width="30" height="96" rx="3" fill="#ffffff" stroke="#9aa9ae"/><rect x="150" y="0" width="30" height="96" rx="3" fill="#f6b31e" stroke="#9aa9ae"/><rect x="180" y="0" width="30" height="96" rx="3" fill="#ffffff" stroke="#9aa9ae"/><rect x="210" y="0" width="30" height="96" rx="3" fill="#f6b31e" stroke="#9aa9ae"/><rect x="240" y="0" width="30" height="96" rx="3" fill="#ffffff" stroke="#9aa9ae"/><rect x="270" y="0" width="30" height="96" rx="3" fill="#f6b31e" stroke="#9aa9ae"/><rect x="21" y="0" width="18" height="58" rx="2" fill="#1c2226"/><rect x="51" y="0" width="18" height="58" rx="2" fill="#1c2226"/><rect x="111" y="0" width="18" height="58" rx="2" fill="#1c2226"/><rect x="141" y="0" width="18" height="58" rx="2" fill="#1c2226"/><rect x="171" y="0" width="18" height="58" rx="2" fill="#1c2226"/><rect x="231" y="0" width="18" height="58" rx="2" fill="#1c2226"/><rect x="261" y="0" width="18" height="58" rx="2" fill="#1c2226"/><text x="165" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="#15191c" font-family="Arial">A</text><text x="225" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="#15191c" font-family="Arial">C</text><text x="285" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="#15191c" font-family="Arial">E</text></svg>'''),
'marquee-promo-tile-1400x560':page(1400,560,f'''<div style="position:absolute;left:72px;top:92px;width:560px"><div style="display:flex;align-items:center;gap:14px;margin-bottom:22px"><img src="{SRC}../../extension/icons/icon128.png" width="56" height="56"><span style="color:#fff;font-weight:800;font-size:30px">Hover Chords</span></div>
<h1 style="font-size:58px">Piano chords on any chord sheet</h1><p class="sub">Hover to see the keys. Click to hear it. Transpose the whole song in one click.</p></div>
<img class="pop" src="{SRC}pop-c-inv1.png" style="left:700px;top:40px;width:400px">
<img class="pop" src="{SRC}pop-g7.png" style="left:980px;top:250px;width:390px">'''),
}
SIZES={k:((440,280) if k.startswith('small') else (1400,560) if k.startswith('marquee') else (1280,800)) for k in shots}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args=['--allow-file-access-from-files'],proxy={'server':os.environ['HTTPS_PROXY']} if os.environ.get('HTTPS_PROXY') else None)
    for name,html in shots.items():
        w,h=SIZES[name]
        open(f'/tmp/{name}.html','w').write(html)
        pg=b.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
        pg.goto(f'file:///tmp/{name}.html',wait_until='networkidle'); pg.wait_for_timeout(600)
        pg.screenshot(path=f'{OUT}/{name}.png')
        Image.open(f'{OUT}/{name}.png').convert('RGB').save(f'{OUT}/{name}.png')
        os.remove(f'/tmp/{name}.html')
        print(name,Image.open(f'{OUT}/{name}.png').size,Image.open(f'{OUT}/{name}.png').mode)
    b.close()
