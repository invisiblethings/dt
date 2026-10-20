// Jobs per Staten Island ZIP, counted from B&B's CompanyCam project records (Oct 2022 to Oct 2026).
// Counts only: no customer names or addresses are stored in this repo.
export const zipCounts = [
  {
    "zip": "10301",
    "name": "St. George",
    "region": "North Shore",
    "jobs": 25
  },
  {
    "zip": "10302",
    "name": "Port Richmond",
    "region": "North Shore",
    "jobs": 10
  },
  {
    "zip": "10303",
    "name": "Mariners Harbor",
    "region": "North Shore",
    "jobs": 24
  },
  {
    "zip": "10304",
    "name": "Stapleton",
    "region": "North Shore",
    "jobs": 33
  },
  {
    "zip": "10310",
    "name": "West Brighton",
    "region": "North Shore",
    "jobs": 15
  },
  {
    "zip": "10305",
    "name": "Rosebank & South Beach",
    "region": "Mid-Island",
    "jobs": 27
  },
  {
    "zip": "10306",
    "name": "New Dorp",
    "region": "Mid-Island",
    "jobs": 34
  },
  {
    "zip": "10314",
    "name": "Willowbrook",
    "region": "Mid-Island",
    "jobs": 70
  },
  {
    "zip": "10307",
    "name": "Tottenville",
    "region": "South Shore",
    "jobs": 4
  },
  {
    "zip": "10308",
    "name": "Great Kills",
    "region": "South Shore",
    "jobs": 23
  },
  {
    "zip": "10309",
    "name": "Charleston & Prince's Bay",
    "region": "South Shore",
    "jobs": 15
  },
  {
    "zip": "10312",
    "name": "Eltingville & Annadale",
    "region": "South Shore",
    "jobs": 45
  }
] as const;

export const regionCounts = {
  "North Shore": 107,
  "Mid-Island": 131,
  "South Shore": 87,
  "Brooklyn": 21,
  "New Jersey": 71
} as const;

export const documentedSince = "2022";
