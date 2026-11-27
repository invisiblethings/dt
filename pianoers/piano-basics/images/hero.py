import json
from kb import keyboard, white_seq
def hero(h):
    kbsvg,w=keyboard(white_seq('C3','B4'),0,0,52,300,32,190,{'C4':'#f6b31e'},{'C4':'C'},None,None,22,16)
    return f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
<style>*{{box-sizing:border-box;margin:0}}body{{width:1200px;height:{h}px;overflow:hidden;font-family:"Schibsted Grotesk",Arial,sans-serif;background:#15191c;color:#fff;position:relative}}
.kb{{position:absolute;right:-90px;bottom:-40px;transform:rotate(-8deg);transform-origin:center;filter:drop-shadow(0 30px 40px rgb(0 0 0/45%))}}
.glow{{position:absolute;inset:0;background:radial-gradient(800px 500px at 85% 80%,rgb(46 100 117/55%),transparent 70%)}}
.t{{position:absolute;left:70px;top:{(h-430)//2}px;width:620px}}
.e{{font-size:22px;font-weight:700;letter-spacing:.16em;color:#f6b31e;text-transform:uppercase}}
h1{{font-size:84px;line-height:.98;font-weight:800;letter-spacing:-.02em;margin:16px 0 22px}}
p{{font-family:Lora,serif;font-size:28px;line-height:1.35;color:#c9d4d8}}
.chips{{display:flex;gap:10px;margin-top:26px;flex-wrap:wrap}}.chips span{{border:1.5px solid #3c4a50;border-radius:99px;padding:7px 16px;font-size:19px;font-weight:700;color:#e6edef}}
.mc{{position:absolute;background:#f6b31e;color:#15191c;font-weight:800;font-size:20px;padding:8px 14px;border-radius:12px}}
.b{{position:absolute;left:70px;bottom:34px;font-size:18px;letter-spacing:.14em;font-weight:700;color:#7fa9b6}}
</style></head><body><div class="glow"></div>
<svg class="kb" width="{w+4}" height="304" viewBox="-2 -2 {w+4} 304">{kbsvg}</svg>
<div class="t"><div class="e">The complete beginner's guide</div><h1>Piano Basics</h1><p>Keys, notes, reading music, rhythm, chords, scales and your first songs.</p>
<div class="chips"><span>88 keys</span><span>Middle C</span><span>Grand staff</span><span>First chords</span></div></div>
<div class="b">PIANOERS.COM</div></body></html>'''
json.dump({'piano-basics-featured':[675,hero(675)],'piano-basics-social':[630,hero(630)]},open('hero.json','w'))
