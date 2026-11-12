const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const outDir = process.argv[3];
(async () => {
  const b = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined, args: ['--ignore-certificate-errors'] });
  for (const j of jobs) {
    const f = path.join(__dirname, '_' + j.name + '.html');
    fs.writeFileSync(f, j.html);
    const ctx = await b.newContext({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: j.scale || 1.5, ignoreHTTPSErrors: true });
    const pg = await ctx.newPage();
    await pg.goto('file://' + f, { waitUntil: 'networkidle' }); await pg.waitForTimeout(500);
    if (j.fit) {
      const need = await pg.evaluate(() => { let m = 0; for (const e of document.body.children) { if (e.classList.contains('foot')) continue; m = Math.max(m, e.getBoundingClientRect().bottom); } return Math.ceil(m + 76); });
      await pg.evaluate(n => document.body.style.height = n + 'px', need); await pg.setViewportSize({ width: j.w, height: need }); await pg.waitForTimeout(150);
    }
    if (j.pdf) { await pg.pdf({ path: path.join(outDir, j.name + '.pdf'), format: 'Letter', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } }); }
    else { await pg.screenshot({ path: path.join(outDir, j.name + '.png') }); }
    fs.unlinkSync(f); await ctx.close(); console.log(j.name);
  }
  await b.close();
})();
