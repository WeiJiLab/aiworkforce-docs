import { groups, homeId, sectionFor, starlightSlug } from "./sidebar.mjs";

export interface NavigationGroup {
  readonly label: string;
  readonly zh: string;
  readonly pages: readonly string[];
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
    group.pages.some((item) => canonicalPage(item) === page),
  );
}

export function sectionHref(group: NavigationGroup, locale?: string): string {
  const base = locale === "zh-cn" ? "/zh-cn" : "";
  const slug = starlightSlug(group.pages[0] ?? HOME_ID);
  return slug === "index" ? `${base}/` : `${base}/${slug}/`;
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
      collapsed: false,
      items: group.pages.map((page) => starlightSlug(page)),
    })),
  ];
}

export { sectionFor };
