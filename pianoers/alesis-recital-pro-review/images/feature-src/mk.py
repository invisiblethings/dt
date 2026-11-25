import json
P='file:///home/user/dt/pianoers/alesis-recital-pro-review/images/piano-cutout.png'
K='file:///tmp/claude-0/-home-user-dt/264ebcbd-ccda-5595-866c-f65d1d0f3d43/images/38.webp'
F='<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Schibsted+Grotesk:wght@500;700;800&family=Caveat+Brush&display=swap" rel="stylesheet">'
H=800
A=f'''<!doctype html><html><head><meta charset="utf-8">{F}<style>*{{margin:0;box-sizing:border-box}}
body{{width:1200px;height:{H}px;overflow:hidden;position:relative;background:#f4efe6;font-family:"Schibsted Grotesk",sans-serif;color:#15191c}}
body:before{{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 3px,rgb(0 0 0/.012) 3px 4px)}}
.tag{{position:absolute;left:72px;top:70px;font-weight:800;font-size:19px;letter-spacing:.18em;color:#2e6475}}
h1{{position:absolute;left:68px;top:104px;font-family:Fraunces,serif;font-weight:800;font-size:112px;line-height:.92;letter-spacing:-.02em}}
h1 em{{font-style:normal;color:#2e6475}}
.ph{{position:absolute;left:40px;right:-120px;bottom:40px}}.ph img{{width:100%;display:block;filter:drop-shadow(0 30px 30px rgb(60 40 10/.28))}}
.stamp{{position:absolute;right:70px;top:86px;width:270px;height:270px;border-radius:50%;border:5px solid #c8501e;color:#c8501e;transform:rotate(9deg);display:grid;place-items:center;text-align:center;font-family:"Caveat Brush",cursive;font-size:46px;line-height:.95;background:rgb(244 239 230/.85)}}
.stamp small{{display:block;font-family:"Schibsted Grotesk";font-size:16px;font-weight:800;letter-spacing:.16em;margin-top:8px}}
.b{{position:absolute;left:72px;bottom:26px;font-weight:800;font-size:16px;letter-spacing:.18em;color:#2e6475}}</style></head><body>
<div class="tag">HANDS-ON REVIEW · 2 MONTHS LATER</div><h1>Alesis Recital<br>Pro <em>MKII</em></h1>
<div class="stamp"><div>Not great.<br>Good enough.<small>FOR ABOUT $350</small></div></div>
<div class="ph"><img src="{P}"></div><div class="b">PIANOERS.COM</div></body></html>'''
B=f'''<!doctype html><html><head><meta charset="utf-8">{F}<style>*{{margin:0;box-sizing:border-box}}
body{{width:1200px;height:{H}px;overflow:hidden;position:relative;background:linear-gradient(150deg,#2e6475 0%,#1c3f4a 55%,#122a32 100%);font-family:"Schibsted Grotesk",sans-serif;color:#fff}}
.big{{position:absolute;right:56px;top:70px;font-weight:800;font-size:205px;line-height:1;letter-spacing:-.04em;color:transparent;-webkit-text-stroke:3px rgb(246 179 30/.8)}}.big small{{display:block;font-size:22px;letter-spacing:.2em;-webkit-text-stroke:0;color:#f6b31e;text-align:right;margin-top:-6px}}
.t{{position:absolute;left:70px;top:78px}}
.e{{font-weight:800;font-size:20px;letter-spacing:.18em;color:#f6b31e}}
h1{{font-weight:800;font-size:78px;line-height:.95;letter-spacing:-.025em;margin-top:14px}}
p{{font-size:30px;font-weight:500;color:#cfe0e5;margin-top:18px}}
.ph{{position:absolute;left:-40px;right:-80px;bottom:-30px;transform:rotate(-5deg)}}.ph img{{width:100%;display:block;filter:drop-shadow(0 40px 40px rgb(0 0 0/.45))}}
.b{{position:absolute;right:60px;bottom:24px;font-weight:800;font-size:16px;letter-spacing:.18em;color:#9fc3cd}}</style></head><body>
<div class="big">$350<small>AND HONESTLY? ENOUGH.</small></div><div class="t"><div class="e">REVIEW · 2 MONTHS OF USE</div><h1>Alesis Recital<br>Pro MKII</h1><p>88 weighted keys. One honest verdict.</p></div>
<div class="ph"><img src="{P}"></div><div class="b">PIANOERS.COM</div></body></html>'''
C=f'''<!doctype html><html><head><meta charset="utf-8">{F}<style>*{{margin:0;box-sizing:border-box}}
body{{width:1200px;height:{H}px;overflow:hidden;position:relative;background:#0f1214;font-family:"Schibsted Grotesk",sans-serif;color:#fff}}
.bg{{position:absolute;right:0;top:0;width:760px;height:100%;background:url({K}) 60% 70%/cover;filter:brightness(.82) contrast(1.08)}}
.bg:after{{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0f1214 0%,rgb(15 18 20/.7) 28%,transparent 60%)}}
.t{{position:absolute;left:70px;top:0;bottom:0;width:600px;display:flex;flex-direction:column;justify-content:center}}
.e{{font-weight:800;font-size:19px;letter-spacing:.18em;color:#f6b31e}}
h1{{font-family:Fraunces,serif;font-weight:800;font-size:96px;line-height:.95;margin:16px 0 26px;letter-spacing:-.015em}}
.v{{display:flex;flex-direction:column;gap:10px;font-size:30px;font-weight:700}}
.v span{{display:flex;align-items:center;gap:14px}}.v i{{font-style:normal;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:22px}}
.no i{{background:#b0442d}}.ok i{{background:#1f7a4d}}
.b{{position:absolute;left:70px;bottom:28px;font-weight:800;font-size:16px;letter-spacing:.18em;color:#7fa9b6}}</style></head><body>
<div class="bg"></div><div class="t"><div class="e">ALESIS · HANDS-ON REVIEW</div><h1>Recital Pro MKII</h1>
<div class="v"><span class="no"><i>✕</i>Not a great piano</span><span class="ok"><i>✓</i>A very fair $350</span></div></div><div class="b">PIANOERS.COM</div></body></html>'''
json.dump({'option-a-stamp':(H,A),'option-b-price':(H,B),'option-c-closeup':(H,C)},open('opts.json','w'))
