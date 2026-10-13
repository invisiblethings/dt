/**
 * Alter Phase Roofing — chat lead receiver (Google Apps Script web app)
 *
 * What it does: receives leads from the chat Worker, upserts ONE row per conversation in a
 * Google Sheet, and emails a lead card. A new email is sent only on first capture or when the
 * lead upgrades (partial -> complete, or becomes an emergency), so there's no duplicate spam.
 *
 * Setup (see README for screenshots-free, step-by-step instructions):
 *  1. Create a Google Sheet -> Extensions -> Apps Script -> paste this file.
 *  2. Project Settings (gear) -> Script properties -> add LEAD_WEBHOOK_SECRET = (a long random string;
 *     the SAME value you give the Worker). Optional: SHEET_ID if the script is not bound to the sheet.
 *  3. Run `setup` once (authorizes Sheets + Mail), then Deploy -> New deployment -> Web app,
 *     Execute as: Me, Who has access: Anyone. Copy the /exec URL into the Worker's LEAD_WEBHOOK_URL.
 *  4. Optional: run `sendTestLead` to see a sample row + email.
 *
 * Never paste the secret into this file; it lives in Script properties only.
 */

var LEAD_RECIPIENT = 'dreelee1@gmail.com';
var LEAD_CC = ''; // optional, comma-separated, e.g. 'office@alterphaseroofing.com'
var SHEET_NAME = 'Leads';
var PHONE_DISPLAY = '(929) 370-1552';

var HEADERS = [
  'Updated (NY)', 'Created (NY)', 'Status', 'Emergency', 'First name', 'Phone', 'Email', 'Best time',
  'Address / area', 'Service', 'Urgency', 'Description', 'Source', 'Page URL', 'Landing page',
  'Referrer', 'UTM', 'User agent', 'Transcript', 'Conversation ID', 'Emailed level',
];
var COL = {};
HEADERS.forEach(function (h, i) { COL[h] = i; });

var SERVICE_LABELS = {
  roof_repair: 'Roof repair', roof_replacement: 'Roof replacement', roof_inspection: 'Roof inspection',
  emergency_leak: 'Emergency leak', flat_roof: 'Flat roof', commercial_roofing: 'Commercial roofing',
  skylight: 'Skylight', siding: 'Siding', gutters: 'Gutters', other: 'Other',
};
var URGENCY_LABELS = { emergency: 'EMERGENCY', this_week: 'This week', planning: 'Planning', unknown: 'Not sure' };

/* ------------------------------------------------------------------ */

function doPost(e) {
  var data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'bad_json' });
  }
  var expected = PropertiesService.getScriptProperties().getProperty('LEAD_WEBHOOK_SECRET');
  if (!expected || !safeEqual_(String(data.secret || ''), expected)) {
    return json_({ ok: false, error: 'unauthorized' });
  }
  if (!data.conversationId || !data.lead || !(data.lead.phone || data.lead.email)) {
    return json_({ ok: false, error: 'missing_fields' });
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var result = upsertLead_(data);
    if (result.shouldEmail) {
      try {
        sendLeadEmail_(result.lead, data);
        result.sheet.getRange(result.row, COL['Emailed level'] + 1).setValue(result.newLevel);
      } catch (mailErr) {
        console.error('Email failed: ' + mailErr);
      }
    }
    return json_({ ok: true, row: result.row, emailed: result.shouldEmail });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('Alter Phase lead webhook is running.');
}

/* ------------------------------------------------------------------ */

function getSheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  var ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('No spreadsheet: bind this script to a Sheet or set the SHEET_ID script property.');
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#01306e').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

function levelOf_(status, emergency) {
  var n = status === 'complete' ? 2 : 1;
  return String(n) + (emergency ? 'E' : '');
}

