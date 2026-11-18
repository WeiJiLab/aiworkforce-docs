import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";
import {
  Portal,
  PORTALS,
  landingFileId,
  orderedIds,
  orderedIdsForPortal,
  starlightSlug,
} from "../src/lib/sidebar.mjs";
import { base, origin } from "../src/lib/site.mjs";

const originHost = origin;
const sourceRoot = fileURLToPath(
  new URL("../src/content/docs/", import.meta.url),
);
const buildRoot = fileURLToPath(new URL("../dist/", import.meta.url));
const locales = ["", "zh-cn"];
const errors = [];

const assignments = new Map();
for (const portal of Object.values(Portal)) {
  for (const id of orderedIdsForPortal(portal)) {
    const key = starlightSlug(id);
    if (assignments.has(key)) {
      errors.push(`${id}: guide assigned to more than one portal`);
    }
    assignments.set(key, portal);
  }
}

function routeFor(id, locale = "") {
  const slug = starlightSlug(id);
  const path =
    `/${[locale, slug === "index" ? "" : slug].filter(Boolean).join("/")}/`.replace(
      /\/{2,}/g,
      "/",
    );
  return `${base}${path}`.replace(/\/{2,}/g, "/");
}

function pathname(value, route) {
  const url = new URL(value, `${originHost}${route}`);
  return url.origin === originHost && !url.hash && !url.search
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
for (const id of sourceIds) {
  record(
    assignments.has(starlightSlug(id)),
    id,
    "canonical guide has no portal assignment",
  );
  record(
    sources.some((file) => file.replace(/\.mdx?$/, "") === `zh-cn/${id}`),
    id,
    "canonical guide has no Simplified Chinese source",
  );
}
for (const id of orderedIds) {
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
    expectedPages.set(routeFor(id, locale), {
      id,
      locale,
      portal: assignments.get(starlightSlug(id)),
    });
  }
}

const documents = new Map(
  await Promise.all(
    (await readdir(buildRoot, { recursive: true }))
      .filter((file) => file.endsWith("/index.html") || file === "index.html")
      .map(async (file) => {
        const rel = `/${file.replace(/index\.html$/, "")}`.replace(
          /\/{2,}/g,
          "/",
        );
        return [
          `${base}${rel}`.replace(/\/{2,}/g, "/"),
          parseHTML(await readFile(join(buildRoot, file), "utf8")).document,
        ];
      }),
  ),
);

let sidebarLinks = 0;
let paginationLinks = 0;
let languageTargets = 0;
const boundaries = [];

for (const [route, page] of expectedPages) {
  const document = documents.get(route);
  record(Boolean(document), route, "guide has no directly loadable built page");
  if (!document || !page.portal) continue;

  const canonical = document.querySelectorAll('link[rel="canonical"]');
  record(
    canonical.length === 1 &&
      pathname(canonical[0].getAttribute("href"), route) === route,
    route,
    "canonical URL must identify this localized guide",
  );

  const navigation = document.querySelectorAll(".portal-navigation");
  record(navigation.length === 1, route, "expected exactly one portal sidebar");
  const nav = navigation[0];
  if (nav) {
    record(
      nav.getAttribute("data-portal") === page.portal,
      route,
      `sidebar portal must be ${page.portal}`,
    );
    const links = [...nav.querySelectorAll("a[href]")];
    const targets = links.map((link) =>
      pathname(link.getAttribute("href"), route),
    );
    const expectedTargets = orderedIdsForPortal(page.portal).map((id) =>
      routeFor(id, page.locale),
    );
    record(
      new Set(targets).size === targets.length,
      route,
      "sidebar must not repeat a guide",
    );
    record(
      sameSet(targets, expectedTargets),
      route,
      `sidebar must contain every portal guide once; missing=${expectedTargets.filter((target) => !targets.includes(target)).join(",")} unexpected=${targets.filter((target) => !expectedTargets.includes(target)).join(",")}`,
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
    if (
      starlightSlug(page.id) ===
      starlightSlug(landingFileId(PORTALS[page.portal].landing))
    ) {
      boundaries.push({
        locale: page.locale || "en",
        portal: page.portal,
        first: targets[0],
        last: targets.at(-1),
        sections: PORTALS[page.portal].groups.map((group) => group.label),
      });
    }
  }

  const siteNav = document.querySelectorAll(".docs-header");
  record(siteNav.length === 1, route, "expected one site top navigation");
  if (siteNav[0]) {
    const labels = [...siteNav[0].querySelectorAll("a")].map((link) =>
      link.textContent.replace(/\s+/g, " ").trim(),
    );
    const zh = page.locale === "zh-cn";
    record(
      labels.some((label) => label === (zh ? "文档" : "Docs")),
      route,
      "site nav must include Docs",
    );
    record(
      labels.some((label) => label === (zh ? "学习" : "Learn")),
      route,
      "site nav must include Learn",
    );
    record(
      labels.some((label) => label === "FDE"),
      route,
      "site nav must include FDE",
    );
    record(
      labels.some((label) => label.startsWith("API")),
      route,
      "site nav must include API",
    );
    record(
      !labels.some((label) => label.startsWith("GitHub")),
      route,
      "site nav must not link to the source repository",
    );
    record(
      labels.some((label) => label.startsWith(zh ? "控制台" : "Console")),
      route,
      "site nav must include Console",
    );
    record(
      !labels.some((label) => /Agent Protocol|agent-protocol/i.test(label)),
      route,
      "Agent Protocol must not appear in site nav",
    );
  }

  const support = document.querySelectorAll(".portal-support");
  record(
    support.length === 0,
    route,
    "sidebar must not include a support link",
  );
  const footerLabels = [
    ...document.querySelectorAll(".portal-sidebar-footer a"),
  ].map((link) => link.textContent.replace(/\s+/g, " ").trim());
  record(
    !footerLabels.some(
      (label) => label === "联系支持" || label === "Contact support",
    ),
    route,
    "sidebar footer must not include a contact support link",
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
            ?.getAttribute("data-portal") === page.portal,
        route,
        `language destination ${target} must stay in the same portal`,
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
        nextPage?.locale === page.locale &&
        nextPage?.portal === page.portal,
      route,
      `pagination must stay in the same language and portal: ${link.getAttribute("href")}`,
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
