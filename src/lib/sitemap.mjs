import { execFileSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Google's XML sitemap uses `<loc>` plus an accurate `<lastmod>`.
 * `changefreq` and `priority` are ignored, so they are left out.
 * Dates come from each file's last commit, not the build clock.
 */
const lastmods = loadLastmods();

function loadLastmods() {
  const dates = new Map();
  let output = "";
  try {
    output = execFileSync(
      "git",
      ["log", "--pretty=tformat:%cI", "--name-only"],
      {
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
      },
    );
  } catch {
    return dates;
  }
  let date = "";
  for (const line of output.split("\n")) {
    if (/^\d{4}-\d{2}-\d{2}T/.test(line)) {
      date = line;
      continue;
    }
    if (date && line && !dates.has(line)) dates.set(line, date);
  }
  return dates;
}

function gitPath(file) {
  return file.split("\\").join("/");
}

function contentFiles(pathname) {
  const rel = pathname === "/" ? "" : pathname.replace(/^\/|\/$/g, "");
  const files = [];
  const addDocs = (id) => {
    if (!id) {
      files.push("src/content/docs/index.mdx", "src/content/docs/index.md");
      return;
    }
    const base = `src/content/docs/${id}`;
    files.push(
      `${base}.mdx`,
      `${base}.md`,
      `${base}/index.mdx`,
      `${base}/index.md`,
    );
  };
  addDocs(rel);
  if (rel === "zh-cn") addDocs("");
  else if (rel.startsWith("zh-cn/")) addDocs(rel.slice("zh-cn/".length));
  return files;
}

function pageFile(pathname) {
  const parts = pathname
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter(Boolean);
  if (!parts.length) return undefined;
  let dir = "src/pages";
  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    const direct = join(dir, `${part}.astro`);
    if (index === parts.length - 1 && existsSync(direct))
      return gitPath(direct);
    const nested = join(dir, part);
    if (existsSync(nested)) {
      dir = nested;
      continue;
    }
    return dynamicPage(dir);
  }
  const index = join(dir, "index.astro");
  if (existsSync(index)) return gitPath(index);
  return dynamicPage(dir);
}

function dynamicPage(dir) {
  if (!existsSync(dir)) return undefined;
  const dynamic = readdirSync(dir).find(
    (name) => name.startsWith("[") && name.endsWith(".astro"),
  );
  return dynamic ? gitPath(join(dir, dynamic)) : undefined;
}

export function lastmodFor(pathname) {
  const file =
    contentFiles(pathname).find((candidate) => existsSync(candidate)) ??
    pageFile(pathname);
  return file ? lastmods.get(file) : undefined;
}

function withDefaultLocale(links) {
  if (!links?.length) return undefined;
  if (links.some((link) => link.lang === "x-default")) return links;
  const fallback = links.find((link) => link.lang === "en");
  if (!fallback) return links;
  return [...links, { lang: "x-default", url: fallback.url }];
}

export function serializeSitemapItem(item) {
  const links = withDefaultLocale(item.links);
  const lastmod = lastmodFor(new URL(item.url).pathname);
  return {
    url: item.url,
    ...(links ? { links } : {}),
    ...(lastmod ? { lastmod } : {}),
  };
}

/** Publish the urlset at `/sitemap.xml`, the name Google documents. */
export function publishGoogleSitemap() {
  return {
    name: "google-sitemap",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const root = fileURLToPath(dir);
        const generated = join(root, "sitemap-0.xml");
        const sitemap = join(root, "sitemap.xml");
        const index = join(root, "sitemap-index.xml");
        const xml = readFileSync(generated, "utf8");
        const indexXml = readFileSync(index, "utf8").replaceAll(
          "sitemap-0.xml",
          "sitemap.xml",
        );
        writeFileSync(sitemap, xml);
        writeFileSync(index, indexXml);
        rmSync(generated);
        assertGoogleSitemap(xml, indexXml);
      },
    },
  };
}

function assertGoogleSitemap(xml, indexXml) {
  const problems = [];
  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    problems.push("sitemap.xml must start with a UTF-8 XML declaration");
  }
  if (
    !xml.includes("<urlset") ||
    !xml.includes("http://www.sitemaps.org/schemas/sitemap/0.9")
  ) {
    problems.push(
      "sitemap.xml must be a urlset in the sitemap protocol namespace",
    );
  }
  if (!xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
    problems.push("sitemap.xml must declare the xhtml namespace for hreflang");
  }
  for (const unused of ["xmlns:news", "xmlns:image", "xmlns:video"]) {
    if (xml.includes(unused))
      problems.push(`sitemap.xml declares unused ${unused}`);
  }
  if (!xml.includes("<lastmod>"))
    problems.push("sitemap.xml is missing lastmod");
  if (!xml.includes('hreflang="x-default"')) {
    problems.push("sitemap.xml is missing hreflang x-default");
  }
  if (
    !indexXml.includes("/sitemap.xml") ||
    indexXml.includes("sitemap-0.xml")
  ) {
    problems.push("sitemap index must point at sitemap.xml");
  }
  if (problems.length) throw new Error(problems.join("\n"));
}
