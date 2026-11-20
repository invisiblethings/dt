import json
from page import page
from kb import keyboard, white_seq
imgs={}
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
W,H,L,B=1040,430,60,380
def X(m): return L+m*(W-L-30)/12
def Y(v): return B-v*(B-30)/100
pts=[(0,0),(1,22),(1.5,26),(2.6,29),(3.4,45),(4.6,50),(5.8,53),(6.6,66),(8,70),(9.2,72),(10,84),(12,92)]
d='M'+' L'.join(f'{X(m):.1f},{Y(v):.1f}' for m,v in pts)
svg=f'<svg width="{W}" height="{H+30}" viewBox="0 0 {W} {H+30}">'
for m in range(0,13,3):
    anc='start' if m==0 else 'end' if m==12 else 'middle'; lab='Start' if m==0 else f'Month {m}'
    svg+=f'<line x1="{X(m)}" y1="30" x2="{X(m)}" y2="{B}" stroke="{LINE}" stroke-dasharray="4 6"/><text x="{X(m)}" y="{B+28}" text-anchor="{anc}" font-size="17" fill="{MU}" font-weight="700">{lab}</text>'
svg+=f'<line x1="{L}" y1="{B}" x2="{W-30}" y2="{B}" stroke="{INK}" stroke-width="2"/><line x1="{X(0)}" y1="{Y(0)}" x2="{X(12)}" y2="{Y(92)}" stroke="#9fbcc5" stroke-width="3" stroke-dasharray="10 8"/>'
svg+=f'<text x="{X(6.6)}" y="{Y(50.6)+26}" font-size="16" fill="#6f8f99" font-weight="700" transform="rotate(-18.7 {X(6.6)} {Y(50.6)+26})">What most beginners expect</text>'
svg+=f'<path d="{d}" fill="none" stroke="{T}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>'
for (a,b),lab,n in [((1,2.6),'Plateau 1',1),((3.4,5.8),'Plateau 2',2),((6.6,9.2),'Plateau 3',3)]:
    svg+=f'<rect x="{X(a)}" y="30" width="{X(b)-X(a)}" height="{B-30}" fill="{A}" opacity=".13"/><text x="{(X(a)+X(b))/2}" y="54" text-anchor="middle" font-size="16" font-weight="800" fill="#b86a0a">{lab}</text>'
svg+=f'<text x="{L-14}" y="{Y(50)}" text-anchor="middle" font-size="16" font-weight="700" fill="{MU}" transform="rotate(-90 {L-14} {Y(50)})">Skill</text></svg>'
pl=[('Plateau 1','Hands together feels impossible.','Drop to level 1 of the coordination ladder and slow right down.'),('Plateau 2','Pieces get longer and messier.','Chunk the hard bars and use the tempo ladder.'),('Plateau 3','Your reading lags behind your playing.','Sight-read four easy bars every single day.')]
pc=''.join(f'<div class="card" style="padding:14px 18px"><div style="font-size:15px;font-weight:800;color:#b86a0a">{a.upper()}</div><div style="font-size:19px;font-weight:800;margin-top:2px">{b}</div><div style="font-size:16.5px;font-family:Lora,serif;color:#33424a;margin-top:4px;line-height:1.4"><b>Fix:</b> {c}</div></div>' for a,b,c in pl)
body=f'<div class="card" style="padding:14px 10px 0">{svg}</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px">{pc}</div>'
imgs['learning-piano-progress-plateaus']=(900,page(900,'Progress','Why progress comes in steps',body,'Illustration of a typical first year, not measured data'))

days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
focus=['Chords','Ear training','Rhythm','Scales','A song you love','Record and review']
fc=['#b86a0a','#5b4a8a','#1f7a4d','#2e6475','#b0442d','#15191c']
cols=''
for i,dn in enumerate(days):
    if i<6:
        blocks=f'<div style="flex:3;background:#9fbcc5;border-radius:8px 8px 0 0;display:grid;place-items:center;font-size:14px;font-weight:800;color:#15191c">Warm-up</div><div style="flex:5;background:{T};display:grid;place-items:center;font-size:15px;font-weight:800;color:#fff">Reading</div><div style="flex:7;background:{A};display:grid;place-items:center;font-size:15px;font-weight:800;color:#1b1400">Your piece</div><div style="flex:5;background:{fc[i]};border-radius:0 0 8px 8px;display:grid;place-items:center;font-size:15px;font-weight:800;color:#fff;text-align:center;padding:0 6px;line-height:1.2">{focus[i]}</div>'
    else:
        blocks=f'<div style="flex:1;border:3px dashed {LINE};border-radius:8px;display:grid;place-items:center;text-align:center;font-size:16px;font-weight:800;color:{MU};padding:8px">Rest, or play just for fun</div>'
    cols+=f'<div style="display:flex;flex-direction:column"><div style="text-align:center;font-size:20px;font-weight:800;margin-bottom:8px">{dn}</div><div style="height:400px;display:flex;flex-direction:column;gap:3px">{blocks}</div></div>'
