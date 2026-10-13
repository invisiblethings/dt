/**
 * Alter Phase Roofing — AI lead-capture chat Worker: all logic lives here (index.js is the entry point)
 *
 * Endpoints
 *   POST /chat       { conversationId, messages:[{role,content}], page, leadState?, leadKey?, hp?, turnstileToken? }
 *                    -> { replies:[string], leadSaved, leadKey?, leadState?, quickReplies?, emergency?, showLeadForm? }
 *   POST /lead       fallback form { conversationId, firstName, phone, email?, message?, website(honeypot), page }
 *   GET  /widget.js  the chat widget (served with ETag + cache headers)
 *   GET  /health     status JSON (no secrets)
 *
 * Env (set secrets with `npx wrangler secret put NAME`):
 *   GEMINI_API_KEY (secret)  GEMINI_MODEL (default gemini-2.5-flash-lite)
 *   LEAD_WEBHOOK_URL (secret) LEAD_WEBHOOK_SECRET (secret)
 *   ALLOWED_ORIGINS  TURNSTILE_SECRET (optional)  DAILY_CAP (optional)  CHAT_DISABLED ("1" = kill switch)
 *   AI_PROVIDER ("gemini" default | "anthropic") + ANTHROPIC_API_KEY / ANTHROPIC_MODEL if you switch
 *   PHONE_DISPLAY (default "(929) 370-1552")  RATE_PER_MINUTE (12)  RATE_PER_DAY (200)
 *   Optional KV binding CHAT_KV for a reliable global DAILY_CAP counter.
 *
 * No dependencies, no build step beyond `scripts/build.mjs`, which wrangler runs automatically
 * to turn knowledge/*.md and widget/chat.js into the two generated modules imported below.
 */
import { SYSTEM_PROMPT_TEMPLATE, FAQ_TEXT } from './knowledge.generated.js';
import { WIDGET_JS, WIDGET_ETAG } from './widget.generated.js';

export const VERSION = '1.0.0';

export const LIMITS = {
  maxBodyBytes: 32 * 1024,
  maxMessages: 60, // accepted from client
  modelMessages: 30, // sent to the model / stored in transcript
  maxMessageChars: 1000,
  maxReplyChars: 600,
  maxBubbles: 2,
  fetchTimeoutMs: 12000,
};

const DEFAULT_ORIGINS = 'https://alterphaseroofing.com,https://www.alterphaseroofing.com';
const DEFAULT_PHONE = '(929) 370-1552';
const COMPANY_DIGITS = ['9293701552', '9298008572'];

export const SERVICES = [
  'roof_repair',
  'roof_replacement',
  'roof_inspection',
  'emergency_leak',
  'flat_roof',
  'commercial_roofing',
  'skylight',
  'siding',
  'gutters',
  'other',
];
export const URGENCIES = ['emergency', 'this_week', 'planning', 'unknown'];

export const SAVE_LEAD_TOOL = {
  name: 'save_lead',
  description:
    "Save the visitor's contact details so the Alter Phase team can call them back. Call this as soon as you know a phone number or email, and again whenever you learn more. Always include every field known so far.",
  parameters: {
    type: 'object',
    properties: {
      first_name: { type: 'string', description: "Visitor's first name" },
      phone: { type: 'string', description: 'US phone number exactly as the visitor gave it' },
      email: { type: 'string', description: 'Email address, if given' },
      best_time: { type: 'string', description: 'Best time to call, e.g. "weekday mornings" or "prefers text"' },
      address: { type: 'string', description: 'Property address, or neighborhood / ZIP code' },
      service: { type: 'string', enum: SERVICES, description: 'Service needed' },
      urgency: { type: 'string', enum: URGENCIES, description: 'emergency = active leak/damage now' },
      description: { type: 'string', description: 'One-line summary of the issue in your own words' },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Small utilities                                                     */
/* ------------------------------------------------------------------ */

const enc = new TextEncoder();

export function cleanText(value, max = 500) {
  if (value == null) return '';
  let s = String(value);
  s = s.replace(/<[^>]*>/g, ' '); // strip HTML tags
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028\u2029\uFEFF]/g, '');
  s = s
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (s.length > max) s = s.slice(0, max).trim();
  return s;
}

export function normalizePhone(input) {
  if (input == null) return null;
  let d = String(input).replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  if (d.length !== 10) return null;
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(d)) return null;
  if (/^(\d)\1{9}$/.test(d)) return null; // 2222222222 etc.
  if (d.slice(3, 6) === '555' && d.slice(6, 8) === '01') return null; // fictional 555-01xx
  return {
    digits: d,
    display: `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`,
    e164: `+1${d}`,
  };
}

