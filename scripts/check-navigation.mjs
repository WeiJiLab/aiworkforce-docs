import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";
import { groups, homeId, orderedIds } from "../src/lib/sidebar.mjs";

const origin = "https://docs.aiworkforce.run";
const sourceRoot = fileURLToPath(
  new URL("../src/content/docs/", import.meta.url),
);
const buildRoot = fileURLToPath(new URL("../dist/", import.meta.url));
const locales = ["", "zh-cn"];
const errors = [];

function routeFor(id, locale = "") {
  const slug = id.replace(/(^|\/)index$/, "");
  return `/${[locale, slug].filter(Boolean).join("/")}/`.replace(
    /\/{2,}/g,
    "/",
  );
}

function pathname(value, route) {
  const url = new URL(value, `${origin}${route}`);
  return url.origin === origin && !url.hash && !url.search
    ? decodeURIComponent(url.pathname)
    : undefined;
}

function record(condition, route, message) {
  if (!condition) errors.push(`${route}: ${message}`);
}

function sameSet(actual, expected) {
  return (
    actual.length === expected.length &&
    actual.every((value) => expected.includes(value))
  );
}

const sources = (await readdir(sourceRoot, { recursive: true })).filter(
  (file) => /\.mdx?$/.test(file),
);
const sourceIds = new Set(
  sources
    .filter((file) => !file.startsWith("zh-cn/"))
    .map((file) => file.replace(/\.mdx?$/, "")),
);
const assigned = new Set(orderedIds);
for (const id of sourceIds) {
  record(assigned.has(id), id, "canonical guide is missing from the sidebar");
  record(
    sources.some((file) => file.replace(/\.mdx?$/, "") === `zh-cn/${id}`),
    id,
    "canonical guide has no Simplified Chinese source",
  );
}
for (const id of assigned) {
  record(sourceIds.has(id), id, "sidebar guide has no English source");
}
for (const file of sources.filter((file) => file.startsWith("zh-cn/"))) {
  record(
    sourceIds.has(file.slice(6).replace(/\.mdx?$/, "")),
    file,
    "translated guide has no canonical English source",
  );
}

const expectedPages = new Map();
for (const id of sourceIds) {
  for (const locale of locales) {
    expectedPages.set(routeFor(id, locale), { id, locale });
  }
}

const documents = new Map(
  await Promise.all(
    (await readdir(buildRoot, { recursive: true }))
      .filter((file) => file.endsWith("/index.html") || file === "index.html")
      .map(async (file) => [
        `/${file.replace(/index\.html$/, "")}`,
        parseHTML(await readFile(join(buildRoot, file), "utf8")).document,
      ]),
  ),
);

let sidebarLinks = 0;
let paginationLinks = 0;
let languageTargets = 0;
const expectedTargetsFor = (locale) =>
  orderedIds.map((id) => routeFor(id, locale));
const boundaries = [];

for (const [route, page] of expectedPages) {
  const document = documents.get(route);
  record(Boolean(document), route, "guide has no directly loadable built page");
  if (!document) continue;

  const canonical = document.querySelectorAll('link[rel="canonical"]');
  record(
    canonical.length === 1 &&
      pathname(canonical[0].getAttribute("href"), route) === route,
    route,
    "canonical URL must identify this localized guide",
  );

  const navigation = document.querySelectorAll(".portal-navigation");
  record(
    navigation.length === 1,
    route,
    "expected exactly one documentation sidebar",
  );
  const nav = navigation[0];
  if (nav) {
    record(
      nav.getAttribute("data-site") === "workforce",
      route,
      "direct load must show the shared documentation sidebar",
    );
    const links = [...nav.querySelectorAll("a[href]")];
    const targets = links.map((link) =>
      pathname(link.getAttribute("href"), route),
    );
    const expectedTargets = expectedTargetsFor(page.locale);
    record(
      new Set(targets).size === targets.length,
      route,
      "sidebar must not repeat a guide",
    );
    record(
      sameSet(targets, expectedTargets),
      route,
      `sidebar must contain every guide once; missing=${expectedTargets.filter((target) => !targets.includes(target)).join(",")} unexpected=${targets.filter((target) => !expectedTargets.includes(target)).join(",")}`,
    );
    const active = links.filter(
      (link) => link.getAttribute("aria-current") === "page",
    );
    record(
      active.length === 1 &&
        pathname(active[0].getAttribute("href"), route) === route,
      route,
      "sidebar must identify this guide as the only current page",
    );
    sidebarLinks += links.length;
    if (page.id === homeId) {
      boundaries.push({
        locale: page.locale || "en",
        first: targets[0],
        last: targets.at(-1),
        sections: groups.map((group) => group.label),
      });
    }
  }

  const support = document.querySelectorAll(".portal-support");
  record(support.length === 1, route, "expected one support link");
  record(
    pathname(support[0]?.getAttribute("href"), route) ===
      routeFor("resources/releases-support", page.locale),
    route,
    "support link must open changelog and support in this language",
  );
  record(
    document.querySelectorAll(".portal-destinations").length === 0,
    route,
    "portal switcher must not be rendered",
  );

  const languageSelects = document.querySelectorAll(
    "starlight-lang-select select",
  );
  record(languageSelects.length === 1, route, "expected one language selector");
  for (const select of languageSelects) {
    const options = [...select.querySelectorAll("option")];
    const targets = options.map((option) =>
      pathname(option.getAttribute("value"), route),
    );
    record(
      sameSet(
        targets,
        locales.map((locale) => routeFor(page.id, locale)),
      ) && new Set(targets).size === locales.length,
      route,
      "language switch must preserve this guide in both languages",
    );
    const selected = options.find((option) => option.hasAttribute("selected"));
    record(
      pathname((selected ?? options[0])?.getAttribute("value"), route) ===
        route,
      route,
      "language selector must select the current language",
    );
    for (const target of targets) {
      record(
        expectedPages.has(target) &&
          documents
            .get(target)
            ?.querySelector(".portal-navigation")
            ?.getAttribute("data-site") === "workforce",
        route,
        `language destination ${target} must stay in the shared sidebar`,
      );
      languageTargets++;
    }
  }

  for (const link of document.querySelectorAll(".pagination-links a[href]")) {
    const target = pathname(link.getAttribute("href"), route);
    const nextPage = expectedPages.get(target);
    record(
      Boolean(documents.get(target)) &&
        target !== route &&
        nextPage?.locale === page.locale,
      route,
      `pagination must stay in the same language: ${link.getAttribute("href")}`,
    );
    paginationLinks++;
  }
}

process.stdout.write(
  `${JSON.stringify(
    {
      check: "navigation",
      guides: sourceIds.size,
      pages: expectedPages.size,
      sidebarLinks,
      paginationLinks,
      languageTargets,
      boundaries,
      errors,
    },
    null,
    2,
  )}\n`,
);
if (errors.length) process.exitCode = 1;
