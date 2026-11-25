import json
from page import page
from kb import keyboard, white_seq
imgs={}
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5'

sc=[('Key action','30%',6.0,'Weighted hammer action, but light and springy'),('Piano sound','25%',5.5,'Clear enough, but flat next to Yamaha or Roland'),('Value','15%',9.0,'88 weighted keys and a pedal for about $350'),('Speakers','10%',6.5,'2 × 10 W: loud enough, a bit boxy'),('Features','10%',7.5,'25 sounds, Lesson mode, USB audio, no Bluetooth'),('Portability','10%',9.0,'23.2 lb (10.5 kg) and runs on 6 AA batteries')]
rows=''.join(f'<div style="display:grid;grid-template-columns:200px 60px 1fr 70px;gap:14px;align-items:center;padding:11px 0;border-top:1px solid {LINE}"><div><div style="font-size:20px;font-weight:800">{n}</div><div style="font-size:14px;color:{MU}">{d}</div></div><div style="font-size:15px;color:{MU};font-weight:700">{w}</div><div style="height:18px;border-radius:99px;background:#e9eef0;overflow:hidden"><div style="height:100%;width:{v*10}%;background:{A if v>=8.5 else T};border-radius:99px"></div></div><div style="font-size:24px;font-weight:800;text-align:right">{v}</div></div>' for n,w,v,d in sc)
tot=sum(v*float(w[:-1])/100 for _,w,v,_ in sc)
OV=f'{tot/2:.1f}'
body=f'''<div style="display:grid;grid-template-columns:270px 1fr;gap:20px"><div class="card" style="padding:26px;text-align:center;background:{INK};color:#fff;border:0;display:flex;flex-direction:column;justify-content:center"><div style="font-size:16px;letter-spacing:.12em;font-weight:800;color:{A}">OVERALL</div><div style="font-size:96px;font-weight:800;line-height:1">{OV}</div><div style="font-size:22px;color:#c9d4d8">out of 5</div><div style="font-size:30px;color:{A};margin-top:10px;letter-spacing:4px">★★★<span style="opacity:.35">★★</span></div><div style="font-size:16px;color:#c9d4d8;margin-top:12px;line-height:1.4">Fine for occasional players on a tight budget</div><div style="font-size:15px;color:#9fb0b6;margin-top:6px">Weighted score {tot:.1f} / 10</div></div>
<div class="card" style="padding:8px 22px 6px"><div style="display:grid;grid-template-columns:200px 60px 1fr 70px;gap:14px;font-size:13px;font-weight:800;color:{MU};letter-spacing:.08em;padding:8px 0">AREA<span>WEIGHT</span><span></span><span style="text-align:right">/10</span></div>{rows}</div></div>
<div style="margin-top:14px;font-size:16px;color:{MU}">Key action and sound count most, because they matter most when you learn. That is where this piano loses points.</div>'''
imgs['alesis-recital-pro-mkii-review-score']=(830,page(830,'Verdict','Alesis Recital Pro MKII review score',body,'Scores by Pianoers, after two months of use'))

specs=[('Keys','88, hammer action','Full size, weighted'),('Touch','5 settings + off','Soft 1 to Hard 2'),('Sounds','25','Pianos, organs, synths, guitars, bass'),('Polyphony','64 notes','Enough for beginner music'),('Speakers','2 × 10 W','20 W in total'),('Modes','Layer, Split, Lesson','Lesson = two identical halves'),('Metronome','5 to 320 bpm','With tap tempo'),('USB','MIDI + audio','Standard USB-B port'),('Headphones','1 jack, 1/8-inch','On the front, mutes the speakers'),('Inputs/outputs','1/8-inch aux in','1/4-inch stereo out'),('In the box','Pedal, music rest, adapter','Pedal is a small footswitch'),('Power and weight','Adapter or 6 AA','23.2 lb (10.5 kg)')]
cells=''.join(f'<div class="card" style="padding:14px 16px"><div style="font-size:13px;font-weight:800;letter-spacing:.1em;color:{T}">{a.upper()}</div><div style="font-size:21px;font-weight:800;margin-top:3px;line-height:1.2">{b}</div><div style="font-size:15px;color:{MU};margin-top:3px">{c}</div></div>' for a,b,c in specs)
body=f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">{cells}</div><div style="margin-top:14px;font-size:16px;color:{MU}">No Bluetooth. Size with music rest: 50.5 × 12.2 × 10.2 in (128.2 × 31.0 × 26.0 cm).</div>'
imgs['alesis-recital-pro-mkii-specs']=(650,page(650,'Specs','Alesis Recital Pro MKII at a glance',body,'Specifications from alesis.com, November 2026'))

