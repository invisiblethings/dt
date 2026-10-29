import os
from playwright.sync_api import sync_playwright
HEAD='''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:%dpx;font-family:"Schibsted Grotesk",Arial,sans-serif;background:#f3f6f7;color:#15191c;padding:56px 64px 0;position:relative;overflow:hidden}
.eyebrow{font-size:20px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2e6475}
h1{font-size:50px;line-height:1.05;font-weight:800;letter-spacing:-.01em;margin:10px 0 30px}
.foot{position:absolute;left:64px;right:64px;bottom:22px;display:flex;justify-content:space-between;font-size:17px;color:#56666e;font-weight:500}
.foot b{letter-spacing:.12em;color:#2e6475}
.card{background:#fff;border:1px solid #d9e2e5;border-radius:20px;box-shadow:0 1px 2px rgb(21 25 28/6%%),0 8px 24px rgb(21 25 28/6%%)}
.amber{background:#f6b31e;color:#1b1400}
</style></head><body>'''
def page(h,body,src):
    return HEAD%h+body+f'<div class="foot"><span>{src}</span><b>PIANOERS.COM</b></div></body></html>'
imgs={}

# 1 Free vs Premium
rows=[("Songs","150+","25,000+"),("Lesson exercises","200+","1,200+"),("Video lessons","25","200+"),("Scored feedback","✓","✓"),("SASR sight-reading tests","Limited","Unlimited"),("Upload your own music","—","✓")]
r=''.join(f'<div class="r"><span class="k">{a}</span><span class="v">{b}</span><span class="v p">{c}</span></div>' for a,b,c in rows)
imgs['piano-marvel-free-vs-premium']=(760,page(760,f'''<style>
.t{{display:grid;grid-template-columns:1fr 250px 250px;overflow:hidden}}
.hd{{display:contents}}.hd div{{padding:22px 26px;font-weight:800;font-size:26px}}
.hd .f{{background:#e2eef1;color:#2e6475;text-align:center}}.hd .pr{{background:#f6b31e;text-align:center}}
.hd small{{display:block;font-size:20px;font-weight:700;margin-top:4px}}
.r{{display:contents}}.r span{{padding:17px 26px;font-size:25px;border-top:1px solid #d9e2e5}}
.k{{font-weight:500}}.v{{text-align:center;font-weight:700;color:#2e6475}}.v.p{{background:#fff8e6;color:#1b1400}}
</style><div class="eyebrow">Piano Marvel plans</div><h1>Free plan vs Premium</h1>
<div class="card t"><div class="hd"><div></div><div class="f">Free<small>$0</small></div><div class="pr">Premium<small>$129.99/yr or $17.99/mo</small></div></div>{r}</div>''','Prices from pianomarvel.com/pricing, checked Oct 18, 2026 (US)'))

# 2 SASR flow
steps=[("1","Pick your start","Beginner, intermediate or advanced"),("2","20 seconds to look","A new piece you've never seen"),("3","Play it through","Scored on notes and rhythm")]
s=''.join(f'<div class="card st"><div class="n">{n}</div><div class="tt">{t}</div><div class="d">{d}</div></div><div class="ar">→</div>' for n,t,d in steps)
imgs['piano-marvel-sasr-test-explained']=(740,page(740,f'''<style>
.row{{display:flex;align-items:stretch;gap:10px}}.st{{flex:1;padding:26px 24px;display:flex;flex-direction:column;gap:8px}}
.n{{width:46px;height:46px;border-radius:12px;background:#1c2226;color:#fff;display:grid;place-items:center;font-weight:800;font-size:24px}}
.tt{{font-size:28px;font-weight:800;line-height:1.1}}.d{{font-size:21px;color:#56666e;font-family:Lora,serif}}
.ar{{display:grid;place-items:center;font-size:40px;color:#2e6475;font-weight:800}}
.row .ar:last-child{{display:none}}
.split{{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:20px}}
.res{{padding:24px 26px;border-radius:20px;font-size:25px;font-weight:700;line-height:1.3}}
.res b{{display:block;font-size:34px;font-weight:800;margin-bottom:4px}}
.up{{background:#e3f3e9;color:#1f5e3c}}.down{{background:#fbe6e0;color:#8a3420}}
.end{{margin-top:20px;padding:24px 28px;display:flex;align-items:center;justify-content:space-between;gap:20px}}
.end .l{{font-size:26px;font-weight:700}}.end .sc{{font-size:22px;color:#56666e}}.end .big{{font-size:44px;font-weight:800;color:#2e6475}}
</style><div class="eyebrow">Standard Assessment of Sight Reading</div><h1>How the SASR test works</h1>
<div class="row">{s}</div>
<div class="split"><div class="res up"><b>80% or more</b>The next piece is harder</div><div class="res down"><b>Under 80%</b>You get a strike</div></div>
<div class="card end"><div class="l">3 strikes end the test → you get your SASR score</div><div><span class="big">up to 1,900</span><div class="sc">18 levels · 90 sublevels (1a to 18e)</div></div></div>''','Source: Piano Marvel, "The Ultimate Sight Reading Test"'))