const EMAIL_RE = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,180}\.[A-Za-z]{2,24}$/;
export function normalizeEmail(input) {
  if (input == null) return null;
  const e = String(input).trim().toLowerCase();
  if (e.length > 254 || !EMAIL_RE.test(e) || e.includes('..')) return null;
  return e;
}

function pick(value, list) {
  const v = String(value || '')
    .trim()
    .toLowerCase();
  return list.includes(v) ? v : '';
}

/** Validate + normalize a lead object coming from the model, the client, or the form. */
export function sanitizeLead(raw = {}) {
  const r = raw && typeof raw === 'object' ? raw : {};
  const phone = normalizePhone(r.phone);
  const email = normalizeEmail(r.email);
  let firstName = cleanText(r.first_name ?? r.firstName, 60)
    .replace(/[^\p{L}\p{M}' .-]/gu, '')
    .trim();
  firstName = firstName.split(/\s+/).slice(0, 3).join(' ');
  return {
    firstName,
    phone: phone ? phone.display : '',
    phoneE164: phone ? phone.e164 : '',
    email: email || '',
    bestTime: cleanText(r.best_time ?? r.bestTime, 80),
    address: cleanText(r.address, 160),
    service: pick(r.service, SERVICES),
    urgency: pick(r.urgency, URGENCIES),
    description: cleanText(r.description, 300),
  };
}

/** Merge leads; later arguments win, but empty values never overwrite known ones. */
export function mergeLeads(...leads) {
  const out = sanitizeLead({});
  for (const l of leads) {
    if (!l) continue;
    for (const k of Object.keys(out)) {
      if (l[k] && !(k === 'urgency' && l[k] === 'unknown' && out[k])) out[k] = l[k];
    }
  }
  return out;
}

export function hasContact(lead) {
  return !!(lead && (lead.phone || lead.email));
}

export function leadStatus(lead) {
  if (!hasContact(lead)) return 'none';
  return lead.firstName && lead.phone && lead.service && lead.address ? 'complete' : 'partial';
}

/** Stable short fingerprint used for de-duping webhook sends per conversation. */
export async function leadFingerprint(lead) {
  const keys = Object.keys(lead).sort();
  const s = keys.map((k) => `${k}=${lead[k]}`).join('|');
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(s));
  return [...new Uint8Array(buf)]
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/* ------------------------------------------------------------------ */
/* Regex fallback: never lose a phone/email typed by the visitor      */
/* ------------------------------------------------------------------ */

const PHONE_SCAN_RE = /(?:\+?1[\s.-]?)?\(?\b([2-9]\d{2})\)?[\s.-]?([2-9]\d{2})[\s.-]?(\d{4})\b/g;
const EMAIL_SCAN_RE = /[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,180}\.[A-Za-z]{2,24}/g;
const NOT_NAMES = new Set(
  'a an the not just looking here in on at with from so very really interested wondering trying calling ok okay good fine sure yes no hi hello hey thanks thank having getting worried sorry glad new interested home house roof gutter leak looking planning still also only about'.split(
    ' ',
  ),
);

function lastMatch(re, text) {
  let m;
  let last = null;
  re.lastIndex = 0;
  while ((m = re.exec(text))) last = m;
  return last;
}

export function extractLeadFromMessages(messages) {
  const found = {};
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (m.role !== 'user') continue;
    const text = m.content;
    const pm = lastMatch(PHONE_SCAN_RE, text);
    if (pm) {
      const p = normalizePhone(pm[1] + pm[2] + pm[3]);
      if (p && !COMPANY_DIGITS.includes(p.digits)) found.phone = p.display;
    }
    const em = lastMatch(EMAIL_SCAN_RE, text);
    if (em) {
      const e = normalizeEmail(em[0]);
      if (e && !e.endsWith('@alterphaseroofing.com')) found.email = e;
    }
    // Name: explicit phrases, or a short answer right after we asked for a name.
    const nm = text.match(/\b(?:my name is|my name's|name is|this is|i am|i'm|im|call me)\s+([A-Za-z][A-Za-z'-]{1,29})\b/i);
    if (nm && !NOT_NAMES.has(nm[1].toLowerCase()) && /^[A-Z]/.test(nm[1])) {
      found.first_name = nm[1];
    } else {
      const prev = messages[i - 1];
      if (prev && prev.role === 'assistant' && /\bname\b/i.test(prev.content)) {
        const cleaned = text.replace(/[\d()+.\-,@]/g, ' ').trim();
        const words = cleaned.split(/\s+/).filter(Boolean);
        const w = words[0] || '';
        if (words.length >= 1 && words.length <= 3 && /^[A-Za-z][A-Za-z'-]{1,29}$/.test(w) && !NOT_NAMES.has(w.toLowerCase())) {
          found.first_name = w.charAt(0).toUpperCase() + w.slice(1);
        }
      }
    }
  }
  return sanitizeLead(found);
}

const EMERGENCY_RE =
  /\b(emergency|active leak|leaking (now|right now|badly)|water (is )?(coming|pouring|dripping|leaking)|(ceiling|roof) (is )?(dripping|leaking|caving|collapsed|collapsing)|storm damage|tree (fell|on (the|my) roof)|flooding|caved in)\b/i;

export function detectEmergency(text) {
  return EMERGENCY_RE.test(text || '');
}

/* ------------------------------------------------------------------ */
/* Model output post-processing                                        */
/* ------------------------------------------------------------------ */

export function sanitizeReplyText(text) {
  let t = String(text || '');
  t = t.replace(/<[^>]*>/g, '');
  t = t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/__(.+?)__/g, '$1');
  t = t.replace(/(^|\s)\*(\S[^*]*?)\*(?=\s|$|[.,!?])/g, '$1$2');
  t = t.replace(/^#{1,6}\s+/gm, '');
  t = t.replace(/^\s*[-*•]\s+/gm, '');
  t = t.replace(/`+/g, '');
  // Markdown links -> keep label (and URL only if it's ours)
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) =>
    /^(https?:\/\/)?([a-z0-9-]+\.)*alterphaseroofing\.com\b/i.test(url) ? `${label} (${url})` : label,
  );
  // Remove any link/domain that isn't ours (emails are protected first)
  const emails = [];
  t = t.replace(EMAIL_SCAN_RE, (m) => `\u0001${emails.push(m) - 1}\u0001`);
  t = t.replace(
    /\b((?:https?:\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|org|io|co|us|info|biz|xyz|app|ai|ly|me)(?:\/[^\s]*)?)/gi,
    (m) => (/^(?:https?:\/\/)?(?:[a-z0-9-]+\.)*alterphaseroofing\.com(?:\/|$)/i.test(m) ? m : ''),
  );
  t = t.replace(/\u0001(\d+)\u0001/g, (_, i) => emails[Number(i)]);
  t = t.replace(/[ \t]{2,}/g, ' ').replace(/ +([.,!?])/g, '$1');
  return t.trim();
}

export function toBubbles(text) {
  const clean = sanitizeReplyText(text);
  let parts = clean
    .split(/\n\s*\n|\s*\|\|\s*/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
  if (parts.length > LIMITS.maxBubbles) {
    parts = [parts[0], parts.slice(1).join(' ')];
  }
  return parts.map((p) => (p.length > LIMITS.maxReplyChars ? p.slice(0, LIMITS.maxReplyChars - 1).trim() + '…' : p));
}

const CHIPS = {
  service: ['Roof repair', 'Roof replacement', 'Inspection', 'Gutters & siding', 'Something else'],
  urgency: ['Active leak / emergency', 'This week', 'Just planning'],
  time: ['Morning', 'Afternoon', 'Evening', 'Anytime'],
  contact: ['Call me', 'Text me', 'Email me'],
  yesno: ['Yes, please', 'Not right now'],
};

export function suggestQuickReplies(lastBubble, lead) {
  const t = (lastBubble || '').toLowerCase();
  if (!t.includes('?')) return [];
  if (/how (urgent|soon)|is (water|it) (coming|leaking|actively)|right now or|this week|just planning|emergency or/.test(t))
    return CHIPS.urgency;
  if (/best time|good time|when('s| is) (a )?good|when should we call|time to (call|reach)/.test(t)) return CHIPS.time;
  if (/call,? text|text or call|call or text|prefer.*(call|text|email)/.test(t)) return CHIPS.contact;
  if (/what (kind of |type of )?(service|work|help|project)|repair or (a )?replace|what can (i|we) help|what('s| is) going on with/.test(t))
    return CHIPS.service;
  if (!hasContact(lead) && /want me to|would you like|should i have|can i have (someone|one of)|shall i/.test(t)) return CHIPS.yesno;
  return [];
}

/* ------------------------------------------------------------------ */
/* System prompt                                                       */
/* ------------------------------------------------------------------ */

export function nyTimestamp(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

export function buildSystemPrompt(env, { page, lead } = {}) {
  const phone = env.PHONE_DISPLAY || DEFAULT_PHONE;
  let p = SYSTEM_PROMPT_TEMPLATE.replaceAll('{{PHONE}}', phone)
    .replaceAll('{{NOW}}', nyTimestamp())
    .replaceAll('{{PAGE}}', cleanText(page && page.url, 200) || 'unknown');
  p += '\n\n# Reference FAQ\n\n' + FAQ_TEXT;
  if (lead && hasContact(lead)) {
    const known = [];
    if (lead.firstName) known.push(`first name (${lead.firstName})`);
    if (lead.phone) known.push('phone number');
    if (lead.email) known.push('email');
    if (lead.bestTime) known.push('best time to call');
    if (lead.address) known.push('address/area');
    if (lead.service) known.push(`service (${lead.service})`);
    if (lead.urgency) known.push(`urgency (${lead.urgency})`);
    p += `\n\n# Lead status\nAlready saved for this visitor: ${known.join(', ')}. Don't ask for these again. If name + phone are saved, stop asking for contact details and just help.`;
  }
  return p;
}

/* ------------------------------------------------------------------ */
/* AI providers (swap here)                                            */
/* ------------------------------------------------------------------ */

export class ProviderError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function postJsonWithRetry(url, body, headers, { retries = 1, retryDelayMs = 600 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...headers },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(LIMITS.fetchTimeoutMs),
      });
      if (res.ok) return await res.json();
      const errText = await res.text().catch(() => '');
      lastErr = new ProviderError(`HTTP ${res.status}: ${errText.slice(0, 300)}`, res.status);
      if (res.status !== 429 && res.status < 500) throw lastErr; // don't retry 4xx
    } catch (e) {
      lastErr = e instanceof ProviderError ? e : new ProviderError(String((e && e.message) || e), 0);
      if (lastErr.status && lastErr.status !== 429 && lastErr.status < 500) throw lastErr;
    }
    if (attempt < retries) await sleep(retryDelayMs + Math.floor(Math.random() * 300));
  }
  throw lastErr;
}

/**
 * Provider contract:
 *   generate(env, { system, messages:[{role:'user'|'assistant', content}], tool })
 *     -> { text, toolCalls:[{name,args}], followUp: async (toolResults:[{name,response}]) => { text } }
 */
export const providers = {
  async gemini(env, { system, messages, tool }) {
    if (!env.GEMINI_API_KEY) throw new ProviderError('GEMINI_API_KEY missing', 0);
    const model = env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const headers = { 'x-goog-api-key': env.GEMINI_API_KEY };
    const contents = messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
    const base = {
      systemInstruction: { parts: [{ text: system }] },
      tools: [{ functionDeclarations: [tool] }],
      toolConfig: { functionCallingConfig: { mode: 'AUTO' } },
      generationConfig: { temperature: 0.6, maxOutputTokens: 400 },
    };
    const parse = (data) => {
      const cand = data && data.candidates && data.candidates[0];
      const parts = (cand && cand.content && cand.content.parts) || [];
      const text = parts
        .filter((p) => typeof p.text === 'string' && !p.thought)
        .map((p) => p.text)
        .join('')
        .trim();
      const toolCalls = parts.filter((p) => p.functionCall).map((p) => ({ name: p.functionCall.name, args: p.functionCall.args || {} }));
      return { text, toolCalls, content: cand && cand.content };
    };
    const first = parse(await postJsonWithRetry(url, { ...base, contents }, headers));
    return {
      text: first.text,
      toolCalls: first.toolCalls,
      async followUp(results) {
        const next = [
          ...contents,
          first.content, // echo the model turn exactly (keeps thought signatures)
          { role: 'user', parts: results.map((r) => ({ functionResponse: { name: r.name, response: r.response } })) },
        ];
        const out = parse(await postJsonWithRetry(url, { ...base, contents: next }, headers));
        return { text: out.text };
      },
    };
  },

  // Example alternative provider: set AI_PROVIDER="anthropic" and secret ANTHROPIC_API_KEY.
  async anthropic(env, { system, messages, tool }) {
    if (!env.ANTHROPIC_API_KEY) throw new ProviderError('ANTHROPIC_API_KEY missing', 0);
    const url = 'https://api.anthropic.com/v1/messages';
    const headers = { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' };
    const base = {
      model: env.ANTHROPIC_MODEL || 'claude-haiku-4-5',
      max_tokens: 400,
      system,
      tools: [{ name: tool.name, description: tool.description, input_schema: tool.parameters }],
    };
    const msgs = messages.map((m) => ({ role: m.role, content: m.content }));
    const data = await postJsonWithRetry(url, { ...base, messages: msgs }, headers);
    const blocks = data.content || [];
    const text = blocks
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();
    const uses = blocks.filter((b) => b.type === 'tool_use');
    return {
      text,
      toolCalls: uses.map((b) => ({ name: b.name, args: b.input || {} })),
      async followUp(results) {
        const next = [
          ...msgs,
          { role: 'assistant', content: blocks },
          {
            role: 'user',
            content: uses.map((u, i) => ({
              type: 'tool_result',
              tool_use_id: u.id,
              content: JSON.stringify((results[i] || results[0]).response),
            })),
          },
        ];
        const d2 = await postJsonWithRetry(url, { ...base, messages: next }, headers);
        return {
          text: (d2.content || [])
            .filter((b) => b.type === 'text')
            .map((b) => b.text)
            .join('')
            .trim(),
        };
      },
    };
  },
};

export async function generateReply(env, args) {
  const name = (env.AI_PROVIDER || 'gemini').toLowerCase();
  const provider = providers[name];
  if (!provider) throw new ProviderError(`Unknown AI_PROVIDER ${name}`, 0);
  return provider(env, args);
}

/* ------------------------------------------------------------------ */
/* Rate limiting (best effort in-memory; optional KV for daily cap)   */
/* ------------------------------------------------------------------ */

const state = { ip: new Map(), globalDay: '', globalCount: 0 };
export function _resetState() {
  state.ip.clear();
  state.globalDay = '';
  state.globalCount = 0;
}

function dayKey(now = Date.now()) {
  return new Date(now).toISOString().slice(0, 10);
}

export function checkRateLimit(ip, env, now = Date.now()) {
  const perMin = Number(env.RATE_PER_MINUTE) || 12;
  const perDay = Number(env.RATE_PER_DAY) || 200;
  const key = ip || 'unknown';
  if (state.ip.size > 5000) {
    for (const [k, v] of state.ip) if (now - v.minStart > 120000) state.ip.delete(k);
    if (state.ip.size > 5000) state.ip.clear();
  }
  let rec = state.ip.get(key);
  const today = dayKey(now);
  if (!rec || rec.day !== today) rec = { minStart: now, min: 0, day: today, dayCount: 0 };
  if (now - rec.minStart >= 60000) {
    rec.minStart = now;
    rec.min = 0;
  }
  rec.min++;
  rec.dayCount++;
  state.ip.set(key, rec);
  return rec.min <= perMin && rec.dayCount <= perDay;
}

/** Global daily cap on model calls. Uses KV (binding CHAT_KV) when present, else per-isolate memory. */
export async function checkDailyCap(env, now = Date.now()) {
  const cap = Number(env.DAILY_CAP) || 0;
  if (!cap) return true;
  const today = dayKey(now);
  if (env.CHAT_KV) {
    const k = `cap:${today}`;
    const n = Number(await env.CHAT_KV.get(k)) || 0;
    if (n >= cap) return false;
    await env.CHAT_KV.put(k, String(n + 1), { expirationTtl: 172800 });
    return true;
  }
  if (state.globalDay !== today) {
    state.globalDay = today;
    state.globalCount = 0;
  }
  state.globalCount++;
  return state.globalCount <= cap;
}

/* ------------------------------------------------------------------ */
/* HTTP helpers                                                        */
/* ------------------------------------------------------------------ */

export function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || DEFAULT_ORIGINS)
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

export function isOriginAllowed(origin, env) {
  if (!origin) return false;
  return allowedOrigins(env).includes(origin.replace(/\/$/, ''));
}

function corsHeaders(origin, env) {
  const h = { Vary: 'Origin' };
  if (isOriginAllowed(origin, env)) {
    h['Access-Control-Allow-Origin'] = origin;
    h['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    h['Access-Control-Allow-Headers'] = 'content-type';
    h['Access-Control-Max-Age'] = '86400';
  }
  return h;
}

function json(data, status, extraHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...extraHeaders,
    },
  });
}