leg=''.join(f'<div style="display:flex;justify-content:space-between;padding:7px 0;border-top:1px solid {LINE};font-size:17px"><b>{a}</b><span style="color:{MU}">{b}</span></div>' for a,b in [('Warm-up','3 min'),('Reading','5 min'),('Your piece','7 min'),('Daily focus','5 min')])
body=f'<div style="display:grid;grid-template-columns:1fr 250px;gap:18px"><div class="card" style="padding:20px"><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:10px">{cols}</div></div><div style="display:flex;flex-direction:column;gap:14px"><div class="card" style="padding:16px 18px"><div style="font-size:19px;font-weight:800;margin-bottom:6px">20 minutes a day</div>{leg}</div><div class="card" style="padding:16px 18px;background:#fff8e6;font-size:17px;line-height:1.45">The daily focus changes, so every skill gets practised each week, and nothing gets stale.</div></div></div>'
imgs['weekly-piano-practice-schedule']=(760,page(760,'Your week','A weekly piano practice schedule',body))

def phone(label):
    return f'<div style="width:96px;height:150px;border-radius:18px;background:{INK};padding:9px;flex:none"><div style="width:100%;height:100%;border-radius:11px;background:linear-gradient(160deg,#2e6475,#9fbcc5);display:grid;place-items:center;color:#fff;font-weight:800;font-size:15px;text-align:center;line-height:1.2">{label}</div></div>'
ang=[('From the side','At keyboard height, level with your wrists.',['Wrists level, not sagging','Fingers curved, knuckles firm','No tension in the thumb']),
('From above','Over your hands, looking straight down.',['Fingers match the numbers','The thumb passes under smoothly','Hands stay close to the keys']),
('From behind, wide','Your whole body and the bench in shot.',['Shoulders down and loose','Elbows slightly in front of you','Feet flat, back tall'])]
ac=''.join(f'<div class="card" style="padding:18px 20px;display:flex;gap:18px">{phone(["SIDE","ABOVE","WIDE"][i])}<div><div style="font-size:22px;font-weight:800">{a}</div><div style="font-size:16px;color:{MU};margin:3px 0 8px">{b}</div>'+''.join(f'<div style="display:flex;gap:9px;align-items:center;font-size:17.5px;margin-top:6px"><span style="flex:none;width:20px;height:20px;border-radius:6px;border:2.5px solid {T}"></span>{x}</div>' for x in c)+'</div></div>' for i,(a,b,c) in enumerate(ang))
body=f'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">{ac}</div><div class="card" style="margin-top:16px;padding:18px 22px;display:grid;grid-template-columns:auto 1fr;gap:22px;align-items:center"><div style="font-size:22px;font-weight:800">Then listen back for</div><div style="display:flex;gap:12px;flex-wrap:wrap">'+''.join(f'<span style="background:#e2eef1;color:{T};font-weight:800;font-size:17px;padding:8px 14px;border-radius:99px">{x}</span>' for x in ['A steady beat','Even volume','Clean pedal changes','No pauses at the hard bars'])+f'</div></div><div style="margin-top:14px;font-size:17px;color:{MU}">Film once a month, keep the clips, and compare them. You will hear progress you can\'t feel day to day.</div>'
imgs['self-taught-piano-video-check']=(650,page(650,'Be your own teacher','The monthly video check',body))

def hero(h):
    W_=white_seq('C3','B5')
    kbs,w=keyboard(W_,0,0,46,300,28,188,{'C4':A,'E4':A,'G4':A,'C5':A},{},None,None,20,14)
    return f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
<style>*{{box-sizing:border-box;margin:0}}body{{width:1200px;height:{h}px;overflow:hidden;font-family:"Schibsted Grotesk",Arial,sans-serif;background:#1d4a57;color:#fff;position:relative}}
.kb{{position:absolute;left:560px;bottom:-30px;transform:rotate(-14deg)}}
.t{{position:absolute;left:70px;top:{(h-440)//2}px;width:620px}}
.e{{font-size:21px;font-weight:700;letter-spacing:.16em;color:{A};text-transform:uppercase}}
h1{{font-size:88px;line-height:.95;font-weight:800;letter-spacing:-.02em;margin:16px 0 20px}}
p{{font-family:Lora,serif;font-size:28px;line-height:1.35;color:#d3e3e8}}
.ms{{display:flex;gap:10px;margin-top:26px}}.ms span{{background:rgb(255 255 255/12%);border-radius:12px;padding:8px 14px;font-size:19px;font-weight:700}}.ms b{{color:{A}}}
.b{{position:absolute;left:70px;bottom:34px;font-size:18px;letter-spacing:.14em;font-weight:700;color:#9fc6d1}}
</style></head><body>
<svg class="kb" width="{w+4}" height="304" viewBox="-2 -2 {w+4} 304">{kbs}</svg>
<div class="t"><div class="e">Teach yourself, step by step</div><h1>How to Play Piano</h1><p>A 10-step plan, a 30-day challenge and free tools to start today.</p>
<div class="ms"><span><b>Day 1</b> first song</span><span><b>Day 30</b> both hands</span><span><b>Year 1</b> real music</span></div></div>
<div class="b">PIANOERS.COM</div></body></html>'''
imgs['teach-yourself-piano-featured']=(675,hero(675))
imgs['teach-yourself-piano-social']=(630,hero(630))
json.dump(imgs,open('imgsC.json','w'))
