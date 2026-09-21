import { site } from '../data/site.js';

const dayMap = {
  'Monday-Friday': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  Saturday: ['Saturday'],
  Sunday: ['Sunday'],
};

export function localBusinessSchema() {
  const openingHoursSpecification = site.hours
    .filter((h) => h.day !== 'Sunday')
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dayMap[h.day],
      opens: h.open,
      closes: h.close,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/og-image.jpg`,
    logo: `${site.url}/favicon-512.png`,
    priceRange: '$$',
    description: 'Licensed and insured roof repair, replacement, and maintenance contractor serving all neighborhoods of Brooklyn, New York.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      postalCode: site.postalCode,
      addressCountry: site.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: {
      '@type': 'City',
      name: 'Brooklyn',
      sameAs: 'https://en.wikipedia.org/wiki/Brooklyn',
    },
    openingHoursSpecification,
    sameAs: Object.values(site.social),
  };
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: `${service.name} in Brooklyn, NY`,
    description: service.metaDescription,
    provider: { '@id': `${site.url}/#business` },
    areaServed: { '@type': 'City', name: 'Brooklyn' },
    url: `${site.url}/services/${service.slug}/`,
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function neighborhoodSchema(neighborhood) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Roof Repair',
    name: `Roof Repair in ${neighborhood.name}, Brooklyn`,
    description: neighborhood.metaDescription,
    provider: { '@id': `${site.url}/#business` },
    areaServed: { '@type': 'Neighborhood', name: neighborhood.name },
    url: `${site.url}/service-areas/${neighborhood.slug}/`,
  };
}
