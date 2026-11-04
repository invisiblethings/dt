import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';G='#2f9e5b';R='#c2412d';BL='#3b6fd1';V='#7a4fc2';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'

rows=[('Faber Piano Adventures',T,'Nancy and Randall Faber','5 to adult (separate lines)','Reading first, with creativity and technique built in','Most children and adults; my first pick'),
('Alfred&#39;s Basic Piano Library',BL,'Palmer, Manus and Lethco','5 to adult','Reading first, step by step; theory in the All-in-One books','Steady, structured learners'),
('Bastien Piano Basics',V,'The Bastien family (Kjos)','Young children to adult','Reading first, moves through keys quickly','Quick learners who like a fast pace'),
('Suzuki Piano School',G,'Shinichi Suzuki','Young children','Listening and imitation first, reading later','Young children with a very involved parent'),
('Simply Music',A,'Neil Moore','Children, teens and adults','Playing first, reading later','Learners who want to play real music right away')]
tr=''.join(f'<tr style="border-top:1px solid {LINE}"><td style="padding:12px 10px;border-left:6px solid {c}"><div style="font-size:20px;font-weight:800">{a}</div><div style="font-size:15px;color:{MU}">{b}</div></td><td style="padding:12px 10px;font-size:17px">{d}</td><td style="padding:12px 10px;font-size:17px">{e}</td><td style="padding:12px 10px;font-size:17px;font-weight:700">{f}</td></tr>' for a,c,b,d,e,f in rows)
th=''.join(f'<th style="text-align:left;padding:12px 10px;font-size:15px;letter-spacing:.08em;color:{MU}">{x}</th>' for x in ['METHOD','AGES','APPROACH','BEST FOR'])
body=f'<div class="card" style="padding:8px 18px"><table style="width:100%;border-collapse:collapse"><tr>{th}</tr>{tr}</table></div>'
imgs['piano-methods-compared']=(820,page(820,'At a glance','Piano teaching methods compared',body,'Ages from the publishers; &#8220;best for&#8221; is my opinion as a teacher'))

def lane(title,c,steps,sub):
    st=''.join(f'<div style="flex:1;background:{"#fff" if i else c};color:{"#15191c" if i else "#fff"};border:2px solid {c};border-radius:14px;padding:12px 14px;font-size:18px;font-weight:700;line-height:1.3">{s}</div>'+('<div style="align-self:center;font-size:26px;color:%s">&#8594;</div>'%c if i<len(steps)-1 else '') for i,s in enumerate(steps))
    return f'<div class="card" style="padding:18px 22px"><div style="font-size:24px;font-weight:800;color:{c}">{title}</div><div style="font-size:17px;{SER};margin:4px 0 12px">{sub}</div><div style="display:flex;gap:10px">{st}</div></div>'
body=f'''<div style="display:grid;gap:16px">
{lane('Reading first',T,['Traditional method books','Learn notes on the staff','Play short pieces you can read','Add theory and technique'],'Faber, Alfred&#39;s, Bastien, John Thompson, Hal Leonard')}
{lane('Playing first',A,['Playing-first methods','Learn songs by ear, pattern or imitation','Play bigger music sooner','Add reading once playing feels natural'],'Suzuki, Simply Music, and many chord-based adult courses')}</div>
<div class="card" style="padding:14px 22px;margin-top:16px;font-size:18.5px;{SER};line-height:1.45"><b style="font-family:Schibsted Grotesk,Arial,sans-serif">Both teach reading.</b> The difference is <em>when</em>. Reading-first methods build the skill from day one; playing-first methods hold it back so the student plays real music sooner.</div>'''
imgs['reading-first-vs-playing-first-piano-methods']=(700,page(700,'Two philosophies','Reading-first vs playing-first piano methods',body,'Simplified; many teachers mix both'))

def box(t,s,c,w=1):
    return f'<div style="grid-column:span {w};background:{c};color:#fff;border-radius:12px;padding:10px 12px;font-size:17px;font-weight:800;line-height:1.2">{t}<div style="font-size:14px;font-weight:600;opacity:.9;margin-top:2px">{s}</div></div>'
