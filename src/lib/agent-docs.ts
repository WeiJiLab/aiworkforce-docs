import type { CollectionEntry } from "astro:content";
import { absoluteUrl } from "./site.mjs";
import {
  processDiagramMarkdown,
  type ProcessDiagramId,
} from "./process-diagrams";
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
  const content = getHomeContent(zh);
  const linked = (guides: readonly LandingGuide[]) =>
    guides.map((guide) => guideLink(guide, zh)).join("\n");
  switch (section) {
    case "cta":
      return linked([content.primaryCta, content.secondaryCta]);
    case "paths":
      return linked(content.paths);
    case "agents":
      return [
        content.agents.description,
        content.agents.links.map((guide) => guideLink(guide, zh)).join("\n"),
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

function readableBody(body: string, zh: boolean): string {
  return body
    .replace(
      /^import (?:HomeContent|PortalLanding|ProcessDiagram) from ["'][^"']+["'];?\r?\n/gm,
      "",
    )
    .replace(
      /<(HomeContent|PortalLanding|ProcessDiagram)\b([^>]*)\/>/g,
      (_, name: string, source: string) => {
        const attributes = Object.fromEntries(
          [...source.matchAll(/(\w+)="([^"]*)"/g)].map((match) => [
            match[1],
            match[2],
          ]),
        );
        if (name === "ProcessDiagram")
          return processDiagramMarkdown(attributes.id as ProcessDiagramId, zh);
        if (name === "HomeContent") return homeSection(attributes.section, zh);
        const portal = attributes.portal;
        if (portal !== "api" && portal !== "learn")
          throw new Error(`Unsupported landing portal: ${portal}`);
        return portalSection(portal, attributes.section, zh);
      },
    )
    .trim();
}

export function toMarkdown(entry: CollectionEntry<"docs">): string {
  const { title, description, status } = entry.data;
  const zh = entry.id.startsWith("zh-cn/") || entry.id === "zh-cn";
  const body = readableBody(entry.body ?? "", zh);
  const sourceLabel = zh ? "来源" : "Source";
  const supportLabel =
    status && status !== "available"
      ? `${zh ? "支持状态" : "Support"}: ${status}\n\n`
      : "";
  return `# ${title}\n\n${description}\n\n${supportLabel}${sourceLabel}: ${absoluteUrl(pageUrl(entry.id))}\n\n${body}\n`;
}
