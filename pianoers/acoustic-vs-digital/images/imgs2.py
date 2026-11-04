import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
types=[('Keyboard','61 unweighted keys and many sounds. Fine for a first try, not for technique.','$',T),
('Portable digital','88 weighted keys, speakers and headphones. The usual beginner choice.','$$',T),
('Console digital','A furniture cabinet, three pedals, better speakers and keys.','$$–$$$',T),
('Hybrid','A real wooden piano action, with digital sound. No strings.','$$$$','#5b4a8a'),
('Silent acoustic','A real piano with a mute and a headphone system built in.','$$$$','#5b4a8a'),
('Upright','Strings in a tall frame against the wall.','$$$–$$$$','#b86a0a'),
('Grand','Horizontal strings and the finest action. The concert standard.','$$$$$','#b86a0a')]
cards=''.join(f'<div class="card" style="padding:14px 12px;display:flex;flex-direction:column;gap:6px;border-top:6px solid {c}"><div style="font-size:19px;font-weight:800;line-height:1.15">{n}</div><div style="font-size:15px;font-family:Lora,serif;line-height:1.4;color:#33424a;flex:1">{d}</div><div style="font-size:20px;font-weight:800;color:{c}">{p}</div></div>' for n,d,p,c in types)
body=f'''<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px">{cards}</div>
<div style="margin-top:18px;height:14px;border-radius:99px;background:linear-gradient(90deg,{T},#5b4a8a,#b86a0a)"></div>
<div style="display:flex;justify-content:space-between;margin-top:8px;font-size:17px;font-weight:800"><span style="color:{T}">← Digital: lighter, quieter, cheaper to own</span><span style="color:#b86a0a">Acoustic: real strings, real resonance →</span></div>'''
imgs['types-of-pianos-keyboard-digital-hybrid-acoustic']=(570,page(570,'Every option','From keyboard to grand: all 7 types',body,'$ = under about $300; $$$$$ = grand-piano money'))

def q(t): return f'<div class="card" style="padding:14px 18px;background:{INK};color:#fff;border:0;font-size:20px;font-weight:800">{t}</div>'
def ans(t,s,c): return f'<div class="card" style="padding:12px 16px;border-left:6px solid {c}"><div style="font-size:19px;font-weight:800">{t}</div><div style="font-size:15.5px;color:{MU};margin-top:2px">{s}</div></div>'
def row(qt,yes,no_next=True):
    return f'<div style="display:grid;grid-template-columns:1fr 60px 1fr;gap:12px;align-items:center">{q(qt)}<div style="text-align:center;font-weight:800;color:#1f7a4d;font-size:17px">YES →</div>{yes}</div>'+(f'<div style="width:140px;text-align:center;font-weight:800;color:#b0442d;font-size:16px;margin:4px 0">↓ NO</div>' if no_next else '')
body=row('Will you practise while others sleep, or share walls?',ans('Digital piano','Or a silent acoustic, if the budget allows.',T))
body+=row('Is your budget under about $3,000?',ans('A good digital piano','It beats a cheap acoustic that needs work.',T))
body+=row('Short on space, or can’t keep the humidity steady?',ans('Digital or hybrid','Acoustics need steady humidity and room.',T))
body+=row('Are you serious about classical piano for years?',ans('Acoustic piano','Have a technician inspect any used piano first.','#b86a0a'),False)
body+=f'<div style="display:grid;grid-template-columns:1fr 60px 1fr;gap:12px;align-items:center;margin-top:10px"><div style="text-align:right;font-weight:800;color:#b0442d;font-size:16px">NO →</div><div></div>{ans("Either works","Play both in a store and pick the one you love.","#5b4a8a")}</div>'
body=f'<div style="display:flex;flex-direction:column;gap:6px">{body}</div>'
imgs['acoustic-or-digital-piano-decision-flowchart']=(830,page(830,'Decide in 30 seconds','Should you buy an acoustic or digital piano?',body))

ac=[('Tuning','3 to 4 times in the first year, then at least twice a year'),('Humidity','Keep it steady all year; away from radiators, windows and vents'),('Regulation','Every few years, or when keys feel uneven'),('Voicing','When the tone turns harsh or dull'),('Cleaning','Dust weekly; wipe keys with a barely damp cloth')]
dg=[('Tuning','Never'),('Cleaning','Use a dust cover; wipe keys with a barely damp cloth'),('Updates','Install firmware and app updates now and then'),('Checks','Pedal, power and headphone cables'),('Wear','Keys can get noisier after years of heavy use')]
def col(t,c,items,tag):
    r=''.join(f'<div style="display:grid;grid-template-columns:130px 1fr;gap:12px;padding:12px 0;border-top:1px solid {LINE}"><b style="font-size:18px">{a}</b><span style="font-size:17px;font-family:Lora,serif;line-height:1.4">{b}</span></div>' for a,b in items)
    return f'<div class="card" style="padding:20px 22px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{c}">{tag}</div><div style="font-size:26px;font-weight:800;margin:4px 0 10px">{t}</div>{r}</div>'
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">{col("Regular care","#b86a0a",ac,"ACOUSTIC PIANO")}{col("Almost nothing","#2e6475",dg,"DIGITAL PIANO")}</div><div class="card" style="margin-top:16px;padding:14px 20px;font-size:17px">Tuning schedule: Piano Technicians Guild guidance. Expect about $100 to $200 a visit in the US.</div>'
imgs['acoustic-vs-digital-piano-maintenance']=(760,page(760,'Upkeep','What each piano needs to stay at its best',body))

