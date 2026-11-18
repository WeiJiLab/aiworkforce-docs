/** Publication settings for the GitHub Pages project site. */
export const origin = "https://weijilab.github.io";
export const base = "/aiworkforce-docs";

export function withBase(path) {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`.replace(/\/{2,}/g, "/");
}

export function absoluteUrl(path) {
  return `${origin}${withBase(path)}`;
}
