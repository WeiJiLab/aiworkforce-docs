import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { markdownId, toMarkdown } from "../lib/agent-docs";
import { legacyBuildRoutes } from "../lib/legacy-build-routes.mjs";

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("docs", ({ data }) => !data.draft);
  const legacySlugs = new Map(
    legacyBuildRoutes.map(({ from, to }) => [to, from]),
  );
  return entries.flatMap((entry) => {
    const slug = markdownId(entry.id);
    const legacy = legacySlugs.get(slug);
    const props = { content: toMarkdown(entry) };
    return (legacy ? [slug, legacy] : [slug]).map((slug) => ({
      params: { slug },
      props,
    }));
  });
};

export const GET: APIRoute = ({ props }) =>
  new Response(props.content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
