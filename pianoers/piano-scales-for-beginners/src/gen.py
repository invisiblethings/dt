import json
from scales import SCALES,BY,is_white
T='#2e6475';A='#f6b31e';G='#2f9e5b';R='#c2412d';BL='#3b6fd1';V='#7a4fc2';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'
FONT='<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:ital,wght@0,500;1,500&display=swap" rel="stylesheet">'
CSS=f'*{{box-sizing:border-box;margin:0}}body{{width:1200px;font-family:"Schibsted Grotesk",Arial,sans-serif;background:#f3f6f7;color:{INK};padding:52px 60px 0;position:relative;overflow:hidden}}.eyebrow{{font-size:20px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:{T}}}h1{{font-size:48px;line-height:1.05;font-weight:800;letter-spacing:-.01em;margin:8px 0 26px}}.foot{{position:absolute;left:60px;right:60px;bottom:22px;display:flex;justify-content:space-between;font-size:17px;color:{MU};font-weight:500}}.foot b{{letter-spacing:.12em;color:{T}}}.card{{background:#fff;border:1px solid {LINE};border-radius:20px;box-shadow:0 1px 2px rgb(21 25 28/6%),0 8px 24px rgb(21 25 28/6%)}}.ser{{{SER}}}'
def page(eyebrow,title,body,note='Pianoers.com · Piano scales for beginners'):
    return f'<!doctype html><html><head><meta charset="utf-8">{FONT}<style>{CSS}</style></head><body><div class="eyebrow">{eyebrow}</div><h1>{title}</h1>{body}<div class="foot"><span>{note}</span><b>PIANOERS.COM</b></div></body></html>'
jobs=[]
def add(name,html,h=900): jobs.append(dict(name=name,w=1200,h=h,html=html,fit=True))

def kbd(lo,hi,marks=None,ww=56,wh=230,top=None,bot=None,fs=None,lab_all=False,names=True):
    marks=marks or {}; top=top or {}; bot=bot or {}
    whites=[m for m in range(lo,hi+1) if is_white(m)]
    xw={m:i*ww for i,m in enumerate(whites)}
    bw=ww*0.6; bh=wh*0.62
    pad_t=46 if top else 6; pad_b=46 if bot else 6
    o=''; fs=fs or ww*0.34
    NAMES={0:'C',2:'D',4:'E',5:'F',7:'G',9:'A',11:'B'}
    cx={}
    for m in whites:
        x=xw[m]; mk=marks.get(m); fill=mk[0] if mk else '#fbfaf6'
        o+=f'<rect x="{x}" y="{pad_t}" width="{ww-3}" height="{wh}" rx="6" fill="{fill}" stroke="#b9c4c8" stroke-width="1.4"/>'
        cx[m]=x+(ww-3)/2
        lab=mk[1] if mk and len(mk)>1 else (NAMES[m%12] if lab_all else '')
        if lab and names: o+=f'<text x="{cx[m]}" y="{pad_t+wh-16}" text-anchor="middle" font-size="{fs:.0f}" font-weight="800" fill="{"#fff" if mk and mk[0] not in ("#fbfaf6",) else INK}">{lab}</text>'
    for m in range(lo,hi+1):
        if is_white(m): continue
        left=m-1
        if left not in xw: continue
        x=xw[left]+ww-bw/2-1.5
        mk=marks.get(m); fill=mk[0] if mk else '#121719'
        o+=f'<rect x="{x}" y="{pad_t}" width="{bw}" height="{bh}" rx="5" fill="{fill}"/>'
        cx[m]=x+bw/2
        lab=mk[1] if mk and len(mk)>1 else ''
        if lab and names: o+=f'<text x="{cx[m]}" y="{pad_t+bh-14}" text-anchor="middle" font-size="{fs*0.8:.0f}" font-weight="800" fill="#fff">{lab}</text>'
    for m,f in top.items():
        o+=f'<circle cx="{cx[m]}" cy="20" r="17" fill="{T}"/><text x="{cx[m]}" y="27" text-anchor="middle" font-size="19" font-weight="800" fill="#fff">{f}</text>'
    for m,f in bot.items():
        y=pad_t+wh+26
        o+=f'<circle cx="{cx[m]}" cy="{y}" r="17" fill="{V}"/><text x="{cx[m]}" y="{y+7}" text-anchor="middle" font-size="19" font-weight="800" fill="#fff">{f}</text>'
    W=len(whites)*ww; H=pad_t+wh+pad_b
    return f'<svg viewBox="-2 -2 {W+4} {H+4}" width="100%">{o}</svg>',cx

