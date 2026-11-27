import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import { legacyBuildRoutes } from "./src/lib/legacy-build-routes.mjs";
import { portalSidebars } from "./src/lib/navigation.ts";
import {
  publishGoogleSitemap,
  serializeSitemapItem,
} from "./src/lib/sitemap.mjs";
import { base, origin, withBase } from "./src/lib/site.mjs";

const locales = {
  root: { label: "English", lang: "en" },
  "zh-cn": { label: "简体中文", lang: "zh-CN" },
};

// Preserve bookmarks to the retired Learn track and its link-only lessons.
const retiredLearnPages = {
  "": "/software-factory/overview/",
  "set-up-software-factory/": "/getting-started/first-software-factory/",
  "configure-environments/": "/software-factory/environments/",
  "connect-cicd/": "/software-factory/cicd/",
  "configure-coding-agents/": "/software-factory/harness/",
  "kanban-automation/": "/workflows/kanban-workbench/",
  "automate-issue-processing/": "/workflows/issue-automation/",
  "configure-verification/": "/software-factory/quality-gates/",
  "set-up-governance/": "/software-factory/release-governance/",
  "monitor-runs-cost/": "/software-factory/observability/",
  "scale-autonomous-development/": "/workflows/custom-workflows/",
};

export default defineConfig({
  site: origin,
  ...(base && base !== "/" ? { base } : {}),
  trailingSlash: "always",
  redirects: {
    ...Object.fromEntries(
      legacyBuildRoutes.map(({ from, to }) => [`/${from}/`, `/${to}/`]),
    ),
    ...Object.fromEntries(
      ["", "/zh-cn"].flatMap((locale) =>
        Object.entries(retiredLearnPages).map(([lesson, destination]) => [
          `${locale}/learn/run-software-factory/${lesson}`,
          { status: 301, destination: `${locale}${destination}` },
        ]),
      ),
    ),
    "/api/": "/developer/",
    "/zh-cn/api/": "/zh-cn/developer/",
    "/getting-started/platform-overview/": "/getting-started/first-automation/",
    "/zh-cn/getting-started/platform-overview/":
      "/zh-cn/getting-started/first-automation/",
    "/integrations/agent-protocol/": {
      status: 301,
      destination: "/integrations/mcp/",
    },
    "/zh-cn/integrations/agent-protocol/": {
      status: 301,
      destination: "/zh-cn/integrations/mcp/",
    },
  },
  integrations: [
    starlight({
      title: "AI Workforce",
      description:
        "Build and automate software delivery with workflows you can verify. Documentation for AI Workforce.",
      favicon: "/favicon.svg",
      disable404Route: true,
      logo: { src: "./src/assets/logo.svg", alt: "", replacesTitle: false },
      defaultLocale: "root",
      locales,
      head: [
        {
          tag: "link",
          attrs: { rel: "sitemap", href: withBase("/sitemap.xml") },
        },
      ],
      customCss: ["./src/styles/custom.css"],
      components: {
        Header: "./src/components/Header.astro",
        PageSidebar: "./src/components/PageSidebar.astro",
        PageTitle: "./src/components/PageTitle.astro",
        Sidebar: "./src/components/Sidebar.astro",
      },
      routeMiddleware: "./src/route-data.ts",
      credits: false,
      sidebar: portalSidebars(),
    }),
    sitemap({
      namespaces: {
        news: false,
        xhtml: true,
        image: false,
        video: false,
      },
      i18n: {
        defaultLocale: "root",
        locales: Object.fromEntries(
          Object.entries(locales).map(([locale, config]) => [
            locale,
            config.lang,
          ]),
        ),
      },
      serialize: serializeSitemapItem,
    }),
    publishGoogleSitemap(),
  ],
});
