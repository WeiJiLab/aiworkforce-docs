import { readFile, readdir } from "node:fs/promises";
import { parse } from "yaml";
import { orderedIds, plannedIds } from "../src/lib/sidebar.mjs";

const root = new URL("../src/content/docs/", import.meta.url);
const files = (await readdir(root, { recursive: true })).filter((file) =>
  /\.mdx?$/.test(file),
);
const errors = [];
const warnings = [];
const titles = new Map();
const today = new Date("2026-11-18T00:00:00Z");
const staleDays = 180;
const primary = new Set(orderedIds.filter((id) => !plannedIds.includes(id)));

function record(condition, message) {
  if (!condition) errors.push(message);
}

for (const file of files) {
  const source = await readFile(new URL(file, root), "utf8");
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) continue;
  const data = parse(frontmatter[1]);
  const id = file.replace(/^zh-cn\//, "").replace(/\.mdx?$/, "");
  const locale = file.startsWith("zh-cn/") ? "zh-cn" : "en";
  const status = data.status ?? "available";
  const badge = data.sidebar?.badge?.text;

  record(
    ["available", "beta", "limited", "planned"].includes(status),
    `${file}: status must be available, beta, limited, or planned`,
  );
  record(
    badge !== "有限制",
    `${file}: sidebar badge must say 部分支持, not 有限制`,
  );
  if (badge === "Limited" || badge === "部分支持") {
    record(
      status === "limited",
      `${file}: Limited badge requires status: limited`,
    );
  }
  if (badge === "Planned" || badge === "规划中") {
    record(
      status === "planned",
      `${file}: Planned badge requires status: planned`,
    );
  }
  if (badge === "Beta") {
    record(status === "beta", `${file}: Beta badge requires status: beta`);
  }
  if (status === "limited" || status === "planned" || status === "beta") {
    record(Boolean(badge), `${file}: ${status} pages need a sidebar badge`);
  }
  if (status === "available") {
    record(!badge, `${file}: available pages do not show a sidebar badge`);
  }
  if (locale === "en") {
    if (status === "planned") {
      record(
        plannedIds.includes(id),
        `${file}: planned pages belong in the Planned sidebar group`,
      );
    } else {
      record(
        !plannedIds.includes(id),
        `${file}: only planned pages belong in the Planned group`,
      );
      record(
        primary.has(id),
        `${file}: published page is missing from the primary sidebar`,
      );
    }
  }
  if (data.last_verified) {
    const verified = new Date(`${data.last_verified}T00:00:00Z`);
    record(
      !Number.isNaN(verified.getTime()),
      `${file}: last_verified must be YYYY-MM-DD`,
    );
    const age = (today - verified) / 86400000;
    record(
      age <= staleDays,
      `${file}: last_verified is older than ${staleDays} days`,
    );
  } else if (warnings.length < 8) {
    warnings.push(`${file}: last_verified is not set`);
  }

  const key = `${locale}:${data.title}`;
  const previous = titles.get(key);
  record(
    !previous,
    `${file}: duplicate title "${data.title}" also used by ${previous}`,
  );
  titles.set(key, file);
}

process.stdout.write(
  `${JSON.stringify(
    {
      check: "governance",
      pages: files.length,
      planned: plannedIds,
      primary: primary.size,
      warnings: warnings.length,
      errors,
    },
    null,
    2,
  )}\n`,
);
if (errors.length) process.exitCode = 1;