def scale_marks(s,color=G,black=A):
    mk={}
    for n,m in zip(s['notes'],s['midi']):
        mk[m]=(color if is_white(m) else black,n)
    return mk
def span(s):
    lo=s['midi'][0]; hi=s['midi'][-1]
    while not (lo%12 in (0,5)): lo-=1
    while not (hi%12 in (4,11)): hi+=1
    return lo,hi

stages=[('Weeks 1 to 2','Start here',G,[('C major','all white keys'),('A minor','all white keys')]),
('Weeks 3 to 4','One sharp or flat',BL,[('G major','F♯'),('E minor','F♯'),('F major','B♭, new fingering'),('D minor','B♭')]),
('Weeks 5 to 8','More sharps, same fingering',A,[('D major','2 sharps'),('A major','3 sharps'),('E major','4 sharps')]),
('After that','Fun extras',V,[('Arpeggios','C, G, F, A minor'),('Pentatonic & blues','for improvising'),('Chromatic','every key')])]
cols=''
for t,s,c,items in stages:
    it=''.join(f'<div style="padding:11px 0;border-top:1px solid {LINE}"><div style="font-size:21px;font-weight:800">{a}</div><div style="font-size:16px;color:{MU};font-weight:600">{b}</div></div>' for a,b in items)
    cols+=f'<div class="card" style="padding:16px 18px;border-top:8px solid {c}"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{c}">{t.upper()}</div><div style="font-size:22px;font-weight:800;margin:4px 0 6px">{s}</div>{it}</div>'
body=f'''<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px">{cols}</div>
<div class="card" style="padding:14px 22px;margin-top:14px;font-size:18px;line-height:1.45" ><span class="ser"><b style="font-family:Schibsted Grotesk,Arial">The rule I give every student:</b> add a new scale only when the last one feels easy, hands separately, at a slow, steady speed. Ten minutes a day is enough.</span></div>'''
add('piano-scales-for-beginners-learning-order',page('Your roadmap','The first 9 piano scales to learn, in order',body,'A teacher&#39;s suggested order; go at your own pace'))

s=BY['c-major']
mk=scale_marks(s)
top={m:f for m,f in zip(s['midi'],s['rh'])}; bot={m:f for m,f in zip(s['midi'],s['lh'])}
svg,cx=kbd(60,72,mk,ww=118,wh=300,top=top,bot=bot,fs=34)
body=f'''<div class="card" style="padding:26px 30px">{svg}
<div style="display:flex;gap:28px;justify-content:center;margin-top:12px;font-size:18px;font-weight:800"><span><span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:{T};vertical-align:-2px"></span> Right hand fingers (going up)</span><span><span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:{V};vertical-align:-2px"></span> Left hand fingers (going up)</span></div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
<div class="card" style="padding:16px 20px"><div style="font-size:21px;font-weight:800;color:{T}">Right hand: 1 2 3, thumb under, 1 2 3 4 5</div><div class="ser" style="font-size:17px;line-height:1.4;margin-top:4px">After finger 3 plays E, slide the thumb under to F. Coming down, finger 3 crosses over the thumb onto E.</div></div>
<div class="card" style="padding:16px 20px"><div style="font-size:21px;font-weight:800;color:{V}">Left hand: 5 4 3 2 1, cross 3 over, 2 1</div><div class="ser" style="font-size:17px;line-height:1.4;margin-top:4px">After the thumb plays G, finger 3 crosses over onto A. Coming down, the thumb tucks under from A to G.</div></div></div>'''
add('c-major-scale-piano-fingering',page('The first scale','C major scale on piano, with fingering for both hands',body,'Finger numbers: 1 thumb, 2 index, 3 middle, 4 ring, 5 pinky'))

