// Single source of truth for business facts (NAP must match the Google Business Profile exactly).
export const business = {
  name: 'Mold Remediation NYC',
  legalName: 'LL Evolution Inc.',
  url: 'https://moldremediation.nyc',
  phone: '(347) 369-1545',
  phoneE164: '+13473691545',
  email: 'info@moldremediation.nyc',
  owner: 'Vinny',
  address: {
    street: '1138 Ocean Ave',
    city: 'Brooklyn',
    region: 'NY',
    zip: '11230',
    neighborhood: 'Flatbush',
  },
  geo: { lat: 40.6345604, lng: -73.9584837 },
  hours: 'Open 24 hours, 7 days a week',
  google: {
    rating: 5.0,
    reviewCount: 23,
    // Links taken from the Google Business Profile
    profileUrl: 'https://maps.app.goo.gl/YaoLiSmKCftbnL5N6',
    shareUrl: 'https://share.google/ni726A9F6dXGBHZUI',
    cid: '4487802043856496808',
    mapsEmbed:
      'https://maps.google.com/maps?q=MOLD%20REMEDIATION%20NYC%2C%201138%20Ocean%20Ave%2C%20Brooklyn%2C%20NY%2011230&z=15&output=embed',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=MOLD+REMEDIATION+NYC%2C+1138+Ocean+Ave%2C+Brooklyn%2C+NY+11230',
  },
  licenses: [
    { label: 'NYS Mold Remediation License', number: '25-65KFU-SHMO', issuer: 'New York State Department of Labor' },
    { label: 'EPA Lead-Safe Certified Firm', number: 'NAT-F269558-1', issuer: 'U.S. EPA (RRP Program)' },
    { label: 'GC License', number: '626382', issuer: 'New York City' },
  ],
  sister: {
    name: 'Mold & Water Restoration NYC',
    url: 'https://moldandwaterrestoration.com',
    services: [
      { name: 'Water Damage Restoration', url: 'https://moldandwaterrestoration.com/services/water-damage-restoration/' },
      { name: 'Fire & Smoke Damage Restoration', url: 'https://moldandwaterrestoration.com/services/fire-and-smoke-damage-restoration/' },
      { name: 'Biohazard & Sewage Cleanup', url: 'https://moldandwaterrestoration.com/services/biohazard-restoration/' },
      { name: 'Storm Damage Restoration', url: 'https://moldandwaterrestoration.com/services/storm-damage-restoration/' },
    ],
  },
  social: [
    { name: 'Facebook', url: 'https://www.facebook.com/moldremediationnyc/' },
    { name: 'Instagram', url: 'https://www.instagram.com/moldwaterrestorationnyc/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/mold-remediation-water-restoration-nyc/' },
  ],
  // Optional analytics. Leave empty to ship no tracking code.
  analytics: { ga4: '' },
};

// Real Google reviews (verbatim; long ones are cut where Google truncates them).
export const reviews = [
  {
    author: 'Nilushka Reiff', year: 2026, tag: 'Repair',
    text: 'Vinny and his crew did an excellent job. They responded quickly, arrived on time, and worked efficiently and professionally. The repair was done neatly, and they left everything clean when they finished. I really appreciated the fast response and quality work. I’m very happy with the service and would highly recommend Vinny!',
  },
  {
    author: 'Daniel Barbosa', year: 2026, tag: 'Basement emergency',
    text: 'Vinny a huge help! We had a stopped up drain with sewage coming up into the basement. He came within 3 hours (on a Saturday night), stayed and worked until it was all fixed and cleaned. He had a great attitude, was very trustworthy and saved the day.',
  },
  {
    author: 'Tony', year: 2025, tag: 'Staten Island · Attic', borough: 'staten-island',
    text: 'After a major roof leak in my Staten Island home, I discovered mold spreading through the attic and walls. I hired Mold Remediation & Water Restoration NYC, and they exceeded expectations! Their crew arrived on time, explained the process…',
  },
  {
    author: 'Jessica Rafailova', year: 2025, tag: 'Manhattan · Property manager', borough: 'manhattan',
    text: 'Managing multiple buildings in Manhattan means I need vendors who are responsive, professional, and able to work under pressure—this restoration team checks all the boxes. They’ve handled several mold and water damage issues for our…',
  },
  {
    author: 'Eddie Mandala', year: 2025, tag: 'Brooklyn · Property owner', borough: 'brooklyn',
    text: 'As a property owner with several homes in Brooklyn, I’ve dealt with various restoration companies over the years—but this team truly stands out. They’ve handled multiple mold and water damage issues for me, and each time they’ve been fast…',
  },
  {
    author: 'Leard Ll', year: 2025, tag: 'Manhattan · Commercial', borough: 'manhattan',
    text: 'As a small business owner in Manhattan, I value companies that are responsive and transparent. When mold showed up in our storage area, Vinny from Mold & Water Restoration NYC handled it without disrupting our operations.',
  },
  {
    author: 'Deshira Kaja', year: 2025, tag: 'Brooklyn · Apartment', borough: 'brooklyn',
    text: 'I had a fantastic experience with this company. After a sudden water leak caused serious damage in my Brooklyn apartment, their team responded quickly and professionally…',
  },
  {
    author: 'SL Toscana Property', year: 2025, tag: 'Real estate agent', borough: 'staten-island',
    text: 'As a real estate agent working across Staten Island, Brooklyn, and Manhattan, I’ve partnered with Mold Remediation & Water Restoration NYC several times — and they always deliver fast, certified, and professional service.',
  },
];
