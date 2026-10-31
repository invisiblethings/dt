import json
from page import page
from kb import keyboard, white_seq
imgs={}
T='#2e6475';A='#f6b31e';G='#2f9e5b';BL='#3b6fd1';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'

def chain(items):
    out=''
    for i,(lab,sub) in enumerate(items):
        if i: out+=f'<span style="font-size:28px;color:{MU};font-weight:800">&#8594;</span>'
        out+=f'<span style="background:#fff;border:2px solid {LINE};border-radius:12px;padding:8px 14px;text-align:center;white-space:nowrap"><b style="font-size:19px;display:block">{lab}</b><span style="font-size:15px;color:{MU}">{sub}</span></span>'
    return f'<div style="display:flex;align-items:center;gap:10px">{out}</div>'
rows=[('PC OR MAC',T,[('Keyboard','USB &#8220;to host&#8221; port'),('USB cable','USB-B to USB-A or USB-C'),('Computer','Windows or macOS')]),
('IPAD',BL,[('Keyboard','USB port'),('USB cable','plus Apple camera adapter on Lightning iPads'),('iPad','iPadOS 9.3 or later')]),
('ANDROID',G,[('Keyboard','USB port'),('USB OTG adapter','or a USB-C cable'),('Tablet or Chromebook','ChromeOS 65+ for USB MIDI')]),
('OLDER KEYBOARD','#b07a00',[('Keyboard','5-pin MIDI OUT/IN'),('MIDI-to-USB interface','two round plugs, one USB'),('Any device','PC, Mac, iPad, Android')]),
('NO KEYBOARD',MU,[('Your computer keyboard','virtual piano mapping'),('Synthesia','labels show which key to type')])]
rr=''.join(f'<div style="display:flex;align-items:center;gap:18px;padding:10px 0;border-top:1px solid {LINE}"><span style="width:190px;flex:none;font-size:18px;font-weight:800;color:{c}">{n}</span>{chain(it)}</div>' for n,c,it in rows)
body=f'''<div class="card" style="padding:8px 24px 12px">{rr}</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
<div class="card" style="padding:16px 20px"><div style="font-size:20px;font-weight:800">Bluetooth MIDI</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:4px">Synthesia added support for Windows 10 Bluetooth MIDI in 2017. A cable is still the most reliable way to connect.</div></div>
<div class="card" style="padding:16px 20px"><div style="font-size:20px;font-weight:800">Test before you pay</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:4px">Every MIDI feature, including key lights, works in the free version, so you can check your setup first.</div></div></div>'''
imgs['how-to-connect-keyboard-to-synthesia']=(830,page(830,'Setup','How to connect a keyboard to Synthesia',body,'Based on Synthesia&#39;s keyboard and About pages'))

ev=[('2006','Released as &#8220;Piano Hero&#8221;, free and funded by donations'),('2007','Renamed Synthesia after a request from Activision; Mac version'),('2008','The paid Learning Pack arrives with a sheet music view'),('2012','Synthesia launches on iPad'),('2013','The Music Store opens with licensed MIDI songs'),('2014','Android tablets; version 10'),('2018','Chromebook support'),('2021','Multi-track recorder; 10.8 adds MusicXML and Apple silicon'),('2022','Version 10.9 improves Free Play and labels')]
n=len(ev); w=1080
xs=[i*(w/(n-1)) for i in range(n)]
dots=''.join(f'<circle cx="{x:.0f}" cy="60" r="13" fill="{T if i%2==0 else G}"/><text x="{x:.0f}" y="{30 if i%2==0 else 104}" text-anchor="middle" font-size="22" font-weight="800" fill="{INK}">{y}</text>' for i,(x,(y,_)) in enumerate(zip(xs,ev)))
svg=f'<svg viewBox="-30 0 {w+60} 120" width="100%"><line x1="0" x2="{w}" y1="60" y2="60" stroke="{LINE}" stroke-width="6"/>{dots}</svg>'
cards=''.join(f'<div class="card" style="padding:12px 16px"><div style="font-size:20px;font-weight:800;color:{T if i%2==0 else G}">{y}</div><div style="font-size:17px;{SER};line-height:1.38;margin-top:2px">{t}</div></div>' for i,(y,t) in enumerate(ev))
body=f'<div class="card" style="padding:16px 24px">{svg}</div><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px">{cards}</div>'
imgs['synthesia-history-timeline']=(740,page(740,'History','Synthesia: from Piano Hero to version 10.9',body,'Source: Synthesia&#39;s About page and news archive'))

