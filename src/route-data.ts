import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from "@astrojs/starlight/route-data";

type SidebarEntry = StarlightRouteData["sidebar"][number];
type SidebarLink = Extract<SidebarEntry, { type: "link" }>;

function links(entries: readonly SidebarEntry[]): SidebarLink[] {
  return entries.flatMap((entry) =>
    entry.type === "link" ? [entry] : links(entry.entries),
  );
}

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const pages = links(route.sidebar);
  const current = pages.findIndex((page) => page.isCurrent);
  if (current < 0) {
    throw new Error(`Current page is missing from navigation: ${route.id}`);
  }

  route.pagination = {
    prev: route.entry.data.prev === false ? undefined : pages[current - 1],
    next: route.entry.data.next === false ? undefined : pages[current + 1],
  };
});
