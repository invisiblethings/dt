import json
from page import page
from kb import keyboard, white_seq
from days import DAYS
imgs={}
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
PH=[('Week 1','Find your way','#e2eef1',T),('Week 2','Rhythm and reading','#fff3d1','#b86a0a'),('Week 3','Chords and both hands','#dcefe5','#1f7a4d'),('Days 22 to 30','Make it music','#ece6f6','#5b4a8a')]
def ph(d): return PH[0] if d<=7 else PH[1] if d<=14 else PH[2] if d<=21 else PH[3]
cells=''
for i,(t,_) in enumerate(DAYS):
    _,_,bg,c=ph(i+1)
    cells+=f'<div style="background:{bg};border-radius:14px;padding:12px 13px;min-height:104px"><div style="font-size:14px;font-weight:800;letter-spacing:.08em;color:{c}">DAY {i+1}</div><div style="font-size:17.5px;font-weight:700;line-height:1.25;margin-top:5px">{t}</div></div>'
leg=''.join(f'<span style="display:flex;align-items:center;gap:8px"><span style="width:16px;height:16px;border-radius:5px;background:{bg};border:2px solid {c}"></span><b>{a}</b> {b}</span>' for a,b,bg,c in PH)
body=f'<div class="card" style="padding:18px"><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:9px">{cells}</div></div><div style="display:flex;gap:26px;margin-top:16px;font-size:17px;flex-wrap:wrap">{leg}</div>'
imgs['30-day-piano-challenge-for-beginners']=(880,page(880,'30-day challenge','Teach yourself piano in 30 days',body,'About 20 minutes a day'))

steps=[60,64,68,72,76,80,84]
sw=118; svg=f'<svg width="1080" height="400" viewBox="0 0 1080 400">'
for i,b in enumerate(steps):
    h=70+i*42; x=40+i*(sw+14); y=380-h; last=i==len(steps)-1
    svg+=f'<rect x="{x}" y="{y}" width="{sw}" height="{h}" rx="12" fill="{A if last else T}" opacity="{1 if last else 0.35+i*0.1:.2f}"/>'
    svg+=f'<text x="{x+sw/2}" y="{y+40}" text-anchor="middle" font-size="30" font-weight="800" fill="{INK if last else "#fff"}">{b}</text><text x="{x+sw/2}" y="{y+64}" text-anchor="middle" font-size="16" font-weight="700" fill="{INK if last else "#fff"}">bpm</text>'
    if not last: svg+=f'<text x="{x+sw+7}" y="{y-14}" text-anchor="middle" font-size="15" font-weight="800" fill="#b86a0a">+4</text>'
svg+=f'<text x="{40+6*(sw+14)+sw/2}" y="{380-(70+6*42)-16}" text-anchor="middle" font-size="18" font-weight="800" fill="#b86a0a">GOAL</text></svg>'
rules=[('Start slow','Pick the tempo where you play it perfectly, even if that is 50.'),('3 clean runs','Play the passage three times in a row with no mistakes.'),('Then +4 bpm','Nudge the metronome up one step and repeat.'),('Mistake? Step down','Go back 4 bpm. Tomorrow you will start higher.')]
rc=''.join(f'<div class="card" style="padding:16px 18px"><div style="font-size:21px;font-weight:800">{a}</div><div style="font-size:17px;font-family:Lora,serif;line-height:1.4;color:#33424a;margin-top:4px">{b}</div></div>' for a,b in rules)
body=f'<div class="card" style="padding:10px 0 0">{svg}</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px">{rc}</div>'
imgs['piano-practice-tempo-ladder-metronome']=(810,page(810,'Practise with a metronome','The tempo ladder',body))

bars=''.join(f'<div style="flex:1;height:86px;border-radius:12px;display:grid;place-items:center;font-size:28px;font-weight:800;background:{"#fbe4dd" if b in (5,6) else "#fff"};border:2px solid {"#b0442d" if b in (5,6) else LINE};color:{"#b0442d" if b in (5,6) else INK}">{b}</div>' for b in range(1,9))
def bracket(a,b,label,col,top):
    l=(a-1)*12.5; w=(b-a+1)*12.5
    return f'<div style="position:absolute;left:calc({l}% + 4px);width:calc({w}% - 8px);top:{top}px;border:3px solid {col};border-top:0;height:16px;border-radius:0 0 10px 10px"></div><div style="position:absolute;left:calc({l}% + 4px);width:calc({w}% - 8px);top:{top+20}px;text-align:center;font-size:16px;font-weight:800;color:{col}">{label}</div>'
