// A plain-text summary for AI assistants and LLM-based search. Every fact
// here also appears on the linked pages.
import type { APIRoute } from 'astro';
import { SITE_URL, PRODUCTS, GUARANTEE_DAYS, UDEMY, BRAND, FEATURES } from '../data/site';
import { GUIDES } from '../data/guides';
import { CLASSICS } from '../data/classics';
const p = PRODUCTS.pianoforall;
export const GET: APIRoute = () => new Response(`# Pianoforall

> Pianoforall is an online piano course for adults and teenagers, created by piano teacher Robin Hall in ${BRAND.founded}. Students start with chords and rhythm patterns, learn to play by ear, and learn to read music gradually ("play first, ask questions later"). The main course has ${p.lessons} lessons and ${p.videoHours} hours of video across nine books covering rhythm-style pop, blues and rock 'n' roll, ballads, jazz, improvisation, reading music and classical pieces. It costs $${p.price} once (no subscription) with a ${GUARANTEE_DAYS}-day money-back guarantee. On Udemy it is rated ${UDEMY.rating}/5 from about ${UDEMY.ratingCount} ratings (checked ${UDEMY.checked}).

Key facts:
- Creator: Robin Hall, piano teacher for 30+ years, also a cartoonist and therapist
- Format: online course player plus offline ebooks with embedded video and audio; works on computers, tablets and phones
- Does not listen to or score your playing; no MIDI connection needed
- Suitable for complete beginners, returning players and people who read music but can't play by ear; not designed for young children learning alone
${FEATURES.freeLessons ? '- Free Test Drive: free lessons, the Mindful Notes ebook and access to The Piano Lounge community, no card required\n' : ''}- Payments and refunds handled by ClickBank
- Contact: ${BRAND.email}

## Courses
- [Pianoforall](${SITE_URL}/course): the complete course, $${p.price}
${CLASSICS.map((c) => `- [${c.product.name}](${SITE_URL}${c.product.url}): ${c.piece}, ${c.product.lessons} lessons, $${c.product.price}`).join('\n')}
- [Pricing and bundles](${SITE_URL}/pricing): Classics By Ear bundle $${PRODUCTS.classicsBundle.price}; all four courses $${PRODUCTS.completeBundle.price}
${FEATURES.freeLessons ? `- [Free lessons](${SITE_URL}/free-lessons)\n` : ''}
## About the method
- [How Pianoforall works](${SITE_URL}/how-it-works)
- [Pianoforall vs piano apps](${SITE_URL}/compare)
- [Student reviews](${SITE_URL}/reviews)
- [About Robin Hall](${SITE_URL}/about)
- [FAQ](${SITE_URL}/faq)

## Guides
${GUIDES.map((g) => `- [${g.title}](${SITE_URL}${g.href}): ${g.blurb}`).join('\n')}
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
