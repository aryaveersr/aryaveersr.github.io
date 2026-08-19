import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: file("content/projects.json"),
  schema: z.object({
    name: z.string(),
    pin: z.boolean().optional(),
    description: z.string(),
    links: z.record(z.string(), z.url()),
  }),
});

const posts = defineCollection({
  loader: glob({ base: "content/posts", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date_published: z.coerce.date(),
  }),
});

export const collections = { projects, posts };