br=bracket(5,6,'① Hard bars first','#b0442d',0)+bracket(4,7,'② Add a bar each side',T,58)+bracket(1,4,'③ Bars 1 to 4','#b86a0a',116)+bracket(1,8,'④ Join it all up, overlapping by one note',INK,174)
st=[('Find the hard bars','Play through once and circle the bars that break.'),('Slow, hands separately','Then hands together, at a tempo you can manage.'),('Grow the chunk','Add a bar on each side so the joins are smooth.'),('Link and overlap','Finish each chunk on the first note of the next.')]
sc=''.join(f'<div class="card" style="padding:14px 16px"><div style="font-size:15px;font-weight:800;color:{T}">STEP {i+1}</div><div style="font-size:20px;font-weight:800;margin-top:2px">{a}</div><div style="font-size:16.5px;font-family:Lora,serif;line-height:1.4;color:#33424a;margin-top:4px">{b}</div></div>' for i,(a,b) in enumerate(st))
body=f'<div class="card" style="padding:22px 24px"><div style="font-size:17px;color:{MU};margin-bottom:10px">An 8-bar piece. Bars 5 and 6 keep going wrong.</div><div style="display:flex;gap:8px">{bars}</div><div style="position:relative;height:222px;margin-top:10px">{br}</div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px">{sc}</div>'
imgs['how-to-practice-piano-chunking-method']=(870,page(870,'Practise smarter','Chunking: fix the hard bars first',body))

COUNT=['1','&amp;','2','&amp;','3','&amp;','4','&amp;']
def grid(rows,cellw=58):
    w=cellw*8
    head=''.join(f'<div style="width:{cellw}px;text-align:center;font-size:15px;font-weight:800;color:{MU}">{c}</div>' for c in COUNT)
    out=f'<div style="display:flex;margin-left:52px">{head}</div>'
    for lab,col,spans in rows:
        cells=''.join(f'<div style="position:absolute;left:{s*cellw+3}px;width:{(e-s)*cellw-6}px;top:6px;height:30px;border-radius:8px;background:{col};color:{"#1b1400" if col==A else "#fff"};font-size:14px;font-weight:800;display:grid;place-items:center">{t}</div>' for s,e,t in spans)
        lines=''.join(f'<div style="position:absolute;left:{k*cellw}px;top:0;bottom:0;border-left:{2 if k%2==0 else 1}px {"solid" if k%2==0 else "dashed"} {LINE}"></div>' for k in range(9))
        out+=f'<div style="display:flex;align-items:center;margin-top:5px"><div style="width:52px;font-size:15px;font-weight:800;color:{col if col!=A else "#b86a0a"}">{lab}</div><div style="position:relative;width:{w}px;height:42px;background:#f6f8f9;border-radius:8px">{lines}{cells}</div></div>'
    return out
q=[(0,2,''),(2,4,''),(4,6,''),(6,8,'')]
lv=[('Melody plus one long note','The left hand holds a single note for the whole bar.',[(0,8,'')]),
('A left-hand note every two beats','The left hand moves on beats 1 and 3.',[(0,4,''),(4,8,'')]),
('Both hands on every beat','The hands move at the same time. Count out loud.',q),
('Different rhythms in each hand','The right hand holds while the left keeps going.',q),
('Off-beat melody, steady left hand','The right hand plays on the "and". The hardest level.',q)]
rhs=[q,q,q,[(0,4,''),(4,6,''),(6,8,'')],[(0,1,''),(1,3,''),(3,5,''),(5,6,''),(6,8,'')]]
rows=''
for i,((t,s,lh),rh) in enumerate(zip(lv,rhs)):
    rows+=f'<div class="card" style="padding:14px 18px;display:grid;grid-template-columns:44px 1fr 530px;gap:16px;align-items:center"><div style="width:44px;height:44px;border-radius:12px;background:{INK if i==4 else T};color:#fff;display:grid;place-items:center;font-size:22px;font-weight:800">{i+1}</div><div><div style="font-size:21px;font-weight:800">{t}</div><div style="font-size:16.5px;font-family:Lora,serif;color:#33424a;margin-top:3px;line-height:1.35">{s}</div></div><div>{grid([("RH",A,rh),("LH",T,lh)])}</div></div>'
body=f'<div style="display:flex;flex-direction:column;gap:12px">{rows}</div><div style="margin-top:12px;font-size:17px;color:{MU}">Climb one level at a time. Move up when the level feels easy at a slow tempo.</div>'
imgs['piano-hands-together-coordination-ladder']=(1010,page(1010,'Hands together','Five levels of hand coordination',body))

def mini(notes):
    W=white_seq('C3','B3'); sv,w=keyboard(W,0,0,40,96,24,60,{n:'#f6b31e' for n in notes},{n:n[0] for n in notes},None,None,15,11)
    return f'<svg style="flex:none" width="{w+4}" height="100" viewBox="-2 -2 {w+4} 100">{sv}</svg>'