cols=['Recital Pro MKII','Original Recital Pro','Yamaha P-145BT']
rows=[('Price (US)','about $350','about $300','$499.99 list'),('Key action','Hammer action','Hammer action','GHC graded hammer'),('Polyphony','64','128','64'),('Sounds','25','12','10'),('Speakers','2 × 10 W','20 W','2 × 7 W'),('Bluetooth','No','No','Audio'),('USB','MIDI + audio','MIDI','MIDI + audio'),('Pedal in the box','Yes (footswitch)','No','Yes (footswitch)'),('Battery power','6 AA','6 D','No'),('Weight','23.2 lb','26 lb','24.5 lb')]
win={('Price (US)',1),('Polyphony',1),('Sounds',0),('Speakers',0),('Speakers',1),('Bluetooth',2),('USB',0),('USB',2),('Pedal in the box',0),('Pedal in the box',2),('Battery power',0),('Battery power',1),('Weight',0),('Key action',2)}
th=''.join(f'<th style="text-align:left;padding:12px 14px;font-size:19px;{"background:#2e6475" if i==0 else ""}">{c}</th>' for i,c in enumerate(cols))
tr=''
for r in rows:
    tds=''.join(f'<td style="padding:10px 14px;font-size:17px;{"background:#eaf5ef;font-weight:700" if (r[0],i) in win else ""};{"border-left:3px solid #2e6475" if i==0 else ""}">{v}</td>' for i,v in enumerate(r[1:]))
    tr+=f'<tr style="border-top:1px solid {LINE}"><td style="padding:10px 14px;font-size:17px;font-weight:800">{r[0]}</td>{tds}</tr>'
body=f'<div class="card" style="overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr style="background:{INK};color:#fff"><th style="text-align:left;padding:12px 14px;font-size:15px">Spec</th>{th}</tr></thead><tbody>{tr}</tbody></table></div><div style="margin-top:12px;font-size:15px;color:{MU}">Green = better on that line. Alesis specs from alesis.com and retailer listings; P-145BT from the Pianoers P-145 review. Prices November 2026.</div>'
imgs['alesis-recital-pro-mkii-vs-recital-pro-vs-yamaha-p-145bt']=(800,page(800,'Compared','Recital Pro MKII vs Recital Pro vs P-145BT',body))

buy=['You play now and then, not every day','Your budget stops at about $350','You want 88 weighted keys, not a 61-key keyboard','You mostly play chords, pop songs or with an app','You want to try piano before spending more']
skip=['Piano sound really matters to you','You plan to practice every day for years','You play classical pieces with lots of dynamics','You want Bluetooth for apps or music','You can stretch to about $500 (get the P-145BT)']
def col(t,items,c,bg,mark):
    li=''.join(f'<div style="display:flex;gap:12px;padding:10px 0;border-top:1px solid {LINE}"><span style="flex:none;width:28px;height:28px;border-radius:50%;background:{c};color:#fff;display:grid;place-items:center;font-weight:800">{mark}</span><span style="font-size:18.5px;line-height:1.4">{x}</span></div>' for x in items)
    return f'<div class="card" style="padding:20px 22px;background:{bg}"><div style="font-size:26px;font-weight:800;color:{c};margin-bottom:6px">{t}</div>{li}</div>'
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">{col("Buy the Recital Pro MKII if…",buy,"#1f7a4d","#f2faf5","✓")}{col("Skip it if…",skip,"#b0442d","#fdf3f0","✕")}</div>'
imgs['alesis-recital-pro-mkii-who-should-buy']=(660,page(660,'Is it for you?','Who should buy the Alesis Recital Pro MKII?',body))

