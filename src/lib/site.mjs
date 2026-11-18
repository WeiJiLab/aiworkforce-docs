/** Publication settings. The custom domain serves the site from the root. */
export const origin = "https://docs.aiworkforce.run";
export const base = "";

/** Product and source destinations reused by the top navigation. */
export const githubUrl = "https://github.com/WeiJiLab/aiworkforce-platform";
export const consoleUrl = "https://aiworkforce.run";

export function withBase(path) {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  if (!base || base === "/") return suffix;
  return `${base}${suffix}`.replace(/\/{2,}/g, "/");
}

export function absoluteUrl(path) {
  return `${origin}${withBase(path)}`;
}
