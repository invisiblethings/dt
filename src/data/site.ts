// Single source of truth for brand facts, prices and outbound links.
// Every number here is verified against the live course pages (see
// docs/01-strategy-and-findings.md). Change a price or link here and it
// updates across the whole site, its structured data and its FAQ answers.

export const SITE_URL = 'https://pianoforall.academy';

// Turn sections on and off without deleting them.
// freeLessons: the free Test Drive page and every 'Try it free' button.
// To bring it back: set to true and rename src/pages/_free-lessons.astro to
// free-lessons.astro. The temporary /free-lessons redirect turns off by itself.
export const FEATURES = {
  freeLessons: false,
};

export const BRAND = {
  name: 'Pianoforall',
  legalName: 'Pianoforall Academy Limited',
  legalEmail: 'info@pianoforall.com',
  tagline: 'Learn piano by playing piano',
  founded: '2006',
  founder: 'Robin Hall',
  email: 'robin@pianoforall.com',
  // Approximate, brand-reported total across Udemy and the Academy. Confirm before launch.
  studentsLabel: 'more than 500,000',
  logo: '/brand/pianoforall-icon.png',
  // Add verified profiles (YouTube, Facebook, Udemy instructor page) when confirmed.
  sameAs: [
    'https://academy.pianoforall.com',
  ],
};

export const ROBIN = {
  name: 'Robin Hall',
  jobTitle: 'Piano teacher and creator of Pianoforall',
  yearsTeaching: '30',
  bookTitle: "The Cartoonist's Workbook",
};

// Third-party rating that anyone can check. Update from the live Udemy page.
export const UDEMY = {
  rating: '4.7',
  ratingCount: '53,000',
  students: '421,000',
  checked: 'October 2026',
  url: 'https://www.udemy.com/course/pianoforall-incredible-new-way-to-learn-piano-keyboard/',
};

// ClickBank order forms. Visitors see the short /go/... links on the site;
// the build writes them as redirects (dist/_redirects) to these URLs.
const CB = 'https://drilonnn_piano4all.pay.clickbank.net';

export const LINKS = {
  // Free Test Drive (Thinkific, no card required)
  freeTrial: 'https://academy.pianoforall.com/courses/pianoforall-academy-test-drive',
  signIn: 'https://academy.pianoforall.com/users/sign_in',
  pianoLounge: 'https://academy.pianoforall.com/courses/pianoforall-academy-test-drive',
  clickbankSupport: 'https://www.clkbank.com/',
  clickbankPhone: '1-800-390-6035',
  clickbankPhoneIntl: '+1 208-345-4245',
  trailerVimeo: '955476657',
  sampleLessonVimeo: '952479218',
  moonlightVimeo: '768139864',
};

export type Product = {
  id: string;
  name: string;
  short: string;
  price: number;
  lessons?: number;
  videoHours?: number;
  /** Pretty link shown on the site, e.g. /go/pianoforall */
  checkout: string;
  /** Real ClickBank order form the pretty link redirects to */
  orderUrl: string;
  url: string;
};

export const PRODUCTS: Record<string, Product> = {
  pianoforall: {
    id: 'pianoforall',
    name: 'Pianoforall',
    short: 'The complete course',
    price: 49,
    lessons: 568,
    videoHours: 25,
    checkout: '/go/pianoforall',
    orderUrl: `${CB}/?cbitems=60&exitoffer=exit3`,
    url: '/course',
  },
  moonlight: {
    id: 'moonlight',
    name: 'Classics By Ear: Moonlight Sonata',
    short: 'Beethoven, 1st movement',
    price: 49,
    lessons: 38,
    videoHours: 4,
    checkout: '/go/moonlight-sonata',
    orderUrl: `${CB}/?cbitems=68&template=CBEM`,
    url: '/classics-by-ear/moonlight-sonata',
  },
  satie: {
    id: 'satie',
    name: 'Classics By Ear: Erik Satie',
    short: 'Three Gnossiennes',
    price: 49,
    lessons: 45,
    videoHours: 4.5,
    checkout: '/go/erik-satie',
    orderUrl: `${CB}/?cbitems=70&template=CBES`,
    url: '/classics-by-ear/erik-satie-gnossiennes',
  },
  bach: {
    id: 'bach',
    name: 'Classics By Ear: Bach Preludes',
    short: 'Preludes in C major and C minor',
    price: 49,
    lessons: 48,
    videoHours: 5,
    checkout: '/go/bach-preludes',
    orderUrl: `${CB}/?cbitems=69&template=CBEB`,
    url: '/classics-by-ear/bach-preludes',
  },
  classicsBundle: {
    id: 'classicsBundle',
    name: 'Classics By Ear Bundle',
    short: 'Moonlight Sonata, Satie and Bach',
    price: 79,
    checkout: '/go/classics-bundle',
    orderUrl: `${CB}/?cbitems=67&template=BUNDLE3`,
    url: '/pricing#bundles',
  },
  completeBundle: {
    id: 'completeBundle',
    name: 'Complete Bundle',
    short: 'Pianoforall plus all three Classics By Ear courses',
    price: 99,
    checkout: '/go/complete-bundle',
    orderUrl: `${CB}/?cbitems=79&template=BUNDLE4`,
    url: '/pricing#bundles',
  },
};

export const GUARANTEE_DAYS = 60;

// Main call to action used in the header, sticky bars and final sections.
export const PRIMARY_CTA = FEATURES.freeLessons
  ? { label: 'Try it free', href: '/free-lessons', note: '<b>Free lessons</b>No card needed', event: 'cta_click' }
  : { label: 'Get the course', href: '/pricing', note: '<b>$49 once</b>60-day refund', event: 'cta_click' };

export const NAV = [
  { href: '/course', label: 'The course' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/classics-by-ear', label: 'Classics By Ear' },
  { href: '/learn', label: 'Learn' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/pricing', label: 'Pricing' },
];
