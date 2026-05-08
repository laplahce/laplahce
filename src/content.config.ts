import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const packages = defineCollection({
  // Ensure this path matches your folder structure in the repo
  loader: glob({ pattern: "**/*.md", base: "./src/content/packages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
  }),
});

export const collections = { packages };