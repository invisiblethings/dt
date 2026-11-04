import json
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';G='#2f9e5b';R='#c2412d';BL='#3b6fd1';V='#7a4fc2';LINE='#d9e2e5'
FONT='<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:ital,wght@0,500;1,500&family=Noto+Music&display=swap" rel="stylesheet">'
RING=''
NOTEP='<path fill="#fff" d="M45 24 L45 62 A11 11 0 1 1 39 52.5 L39 22 Q52 26 62 34 Q66 39 62 44 Q58 38 45 34 Z"/>'
def mark(s): return f'<svg width="{s}" height="{s}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="{T}"/>{NOTEP}</svg>'
WH=['C','D','E','F','G','A','B']
BLK={'C':'C#','D':'D#','F':'F#','G':'G#','A':'A#'}
def kb(start='C',octaves=2,ww=60,wh=260,hl=None,labels='white',extra_end=True,label_hl=True,bl_names=False):
    hl=hl or {}
    whites=[]
    i=WH.index(start)
    n=octaves*7+(1 if extra_end else 0)
    for k in range(n): whites.append(WH[(i+k)%7])
    bw=ww*0.6; bh=wh*0.62; out=''
    for k,w in enumerate(whites):
        c=hl.get((w,k//7 if False else None)) if False else None
    for k,w in enumerate(whites):
        key=f'{w}{k}'
        fill=hl.get(key,{}).get('c','#fbfaf6')
        out+=f'<rect x="{k*ww}" y="0" width="{ww-3}" height="{wh}" rx="7" fill="{fill}" stroke="#b9c4c8" stroke-width="1.5"/>'
        lab=hl.get(key,{}).get('t', w if labels=='white' else '')
        if lab: out+=f'<text x="{k*ww+(ww-3)/2}" y="{wh-22}" text-anchor="middle" font-size="{ww*0.42:.0f}" font-weight="800" fill="{"#fff" if key in hl and hl[key].get("c") not in (None,"#fbfaf6") and hl[key].get("dark",True) else INK}">{lab}</text>'
    for k,w in enumerate(whites[:-1] if extra_end else whites):
        if w in BLK:
            key=f'{BLK[w]}{k}'
            fill=hl.get(key,{}).get('c','#111619')
            x=k*ww+ww-bw/2-1.5
            out+=f'<rect x="{x}" y="0" width="{bw}" height="{bh}" rx="5" fill="{fill}"/>'
            lab=hl.get(key,{}).get('t','')
            if lab:
                parts=lab.split('|'); fs=ww*0.3; y0=bh-18-(len(parts)-1)*fs*1.1
                out+=''.join(f'<text x="{x+bw/2}" y="{y0+j*fs*1.1:.0f}" text-anchor="middle" font-size="{fs:.0f}" font-weight="800" fill="#fff">{p}</text>' for j,p in enumerate(parts))
    W=len(whites)*ww
    return f'<svg viewBox="-2 -2 {W+4} {wh+4}" width="100%">{out}</svg>'
def doc(body):
    return f'<!doctype html><html><head><meta charset="utf-8">{FONT}<style>*{{margin:0;box-sizing:border-box}}body{{width:1080px;height:1350px;overflow:hidden;position:relative;background:linear-gradient(160deg,#f3f6f7,#e6eef0);font-family:"Schibsted Grotesk",Arial,sans-serif;color:{INK}}}.card{{background:#fff;border:1px solid {LINE};border-radius:28px;box-shadow:0 10px 30px rgb(21 25 28/7%)}}.ser{{font-family:Lora,serif;color:#33424a}}</style></head><body>{body}</body></html>'
def post(name,eyebrow,title,inner,foot='Save this for your next practice session'):
    b=f'''<div style="position:absolute;left:70px;right:70px;top:64px">
<div style="display:flex;align-items:center;gap:14px">{mark(56)}<div style="font-size:24px;font-weight:800;letter-spacing:.18em;color:{T}">PIANOERS.COM</div></div>
<div style="font-size:28px;font-weight:800;letter-spacing:.14em;color:{A};margin-top:40px">{eyebrow}</div>
<div style="font-size:64px;line-height:1.04;font-weight:800;letter-spacing:-.015em;margin-top:8px">{title}</div>
<div style="margin-top:32px">{inner}</div></div>
<div style="position:absolute;left:70px;right:70px;bottom:56px;display:flex;justify-content:space-between;align-items:center;font-size:26px;font-weight:800;color:{MU}"><span>&#128278; {foot}</span><span style="color:{T}">pianoers.com</span></div>'''
    jobs.append(dict(name=name,w=1080,h=1350,html=doc(b),type='jpeg'))
jobs=[]
H=lambda c,t,dark=True: {'c':c,'t':t,'dark':dark}

# 1 find C and F
hl={f'C{k}':H(A,'C',False) for k in (0,7,14)}; hl.update({f'F{k}':H(BL,'F') for k in (3,10)})
inner=f'''<div class="card" style="padding:34px">{kb('C',2,62,300,hl,labels='none')}</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:26px">
<div class="card" style="padding:26px 28px;border-top:10px solid {A}"><div style="font-size:40px;font-weight:800">C</div><div class="ser" style="font-size:31px;line-height:1.35;margin-top:6px">The white key just <b>left of the 2 black keys</b>.</div></div>
<div class="card" style="padding:26px 28px;border-top:10px solid {BL}"><div style="font-size:40px;font-weight:800">F</div><div class="ser" style="font-size:31px;line-height:1.35;margin-top:6px">The white key just <b>left of the 3 black keys</b>.</div></div></div>
<div class="ser" style="font-size:31px;line-height:1.4;margin-top:26px">From C, the white keys go <b>C D E F G A B</b>, then start again. Once you can find C and F, you can find every note.</div>'''
post('tip-find-any-note','BEGINNER BASICS','How to find any note on the piano',inner)

# 2 finger numbers
fing=[('1','Thumb'),('2','Index'),('3','Middle'),('4','Ring'),('5','Pinky')]
def hand(mirror):
    xs=[40,105,165,225,285] if not mirror else [300,235,175,115,55]
    hs=[110,190,215,195,150]; ys=[230,140,115,135,175]
    out=''
    for (n,_),x,h,y in zip(fing,xs,hs,ys):
        out+=f'<rect x="{x-24}" y="{y}" width="48" height="{h+40}" rx="24" fill="#f1d9c4"/><circle cx="{x}" cy="{y+30}" r="22" fill="{T}"/><text x="{x}" y="{y+40}" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">{n}</text>'
    out+=f'<rect x="20" y="300" width="300" height="150" rx="60" fill="#f1d9c4"/>'
    return f'<svg viewBox="0 95 340 365" width="100%">{out}</svg>'
inner=f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:22px">
<div class="card" style="padding:24px"><div style="font-size:30px;font-weight:800;text-align:center;margin-bottom:8px">Left hand</div>{hand(True)}</div>
<div class="card" style="padding:24px"><div style="font-size:30px;font-weight:800;text-align:center;margin-bottom:8px">Right hand</div>{hand(False)}</div></div>
<div class="card" style="padding:24px 30px;margin-top:22px;display:flex;justify-content:space-between;font-size:30px;font-weight:800">{''.join(f'<span><span style="color:{T}">{n}</span> {w}</span>' for n,w in fing)}</div>
<div class="ser" style="font-size:31px;line-height:1.4;margin-top:22px">The small numbers next to notes in piano music are these finger numbers. <b>Both thumbs are 1</b>, so the hands are mirror images.</div>'''
post('tip-finger-numbers','READING MUSIC','Piano finger numbers, explained',inner)

# 3 major & minor chords
def chord(name,notes,c):
    hl={k:H(c,t) for k,t in notes}
    return f'<div class="card" style="padding:22px 26px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:40px;font-weight:800;color:{c}">{name}</div><div style="font-size:26px;font-weight:700;color:{MU}">{" &#8211; ".join(t for _,t in notes)}</div></div><div style="margin-top:12px;padding:0 120px">{kb("C",1,64,150,hl,labels="none",extra_end=True)}</div></div>'
inner=f'''<div style="display:grid;gap:18px">
{chord('C major',[('C0','C'),('E2','E'),('G4','G')],G)}
{chord('C minor',[('C0','C'),('D#1','E&#9837;'),('G4','G')],BL)}</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px">
<div class="card" style="padding:22px 26px"><div style="font-size:30px;font-weight:800;color:{G}">Major = 4 + 3</div><div class="ser" style="font-size:27px;line-height:1.35;margin-top:4px">From the root, count up 4 keys, then 3 more (black keys count).</div></div>
<div class="card" style="padding:22px 26px"><div style="font-size:30px;font-weight:800;color:{BL}">Minor = 3 + 4</div><div class="ser" style="font-size:27px;line-height:1.35;margin-top:4px">Swap the gaps: 3 keys, then 4. The middle note drops by one.</div></div></div>'''
post('tip-major-minor-chords','CHORDS','Build any major or minor chord',inner)

# 4 four chords
four=[('C','C0','E2','G4',G),('G','G4','B6','D8',BL),('Am','A5','C7','E9',V),('F','F3','A5','C7',R)]
cards=''
for n,a,b,c,col in four:
    hl={a:H(col,a[0]),b:H(col,b[0]),c:H(col,c[0])}
    cards+=f'<div class="card" style="padding:14px 22px"><div style="display:flex;align-items:center;gap:20px"><div style="width:110px;font-size:52px;font-weight:800;color:{col}">{n}</div><div style="flex:1">{kb("C",2,42,112,hl,labels="none")}</div></div></div>'
inner=f'''<div style="display:grid;gap:14px">{cards}</div>
<div class="ser" style="font-size:30px;line-height:1.4;margin-top:22px">Play them in this order, 4 beats each, and you&#39;ll hear the chord pattern behind countless pop songs. Musicians call it <b>I&#8211;V&#8211;vi&#8211;IV</b>.</div>'''
post('tip-four-chords','CHORDS','4 chords, hundreds of songs',inner)

# 5 major scale pattern
hl={'C0':H(G,'C'),'D1':H(G,'D'),'E2':H(G,'E'),'F3':H(G,'F'),'G4':H(G,'G'),'A5':H(G,'A'),'B6':H(G,'B'),'C7':H(G,'C')}
steps=['W','W','H','W','W','W','H']
st=''.join(f'<div style="flex:1;text-align:center;font-size:44px;font-weight:800;color:{A if s=="H" else T}">{s}</div>' for s in steps)
inner=f'''<div class="card" style="padding:30px"><div style="padding:0 36px">{kb('C',1,104,300,hl,labels='none')}</div><div style="display:flex;margin:14px 70px 0">{st}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px">
<div class="card" style="padding:22px 26px"><div style="font-size:34px;font-weight:800;color:{T}">W = whole step</div><div class="ser" style="font-size:27px;line-height:1.35;margin-top:4px">Skip one key (white or black).</div></div>
<div class="card" style="padding:22px 26px"><div style="font-size:34px;font-weight:800;color:{A}">H = half step</div><div class="ser" style="font-size:27px;line-height:1.35;margin-top:4px">The very next key, no gap.</div></div></div>
<div class="ser" style="font-size:30px;line-height:1.4;margin-top:22px">Start on any key and follow <b>W W H W W W H</b>: you&#39;ve played that key&#39;s major scale.</div>'''
post('tip-major-scale-formula','SCALES','The major scale formula',inner)

# 6 staff mnemonics
def staff(clef,lines,spaces,lm,sm,col):
    y0=60; gap=34; out=''
    for i in range(5): out+=f'<line x1="150" x2="900" y1="{y0+i*gap}" y2="{y0+i*gap}" stroke="{INK}" stroke-width="3"/>'
    out+=f'<text x="70" y="{y0+4*gap+(10 if clef=="treble" else -36)}" font-size="{150 if clef=="treble" else 120}" font-family="Noto Music" fill="{INK}">{"&#119070;" if clef=="treble" else "&#119074;"}</text>'
    for i,n in enumerate(lines):
        x=230+i*140; y=y0+(4-i)*gap
        out+=f'<ellipse cx="{x}" cy="{y}" rx="19" ry="14" fill="{col}"/><text x="{x}" y="{y0+4*gap+70}" text-anchor="middle" font-size="36" font-weight="800" fill="{col}">{n}</text>'
    for i,n in enumerate(spaces):
        x=300+i*140; y=y0+(3-i)*gap+gap/2
        out+=f'<ellipse cx="{x}" cy="{y}" rx="19" ry="14" fill="none" stroke="{A}" stroke-width="5"/><text x="{x}" y="{y0-18}" text-anchor="middle" font-size="36" font-weight="800" fill="{A}">{n}</text>'
    return f'<div class="card" style="padding:16px 24px"><div style="font-size:30px;font-weight:800">{clef.title()} clef</div><svg viewBox="0 10 960 270" width="100%">{out}</svg><div style="font-size:28px;line-height:1.4"><b style="color:{col}">Lines:</b> {lm}<br><b style="color:{A}">Spaces:</b> {sm}</div></div>'
inner=f'''<div style="display:grid;gap:18px">
{staff('treble','EGBDF','FACE','<i>Every Good Boy Does Fine</i>','spell <i>FACE</i>',T)}
{staff('bass','GBDFA','ACEG','<i>Good Boys Do Fine Always</i>','<i>All Cows Eat Grass</i>',V)}</div>'''
post('tip-staff-mnemonics','READING MUSIC','Read the staff with 4 easy sayings',inner,foot='Save this and stop counting lines')

# 7 note values
vals=[('&#119133;','Whole note','4 beats'),('&#119134;','Half note','2 beats'),('&#119135;','Quarter note','1 beat'),('&#119136;','Eighth note','&#189; beat')]
rows=''.join(f'<div style="display:grid;grid-template-columns:150px 1fr 200px;align-items:center;padding:16px 0;border-top:2px solid {LINE}"><div style="font-family:Noto Music;font-size:110px;line-height:1;text-align:center;color:{T}">{s}</div><div style="font-size:42px;font-weight:800">{n}</div><div style="font-size:40px;font-weight:800;color:{A};text-align:right">{b}</div></div>' for s,n,b in vals)
inner=f'''<div class="card" style="padding:8px 36px">{rows}</div>
<div class="ser" style="font-size:30px;line-height:1.4;margin-top:24px">In 4/4 time, every bar holds 4 beats: one whole note, two halves, four quarters or eight eighths. A dot after a note adds half its value.</div>'''
post('tip-note-values','RHYTHM','How long does each note last?',inner)

# 8 15-minute routine
blocks=[('2 min','Warm up','Slow scales or five-finger patterns, hands separately.',G),('5 min','The hard part','Only the bars you can&#39;t play yet, slowly, hands separately first.',R),('5 min','Review','A piece you already know, to keep it in your fingers.',BL),('3 min','Play for fun','Anything you like. This is why you started.',A)]
bl=''.join(f'<div class="card" style="padding:22px 28px;display:flex;gap:26px;align-items:center;border-left:14px solid {c}"><div style="flex:none;width:150px;font-size:46px;font-weight:800;color:{c}">{m}</div><div><div style="font-size:38px;font-weight:800">{t}</div><div class="ser" style="font-size:28px;line-height:1.35;margin-top:4px">{d}</div></div></div>' for m,t,d,c in blocks)
inner=f'<div style="display:grid;gap:16px">{bl}</div><div class="ser" style="font-size:30px;line-height:1.4;margin-top:22px">Do this every day for a week and you&#39;ll feel the difference. Short and daily beats long and rare.</div>'
post('tip-15-minute-practice-routine','PRACTICE','A 15-minute practice routine that works',inner)

# 9 posture
chk=[('Bench height','Forearms level with the keys, or sloping very slightly down.'),('Distance','Sit on the front half of the bench; elbows just in front of your body.'),('Feet','Flat on the floor, or on a footstool for children.'),('Hands','Gently curved fingers, as if holding a ball. Wrists level, not drooping.'),('Shoulders','Down and relaxed. If they creep up, stop and shake out.')]
cl=''.join(f'<div style="display:flex;gap:20px;padding:18px 0;border-top:2px solid {LINE}"><span style="flex:none;width:52px;height:52px;border-radius:50%;background:{G};color:#fff;display:grid;place-items:center;font-size:30px;font-weight:800">&#10003;</span><div><div style="font-size:36px;font-weight:800">{a}</div><div class="ser" style="font-size:28px;line-height:1.35">{b}</div></div></div>' for a,b in chk)
inner=f'<div class="card" style="padding:8px 34px">{cl}</div>'
post('tip-piano-posture-checklist','TECHNIQUE','Sitting at the piano: a 5-point check',inner,foot='Save this and check it before you play')

# 10 sharps and flats
hl={'C0':H('#fbfaf6','C',False),'C#0':H(V,'C&#9839;|D&#9837;'),'D1':H('#fbfaf6','D',False),'F#3':H(V,'F&#9839;|G&#9837;')}
inner=f'''<div class="card" style="padding:30px"><div style="padding:0 20px">{kb('C',1,118,330,hl,labels='white')}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px">
<div class="card" style="padding:22px 26px"><div style="font-size:40px;font-weight:800;color:{V}">&#9839; Sharp</div><div class="ser" style="font-size:28px;line-height:1.35;margin-top:4px">The key just to the <b>right</b>, one half step higher.</div></div>
<div class="card" style="padding:22px 26px"><div style="font-size:40px;font-weight:800;color:{V}">&#9837; Flat</div><div class="ser" style="font-size:28px;line-height:1.35;margin-top:4px">The key just to the <b>left</b>, one half step lower.</div></div></div>
<div class="ser" style="font-size:30px;line-height:1.4;margin-top:22px">So every black key has two names. The one above C is both C&#9839; and D&#9837;: same key, same sound.</div>'''
post('tip-sharps-and-flats','BEGINNER BASICS','Why black keys have two names',inner)
json.dump(jobs,open('tjobs.json','w'))
