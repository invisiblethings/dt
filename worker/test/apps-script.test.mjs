// Runs apps-script/Code.gs inside a Node VM with fake SpreadsheetApp / MailApp / etc.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const code = readFileSync(new URL('../../apps-script/Code.gs', import.meta.url), 'utf8');

function makeEnv(props = { LEAD_WEBHOOK_SECRET: 'sek' }) {
  const rows = [];
  const mails = [];
  const range = (r, c, nr, nc) => ({
    getValues: () =>
      rows
        .slice(r - 1, r - 1 + nr)
        .map((row) => row.slice(c - 1, c - 1 + nc).concat(Array(Math.max(0, nc - row.slice(c - 1).length)).fill(''))),
    setValues: (v) => v.forEach((vals, i) => (rows[r - 1 + i] = vals.slice())),
    setValue: (v) => (rows[r - 1][c - 1] = v),
    setFontWeight() {
      return this;
    },
    setBackground() {
      return this;
    },
    setFontColor() {
      return this;
    },
  });
  const sheet = {
    getLastRow: () => rows.length,
    appendRow: (v) => rows.push(v.slice()),
    getRange: range,
    setFrozenRows() {},
  };
  const ctx = {
    console,
    PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => props[k] || null }) },
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName: () => sheet, insertSheet: () => sheet }) },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    MailApp: { sendEmail: (o) => mails.push(o), getRemainingDailyQuota: () => 100 },
    Utilities: { formatDate: () => 'Oct 13, 2026 9:00 AM' },
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: (s) => ({
        s,
        setMimeType() {
          return this;
        },
        getContent() {
          return s;
        },
      }),
    },
  };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  const post = (obj) => JSON.parse(ctx.doPost({ postData: { contents: JSON.stringify(obj) } }).s);
  return { ctx, rows, mails, post };
}

const base = (over = {}) => ({
  secret: 'sek',
  conversationId: 'c_abc12345',
  status: 'partial',
  source: 'chat',
  emergency: false,
  timestamp: 'Tue, Oct 13, 2026, 9:00 AM',
  lead: { firstName: 'Dana', phone: '(718) 555-1234', service: 'roof_repair', urgency: 'this_week' },
  transcript: [{ role: 'user', content: 'leaky roof <b>help</b>' }],
  page: { url: 'https://alterphaseroofing.com/', utm: { utm_source: 'google' } },
  userAgent: 'UA',
  ...over,
});

test('rejects wrong / missing secret', () => {
  const { post, rows } = makeEnv();
  assert.equal(post(base({ secret: 'nope' })).error, 'unauthorized');
  assert.equal(makeEnv({}).post(base()).error, 'unauthorized'); // no secret configured -> reject all
  assert.equal(rows.length, 0);
});

test('creates headers + row, emails once, upserts and re-emails only on upgrade', () => {
  const { post, rows, mails } = makeEnv();
  let r = post(base());
  assert.equal(r.ok, true);
  assert.equal(rows.length, 2); // header + lead
  assert.equal(rows[0][0], 'Updated (NY)');
  assert.equal(mails.length, 1);
  assert.equal(mails[0].to, 'dreelee1@gmail.com');
  assert.match(mails[0].subject, /New roof lead: Dana \(718\) 555-1234/);
  assert.match(mails[0].htmlBody, /tel:\+17185551234/);
  assert.ok(!mails[0].htmlBody.includes('<b>help</b>'), 'transcript is escaped');

  // same conversation, same status -> update row, no email
  r = post(base({ lead: { firstName: '', phone: '(718) 555-1234', bestTime: 'mornings' } }));
  assert.equal(rows.length, 2);
  assert.equal(mails.length, 1);
  const H = rows[0];
  assert.equal(rows[1][H.indexOf('First name')], 'Dana', 'empty values do not erase');
  assert.equal(rows[1][H.indexOf('Best time')], 'mornings');

  // upgrade to complete -> second email
  post(base({ status: 'complete', lead: { phone: '(718) 555-1234', address: 'Great Kills' } }));
  assert.equal(rows.length, 2);
  assert.equal(mails.length, 2);
  assert.equal(rows[1][H.indexOf('Status')], 'complete');

  // downgrade attempt keeps complete, no email
  post(base({ status: 'partial' }));
  assert.equal(rows[1][H.indexOf('Status')], 'complete');
  assert.equal(mails.length, 2);

  // becomes emergency -> one more email with the emergency subject
  post(base({ emergency: true }));
  assert.equal(mails.length, 3);
  assert.match(mails[2].subject, /^🚨 EMERGENCY/);
  post(base({ emergency: true }));
  assert.equal(mails.length, 3);
});

test('separate conversations get separate rows; formula injection neutralized', () => {
  const { post, rows } = makeEnv();
  post(base());
  post(base({ conversationId: 'c_other999', lead: { firstName: '=HYPERLINK("x")', phone: '(917) 555-2222' } }));
  assert.equal(rows.length, 3);
  assert.equal(rows[2][rows[0].indexOf('First name')], '\'=HYPERLINK("x")');
});

test('requires phone or email', () => {
  const { post } = makeEnv();
  assert.equal(post(base({ lead: { firstName: 'X' } })).error, 'missing_fields');
});
