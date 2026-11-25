import json
html='''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet"><style>
*{margin:0;box-sizing:border-box}body{width:1024px;height:1024px;background:#f1b231;position:relative;overflow:hidden;font-family:Poppins,sans-serif}
h1{position:absolute;left:0;right:0;top:78px;text-align:center;color:#fff;font-weight:600;font-size:62px;letter-spacing:-.005em}
.p{position:absolute;left:140px;right:140px;top:236px;height:616px;background:#fffbf2;display:grid;place-items:center}
.p img{width:118%;margin-left:-9%;display:block;filter:drop-shadow(0 18px 18px rgb(60 40 10/.22))}
.l{position:absolute;left:50%;bottom:58px;width:560px;transform:translateX(-50%)}.l img{width:100%;display:block}
</style></head><body><h1>Alesis Recital Pro MKII</h1>
<div class="p"><img src="file:///home/user/dt/pianoers/alesis-recital-pro-review/images/piano-cutout.png"></div>
<div class="l"><img src="file:///tmp/claude-0/-home-user-dt/264ebcbd-ccda-5595-866c-f65d1d0f3d43/scratchpad/logo_big.png"></div></body></html>'''
json.dump([{'name':'Alesis-Recital-Pro-MKII-Reviewed','w':1024,'h':1024,'scale':1,'html':html}],open('tile.json','w'))
