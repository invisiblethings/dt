import os,sys
from playwright.sync_api import sync_playwright
proxy=os.environ.get('HTTPS_PROXY')
with sync_playwright() as p:
    kw={'executable_path':"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",'args':['--ignore-certificate-errors','--allow-file-access-from-files']}
    if proxy: kw['proxy']={'server':proxy}
    b=p.chromium.launch(**kw)
    for w,h,name in [(1200,675,'piano-marvel-review-feature-1200x675'),(1200,630,'piano-marvel-review-social-1200x630')]:
        pg=b.new_context(viewport={'width':w,'height':h},device_scale_factor=1,ignore_https_errors=True).new_page()
        pg.goto('file://'+os.path.abspath('feat.html'),wait_until='networkidle')
        pg.evaluate(f"document.body.style.setProperty('--h','{h}px')")
        if h==630: pg.add_style_tag(content=".tab{top:118px;width:610px}.text{bottom:66px}.brand{bottom:78px}.keys{height:56px}")
        pg.wait_for_timeout(600); pg.screenshot(path=name+'.png')
    b.close()
