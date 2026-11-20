import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';G='#2f9e5b';R='#c2412d';BL='#3b6fd1';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'

lever='''<svg viewBox="0 0 260 200" width="100%"><rect x="20" y="132" width="220" height="34" rx="8" fill="#a77a52"/><circle cx="130" cy="132" r="9" fill="#c9d3d7" stroke="#15191c" stroke-width="2"/>
<rect x="122" y="70" width="16" height="62" rx="4" fill="#8a979c" stroke="#15191c" stroke-width="2"/><rect x="104" y="20" width="52" height="56" rx="14" fill="#15191c"/><rect x="138" y="36" width="96" height="22" rx="10" fill="#2e6475"/></svg>'''
mute='''<svg viewBox="0 0 260 200" width="100%"><path d="M70 40 L190 40 L150 170 L110 170 Z" fill="#c2412d" stroke="#15191c" stroke-width="2"/><rect x="40" y="20" width="12" height="170" fill="#d9c27a"/><rect x="208" y="20" width="12" height="170" fill="#d9c27a"/></svg>'''
strip='''<svg viewBox="0 0 260 200" width="100%"><rect x="10" y="80" width="240" height="34" rx="6" fill="#b3261e"/>{}</svg>'''.format(''.join(f'<rect x="{18+i*20}" y="40" width="4" height="120" fill="#d9c27a"/>' for i in range(12)))
phone='''<svg viewBox="0 0 260 200" width="100%"><rect x="80" y="10" width="100" height="180" rx="16" fill="#15191c"/><rect x="88" y="26" width="84" height="148" rx="8" fill="#0f2730"/><text x="130" y="86" text-anchor="middle" font-size="30" font-weight="800" fill="#fff">A4</text><text x="130" y="112" text-anchor="middle" font-size="15" fill="#8fd0a8">+0.3 cents</text><path d="M100 150 Q130 120 160 150" stroke="#f6b31e" stroke-width="4" fill="none"/></svg>'''
def tool(svg,name,what,tip,c):
    svg=svg.replace('width="100%"','height="120"')
    return f'<div class="card" style="padding:14px 18px;border-top:6px solid {c}"><div style="height:120px;display:flex;justify-content:center">{svg}</div><div style="font-size:22px;font-weight:800;margin-top:6px">{name}</div><div style="font-size:16.5px;{SER};line-height:1.4;margin-top:4px">{what}</div><div style="font-size:15px;font-weight:700;color:{c};margin-top:8px">{tip}</div></div>'
body=f'''<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px">
{tool(lever,'Tuning lever','Also called a tuning hammer. It fits over the tuning pin and gives you fine control.','Get a tapered star tip; most pianos take a #2 size.',T)}
{tool(mute,'Wedge mutes','Rubber or felt wedges pushed between strings so only one string sounds.','Have at least two.',R)}
{tool(strip,'Temperament strip','A long felt strip that mutes the outer strings across a whole section.','Optional; useful for the middle octave.',A)}
{tool(phone,'Tuning app or fork','A piano-specific app (or a 440 Hz fork) gives you the reference pitch.','Choose an app that calculates stretch.',G)}</div>
<div style="display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:14px;margin-top:14px">
<div class="card" style="padding:16px 20px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">PIANO TUNING APPS</div>
<table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:17px">
<tr style="border-top:1px solid {LINE}"><td style="padding:8px 6px;font-weight:800">PianoMeter</td><td style="padding:8px 6px">iOS and Android. Free to try; Plus is a one-time $30</td></tr>
<tr style="border-top:1px solid {LINE}"><td style="padding:8px 6px;font-weight:800">TuneLab</td><td style="padding:8px 6px">iOS, Android and Windows. Long-standing professional choice</td></tr>
<tr style="border-top:1px solid {LINE}"><td style="padding:8px 6px;font-weight:800">Entropy Piano Tuner</td><td style="padding:8px 6px">Free and open source; harder to find and use</td></tr></table></div>
<div class="card" style="padding:16px 20px;background:#fbeceb;border-color:#f0c8c3"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{R}">DON&#39;T USE</div><div style="font-size:21px;font-weight:800;margin:4px 0">Pliers, vise grips or socket wrenches</div><div style="font-size:17px;{SER};line-height:1.4">They slip and chew up the square top of the tuning pin. A basic DIY kit with a proper lever and mutes costs up to about $100.</div></div></div>'''
imgs['piano-tuning-tools-kit']=(760,page(760,'What you need','Piano tuning tools: the basic kit',body,'App details from the developers&#39; sites; check current prices before buying'))