steps=[('1','One hand at a time','Melody practice, right hand first. Synthesia waits for each note.',G),('2','Then the other hand','Same bars, left hand, until both feel easy.',G),('3','Hands together, slowly','Melody practice with both hands, then raise the speed.',BL),('4','Rhythm practice','Now the beat counts. Keep the tempo low and steady.',BL),('5','Turn on sheet music','Read the staff (F2) while the falling notes check you.',T),('6','Recital','Play it through at full speed for your 100-point score.',T)]
sc=''.join(f'<div class="card" style="padding:18px 20px"><div style="display:flex;align-items:center;gap:12px"><span style="width:40px;height:40px;border-radius:50%;background:{c};color:#fff;display:grid;place-items:center;font-size:22px;font-weight:800">{a}</span><span style="font-size:22px;font-weight:800;line-height:1.15">{b}</span></div><div style="font-size:18px;{SER};line-height:1.42;margin-top:8px">{d}</div></div>' for a,b,d,c in steps)
body=f'<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px">{sc}</div><div class="card" style="padding:16px 22px;margin-top:16px;font-size:19px;line-height:1.45"><b>Work in short sections.</b> Click the timeline to jump to the hard bars and loop just those, instead of starting from the top every time.</div>'
imgs['how-to-learn-a-song-with-synthesia']=(680,page(680,'Method','How to actually learn a song with Synthesia',body,'A teacher&#39;s routine using Synthesia&#39;s built-in modes'))

sk=[('Finding the right keys','Strong','#1f7a4d'),('Playing songs you love','Strong','#1f7a4d'),('Hands separately and together','Strong','#1f7a4d'),('Rhythm and steady tempo','Good, in rhythm practice','#2f9e5b'),('Finger numbers','Good, if the song has hints','#2f9e5b'),('Reading sheet music','Only if you turn it on','#b07a00'),('Chords, scales and theory','Not taught','#b3261e'),('Technique, posture, tone','Not taught','#b3261e'),('Playing by ear and improvising','Not taught','#b3261e')]
rw=''.join(f'<div style="display:grid;grid-template-columns:minmax(0,1fr) 330px;align-items:center;padding:11px 0;border-top:1px solid {LINE}"><span style="font-size:21px;font-weight:700">{a}</span><span style="justify-self:end;padding:7px 14px;border-radius:999px;background:{c};color:#fff;font-size:17px;font-weight:800">{b}</span></div>' for a,b,c in sk)
body=f'<div class="card" style="padding:8px 26px 12px">{rw}</div><div style="margin-top:14px;font-size:18px;color:{MU};line-height:1.4">Synthesia is a practice tool. Pair it with a method, a course or a teacher for the skills in red.</div>'
imgs['is-synthesia-good-for-learning-piano']=(820,page(820,'Learning','Is Synthesia good for learning piano?',body,'The reviewer&#39;s assessment as a piano teacher'))

apps=[('Synthesia','PC, Mac, iPad, Android','Falling notes, optional sheet music','$29 one-time (sale)','Any song from a MIDI file','#2f9e5b'),('Simply Piano','Phone or tablet','Guided game-style lessons','Subscription','Total beginners who want a path',T),('Flowkey','Phone, tablet, computer','Videos of real hands plus sheet music','Free tier or subscription','Popular songs and reading','#b07a00'),('Piano Marvel','Computer, tablet, phone','Sheet music and sight-reading tests','Free plan or subscription','Learning to read music',BL),('Pianoforall','Computer, tablet','Video lessons in ebooks','$49 one-time','Chords, rhythm, playing by ear','#7a4fd0'),('PianoVision','Meta Quest headset','Notes fall onto your real keys','$9.99 + optional Plus','Mixed reality practice','#6b3fd4')]
hd=['App','Runs on','How it teaches','Price','Best for']
th=''.join(f'<th style="padding:12px 10px;font-size:16px;text-align:left;color:{MU};letter-spacing:.06em;text-transform:uppercase">{x}</th>' for x in hd)
tr=''.join(f'<tr style="border-top:1px solid {LINE}"><td style="padding:13px 10px;font-size:21px;font-weight:800;color:{c};white-space:nowrap">{a}</td><td style="padding:13px 10px;font-size:18px">{b}</td><td style="padding:13px 10px;font-size:18px">{d}</td><td style="padding:13px 10px;font-size:18px">{e}</td><td style="padding:13px 10px;font-size:18px;font-weight:700">{f}</td></tr>' for a,b,d,e,f,c in apps)
body=f'<div class="card" style="padding:8px 18px"><table style="width:100%;border-collapse:collapse"><tr>{th}</tr>{tr}</table></div><div style="margin-top:14px;font-size:17px;color:{MU}">Prices checked October 2026. See the full Pianoers.com review of each app for details.</div>'
imgs['synthesia-alternatives']=(800,page(800,'Comparison','Synthesia vs the best alternatives',body,'Pianoers.com app reviews'))

