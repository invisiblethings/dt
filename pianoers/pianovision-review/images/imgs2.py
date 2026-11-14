import json
from page import page
from kb import keyboard, white_seq
imgs={}
T='#2e6475';A='#f6b31e';V='#6b3fd4';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'

W=white_seq('C3','B5')
def scene(W,ww,wh,notes,h=330,label=''):
    sv,w=keyboard(W,0,0,ww,wh,ww*0.6,wh*0.62,{n:'#e6dcff' for n,y,d,hd in notes if y==0 and hd=='R'} | {n:'#d3e8ee' for n,y,d,hd in notes if y==0 and hd=='L'},{},None,None,13,10)
    s=''
    for n,y,dy,hand in notes:
        k=W.index(n); x=k*ww+ww*0.12
        c=V if hand=='R' else T
        s+=f'<rect x="{x:.1f}" y="{-y-dy-4:.1f}" width="{ww*0.76:.1f}" height="{dy:.1f}" rx="5" fill="{c}"/>'
    return f'<svg viewBox="-4 -{h} {w+8} {h+wh+6}" width="100%">{s}{sv}<line x1="0" y1="-2" x2="{w}" y2="-2" stroke="{A}" stroke-width="5"/></svg>'

W=white_seq('C2','B6')
hero_notes=[('C4',0,40,'R'),('E4',0,40,'R'),('G4',0,40,'R'),('D4',50,30,'R'),('E4',90,30,'R'),('F4',130,30,'R'),('G4',170,70,'R'),('C5',170,70,'R'),('C3',0,120,'L'),('G2',0,120,'L'),('F3',130,110,'L'),('A4',250,30,'R')]
hero=scene(W,34,140,hero_notes,300)

steps=[('1','Calibrate','Put the headset on at the piano and line up the virtual keys with your real ones, once.'),('2','Notes fall','Coloured bars drop onto the exact keys to play. Length shows how long to hold.'),('3','Wait or play along','Wait mode pauses until you press the right key. Or play in time with the music.'),('4','Check your stats','Timing and accuracy are scored, so you can loop and fix the weak bars.')]
cards=''.join(f'<div class="card" style="padding:18px 20px"><div style="display:flex;align-items:center;gap:10px"><span style="width:38px;height:38px;border-radius:50%;background:{V};color:#fff;display:grid;place-items:center;font-size:21px;font-weight:800">{a}</span><span style="font-size:23px;font-weight:800">{b}</span></div><div style="font-size:18px;{SER};line-height:1.42;margin-top:8px">{c}</div></div>' for a,b,c in steps)
body=f'''<div class="card" style="padding:22px 26px;background:#191526;border-color:#191526"><div style="display:flex;justify-content:space-between;color:#cfc6ee;font-size:17px;font-weight:700;margin-bottom:6px"><span><span style="color:#8fd0e0">&#9632;</span> left hand</span><span>what you see through the headset (illustration)</span><span><span style="color:#b49cff">&#9632;</span> right hand</span></div>{hero}</div>
<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:16px">{cards}</div>'''
imgs['how-pianovision-works']=(890,page(890,'How it works','How PianoVision teaches a song in 4 steps',body,'Illustration, not a screenshot'))

modes=[('Falling notes','The classic view. Bars fall onto your keys in time with the music.',V),('Wait mode','The song stops on each note until you play it. Perfect for first read-throughs.',T),('Ghost hands','See-through hands show which finger goes where.','#8a5cf6'),('Sheet music','Read the notes from a score as you play, to build real reading skill.','#b07a00'),('Learning Engine','Breaks a song into snippets and rebuilds it around the parts you miss.',V),('Memory Engine','Gradually removes the help so the song moves from the headset into your memory.',T)]
mc=''.join(f'<div class="card" style="padding:18px 20px;border-left:8px solid {c}"><div style="font-size:23px;font-weight:800">{a}</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:6px">{b}</div></div>' for a,b,c in modes)
body=f'<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px">{mc}</div><div style="margin-top:16px;font-size:18px;color:{MU};line-height:1.4">Also: one-hand practice, slower tempos, looping sections, a metronome, performance stats for timing, accuracy and handedness, and an AI teacher called Ludwig.</div>'
imgs['pianovision-practice-modes']=(610,page(610,'Features','PianoVision practice modes, explained',body,'Feature names as PianoVision describes them'))

