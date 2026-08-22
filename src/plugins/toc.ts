import { defineMdastPlugin, type MdastContent, type MdastNode } from "satteri";
import GithubSlugger from "github-slugger";

interface Heading {
  id: string;
  text: string;
  depth: number;
  children: [];
}

export const toc = () => {
  return () => {
    const headings: Heading[] = [];
    return [visitHeadings(headings), placeToc(headings)];
  };
};

const visitHeadings = (headings: Heading[]) => {
  const slugger = new GithubSlugger();

  return defineMdastPlugin({
    name: "satteri-toc-visit-headings",
    heading: (node, ctx) => {
      let parent = headings;
      while (parent.length > 0 && parent.at(-1)!.depth < node.depth) {
        parent = parent.at(-1)!.children;
      }

      parent.push({
        id: slugger.slug(ctx.textContent(node)),
        text: ctx.textContent(node),
        depth: node.depth,
        children: [],
      });
    },
  });
};

const placeToc = (headings: Heading[]) => {
  let doneToc = false;

  return defineMdastPlugin({
    name: "satteri-toc-place-toc",
    heading: (node, ctx) => {
      if (
        doneToc ||
        ctx.textContent(node).toLowerCase() != "table of contents"
      ) {
        return;
      }

      doneToc = true;

      ctx.insertAfter(node, {
        type: "list",
        ordered: false,
        spread: false,
        children: headings.map(mapHeading),
      });
    },

    after(root, ctx) {
      if (doneToc) return;

      ctx.insertChildAt(root, 0, [
        {
          type: "heading",
          depth: 2,
          children: [
            {
              type: "text",
              value: "Table of Contents",
            },
          ],
        },
        {
          type: "list",
          ordered: false,
          spread: false,
          children: headings.map(mapHeading),
        },
      ]);
    },
  });
};

function mapHeading(heading: Heading): MdastNode & { type: "listItem" } {
  return {
    type: "listItem",
    spread: false,
    children: [
      {
        type: "paragraph",
        children: [
          {
            type: "link",
            url: `#${heading.id}`,
            children: [
              {
                type: "text",
                value: heading.text,
              },
            ],
          },
        ],
      },
      heading.children && {
        type: "list",
        ordered: false,
        spread: false,
        children: heading.children.map(mapHeading),
      },
    ],
  };
}
