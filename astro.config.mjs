// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { satteri } from "@astrojs/markdown-satteri";
import { shiftHeadings } from "satteri-shift-headings";
import { toc } from "satteri-toc";
import { ifPost } from "@plugins/if-post";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://aryaveersr.github.io",
  vite: { plugins: [tailwindcss()] },
  integrations: [icon(), sitemap()],
  markdown: {
    processor: satteri({
      mdastPlugins: [
        ifPost(
          shiftHeadings(1),
          toc({
            fallback: {
              text: "Table of Contents",
              level: 2,
            },
          }),
        ),
      ],
    }),
  },
});