async function readJsonBody(request) {
  const len = Number(request.headers.get('content-length') || 0);
  if (len > LIMITS.maxBodyBytes) return { error: 'too_large' };
  const text = await request.text();
  if (enc.encode(text).length > LIMITS.maxBodyBytes) return { error: 'too_large' };
  try {
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'bad_json' };
    return { body };
  } catch {
    return { error: 'bad_json' };
  }
}

const CONV_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

export function validateChatBody(body) {
  if (!CONV_ID_RE.test(String(body.conversationId || ''))) return { error: 'bad_conversation_id' };
  if (!Array.isArray(body.messages) || body.messages.length === 0) return { error: 'no_messages' };
  if (body.messages.length > LIMITS.maxMessages) return { error: 'too_many_messages' };
  const messages = [];
  for (const m of body.messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) return { error: 'bad_role' };
    if (typeof m.content !== 'string') return { error: 'bad_content' };
    if (m.content.length > LIMITS.maxMessageChars * 2) return { error: 'message_too_long' };
    const content = cleanText(m.content, LIMITS.maxMessageChars);
    if (content) messages.push({ role: m.role, content });
  }
  if (!messages.length || messages[messages.length - 1].role !== 'user') return { error: 'last_must_be_user' };
  return { messages };
}

/** Collapse to alternating user/assistant turns starting with user (what the model APIs expect). */
export function toModelMessages(messages) {
  const recent = messages.slice(-LIMITS.modelMessages);
  const out = [];
  for (const m of recent) {
    const prev = out[out.length - 1];
    if (prev && prev.role === m.role) prev.content += '\n\n' + m.content;
    else out.push({ ...m });
  }
  if (out.length && out[0].role !== 'user') out.unshift({ role: 'user', content: '(The visitor opened the chat.)' });
  return out;
}

