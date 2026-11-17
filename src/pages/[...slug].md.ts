import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { markdownId, toMarkdown } from "../lib/agent-docs";

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("docs", ({ data }) => !data.draft);
  return entries.map((entry) => ({
    params: { slug: markdownId(entry.id) },
    props: { content: toMarkdown(entry) },
  }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(props.content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