def col(title,c,bg,items):
    li=''.join(f'<div style="display:flex;gap:10px;padding:9px 0;border-top:1px solid {LINE}"><span style="flex:none;width:26px;height:26px;border-radius:50%;background:{c};color:#fff;display:grid;place-items:center;font-weight:800;font-size:15px">{"&#10003;" if c==G else "!"}</span><span style="font-size:18.5px;line-height:1.35">{t}</span></div>' for t in items)
    return f'<div class="card" style="padding:16px 22px;border-top:8px solid {c}"><div style="font-size:26px;font-weight:800;color:{c};margin-bottom:6px">{title}</div>{li}</div>'
body=f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
{col('Try it yourself if...',G,'',['The piano was tuned in the last year or two and is only slightly off','It&#39;s an inexpensive upright you can afford to experiment on','You have a proper lever, mutes and a piano tuning app','You have a quiet afternoon (expect 3 to 4 hours the first time)','You&#39;re curious and patient, and fine with &#8220;good&#8221; rather than concert-perfect'])}
{col('Call a technician if...',R,'',['It hasn&#39;t been tuned for years and sounds well below pitch','Tuning pins feel loose or the piano won&#39;t hold a tuning','A string is broken, or keys stick or don&#39;t return','It&#39;s a grand, or a valuable or antique piano','You need it right for a performance, exam or recording'])}</div>
<div class="card" style="padding:14px 22px;margin-top:14px;display:flex;gap:16px;align-items:center"><div style="font-size:40px">&#9888;</div><div style="font-size:18.5px;{SER};line-height:1.42"><b style="font-family:Schibsted Grotesk,Arial,sans-serif">The biggest beginner risk</b> is putting the lever on the wrong pin and turning a string you aren&#39;t listening to. Strings are under very high tension, so turn in tiny amounts and always check which string is moving.</div></div>'''
imgs['diy-piano-tuning-vs-technician']=(740,page(740,'Should you do it?','Tune it yourself or call a piano tuner?',body,'A teacher&#39;s rule of thumb, not a substitute for a technician&#39;s inspection'))

steps=[('Let the piano settle','Keep the room at its normal temperature and humidity for a few days. Don&#39;t tune right after a move.'),
('Open it up','On an upright, remove the lid flap and the front panel above the keys to reach the pins.'),
('Check how far off it is','Measure a few notes with your app. If it&#39;s more than about 10 to 15 cents flat overall, plan two passes.'),
('Mute and tune A4','Mute so only one string of A4 sounds, then tune it to 440 Hz.'),
('Set the middle octave','Tune the temperament section (usually F3 to F4), by app or by counting beats.'),
('Work outward, one string per note','Tune up into the treble and down into the bass, following the app&#39;s stretch.'),
('Tune the unisons','Pull the mutes and tune each note&#39;s other strings to the one you tuned, until the beats stop.'),
('Play and recheck','Play octaves and chords. Fix anything that sounds sour, then close the piano.')]
cards=''.join(f'<div class="card" style="padding:14px 18px;display:flex;gap:14px"><span style="flex:none;width:40px;height:40px;border-radius:50%;background:{[T,T,T,A,A,G,G,BL][i]};color:#fff;display:grid;place-items:center;font-weight:800;font-size:20px">{i+1}</span><div><div style="font-size:21px;font-weight:800">{a}</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:3px">{b}</div></div></div>' for i,(a,b) in enumerate(steps))
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;grid-auto-flow:column;grid-template-rows:repeat(4,auto)">{cards}</div>'
imgs['how-to-tune-a-piano-steps']=(820,page(820,'Step by step','How to tune a piano in 8 steps',body,'Based on a typical app-assisted DIY tuning of an upright'))

def bar(lbl,vals,c):
    return f'<div style="display:flex;align-items:center;gap:12px;margin:8px 0"><div style="width:150px;font-size:17px;font-weight:700">{lbl}</div><div style="flex:1;position:relative;height:30px;background:#eef3f4;border-radius:8px">'+''.join(f'<div style="position:absolute;left:0;top:0;bottom:0;width:{v}%;background:{c};border-radius:8px;opacity:{o}"></div>' for v,o in vals)+'</div></div>'
