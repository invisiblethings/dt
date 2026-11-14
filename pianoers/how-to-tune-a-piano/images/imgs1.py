import json, math
from page import page
from kb import keyboard, white_seq
imgs={}
T='#2e6475';A='#f6b31e';G='#2f9e5b';R='#c2412d';BL='#3b6fd1';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'

def wave(f,w,h,amp,cols,secs=1.0,n=900,env=False):
    pts=[]
    for i in range(n+1):
        t=i/n*secs
        if env: y=math.cos(2*math.pi*(f[0]-f[1])/2*t)
        else: y=sum(math.sin(2*math.pi*x*t) for x in f)/len(f)
        pts.append(f'{i/n*w:.1f},{h/2-y*amp:.1f}')
    return ' '.join(pts)
W=1040
def wv(freqs,amp,stroke,env=False,width=1.4): return f'<polyline points="{wave(freqs,W,140,amp,None,env=env,n=2400)}" fill="none" stroke="{stroke}" stroke-width="{width}"/>'
sumpts=[]
for i in range(3001):
    t=i/3000
    y=(math.sin(2*math.pi*40*t)+math.sin(2*math.pi*42*t))/2
    sumpts.append(f'{i/3000*W:.1f},{70-y*58:.1f}')
env_top=' '.join(f'{i/300*W:.1f},{70-abs(math.cos(math.pi*2*t))*58:.1f}' for i in range(301) for t in [i/300])
body=f'''<div class="card" style="padding:18px 26px">
<div style="display:flex;justify-content:space-between;font-size:18px;font-weight:700;color:{MU}"><span>Two strings a little out of tune, sounding together</span><span>1 second</span></div>
<svg viewBox="0 0 {W} 150" width="100%"><polyline points="{' '.join(sumpts)}" fill="none" stroke="{T}" stroke-width="1.2"/><polyline points="{env_top}" fill="none" stroke="{A}" stroke-width="4" stroke-dasharray="2 0"/>
<text x="{W*0.25:.0f}" y="146" text-anchor="middle" font-size="16" font-weight="700" fill="{MU}">quiet</text><text x="{W*0.5:.0f}" y="146" text-anchor="middle" font-size="17" font-weight="800" fill="{INK}">beat 2 (loud)</text><text x="{W*0.75:.0f}" y="146" text-anchor="middle" font-size="16" font-weight="700" fill="{MU}">quiet</text><text x="6" y="146" font-size="17" font-weight="800" fill="{INK}">beat 1</text></svg>
<div style="font-size:15px;color:{MU};margin-top:4px">The two notes add up into a sound that swells and fades: &#8220;wah-wah-wah&#8221;. Each swell is one beat: here, two beats in one second. (Frequencies scaled down to make the waves visible.)</div></div>
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:16px">
<div class="card" style="padding:16px 18px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">THE RULE</div><div style="font-size:23px;font-weight:800;margin:4px 0">Beats per second = the difference in Hz</div><div style="font-size:17px;{SER};line-height:1.4">440 Hz and 442 Hz together beat twice a second.</div></div>
<div class="card" style="padding:16px 18px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">UNISONS</div><div style="font-size:23px;font-weight:800;margin:4px 0">Turn until the beats stop</div><div style="font-size:17px;{SER};line-height:1.4">When two strings of one note match exactly, the wah-wah disappears.</div></div>
<div class="card" style="padding:16px 18px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">INTERVALS</div><div style="font-size:23px;font-weight:800;margin:4px 0">Some beats are meant to stay</div><div style="font-size:17px;{SER};line-height:1.4">In equal temperament, 4ths, 5ths and 3rds beat at set speeds. That&#39;s how tuners set the temperament by ear.</div></div></div>'''
imgs['piano-tuning-beats-explained']=(780,page(760,'Listening','What &#8220;beats&#8221; are, and why tuners listen for them',body,'Beat rate is the difference between the two frequencies'))

def strings(n,x,label,sub,col):
    s=''.join(f'<line x1="{x+i*14}" y1="40" x2="{x+i*14}" y2="230" stroke="{INK}" stroke-width="{4 if n==1 else 2.6}"/>' for i in range(n))
    pins=''.join(f'<circle cx="{x+i*14}" cy="34" r="6" fill="#9aa9ae" stroke="{INK}" stroke-width="1.5"/>' for i in range(n))
    hammer=f'<rect x="{x-14}" y="190" width="{(n-1)*14+28}" height="22" rx="6" fill="{col}" opacity="0.9"/>'
    return s+pins+hammer+f'<text x="{x+(n-1)*7}" y="262" text-anchor="middle" font-size="20" font-weight="800" fill="{INK}">{label}</text><text x="{x+(n-1)*7}" y="286" text-anchor="middle" font-size="15" fill="{MU}">{sub}</text>'
