import json
from page import page
from kb import keyboard, white_seq
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
steps=[('1','Price history','Paste the link into camelcamelcamel or Keepa. Same as last month? Not a deal.'),('2','Exact model','P-145 vs P-145BT. Recital Pro vs MKII. The photos often match; the specs don\'t.'),('3','Who sells it','"Ships from and sold by Amazon" or the brand. Be wary of odd third-party prices.'),('4','The bundle','A good pedal and stand: worth it. A toy footswitch and earbuds: not.'),('5','Return window','Holiday returns usually run into January. Keep the box.')]
cards=''.join(f'<div class="card" style="padding:18px 18px 16px;display:flex;flex-direction:column;gap:8px"><div style="width:42px;height:42px;border-radius:50%;background:{A};color:#1b1400;display:grid;place-items:center;font-weight:800;font-size:22px">{n}</div><div style="font-size:22px;font-weight:800;line-height:1.15">{t}</div><div style="font-size:16px;font-family:Lora,serif;color:#33424a;line-height:1.4">{d}</div></div>' for n,t,d in steps)
body=f'<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px">{cards}</div><div class="card" style="margin-top:16px;padding:14px 20px;font-size:18px;background:{INK};color:#fff;border:0"><b style="color:{A}">Rule of thumb:</b> if today\'s price beats the "good deal" price in our table, buy. If not, wait.</div>'
imgs={'black-friday-piano-deal-checklist':(560,page(560,'Before you buy','Is it a real Black Friday deal?',body,'Pianoers.com · Black Friday piano deals 2026'))}
ws=white_seq('C2','C7'); kbs,kw=keyboard(ws,ww=1200/len(ws),wh=150,fill={'C4':A,'E4':A,'G4':A},stroke='#3a4449',black='#0b0f11')
def hero(h):
    tags=[('Yamaha P-145BT','$450'),('Roland FP-10','$450'),('Alesis Recital Pro MKII','$320')]
    tg=''.join(f'<div class="tag" style="transform:rotate({r}deg)"><span class="hole"></span><div><small>{n}</small><b>under {p}</b></div></div>' for (n,p),r in zip(tags,[-4,3,-2]))
    return f'''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet"><style>
*{{margin:0;box-sizing:border-box}}body{{width:1200px;height:{h}px;overflow:hidden;position:relative;background:radial-gradient(900px 500px at 85% 20%,#2a3338 0%,#15191c 60%);font-family:"Schibsted Grotesk",sans-serif;color:#fff}}
.t{{position:absolute;left:70px;top:{150 if h>650 else 48}px;width:640px}}.e{{font-weight:800;font-size:20px;letter-spacing:.2em;color:{A}}}
h1{{font-family:Fraunces,serif;font-weight:800;font-size:{112 if h>650 else 98}px;line-height:.9;letter-spacing:-.02em;margin-top:14px}}h1 span{{color:{A}}}
p{{font-size:26px;color:#c9d4d8;margin-top:18px;line-height:1.3;width:560px}}
.tags{{position:absolute;right:64px;top:{150 if h>650 else 54}px;width:410px;display:flex;flex-direction:column;gap:{34 if h>650 else 12}px}}
.tag{{position:relative;display:flex;align-items:center;gap:16px;background:{A};color:#1b1400;border-radius:12px 40px 40px 12px;padding:{16 if h>650 else 12}px 26px 16px 22px;box-shadow:0 18px 30px rgb(0 0 0/.35)}}
.hole{{width:16px;height:16px;border-radius:50%;background:#15191c;flex:none}}.tag small{{display:block;font-size:17px;font-weight:700}}.tag b{{display:block;font-size:{38 if h>650 else 32}px;font-weight:800;line-height:1}}
.kb{{position:absolute;left:0;right:0;bottom:0;opacity:.95}}.b{{position:absolute;left:70px;bottom:{176 if h>650 else 168}px;font-weight:800;font-size:16px;letter-spacing:.18em;color:#7fa9b6}}
</style></head><body><div class="t"><div class="e">TESTED PICKS · 2026</div><h1>Black Friday<br><span>Piano Deals</span></h1><p>6 digital pianos worth buying, and the price to buy each one at.</p></div>
<div class="tags">{tg}</div><div class="b">PIANOERS.COM</div>
<div class="kb"><svg viewBox="0 0 {kw} 150" style="width:100%;display:block">{kbs}</svg></div></body></html>'''
imgs['black-friday-piano-deals-featured']=(800,hero(800))
imgs['black-friday-piano-deals-social']=(630,hero(630))
json.dump(imgs,open('imgs.json','w'))