function upsertLead_(data) {
  var sh = getSheet_();
  var lead = data.lead || {};
  var page = data.page || {};
  var now = data.timestamp || Utilities.formatDate(new Date(), 'America/New_York', 'MMM d, yyyy h:mm a');
  var transcript = (data.transcript || [])
    .map(function (m) { return (m.role === 'user' ? 'Visitor: ' : 'Alex: ') + m.content; })
    .join('\n')
    .slice(-45000);
  var utm = page.utm && Object.keys(page.utm).length
    ? Object.keys(page.utm).map(function (k) { return k + '=' + page.utm[k]; }).join('&')
    : '';

  // Find existing row for this conversation
  var row = -1;
  var existing = null;
  var last = sh.getLastRow();
  if (last > 1) {
    var ids = sh.getRange(2, COL['Conversation ID'] + 1, last - 1, 1).getValues();
    for (var i = ids.length - 1; i >= 0; i--) {
      if (String(ids[i][0]) === String(data.conversationId)) {
        row = i + 2;
        existing = sh.getRange(row, 1, 1, HEADERS.length).getValues()[0];
        break;
      }
    }
  }

  var incoming = {
    'First name': lead.firstName, 'Phone': lead.phone, 'Email': lead.email, 'Best time': lead.bestTime,
    'Address / area': lead.address, 'Service': SERVICE_LABELS[lead.service] || '',
    'Urgency': URGENCY_LABELS[lead.urgency] || '', 'Description': lead.description,
    'Source': data.source, 'Page URL': page.url, 'Landing page': page.landingPage, 'Referrer': page.referrer,
    'UTM': utm, 'User agent': data.userAgent, 'Transcript': transcript,
  };

  var values = existing ? existing.slice() : HEADERS.map(function () { return ''; });
  Object.keys(incoming).forEach(function (k) {
    var v = incoming[k];
    if (v !== undefined && v !== null && String(v) !== '') values[COL[k]] = safeCell_(v);
  });

  var wasStatus = existing ? String(existing[COL['Status']]) : '';
  var status = wasStatus === 'complete' || data.status === 'complete' ? 'complete' : 'partial';
  var emergency = (existing && existing[COL['Emergency']] === 'YES') || !!data.emergency || lead.urgency === 'emergency';
  values[COL['Status']] = status;
  values[COL['Emergency']] = emergency ? 'YES' : '';
  values[COL['Updated (NY)']] = now;
  values[COL['Created (NY)']] = existing ? existing[COL['Created (NY)']] : now;
  values[COL['Conversation ID']] = String(data.conversationId);

  var emailed = existing ? String(existing[COL['Emailed level']] || '') : '';
  var newLevel = levelOf_(status, emergency);
  var shouldEmail = !emailed ||
    parseInt(newLevel, 10) > parseInt(emailed, 10) ||
    (emergency && emailed.indexOf('E') === -1);
  values[COL['Emailed level']] = emailed; // updated only after the email actually sends

  if (row === -1) {
    sh.appendRow(values);
    row = sh.getLastRow();
  } else {
    sh.getRange(row, 1, 1, HEADERS.length).setValues([values]);
  }
  if (emergency) sh.getRange(row, 1, 1, HEADERS.length).setBackground('#fdecea');

  var merged = {};
  HEADERS.forEach(function (h, i) { merged[h] = values[i]; });
  return { sheet: sh, row: row, shouldEmail: shouldEmail, newLevel: newLevel, lead: merged, status: status, emergency: emergency };
}

/* ------------------------------------------------------------------ */