pats=[('Block chord','Once per bar. The easiest start.',[(0,8,'C E G')],['C3','E3','G3']),
('Root and fifth','Two notes, on beats 1 and 3.',[(0,4,'C'),(4,8,'G')],['C3','G3']),
('Pulsing root','The root on every beat. Great for pop.',[(0,2,'C'),(2,4,'C'),(4,6,'C'),(6,8,'C')],['C3']),
('Broken chord','The chord one note at a time: low, high, middle, high.',[(0,2,'C'),(2,4,'G'),(4,6,'E'),(6,8,'G')],['C3','E3','G3'])]
pc=''.join(f'<div class="card" style="padding:18px 20px"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px"><div><div style="font-size:15px;font-weight:800;color:{T}">PATTERN {i+1}</div><div style="font-size:24px;font-weight:800">{t}</div><div style="font-size:16.5px;font-family:Lora,serif;color:#33424a;margin-top:3px;line-height:1.35">{s}</div></div>{mini(n)}</div><div style="margin-top:12px">{grid([("LH",T,sp)],cellw=52)}</div></div>' for i,(t,s,sp,n) in enumerate(pats))
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">{pc}</div><div class="card" style="margin-top:16px;padding:14px 20px;font-size:18px;background:#fff8e6">Shown on a C chord. Move the same shape to G, A minor and F to play the four-chord loop.</div>'
imgs['left-hand-piano-accompaniment-patterns']=(810,page(810,'Left-hand patterns','Four ways to accompany a song',body))

import math
ch=[('C','I','C E G',['C4','E4','G4']),('G','V','G B D',['G4','B4','D5']),('Am','vi','A C E',['A4','C5','E5']),('F','IV','F A C',['F4','A4','C5'])]
cx,cy,R=300,300,205
svg=f'<svg width="600" height="600" viewBox="0 0 600 600"><circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{LINE}" stroke-width="10"/>'
for k in range(4):
    a0=math.radians(-90+k*90+22); a1=math.radians(-90+(k+1)*90-22)
    x0,y0=cx+R*math.cos(a0),cy+R*math.sin(a0); x1,y1=cx+R*math.cos(a1),cy+R*math.sin(a1)
    svg+=f'<path d="M{x0:.1f},{y0:.1f} A{R},{R} 0 0 1 {x1:.1f},{y1:.1f}" fill="none" stroke="{A}" stroke-width="10" stroke-linecap="round" marker-end="url(#ar)"/>'
svg+=f'<defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="{A}"/></marker></defs>'
for k,(n,r,notes,_) in enumerate(ch):
    a=math.radians(-90+k*90); x,y=cx+R*math.cos(a),cy+R*math.sin(a)
    svg+=f'<circle cx="{x:.1f}" cy="{y:.1f}" r="74" fill="{INK if k==0 else "#fff"}" stroke="{T}" stroke-width="4"/><text x="{x:.1f}" y="{y+6:.1f}" text-anchor="middle" font-size="46" font-weight="800" fill="{"#fff" if k==0 else INK}">{n}</text><text x="{x:.1f}" y="{y+38:.1f}" text-anchor="middle" font-size="18" font-weight="700" fill="{"#c9d4d8" if k==0 else MU}">{r} · {notes}</text>'
svg+=f'<text x="{cx}" y="{cy-8}" text-anchor="middle" font-size="24" font-weight="800" fill="{INK}">Loop it</text><text x="{cx}" y="{cy+24}" text-anchor="middle" font-size="18" fill="{MU}">4 beats per chord</text></svg>'
def kbc(notes):
    W=white_seq('C4','E5'); sv,w=keyboard(W,0,0,30,80,18,50,{n:'#f6b31e' for n in notes},{},None,None,12,10)
    return f'<svg width="{w+4}" height="84" viewBox="-2 -2 {w+4} 84">{sv}</svg>'
side=''.join(f'<div style="display:flex;align-items:center;gap:14px;padding:10px 0;border-top:1px solid {LINE}"><b style="width:52px;font-size:26px">{n}</b>{kbc(k)}</div>' for n,_,_,k in ch)
body=f'''<div style="display:grid;grid-template-columns:600px 1fr;gap:22px;align-items:start"><div class="card" style="padding:0">{svg}</div>
<div style="display:flex;flex-direction:column;gap:14px"><div class="card" style="padding:16px 20px"><div style="font-size:20px;font-weight:800;margin-bottom:6px">Right-hand shapes</div>{side}</div>
<div class="card" style="padding:16px 20px;background:#fff8e6"><div style="font-size:19px;font-weight:800">Heard it before?</div><div style="font-size:17px;font-family:Lora,serif;line-height:1.45;margin-top:4px">C, G, Am, F is the chord loop of <i>Let It Be</i> (verse) and <i>No Woman, No Cry</i>. The same I–V–vi–IV pattern in other keys runs through <i>Someone Like You</i> and <i>With or Without You</i>.</div></div></div></div>'''
imgs['four-chord-piano-progression-c-g-am-f']=(900,page(900,'The four-chord loop','Four chords, thousands of songs',body))
json.dump(imgs,open('imgsB.json','w'))
