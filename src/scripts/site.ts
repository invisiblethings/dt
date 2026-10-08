// Site-wide behaviour. Kept small: menu, sticky CTA, click-to-load video,
// and a vendor-neutral analytics event layer.

type Payload = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Payload }) => void;
    pfaTrack?: (event: string, props?: Payload) => void;
  }
}

/** Send an event to whatever analytics is installed. No vendor is loaded by default. */
function track(event: string, props: Payload = {}) {
  const clean = Object.fromEntries(Object.entries({ page_path: location.pathname, ...props }).filter(([, v]) => v !== undefined));
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });
  window.gtag?.('event', event, clean);
  window.plausible?.(event, { props: clean as Payload });
}
window.pfaTrack = track;

// Click tracking: any element with data-track="event_name".
document.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
  if (!el) return;
  const href = el.getAttribute('href') ?? undefined;
  track(el.dataset.track!, {
    location: el.dataset.trackLocation,
    product: el.dataset.product,
    label: el.textContent?.trim().slice(0, 60),
    link_url: href,
    outbound: href && /^https?:/.test(href) && !href.includes(location.hostname) ? 1 : undefined,
  });
});

// Mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('mobile-menu');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  menu?.setAttribute('data-open', String(open));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    toggle.click();
    toggle.focus();
  }
});

// Sticky mobile CTA: appears after the hero scrolls away, hides near the footer.
const sticky = document.querySelector<HTMLElement>('[data-sticky-cta]');
if (sticky) {
  const footer = document.querySelector('.site-footer');
  let pastHero = false;
  let nearFooter = false;
  const update = () => {
    const show = pastHero && !nearFooter;
    sticky.dataset.visible = String(show);
    sticky.setAttribute('aria-hidden', String(!show));
    sticky.querySelector('a')?.setAttribute('tabindex', show ? '0' : '-1');
  };
  const onScroll = () => { pastHero = window.scrollY > window.innerHeight * 0.8; update(); };
  window.addEventListener('scroll', onScroll, { passive: true });
  if (footer) new IntersectionObserver(([en]) => { nearFooter = en.isIntersecting; update(); }).observe(footer);
  onScroll();
}

// Click-to-load Vimeo: no third-party JS until the visitor asks for the video.
document.querySelectorAll<HTMLElement>('[data-vimeo]').forEach((box) => {
  box.querySelector('button')?.addEventListener('click', () => {
    const id = box.dataset.vimeo!;
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&title=0&byline=0`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.title = box.dataset.title ?? 'Video';
    box.replaceChildren(iframe);
    track('video_play', { video: box.dataset.title });
  });
});

// FAQ opens
document.querySelectorAll<HTMLDetailsElement>('.faq details').forEach((d) => {
  d.addEventListener('toggle', () => { if (d.open) track('faq_open', { question: d.querySelector('summary')?.textContent?.trim().slice(0, 80) }); });
});

// Scroll depth on long pages (25/50/75/100)
const marks = [25, 50, 75, 100];
const hit = new Set<number>();
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = ((h.scrollTop + innerHeight) / h.scrollHeight) * 100;
  for (const m of marks) if (pct >= m && !hit.has(m)) { hit.add(m); track('scroll_depth', { percent: m }); }
}, { passive: true });

export {};
