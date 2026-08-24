import path from "path";
import { type MdastPluginDefinition, type PluginFactoryContext } from "satteri";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function ifPost(...plugins: MdastPluginDefinition[]) {
  return (ctx: PluginFactoryContext): MdastPluginDefinition[] => {
    const rel = path.relative(POSTS_DIR, ctx.fileURL!.pathname);
    if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) return [];

    return plugins;
  };
}
