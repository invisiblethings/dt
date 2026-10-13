#!/usr/bin/env node
/**
 * End-to-end browser test: real widget + real Worker code (in Node) + scripted fake Gemini.
 * Run: npm run e2e     (needs Playwright + Chromium available locally; not a production dependency)
 *
 * Env: PLAYWRIGHT_MODULE (path to playwright package), CHROMIUM_PATH (browser binary), SHOTS_DIR.
 */
import { createRequire } from 'node:module';
import { mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { createDevServer } from '../dev/server.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
function loadPlaywright() {
  const candidates = [process.env.PLAYWRIGHT_MODULE, 'playwright', '/opt/node22/lib/node_modules/playwright'].filter(Boolean);
  for (const c of candidates) {
    try {
      return require(c);
    } catch {}
  }
  throw new Error('Playwright not found. Set PLAYWRIGHT_MODULE=/path/to/node_modules/playwright');
}
const { chromium } = loadPlaywright();
const exe = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find((p) => p && existsSync(p));
const SHOTS = process.env.SHOTS_DIR || join(root, 'docs', 'screenshots');
mkdirSync(SHOTS, { recursive: true });

const results = [];
async function step(name, fn) {
  const t = Date.now();
  try {
    await fn();
    results.push(['PASS', name, Date.now() - t]);
    console.log(`  ✔ ${name} (${Date.now() - t}ms)`);
  } catch (e) {
    results.push(['FAIL', name, Date.now() - t]);
    console.log(`  ✖ ${name}\n    ${e.stack || e}`);
  }
}

const dev = await createDevServer({ port: 0, latencyMs: 350, quiet: true });
const BASE = `http://localhost:${dev.port}`;
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

// Helpers (Playwright CSS locators pierce open shadow roots)
const W = (page) => ({
  teaser: page.locator('.teaser.on'),
  launcher: page.locator('alterphase-chat .launch'),
  badge: page.locator('.badge.on'),
  panel: page.locator('.panel'),
  bot: page.locator('.row.a:not(.typing) .b'),
  user: page.locator('.row.u .b'),
  typing: page.locator('.typing'),
  chips: page.locator('.chip'),
  input: page.locator('textarea'),
  note: page.locator('.note'),
  form: page.locator('form.card.form'),
  emergency: page.locator('.card.em'),
});

async function sendAndTime(page, text, { chip = false } = {}) {
  const w = W(page);
  const before = await w.bot.count();
  const t0 = Date.now();
  if (chip) await w.chips.filter({ hasText: text }).click();
  else {
    await w.input.fill(text);
    await w.input.press('Enter');
  }
  await w.typing.first().waitFor({ state: 'visible', timeout: 3000 });
  const typingAt = Date.now() - t0;
  // Typing indicator must be visible while no new bot bubble exists yet
  assert.equal(await w.bot.count(), before, 'reply must not appear before typing indicator');
  await page.waitForFunction(
    (n) => document.querySelector('alterphase-chat').shadowRoot.querySelectorAll('.row.a:not(.typing) .b').length > n,
    before,
    { timeout: 15000 },
  );
  const replyAt = Date.now() - t0;
  return { typingAt, replyAt };
}

async function waitIdle(page) {
  // the widget sets data-busy="0" once every bubble of the reply has been delivered
  await page.waitForFunction(
    () => document.querySelector('alterphase-chat').shadowRoot.querySelector('.ap').getAttribute('data-busy') === '0',
    null,
    { timeout: 20000 },
  );
}

console.log('Desktop');
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 860 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const w = W(page);
  await page.goto(`${BASE}/demo/index.html?mock=1&teaser=1500`);
  await page.waitForLoadState('networkidle').catch(() => {});

  await step('teaser bubble + unread badge appear after delay', async () => {
    assert.equal(await w.teaser.count(), 0);
    await w.teaser.waitFor({ timeout: 5000 });
    await w.badge.waitFor();
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(SHOTS, 'desktop-closed-teaser.png') });
  });

  await step('open from teaser: dataLayer chatbot_open, typing then greeting + chips', async () => {
    await page.locator('.teaser-body').click();
    await w.typing.waitFor({ timeout: 3000 });
    assert.equal(await w.bot.count(), 0);
    await w.chips.first().waitFor({ timeout: 8000 });
    assert.ok((await w.bot.count()) >= 2);
    assert.equal(await w.chips.count(), 5);
    const dl = await page.evaluate(() => window.dataLayer.map((e) => e.event));
    assert.ok(dl.includes('chatbot_open'));
    const focused = await page.evaluate(() => document.querySelector('alterphase-chat').shadowRoot.activeElement?.tagName);
    assert.equal(focused, 'TEXTAREA');
  });

  await step('chip click -> typing indicator first, human-like delay >= 1s', async () => {
    const t = await sendAndTime(page, 'Roof replacement', { chip: true });
    console.log(`    typing shown at ${t.typingAt}ms, first reply at ${t.replyAt}ms`);
    assert.ok(t.typingAt >= 450, 'reading pause before typing');
    assert.ok(t.replyAt >= 1000, 'reply delay >= 1s');
    assert.equal(await w.chips.count(), 0, 'chips cleared after click');
    await waitIdle(page);
    assert.ok((await w.bot.last().textContent()).includes('first name'));
  });

  await step('lead flow: name + phone -> save_lead -> webhook upsert + chatbot_lead (no PII)', async () => {
    await sendAndTime(page, 'Mike');
    await waitIdle(page);
    await sendAndTime(page, 'sure, 718-555-2468');
    await waitIdle(page);
    await w.note.waitFor({ timeout: 5000 });
    const leads = await (await fetch(`${BASE}/__leads`)).json();
    assert.equal(leads.length, 1);
    assert.equal(leads[0].lead.phone, '(718) 555-2468');
    assert.equal(leads[0].lead.firstName, 'Mike');
    assert.equal(leads[0].lead.service, 'roof_replacement');
    assert.ok(leads[0].transcript.length >= 6);
    assert.ok(leads[0].page.url.includes('/demo/index.html'));
    const ev = await page.evaluate(() => window.dataLayer.filter((e) => e.event === 'chatbot_lead'));
    assert.equal(ev.length, 1);
    const s = JSON.stringify(ev);
    assert.ok(!s.includes('555') && !s.includes('Mike'), 'no PII in dataLayer');
    const msgEvents = await page.evaluate(() => window.dataLayer.filter((e) => e.event === 'chatbot_message').length);
    assert.equal(msgEvents, 3);
  });

  await step('follow-up message does not duplicate the lead row', async () => {
    await sendAndTime(page, 'Tottenville');
    await waitIdle(page);
    const leads = await (await fetch(`${BASE}/__leads`)).json();
    assert.equal(leads.length, 1);
  });

  await step('honesty: asking "are you a bot" gets an AI disclosure', async () => {
    await sendAndTime(page, 'wait, are you a real person or a bot?');
    await waitIdle(page);
    assert.match(await w.bot.last().textContent(), /AI assistant/);
    await page.screenshot({ path: join(SHOTS, 'desktop-open-conversation.png') });
  });

  await step('Escape closes and returns focus to the launcher', async () => {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    assert.equal(await w.panel.evaluate((el) => getComputedStyle(el).visibility), 'hidden');
    const focused = await page.evaluate(() => document.querySelector('alterphase-chat').shadowRoot.activeElement?.className);
    assert.match(focused, /launch/);
  });

  await step('reload restores conversation (localStorage) and teaser does not repeat', async () => {
    const n = await w.bot.count();
    await page.reload();
    await page.waitForTimeout(2200);
    assert.equal(await w.teaser.count(), 0);
    await w.launcher.click();
    await page.waitForTimeout(500);
    assert.equal(await w.bot.count(), n);
    assert.equal(await w.typing.count(), 0, 'no greeting replay');
  });

  await step('no page errors', async () => assert.deepEqual(errors, []));
  await ctx.close();
}

