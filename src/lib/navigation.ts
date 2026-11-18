import {
  groupPages,
  groups,
  homeId,
  sectionFor,
  starlightSlug,
} from "./sidebar.mjs";

export interface NavigationPageGroup {
  readonly label: string;
  readonly zh: string;
  readonly collapsed?: boolean;
  readonly pages: readonly string[];
}

export interface NavigationGroup {
  readonly label: string;
  readonly zh: string;
  readonly collapsed?: boolean;
  readonly items: readonly (string | NavigationPageGroup)[];
}

export const GROUPS: readonly NavigationGroup[] = groups;
export const HOME_ID = homeId;

export function canonicalPage(id: string): string {
  return (
    id
      .replace(/^\/+|\/+$/g, "")
      .replace(/^zh-cn(?:\/|$)/, "")
      .replace(/\.mdx?$/, "")
      .replace(/\/?index$/, "") || "index"
  );
}

export function findSection(id: string): NavigationGroup | undefined {
  const page = canonicalPage(id);
  return GROUPS.find((group) =>
    groupPages(group).some((item: string) => canonicalPage(item) === page),
  );
}

export function sectionHref(group: NavigationGroup, locale?: string): string {
  const base = locale === "zh-cn" ? "/zh-cn" : "";
  const slug = starlightSlug(groupPages(group)[0] ?? HOME_ID);
  return slug === "index" ? `${base}/` : `${base}/${slug}/`;
}

function sidebarItems(items: NavigationGroup["items"]) {
  return items.map((item) => {
    if (typeof item === "string") return starlightSlug(item);
    return {
      label: item.label,
      translations: { "zh-CN": item.zh },
      collapsed: item.collapsed !== false,
      items: item.pages.map((page) => starlightSlug(page)),
    };
  });
}

/** Starlight resolves translated labels and page titles before rendering. */
export function siteSidebar() {
  return [
    {
      slug: starlightSlug(HOME_ID),
      label: "Home",
      translations: { "zh-CN": "首页" },
    },
    ...GROUPS.map((group) => ({
      label: group.label,
      translations: { "zh-CN": group.zh },
      collapsed: group.collapsed === true,
      items: sidebarItems(group.items),
    })),
  ];
}

export { sectionFor };
