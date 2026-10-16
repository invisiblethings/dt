import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Robin Hall'),
    category: z.string(),
    categoryName: z.string(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    wpId: z.number().optional(),
    // Posts imported from the old WordPress site (they have a wpId) are
    // noindexed by default. Set noindex: false in a post to index it.
    noindex: z.boolean().optional(),
  }),
});

export const collections = { blog };
