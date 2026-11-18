import {
  Portal,
  PORTALS,
  groupPages,
  landingFileId,
  sectionFor,
  starlightSlug,
} from "./sidebar.mjs";
import { consoleUrl, withBase } from "./site.mjs";

export type PortalId = (typeof Portal)[keyof typeof Portal];

export { Portal, PORTALS, sectionFor, starlightSlug };

export interface NavigationPageGroup {
  readonly label: string;
  readonly zh: string;
  readonly collapsed?: boolean;
  readonly items: readonly (string | NavigationPageGroup)[];
}

export interface NavigationGroup {
  readonly label: string;
  readonly zh: string;
  readonly collapsed?: boolean;
  readonly items: readonly (string | NavigationPageGroup)[];
}

export function canonicalPage(id: string): string {
  return (
    id
      .replace(/^\/+|\/+$/g, "")
      .replace(/^zh-cn(?:\/|$)/, "")
      .replace(/\.mdx?$/, "")
      .replace(/\/?index$/, "") || "index"
  );
}

const pagePortals = new Map<string, PortalId>();
for (const portal of Object.values(Portal) as PortalId[]) {
  const definition = PORTALS[portal];
  const pages = [
    landingFileId(definition.landing),
    ...definition.groups.flatMap(groupPages),
  ];
  for (const page of pages) {
    pagePortals.set(canonicalPage(page), portal);
  }
}

export function getPortal(id: string): PortalId {
  const page = canonicalPage(id);
  const portal = pagePortals.get(page);
  if (!portal) throw new Error(`Documentation page has no portal: ${id}`);
  return portal;
}

export function findSection(id: string): NavigationGroup | undefined {
  const match = sectionFor(id);
  if (!match) return undefined;
  if (match.group) return match.group as NavigationGroup;
  return {
    label: match.definition.label,
    zh: match.definition.zhLabel,
    items: [],
  };
}

export function sectionHref(group: NavigationGroup, locale?: string): string {
  const prefix = locale === "zh-cn" ? "/zh-cn" : "";
  const first = groupPages(group)[0];
  if (!first) {
    return withBase(prefix ? `${prefix}/` : "/");
  }
  const slug = starlightSlug(first);
  const path = slug === "index" ? `${prefix}/` : `${prefix}/${slug}/`;
  return withBase(path);
}

export function portalHref(portal: PortalId, locale?: string): string {
  const landing = PORTALS[portal].landing;
  const prefix = locale === "zh-cn" ? "/zh-cn" : "";
  const path = landing === "index" ? `${prefix}/` : `${prefix}/${landing}/`;
  return withBase(path);
}

export function portalDestinations(locale?: string) {
  const zh = locale === "zh-cn";
  return (Object.values(Portal) as PortalId[]).map((id) => ({
    id,
    label: zh ? PORTALS[id].zhLabel : PORTALS[id].label,
    description: PORTALS[id].description[zh ? 1 : 0],
    href: portalHref(id, locale),
  }));
}

export function externalNav(locale?: string) {
  const zh = locale === "zh-cn";
  return [
    {
      id: "console" as const,
      label: zh ? "控制台" : "Console",
      href: consoleUrl,
    },
  ];
}

function sidebarItems(
  items: NavigationGroup["items"],
): Array<string | Record<string, unknown>> {
  return items.map((item) => {
    if (typeof item === "string") return starlightSlug(item);
    return {
      label: item.label,
      translations: { "zh-CN": item.zh },
      collapsed: item.collapsed !== false,
      items: sidebarItems(item.items),
    };
  });
}

/** Starlight resolves labels, then route middleware keeps one portal visible. */
export function portalSidebars() {
  return (Object.values(Portal) as PortalId[]).map((id) => {
    const definition = PORTALS[id];
    return {
      label: id,
      items: [
        {
          slug: starlightSlug(landingFileId(definition.landing)),
          label: definition.landingLabel,
          translations: {
            "zh-CN": definition.landingZh,
          },
        },
        ...definition.groups.map((group) => ({
          label: group.label,
          translations: { "zh-CN": group.zh },
          collapsed: group.collapsed === true,
          items: sidebarItems(group.items),
        })),
      ],
    };
  });
}

/** @deprecated Use portalSidebars — kept for callers expecting a flat export name. */
export function siteSidebar() {
  return portalSidebars();
}
