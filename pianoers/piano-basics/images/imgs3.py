from kb import *; from page import page
import json, math
imgs={}
# 8 finger numbers: stylized hands (palms facing down, viewed from above)
def hand(cx,mirror=False,col='#2e6475'):
    # fingers: (dx, length, width, angle) from left to right for RIGHT hand viewed from above: thumb on left
    fingers=[(-92,70,40,-38,1),(-48,118,38,-6,2),(-4,132,38,0,3),(40,120,37,5,4),(80,92,34,12,5)]
    tips=[]
    s=f'<rect x="{cx-110}" y="250" width="220" height="170" rx="70" fill="#fff3d1" stroke="#b8a07a" stroke-width="3"/>'
    for dx,l,w,a,n in fingers:
        if mirror: dx=-dx; a=-a; 
        if n==1:
            bx=cx+dx; by=300
        else:
            bx=cx+dx; by=262
        s+=f'<g transform="rotate({a} {bx} {by})"><rect x="{bx-w/2}" y="{by-l}" width="{w}" height="{l+30}" rx="{w/2}" fill="#fff3d1" stroke="#b8a07a" stroke-width="3"/></g>'
        r=math.radians(a); px=bx+math.sin(r)*(l-28); py=by-math.cos(r)*(l-28)
        tips.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="21" fill="{col}"/><text x="{px:.1f}" y="{py+9:.1f}" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">{n}</text>')
    s+=f'<rect x="{cx-108}" y="300" width="216" height="118" rx="66" fill="#fff3d1"/>'
    return s+''.join(tips)
