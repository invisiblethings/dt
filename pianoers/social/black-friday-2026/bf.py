import json
D='file:///home/user/dt/pianoers/social/black-friday-2026/src/'
deals=[('Roland FP-10','24','Best key feel','Roland-FP10-Reviewed.jpg'),('Alesis Recital Pro MKII','19','Cheapest pick','Alesis-Recital-Pro-MKII-Reviewed.jpg'),('Casio PX-S1100','18','Slimmest','Casio-Privia-PX-S1100-Reviewed.jpg'),('Yamaha P-225','16','Best Yamaha under $1,000','Yamaha-P-225.jpg')]
F='<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">'
CSS='''*{margin:0;box-sizing:border-box}body{overflow:hidden;position:relative;font-family:"Schibsted Grotesk",sans-serif;color:#fff;background:radial-gradient(900px 600px at 95% -10%,#5a3212 0%,#1d1611 45%,#121416 100%)}
.flag{display:inline-flex;align-items:center;gap:10px;padding:8px 16px;border-radius:999px;background:#d4583b;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.flag i{width:10px;height:10px;border-radius:50%;background:#fff}
h1{font-weight:800;line-height:.95;letter-spacing:-.025em}h1 span{color:#f6b31e}
.sub{color:#d8cfc4;font-weight:500}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}
.t{position:relative;background:#fff;color:#15191c;border-radius:20px;box-shadow:0 18px 36px rgb(0 0 0/.4);display:flex;flex-direction:column}
.im{display:block;overflow:hidden;aspect-ratio:6/5;border-radius:14px;background:#fffbf2}.im img{width:100%;height:100%;object-fit:cover;display:block}
.off{position:absolute;z-index:2;border-radius:12px;background:#d4583b;color:#fff;font-weight:800;line-height:1;box-shadow:0 6px 16px rgb(212 88 59/.45)}
.n{font-weight:800;line-height:1.1}.w{color:#56666e;font-weight:600}
.foot{position:absolute;display:flex;justify-content:space-between;align-items:center;font-weight:800}
.url{color:#f6b31e}.brand{letter-spacing:.18em;color:#b9a99a}
.cta{display:inline-flex;align-items:center;gap:10px;background:#f6b31e;color:#1b1400;border-radius:999px;font-weight:800}'''
def tiles(sz):
    return ''.join(f'<div class="t" style="padding:{sz[0]}px"><span class="off" style="top:{sz[0]-6}px;left:{sz[0]-6}px;font-size:{sz[1]}px;padding:{sz[2]}px {sz[2]+4}px">-{o}%</span><span class="im"><img src="{D}crop-{f}"></span><div class="n" style="font-size:{sz[3]}px;margin-top:{sz[0]-2}px">{n}</div><div class="w" style="font-size:{sz[4]}px;margin-top:4px">{w}</div></div>' for n,o,w,f in deals)
fb=f'''<!doctype html><html><head><meta charset="utf-8">{F}<style>{CSS}
body{{width:1080px;height:1350px}}.grid .im{{aspect-ratio:16/10}}.top{{position:absolute;left:64px;right:64px;top:62px}}.flag{{font-size:19px}}
h1{{font-size:92px;margin-top:18px}}.sub{{font-size:28px;margin-top:16px;line-height:1.3}}
.grid{{position:absolute;left:64px;right:64px;top:410px;gap:18px}}
.foot{{left:64px;right:64px;bottom:58px}}.cta{{font-size:28px;padding:16px 28px}}.brand{{font-size:20px}}</style></head><body>
<div class="top"><span class="flag"><i></i>Black Friday · ends Cyber Monday</span><h1>Piano deals<br><span>up to 24% off</span></h1><p class="sub">The digital pianos a piano teacher actually recommends.</p></div>
<div class="grid">{tiles((14,28,8,28,19))}</div>
<div class="foot"><span class="brand">PIANOERS.COM</span><span class="cta">See all the deals →</span></div></body></html>'''
x=f'''<!doctype html><html><head><meta charset="utf-8">{F}<style>{CSS}
body{{width:1600px;height:900px}}.top{{position:absolute;left:80px;top:84px;width:640px}}.flag{{font-size:18px}}
h1{{font-size:104px;margin-top:24px}}.sub{{font-size:28px;margin-top:22px;line-height:1.3}}
.grid{{position:absolute;right:72px;top:64px;width:770px;gap:18px}}
.foot{{left:80px;bottom:70px;gap:26px}}.cta{{font-size:26px;padding:15px 26px}}.brand{{font-size:19px}}</style></head><body>
<div class="top"><span class="flag"><i></i>Black Friday · ends Cyber Monday</span><h1>Piano deals<br><span>up to<br>24% off</span></h1><p class="sub">Picked by a piano teacher. 88 weighted keys only.</p></div>
<div class="grid">{tiles((12,24,7,24,17))}</div>
<div class="foot"><span class="cta">pianoers.com/black-friday-piano-deals</span></div></body></html>'''
json.dump([{'name':'pianoers-black-friday-facebook','w':1080,'h':1350,'scale':2,'html':fb},{'name':'pianoers-black-friday-x','w':1600,'h':900,'scale':1.5,'html':x}],open('jobs.json','w'))