def mem(stage,frac,label,sub):
    Wm=white_seq('C4','B4')
    ns=[('C4',0,30),('D4',36,30),('E4',72,30),('F4',108,30),('G4',144,62)]
    s=''
    keep=int(round(len(ns)*frac))
    for i,(n,y,dy) in enumerate(ns):
        k=Wm.index(n); x=k*40+5
        op=1 if i<keep else 0.12
        dash='' if i<keep else ' stroke="#6b3fd4" stroke-dasharray="4 4" fill-opacity="0"'
        s+=f'<rect x="{x}" y="{-y-dy-4}" width="30" height="{dy}" rx="5" fill="{V}" opacity="{op if i<keep else 1}"{dash}/>'
    sv,w=keyboard(Wm,0,0,40,110,24,68,{},{},None,None,13,10)
    return f'<div class="card" style="padding:16px 18px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">{stage}</div><div style="font-size:22px;font-weight:800;margin:2px 0 8px">{label}</div><svg viewBox="-2 -220 {w+4} 334" width="100%">{s}{sv}</svg><div style="font-size:17px;{SER};line-height:1.4;margin-top:8px">{sub}</div></div>'
body=f'''<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px">
{mem('STEP 1',1,'Full guidance','Every note is shown.')}
{mem('STEP 2',0.6,'Less help','Some notes are hidden.')}
{mem('STEP 3',0.2,'Hints only','Only a few cues remain.')}
{mem('STEP 4',0,'From memory','You play the passage yourself.')}</div>
<div class="card" style="padding:16px 22px;margin-top:16px;font-size:19px;line-height:1.45">PianoVision says its Memory Engine is &#8220;designed to incrementally reduce your dependency on the VR headset.&#8221; That idea, called fading or scaffolding, is how good teachers work too: show it, then step back.</div>'''
imgs['pianovision-memory-engine']=(760,page(760,'Features','How the Memory Engine works',body,'Illustration of the idea; exact behaviour is set by the app'))

ways=[('Real MIDI keyboard or digital piano','Yes','Yes','Yes','Yes','Best','#1f7a4d'),('Virtual keyboard (hand tracking)','Yes','Yes, less precise','Yes','No real keys','Try-out','#b07a00'),('Acoustic piano, no MIDI','Yes','No','No','Yes','View only','#b3261e')]
hdr=['Falling notes on the keys','App hears what you play','Wait mode and scores','Real key weight']
th=''.join(f'<th style="padding:12px 10px;font-size:17px;text-align:center;color:{MU}">{x}</th>' for x in hdr)
def cell(x):
    good=x.startswith('Yes')
    bg='#e3f3ea' if x=='Yes' else ('#fff3d1' if good else '#fde8e6')
    return f'<td style="padding:12px 8px;text-align:center"><span style="display:inline-block;padding:7px 12px;border-radius:999px;background:{bg};font-size:17px;font-weight:700">{x}</span></td>'
tr=''.join(f'<tr style="border-top:1px solid {LINE}"><td style="padding:14px 10px;font-size:20px;font-weight:800;width:300px">{a}</td>{cell(b)}{cell(c)}{cell(d)}{cell(e)}<td style="padding:12px 8px;text-align:center"><span style="display:inline-block;padding:7px 14px;border-radius:10px;background:{col};color:#fff;font-size:17px;font-weight:800">{f}</span></td></tr>' for a,b,c,d,e,f,col in ways)
body=f'''<div class="card" style="padding:10px 18px"><table style="width:100%;border-collapse:collapse"><tr><th></th>{th}<th style="padding:12px 10px;font-size:17px;color:{MU}">Verdict</th></tr>{tr}</table></div>
<div style="margin-top:16px;font-size:18px;color:{MU};line-height:1.4">PianoVision&#39;s setup guides rely on MIDI for note input. I found no microphone note detection in its official material, so an acoustic piano without MIDI gets the visual overlay only.</div>'''
imgs['pianovision-three-ways-to-play']=(620,page(620,'Ways to play','Three ways to play PianoVision',body,'Based on PianoVision&#39;s official feature and setup pages'))