console.log('Error fallback + hostile CSS');
{
  await fetch(`${BASE}/__reset`);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const w = W(page);
  await page.goto(`${BASE}/demo/index.html?mock=1&teaser=0&hostile=1`);
  await w.launcher.click();
  await w.chips.first().waitFor({ timeout: 8000 });

  await step('host page CSS does not leak into the widget', async () => {
    const st = await w.chips.first().evaluate((el) => {
      const c = getComputedStyle(el);
      return { bg: c.backgroundColor, ff: c.fontFamily, tt: c.textTransform };
    });
    assert.notEqual(st.bg, 'rgb(255, 255, 0)');
    assert.ok(!/serif/.test(st.ff.replace('sans-serif', '')), st.ff);
    assert.equal(st.tt, 'none');
    assert.equal(await page.locator('alterphase-chat').evaluate((el) => getComputedStyle(el).display), 'block');
  });

  await step('API failure -> friendly fallback + inline lead form -> POST /lead', async () => {
    await sendAndTime(page, 'simulate error please');
    await waitIdle(page);
    assert.match(await w.bot.allTextContents().then((a) => a.join(' ')), /\(929\) 370-1552/);
    await w.form.waitFor({ timeout: 4000 });
    await w.form.locator('input[name=firstName]').fill('Tony');
    await w.form.locator('input[name=phone]').fill('12');
    await w.form.locator('button').click();
    assert.match(await w.form.locator('.err').textContent(), /10-digit/);
    await w.form.locator('input[name=phone]').fill('(347) 555-7788');
    await w.form.locator('button').click();
    await w.form.locator('.ok').waitFor({ timeout: 5000 });
    const leads = await (await fetch(`${BASE}/__leads`)).json();
    assert.equal(leads.length, 1);
    assert.equal(leads[0].source, 'form');
    assert.equal(leads[0].lead.phone, '(347) 555-7788');
  });
  await ctx.close();
}