lv=['Primer','Level 1','Level 2A','Level 2B','Level 3A','Level 3B','Level 4','Level 5']
basic=''.join(box(l,'',T) for l in lv)
body=f'''<div class="card" style="padding:18px 22px">
<div style="display:grid;grid-template-columns:170px repeat(8,minmax(0,1fr));gap:8px;align-items:center">
<div style="font-size:18px;font-weight:800">My First Piano Adventure<div style="font-size:14px;color:{MU};font-weight:600">ages 5 to 6</div></div>{box('Book A','',G)}{box('Book B','',G)}{box('Book C','',G)}<div style="grid-column:span 5;font-size:15px;color:{MU}">&#8594; then into Basic</div>
<div style="font-size:18px;font-weight:800">Basic Piano Adventures<div style="font-size:14px;color:{MU};font-weight:600">ages 6 to 11</div></div>{basic}
<div style="font-size:18px;font-weight:800">Accelerated<div style="font-size:14px;color:{MU};font-weight:600">for the older beginner</div></div>{box('Book 1','',BL,2)}{box('Book 2','',BL,2)}<div style="grid-column:span 4;font-size:15px;color:{MU}">&#8594; joins Basic at Level 3A</div>
<div style="font-size:18px;font-weight:800">Adult Piano Adventures<div style="font-size:14px;color:{MU};font-weight:600">adults</div></div>{box('All-in-One Book 1','',A,4)}{box('All-in-One Book 2','',A,4)}
</div></div>
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:14px">
<div class="card" style="padding:14px 18px"><div style="font-size:20px;font-weight:800">8 levels in Basic</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:4px">Primer through Level 5 takes a child from the very beginning to intermediate.</div></div>
<div class="card" style="padding:14px 18px"><div style="font-size:20px;font-weight:800">Several books per level</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:4px">Children&#39;s levels pair a lesson book with companion books, such as theory and performance.</div></div>
<div class="card" style="padding:14px 18px"><div style="font-size:20px;font-weight:800">Adults: all in one</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:4px">The adult course puts lessons, theory and pieces in a single book, with online audio and video.</div></div></div>'''
imgs['faber-piano-adventures-levels']=(720,page(720,'Faber Piano Adventures','Faber Piano Adventures levels and which book to start with',body,'Levels and ages from pianoadventures.com'))

books=[('Faber Adult Piano Adventures All-in-One Book 1',T,'$19.99','184 pages','Online audio and video','Warm, modern arrangements and a gentle pace'),
('Alfred&#39;s Basic Adult All-in-One Course Book 1',BL,'$19.99|$24.99 with DVD','160 pages','DVD edition available','A classic: clear steps, lots of familiar tunes'),
('Accelerated Piano Adventures Lesson Book 1',G,'$11.99','96 pages','Faber online support','For teens; also suits adults who want speed'),
('John Thompson&#39;s Adult Piano Course Book 1',A,'$12.99|$15.99 with online audio','Elementary level','Online audio edition','Old-fashioned but thorough and cheap')]
bc=''.join(f'<div class="card" style="padding:16px 18px;border-top:7px solid {c}"><div style="font-size:19px;font-weight:800;line-height:1.2;min-height:70px">{n}</div><div style="font-size:30px;font-weight:800;color:{c};margin:6px 0 2px">{p.split("|")[0]}</div><div style="font-size:15px;font-weight:700;color:{c};min-height:20px;margin-bottom:6px">{(p.split("|")+[""])[1]}</div><div style="font-size:16px;color:{MU};font-weight:700">{pg} &#183; {x}</div><div style="font-size:16.5px;{SER};line-height:1.4;margin-top:8px">{v}</div></div>' for n,c,p,pg,x,v in books)
body=f'<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px">{bc}</div><div style="margin-top:14px;font-size:17px;color:{MU}">List prices from the publishers. Bastien Piano for Adults is another option; I couldn&#39;t confirm its current details with the publisher.</div>'
imgs['piano-method-books-for-adults']=(640,page(640,'For adult beginners','Piano method books for adults: the four I compare',body,'Retailers often charge less than the list price'))

q=lambda t,c: f'<div style="background:{c};color:#fff;border-radius:14px;padding:12px 16px;font-size:19px;font-weight:800;text-align:center">{t}</div>'
a=lambda t,s,c: f'<div class="card" style="padding:12px 14px;border-top:6px solid {c}"><div style="font-size:19px;font-weight:800">{t}</div><div style="font-size:15.5px;{SER};line-height:1.35;margin-top:3px">{s}</div></div>'
body=f'''<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px">
<div style="display:grid;gap:10px;align-content:start">{q('Child, age 3 to 6',G)}{a('Suzuki','If a parent can attend lessons and practise with them every day.',G)}{a('My First Piano Adventure','If you want reading from the start, at a gentle pace.',T)}</div>
<div style="display:grid;gap:10px;align-content:start">{q('Child or teen, 7 and up',T)}{a('Basic or Accelerated Piano Adventures','My default for most students.',T)}{a('Alfred&#39;s Basic Piano Library','Structured, with all-in-one books.',BL)}{a('Bastien Piano Basics','For quick learners.',V)}</div>
<div style="display:grid;gap:10px;align-content:start">{q('Adult beginner',A)}{a('Adult Piano Adventures or Alfred&#39;s Adult','If you want to read music properly.',T)}{a('Simply Music or a chord-based course','If you want to play songs you love quickly.',A)}{a('A teacher','The best way to make any method work.',R)}</div></div>'''
imgs['which-piano-method-is-best']=(640,page(640,'Choosing','Which piano method is best for you?',body,'A teacher&#39;s rule of thumb; the right teacher matters more than the book'))

