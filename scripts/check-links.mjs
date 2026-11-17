import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseHTML } from "linkedom";

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

for (const [file, document] of pages) {
  const route = `/${relative(root, file).replace(/index\.html$/, "")}`;
  for (const element of document.querySelectorAll(
    "a[href], img[src], script[src], link[href]",
  )) {
    const value = element.getAttribute("href") ?? element.getAttribute("src");
    if (!value || /^(mailto:|tel:|data:|javascript:)/.test(value)) continue;
    const url = new URL(value, `https://docs.aiworkforce.run${route}`);
    if (url.origin !== "https://docs.aiworkforce.run") continue;
    const pathname = decodeURIComponent(url.pathname);
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
