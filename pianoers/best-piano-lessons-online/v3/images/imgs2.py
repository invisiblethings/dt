import json
from page import page
from kb import keyboard, white_seq
imgs={}
T='#2e6475';A='#f6b31e';G='#2f9e5b';BL='#3b6fd1';V='#7a4fd0';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'

def plan(t,sub,items,total,col,badge=''):
    li=''.join(f'<div style="display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid {LINE};font-size:19px"><span>{a}</span><b style="text-align:right;white-space:nowrap">{b}</b></div>' for a,b in items)
    bd=f'<span style="position:absolute;top:-16px;right:18px;background:{A};color:#1b1400;font-size:15px;font-weight:800;letter-spacing:.06em;padding:6px 12px;border-radius:999px">{badge}</span>' if badge else ''
    return f'<div class="card" style="padding:22px 24px;position:relative;border-top:8px solid {col}">{bd}<div style="font-size:25px;font-weight:800">{t}</div><div style="font-size:17px;color:{MU};margin:2px 0 10px">{sub}</div>{li}<div style="display:flex;justify-content:space-between;align-items:baseline;border-top:3px solid {INK};margin-top:6px;padding-top:10px"><b style="font-size:19px">Year one</b><b style="font-size:40px;color:{col}">{total}</b></div></div>'
body=f'''<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px">
{plan('Weekly live lessons','the traditional route, online',[('52 lessons, 30 min','from $20 each'),('Practice','on your own')],'$1,040',V)}
{plan('The hybrid plan','my pick for most adults',[('Pianoforall course','$49 once'),('12 check-ins, 30 min','12 x $20 = $240'),('Daily practice','course plan')],'$289',G,'TEACHER&#39;S PICK')}
{plan('Hybrid, with an app','if you want note feedback',[('Piano Marvel Premium','$129.99/yr'),('12 check-ins, 30 min','12 x $20 = $240'),('Daily practice','app scores')],'$369.99',BL)}</div>
<div class="card" style="padding:16px 22px;margin-top:16px;font-size:19px;line-height:1.45"><b>Why it works:</b> the course gives you a plan for every day, and a monthly lesson with a real teacher catches the posture, tension and rhythm problems no course or app can see.</div>
<div style="margin-top:10px;font-size:16.5px;color:{MU}">Live lesson price: Online Piano Teachers&#39; &#8220;starting from&#8221; rate of $20 for 30 minutes.</div>'''
imgs['hybrid-online-piano-lessons-plan']=(800,page(800,'Save money','The hybrid plan: a course plus a monthly teacher',body,'Pianoers.com'))

goals=[('Adult beginners','Pianoforall','7 days free, then $49 once',G),('Kids','Simply Piano or Hoffman Academy','game-style app, or free videos',BL),('Reading and exams','Piano Marvel','free plan or $129.99 a year',BL),('Popular songs','Flowkey or Playground Sessions','$149.99 a year each',BL),('A real teacher','Online Piano Teachers','from $20 for 30 minutes',V),('Video library and Q&amp;As','Pianote (Musora)','$279 a year',G),('Advanced and classical','Piano Career Academy','$47 a month or $470 a year',T),('Jazz','Open Studio or Piano With Jonny','see our full reviews',T),('Visual learners','Piano by Pictures','first month free, then $49/mo',G),('Free','Hoffman Academy and YouTube','$0, no feedback',A)]
gc=''.join(f'<div class="card" style="padding:14px 18px;border-left:8px solid {c}"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU};text-transform:uppercase">{a}</div><div style="font-size:22px;font-weight:800;margin:3px 0 2px;line-height:1.15">{b}</div><div style="font-size:16.5px;color:{MU}">{d}</div></div>' for a,b,d,c in goals)
body=f'<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px">{gc}</div>'
imgs['best-online-piano-lessons-by-goal']=(820,page(820,'Cheat sheet','The best online piano lessons for every goal',body,'Prices in US dollars'))

W=white_seq('C4','B4')
def chord(notes,lab):
    sv,w=keyboard(W,0,0,30,90,18,56,{n:'#cfe8d8' for n in notes},{},None,None,12,9)
    return f'<div style="text-align:center"><svg viewBox="-2 -2 {w+4} 96" width="100%">{sv}</svg><div style="font-size:19px;font-weight:800;margin-top:4px">{lab}</div></div>'
