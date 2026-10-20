import type { ImageMetadata } from 'astro';
import raw from './projects.json';

// Before/after pairs selected from B&B's CompanyCam records. Each pair was checked so both photos
// show the roof from the same viewpoint. Location data was stripped from the image files.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*.webp', { eager: true });
const img = (name: string) => {
  const hit = files[`../assets/projects/${name}`];
  if (!hit) throw new Error(`Missing project image ${name}`);
  return hit.default;
};

export type Project = (typeof raw)[number] & {
  before: ImageMetadata;
  after: ImageMetadata;
  title: string;
  monthYear: string;
  href: string;
};

const fmt = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export const projects: Project[] = raw
  .map((p) => ({
    ...p,
    before: img(p.before),
    after: img(p.after),
    title: `${p.service} in ${p.area.replace(/, (Staten Island|NY)$/, '')}`,
    monthYear: fmt.format(new Date(`${p.date}-01T00:00:00Z`)),
    href: `/projects/${p.slug}/`,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const regions = ['North Shore', 'Mid-Island', 'South Shore', 'Brooklyn', 'New Jersey'] as const;

export const byKind = (kind: string) => projects.filter((p) => p.kind === kind);
export const findProject = (slugPart: string) => projects.find((p) => p.slug.includes(slugPart))!;
