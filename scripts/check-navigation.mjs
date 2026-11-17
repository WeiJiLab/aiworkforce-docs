import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";

const origin = "https://docs.aiworkforce.run";
const sourceRoot = fileURLToPath(
  new URL("../src/content/docs/", import.meta.url),
);
const buildRoot = fileURLToPath(new URL("../dist/", import.meta.url));
const locales = ["", "zh-cn"];

// This is the published navigation contract, checked against rendered HTML.
// New guides need an intentional destination rather than an implicit fallback.
const portalGuides = {
  docs: [
    "index",
    "getting-started/introduction",
    "getting-started/platform-overview",
    "getting-started/core-concepts",
    "getting-started/quickstart",
    "user-guide/workspace",
    "user-guide/ai-employees",
    "user-guide/agent-chat",
    "user-guide/sessions-planning",
    "user-guide/knowledge-context",
    "user-guide/inbox-tasks",
    "user-guide/artifacts-evidence",
    "automate/fundamentals",
    "automate/triggers-schedules",
    "automate/runs-recovery",
    "software-factory/overview",
    "software-factory/review-release",
    "integrations/overview",
    "integrations/employee-tools",
    "integrations/code-repositories",
    "administration/teams-access",
    "administration/configuration",
    "administration/analytics",
    "models/overview",
    "resources/troubleshooting",
    "resources/releases-support",
    "concepts/glossary",
  ],
  developers: [
    "developer/index",
    "developer/architecture",
    "developer/authentication",
    "developer/api-reference",
    "developer/cli-sdk",
    "developer/contributing",
    "deployment/runtime-environments",
    "deployment/security",
    "build/employee-definition",
    "build/skills-plugins",
    "build/hooks-subagents",
    "build/mcp-integration",
  ],
  learn: [
    "learn/index",
    "learn/requirements-writing",
    "learn/blueprints-work-orders",
    "learn/feedback-review",
    "build/prompts-rules",
    "recipes/issue-to-pr",
  ],
};
const portalEntries = {
  docs: "index",
  developers: "developer/index",
  learn: "learn/index",
};
const errors = [];
const assignments = new Map();

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

for (const [portal, ids] of Object.entries(portalGuides)) {
  for (const id of ids) {
    record(!assignments.has(id), id, "guide assigned to more than one portal");
    assignments.set(id, portal);
  }
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
  record(assignments.has(id), id, "canonical guide has no portal assignment");
  record(
    sources.some((file) => file.replace(/\.mdx?$/, "") === `zh-cn/${id}`),
    id,
    "canonical guide has no Simplified Chinese source",
  );
}
for (const id of assignments.keys()) {
  record(sourceIds.has(id), id, "assigned guide has no English source");
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
      portal: assignments.get(id),
    });
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
      `direct load must show the ${page.portal} sidebar`,
    );
    const links = [...nav.querySelectorAll("a[href]")];
    const targets = links.map((link) =>
      pathname(link.getAttribute("href"), route),
    );
    const expectedTargets = portalGuides[page.portal].map((id) =>
      routeFor(id, page.locale),
    );
    record(
      new Set(targets).size === targets.length,
      route,
      "sidebar must not repeat a canonical guide",
    );
    record(
      sameSet(targets, expectedTargets),
      route,
      `sidebar must contain every ${page.portal} guide exactly once; missing=${expectedTargets.filter((target) => !targets.includes(target)).join(",")} unexpected=${targets.filter((target) => !expectedTargets.includes(target)).join(",")}`,
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
    if (page.id === portalEntries[page.portal]) {
      boundaries.push({
        portal: page.portal,
        locale: page.locale || "en",
        first: targets[0],
        last: targets.at(-1),
      });
    }
  }

  const destinations = document.querySelectorAll(".portal-destinations");
  record(
    destinations.length === 1,
    route,
    "expected exactly one portal destination switcher",
  );
  const destinationLinks = [
    ...(destinations[0]?.querySelectorAll("a[href]") ?? []),
  ];
  record(
    destinationLinks.length === 3,
    route,
    "portal switcher must contain three real links",
  );
  for (const [portal, entry] of Object.entries(portalEntries)) {
    const matches = destinationLinks.filter(
      (link) => link.getAttribute("data-portal-target") === portal,
    );
    const link = matches[0];
    record(
      matches.length === 1 &&
        pathname(link.getAttribute("href"), route) ===
          routeFor(entry, page.locale) &&
        Boolean(link.textContent.trim()),
      route,
      `${portal} switch must link to its localized landing page`,
    );
    if (link) {
      record(
        (link.getAttribute("data-active") === "true") ===
          (portal === page.portal),
        route,
        `${portal} switch has an incorrect active state`,
      );
    }
  }

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
        expectedPages.get(target)?.portal === page.portal &&
          documents
            .get(target)
            ?.querySelector(".portal-navigation")
            ?.getAttribute("data-portal") === page.portal,
        route,
        `language destination ${target} must remain in ${page.portal}`,
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
