// Single source of truth for business facts. Every page, the footer and the structured data read from here,
// so name, address and phone stay identical everywhere (critical for local SEO).
export const business = {
  name: 'B&B Roofing & Gutters',
  shortName: 'B&B Roofing',
  legalName: 'B&B Home Improvement & Contracting LLC',
  url: 'https://bbroofingpros.com',
  phone: '(718) 981-7663',
  phoneVanity: '(718) 981-ROOF',
  phoneHref: 'tel:+17189817663',
  email: 'info@bbroofingpros.com',
  address: {
    street: '145 Cedar Ave',
    city: 'Staten Island',
    region: 'NY',
    zip: '10305',
    country: 'US',
  },
  hours: 'Mon–Sun 7am–9pm',
  // Matches the Google Business Profile pin (owner-confirmed, 21 Oct 2026).
  geo: { lat: 40.5965, lng: -74.06754 },
  emergency: '24/7 emergency service for active leaks',
  responsePromise: 'We contact you within 24 hours.',
  license: 'NYC DCWP HIC License #2125865-DCWP',
  njLicense: '', // Owner to supply NJ HIC registration number
  founded: '', // Owner to supply founding year; site copy says "over 10 years"
  owners: ['Bill', 'Brian'],
  stats: {
    rating: '5.0',
    reviews: '225+',
    projects: '2,000+',
    satisfaction: '99%',
  },
  certifications: ['GAF Master Elite® Contractor', 'Owens Corning Preferred Contractor'],
  warranty:
    'Up to 50 years of non-prorated manufacturer coverage and up to 30 years of workmanship coverage through GAF Golden Pledge® on qualifying roof systems.',
  financing: 'Flexible financing available. Ask about payment options.',
  social: {
    instagram: 'https://www.instagram.com/roof_doctor/',
    youtube: 'https://www.youtube.com/@bbroofingpros',
    googleReviews: 'https://maps.app.goo.gl/MbPkZ36Dqn3oQfTb7',
  },
  serviceAreas: ['Staten Island', 'Brooklyn', 'New Jersey'],
} as const;

export const addressLine = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.zip}`;
