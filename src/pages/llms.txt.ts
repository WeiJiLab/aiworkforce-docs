import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { markdownId } from "../lib/agent-docs";
import { groupPages, groups, homeId, orderedIds } from "../lib/sidebar.mjs";

function canonical(id: string): string {
  return id.replace(/^zh-cn(?:\/|$)/, "").replace(/\/?index$/, "") || "index";
}

export const GET: APIRoute = async () => {
  const entries = await getCollection("docs", ({ data }) => !data.draft);
  const listed = new Set(orderedIds.map((id) => canonical(id)));

  function findEntry(page: string, locale: string) {
    const want = canonical(page);
    return entries.find((entry) => {
      const isZh = entry.id === "zh-cn" || entry.id.startsWith("zh-cn/");
      return canonical(entry.id) === want && isZh === (locale === "zh-cn");
    });
  }
  const sections = [
    { label: "Home", pages: [homeId] },
    ...groups.map((group) => ({
      label: group.label,
      pages: groupPages(group),
    })),
  ];

  const lines = [
    "# AI Workforce Docs",
    "> Product documentation for AI Workforce. English is the default; Simplified Chinese is available under /zh-cn/.",
    "Pages follow one information architecture in both languages. Support is available unless a line says limited or planned. Do not infer APIs or permissions from an employee instruction example.",
    "Full documentation: https://docs.aiworkforce.run/llms-full.txt",
  ];

  for (const locale of ["", "zh-cn"]) {
    lines.push(locale === "zh-cn" ? "## 简体中文" : "## English");
    for (const section of sections) {
      lines.push(`### ${section.label}`);
      for (const page of section.pages) {
        const entry = findEntry(page, locale);
        if (!entry) continue;
        const support =
          entry.data.status && entry.data.status !== "available"
            ? ` (${entry.data.status})`
            : "";
        lines.push(
          `- [${entry.data.title}](https://docs.aiworkforce.run/${markdownId(entry.id)}.md)${support}: ${entry.data.description}`,
        );
      }
    }
  }

  const extras = entries.filter((entry) => !listed.has(canonical(entry.id)));
  if (extras.length) {
    lines.push("## Unlisted");
    for (const entry of extras) {
      lines.push(
        `- [${entry.data.title}](https://docs.aiworkforce.run/${markdownId(entry.id)}.md): ${entry.data.description}`,
      );
    }
  }

  return new Response(lines.join("\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
