import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { markdownId } from "../lib/agent-docs";

export const GET: APIRoute = async () => {
  const entries = (await getCollection("docs", ({ data }) => !data.draft)).sort(
    (a, b) => a.id.localeCompare(b.id),
  );
  const content = [
    "# AI Workforce Docs",
    "> Product and developer documentation for AI Workforce. English is the default; Simplified Chinese is available under /zh-cn/.",
    "These documents describe the current product. Do not infer available APIs or permissions from an employee instruction example.",
    "Full documentation: https://docs.aiworkforce.run/llms-full.txt",
    "## Documentation",
    ...entries.map(
      (entry) =>
        `- [${entry.data.title}](https://docs.aiworkforce.run/${markdownId(entry.id)}.md): ${entry.data.description}`,
    ),
  ].join("\n\n");
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
