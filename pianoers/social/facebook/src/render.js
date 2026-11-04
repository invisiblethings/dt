const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
(async () => {
  const b = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined, args: ['--ignore-certificate-errors', '--allow-file-access-from-files'] });
  for (const j of jobs) {
    const f = path.join(__dirname, j.name + '.html');
    fs.writeFileSync(f, j.html);
    const pg = await (await b.newContext({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 1, ignoreHTTPSErrors: true })).newPage();
    await pg.goto('file://' + f, { waitUntil: 'networkidle' }); await pg.waitForTimeout(600);
    const out = path.join(__dirname, '..', 'assets', j.name + (j.type === 'jpeg' ? '.jpg' : '.png'));
    await pg.screenshot({ path: out, type: j.type || 'png', quality: j.type === 'jpeg' ? 92 : undefined });
    fs.unlinkSync(f);
    console.log(j.name, fs.statSync(out).size);
  }
  await b.close();
})();
