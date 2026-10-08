// Single source of truth for brand facts, prices and outbound links.
// Every number here is verified against the live course pages (see
// docs/01-strategy-and-findings.md). Change a price or link here and it
// updates across the whole site, its structured data and its FAQ answers.

export const SITE_URL = 'https://pianoforall.com';

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
    'https://www.udemy.com/course/pianoforall-incredible-new-way-to-learn-piano-keyboard/',
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

const CB = 'https://piano4all.pay.clickbank.net';

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
  checkout: string;
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
    checkout: `${CB}/?cbitems=71&template=PFA`,
    url: '/course',
  },
  moonlight: {
    id: 'moonlight',
    name: 'Classics By Ear: Moonlight Sonata',
    short: 'Beethoven, 1st movement',
    price: 49,
    lessons: 38,
    videoHours: 4,
    checkout: `${CB}/?cbitems=68&template=CBEM`,
    url: '/classics-by-ear/moonlight-sonata',
  },
  satie: {
    id: 'satie',
    name: 'Classics By Ear: Erik Satie',
    short: 'Three Gnossiennes',
    price: 49,
    lessons: 45,
    videoHours: 4.5,
    checkout: `${CB}/?cbitems=70&template=CBES`,
    url: '/classics-by-ear/erik-satie-gnossiennes',
  },
  bach: {
    id: 'bach',
    name: 'Classics By Ear: Bach Preludes',
    short: 'Preludes in C major and C minor',
    price: 49,
    lessons: 48,
    videoHours: 5,
    checkout: `${CB}/?cbitems=69&template=CBEB`,
    url: '/classics-by-ear/bach-preludes',
  },
  classicsBundle: {
    id: 'classicsBundle',
    name: 'Classics By Ear Bundle',
    short: 'Moonlight Sonata, Satie and Bach',
    price: 79,
    checkout: `${CB}/?cbitems=67&template=BUNDLE3`,
    url: '/pricing#bundles',
  },
  completeBundle: {
    id: 'completeBundle',
    name: 'Complete Bundle',
    short: 'Pianoforall plus all three Classics By Ear courses',
    price: 99,
    checkout: `${CB}/?cbitems=79&template=BUNDLE4`,
    url: '/pricing#bundles',
  },
};

export const GUARANTEE_DAYS = 60;

export const NAV = [
  { href: '/course', label: 'The course' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/classics-by-ear', label: 'Classics By Ear' },
  { href: '/learn', label: 'Learn' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/pricing', label: 'Pricing' },
];