console.log('Mobile');
{
  await fetch(`${BASE}/__reset`);
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const page = await ctx.newPage();
  const w = W(page);
  await page.goto(`${BASE}/demo/index.html?mock=1&teaser=1200`);

  await step('launcher sits above the bottom nav bar (>= 76px from bottom)', async () => {
    await w.teaser.waitFor({ timeout: 5000 });
    const lb = await w.launcher.boundingBox();
    const nav = await page.locator('.bnav_bottom_nav_wrapper').boundingBox();
    assert.ok(844 - (lb.y + lb.height) >= 76, `launcher bottom gap ${844 - (lb.y + lb.height)}`);
    assert.ok(lb.y + lb.height <= nav.y, 'launcher does not overlap bottom nav');
    const tb = await w.teaser.boundingBox();
    assert.ok(tb.y + tb.height <= lb.y, 'teaser above launcher');
    assert.ok(tb.x >= 0 && tb.x + tb.width <= 390, 'teaser within viewport');
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(SHOTS, 'mobile-closed-teaser.png') });
  });

  await step('opens as a full-screen sheet; no horizontal overflow', async () => {
    await w.launcher.tap();
    await w.chips.first().waitFor({ timeout: 8000 });
    await page.waitForTimeout(400);
    const pb = await w.panel.boundingBox();
    assert.equal(Math.round(pb.x), 0);
    assert.equal(Math.round(pb.y), 0);
    assert.equal(Math.round(pb.width), 390);
    assert.equal(Math.round(pb.height), 844);
    const sw = await page.evaluate(() => document.querySelector('alterphase-chat').shadowRoot.querySelector('.log').scrollWidth);
    assert.ok(sw <= 390);
    const fs = await w.input.evaluate((el) => getComputedStyle(el).fontSize);
    assert.equal(fs, '16px', 'avoid iOS zoom on focus');
  });

  await step('emergency path shows call-now card and captures lead', async () => {
    await sendAndTime(page, 'Leak emergency', { chip: true });
    await waitIdle(page);
    await sendAndTime(page, 'water is coming through the ceiling, 917-555-3434');
    await waitIdle(page);
    await w.emergency.waitFor({ timeout: 4000 });
    const href = await w.emergency.locator('a').getAttribute('href');
    assert.match(href, /^tel:\+1\d{10}$/);
    const leads = await (await fetch(`${BASE}/__leads`)).json();
    assert.equal(leads[0].lead.urgency, 'emergency');
    assert.equal(leads[0].emergency, true);
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(SHOTS, 'mobile-open-conversation.png') });
  });
  await ctx.close();
}

console.log('Reduced motion');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/demo/index.html?mock=1&teaser=0`);
  await step('prefers-reduced-motion disables animations', async () => {
    const anim = await page.locator('alterphase-chat .launch').evaluate((el) => getComputedStyle(el, '::before').animationName);
    assert.equal(anim, 'none');
  });
  await ctx.close();
}

await browser.close();
await dev.close();
const failed = results.filter((r) => r[0] === 'FAIL');
console.log(`\n${results.length - failed.length}/${results.length} e2e checks passed. Screenshots: ${SHOTS}`);
process.exit(failed.length ? 1 : 0);
