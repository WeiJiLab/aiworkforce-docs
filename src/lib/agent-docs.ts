import type { CollectionEntry } from "astro:content";
import { managedAgentScenarios } from "./managed-agents";
import { absoluteUrl } from "./site.mjs";
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
    case "getting-started":
      return content.gettingStarted
        .flatMap((guide) => [
          guideLink(guide, zh),
          ...(guide.guides ?? []).map(
            ({ title, href }) =>
              `  - [${title}](${localizedGuideHref(href, zh)})`,
          ),
        ])
        .join("\n");
    case "build-software":
      return linked(content.buildSoftware);
    case "automate-work":
      return linked(content.automateWork);
    case "use-employees":
      return linked(content.useEmployees);
    case "build":
      return linked(content.build);
    case "run-workflows":
      return linked(content.runWorkflows);
    case "daemon":
      return linked(content.daemon);
    case "integrations":
      return linked(content.integrations);
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
    case "operate":
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
        if (portal !== "developer" && portal !== "learn" && portal !== "build")
          throw new Error(`Unsupported landing portal: ${portal}`);
        return portalSection(portal, attributes.section, zh);
      },
    )
    .trim();
}

export function toMarkdown(entry: CollectionEntry<"docs">): string {
  const { title, description, status } = entry.data;
  const zh = entry.id.startsWith("zh-cn/") || entry.id === "zh-cn";
  const canonicalId = markdownId(entry.id.replace(/^zh-cn(?:\/|$)/, ""));
  const isHome = ["index", "developer", "learn", "build"].includes(canonicalId);
  let body = entry.body ?? "";
  if (isHome) body = landingBody(body, zh);
  if (canonicalId === "deployment/managed-agents") {
    body = body.replace(/^import ManagedAgentExplorer .*\n/m, "").replace(
      "<ManagedAgentExplorer />",
      managedAgentScenarios(zh)
        .map(
          (scenario) =>
            `### ${scenario.label}\n\n${scenario.locations.join(" → ")}\n\n${scenario.result} [${scenario.link}](${localizedGuideHref(scenario.guide, zh)})`,
        )
        .join("\n\n"),
    );
  }
  const sourceLabel = zh ? "来源" : "Source";
  const supportLabel =
    status && status !== "available"
      ? `${zh ? "支持状态" : "Support"}: ${status}\n\n`
      : "";
  return `# ${title}\n\n${description}\n\n${supportLabel}${sourceLabel}: ${absoluteUrl(pageUrl(entry.id))}\n\n${body}\n`;
}
