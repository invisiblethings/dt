import os,sys,json
from playwright.sync_api import sync_playwright
from PIL import Image
files=sys.argv[1:]
imgs={}
for f in files: imgs.update(json.load(open(f)))
proxy=os.environ.get('HTTPS_PROXY')
with sync_playwright() as p:
    kw={'executable_path':"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",'args':['--ignore-certificate-errors']}
    if proxy: kw['proxy']={'server':proxy}
    b=p.chromium.launch(**kw)
    for name,(h,html) in imgs.items():
        open(f'/tmp/claude-0/-home-user-dt/264ebcbd-ccda-5595-866c-f65d1d0f3d43/scratchpad/{name}.html','w').write(html)
        pg=b.new_context(viewport={'width':1200,'height':h},device_scale_factor=1.5,ignore_https_errors=True).new_page()
        pg.goto('file:///tmp/claude-0/-home-user-dt/264ebcbd-ccda-5595-866c-f65d1d0f3d43/scratchpad/'+name+'.html',wait_until='networkidle'); pg.wait_for_timeout(700)
        need=pg.evaluate("()=>{let m=0;for(const e of document.body.children){if(e.classList.contains('foot'))continue;m=Math.max(m,e.getBoundingClientRect().bottom)}return Math.ceil(m+76)}")
        if need!=h and pg.evaluate("()=>!!document.querySelector('.foot')"):
            pg.evaluate("n=>document.body.style.height=n+'px'",need); pg.set_viewport_size({'width':1200,'height':need}); pg.wait_for_timeout(200)
        pg.screenshot(path=name+'.png'); 
        Image.open(name+'.png').convert('RGB').save(name+'.webp','WEBP',quality=84); os.remove(name+'.png')
        print(name,os.path.getsize(name+'.webp'))
    b.close()