used=['Have a piano technician inspect it before you pay','Check the pitch: a piano far below pitch needs extra work','Look for cracks in the soundboard and loose tuning pins','Play every key soft and loud; listen for buzzes and sticking','Try all pedals and check the dampers stop the sound','Add moving and a first tuning to the price']
dig=['88 fully weighted, hammer-action keys','Touch sensitivity you can adjust','At least 64-note polyphony; 128 or more is better','A real piano-style sustain pedal (half-pedal is a bonus)','Headphone jack, and USB or Bluetooth MIDI for apps','Speakers loud enough for your room, and a sturdy stand']
def lst(t,c,items):
    li=''.join(f'<div style="display:flex;gap:12px;align-items:flex-start;padding:9px 0"><span style="flex:none;width:24px;height:24px;border-radius:7px;border:3px solid {c};margin-top:2px"></span><span style="font-size:18px;line-height:1.4">{x}</span></div>' for x in items)
    return f'<div class="card" style="padding:20px 22px"><div style="font-size:24px;font-weight:800;margin-bottom:6px;color:{c}">{t}</div>{li}</div>'
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">{lst("Buying a used acoustic","#b86a0a",used)}{lst("Buying a digital piano","#2e6475",dig)}</div>'
imgs['piano-buying-checklist-acoustic-and-digital']=(660,page(660,'Before you buy','The piano buying checklist',body))

def hero(h):
    up='<svg width="300" height="300" viewBox="0 0 300 300"><rect x="40" y="30" width="220" height="200" rx="12" fill="#f6b31e"/><rect x="58" y="48" width="184" height="80" rx="6" fill="#d99a10"/><rect x="28" y="150" width="244" height="30" rx="5" fill="#fff" stroke="#15191c" stroke-width="3"/>'+''.join(f'<rect x="{38+i*22}" y="150" width="12" height="18" fill="#15191c"/>' for i in range(10) if i not in (2,6))+'<rect x="55" y="230" width="16" height="50" fill="#f6b31e"/><rect x="229" y="230" width="16" height="50" fill="#f6b31e"/></svg>'
    dg='<svg width="300" height="300" viewBox="0 0 300 300"><rect x="20" y="150" width="260" height="34" rx="8" fill="#86c6d6"/><rect x="30" y="150" width="240" height="18" rx="3" fill="#fff" stroke="#15191c" stroke-width="3"/>'+''.join(f'<rect x="{38+i*22}" y="150" width="11" height="11" fill="#15191c"/>' for i in range(11) if i not in (2,6,9))+'<rect x="40" y="184" width="10" height="96" fill="#86c6d6"/><rect x="250" y="184" width="10" height="96" fill="#86c6d6"/><path d="M112 110 v-14 a38 38 0 0 1 76 0 v14" stroke="#86c6d6" stroke-width="8" fill="none" stroke-linecap="round"/><rect x="100" y="100" width="22" height="34" rx="8" fill="#86c6d6"/><rect x="178" y="100" width="22" height="34" rx="8" fill="#86c6d6"/></svg>'
    return f'''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:wght@500&display=swap" rel="stylesheet">
<style>*{{box-sizing:border-box;margin:0}}body{{width:1200px;height:{h}px;overflow:hidden;font-family:"Schibsted Grotesk",Arial,sans-serif;background:#15191c;color:#fff;position:relative;display:grid;grid-template-columns:1fr 1fr}}
.l{{background:radial-gradient(500px 400px at 30% 60%,#3a2d0c,#15191c)}}.r{{background:radial-gradient(500px 400px at 70% 60%,#163039,#15191c)}}
.side{{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:{(h-560)//2+20}px}}
.lab{{font-size:34px;font-weight:800;letter-spacing:.12em;margin-top:6px}}
.top{{position:absolute;left:0;right:0;top:{max(34,(h-620)//2+34)}px;text-align:center}}h1{{font-size:70px;font-weight:800;letter-spacing:-.02em;line-height:1}}
p{{font-family:Lora,serif;font-size:27px;color:#c9d4d8;margin-top:12px}}
.vs{{position:absolute;left:50%;top:58%;transform:translate(-50%,-50%);width:110px;height:110px;border-radius:50%;background:#fff;color:#15191c;display:grid;place-items:center;font-size:42px;font-weight:800;box-shadow:0 10px 30px rgb(0 0 0/40%)}}
.b{{position:absolute;bottom:26px;left:0;right:0;text-align:center;font-size:17px;letter-spacing:.14em;font-weight:700;color:#7fa9b6}}</style></head><body>
<div class="l side">{up}<div class="lab" style="color:#f6b31e">ACOUSTIC</div></div><div class="r side">{dg}<div class="lab" style="color:#86c6d6">DIGITAL</div></div>
<div class="top"><h1>Acoustic vs Digital Piano</h1><p>Which should you buy? A piano teacher's honest guide</p></div><div class="vs">vs</div><div class="b">PIANOERS.COM</div></body></html>'''
imgs['acoustic-vs-digital-piano-featured']=(675,hero(675))
imgs['acoustic-vs-digital-piano-social']=(630,hero(630))
json.dump(imgs,open('imgs2.json','w'))
