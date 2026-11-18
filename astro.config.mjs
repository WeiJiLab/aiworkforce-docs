import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import { portalSidebars } from "./src/lib/navigation.ts";
import { base, origin } from "./src/lib/site.mjs";

export default defineConfig({
  site: origin,
  ...(base && base !== "/" ? { base } : {}),
  trailingSlash: "always",
  redirects: {
    "/api/": "/developer/",
    "/zh-cn/api/": "/zh-cn/developer/",
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
      locales: {
        root: { label: "English", lang: "en" },
        "zh-cn": { label: "简体中文", lang: "zh-CN" },
      },
      customCss: ["./src/styles/custom.css"],
      components: {
        Header: "./src/components/Header.astro",
        PageTitle: "./src/components/PageTitle.astro",
        Sidebar: "./src/components/Sidebar.astro",
      },
      routeMiddleware: "./src/route-data.ts",
      credits: false,
      sidebar: portalSidebars(),
    }),
  ],
});