heads=[('Meta Quest 3','512 GB · $599.99','Sharp full-colour passthrough and pancake lenses. The clearest view of your real keys.','Best choice',V),('Meta Quest 3S','128 GB $349.99 · 256 GB $449.99','Full-colour passthrough for much less. Fresnel lenses, so the sharp area is smaller.','Best value',T),('Meta Quest 2','No longer sold new by Meta','Grainy black-and-white passthrough. It works, but reading small notes is harder.','Only if you own one','#b07a00'),('Meta Quest Pro','No longer sold new by Meta','Colour passthrough and a more balanced fit. Supported by PianoVision.','Fine if you own one',MU)]
hc=''.join(f'<div class="card" style="padding:20px 22px;border-top:8px solid {c}"><div style="font-size:24px;font-weight:800">{a}</div><div style="font-size:17.5px;font-weight:700;color:{MU};margin-top:2px">{b}</div><div style="font-size:18px;{SER};line-height:1.42;margin:10px 0 12px">{d}</div><span style="display:inline-block;padding:6px 12px;border-radius:999px;background:{c};color:#fff;font-size:16px;font-weight:800">{e}</span></div>' for a,b,d,e,c in heads)
body=f'<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px">{hc}</div><div style="margin-top:16px;font-size:18px;color:{MU};line-height:1.4">PianoVision runs on Meta Quest 3, Quest 3S, Quest Pro and Quest 2. I could not find a version for Apple Vision Pro or other headsets. US prices from Meta, effective April 19, 2026.</div>'
imgs['best-meta-quest-for-pianovision']=(600,page(600,'Hardware','Which Meta Quest is best for PianoVision?',body,'Prices change often; check the Meta store before you buy'))

apps=[('PianoVision','Meta Quest headset','Notes fall onto your own keys in mixed reality','MIDI or hand tracking','Learning songs by sight, fast',V),('Simply Piano','Phone or tablet','Game-style lessons on a screen','Microphone or MIDI','Total beginners who want a path',T),('Flowkey','Phone, tablet or computer','Videos of real pianists plus sheet music','Microphone or MIDI','Song learners who also want to read','#b07a00'),('Piano Marvel','Computer, tablet or phone','Sheet music with sight-reading tests','MIDI recommended, mic possible','Reading and structured progress','#1f7a4d')]
hd=['App','Runs on','What you look at','How it hears you','Best for']
th=''.join(f'<th style="padding:12px 10px;font-size:16px;text-align:left;color:{MU};letter-spacing:.06em;text-transform:uppercase">{x}</th>' for x in hd)
tr=''.join(f'<tr style="border-top:1px solid {LINE}"><td style="padding:14px 10px;font-size:21px;font-weight:800;color:{c}">{a}</td><td style="padding:14px 10px;font-size:18px">{b}</td><td style="padding:14px 10px;font-size:18px">{d}</td><td style="padding:14px 10px;font-size:18px">{e}</td><td style="padding:14px 10px;font-size:18px;font-weight:700">{f}</td></tr>' for a,b,d,e,f,c in apps)
body=f'<div class="card" style="padding:10px 18px"><table style="width:100%;border-collapse:collapse">{"<tr>"+th+"</tr>"}{tr}</table></div><div style="margin-top:16px;font-size:18px;color:{MU};line-height:1.4">PianoVision is the only one of the four that needs a VR headset, and the only one that puts the notes on your actual keys.</div>'
imgs['pianovision-vs-simply-piano-flowkey-piano-marvel']=(680,page(680,'Comparison','PianoVision vs other piano apps',body,'See our full reviews of each app on Pianoers.com'))

