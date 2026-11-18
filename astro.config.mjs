import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import { siteSidebar } from "./src/lib/navigation.ts";

export default defineConfig({
  site: "https://docs.aiworkforce.run",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "AI Workforce",
      description:
        "Use, build, automate, and govern AI employees. Documentation for users, builders, and platform engineers.",
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
