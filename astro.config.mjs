// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { satteri } from "@astrojs/markdown-satteri";
import { shiftHeadings } from "satteri-shift-headings";
import { toc } from "satteri-toc";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [icon()],
  markdown: {
    processor: satteri({
      mdastPlugins: [shiftHeadings(1), toc()],
    }),
  },
});
