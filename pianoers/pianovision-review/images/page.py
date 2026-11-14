HEAD='''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:ital,wght@0,500;1,500&family=Noto+Music&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0}
body{width:1200px;height:%dpx;font-family:"Schibsted Grotesk",Arial,sans-serif;background:#f3f6f7;color:#15191c;padding:52px 60px 0;position:relative;overflow:hidden}
.eyebrow{font-size:20px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2e6475}
h1{font-size:48px;line-height:1.05;font-weight:800;letter-spacing:-.01em;margin:8px 0 26px}
.foot{position:absolute;left:60px;right:60px;bottom:20px;display:flex;justify-content:space-between;font-size:17px;color:#56666e;font-weight:500}
.foot b{letter-spacing:.12em;color:#2e6475}
.card{background:#fff;border:1px solid #d9e2e5;border-radius:20px;box-shadow:0 1px 2px rgb(21 25 28/6%%),0 8px 24px rgb(21 25 28/6%%)}
svg text{font-family:"Schibsted Grotesk",Arial,sans-serif}
.mus{font-family:"Noto Music",serif}
</style></head><body>'''
def page(h,eyebrow,title,body,note='Pianoers.com · PianoVision review'):
    return HEAD%h+f'<div class="eyebrow">{eyebrow}</div><h1>{title}</h1>'+body+f'<div class="foot"><span>{note}</span><b>PIANOERS.COM</b></div></body></html>'
