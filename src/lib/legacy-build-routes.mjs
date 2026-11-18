// Published document slugs, including the former portal landing page.
const pages = [
  "",
  "/agent-tests",
  "/bots",
  "/builder",
  "/channels",
  "/invites",
  "/market",
  "/marketplace",
  "/meeting-assistants",
  "/meeting-records",
];

export const legacyBuildRoutes = ["", "zh-cn/"].flatMap((locale) =>
  pages.map((page) => ({
    from: `${locale}fde${page}`,
    to: `${locale}build${page}`,
  })),
);