def patt(s,steps,c):
    mk=scale_marks(s,c,c)
    svg,cx=kbd(span(s)[0],span(s)[1],mk,ww=62,wh=190,fs=22)
    lo,hi=span(s); W=len([m for m in range(lo,hi+1) if is_white(m)])*62
    o=''
    for i,x in enumerate(steps):
        a=cx[s['midi'][i]]; b=cx[s['midi'][i+1]]; mid=(a+b)/2; col=A if x=='H' else T
        o+=f'<path d="M{a+6} 8 Q{mid} 34 {b-6} 8" fill="none" stroke="{col}" stroke-width="3"/><circle cx="{mid}" cy="40" r="16" fill="{col}"/><text x="{mid}" y="47" text-anchor="middle" font-size="19" font-weight="800" fill="#fff">{x}</text>'
    svg+=f'<svg viewBox="-2 0 {W+4} 60" width="100%">{o}</svg>'
    return svg,''
s1,st1=patt(BY['c-major'],'WWHWWWH',G); s2,st2=patt(BY['a-minor'],'WHWWHWW',BL)
body=f'''<div class="card" style="padding:20px 26px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:26px;font-weight:800;color:{G}">Major: W W H W W W H</div><div style="font-size:17px;color:{MU};font-weight:700">C major</div></div><div style="margin-top:10px">{s1}</div></div>
<div class="card" style="padding:20px 26px;margin-top:14px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:26px;font-weight:800;color:{BL}">Natural minor: W H W W H W W</div><div style="font-size:17px;color:{MU};font-weight:700">A minor</div></div><div style="margin-top:10px">{s2}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">
<div class="card" style="padding:14px 20px"><b style="font-size:20px;color:{T}">W = whole step</b><div class="ser" style="font-size:17px;margin-top:3px">Skip one key, white or black.</div></div>
<div class="card" style="padding:14px 20px"><b style="font-size:20px;color:{A}">H = half step</b><div class="ser" style="font-size:17px;margin-top:3px">The very next key, with nothing between.</div></div></div>'''
add('major-and-minor-scale-pattern-whole-half-steps',page('The secret pattern','Every major and minor scale follows one pattern',body,'Start on any key, follow the pattern, and you have that key&#39;s scale'))

def chips(ns): return ''.join('<span style="background:#eef3f4;border-radius:999px;padding:5px 12px;font-size:17px;font-weight:800">%s</span>'%n for n in ns)
fam=[('Same fingering as C major',G,['C major','G major','D major','A major','E major','A minor','E minor','D minor'],'RH 1 2 3 1 2 3 4 5','LH 5 4 3 2 1 3 2 1','Learn it once, use it for 8 of your first 9 scales.'),
('The one exception: F major',R,['F major'],'RH 1 2 3 4 1 2 3 4','LH 5 4 3 2 1 3 2 1','The right hand uses finger 4 on B♭, so the thumb never lands on a black key.')]
cards=''.join(f'<div class="card" style="padding:18px 22px;border-top:8px solid {c}"><div style="font-size:24px;font-weight:800;color:{c}">{t}</div><div style="display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 12px">{chips(ns)}</div><div style="font-size:26px;font-weight:800;color:{T}">{r}</div><div style="font-size:26px;font-weight:800;color:{V};margin-top:2px">{l}</div><div class="ser" style="font-size:17px;line-height:1.4;margin-top:10px">{d}</div></div>' for t,c,ns,r,l,d in fam)
body=f'''<div style="display:grid;grid-template-columns:1.25fr 1fr;gap:16px">{cards}</div>
<div class="card" style="padding:14px 22px;margin-top:14px"><span class="ser" style="font-size:18px;line-height:1.45"><b style="font-family:Schibsted Grotesk,Arial">Why fingerings change:</b> the thumb is short, so we keep it off the black keys. Scales whose black keys fall in awkward places (like F major&#39;s B♭) need a different pattern.</span></div>'''
add('piano-scale-fingering-chart-for-beginners',page('Fingering made simple','One fingering pattern covers 8 of your first 9 scales',body,'One-octave fingerings, hands separately, going up'))