# 3 MIDI vs mic
imgs['piano-marvel-midi-vs-microphone']=(690,page(690,'''<style>
.g{display:grid;grid-template-columns:1fr 1fr;gap:22px}.c{padding:30px 30px 28px;display:flex;flex-direction:column;gap:16px}
.tag{align-self:flex-start;padding:6px 14px;border-radius:999px;font-weight:800;font-size:19px}
.rec{background:#f6b31e}.ok{background:#e2eef1;color:#2e6475}
.c h2{font-size:36px;font-weight:800}
.chain{display:flex;align-items:center;gap:10px;font-size:22px;font-weight:700}
.chain span{padding:12px 14px;border-radius:12px;background:#f3f6f7;border:1px solid #d9e2e5}
.chain i{font-style:normal;color:#2e6475;font-weight:800;font-size:26px}
ul{padding-left:0;list-style:none;display:flex;flex-direction:column;gap:10px}
li{font-family:Lora,serif;font-size:22px;line-height:1.35;padding-left:34px;position:relative}
li::before{position:absolute;left:0;top:0;font-family:"Schibsted Grotesk";font-weight:800}
li.y::before{content:"✓";color:#1f7a4d}li.n::before{content:"!";color:#b0442d;left:8px}
</style><div class="eyebrow">What you need</div><h1>MIDI cable or microphone?</h1>
<div class="g">
<div class="card c"><span class="tag rec">Recommended</span><h2>MIDI connection</h2>
<div class="chain"><span>Digital piano</span><i>→</i><span>USB cable</span><i>→</i><span>Tablet or computer</span></div>
<ul><li class="y">Knows exactly which key you pressed, and when</li><li class="y">Most accurate scores and SASR results</li><li class="y">A USB-B cable costs about $10; some pianos use Bluetooth MIDI</li></ul></div>
<div class="card c"><span class="tag ok">For acoustic pianos</span><h2>Microphone mode</h2>
<div class="chain"><span>Acoustic piano</span><i>→</i><span>Device microphone</span></div>
<ul><li class="y">No cable, works with any piano</li><li class="n">Results vary with room noise and the piano</li><li class="n">Fine for trying the app, less reliable for scored tests</li></ul></div>
</div>''','Based on Piano Marvel\'s App Store listing, Oct 2026'))

# 4 cost chart
data=[("Pianoforall",49,"$49 once","after a 7-day free trial"),("Piano Marvel",129.99,"$129.99","free plan available"),("Skoove",149.99,"$149.99",""),("Flowkey Premium",149.99,"$149.99",""),("Playground Sessions",149.99,"$149.99","first year often $99.99"),("Simply Piano",169.90,"$169.90","")]
mx=180
bars=''.join(f'<div class="nm{" hl" if n=="Piano Marvel" else ""}">{n}{f"<em>{x}</em>" if x else ""}</div><div class="tr"><div class="b{" hl" if n=="Piano Marvel" else ""}{" pf" if n=="Pianoforall" else ""}" style="width:calc((100% - 150px) * {v/mx:.4f})"></div><span class="lb">{l}</span></div>' for n,v,l,x in data)
imgs['piano-marvel-cost-vs-alternatives']=(800,page(800,f'''<style>
.ch{{padding:30px 34px 22px;display:grid;grid-template-columns:300px 1fr;row-gap:18px;align-items:center}}
.nm{{font-size:25px;font-weight:700;line-height:1.15}}.nm.hl{{font-weight:800}}.nm em{{display:block;font-style:normal;font-weight:500;color:#56666e;font-size:18px}}
.tr{{position:relative;height:54px;display:flex;align-items:center}}
.b{{height:100%;border-radius:0 10px 10px 0;background:#9fbcc5}}.b.hl{{background:#f6b31e}}.b.pf{{background:#2e6475}}
.lb{{margin-left:14px;font-size:24px;font-weight:800;white-space:nowrap}}
.ax{{grid-column:2;width:calc(100% - 150px);display:flex;justify-content:space-between;font-size:17px;color:#56666e;border-top:1px solid #d9e2e5;padding-top:8px}}
</style><div class="eyebrow">What it costs</div><h1>Your first year, compared</h1>
<div class="card ch">{bars}<div class="ax"><span>$0</span><span>$45</span><span>$90</span><span>$135</span><span>$180</span></div></div>''','Yearly plans, US prices checked Oct 11–19, 2026'))