export function cleanPage(page) {
  const p = page && typeof page === 'object' ? page : {};
  const utm = {};
  if (p.utm && typeof p.utm === 'object') {
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']) {
      if (p.utm[k]) utm[k] = cleanText(p.utm[k], 120);
    }
  }
  return {
    url: cleanText(p.url, 500),
    title: cleanText(p.title, 200),
    referrer: cleanText(p.referrer, 500),
    landingPage: cleanText(p.landingPage, 500),
    utm,
  };
}

async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token || typeof token !== 'string') return false;
  try {
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET);
    form.append('response', token.slice(0, 2048));
    if (ip) form.append('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Lead webhook                                                        */
/* ------------------------------------------------------------------ */

export function buildLeadPayload(env, { conversationId, lead, messages, page, userAgent, source, emergency }) {
  const status = leadStatus(lead);
  return {
    secret: env.LEAD_WEBHOOK_SECRET || '',
    conversationId,
    status,
    source,
    emergency: !!emergency || lead.urgency === 'emergency' || lead.service === 'emergency_leak',
    timestamp: nyTimestamp(),
    timestampIso: new Date().toISOString(),
    lead,
    transcript: (messages || []).slice(-LIMITS.modelMessages).map((m) => ({ role: m.role, content: m.content })),
    page,
    userAgent: cleanText(userAgent, 300),
  };
}

export async function sendLead(env, payload) {
  if (!env.LEAD_WEBHOOK_URL) {
    console.warn('LEAD_WEBHOOK_URL not set; lead not delivered', payload.conversationId);
    return false;
  }
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok) return true;
      console.error('Lead webhook HTTP', res.status);
    } catch (e) {
      console.error('Lead webhook error', e && e.message);
    }
    if (attempt === 0) await sleep(800);
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* Canned replies                                                      */
/* ------------------------------------------------------------------ */