pr=f'''<svg viewBox="0 0 1000 250" width="100%">
<line x1="60" x2="980" y1="90" y2="90" stroke="{G}" stroke-width="3" stroke-dasharray="7 6"/><text x="975" y="118" text-anchor="end" font-size="17" font-weight="800" fill="{G}">target pitch</text>
<line x1="60" x2="980" y1="210" y2="210" stroke="{R}" stroke-width="3"/><text x="70" y="238" font-size="17" font-weight="800" fill="{R}">where a long-neglected piano sits: well flat</text>
<path d="M120 210 C 260 210 300 70 420 70" fill="none" stroke="{A}" stroke-width="6" stroke-linecap="round"/><text x="130" y="50" font-size="18" font-weight="800" fill="{INK}">Pass 1: rough tuning, a little past target</text>
<path d="M428 70 C 480 70 500 112 556 112" fill="none" stroke="{MU}" stroke-width="4" stroke-dasharray="5 6"/><text x="440" y="150" font-size="16" font-weight="700" fill="{MU}">earlier strings sag as the load rises</text>
<path d="M566 112 C 650 112 700 90 860 90" fill="none" stroke="{T}" stroke-width="6" stroke-linecap="round"/><text x="620" y="70" font-size="18" font-weight="800" fill="{INK}">Pass 2: fine tuning</text>
<polygon points="870,84 890,90 870,96" fill="{T}"/></svg>'''
body=f'''<div class="card" style="padding:16px 24px">{pr}</div>
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:14px">
<div class="card" style="padding:16px 18px"><div style="font-size:21px;font-weight:800">Why one pass isn&#39;t enough</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:4px">Raising every string adds load to the frame and soundboard. As later strings come up, the earlier ones drift flat again.</div></div>
<div class="card" style="padding:16px 18px"><div style="font-size:21px;font-weight:800">When it&#39;s needed</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:4px">Typically after years without a tuning. A common DIY guideline: two passes if the piano is more than 10 to 15 cents flat overall.</div></div>
<div class="card" style="padding:16px 18px"><div style="font-size:21px;font-weight:800">What it costs</div><div style="font-size:17px;{SER};line-height:1.4;margin-top:4px">Technicians usually charge extra for a pitch raise, on top of the normal tuning fee, because it is two jobs in one visit.</div></div></div>'''
imgs['piano-pitch-raise-explained']=(700,page(700,'Pitch raise','What a pitch raise is, and why it takes two passes',body,'Simplified diagram'))

lv=f'''<svg viewBox="0 0 520 420" width="100%">
<rect x="20" y="300" width="480" height="80" rx="12" fill="#a77a52"/><text x="260" y="400" text-anchor="middle" font-size="16" fill="{MU}">pin block</text>
<circle cx="260" cy="300" r="14" fill="#c9d3d7" stroke="{INK}" stroke-width="2.5"/>
<rect x="246" y="170" width="28" height="130" rx="6" fill="#8a979c" stroke="{INK}" stroke-width="2.5"/>
<rect x="216" y="90" width="88" height="90" rx="22" fill="{INK}"/>
<rect x="290" y="110" width="200" height="44" rx="20" fill="{T}"/>
<path d="M400 60 A 160 160 0 0 1 470 92" fill="none" stroke="{A}" stroke-width="6" stroke-linecap="round"/><polygon points="472,80 482,100 460,98" fill="{A}"/>
<text x="350" y="50" font-size="19" font-weight="800" fill="{INK}">tiny movements</text>
<line x1="20" x2="200" y1="300" y2="300" stroke="#d9c27a" stroke-width="4"/><line x1="320" x2="500" y1="300" y2="300" stroke="#d9c27a" stroke-width="4"/></svg>'''
tips=[('Seat the tip fully','Push the star tip all the way down onto the pin so it can&#39;t slip.'),('Turn, don&#39;t bend','Keep the force going around the pin. Leaning on the lever sideways can bend the pin or loosen it in the block.'),('Move a hair at a time','A tiny turn changes the pitch a lot. Listen after every nudge.'),('Settle the pin','Many tuners go a touch above pitch, then ease back down so the pin and string stay put.'),('Firm, not hard, test blows','Strike the key firmly to settle the string, but not so hard you hurt the piano or your ears.')]
tl=''.join(f'<div style="display:flex;gap:12px;padding:10px 0;border-top:1px solid {LINE}"><span style="flex:none;width:32px;height:32px;border-radius:50%;background:{T};color:#fff;display:grid;place-items:center;font-weight:800">{i+1}</span><div><b style="font-size:20px">{a}</b><div style="font-size:17px;{SER};line-height:1.38">{b}</div></div></div>' for i,(a,b) in enumerate(tips))
body=f'<div style="display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:16px"><div class="card" style="padding:18px">{lv}</div><div class="card" style="padding:8px 22px">{tl}</div></div>'
imgs['piano-tuning-lever-technique']=(700,page(700,'Lever technique','How to use a piano tuning lever without damaging the pin',body,'Techniques vary between tuners; these are the common basics'))

