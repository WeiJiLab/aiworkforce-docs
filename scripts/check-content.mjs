import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { parse } from "yaml";

const root = new URL("../src/content/docs/", import.meta.url);
const files = await readdir(root, { recursive: true });
const pages = new Map();
const errors = [];
const warnings = [];

for (const file of files.filter((file) => /\.mdx?$/.test(file))) {
  const source = await readFile(new URL(file, root), "utf8");
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) {
    errors.push(`${file}: missing frontmatter`);
    continue;
  }
  const data = parse(frontmatter[1]);
  if (!data.title || !data.description)
    errors.push(`${file}: title and description are required`);
  if (/^# /m.test(source.slice(frontmatter[0].length)))
    errors.push(`${file}: Starlight already renders the page H1`);
  pages.set(file, { data, source });
}

for (const [file, page] of pages) {
  if (file.startsWith("zh-cn/")) {
    if (!pages.has(file.slice(6)))
      errors.push(`${file}: no matching English source`);
    continue;
  }
  const translated = pages.get(join("zh-cn", file));
  if (!translated) {
    warnings.push(
      `${file}: Simplified Chinese uses Starlight's English fallback`,
    );
    continue;
  }
  const translation = translated.data.translation;
  const hash = createHash("sha256").update(page.source).digest("hex");
  if (translation?.status === "complete" && translation.sourceHash !== hash) {
    errors.push(
      `zh-cn/${file}: English changed; review translation and update sourceHash, or mark needs-review`,
    );
  }
  if (translation?.status !== "complete")
    warnings.push(`zh-cn/${file}: translation requires review`);
}

process.stdout.write(
  `${JSON.stringify({ check: "content", pages: pages.size, warnings, errors }, null, 2)}\n`,
);
if (errors.length) process.exitCode = 1;
