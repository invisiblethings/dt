import json
P='file:///home/user/dt/pianoers/alesis-recital-pro-review/images/piano-cutout.png'
F='<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Schibsted+Grotesk:wght@500;700;800&family=Caveat+Brush&display=swap" rel="stylesheet">'
BASE='''*{margin:0;box-sizing:border-box}
body{overflow:hidden;position:relative;background:#f4efe6;font-family:"Schibsted Grotesk",sans-serif;color:#15191c}
body:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 3px,rgb(0 0 0/.012) 3px 4px)}
.tag{position:absolute;font-weight:800;letter-spacing:.18em;color:#2e6475}
h1{position:absolute;font-family:Fraunces,serif;font-weight:800;line-height:.92;letter-spacing:-.02em}
h1 em{font-style:normal;color:#2e6475}
.stamp{position:absolute;border-radius:50%;border:5px solid #c8501e;color:#c8501e;transform:rotate(9deg);display:grid;place-items:center;text-align:center;font-family:"Caveat Brush",cursive;line-height:.95;background:rgb(244 239 230/.88)}
.stamp small{display:block;font-family:"Schibsted Grotesk";font-weight:800;letter-spacing:.16em;margin-top:8px}
.ph{position:absolute}.ph img{width:100%;display:block;filter:drop-shadow(0 30px 30px rgb(60 40 10/.28))}
.cols{position:absolute;display:grid;grid-template-columns:1fr 1fr}
.col{background:#fff;border-radius:22px;box-shadow:0 1px 2px rgb(0 0 0/.05),0 10px 30px rgb(60 40 10/.08)}
.col h3{font-weight:800;letter-spacing:.12em}
.ok h3{color:#1f7a4d}.no h3{color:#b0442d}
.col ul{padding:0}.col li{list-style:none;display:flex;gap:12px;align-items:flex-start;font-weight:700;line-height:1.25}
.col li i{flex:none;border-radius:50%;color:#fff;display:grid;place-items:center;font-style:normal;font-weight:800}
.ok li i{background:#1f7a4d}.no li i{background:#b0442d}
.foot{position:absolute;display:flex;justify-content:space-between;align-items:center;font-weight:800;letter-spacing:.16em;color:#2e6475}
.foot span{letter-spacing:0;font-weight:700;color:#15191c}'''
ok=['You play now and then','Your budget stops at ~$350','You want 88 weighted keys']
no=['You practice every day','Piano sound matters to you','You can stretch to ~$500']
def lst(items,m): return ''.join(f'<li><i>{m}</i>{x}</li>' for x in items)
fb=f'''<!doctype html><html><head><meta charset="utf-8">{F}<style>{BASE}
body{{width:1080px;height:1350px}}
.tag{{left:70px;top:72px;font-size:20px}}
h1{{left:66px;top:112px;font-size:122px}}
.stamp{{right:58px;top:300px;width:270px;height:270px;font-size:48px}}.stamp small{{font-size:16px}}
.ph{{left:30px;right:-260px;top:520px}}
.cols{{left:60px;right:60px;top:965px;gap:22px}}
.col{{padding:30px 28px 30px}}.col h3{{font-size:20px;margin-bottom:20px}}.col ul{{display:flex;flex-direction:column;gap:18px}}
.col li{{font-size:27px}}.col li i{{width:34px;height:34px;font-size:19px;margin-top:-1px}}
.foot{{left:70px;right:70px;bottom:52px;font-size:19px}}.foot span{{font-size:22px}}
</style></head><body>
<div class="tag">HANDS-ON REVIEW · 2 MONTHS LATER</div>
<h1>Alesis<br>Recital Pro<br><em>MKII</em></h1>
<div class="stamp"><div>Not great.<br>Good enough.<small>FOR ABOUT $350</small></div></div>
<div class="ph"><img src="{P}"></div>
<div class="cols"><div class="col ok"><h3>WORTH IT IF</h3><ul>{lst(ok,'✓')}</ul></div><div class="col no"><h3>SKIP IT IF</h3><ul>{lst(no,'✕')}</ul></div></div>
<div class="foot">PIANOERS.COM<span>Full review: link in the post ↓</span></div>
</body></html>'''
x=f'''<!doctype html><html><head><meta charset="utf-8">{F}<style>{BASE}
body{{width:1600px;height:900px}}
.tag{{left:90px;top:80px;font-size:22px}}
h1{{left:86px;top:122px;font-size:128px}}
.stamp{{right:96px;top:70px;width:300px;height:300px;font-size:54px}}.stamp small{{font-size:18px}}
.ph{{left:30px;width:1000px;top:440px}}
.cols{{right:80px;top:430px;width:470px;grid-template-columns:1fr;gap:18px}}
.col{{padding:22px 26px}}.col h3{{font-size:18px;margin-bottom:12px}}.col ul{{display:flex;flex-direction:column;gap:10px}}
.col li{{font-size:24px}}.col li i{{width:30px;height:30px;font-size:17px}}
.foot{{left:90px;right:90px;bottom:40px;font-size:20px}}.foot span{{font-size:22px}}
</style></head><body>
<div class="tag">HANDS-ON REVIEW · 2 MONTHS LATER</div>
<h1>Alesis Recital<br>Pro <em>MKII</em></h1>
<div class="stamp"><div>Not great.<br>Good enough.<small>FOR ABOUT $350</small></div></div>
<div class="ph"><img src="{P}"></div>
<div class="cols"><div class="col ok"><h3>WORTH IT IF</h3><ul>{lst(ok,'✓')}</ul></div><div class="col no"><h3>SKIP IT IF</h3><ul>{lst(no,'✕')}</ul></div></div>
<div class="foot">PIANOERS.COM<span>pianoers.com/alesis-recital-pro-review</span></div>
</body></html>'''
json.dump([{'name':'alesis-recital-pro-mkii-facebook-post','w':1080,'h':1350,'scale':2,'html':fb},{'name':'alesis-recital-pro-mkii-x-post','w':1600,'h':900,'scale':1.5,'html':x}],open('jobs.json','w'))