function sendLeadEmail_(L, data) {
  var name = unsafe_(L['First name']) || 'New visitor';
  var phone = unsafe_(L['Phone']);
  var emergency = L['Emergency'] === 'YES';
  var service = unsafe_(L['Service']) || 'Not specified';
  var area = unsafe_(L['Address / area']);
  var subject = (emergency ? '🚨 EMERGENCY — ' : '') +
    'New roof lead: ' + name + (phone ? ' ' + phone : '') + ' — ' + service + (area ? ' (' + area + ')' : '') +
    (L['Status'] === 'complete' ? '' : ' [partial]');

  var tel = phone ? '+1' + phone.replace(/\D/g, '').slice(-10) : '';
  var badge = emergency
    ? '<span style="background:#d23b33;color:#fff;padding:4px 10px;border-radius:999px;font-weight:700;font-size:12px">🚨 EMERGENCY</span>'
    : '<span style="background:#ffc752;color:#11121a;padding:4px 10px;border-radius:999px;font-weight:700;font-size:12px">' + esc_(unsafe_(L['Urgency']) || 'New lead') + '</span>';
  function row(label, value) {
    if (!value) return '';
    return '<tr><td style="padding:6px 12px 6px 0;color:#777787;font-size:13px;vertical-align:top;white-space:nowrap">' + label +
      '</td><td style="padding:6px 0;color:#11121a;font-size:14px">' + value + '</td></tr>';
  }
  var transcript = esc_(unsafe_(L['Transcript'])).replace(/\n/g, '<br>');
  var html =
    '<div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f3f5f9;padding:24px">' +
    '<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e7eaf1">' +
    '<div style="background:#01306e;color:#fff;padding:18px 22px"><div style="font-size:12px;letter-spacing:.08em;opacity:.8">ALTER PHASE ROOFING · CHAT LEAD</div>' +
    '<div style="font-size:22px;font-weight:700;margin-top:4px">' + esc_(name) + '</div></div>' +
    '<div style="padding:20px 22px">' + badge + ' <span style="color:#777787;font-size:12px;margin-left:6px">' + esc_(L['Status']) + '</span>' +
    (tel ? '<div style="margin:18px 0"><a href="tel:' + tel + '" style="display:inline-block;background:#d23b33;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:10px;font-size:16px">📞 Call ' + esc_(phone) + '</a></div>' : '') +
    '<table style="border-collapse:collapse;width:100%">' +
    row('Phone', phone ? '<a href="tel:' + tel + '" style="color:#01306e;font-weight:600">' + esc_(phone) + '</a>' : '') +
    row('Email', L['Email'] ? '<a href="mailto:' + esc_(unsafe_(L['Email'])) + '" style="color:#01306e">' + esc_(unsafe_(L['Email'])) + '</a>' : '') +
    row('Service', esc_(service)) +
    row('Urgency', esc_(unsafe_(L['Urgency']))) +
    row('Best time', esc_(unsafe_(L['Best time']))) +
    row('Address / area', esc_(area)) +
    row('Summary', esc_(unsafe_(L['Description']))) +
    row('Page', esc_(unsafe_(L['Page URL']))) +
    row('Referrer', esc_(unsafe_(L['Referrer']))) +
    row('UTM', esc_(unsafe_(L['UTM']))) +
    row('Received', esc_(L['Updated (NY)'])) +
    '</table>' +
    (transcript ? '<div style="margin-top:18px;font-size:12px;color:#777787;font-weight:600;letter-spacing:.04em">TRANSCRIPT</div>' +
      '<div style="margin-top:6px;background:#f6f8fc;border-radius:10px;padding:12px 14px;font-size:13px;line-height:1.55;color:#3a3a42">' + transcript + '</div>' : '') +
    '<p style="font-size:11px;color:#9a9aa8;margin-top:18px">Conversation ' + esc_(String(data.conversationId)) +
    ' · Leads are logged in your Google Sheet. Reply-to is the customer when they gave an email.</p>' +
    '</div></div></div>';

  var opts = { to: LEAD_RECIPIENT, subject: subject, htmlBody: html, name: 'Alter Phase Chat' };
  if (LEAD_CC) opts.cc = LEAD_CC;
  if (L['Email']) opts.replyTo = unsafe_(L['Email']);
  MailApp.sendEmail(opts);
}

/* ------------------------------------------------------------------ */

function safeEqual_(a, b) {
  if (a.length !== b.length) return false;
  var r = 0;
  for (var i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
// Prevent spreadsheet formula injection (=, +, -, @ at the start of a cell).
function safeCell_(v) {
  var s = String(v).slice(0, 45000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
function unsafe_(v) {
  var s = String(v == null ? '' : v);
  return s.charAt(0) === "'" ? s.slice(1) : s;
}
function esc_(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor to create the sheet + authorize Sheets and Mail. */
function setup() {
  getSheet_();
  if (!PropertiesService.getScriptProperties().getProperty('LEAD_WEBHOOK_SECRET')) {
    throw new Error('Add the LEAD_WEBHOOK_SECRET script property (Project Settings -> Script properties).');
  }
  console.log('Sheet ready. Mail quota remaining today: ' + MailApp.getRemainingDailyQuota());
}

/** Run from the editor to create a sample lead row + email. Delete the row afterwards. */
function sendTestLead() {
  var secret = PropertiesService.getScriptProperties().getProperty('LEAD_WEBHOOK_SECRET');
  var out = doPost({ postData: { contents: JSON.stringify({
    secret: secret, conversationId: 'test_' + Date.now(), status: 'partial', source: 'test', emergency: false,
    lead: { firstName: 'Test', phone: '(718) 555-1234', service: 'roof_repair', urgency: 'this_week', address: 'Great Kills 10308', description: 'Test lead from setup' },
    transcript: [{ role: 'assistant', content: 'What can I help you with today?' }, { role: 'user', content: 'This is a test lead' }],
    page: { url: 'https://alterphaseroofing.com/', utm: {} }, userAgent: 'Apps Script test',
  }) } });
  console.log(out.getContent());
}
