import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const notes = defineCollection({
  loader: glob({ pattern: "*.md", base: "./notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedOn: z.date(),
  }),
});

export const collections = { notes };
