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
  { slug: 'roof-repair', name: 'Roof repair', short: 'Leaks, missing shingles, flashing and storm damage fixed right the first time.', built: false, group: 'Roofing' },
  { slug: 'emergency-roof-repair', name: '24/7 emergency repair', short: 'Active leak? Call any time and we get water out of your house.', built: false, group: 'Roofing' },
  { slug: 'commercial-roofing', name: 'Commercial roofing', short: 'Low-disruption roofing for offices, retail, warehouses and multifamily.', built: false, group: 'Roofing' },
  { slug: 'skylights', name: 'Skylights', short: 'New skylights and leak-free reflashing of old ones.', built: false, group: 'Roofing' },
  { slug: 'gutters', name: 'Seamless gutters', short: 'Seamless gutters, downspouts and guards sized for Staten Island storms.', built: false, group: 'Gutters' },
  { slug: 'siding', name: 'Siding', short: 'Vinyl siding installation and repair that protects and refreshes your home.', built: false, group: 'Siding & more' },
  { slug: 'soffit-fascia', name: 'Soffit & fascia', short: 'Rotted soffit and fascia replaced before it becomes a roof problem.', built: false, group: 'Siding & more' },
];