buy=['You want to play specific songs, fast','Sheet music scares you off the piano','You love MIDI files and YouTube tutorials','You have a teacher and want a fun practice tool','You want to pay once, not every month']
skip=['You want a full course from zero','You want to read music fluently','You want to learn chords, theory or improvising','You only have an acoustic piano without MIDI','You need feedback on technique and posture']
def col(t,items,c,bg,mark):
    li=''.join(f'<div style="display:flex;gap:12px;padding:10px 0;border-top:1px solid {LINE}"><span style="flex:none;width:28px;height:28px;border-radius:50%;background:{c};color:#fff;display:grid;place-items:center;font-weight:800">{mark}</span><span style="font-size:19px;line-height:1.4">{x}</span></div>' for x in items)
    return f'<div class="card" style="padding:20px 24px;background:{bg}"><div style="font-size:25px;font-weight:800;color:{c};margin-bottom:6px">{t}</div>{li}</div>'
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">{col("Synthesia is for you if…",buy,"#1f7a4d","#f2faf5","&#10003;")}{col("Choose something else if…",skip,"#b3261e","#fdf3f2","&#10005;")}</div>'
imgs['who-should-use-synthesia']=(540,page(540,'Verdict','Who should use Synthesia?',body))

def scene(W,ww,wh,notes,h):
    fl={}
    for n,y,d,hd in notes:
        if y==0: fl[n]='#d8f0e1' if hd=='R' else '#dbe6fb'
    sv,w=keyboard(W,0,0,ww,wh,ww*0.6,wh*0.62,fl,{},None,None,13,10)
    s=''
    for n,y,dy,hand in notes:
        k=W.index(n); x=k*ww+ww*0.12
        s+=f'<rect x="{x:.1f}" y="{-y-dy-4:.1f}" width="{ww*0.76:.1f}" height="{dy:.1f}" rx="5" fill="{G if hand=="R" else BL}"/>'
    return f'<svg viewBox="-4 -{h} {w+8} {h+wh+6}" width="100%">{s}{sv}<line x1="0" y1="-2" x2="{w}" y2="-2" stroke="{A}" stroke-width="5"/></svg>'
NT=[("E4",0,40,"R"),("E4",48,40,"R"),("F4",96,40,"R"),("G4",144,40,"R"),("G4",192,40,"R"),("F4",240,40,"R"),("E4",288,40,"R"),("C3",0,130,"L"),("G3",0,130,"L"),("C3",140,130,"L"),("G3",140,130,"L")]
hero=scene(white_seq('C3','B4'),40,170,NT,340)
ft='''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet"><style>*{margin:0;box-sizing:border-box}body{width:1200px;height:HHpx;background:radial-gradient(circle at 75% 20%,#2c3a40,#121618 70%);font-family:"Schibsted Grotesk",Arial,sans-serif;color:#fff;overflow:hidden;position:relative}</style></head><body>
<div style="position:absolute;left:64px;top:T1px;width:540px"><div style="font-size:22px;font-weight:800;letter-spacing:.16em;color:#f6b31e">HONEST REVIEW · 2026</div><div style="font-size:84px;font-weight:800;line-height:.98;margin:12px 0 18px">Synthesia Piano Review</div><div style="font-size:28px;font-weight:500;line-height:1.3;color:#cfe0e5">Is the falling-notes piano game worth it?</div>
<div style="display:flex;gap:12px;margin-top:26px"><span style="background:#f6b31e;color:#1b1400;font-weight:800;font-size:22px;padding:10px 18px;border-radius:12px">3.9 / 5</span><span style="background:rgba(255,255,255,.12);font-weight:700;font-size:22px;padding:10px 18px;border-radius:12px">$29 one-time</span></div></div>
<div style="position:absolute;right:40px;top:T2px;width:540px">HERO</div>
<div style="position:absolute;left:64px;bottom:34px;font-size:20px;font-weight:800;letter-spacing:.14em;color:#8fd0a8">PIANOERS.COM</div></body></html>'''.replace('HERO',hero)
imgs['synthesia-piano-review-featured']=(675,ft.replace('HH','675').replace('T1','120').replace('T2','80'))
imgs['synthesia-piano-review-social']=(630,ft.replace('HH','630').replace('T1','100').replace('T2','58'))
big=scene(white_seq('C3','B5'),50,230,[("E4",0,60,"R"),("E4",72,60,"R"),("F4",144,60,"R"),("G4",216,60,"R"),("G4",288,60,"R"),("C3",0,200,"L"),("G3",0,200,"L"),("C3",210,160,"L"),("E3",210,160,"L")],400)
sq=f'''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet"><style>*{{margin:0;box-sizing:border-box}}body{{width:1200px;height:1200px;background:radial-gradient(circle at 70% 15%,#2c3a40,#121618 72%);font-family:"Schibsted Grotesk",Arial,sans-serif;color:#fff;overflow:hidden;position:relative}}</style></head><body>
<div style="position:absolute;left:80px;right:80px;top:90px;text-align:center"><div style="font-size:30px;font-weight:800;letter-spacing:.18em;color:#f6b31e">FALLING-NOTES PIANO APP</div><div style="font-size:140px;font-weight:800;line-height:1;margin-top:18px">Synthesia</div><div style="font-size:36px;font-weight:500;color:#cfe0e5;margin-top:18px">for PC, Mac, iPad and Android</div></div>
<div style="position:absolute;left:70px;right:70px;bottom:90px">{big}</div></body></html>'''
imgs['synthesia-app']=(1200,sq)
json.dump(imgs,open('imgs2.json','w'))
