import type { CollectionEntry } from "astro:content";
import {
  getHomeContent,
  getPortalContent,
  localizedGuideHref,
  type LandingGuide,
  type LandingPortal,
} from "./landing-content";

export function markdownId(id: string): string {
  return id.replace(/\/?index$/, "") || "index";
}

export function pageUrl(id: string): string {
  const path = id.replace(/\/?index$/, "");
  return path ? `/${path}/` : "/";
}

function guideLink(guide: LandingGuide, zh: boolean): string {
  const href = guide.href.startsWith("/")
    ? guide.href
    : localizedGuideHref(guide.href, zh);
  return `- [${guide.title}](${href}): ${guide.description}`;
}

function homeSection(section: string, zh: boolean): string {
  const { overview, paths, pathsIntro, domains, agents } = getHomeContent(zh);
  switch (section) {
    case "overview":
      return [
        overview.description,
        `**${overview.title}**`,
        overview.nodes
          .map(
            (node, index) => `${index + 1}. **${node.title}:** ${node.detail}`,
          )
          .join("\n"),
        overview.control,
      ].join("\n\n");
    case "paths":
      return [
        pathsIntro,
        ...paths.map(
          (path) =>
            `### [${path.title}](${localizedGuideHref(path.href, zh)})\n\n${path.portal} · ${path.audience}\n\n${path.description}`,
        ),
      ].join("\n\n");
    case "domains":
      return domains.map((guide) => guideLink(guide, zh)).join("\n");
    case "agents":
      return [
        agents.description,
        agents.links.map((guide) => guideLink(guide, zh)).join("\n"),
      ].join("\n\n");
    default:
      throw new Error(`Unsupported homepage section: ${section}`);
  }
}

function portalSection(
  portal: LandingPortal,
  section: string,
  zh: boolean,
): string {
  const content = getPortalContent(portal, zh);
  switch (section) {
    case "paths":
      return content.paths
        .map(
          (path) =>
            `### [${path.title}](${localizedGuideHref(path.href, zh)})\n\n${path.label}\n\n${path.description}\n\n${path.outcome}`,
        )
        .join("\n\n");
    case "guides":
    case "next":
      return content[section].map((guide) => guideLink(guide, zh)).join("\n");
    default:
      throw new Error(`Unsupported ${portal} landing section: ${section}`);
  }
}

function landingBody(body: string, zh: boolean): string {
  return body
    .replace(
      /^import (?:HomeContent|PortalLanding) from ["'][^"']+["'];?\r?\n/gm,
      "",
    )
    .replace(
      /<(HomeContent|PortalLanding)\b([^>]*)\/>/g,
      (_, name: string, source: string) => {
        const attributes = Object.fromEntries(
          [...source.matchAll(/(\w+)="([^"]*)"/g)].map((match) => [
            match[1],
            match[2],
          ]),
        );
        if (name === "HomeContent") return homeSection(attributes.section, zh);
        const portal = attributes.portal;
        if (portal !== "developers" && portal !== "learn")
          throw new Error(`Unsupported landing portal: ${portal}`);
        return portalSection(portal, attributes.section, zh);
      },
    )
    .trim();
}

export function toMarkdown(entry: CollectionEntry<"docs">): string {
  const { title, description } = entry.data;
  const zh = entry.id.startsWith("zh-cn/") || entry.id === "zh-cn";
  const canonicalId = markdownId(entry.id.replace(/^zh-cn(?:\/|$)/, ""));
  const isHome = ["index", "developer", "learn"].includes(canonicalId);
  const body = isHome ? landingBody(entry.body ?? "", zh) : (entry.body ?? "");
  const sourceLabel = isHome && zh ? "来源" : "Source";
  return `# ${title}\n\n${description}\n\n${sourceLabel}: https://docs.aiworkforce.run${pageUrl(entry.id)}\n\n${body}\n`;
}