function phoneOf(env) {
  return env.PHONE_DISPLAY || DEFAULT_PHONE;
}

export function fallbackReplies(env, lead) {
  const phone = phoneOf(env);
  if (lead && lead.phone) {
    return [
      `Sorry, I'm having a little trouble on my end right now. I've got your number though, and someone from the team will reach out.`,
      `If it's urgent, call us at ${phone}.`,
    ];
  }
  return [
    `Sorry, I'm having a little trouble on my end right now.`,
    `You can reach the team directly at ${phone}, or leave your name and number below and we'll call you back.`,
  ];
}

export function disabledReplies(env) {
  const phone = phoneOf(env);
  return [
    `Thanks for reaching out to Alter Phase Roofing! Our chat assistant is offline at the moment.`,
    `The fastest way to reach us is ${phone}, or leave your name and number below and we'll call you back.`,
  ];
}

function afterSaveText(lead, env) {
  const name = lead.firstName ? `, ${lead.firstName}` : '';
  if (lead.urgency === 'emergency' || lead.service === 'emergency_leak') {
    return `Got it, thanks${name}. I've passed this to the team as urgent.\n\nIf water's coming in right now, call ${phoneOf(env)} so we can move faster.`;
  }
  return `Perfect, thanks${name}! Someone from our team will give you a call during business hours to set up your free estimate.`;
}

