import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string().optional(),
    conference: z.string().optional(),
    conferenceFull: z.string().optional(),
    authors: z.array(z.string()).default([]),
    image: z.string().optional(),
    links: z.array(z.object({
      label: z.enum(['PDF', 'Code', 'Slides']),
      href: z.string().url(),
    })).default([]),
    status: z.enum(['published', 'preprint', 'coming-soon']).default('coming-soon'),
    summary: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    role: z.string().optional(),
    status: z.enum(['active', 'completed', 'coming-soon']).default('coming-soon'),
    summary: z.string().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const profile = defineCollection({
  loader: glob({ base: './src/content/profile', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    nameChinese: z.string(),
    preferredName: z.string(),
    email: z.string().email(),
    location: z.string(),
    github: z.string().url(),
    scholar: z.string().url(),
    orcid: z.string().url(),
  }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    date: z.coerce.date(),
  }),
});

export const collections = { publications, projects, notes, profile, news };
