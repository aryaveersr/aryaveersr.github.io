import { defineMdastPlugin } from "satteri";

export const shiftHeadings = defineMdastPlugin({
  name: "shift-headings",
  heading(node, ctx): void {
    const depth = node.depth == 6 ? 6 : ((node.depth + 1) as 2 | 3 | 4 | 5 | 6);
    ctx.setProperty(node, "depth", depth);
  },
});
