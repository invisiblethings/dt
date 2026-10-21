import { business } from './business';
import { zipCounts } from './zips';
import { services } from './services';

const site = business.url;

// Boroughs and states with identifiers so search engines know exactly which place is meant.
const places = [
  { '@type': 'AdministrativeArea', name: 'Staten Island', sameAs: 'https://en.wikipedia.org/wiki/Staten_Island', containedInPlace: { '@type': 'City', name: 'New York' } },
  { '@type': 'AdministrativeArea', name: 'Brooklyn', sameAs: 'https://en.wikipedia.org/wiki/Brooklyn', containedInPlace: { '@type': 'City', name: 'New York' } },
  { '@type': 'State', name: 'New Jersey', sameAs: 'https://en.wikipedia.org/wiki/New_Jersey' },
];
export const orgId = `${site}/#business`;

// The business entity. Output on every page; other schema references it by @id.
export const roofingContractor = {
  '@type': 'RoofingContractor',
  '@id': orgId,
  name: business.name,
  alternateName: business.shortName,
  legalName: business.legalName,
  url: `${site}/`,
  logo: `${site}/logo.png`,
  image: `${site}/og.jpg`,
  telephone: '+1-718-981-7663',
  email: business.email,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.zip,
    addressCountry: business.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: business.social.googleReviews,
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '07:00',
    closes: '21:00',
  }],
  areaServed: [
    ...places,
    ...zipCounts.map((z) => ({ '@type': 'PostalCodeSpecification', postalCode: z.zip, addressCountry: 'US' })),
  ],
  sameAs: [business.social.googleReviews, business.social.instagram, business.social.youtube],
  // Services that have their own page; the list grows as pages ship.
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Roofing, gutter and siding services',
    itemListElement: services.filter((s) => s.built && s.href).map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@id': `${site}${s.href}#service` },
    })),
  },
};

export const website = {
  '@type': 'WebSite',
  '@id': `${site}/#website`,
  url: `${site}/`,
  name: business.name,
  alternateName: business.shortName,
  publisher: { '@id': orgId },
};

export const breadcrumb = (items: { name: string; href: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site}${it.href}` })),
});

export const service = (name: string, href: string, description: string) => ({
  '@type': 'Service',
  '@id': `${site}${href}#service`,
  name,
  serviceType: name,
  description,
  url: `${site}${href}`,
  provider: { '@id': orgId },
  areaServed: places,
});
