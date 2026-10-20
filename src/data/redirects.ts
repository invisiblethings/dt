// Every redirect the site needs, in one place. The build turns this into
// dist/_redirects (see astro.config.mjs). Reasoning per URL:
// docs/05-migration-and-redirects.md

/** Old URL path -> new path on this site. Applied on pianoforall.academy
 *  and, as a single hop, from pianoforall.com / www.pianoforall.com. */
export const PATH_REDIRECTS: [from: string, to: string, status?: number][] = [
  // Old pianoforall.academy single-page site
  ['/terms.html', '/terms-of-use'],
  ['/privacy.html', '/privacy-policy'],
  // Old pianoforall.com WordPress URLs that changed
  ['/order', '/pricing'],
  ['/pianoforall-faqs', '/faq'],
  ['/frequently-asked-questions', '/faq'],
  ['/testimonials', '/reviews'],
  ['/reviews/pianoforall', '/reviews'],
  ['/reviews/classics-by-ear', '/classics-by-ear'],
  ['/reviews/moonlight-sonata', '/classics-by-ear/moonlight-sonata'],
  ['/reviews/bach-preludes', '/classics-by-ear/bach-preludes'],
  ['/reviews/erik-satie', '/classics-by-ear/erik-satie-gnossiennes'],
  ['/about-robin-pianoforall', '/about'],
  ['/contact-support', '/contact'],
  ['/home-page', '/'],
  ['/learn-piano-online', '/learn/learn-piano-online'],
  ['/learn-piano-how-pianoforall-works', '/how-it-works'],
  ['/choosing-a-keyboard-or-digital-piano', '/learn/choosing-a-keyboard'],
  ['/pianoforall-vs-the-top-10-piano-learning-apps', '/compare'],
  // Funnel page: temporary until you confirm whether an offer still uses it
  ['/exclusive-offer-classics-by-ear', '/classics-by-ear', 302],
  // Free lessons are switched off for now (FEATURES.freeLessons in site.ts)
  ['/free-lessons', '/pricing', 302],
  ['/log-in', 'https://academy.pianoforall.com/users/sign_in'],
  ['/tag/*', '/blog'],
  ['/author/*', '/about'],
  ['/feed', '/feed.xml'],
  ['/comments/feed', '/feed.xml'],
  ['/sitemap_index.xml', '/sitemap.xml'],
  ['/page-sitemap.xml', '/sitemap.xml'],
  ['/post-sitemap.xml', '/sitemap.xml'],
  ['/category-sitemap.xml', '/sitemap.xml'],
];

/** Hostnames that should send everything to the primary domain. */
export const OLD_HOSTS = ['https://pianoforall.com', 'https://www.pianoforall.com', 'https://www.pianoforall.academy'];

/** Old WordPress system paths: answered with 410 Gone. */
export const GONE = ['/wp-admin/*', '/wp-login.php', '/xmlrpc.php'];