/* ------------------------------------------------------------------ */
/* Handlers                                                            */
/* ------------------------------------------------------------------ */

async function handleChat(request, env, ctx, cors) {
  const ip = request.headers.get('cf-connecting-ip') || '';
  if (!checkRateLimit(ip, env)) {
    return json({ replies: fallbackReplies(env), leadSaved: false, showLeadForm: true, error: 'rate_limited' }, 429, cors);
  }
  const { body, error } = await readJsonBody(request);
  if (error) return json({ error }, error === 'too_large' ? 413 : 400, cors);

  const v = validateChatBody(body);
  if (v.error) return json({ error: v.error }, 400, cors);
  const messages = v.messages;
  const conversationId = body.conversationId;
  const page = cleanPage(body.page);
  const lastUser = messages[messages.length - 1].content;

  // Honeypot: bots fill hidden fields. Answer politely, do nothing.
  if (body.hp || body.website) {
    return json({ replies: [`Thanks! You can reach us at ${phoneOf(env)}.`], leadSaved: false }, 200, cors);
  }

  if (!(await verifyTurnstile(env, body.turnstileToken, ip))) {
    return json({ replies: fallbackReplies(env), leadSaved: false, showLeadForm: true, error: 'verification_failed' }, 403, cors);
  }

  const priorLead = sanitizeLead(body.leadState || {});
  const regexLead = extractLeadFromMessages(messages);
  let lead = mergeLeads(priorLead, regexLead);
  let emergency = detectEmergency(lastUser);
  let replies;
  let showLeadForm = false;
  let toolUsed = false;

  if (env.CHAT_DISABLED === '1' || env.CHAT_DISABLED === 'true') {
    replies = disabledReplies(env);
    showLeadForm = !hasContact(lead);
  } else if (!(await checkDailyCap(env))) {
    replies = fallbackReplies(env, lead);
    showLeadForm = !hasContact(lead);
  } else {
    try {
      const system = buildSystemPrompt(env, { page, lead: hasContact(lead) ? lead : null });
      const result = await generateReply(env, { system, messages: toModelMessages(messages), tool: SAVE_LEAD_TOOL });
      let text = result.text;
      const calls = (result.toolCalls || []).filter((c) => c.name === 'save_lead');
      if (calls.length) {
        toolUsed = true;
        for (const c of calls) lead = mergeLeads(lead, sanitizeLead(c.args));
        const ok = hasContact(lead);
        if (!text) {
          try {
            const fu = await result.followUp(
              calls.map((c) => ({
                name: c.name,
                response: ok
                  ? { status: 'saved', lead_status: leadStatus(lead) }
                  : { status: 'not_saved', reason: 'A valid US phone number or email is required. Ask the visitor to double-check it.' },
              })),
            );
            text = fu.text;
          } catch (e) {
            console.error('followUp failed', e && e.message);
          }
          if (!text) text = ok ? afterSaveText(lead, env) : `Hmm, that number doesn't look quite right. Could you double-check it for me?`;
        }
      }
      replies = toBubbles(text);
      if (!replies.length) throw new ProviderError('empty reply', 0);
    } catch (e) {
      console.error('model error', e && e.message);
      replies = fallbackReplies(env, lead);
      showLeadForm = !hasContact(lead);
    }
  }

  if (lead.urgency === 'emergency' || lead.service === 'emergency_leak') emergency = true;

  let leadSaved = false;
  let leadKey = typeof body.leadKey === 'string' ? body.leadKey.slice(0, 32) : '';
  if (hasContact(lead)) {
    leadSaved = true;
    const fp = await leadFingerprint(lead);
    if (fp !== leadKey) {
      leadKey = fp;
      const allMsgs = [...messages, ...replies.map((r) => ({ role: 'assistant', content: r }))];
      const payload = buildLeadPayload(env, {
        conversationId,
        lead,
        messages: allMsgs,
        page,
        userAgent: request.headers.get('user-agent'),
        source: toolUsed ? 'chat' : 'chat-fallback',
        emergency,
      });
      ctx.waitUntil(sendLead(env, payload));
    }
  }

  const out = {
    replies,
    leadSaved,
    leadStatus: leadStatus(lead),
    quickReplies: showLeadForm ? [] : suggestQuickReplies(replies[replies.length - 1], lead),
    emergency,
  };
  if (leadSaved) {
    out.leadKey = leadKey;
    out.leadState = lead;
  }
  if (showLeadForm) out.showLeadForm = true;
  return json(out, 200, cors);
}

