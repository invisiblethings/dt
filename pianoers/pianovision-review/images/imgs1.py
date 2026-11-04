import json
from page import page
from kb import keyboard, white_seq
imgs={}
T='#2e6475';A='#f6b31e';V='#6b3fd4';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'

rows=[('Mixed reality experience',4.7),('Feedback with a MIDI keyboard',4.5),('Song library (with Plus)',4.5),('Value for money',4.4),('Structured teaching',3.4),('Comfort in long sessions',3.2)]
bars=''
for n,s in rows:
    pct=s/5*100
    bars+=f'<div style="display:grid;grid-template-columns:400px minmax(0,1fr) 70px;align-items:center;gap:18px;padding:12px 0;border-top:1px solid {LINE}"><span style="font-size:22px;font-weight:700">{n}</span><span style="height:18px;border-radius:9px;background:#e8eef0;overflow:hidden"><span style="display:block;height:100%;width:{pct:.0f}%;background:{V};border-radius:9px"></span></span><span style="font-size:24px;font-weight:800;text-align:right">{s:.1f}</span></div>'
body=f'''<div style="display:grid;grid-template-columns:300px minmax(0,1fr);gap:22px">
<div class="card" style="padding:30px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:{V};border-color:{V};color:#fff">
<div style="font-size:20px;font-weight:700;letter-spacing:.12em;opacity:.85">OVERALL</div>
<div style="font-size:120px;font-weight:800;line-height:1">4.1</div>
<div style="font-size:24px;font-weight:700;opacity:.9">out of 5</div>
<div style="margin-top:18px;font-size:19px;text-align:center;line-height:1.35;opacity:.95">Best with a MIDI keyboard and a Quest 3 or 3S</div></div>
<div class="card" style="padding:14px 28px 10px">{bars}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px">
<div class="card" style="padding:18px 22px"><div style="font-size:20px;font-weight:800;color:#1f7a4d">Best part</div><div style="font-size:19px;{SER};margin-top:4px;line-height:1.4">Notes fall straight onto your own keys, so you never look away to a screen.</div></div>
<div class="card" style="padding:18px 22px"><div style="font-size:20px;font-weight:800;color:#b3261e">Weakest part</div><div style="font-size:19px;{SER};margin-top:4px;line-height:1.4">It trains songs well, but it is not a full method for reading, theory and technique.</div></div></div>'''
imgs['pianovision-review-score']=(760,page(760,'PianoVision review','My PianoVision score',body,'Scores are the reviewer&#39;s own ratings'))

def opt(num,title,need,how,good,col):
    return f'''<div class="card" style="padding:20px 22px;border-top:8px solid {col}">
<div style="display:flex;align-items:center;gap:12px"><span style="width:40px;height:40px;border-radius:50%;background:{col};color:#fff;display:grid;place-items:center;font-size:22px;font-weight:800">{num}</span><span style="font-size:24px;font-weight:800">{title}</span></div>
<div style="margin-top:12px;font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">YOU NEED</div><div style="font-size:18.5px;line-height:1.4">{need}</div>
<div style="margin-top:10px;font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">HOW IT WORKS</div><div style="font-size:18.5px;{SER};line-height:1.4">{how}</div>
<div style="margin-top:12px;padding:8px 12px;border-radius:10px;background:#f3f6f7;font-size:17px;font-weight:700">{good}</div></div>'''
def chain(items):
    out=''
    for i,(lab,sub) in enumerate(items):
        if i: out+=f'<span style="font-size:30px;color:{MU};font-weight:800">&#8594;</span>'
        out+=f'<span style="background:#fff;border:2px solid {LINE};border-radius:12px;padding:8px 14px;text-align:center"><b style="font-size:19px;display:block">{lab}</b><span style="font-size:15px;color:{MU}">{sub}</span></span>'
    return f'<div style="display:flex;align-items:center;gap:10px;flex-wrap:nowrap">{out}</div>'
body=f'''<div class="card" style="padding:18px 24px;margin-bottom:16px;display:grid;gap:12px">
<div style="display:flex;align-items:center;gap:18px"><span style="width:150px;font-size:18px;font-weight:800;color:{T}">USB CABLE</span>{chain([('Keyboard','USB-B &#8220;to host&#8221; port'),('USB-B to USB-C cable','or USB-C to USB-C'),('Quest headset','USB-C port')])}</div>
<div style="display:flex;align-items:center;gap:18px"><span style="width:150px;font-size:18px;font-weight:800;color:{V}">DESKTOP APP</span>{chain([('Keyboard','USB'),('PC or Mac','free PianoVision app'),('Home Wi-Fi','same network'),('Quest headset','connect code')])}</div>
<div style="display:flex;align-items:center;gap:18px"><span style="width:150px;font-size:18px;font-weight:800;color:#b07a00">BLUETOOTH</span>{chain([('Keyboard','built-in Bluetooth MIDI'),('USB Bluetooth MIDI dongle','e.g. CME WIDI Bud Pro'),('Quest headset','dongle in its USB-C port')])}</div></div>
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px">
{opt(1,'USB cable','A keyboard with USB MIDI and the right cable','Plug the keyboard straight into the headset. No computer, no Wi-Fi.','Simplest and most reliable',T)}
{opt(2,'Desktop app','A Windows PC or Mac on the same Wi-Fi network','The computer reads the keyboard over USB and sends the notes to the Quest.','Also needed to upload MIDI songs',V)}
{opt(3,'No keyboard','Nothing extra: hand tracking only','A virtual piano appears in front of you and the headset tracks your fingers.','Fine to try, not for real practice','#b07a00')}</div>
<div style="margin-top:14px;font-size:18px;color:{MU};line-height:1.4">The Quest does not pair with Bluetooth MIDI keyboards directly. For a Bluetooth keyboard, PianoVision&#39;s compatibility list mentions a USB dongle such as the CME WIDI Bud Pro. Older keyboards with 5-pin DIN MIDI ports can use a MIDI-to-USB adapter cable.</div>'''
imgs['pianovision-connection-options']=(940,page(940,'Setup','How to connect a keyboard to PianoVision',body,'Based on PianoVision&#39;s setup guide and keyboard compatibility list'))

