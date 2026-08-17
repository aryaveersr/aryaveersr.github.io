import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
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

export const collections = { projects };
