import { readFile, readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";
import { base, origin } from "../src/lib/site.mjs";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const files = await readdir(root, { recursive: true });
const errors = [];
const documents = new Map(
  await Promise.all(
    files
      .filter((file) => file.endsWith(".html"))
      .map(async (file) => [
        resolve(root, file),
        parseHTML(await readFile(join(root, file), "utf8")).document,
      ]),
  ),
);
const diagramUses = new Map();
let pages = 0;
let figures = 0;
let nodeLinks = 0;

function record(condition, context, message) {
  if (!condition) errors.push(`${context}: ${message}`);
}

function sitePath(pathname) {
  if (pathname === base || pathname === `${base}/`) return "/";
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length);
  return pathname;
}

function sameLinks(actual, expected) {
  return (
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

function visibleLabel(node) {
  const accessibleName = node.getAttribute("aria-label");
  if (accessibleName) return accessibleName.split(":")[0].trim();
  const label = node.querySelector(".process-label");
  if (!label) return "";
  const spans = [...label.querySelectorAll("tspan")];
  return (
    spans.length
      ? spans.map((span) => span.textContent).join(" ")
      : label.textContent
  )
    .replace(/\s+/g, " ")
    .trim();
}

function inspectSvg(svg, locale, context) {
  if (!svg) {
    record(false, context, "missing SVG");
    return { links: [], labels: [] };
  }
  const title = svg.querySelector("title");
  const description = svg.querySelector("desc");
  record(Boolean(title?.textContent.trim()), context, "SVG needs a text title");
  record(
    Boolean(description?.textContent.trim()),
    context,
    "SVG needs a text description",
  );
  record(Boolean(svg.getAttribute("viewBox")), context, "SVG needs a viewBox");
  for (const [attribute, element] of [
    ["aria-labelledby", title],
    ["aria-describedby", description],
  ]) {
    record(
      Boolean(element?.id) && svg.getAttribute(attribute) === element.id,
      context,
      `${attribute} must identify the SVG text`,
    );
  }
  const nodes = [...svg.querySelectorAll("a")];
  record(nodes.length > 0, context, "SVG needs linked steps");
  const links = nodes.map((node, index) => {
    const href = node.getAttribute("href");
    const step = `${context} step ${index + 1}`;
    record(Boolean(href), step, "native SVG anchor needs href");
    record(
      node.getAttribute("tabindex") === "0",
      step,
      "step must be keyboard focusable",
    );
    record(
      Boolean(node.getAttribute("aria-label")?.trim() || visibleLabel(node)),
      step,
      "step needs an accessible name",
    );
    if (!href) return "";
    const url = new URL(href, origin);
    const internal = url.origin === origin && url.protocol === "https:";
    record(internal, step, `step link must stay on this site: ${href}`);
    if (!internal) return href;
    const pathname = sitePath(decodeURIComponent(url.pathname));
    const targetLocale = pathname.startsWith("/zh-cn/") ? "zh-cn" : "en";
    record(
      targetLocale === locale,
      step,
      `step link must keep ${locale}: ${href}`,
    );
    let target = resolve(root, `.${pathname}`);
    if (pathname.endsWith("/")) target = join(target, "index.html");
    const document = documents.get(target);
    record(Boolean(document), step, `step must open a built guide: ${href}`);
    if (document && url.hash) {
      record(
        Boolean(document.getElementById(decodeURIComponent(url.hash.slice(1)))),
        step,
        `step fragment must exist: ${href}`,
      );
    }
    nodeLinks++;
    return href;
  });
  return {
    links,
    labels: nodes.map(visibleLabel),
    title: title?.textContent.trim() ?? "",
    description: description?.textContent.trim() ?? "",
  };
}

async function readExpected(file, context) {
  try {
    return await readFile(file, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    record(false, context, `missing ${relative(root, file)}`);
    return undefined;
  }
}

for (const [file, document] of documents) {
  const diagrams = [...document.querySelectorAll("[data-process-diagram]")];
  if (!diagrams.length) continue;
  pages++;
  const context = relative(root, file);
  const locale = context.startsWith("zh-cn/") ? "zh-cn" : "en";
  const markdownPath = context.replace(/(?:^|\/)index\.html$/, "") || "index";
  const markdown = await readExpected(
    join(root, `${markdownPath}.md`),
    context,
  );
  if (markdown !== undefined) {
    record(
      !/\bProcessDiagram\b|^import\s/m.test(markdown),
      context,
      "Markdown export must expand diagrams and remove component imports",
    );
  }
  for (const figure of diagrams) {
    figures++;
    const id = figure.getAttribute("data-process-diagram");
    const key = `${locale}/${id}`;
    const diagramContext = `${context} [${id}]`;
    const svgs = [...figure.querySelectorAll("svg")];
    record(
      svgs.length === 2,
      diagramContext,
      "expected wide and narrow SVG versions",
    );
    const wide = inspectSvg(
      figure.querySelector(".process-diagram-wide svg"),
      locale,
      `${diagramContext} wide`,
    );
    const narrow = inspectSvg(
      figure.querySelector(".process-diagram-narrow svg"),
      locale,
      `${diagramContext} narrow`,
    );
    record(
      sameLinks(narrow.links, wide.links),
      diagramContext,
      "wide and narrow steps must link to the same guides in the same order",
    );
    const previous = diagramUses.get(key);
    record(
      !previous || sameLinks(previous.links, wide.links),
      diagramContext,
      "reused diagrams must keep their step destinations",
    );
    diagramUses.set(key, wide);
    const assetLink = figure.querySelector("figcaption a[href]");
    const expectedAsset = `${base}/diagrams/${key}.svg`.replace(/\/{2,}/g, "/");
    record(
      assetLink?.getAttribute("href") === expectedAsset,
      diagramContext,
      "standalone link must identify this localized diagram",
    );
    if (markdown === undefined) continue;
    record(
      Boolean(wide.title) && markdown.includes(wide.title),
      diagramContext,
      "Markdown export must include the diagram title",
    );
    record(
      Boolean(wide.description) && markdown.includes(wide.description),
      diagramContext,
      "Markdown export must explain the diagram in text",
    );
    for (const [index, href] of wide.links.entries()) {
      record(
        Boolean(wide.labels[index]) &&
          markdown.includes(`[${wide.labels[index]}](${href})`),
        diagramContext,
        `Markdown export must retain step ${index + 1} and its link`,
      );
    }
  }
}

record(
  figures > 0,
  "diagrams",
  "expected at least one embedded process diagram",
);
const assets = files.filter((file) => /^diagrams\/.*\.svg$/.test(file));
record(
  assets.length === diagramUses.size,
  "diagrams",
  "each localized diagram must have one standalone SVG and be used in a guide",
);
for (const asset of assets) {
  const match = asset.match(/^diagrams\/(en|zh-cn)\/([^/]+)\.svg$/);
  record(
    Boolean(match),
    asset,
    "standalone diagram must use an English or Chinese asset path",
  );
  if (!match) continue;
  const [, locale, id] = match;
  const key = `${locale}/${id}`;
  const inline = diagramUses.get(key);
  record(
    Boolean(inline),
    asset,
    "standalone diagram must be used in a guide of this language",
  );
  record(
    diagramUses.has(`${locale === "en" ? "zh-cn" : "en"}/${id}`),
    asset,
    "diagram must be available in both guide languages",
  );
  const standalone = inspectSvg(
    parseHTML(await readFile(join(root, asset), "utf8")).document.querySelector(
      "svg",
    ),
    locale,
    asset,
  );
  record(
    Boolean(inline) && sameLinks(standalone.links, inline.links),
    asset,
    "standalone and embedded steps must link to the same guides in the same order",
  );
}

process.stdout.write(
  `${JSON.stringify(
    {
      check: "diagrams",
      pages,
      figures,
      assets: assets.length,
      nodeLinks,
      errors,
    },
    null,
    2,
  )}\n`,
);
if (errors.length) process.exitCode = 1;