ft='''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet"><style>*{margin:0;box-sizing:border-box}body{width:1200px;height:HHpx;background:radial-gradient(circle at 78% 22%,#21485a,#0f1a20 70%);font-family:"Schibsted Grotesk",Arial,sans-serif;color:#fff;overflow:hidden;position:relative}</style></head><body>
<div style="position:absolute;left:64px;top:T1px;width:620px"><div style="font-size:22px;font-weight:800;letter-spacing:.16em;color:#f6b31e">A PIANO TEACHER&#39;S GUIDE</div><div style="font-size:92px;font-weight:800;line-height:.96;margin:12px 0 18px">How to Tune a Piano</div><div style="font-size:28px;font-weight:500;line-height:1.3;color:#cfe3ea">The tools, the 8 steps, and when to call a professional instead</div>
<div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">TILES</div></div>
<div style="position:absolute;right:50px;top:T2px;width:470px">HERO</div>
<div style="position:absolute;left:64px;bottom:34px;font-size:20px;font-weight:800;letter-spacing:.14em;color:#8fd0a8">PIANOERS.COM</div></body></html>'''
pins=''.join(f'<circle cx="{40+i*40}" cy="{70+(i%2)*26}" r="11" fill="#c9d3d7" stroke="#0f1a20" stroke-width="2"/>' for i in range(11))
strs=''.join(f'<line x1="{40+i*40}" y1="{80+(i%2)*26}" x2="{52+i*38}" y2="520" stroke="#d9c27a" stroke-width="3"/>' for i in range(11))
hero=f'''<svg viewBox="0 0 470 520" width="100%"><rect x="0" y="20" width="470" height="110" rx="14" fill="#a77a52"/>{pins}{strs}
<rect x="190" y="-10" width="30" height="96" rx="6" fill="#8a979c" stroke="#0f1a20" stroke-width="2"/><rect x="160" y="-80" width="90" height="86" rx="22" fill="#0b1114" stroke="#f6b31e" stroke-width="3"/><rect x="236" y="-60" width="230" height="44" rx="20" fill="#2e6475"/>
<rect x="282" y="230" width="176" height="44" rx="10" fill="#0f1a20"/><path d="M310 252 q 15 -18 30 0 t 30 0 t 30 0 t 30 0" fill="none" stroke="#f6b31e" stroke-width="4"/><rect x="282" y="280" width="176" height="44" rx="10" fill="#0f1a20" stroke="#f6b31e" stroke-width="2"/><text x="370" y="311" text-anchor="middle" font-size="24" font-weight="800" fill="#f6b31e">A4 = 440 Hz</text></svg>'''.replace('viewBox="0 0 470 520"','viewBox="0 -90 470 610"')
tiles=''.join(f'<span style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:8px 12px;font-size:19px;font-weight:700">{t}</span>' for t in ['Tools','Apps','Step by step','DIY or pro?'])
ft=ft.replace('HERO',hero).replace('TILES',tiles)
imgs['how-to-tune-a-piano-featured']=(675,ft.replace('HH','675').replace('T1','120').replace('T2','40'))
imgs['how-to-tune-a-piano-social']=(630,ft.replace('HH','630').replace('T1','96').replace('T2','24'))
json.dump(imgs,open('imgs2.json','w'))
