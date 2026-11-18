import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";
import { base, origin } from "../src/lib/site.mjs";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const files = await readdir(root, { recursive: true });
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const pages = new Map(
  await Promise.all(
    htmlFiles.map(async (file) => [
      resolve(root, file),
      parseHTML(await readFile(join(root, file), "utf8")).document,
    ]),
  ),
);
const errors = [];
let checked = 0;

function sitePath(pathname) {
  if (pathname === base || pathname === `${base}/`) return "/";
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length);
  return pathname;
}

for (const [file, document] of pages) {
  const route =
    `${base}/${relative(root, file).replace(/index\.html$/, "")}`.replace(
      /\/{2,}/g,
      "/",
    );
  for (const element of document.querySelectorAll(
    "a[href], img[src], script[src], link[href]",
  )) {
    const value = element.getAttribute("href") ?? element.getAttribute("src");
    if (!value || /^(mailto:|tel:|data:|javascript:)/.test(value)) continue;
    const url = new URL(value, `${origin}${route}`);
    if (url.origin !== origin) continue;
    const pathname = sitePath(decodeURIComponent(url.pathname));
    let target = resolve(root, `.${pathname}`);
    if (pathname.endsWith("/")) target = join(target, "index.html");
    const targetStat = await stat(target).catch((error) => {
      if (error.code !== "ENOENT") throw error;
      return undefined;
    });
    if (!targetStat?.isFile()) {
      errors.push(`${relative(root, file)}: missing ${value}`);
    } else if (url.hash && extname(target) === ".html") {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!pages.get(target)?.getElementById(id))
        errors.push(`${relative(root, file)}: missing fragment ${value}`);
    }
    checked++;
  }
}

process.stdout.write(
  `${JSON.stringify({ check: "links", pages: pages.size, checked, errors }, null, 2)}\n`,
);
if (errors.length) process.exitCode = 1;