def tier(name,price,sub,items,col,bg,badge=''):
    li=''.join(f'<div style="display:flex;gap:12px;padding:9px 0;border-top:1px solid {LINE}"><span style="flex:none;width:26px;height:26px;border-radius:50%;background:{col};color:#fff;display:grid;place-items:center;font-size:15px;font-weight:800">&#10003;</span><span style="font-size:19px;line-height:1.35">{x}</span></div>' for x in items)
    b=f'<span style="position:absolute;top:-16px;right:20px;background:{A};color:#1b1400;font-size:15px;font-weight:800;letter-spacing:.08em;padding:6px 12px;border-radius:999px">{badge}</span>' if badge else ''
    return f'<div class="card" style="padding:24px 26px;background:{bg};position:relative;border-top:8px solid {col}">{b}<div style="font-size:26px;font-weight:800">{name}</div><div style="display:flex;align-items:baseline;gap:10px;margin:6px 0 2px"><span style="font-size:58px;font-weight:800;color:{col}">{price}</span></div><div style="font-size:19px;color:{MU};font-weight:700;margin-bottom:12px">{sub}</div>{li}</div>'
body=f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
{tier('PianoVision Basic','$9.99','one-time purchase, yours to keep',['1,000+ public domain songs','100 MIDI imports','Hundreds of chords and scales','Jazz song generator','Holiday music pack','Basic AI assistant'],T,'#fff')}
{tier('PianoVision Plus','$9.99/mo','or $99.99 a year, subscribe in the app',['Everything in Basic','10,000+ popular songs, 1,500+ artists','400+ curated playlists','Contextual AI assistant','Auto-generated sheet music and finger numbers','Bespoke mixed reality environments'],V,'#faf7ff','OPTIONAL')}</div>
<div style="margin-top:16px;font-size:18.5px;color:{MU};line-height:1.4">You need a Meta Quest headset to use either tier. Basic is bought on the Meta Horizon Store. Plus is a subscription you can cancel at any time. Prices in USD, checked on pianovision.com in October 2026.</div>'''
imgs['pianovision-price-basic-vs-plus']=(790,page(790,'Pricing','PianoVision Basic vs PianoVision Plus',body,'Source: pianovision.com pricing section'))

costs=[('Quest 3S 128 GB + Basic','first year',359.98,T),('Quest 3S 128 GB + Basic + Plus (yearly)','first year',459.97,V),('Quest 3 512 GB + Basic + Plus (yearly)','first year',709.97,'#4a2a9e'),('Weekly 1-hour lessons at $45','one year, 52 lessons',2340.00,A)]
mx=2340
rws=''
for n,sub,v,c in costs:
    w=v/mx*100
    rws+=f'<div style="padding:12px 0;border-top:1px solid {LINE}"><div style="display:flex;justify-content:space-between;font-size:21px;font-weight:700"><span>{n} <span style="color:{MU};font-weight:500;font-size:17px">· {sub}</span></span><span style="font-weight:800">${v:,.2f}</span></div><div style="height:26px;margin-top:8px;border-radius:8px;background:#eef2f3"><div style="height:100%;width:{w:.1f}%;background:{c};border-radius:8px"></div></div></div>'
body=f'''<div class="card" style="padding:12px 28px 16px">{rws}</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
<div class="card" style="padding:16px 20px"><div style="font-size:19px;font-weight:800">Already own a Quest?</div><div style="font-size:18px;{SER};line-height:1.4;margin-top:4px">Then PianoVision costs $9.99 once, or $109.98 in the first year with yearly Plus.</div></div>
<div class="card" style="padding:16px 20px"><div style="font-size:19px;font-weight:800">Not a replacement for a teacher</div><div style="font-size:18px;{SER};line-height:1.4;margin-top:4px">Lessons buy you correction of posture, technique and musicality. The app cannot do that.</div></div></div>
<div style="margin-top:12px;font-size:16.5px;color:{MU}">US list prices: Quest 3S 128 GB $349.99, Quest 3 512 GB $599.99 (Meta, from April 19, 2026). $45 an hour is the average lesson cost PianoVision quotes. A keyboard is not included.</div>'''
imgs['pianovision-cost-first-year']=(790,page(790,'Cost','What PianoVision really costs in year one',body,'Sales and local prices vary'))
json.dump(imgs,open('imgs1.json','w'))
