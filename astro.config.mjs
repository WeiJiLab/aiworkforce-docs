import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import { siteSidebar } from "./src/lib/navigation.ts";
import { base, origin } from "./src/lib/site.mjs";

export default defineConfig({
  site: origin,
  ...(base && base !== "/" ? { base } : {}),
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "AI Workforce",
      description:
        "Define workflows, assemble agents, and deliver work you can verify. Documentation for AI Workforce.",
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
      sidebar: siteSidebar(),
    }),
  ],
});