async function handleLead(request, env, ctx, cors) {
  const ip = request.headers.get('cf-connecting-ip') || '';
  if (!checkRateLimit(ip, env)) return json({ ok: false, error: 'rate_limited' }, 429, cors);
  const { body, error } = await readJsonBody(request);
  if (error) return json({ ok: false, error }, error === 'too_large' ? 413 : 400, cors);
  if (body.website || body.hp) return json({ ok: true }, 200, cors); // honeypot: pretend success
  if (!CONV_ID_RE.test(String(body.conversationId || ''))) return json({ ok: false, error: 'bad_conversation_id' }, 400, cors);
  if (!(await verifyTurnstile(env, body.turnstileToken, ip))) return json({ ok: false, error: 'verification_failed' }, 403, cors);

  const formLead = sanitizeLead({
    first_name: body.firstName,
    phone: body.phone,
    email: body.email,
    description: body.message,
    best_time: body.bestTime,
    address: body.address,
  });
  if (!formLead.phone) return json({ ok: false, error: 'invalid_phone' }, 400, cors);
  const lead = mergeLeads(sanitizeLead(body.leadState || {}), formLead);

  let messages = [];
  if (Array.isArray(body.messages)) {
    const v = validateChatBody({
      conversationId: body.conversationId,
      messages: [...body.messages, { role: 'user', content: '(submitted the callback form)' }],
    });
    if (!v.error) messages = v.messages;
  }
  const payload = buildLeadPayload(env, {
    conversationId: body.conversationId,
    lead,
    messages,
    page: cleanPage(body.page),
    userAgent: request.headers.get('user-agent'),
    source: 'form',
    emergency: messages.some((m) => m.role === 'user' && detectEmergency(m.content)),
  });
  ctx.waitUntil(sendLead(env, payload));
  return json({ ok: true, leadKey: await leadFingerprint(lead), leadState: lead, leadStatus: leadStatus(lead) }, 200, cors);
}