# 5 first week
days=[("Day 1","Connect & test","Free account, USB cable, choose MIDI. Take the SASR test and write down your score."),("Days 2–6","20 minutes a day","10 min Method or library · 5 min reading drills · 5 min Technique"),("Day 7","Decide","Practised 5+ days and scores climbing? The yearly plan is good value. Dreaded it? Try another app.")]
d=''.join(f'<div class="card dy"><div class="dl">{a}</div><div class="dt">{b}</div><div class="dd">{c}</div></div>' for a,b,c in days)
imgs['piano-marvel-first-week-plan']=(650,page(650,f'''<style>
.w{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}}.dy{{padding:28px 26px;display:flex;flex-direction:column;gap:12px}}
.dl{{align-self:flex-start;padding:6px 14px;border-radius:999px;background:#1c2226;color:#fff;font-weight:800;font-size:20px}}
.dy:last-child .dl{{background:#f6b31e;color:#1b1400}}
.dt{{font-size:32px;font-weight:800;line-height:1.1}}.dd{{font-family:Lora,serif;font-size:23px;line-height:1.4;color:#33424a}}
.keys{{position:absolute;left:0;right:0;bottom:64px;height:46px;display:grid;grid-template-columns:repeat(36,1fr);gap:3px;padding:0 3px;opacity:.9}}
.keys i{{background:#fff;border:1px solid #d9e2e5;border-top:0;border-radius:0 0 5px 5px;position:relative}}
.keys i.bk::after{{content:"";position:absolute;right:-8px;top:0;width:13px;height:28px;background:#1c2226;border-radius:0 0 3px 3px;z-index:2}}
.keys i.lit{{background:#f6b31e;border-color:#f6b31e}}
</style><div class="eyebrow">Getting started</div><h1>Your first week with Piano Marvel</h1><div class="w">{d}</div>
<div class="keys" id="k"></div><script>const k=document.getElementById('k');const p=[1,1,0,1,1,1,0];for(let i=0;i<36;i++){{const e=document.createElement('i');if(p[i%7]&&i<35)e.className='bk';if([14,16,18].includes(i))e.className+=' lit';k.appendChild(e)}}</script>''','From our Piano Marvel review'))

proxy=os.environ.get('HTTPS_PROXY')
with sync_playwright() as p:
    kw={'executable_path':"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",'args':['--ignore-certificate-errors']}
    if proxy: kw['proxy']={'server':proxy}
    b=p.chromium.launch(**kw)
    for name,(h,html) in imgs.items():
        open(name+'.html','w',encoding='utf-8').write(html)
        pg=b.new_context(viewport={'width':1200,'height':h},device_scale_factor=1.5,ignore_https_errors=True).new_page()
        pg.goto('file://'+os.path.abspath(name+'.html'),wait_until='networkidle'); pg.wait_for_timeout(500)
        pg.screenshot(path=name+'.png')
        print(name, pg.evaluate("document.body.scrollHeight"), h)
    b.close()
from PIL import Image
for name in imgs:
    Image.open(name+'.png').convert('RGB').save(name+'.webp','WEBP',quality=84); os.remove(name+'.png')
    print(name, os.path.getsize(name+'.webp'))