s=BY['c-major']; mk=scale_marks(s)
top={m:f for m,f in zip(s['midi'],s['rh'])}
svg,cx=kbd(60,72,mk,ww=118,wh=260,top=top,fs=32)
arc=f'<svg viewBox="0 0 1060 120" width="100%"><path d="M{cx[64]*1060/(8*118)} 20 C {cx[64]*1060/(8*118)} 100, {cx[65]*1060/(8*118)} 100, {cx[65]*1060/(8*118)} 20" fill="none" stroke="{A}" stroke-width="6" marker-end="url(#ah)"/><defs><marker id="ah" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="{A}"/></marker></defs><text x="{(cx[64]+cx[65])/2*1060/(8*118)}" y="112" text-anchor="middle" font-size="22" font-weight="800" fill="{INK}">thumb passes under finger 3</text></svg>'
tips=[('Keep the wrist level','Don&#39;t let the wrist dip or the elbow flap out when the thumb moves. The thumb does the travelling.'),('Move the thumb early','As finger 2 plays, start sliding the thumb under so it&#39;s already over F when you need it.'),('Listen for bumps','The thumb note should be no louder than the others. Play slowly until the scale sounds even.')]
tl=''.join(f'<div class="card" style="padding:14px 18px"><div style="font-size:20px;font-weight:800">{a}</div><div class="ser" style="font-size:16.5px;line-height:1.4;margin-top:3px">{b}</div></div>' for a,b in tips)
body=f'<div class="card" style="padding:22px 28px">{svg}{arc}</div><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px">{tl}</div>'
add('thumb-under-piano-scale-technique',page('The tricky bit','How the thumb-under move works',body,'Right hand going up; coming down, finger 3 crosses over the thumb'))

def mini(s,ww=40,wh=140):
    mk=scale_marks(s)
    lo,hi=span(s)
    svg,cx=kbd(lo,hi,mk,ww=ww,wh=wh,fs=15)
    return svg
cards=''
for sid,c in [('g-major',G),('f-major',R),('d-major',BL),('a-major',V),('e-major',A),('a-minor',T)]:
    s=BY[sid]
    cards+=f'<div class="card" style="padding:14px 18px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:24px;font-weight:800;color:{c}">{s["name"]}</div><div style="font-size:14.5px;font-weight:700;color:{MU}">{s["sig"].split(" (")[0]}</div></div><div style="margin:8px 0">{mini(s)}</div><div style="font-size:16px;font-weight:700"><span style="color:{T}">RH {" ".join(map(str,s["rh"]))}</span> &#183; <span style="color:{V}">LH {" ".join(map(str,s["lh"]))}</span></div></div>'
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">{cards}</div><div style="margin-top:12px;font-size:16px;color:{MU};font-weight:700"><span style="color:{G}">&#9632;</span> white keys in the scale &#160; <span style="color:{A}">&#9632;</span> black keys in the scale</div>'
add('beginner-piano-scales-chart',page('Cheat sheet','Beginner piano scales chart: notes and fingerings',body,'One octave, going up; come down the same keys with the fingers reversed'))

a=BY['a-minor']
def minor_row(title,notes,midi,c,desc):
    mk={m:(c if is_white(m) else A,n) for n,m in zip(notes,midi)}
    svg,cx=kbd(57,69,mk,ww=62,wh=170,fs=20)
    return f'<div class="card" style="padding:16px 22px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:20px"><div style="font-size:24px;font-weight:800;color:{c}">{title}</div><div class="ser" style="font-size:16.5px;text-align:right">{desc}</div></div><div style="margin-top:8px">{svg}</div></div>'
rows=minor_row('Natural minor',a['notes'],a['midi'],BL,'Just the white keys from A to A.')
rows+=minor_row('Harmonic minor',['A','B','C','D','E','F','G♯','A'],[57,59,60,62,64,65,68,69],V,'Raise the 7th note: G becomes G♯.')
rows+=minor_row('Melodic minor (going up)',['A','B','C','D','E','F♯','G♯','A'],[57,59,60,62,64,66,68,69],R,'Raise the 6th and 7th going up; come down as natural minor.')
body=f'<div style="display:grid;gap:12px">{rows}</div>'
add('a-minor-scale-natural-harmonic-melodic',page('Minor scales','The 3 kinds of A minor scale, side by side',body,'Start with natural minor; add harmonic and melodic once it&#39;s easy'))