svg=f'<svg viewBox="0 0 1000 300" width="100%">{strings(1,140,"Lowest bass","1 string per note",BL)}{strings(2,480,"Upper bass","2 strings per note",T)}{strings(3,820,"Tenor and treble","3 strings per note",A)}</svg>'
body=f'''<div class="card" style="padding:18px 26px">{svg}</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px">
<div class="card" style="padding:16px 20px"><div style="font-size:21px;font-weight:800">One hammer, several strings</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:4px">Each key&#39;s hammer strikes all the strings of its note at once. Those strings must match exactly, or the note sounds sour.</div></div>
<div class="card" style="padding:16px 20px"><div style="font-size:21px;font-weight:800">Tuning the unisons</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:4px">Tuners first tune one string of each note, then tune the others to it until the beats disappear. On most pianos, the great majority of notes have three strings.</div></div></div>'''
imgs['piano-strings-per-note-unisons']=(740,page(640,'How pianos are strung','Why one piano note can have three strings',body,'Exact string counts vary between pianos'))

Wk=white_seq('A3','A5')
fill={'A3':'#cfe3ea','A4':A,'A5':'#cfe3ea'}
sv,w=keyboard(Wk,0,0,42,170,26,106,fill,{'A3':'A3','A4':'A4','A5':'A5','C4':'C4'},None,None,17,11)
lab=lambda n,hz,c,a='middle': f'<text x="{Wk.index(n)*42+(0 if a=="start" else 42 if a=="end" else 21)}" y="-14" text-anchor="{a}" font-size="18" font-weight="800" fill="{c}">{hz}</text>'
body=f'''<div class="card" style="padding:16px 22px"><svg viewBox="-4 -40 {w+8} 216" width="100%">{lab('A3','220 Hz',T,'start')}{lab('C4','261.6 Hz',MU)}{lab('A4','440 Hz',INK)}{lab('A5','880 Hz',T,'end')}{sv}</svg></div>
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:16px">
<div class="card" style="padding:16px 18px;border-top:6px solid {A}"><div style="font-size:21px;font-weight:800">A4 = 440 Hz</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:4px">The standard pitch. The A above middle C vibrates 440 times a second. Tuners set this note first.</div></div>
<div class="card" style="padding:16px 18px;border-top:6px solid {T}"><div style="font-size:21px;font-weight:800">Octave = double</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:4px">Each A up the keyboard is twice the frequency of the one below: 220, 440, 880 Hz.</div></div>
<div class="card" style="padding:16px 18px;border-top:6px solid {G}"><div style="font-size:21px;font-weight:800">12 equal steps</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:4px">Equal temperament splits the octave into 12 equal semitones, each about 5.9% higher than the last.</div></div></div>'''
imgs['a440-equal-temperament']=(900,page(660,'The target','A440 and equal temperament, on the keyboard',body,'Frequencies before stretch tuning'))

pts=[]
for i in range(89):
    x=i/88
    c=-28*(1-x/0.42)**2.2 if x<0.42 else (34*((x-0.52)/0.48)**2.3 if x>0.52 else 0)
    pts.append((i,c))