svg=f'<svg width="1080" height="470" viewBox="0 0 1080 470">{hand(300,mirror=True,col="#2e6475")}{hand(780,col="#b86a0a")}<text x="300" y="455" text-anchor="middle" font-size="26" font-weight="800">Left hand</text><text x="780" y="455" text-anchor="middle" font-size="26" font-weight="800">Right hand</text></svg>'
body=f'''<div class="card" style="padding:10px 20px">{svg}</div>
<div class="card" style="margin-top:18px;padding:18px 24px;font-size:23px;line-height:1.4">Both thumbs are <b>1</b> and both little fingers are <b>5</b>. The numbers printed above or below notes in your music tell you which finger to use.</div>'''
imgs['piano-finger-numbers']=(820,page(820,'Finger numbers','Fingers 1 to 5, both hands',body,'Hands seen from above, palms down on the keys'))
# 9 posture checklist
items=[('Bench height','Forearms level with the keys, elbows just above them.'),('Distance','Sit so your elbows sit slightly in front of your body, not tucked in.'),('Seat','Sit on the front half of the bench, back tall and relaxed.'),('Feet','Flat on the floor. Right foot near the sustain pedal.'),('Wrists','Level with your hand, never sagging below the keys.'),('Fingers','Gently curved, as if holding a small ball. Play on the fingertips.')]
g=''.join(f'<div class="card" style="padding:20px 22px;display:flex;gap:16px"><div style="flex:none;width:52px;height:52px;border-radius:14px;background:#1c2226;color:#fff;display:grid;place-items:center;font-size:26px;font-weight:800">{i+1}</div><div><div style="font-size:27px;font-weight:800">{a}</div><div style="font-size:21px;font-family:Lora,serif;line-height:1.4;color:#33424a;margin-top:4px">{b}</div></div></div>' for i,(a,b) in enumerate(items))
body2=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">{g}</div><div class="card" style="margin-top:16px;padding:16px 22px;font-size:21px;line-height:1.4;background:#fff8e6">Shoulders loose. If anything aches, stop, shake out your hands and check this list again.</div>'
imgs['piano-posture-checklist']=(770,page(770,'Posture','How to sit at the piano',body2))
# 10 practice plan 20 min
parts=[('Warm-up','3 min','Finger exercise or a slow scale','#9fbcc5',3),('Reading','5 min','New notes, a few bars of sight-reading','#2e6475',5),('Your piece','7 min','Hard bars slowly, hands separately, then together','#f6b31e',7),('Chords & fun','3 min','Chord shapes, play a song you like','#b86a0a',3),('Review','2 min','Play it once through, or record yourself','#56666e',2)]
bar=''.join(f'<div style="flex:{m};background:{c};height:90px;display:grid;place-items:center;color:{"#1b1400" if c in ("#f6b31e","#9fbcc5") else "#fff"};font-size:24px;font-weight:800">{t}</div>' for _,t,_,c,m in parts)
leg=''.join(f'<div style="display:grid;grid-template-columns:22px 160px 90px 1fr;gap:12px;align-items:center;padding:12px 0;border-top:1px solid #d9e2e5"><span style="width:22px;height:22px;border-radius:6px;background:{c}"></span><b style="font-size:25px">{a}</b><span style="font-size:23px;font-weight:800;color:#2e6475">{t}</span><span style="font-size:22px;font-family:Lora,serif;color:#33424a">{d}</span></div>' for a,t,d,c,_ in parts)
body3=f'<div class="card" style="padding:24px 28px"><div style="display:flex;border-radius:14px;overflow:hidden;gap:4px">{bar}</div><div style="margin-top:16px">{leg}</div></div><div class="card" style="margin-top:16px;padding:16px 22px;font-size:21px">Five or six days a week beats one long session on Sunday.</div>'
imgs['20-minute-piano-practice-plan']=(760,page(760,'Practice','A 20-minute daily practice plan',body3))
# 11 roadmap
steps=[('Week 1','Find middle C and every key name. Sit well. Play C position melodies (Ode to Joy) with each hand.'),('Month 1','Read treble and bass notes in C position. Count quarter, half and whole notes. Play C, F and G chords.'),('Month 3','Hands together on easy pieces. C, G and F major scales. First pedal use. Simple songs with chords.'),('Month 6','Easy classics such as Minuet in G (Petzold). Eighth notes and dotted rhythms. Chord inversions.'),('Year 1','Early-intermediate pieces. Most major scales. Sight-read simple music, and play pop songs from a chord sheet.')]
LINE='<span style="position:absolute;left:14px;top:34px;bottom:-26px;width:3px;background:#d9e2e5"></span>'
tl=''.join(f'<div style="display:grid;grid-template-columns:150px 30px 1fr;gap:16px;align-items:start"><div style="font-size:28px;font-weight:800;color:{"#b86a0a" if i==4 else "#2e6475"};text-align:right;padding-top:6px">{a}</div><div style="position:relative;height:100%"><span style="position:absolute;left:5px;top:12px;width:20px;height:20px;border-radius:50%;background:{"#f6b31e" if i==4 else "#2e6475"}"></span>{"" if i==4 else LINE}</div><div class="card" style="padding:14px 18px;font-size:21px;font-family:Lora,serif;line-height:1.4">{b}</div></div>' for i,(a,b) in enumerate(steps))
body4=f'<div style="display:flex;flex-direction:column;gap:16px">{tl}</div>'
imgs['learning-piano-timeline-roadmap']=(800,page(800,'Your first year','A realistic piano roadmap',body4,'Based on 20 minutes of practice, 5–6 days a week'))
# 12 first melodies note names
songs=[('Ode to Joy','Beethoven','E E F G | G F E D | C C D E | E· D D'),('Twinkle, Twinkle, Little Star','Traditional','C C G G | A A G | F F E E | D D C'),('Mary Had a Little Lamb','Traditional','E D C D | E E E | D D D | E G G')]
sc=''.join(f'<div class="card" style="padding:20px 24px"><div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:28px;font-weight:800">{a}</span><span style="font-size:19px;color:#56666e">{b}</span></div><div style="font-size:28px;font-weight:800;letter-spacing:.04em;white-space:nowrap;color:#2e6475;margin-top:10px">{c}</div></div>' for a,b,c in songs)
W=white_seq('C4','G4'); sv,_=keyboard(W,x=0,y=0,ww=88,wh=150,labels={n:n[0] for n in W},fill={n:'#fff3d1' for n in W},wlabel_size=24)
fing=''.join(f'<text x="{i*88+44}" y="-12" text-anchor="middle" font-size="22" font-weight="800" fill="#b86a0a">{i+1}</text>' for i in range(5))
body5=f'<div style="display:grid;grid-template-columns:1fr 470px;gap:18px;align-items:start"><div style="display:flex;flex-direction:column;gap:14px">{sc}</div><div class="card" style="padding:22px 20px"><div style="font-size:22px;font-weight:800;margin-bottom:26px">Right hand in C position</div><svg width="440" height="160" viewBox="0 -30 440 190">{fing}{sv}</svg><div style="font-size:19px;font-family:Lora,serif;color:#33424a;margin-top:8px;line-height:1.4">Thumb on middle C, one finger per key. "·" means hold the note a little longer.</div></div></div>'
imgs['first-easy-piano-songs-note-names']=(620,page(620,'Your first songs','Three melodies you can play today',body5))
json.dump(imgs,open('imgs3.json','w'))