tri=f'''<svg viewBox="0 0 520 400" width="100%"><polygon points="260,40 470,360 50,360" fill="#eef6f1" stroke="{G}" stroke-width="4"/>
<circle cx="260" cy="60" r="56" fill="{G}"/><text x="260" y="66" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">Child</text>
<circle cx="440" cy="340" r="56" fill="{T}"/><text x="440" y="346" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">Teacher</text>
<circle cx="80" cy="340" r="56" fill="{A}"/><text x="80" y="346" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">Parent</text>
<text x="260" y="250" text-anchor="middle" font-size="20" font-weight="800" fill="{INK}">listening every day</text></svg>'''
pts=[('Mother-tongue approach','Children learn music the way they learn to speak: by hearing it, then copying it.'),('Lots of listening','Students listen to the recordings of their pieces every day.'),('Parents are involved','A parent usually attends lessons and guides practice at home.'),('Group lessons too','Students take part in group lessons and performances as well as private ones.'),('Reading comes later','Playing by ear and imitation comes first; music reading is added along the way.')]
pl=''.join(f'<div style="padding:10px 0;border-top:1px solid {LINE}"><b style="font-size:20px">{x}</b><div style="font-size:17px;{SER};line-height:1.38">{y}</div></div>' for x,y in pts)
body=f'<div style="display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:16px"><div class="card" style="padding:18px">{tri}</div><div class="card" style="padding:8px 22px">{pl}</div></div>'
imgs['suzuki-piano-method-explained']=(700,page(700,'Suzuki Piano School','How the Suzuki piano method works',body,'Developed by Dr. Shinichi Suzuki; principles from the Suzuki Association of the Americas'))

ft='''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet"><style>*{margin:0;box-sizing:border-box}body{width:1200px;height:HHpx;background:radial-gradient(circle at 78% 22%,#21485a,#0f1a20 70%);font-family:"Schibsted Grotesk",Arial,sans-serif;color:#fff;overflow:hidden;position:relative}</style></head><body>
<div style="position:absolute;left:64px;top:T1px;width:640px"><div style="font-size:22px;font-weight:800;letter-spacing:.16em;color:#f6b31e">A PIANO TEACHER&#39;S COMPARISON</div><div style="font-size:84px;font-weight:800;line-height:.98;margin:12px 0 18px">Piano Methods Compared</div><div style="font-size:28px;font-weight:500;line-height:1.3;color:#cfe3ea">Faber, Alfred&#39;s, Bastien, Suzuki and Simply Music: which one fits you</div></div>
<div style="position:absolute;right:56px;top:T2px;width:440px;height:480px">BOOKS</div>
<div style="position:absolute;left:64px;bottom:34px;font-size:20px;font-weight:800;letter-spacing:.14em;color:#8fd0a8">PIANOERS.COM</div></body></html>'''
cols=[('#2e6475','FABER'),('#3b6fd1','ALFRED'),('#7a4fc2','BASTIEN'),('#2f9e5b','SUZUKI'),('#f6b31e','SIMPLY MUSIC')]
bk=''.join(f'<div style="position:absolute;left:{i*84}px;bottom:0;width:76px;height:{420-i*22}px;background:{c};border-radius:8px 8px 4px 4px;box-shadow:inset -8px 0 0 rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center"><span style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:22px;font-weight:800;letter-spacing:.12em;color:{"#15191c" if c=="#f6b31e" else "#fff"}">{t}</span></div>' for i,(c,t) in enumerate(cols))
ft=ft.replace('BOOKS',bk)
imgs['piano-methods-compared-featured']=(675,ft.replace('HH','675').replace('T1','150').replace('T2','110'))
imgs['piano-methods-compared-social']=(630,ft.replace('HH','630').replace('T1','128').replace('T2','90'))
json.dump(imgs,open('imgs1.json','w'))
