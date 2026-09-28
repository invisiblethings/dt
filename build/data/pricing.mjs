// Typical NYC price ranges shown on /cost/ (never on the homepage).
// OWNER: adjust these numbers to match your real pricing — every price on the site comes from this file.
export const priceTable = [
  { job: 'Small spot: window sill, closet corner, behind a dresser (under 10 sq ft)', low: 500, high: 1500 },
  { job: 'Bathroom ceiling or wall, with containment', low: 1500, high: 4000 },
  { job: 'Behind walls after a leak (one room)', low: 2000, high: 6000 },
  { job: 'Basement or cellar (partial)', low: 2500, high: 8000 },
  { job: 'Attic or top-floor ceiling after a roof leak', low: 3000, high: 8000 },
  { job: 'Whole apartment or multiple rooms', low: 8000, high: 25000, plus: true },
];

// Estimator model: remediation range by size, multiplied by location/condition factors; rebuild priced separately.
export const estimator = {
  sizes: [
    { id: 's', label: 'Under 10 sq ft', hint: 'about a doormat', low: 500, high: 1500, rebuild: [300, 800] },
    { id: 'm', label: '10–30 sq ft', hint: 'a door or two', low: 1500, high: 4000, rebuild: [800, 2500] },
    { id: 'l', label: '30–100 sq ft', hint: 'a whole wall or ceiling', low: 3500, high: 9000, rebuild: [2000, 6000] },
    { id: 'x', label: '100+ sq ft', hint: 'multiple rooms', low: 8000, high: 25000, rebuild: [5000, 15000] },
  ],
  locations: [
    { id: 'bath', label: 'Bathroom', f: 1.0 },
    { id: 'room', label: 'Bedroom / living area', f: 1.0 },
    { id: 'kitchen', label: 'Kitchen', f: 1.1 },
    { id: 'base', label: 'Basement / cellar', f: 1.15 },
    { id: 'attic', label: 'Attic / top-floor ceiling', f: 1.2 },
    { id: 'comm', label: 'Commercial space', f: 1.15 },
  ],
  conditions: [
    { id: 'surface', label: 'On the surface (I can see all of it)', f: 1.0 },
    { id: 'hidden', label: 'Likely behind walls / under floors', f: 1.25 },
    { id: 'flood', label: 'After a flood or sewage backup', f: 1.35 },
  ],
};

export const money = (n) => '$' + (Math.round(n / 50) * 50).toLocaleString('en-US');
