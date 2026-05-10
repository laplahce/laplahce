import { defineCollection, z } from "astro:content";

const packages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().describe("Package display name"),
    slug: z.string().describe("URL-friendly identifier"),
    description: z.string().describe("Short description shown on card"),
    cardImage: z.string().describe("Image path for project card (e.g., /ctfx.jpg)"),
    coverImage: z.string().describe("Image path for docs page header (e.g., /ctfx-cover.jpg)"),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    heroLabel: z.string().describe("Hero section label"),
    heroTitle: z.string().describe("Hero section main title"),
    heroSubtitle: z.string().optional().describe("Hero section subtitle"),
  }),
});

export const collections = {
  packages,
  pages,
};