acc=[('Sustain pedal','Piano-style pedal','The included pedal is a small square footswitch that slides around. A piano-shaped pedal such as the Alesis ASP-2 feels far more natural.','Upgrade first'),
('Stand','X-style keyboard stand','No stand in the box. Alesis says any standard X-type stand works, no screws needed.','Needed'),
('Bench','Adjustable bench','Forearms level with the keys. A kitchen chair is usually too low.','Needed'),
('Headphones','Any wired pair','The front jack is 1/8-inch. Use plain headphones: ones with a mic and buttons can sound wrong.','Useful')]
cards=''.join(f'<div class="card" style="padding:16px 18px;display:flex;flex-direction:column;gap:6px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:13px;font-weight:800;letter-spacing:.1em;color:{T}">{a.upper()}</span><span style="font-size:13px;font-weight:800;padding:3px 9px;border-radius:99px;white-space:nowrap;background:{"#fff3d1" if tag in ("Upgrade first","Needed") else "#e2eef1"};color:{"#8a5a00" if tag in ("Upgrade first","Needed") else T}">{tag}</span></div><div style="font-size:21px;font-weight:800">{b}</div><div style="font-size:16px;font-family:Lora,serif;color:#33424a;line-height:1.4">{c}</div></div>' for a,b,c,tag in acc)
body=f'<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px">{cards}</div><div class="card" style="margin-top:16px;padding:14px 20px;font-size:17px">The box includes the piano, a music rest, the power adapter and the footswitch pedal.</div>'
imgs['alesis-recital-pro-mkii-accessories']=(590,page(590,'Complete the setup','What to buy with the Recital Pro MKII',body))

ws=white_seq('A0','C8')
kbsvg,kw=keyboard(ws,x=0,y=0,ww=10,wh=62,stroke='#b9c4c8')
piano=f'''<svg viewBox="-24 -64 {kw+48} 160" style="width:100%;display:block">
<rect x="-24" y="-64" width="{kw+48}" height="148" rx="14" fill="#1d2327"/>
<rect x="-24" y="-64" width="{kw+48}" height="6" rx="3" fill="#2c353a"/>
<rect x="40" y="-46" width="150" height="26" rx="5" fill="#11161a"/><g fill="#3a464c">{''.join(f'<rect x="{210+i*26}" y="-42" width="18" height="18" rx="4"/>' for i in range(5))}</g>
<rect x="{kw-170}" y="-46" width="130" height="26" rx="5" fill="#11161a"/><circle cx="{kw-105}" cy="-33" r="3" fill="{A}"/>
<g>{kbsvg}</g><rect x="-24" y="62" width="{kw+48}" height="22" rx="8" fill="#1d2327"/></svg>'''
def hero(h):
    return f'''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:wght@500&display=swap" rel="stylesheet">
<style>*{{box-sizing:border-box;margin:0}}body{{width:1200px;height:{h}px;overflow:hidden;font-family:"Schibsted Grotesk",Arial,sans-serif;background:radial-gradient(1100px 520px at 80% 115%,#2e6475 0%,#15191c 62%);color:#fff;position:relative}}
.t{{position:absolute;left:64px;top:56px;width:1072px}}.e{{font-size:20px;letter-spacing:.16em;color:{A};font-weight:700}}
h1{{font-size:70px;line-height:1.02;font-weight:800;letter-spacing:-.02em;margin:14px 0 14px}}p{{font-family:Lora,serif;font-size:25px;color:#c9d4d8;line-height:1.35;width:1000px}}
.badge{{position:absolute;right:64px;top:64px;display:flex;align-items:center;gap:14px;background:#fff;color:#15191c;border-radius:16px;padding:12px 18px}}.badge b{{font-size:44px}}.badge span{{font-size:17px;font-weight:700;line-height:1.25}}.st{{color:{A};font-size:22px;letter-spacing:2px}}
.p{{position:absolute;left:150px;right:150px;bottom:{70 if h>650 else 58}px;filter:drop-shadow(0 26px 40px rgb(0 0 0/55%))}}
.b{{position:absolute;left:64px;bottom:22px;font-size:17px;letter-spacing:.14em;font-weight:700;color:#7fa9b6}}</style></head><body>
<div class="t"><div class="e">HANDS-ON REVIEW · 2 MONTHS OF USE</div><h1>Alesis Recital Pro MKII<br>Review</h1><p>88 weighted keys for about $350. Who it suits, and who should skip it.</p></div>
<div class="badge"><b>{OV}</b><span><span class="st">★★★</span><br>Budget pick for<br>occasional players</span></div>
<div class="p">{piano}</div><div class="b">PIANOERS.COM</div></body></html>'''
imgs['alesis-recital-pro-mkii-review-featured']=(675,hero(675))
imgs['alesis-recital-pro-mkii-review-social']=(630,hero(630))
print('overall',tot,OV)
json.dump(imgs,open('imgs.json','w'))
