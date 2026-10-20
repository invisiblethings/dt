import { business } from './business';
import { zipCounts } from './zips';

const site = business.url;
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
  openingHours: business.hoursSchema,
  areaServed: [
    { '@type': 'City', name: 'Staten Island' },
    { '@type': 'City', name: 'Brooklyn' },
    { '@type': 'State', name: 'New Jersey' },
    ...zipCounts.map((z) => ({ '@type': 'PostalCodeSpecification', postalCode: z.zip, addressCountry: 'US' })),
  ],
  sameAs: [business.social.instagram, business.social.youtube],
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
  areaServed: [
    { '@type': 'City', name: 'Staten Island' },
    { '@type': 'City', name: 'Brooklyn' },
    { '@type': 'State', name: 'New Jersey' },
  ],
});