buy=['You already own a Meta Quest 3 or 3S','You have a digital piano or MIDI keyboard','You learn best by seeing, not reading','You want to learn popular songs quickly','You like tech and gamified practice']
skip=['You don&#39;t own a headset and don&#39;t want one','You want to read sheet music fluently','You get motion sick or find headsets heavy','You only have an acoustic piano with no MIDI','You need a teacher to fix technique and posture']
def col(t,items,c,bg,mark):
    li=''.join(f'<div style="display:flex;gap:12px;padding:10px 0;border-top:1px solid {LINE}"><span style="flex:none;width:28px;height:28px;border-radius:50%;background:{c};color:#fff;display:grid;place-items:center;font-weight:800">{mark}</span><span style="font-size:19px;line-height:1.4">{x}</span></div>' for x in items)
    return f'<div class="card" style="padding:20px 24px;background:{bg}"><div style="font-size:25px;font-weight:800;color:{c};margin-bottom:6px">{t}</div>{li}</div>'
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">{col("Buy PianoVision if…",buy,"#1f7a4d","#f2faf5","&#10003;")}{col("Skip it if…",skip,"#b3261e","#fdf3f2","&#10005;")}</div>'
imgs['pianovision-who-should-buy']=(540,page(540,'Verdict','Who should buy PianoVision?',body))

ft=f'''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet"><style>*{{margin:0;box-sizing:border-box}}body{{width:1200px;height:HHpx;background:radial-gradient(circle at 75% 20%,#3a2780,#140f24 70%);font-family:"Schibsted Grotesk",Arial,sans-serif;color:#fff;overflow:hidden;position:relative}}</style></head><body>
<div style="position:absolute;left:64px;top:T1px;width:520px"><div style="font-size:22px;font-weight:800;letter-spacing:.16em;color:#f6b31e">HONEST REVIEW · 2026</div><div style="font-size:84px;font-weight:800;line-height:.98;margin:12px 0 18px">PianoVision Review</div><div style="font-size:28px;font-weight:500;line-height:1.3;color:#d9d2f5">Can a Meta Quest 3 really teach you piano?</div>
<div style="display:flex;gap:12px;margin-top:26px"><span style="background:#f6b31e;color:#1b1400;font-weight:800;font-size:22px;padding:10px 18px;border-radius:12px">4.1 / 5</span><span style="background:rgba(255,255,255,.12);font-weight:700;font-size:22px;padding:10px 18px;border-radius:12px">Basic $9.99</span></div></div>
<div style="position:absolute;right:40px;top:T2px;width:560px">{scene(white_seq("C3","B4"),40,170,[("C4",0,50,"R"),("E4",60,50,"R"),("G4",120,50,"R"),("C4",180,110,"R"),("C3",0,160,"L"),("G3",170,80,"L"),("A4",290,40,"R")],370)}</div>
<div style="position:absolute;left:64px;bottom:34px;font-size:20px;font-weight:800;letter-spacing:.14em;color:#b49cff">PIANOERS.COM</div></body></html>'''
imgs['pianovision-review-featured']=(675,ft.replace('HH','675').replace('T1','150').replace('T2','70'))
imgs['pianovision-review-social']=(630,ft.replace('HH','630').replace('T1','128').replace('T2','48'))
sq=f'''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet"><style>*{{margin:0;box-sizing:border-box}}body{{width:1200px;height:1200px;background:radial-gradient(circle at 70% 15%,#3a2780,#140f24 72%);font-family:"Schibsted Grotesk",Arial,sans-serif;color:#fff;overflow:hidden;position:relative}}</style></head><body>
<div style="position:absolute;left:80px;right:80px;top:90px;text-align:center"><div style="font-size:30px;font-weight:800;letter-spacing:.18em;color:#f6b31e">MIXED REALITY PIANO APP</div><div style="font-size:130px;font-weight:800;line-height:1;margin-top:18px">PianoVision</div><div style="font-size:36px;font-weight:500;color:#d9d2f5;margin-top:18px">for Meta Quest 3, 3S, Pro and 2</div></div>
<div style="position:absolute;left:70px;right:70px;bottom:90px">{scene(white_seq("C3","B5"),50,230,[("C4",0,60,"R"),("E4",0,60,"R"),("G4",0,60,"R"),("D4",75,45,"R"),("E4",130,45,"R"),("F4",185,45,"R"),("G4",240,90,"R"),("C5",240,90,"R"),("C3",0,180,"L"),("G3",0,180,"L"),("F3",200,140,"L"),("A4",345,45,"R")],400)}</div></body></html>'''
imgs['pianovision-app']=(1200,sq)
json.dump(imgs,open('imgs2.json','w'))