def row2(title,notes,midi,c,desc,lo=60,hi=72):
    mk={m:(c if is_white(m) else A,n) for n,m in zip(notes,midi)}
    svg,cx=kbd(lo,hi,mk,ww=62,wh=170,fs=20)
    return f'<div class="card" style="padding:16px 22px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:20px"><div style="font-size:24px;font-weight:800;color:{c}">{title}</div><div class="ser" style="font-size:16.5px;text-align:right">{desc}</div></div><div style="margin-top:8px">{svg}</div></div>'
rows=row2('C major pentatonic',['C','D','E','G','A','C'],[60,62,64,67,69,72],G,'5 notes: the major scale without F and B.')
rows+=row2('A minor pentatonic',['A','C','D','E','G','A'],[57,60,62,64,67,69],BL,'Same 5 notes as C major pentatonic, starting on A.',57,69)
rows+=row2('C blues scale',['C','E♭','F','F♯','G','B♭','C'],[60,63,65,66,67,70,72],R,'C minor pentatonic (C E♭ F G B♭) plus one &#8220;blue&#8221; note, F♯.')
body=f'<div style="display:grid;gap:12px">{rows}</div><div class="card" style="padding:12px 20px;margin-top:12px"><span class="ser" style="font-size:17.5px">Try this: hold a C chord in the left hand and play any notes of the C major pentatonic in the right. It&#39;s almost impossible to sound wrong.</span></div>'
add('pentatonic-and-blues-scales-piano',page('The fun scales','Pentatonic and blues scales for beginners',body,'Great first steps into improvising'))

ch=list(range(60,73)); fing={}
for m in ch:
    fing[m]=3 if not is_white(m) else (2 if m%12 in (5,0) and m!=60 else 1)
CN={0:'C',1:'C♯',2:'D',3:'D♯',4:'E',5:'F',6:'F♯',7:'G',8:'G♯',9:'A',10:'A♯',11:'B'}
mk={m:((G if is_white(m) else A),CN[m%12]) for m in ch}
svg,cx=kbd(60,72,mk,ww=118,wh=260,top=fing,fs=30)
body=f'''<div class="card" style="padding:22px 28px">{svg}</div>
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px">
<div class="card" style="padding:14px 18px;border-top:6px solid {A}"><div style="font-size:22px;font-weight:800">3 on every black key</div></div>
<div class="card" style="padding:14px 18px;border-top:6px solid {G}"><div style="font-size:22px;font-weight:800">1 on the other white keys</div></div>
<div class="card" style="padding:14px 18px;border-top:6px solid {T}"><div style="font-size:22px;font-weight:800">2 on F and C, where two white keys sit together</div></div></div>'''
add('chromatic-scale-piano-fingering',page('Every key','Chromatic scale fingering for the right hand',body,'Going up from middle C. Left hand: 3 on the black keys, 1 and 2 on the whites'))

def arp(name,midi,notes,c):
    mk={m:(c if is_white(m) else A,n) for n,m in zip(notes,midi)}
    top={m:f for m,f in zip(midi,[1,2,3,5])}; bot={m:f for m,f in zip(midi,[5,4,2,1])}
    lo=midi[0]
    while lo%12 not in (0,5): lo-=1
    hi=midi[-1]
    while hi%12 not in (4,11): hi+=1
    svg,cx=kbd(lo,hi,mk,ww=46,wh=150,top=top,bot=bot,fs=16)
    return f'<div class="card" style="padding:14px 18px"><div style="font-size:24px;font-weight:800;color:{c}">{name}</div><div style="margin-top:6px">{svg}</div></div>'
