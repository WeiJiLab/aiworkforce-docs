import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { toMarkdown } from "../lib/agent-docs";

export const GET: APIRoute = async () => {
  const entries = (await getCollection("docs", ({ data }) => !data.draft)).sort(
    (a, b) => a.id.localeCompare(b.id),
  );
  return new Response(entries.map(toMarkdown).join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
