import json
from page import page
from kb import keyboard, white_seq
imgs={}
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
W=white_seq('C2','B5')
fill={n:('#cfe3ea' if i<len(W)//2 else '#fff3d1') for i,n in enumerate(W)}
sv,w=keyboard(W,0,0,38,150,23,94,fill,{},None,None,13,10)
half=w/2
body=f'''<div class="card" style="padding:24px 22px"><svg viewBox="-2 -40 {w+4} 200" width="100%"><rect x="0" y="-36" width="{half-4}" height="28" rx="8" fill="{T}"/><text x="{half/2}" y="-16" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">PLAYER 1 · left half</text><rect x="{half+4}" y="-36" width="{half-4}" height="28" rx="8" fill="{A}"/><text x="{half*1.5}" y="-16" text-anchor="middle" font-size="16" font-weight="800" fill="#1b1400">PLAYER 2 · right half, same pitch range</text>{sv}<line x1="{half}" y1="-40" x2="{half}" y2="160" stroke="{INK}" stroke-width="4" stroke-dasharray="8 6"/></svg></div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px">
<div class="card" style="padding:16px 18px"><div style="font-size:20px;font-weight:800">Two pianos in one</div><div style="font-size:16.5px;font-family:Lora,serif;color:#33424a;margin-top:4px;line-height:1.4">The keyboard splits into two halves that play in the same octave range.</div></div>
<div class="card" style="padding:16px 18px"><div style="font-size:20px;font-weight:800">Side by side</div><div style="font-size:16.5px;font-family:Lora,serif;color:#33424a;margin-top:4px;line-height:1.4">A teacher or parent plays the same passage next to the learner.</div></div>
<div class="card" style="padding:16px 18px"><div style="font-size:20px;font-weight:800">Great for duets</div><div style="font-size:16.5px;font-family:Lora,serif;color:#33424a;margin-top:4px;line-height:1.4">Siblings can practise the same piece together.</div></div></div>'''
imgs['roland-fp-10-twin-piano-mode']=(640,page(640,'Lessons','Twin Piano mode, explained',body,'Illustration; the exact split point is set by the FP-10'))
buy=['You want the best key feel you can get for about $500','You practise mostly with headphones','You learn with apps on a phone or tablet (Bluetooth MIDI)','You want something light enough to move or store','You may move to an acoustic piano later']
skip=['You want to stream music through the piano (no Bluetooth audio)','You need a big, room-filling sound from the speakers','You want lots of sounds and rhythms built in','You want three pedals on a matching stand','You prefer lighter, quieter keys (look at the Yamaha P-145)']
def col(t,items,c,bg,mark):
    li=''.join(f'<div style="display:flex;gap:12px;padding:10px 0;border-top:1px solid {LINE}"><span style="flex:none;width:28px;height:28px;border-radius:50%;background:{c};color:#fff;display:grid;place-items:center;font-weight:800">{mark}</span><span style="font-size:18.5px;line-height:1.4">{x}</span></div>' for x in items)
    return f'<div class="card" style="padding:20px 22px;background:{bg}"><div style="font-size:26px;font-weight:800;color:{c};margin-bottom:6px">{t}</div>{li}</div>'
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">{col("Buy the FP-10 if…",buy,"#1f7a4d","#f2faf5","✓")}{col("Skip it if…",skip,"#b0442d","#fdf3f0","✕")}</div>'
imgs['roland-fp-10-who-should-buy']=(660,page(660,'Is it for you?','Who should buy the Roland FP-10?',body))
acc=[('Sustain pedal','Roland DP-10','The included pedal switch is on/off only. The DP-10 looks like a real piano pedal and allows half-pedalling.','Upgrade first'),
('Stand','KSCFP10 or KS-13','The dedicated KSCFP10 gives a furniture look; the KS-13 is a simple keyboard stand.','Needed'),
('Headphones','Any closed-back pair','The FP-10 has a 3.5 mm mini jack. Studio headphones with a 6.3 mm plug need an adapter.','Useful'),
('Bench','Adjustable piano bench','Height matters more than looks: forearms level with the keys.','Needed'),
('Carrying bag','Roland CB-88RL','Only if you will carry the piano around.','Optional')]
cards=''.join(f'<div class="card" style="padding:16px 18px;display:flex;flex-direction:column;gap:6px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:13px;font-weight:800;letter-spacing:.1em;color:{T}">{a.upper()}</span><span style="font-size:13px;font-weight:800;padding:3px 9px;border-radius:99px;background:{"#fff3d1" if tag in ("Upgrade first","Needed") else "#e2eef1"};color:{"#8a5a00" if tag in ("Upgrade first","Needed") else T}">{tag}</span></div><div style="font-size:21px;font-weight:800">{b}</div><div style="font-size:16px;font-family:Lora,serif;color:#33424a;line-height:1.4">{c}</div></div>' for a,b,c,tag in acc)
body=f'<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px">{cards}</div><div class="card" style="margin-top:16px;padding:14px 20px;font-size:17px">Accessory names from Roland\'s FP-10 options list. Weight on the KSCFP10 stand with music rest: 20.0 kg (44 lb 2 oz).</div>'
imgs['roland-fp-10-accessories']=(600,page(600,'Complete the setup','What to buy with the Roland FP-10',body))
def hero(h):
    return f'''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:wght@500&display=swap" rel="stylesheet">
<style>*{{box-sizing:border-box;margin:0}}body{{width:1200px;height:{h}px;overflow:hidden;font-family:"Schibsted Grotesk",Arial,sans-serif;background:#15191c;color:#fff;position:relative}}
.ph{{position:absolute;right:-60px;top:50%;transform:translateY(-50%);width:640px;border-radius:24px;overflow:hidden;box-shadow:0 30px 60px rgb(0 0 0/45%)}}.ph img{{width:100%;display:block}}
.t{{position:absolute;left:64px;top:50%;transform:translateY(-50%);width:530px}}.e{{font-size:20px;letter-spacing:.16em;color:{A};font-weight:700}}
h1{{font-size:74px;line-height:1;white-space:nowrap;font-weight:800;letter-spacing:-.02em;margin:14px 0 18px}}p{{font-family:Lora,serif;font-size:26px;color:#c9d4d8;line-height:1.35}}
.badge{{display:inline-flex;align-items:center;gap:14px;margin-top:26px;background:#fff;color:#15191c;border-radius:16px;padding:12px 18px}}.badge b{{font-size:40px}}.badge span{{font-size:17px;font-weight:700;line-height:1.2}}.st{{color:{A};font-size:22px;letter-spacing:2px}}
.b{{position:absolute;left:64px;bottom:30px;font-size:17px;letter-spacing:.14em;font-weight:700;color:#7fa9b6}}</style></head><body>
<div class="ph"><img src="file:///home/user/dt/pianoers/roland-fp-10-review/images/roland-fp-10-being-played.webp"></div>
<div class="t"><div class="e">HANDS-ON REVIEW · 2026</div><h1>Roland FP-10<br>Review</h1><p>Real piano keys for about $500. Who it's for, and who should skip it.</p>
<div class="badge"><b>4.3</b><span><span class="st">★★★★</span><br>Best key feel under $500</span></div></div><div class="b">PIANOERS.COM</div></body></html>'''
imgs['roland-fp-10-review-featured']=(675,hero(675))
imgs['roland-fp-10-review-social']=(630,hero(630))
json.dump(imgs,open('imgs2.json','w'))
