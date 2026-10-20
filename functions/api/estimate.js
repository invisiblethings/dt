// Cloudflare Pages Function: receives the estimate form and emails it to the office.
// Env vars (Pages > Settings > Variables): RESEND_API_KEY, LEAD_TO (inbox), LEAD_FROM (verified sender),
// optional TURNSTILE_SECRET. Without RESEND_API_KEY the lead is only logged (useful for previews).
const clean = (v, max = 500) => String(v ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  const back = (path) => Response.redirect(new URL(path, request.url).href, 303);

  // Bots fill the hidden "website" field; pretend success so they move on.
  if (clean(form.get('website'))) return back('/thank-you/');

  const lead = {
    name: clean(form.get('name'), 120),
    phone: clean(form.get('phone'), 40),
    area: clean(form.get('area'), 120),
    service: clean(form.get('service'), 60),
    email: clean(form.get('email'), 160),
    message: clean(form.get('message'), 3000),
    page: clean(form.get('page'), 200),
  };
  if (!lead.name || lead.phone.replace(/\D/g, '').length < 10 || !lead.area) {
    return new Response('Please go back and enter your name, a 10-digit phone number and your ZIP or neighborhood.', { status: 400 });
  }

  if (env.TURNSTILE_SECRET) {
    const body = new FormData();
    body.append('secret', env.TURNSTILE_SECRET);
    body.append('response', clean(form.get('cf-turnstile-response'), 4000));
    body.append('remoteip', request.headers.get('CF-Connecting-IP') ?? '');
    const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body }).then((r) => r.json());
    if (!check.success) return new Response('Verification failed. Please call (718) 981-7663.', { status: 400 });
  }

  if (!env.RESEND_API_KEY) {
    console.log('Lead (email not configured):', JSON.stringify(lead));
    return back('/thank-you/');
  }

  const rows = Object.entries(lead).filter(([, v]) => v).map(([k, v]) => `<tr><th align="left">${k}</th><td>${esc(v)}</td></tr>`).join('');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.LEAD_FROM,
      to: env.LEAD_TO,
      reply_to: lead.email || undefined,
      subject: `New estimate request: ${lead.service || 'roof'} in ${lead.area} (${lead.name})`,
      html: `<table cellpadding="6">${rows}</table>`,
    }),
  });
  if (!res.ok) {
    console.error('Resend failed', res.status, await res.text());
    return new Response('Sorry, something went wrong sending your request. Please call (718) 981-7663.', { status: 502 });
  }
  return back('/thank-you/');
}
