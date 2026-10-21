// Every service from the rebuild plan. `built: true` pages exist in this phase; the rest are listed
// (so visitors see the full offer) and get their own pages in the next phase.
export type Service = {
  slug: string;
  name: string;
  short: string;
  href?: string;
  built: boolean;
  group: 'Roofing' | 'Gutters' | 'Siding & more';
};

export const services: Service[] = [
  { slug: 'roof-replacement', name: 'Roof replacement', short: 'Full tear-off and new GAF or Owens Corning roof system, usually in 1–2 days.', href: '/roofing/roof-replacement/', built: true, group: 'Roofing' },
  { slug: 'flat-roofing', name: 'Flat roofing', short: 'TPO, EPDM, modified bitumen and PVC for rowhouses, extensions and commercial roofs.', href: '/roofing/flat-roofing/', built: true, group: 'Roofing' },
  { slug: 'roof-repair', name: 'Roof repair', short: 'Leaks, missing shingles, flashing and storm damage fixed right the first time.', href: '/roofing/roof-repair/', built: true, group: 'Roofing' },
  { slug: 'emergency-roof-repair', name: '24/7 emergency repair', short: 'Active leak or storm damage? Call any time, day or night.', href: '/roofing/emergency-roof-repair/', built: true, group: 'Roofing' },
  { slug: 'commercial-roofing', name: 'Commercial roofing', short: 'Low-disruption roofing for condos, apartment buildings, retail and offices.', href: '/roofing/commercial-roofing/', built: true, group: 'Roofing' },
  { slug: 'skylights', name: 'Skylights', short: 'New skylights and leak-free reflashing of old ones.', built: false, group: 'Roofing' },
  { slug: 'gutters', name: 'Seamless gutters', short: 'Seamless gutters, downspouts and guards sized for Staten Island storms.', href: '/gutters/', built: true, group: 'Gutters' },
  { slug: 'siding', name: 'Siding', short: 'Vinyl, fiber cement and engineered wood siding, installed and repaired.', href: '/siding/', built: true, group: 'Siding & more' },
  { slug: 'soffit-fascia', name: 'Soffit & fascia', short: 'Rotted soffit and fascia replaced and wrapped before it becomes a roof problem.', href: '/siding/#soffit-fascia', built: true, group: 'Siding & more' },
];