ch=f'<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:12px">{chord(["C4","E4","G4"],"C")}{chord(["G4","B4","D4"],"G")}{chord(["A4","C4","E4"],"Am")}{chord(["F4","A4","C4"],"F")}</div>'
items=[('Four chords','C, G, Am and F (I&#8211;V&#8211;vi&#8211;IV) are behind a huge number of pop songs.'),('Two or three left-hand patterns','Block chords, broken chords and a simple bass line make those chords sound like music.'),('The notes around middle C','Read just a few notes in each clef at first; add more as songs need them.'),('A steady beat','A metronome at a slow tempo fixes more problems than playing faster.'),('15 to 20 minutes a day','Short, daily practice beats one long session a week.')]
il=''.join(f'<div style="display:flex;gap:14px;padding:11px 0;border-top:1px solid {LINE}"><span style="flex:none;width:36px;height:36px;border-radius:50%;background:{G};color:#fff;display:grid;place-items:center;font-weight:800;font-size:19px">{i+1}</span><div><b style="font-size:21px">{a}</b><div style="font-size:18px;{SER};line-height:1.4">{b}</div></div></div>' for i,(a,b) in enumerate(items))
body=f'''<div style="display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:18px">
<div class="card" style="padding:12px 24px">{il}</div>
<div style="display:grid;gap:16px;align-content:start"><div class="card" style="padding:20px 22px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">THE FOUR CHORDS, ON THE KEYS</div>{ch}</div>
<div class="card" style="padding:18px 22px;background:{G};border-color:{G};color:#fff"><div style="font-size:54px;font-weight:800;line-height:1">20% &#8594; 80%</div><div style="font-size:19px;margin-top:8px;line-height:1.4">Learn the few skills that show up in almost every song first, then fill in the rest.</div></div></div></div>'''
imgs['80-20-rule-piano-learning']=(820,page(820,'The 80/20 rule','The 20% of piano skills that do 80% of the work',body,'A teacher&#39;s reading of the 80/20 rule; not a scientific law'))

rows=[('Cost','Lower: apps from about $10 a month, teachers from $20 a lesson','Usually higher, plus travel'),('Schedule','Any time, from home','Fixed weekly slot'),('Choice','Any teacher or course, worldwide','Who is near you'),('Feedback on technique','Limited with apps; good on a video call','Best: the teacher can be right beside you'),('Very young children','Harder to keep focused on a screen','Easier'),('Recording lessons','Easy to record and rewatch','Possible, less common')]
tr=''.join(f'<tr style="border-top:1px solid {LINE}"><td style="padding:13px 10px;font-size:20px;font-weight:800;width:250px">{a}</td><td style="padding:13px 10px;font-size:18.5px">{b}</td><td style="padding:13px 10px;font-size:18.5px">{c}</td></tr>' for a,b,c in rows)
body=f'<div class="card" style="padding:8px 18px"><table style="width:100%;border-collapse:collapse"><tr><th></th><th style="text-align:left;padding:12px 10px;font-size:20px;color:{G}">Online lessons</th><th style="text-align:left;padding:12px 10px;font-size:20px;color:{T}">In-person lessons</th></tr>{tr}</table></div><div style="margin-top:14px;font-size:18px;color:{MU}">Search &#8220;piano lessons near me&#8221; if a child is under about 6, or if you need hands-on help with an injury.</div>'
imgs['online-vs-in-person-piano-lessons']=(700,page(700,'Online vs in person','Online piano lessons vs in-person lessons',body,'Pianoers.com'))

def scene(Wk,ww,wh,notes,h):
    fl={n:'#d8f0e1' for n,y,d in notes if y==0}
    sv,w=keyboard(Wk,0,0,ww,wh,ww*0.6,wh*0.62,fl,{},None,None,13,10)
    s=''.join(f'<rect x="{Wk.index(n)*ww+ww*0.12:.1f}" y="{-y-d-4:.1f}" width="{ww*0.76:.1f}" height="{d:.1f}" rx="5" fill="{c}"/>' for (n,y,d),c in zip(notes,[G,G,G,BL,BL,V,A,G,BL]))
    return f'<svg viewBox="-4 -{h} {w+8} {h+wh+6}" width="100%">{s}{sv}<line x1="0" y1="-2" x2="{w}" y2="-2" stroke="{A}" stroke-width="5"/></svg>'
hero=scene(white_seq('C3','B4'),40,170,[('C4',0,60),('E4',0,60),('G4',0,60),('A3',80,60),('C4',80,60),('F4',160,60),('G3',240,50),('D4',300,40),('B3',300,40)],350)
tiles=''.join(f'<span style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:8px 12px;font-size:19px;font-weight:700">{t}</span>' for t in ['Apps','Video courses','Live teachers','Free'])
ft='''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet"><style>*{margin:0;box-sizing:border-box}body{width:1200px;height:HHpx;background:radial-gradient(circle at 78% 18%,#21485a,#0f1a20 70%);font-family:"Schibsted Grotesk",Arial,sans-serif;color:#fff;overflow:hidden;position:relative}</style></head><body>
<div style="position:absolute;left:64px;top:T1px;width:600px"><div style="font-size:22px;font-weight:800;letter-spacing:.16em;color:#f6b31e">REVIEWED BY A PIANO TEACHER · 2026</div><div style="font-size:80px;font-weight:800;line-height:.98;margin:12px 0 18px">Best Online Piano Lessons</div><div style="font-size:28px;font-weight:500;line-height:1.3;color:#cfe3ea">8 courses compared, with real prices and a quiz to find your match</div>
<div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">TILES</div></div>
<div style="position:absolute;right:40px;top:T2px;width:500px">HERO</div>
<div style="position:absolute;left:64px;bottom:34px;font-size:20px;font-weight:800;letter-spacing:.14em;color:#8fd0a8">PIANOERS.COM</div></body></html>'''.replace('HERO',hero).replace('TILES',tiles)
imgs['best-online-piano-lessons-featured']=(675,ft.replace('HH','675').replace('T1','110').replace('T2','100'))
imgs['best-online-piano-lessons-social']=(630,ft.replace('HH','630').replace('T1','88').replace('T2','78'))
json.dump(imgs,open('imgs2.json','w'))