function handleWidget(request) {
  const headers = {
    'content-type': 'application/javascript; charset=utf-8',
    'cache-control': 'public, max-age=86400, stale-while-revalidate=604800',
    etag: WIDGET_ETAG,
    'access-control-allow-origin': '*',
    'x-content-type-options': 'nosniff',
  };
  if (request.headers.get('if-none-match') === WIDGET_ETAG) return new Response(null, { status: 304, headers });
  return new Response(request.method === 'HEAD' ? null : WIDGET_JS, { status: 200, headers });
}

/** The Worker's fetch handler (wired up in index.js). */
export async function handleFetch(request, env = {}, ctx = { waitUntil() {} }) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  const origin = request.headers.get('origin') || '';
  const cors = corsHeaders(origin, env);

  try {
    if ((request.method === 'GET' || request.method === 'HEAD') && path === '/widget.js') return handleWidget(request);
    if (request.method === 'GET' && path === '/health') {
      return json(
        {
          ok: true,
          version: VERSION,
          provider: env.AI_PROVIDER || 'gemini',
          model: env.GEMINI_MODEL || 'gemini-2.5-flash-lite',
          disabled: env.CHAT_DISABLED === '1' || env.CHAT_DISABLED === 'true',
          webhookConfigured: !!env.LEAD_WEBHOOK_URL,
          keyConfigured: !!(env.GEMINI_API_KEY || env.ANTHROPIC_API_KEY),
        },
        200,
      );
    }
    if (path === '/chat' || path === '/lead') {
      if (!isOriginAllowed(origin, env)) return json({ error: 'origin_not_allowed' }, 403, { Vary: 'Origin' });
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
      if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, cors);
      return path === '/chat' ? await handleChat(request, env, ctx, cors) : await handleLead(request, env, ctx, cors);
    }
    if (path === '/') return new Response('Alter Phase chat API. See /health.', { status: 200, headers: { 'content-type': 'text/plain' } });
    return json({ error: 'not_found' }, 404);
  } catch (e) {
    console.error('unhandled', e && e.stack);
    return json({ replies: fallbackReplies(env), leadSaved: false, showLeadForm: true, error: 'server_error' }, 500, cors);
  }
}