cx=lambda i:40+i*10.4; cy=lambda c:150-c*3.2
path=' '.join(f'{cx(i):.1f},{cy(c):.1f}' for i,c in pts)
grid=''.join(f'<line x1="40" x2="955" y1="{cy(v)}" y2="{cy(v)}" stroke="{LINE}" stroke-width="1.2"/><text x="30" y="{cy(v)+5}" text-anchor="end" font-size="14" fill="{MU}">{v:+d}</text>' for v in (-30,-15,0,15,30))
body=f'''<div class="card" style="padding:18px 22px"><svg viewBox="0 0 980 300" width="100%">{grid}<line x1="40" x2="955" y1="{cy(0)}" y2="{cy(0)}" stroke="{MU}" stroke-width="2" stroke-dasharray="6 5"/>
<polyline points="{path}" fill="none" stroke="{A}" stroke-width="5" stroke-linecap="round"/>
<text x="497" y="{cy(0)-12}" text-anchor="middle" font-size="16" font-weight="700" fill="{MU}">pure equal temperament</text>
<text x="70" y="290" font-size="17" font-weight="800" fill="{INK}">Lowest bass</text><text x="497" y="290" text-anchor="middle" font-size="17" font-weight="800" fill="{INK}">Middle of the keyboard</text><text x="945" y="290" text-anchor="end" font-size="17" font-weight="800" fill="{INK}">Highest treble</text>
<text x="10" y="16" font-size="14" fill="{MU}">cents</text></svg></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px">
<div class="card" style="padding:16px 20px"><div style="font-size:21px;font-weight:800">Why the curve exists</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:4px">Piano strings are stiff, so their overtones run slightly sharp (inharmonicity). To make octaves sound clean, tuners stretch them: the treble a little sharp, the bass a little flat.</div></div>
<div class="card" style="padding:16px 20px"><div style="font-size:21px;font-weight:800">Why a guitar tuner won&#39;t do</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:4px">A chromatic tuner aims every note at the dashed line. Piano tuning apps measure your piano and calculate its own stretch.</div></div></div>'''
imgs['piano-stretch-tuning-curve']=(780,page(700,'Stretch tuning','Pianos are not tuned &#8220;perfectly&#8221;, on purpose',body,'Typical shape (the Railsback curve); the exact amount differs on every piano. 100 cents = 1 semitone.'))

up=f'''<svg viewBox="0 0 640 560" overflow="visible" width="100%">
<rect x="40" y="20" width="560" height="520" rx="18" fill="#3b2a1f"/>
<rect x="70" y="50" width="500" height="70" rx="8" fill="#a77a52"/><text x="320" y="44" text-anchor="middle" font-size="15" fill="#f0e2d0">case</text>
{''.join(f'<circle cx="{95+i*28}" cy="85" r="7" fill="#c9d3d7" stroke="#15191c" stroke-width="1.5"/>' for i in range(17))}
{''.join(f'<line x1="{95+i*28}" y1="92" x2="{110+i*26}" y2="470" stroke="#d9c27a" stroke-width="2.2"/>' for i in range(17))}
<path d="M90 400 Q 330 360 560 330" fill="none" stroke="#7a5233" stroke-width="12" stroke-linecap="round"/>
{''.join(f'<circle cx="{110+i*26}" cy="478" r="4" fill="#9aa9ae"/>' for i in range(17))}
<rect x="80" y="250" width="490" height="26" rx="6" fill="#efe6d8" stroke="#9a8a70"/>
{''.join(f'<rect x="{92+i*28}" y="226" width="14" height="22" rx="3" fill="#2f2f2f"/>' for i in range(17))}
{''.join(f'<g><circle cx="{x}" cy="{y}" r="17" fill="{c}" stroke="#fff" stroke-width="3"/><text x="{x}" y="{y+6}" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">{n}</text></g>' for n,x,y,c in [(1,612,85,A),(2,580,170,T),(3,600,237,MU),(4,612,263,BL),(5,585,335,G)])}
</svg>'''
def tag(y,x,t,d,c):
    return f'<div style="position:absolute;left:{x}px;top:{y}px;display:flex;gap:10px;align-items:flex-start;width:470px"><span style="flex:none;width:30px;height:30px;border-radius:50%;background:{c};color:#fff;display:grid;place-items:center;font-weight:800">{t[0]}</span><div><b style="font-size:21px">{t[1:]}</b><div style="font-size:17px;{SER};line-height:1.35">{d}</div></div></div>'
body=f'''<div style="position:relative;height:640px"><div class="card" style="position:absolute;left:0;top:0;width:560px;padding:16px">{up}</div>
{tag(20,600,'1Tuning pins','Steel pins held tight in the wooden pin block. Turning one changes the tension of its string. This is where the tuning lever goes.',A)}
{tag(140,600,'2Strings','Steel strings (copper-wound in the bass) run from the pins down to hitch pins at the bottom.',T)}
{tag(250,600,'3Dampers','Felt pads that silence the strings when you let go of a key. Mutes do the same job while you tune.',MU)}
{tag(360,600,'4Hammers','Felt-covered hammers strike the strings. Each one hits all the strings of its note.',BL)}
{tag(470,600,'5Bridge and soundboard','The bridge passes the vibration to the soundboard, which makes the sound loud.',G)}</div>'''
imgs['inside-upright-piano-tuning-pins']=(820,page(820,'Inside the piano','Where tuning happens inside an upright piano',body,'Simplified diagram, not to scale'))
json.dump(imgs,open('imgs1.json','w'))
