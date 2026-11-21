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
  ['/tag/*', '/learn'],
  ['/author/*', '/about'],
  ['/feed', '/learn'],
  ['/comments/feed', '/learn'],
  ['/feed.xml', '/learn'],
  ['/sitemap_index.xml', '/sitemap.xml'],
  ['/page-sitemap.xml', '/sitemap.xml'],
  ['/post-sitemap.xml', '/sitemap.xml'],
  ['/category-sitemap.xml', '/sitemap.xml'],
  // The blog was removed (all posts were imported from the old WordPress
  // site). Each old post goes to the closest guide or course page.
  ['/blog', '/learn'],
  ['/category/*', '/learn'],
  ['/a-few-jazz-piano-books-i-recommend', '/learn/learn-piano-online'],
  ['/acoustic-piano-vs-digital-keyboard', '/learn/choosing-a-keyboard'],
  ['/animals-playing-piano', '/learn'],
  ['/antarctica-piano-story', '/learn'],
  ['/beatles-six-sensational-pianists', '/learn'],
  ['/beginner-keyboard-setup', '/learn/choosing-a-keyboard'],
  ['/build-a-piano-song-repertoire', '/learn/learn-piano-online'],
  ['/carole-king-piano-brill-building', '/learn'],
  ['/casablanca-as-time-goes-by-history', '/learn'],
  ['/erik-satie-piano-music', '/classics-by-ear/erik-satie-gnossiennes'],
  ['/fabulous-baker-boys-piano', '/learn'],
  ['/from-excited-to-consistent-mastering-the-habit-of-piano-practice', '/learn/piano-practice-routine'],
  ['/george-michael-john-lennons-imagine-piano', '/learn'],
  ['/how-to-improve-at-piano', '/learn/piano-practice-routine'],
  ['/if-you-play-guitar-you-can-play-piano', '/learn/piano-chords-for-beginners'],
  ['/john-lennon-mr-kite-piano-inspiration', '/learn'],
  ['/joyce-hatto-piano-hoax', '/learn'],
  ['/learn-moonlight-sonata', '/classics-by-ear/moonlight-sonata'],
  ['/learn-summertime-on-piano', '/learn/play-piano-by-ear'],
  ['/learning-piano-between-practice', '/learn/piano-practice-routine'],
  ['/marilyn-monroes-white-baby-grand-a-love-story-in-ivory-and-song', '/learn'],
  ['/peanuts-piano', '/learn'],
  ['/piano-in-casablanca-as-time-goes-by', '/learn'],
  ['/piano-mindset-shift', '/learn/piano-practice-routine'],
  ['/piano-practice-can-be-fun-too', '/learn/piano-practice-routine'],
  ['/pianos-and-pianists-at-the-olympics', '/learn'],
  ['/practice-according-to-your-chronotype-animal', '/learn/piano-practice-routine'],
  ['/psychological-flexibility-piano-learning', '/learn/piano-practice-routine'],
  ['/public-pianos-train-stations', '/learn'],
  ['/silent-film-pianists-history', '/learn'],
  ['/sing-better-at-the-piano', '/learn/piano-chords-for-beginners'],
  ['/singer-pianists', '/learn/piano-chords-for-beginners'],
  ['/super-bowl-piano-history', '/learn'],
  ['/the-piano-has-been-drinking', '/learn'],
  ['/who-has-inspired-the-most-songs-the-surprising-answer-at-the-piano', '/learn'],
  ['/why-most-piano-courses-expect-too-much-from-beginners', '/how-it-works'],
  ['/why-your-brain-loves-rewards-and-what-that-means-for-practice-learning-motivation', '/learn/piano-practice-routine'],
  ['/women-at-the-piano', '/learn'],
  ['/woop-method-for-piano-practice', '/learn/piano-practice-routine'],
];

/** Hostnames that should send everything to the primary domain. */
// The Netlify subdomain also redirects, so only pianoforall.academy gets indexed.
// Deploy previews (deploy-preview-N--pianoforallacad.netlify.app) are other hosts and still work.
export const OLD_HOSTS = ['https://pianoforall.com', 'https://www.pianoforall.com', 'https://www.pianoforall.academy', 'https://pianoforallacad.netlify.app'];

/** Old WordPress system paths: answered with 410 Gone. */
export const GONE = ['/wp-admin/*', '/wp-login.php', '/xmlrpc.php', '/wp-content/*'];