cards=arp('C major arpeggio',[60,64,67,72],['C','E','G','C'],G)+arp('G major arpeggio',[55,59,62,67],['G','B','D','G'],BL)+arp('F major arpeggio',[53,57,60,65],['F','A','C','F'],R)+arp('A minor arpeggio',[57,60,64,69],['A','C','E','A'],V)
body=f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">{cards}</div>
<div style="display:flex;gap:28px;justify-content:center;margin-top:14px;font-size:18px;font-weight:800"><span><span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:{T};vertical-align:-2px"></span> Right hand 1 2 3 5</span><span><span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:{V};vertical-align:-2px"></span> Left hand 5 4 2 1</span></div>'''
add('beginner-piano-arpeggios-chart',page('Next step','Beginner piano arpeggios chart',body,'One octave, hands separately; arpeggios are the chord&#39;s notes played one at a time'))

blocks=[('2 min','Hands separately, slowly','Say the finger numbers out loud.',G),('3 min','Today&#39;s focus scale','Metronome on. Three clean runs in a row, then climb one rung of the ladder.',R),('3 min','Review one older scale','Keep it from slipping away.',BL),('2 min','Play with it','Pentatonic over a chord, or the scale in a rhythm.',A)]
bl=''.join(f'<div class="card" style="padding:14px 20px;display:flex;gap:20px;align-items:center;border-left:10px solid {c}"><div style="flex:none;width:96px;font-size:30px;font-weight:800;color:{c}">{m}</div><div><div style="font-size:21px;font-weight:800">{t}</div><div class="ser" style="font-size:16.5px;margin-top:2px">{d}</div></div></div>' for m,t,d,c in blocks)
lad=[('60','1 note per click'),('60','2 notes per click'),('80','2 notes per click'),('100','2 notes per click'),('Hands together','back to 60, 1 per click')]
ld=''.join(f'<div style="display:flex;align-items:center;gap:14px;padding:10px 0;border-top:1px solid {LINE}"><div style="flex:none;width:44px;height:44px;border-radius:50%;background:{T};color:#fff;display:grid;place-items:center;font-weight:800">{i+1}</div><div><div style="font-size:20px;font-weight:800">{a}{" bpm" if a.isdigit() else ""}</div><div class="ser" style="font-size:16px">{b}</div></div></div>' for i,(a,b) in enumerate(lad))
body=f'<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:16px"><div style="display:grid;gap:10px;align-content:start">{bl}</div><div class="card" style="padding:12px 22px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">THE TEMPO LADDER</div>{ld}</div></div>'
add('how-to-practice-piano-scales-routine',page('Practice','A 10-minute daily scale routine',body,'Move up a step only after three clean runs in a row'))

def feat(h,t1,t2):
    s=BY['c-major']; mk=scale_marks(s)
    top={m:f for m,f in zip(s['midi'],s['rh'])}
    svg,cx=kbd(60,72,mk,ww=62,wh=230,top=top,fs=20)
    tiles=''.join(f'<span style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:8px 12px;font-size:19px;font-weight:700">{x}</span>' for x in ['9 scales','Fingerings','Free chart','Play along'])
    return f'''<!doctype html><html><head><meta charset="utf-8">{FONT}<style>*{{margin:0;box-sizing:border-box}}body{{width:1200px;height:{h}px;background:radial-gradient(circle at 78% 22%,#21485a,#0f1a20 70%);font-family:"Schibsted Grotesk",Arial,sans-serif;color:#fff;overflow:hidden;position:relative}}</style></head><body>
<div style="position:absolute;left:64px;top:{t1}px;width:600px"><div style="font-size:22px;font-weight:800;letter-spacing:.16em;color:#f6b31e">A PIANO TEACHER&#39;S GUIDE</div><div style="font-size:86px;font-weight:800;line-height:.96;margin:12px 0 18px">Piano Scales for Beginners</div><div style="font-size:27px;font-weight:500;line-height:1.3;color:#cfe3ea">Which scales to learn first, the fingerings, and a 10-minute routine</div><div style="display:flex;gap:10px;margin-top:22px;flex-wrap:wrap">{tiles}</div></div>
<div style="position:absolute;right:50px;top:{t2}px;width:470px;background:#f3f6f7;border-radius:22px;padding:22px 20px 16px"><div style="font-size:20px;font-weight:800;color:#15191c;margin:0 0 6px 4px">C major &#183; right hand</div>{svg}</div>
<div style="position:absolute;left:64px;bottom:34px;font-size:20px;font-weight:800;letter-spacing:.14em;color:#8fd0a8">PIANOERS.COM</div></body></html>'''
jobs.append(dict(name='piano-scales-for-beginners-featured',w=1200,h=675,html=feat(675,110,170)))
jobs.append(dict(name='piano-scales-for-beginners-social',w=1200,h=630,html=feat(630,88,150)))
json.dump(jobs,open('jobs.json','w'))
print(len(jobs))
