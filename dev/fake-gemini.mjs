// A tiny scripted stand-in for the Gemini REST API, used by the local dev server and the e2e test.
// It speaks the real generateContent response format, including save_lead function calls.

const PHONE_RE = /(?:\+?1[\s.-]?)?\(?\b([2-9]\d{2})\)?[\s.-]?([2-9]\d{2})[\s.-]?(\d{4})\b/;

function textOf(content) {
  return (content.parts || []).map((p) => p.text || '').join(' ');
}
function reply(text) {
  return { candidates: [{ content: { role: 'model', parts: [{ text }] }, finishReason: 'STOP' }] };
}

export function fakeGemini(body) {
  const contents = body.contents || [];
  const last = contents[contents.length - 1];

  // Second leg of a tool call: confirm what was saved.
  const fr = last.parts && last.parts[0] && last.parts[0].functionResponse;
  if (fr) {
    const call = contents[contents.length - 2].parts.find((p) => p.functionCall).functionCall.args;
    const name = call.first_name ? `, ${call.first_name}` : '';
    if (call.urgency === 'emergency') {
      return reply(
        `Got it, thanks${name}. I've flagged this as urgent for the team.\n\nIf water's coming in right now, call (929) 370-1552 so we can move faster.`,
      );
    }
    return reply(
      `Perfect, thanks${name}! Someone from our team will give you a call during business hours to set up your free estimate. What neighborhood is the property in?`,
    );
  }

  const user = textOf(last);
  const t = user.toLowerCase();
  const all = contents
    .filter((c) => c.role === 'user')
    .map(textOf)
    .join(' \n ')
    .toLowerCase();
  const prevModel = contents.length > 1 ? textOf(contents[contents.length - 2]).toLowerCase() : '';

  if (t.includes('simulate error')) return { __status: 503 };

  const pm = user.match(PHONE_RE);
  if (pm) {
    let first_name = '';
    for (let i = 1; i < contents.length; i++) {
      if (contents[i].role === 'user' && /name/i.test(textOf(contents[i - 1]))) {
        const w = textOf(contents[i]).trim().split(/\s+/)[0];
        if (/^[a-z]{2,}$/i.test(w)) first_name = w[0].toUpperCase() + w.slice(1);
      }
    }
    const urgency = /leak|water|emergency|ceiling/.test(all) ? 'emergency' : /replac/.test(all) ? 'planning' : 'unknown';
    const service = /leak|emergency/.test(all)
      ? 'emergency_leak'
      : /replac|estimate/.test(all)
        ? 'roof_replacement'
        : /gutter|siding/.test(all)
          ? 'gutters'
          : 'roof_repair';
    return {
      candidates: [
        {
          content: {
            role: 'model',
            parts: [{ functionCall: { name: 'save_lead', args: { first_name, phone: pm[0], service, urgency } } }],
          },
        },
      ],
    };
  }
  if (/\b(bot|robot|human|real person|\bai\b)/.test(t)) {
    return reply(
      "Fair question! I'm an AI assistant for the Alter Phase team. A real person from our office follows up with everyone personally.",
    );
  }
  if (/name/.test(prevModel) && /^[a-z]{2,20}$/i.test(user.trim())) {
    const n = user.trim()[0].toUpperCase() + user.trim().slice(1).toLowerCase();
    return reply(`Nice to meet you, ${n}! What's the best number to reach you?`);
  }
  if (/leak|water|emergency|ceiling/.test(t)) {
    return reply("Oh no, sorry you're dealing with that.\n\nWhat's the best number to reach you so we can get someone on it fast?");
  }
  if (/how much|cost|price/.test(t)) {
    return reply(
      "Honestly, it depends on the size, materials, and condition of the roof, so we don't guess over chat. The estimate's free with no obligation though. Want me to set that up?",
    );
  }
  if (/replac|estimate/.test(t)) {
    return reply(
      "Happy to help with that! Roof replacements are a big part of what we do, and the estimate is free with no obligation.\n\nWant me to have someone from the team give you a call? What's your first name?",
    );
  }
  if (/gutter|siding/.test(t)) return reply("Yep, we do gutters and siding too. What's going on with yours?");
  if (/repair/.test(t)) return reply("We can definitely help with repairs. What's going on with the roof?");
  return reply("Got it. Want me to have one of our team give you a call with a free estimate? What's your first name?");
}
