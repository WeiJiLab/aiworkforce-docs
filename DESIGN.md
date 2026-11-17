# Documentation interface

The site uses one reading layout across portal homepages and articles. Docs, Developers, and Learn have separate navigation contexts, while the product's navy and cyan remain shared accents. Typography, clear reading paths, and a persistent portal switcher organize the interface.

## Reference review

The interface comparison uses the supplied desktop screenshots. The category review also reads the three sites' official navigation and documentation indexes; [competitive coverage](COMPETITIVE-COVERAGE.md) records the mapping and support boundaries.

| Reference                                                          | Strength                                                                                                                                      | Application to AI Workforce                                                                                                       | Trade-off                                                                                                                                     |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [8090 Software Factory](https://docs.8090.ai/general/introduction) | Separate Docs, Developers, and Learn contexts, with a persistent portal switcher, article headings, content actions, and a table of contents. | Give each portal its own directory and landing page. Keep global destinations, article navigation, and article sections distinct. | Portal boundaries need deliberate ownership when a topic spans product operations, methods, and implementation.                               |
| [Cursor](https://cursor.com/docs/cloud-agent/self-hosted)          | Restrained surfaces, readable text, useful density, and one accent for current location. Technical content begins quickly.                    | Use neutral backgrounds, a consistent reading column, limited borders, and a single cyan accent for active navigation and links.  | Very dense menus can be hard for new users. Preserve clear group labels and the three entry paths.                                            |
| [Augment](https://docs.augmentcode.com/introduction)               | Strong product families, a concise introduction, an explanatory visual, and clear next steps.                                                 | Explain the workspace → employee → evidence model on Docs, then offer explicit paths into Docs, Developers, and Learn.            | A large image or assistant interface can dominate the page. Use a compact, accessible workflow diagram; add an assistant only when it exists. |

## Decisions

- Keep each portal homepage inside the same sidebar and reading shell as its articles. Use substantive summaries and task cards to make the next step clear.
- Keep brand and search to the left of the header, with one theme control and one language control at the top right. The portal directory scrolls independently; its footer keeps Docs, Developers, Learn, and support available.
- Show only the active portal's directory. Docs covers product use and administration; Developers covers employee packages, integrations, APIs, and runtime; Learn covers requirements, planning, prompts, feedback, and end-to-end methods. Builder and FDE work spans Learn and Developers.
- Preserve stable guide URLs. Resolve the portal from an explicit page mapping on direct load, and constrain previous/next links to that portal and language. Language changes keep the same article.
- Use a roughly 256px left navigation, a 720–760px reading column, and a quiet 208px table of contents where space permits. Keep the desktop content header minimal so the article begins promptly.
- Reuse the product's 8px navigation, 10px control, and 14px surface radii for active navigation, search, actions, cards, and the overview diagram. Keep reading columns and section dividers flat.
- Start article headers with the knowledge domain, title, and summary. Use 14px/24px body text, 28px/36px desktop titles (26px/34px on mobile), 20px/28px section headings, and 14px/22px summaries. Navigation uses 13px/20px rows and the table of contents uses 12px/18px. Portal homepages keep their introductory paragraph instead of repeating the metadata summary. Compact diagrams and task cards show the title and useful explanation without separate decorative icon or label rows; isolate their spacing from Markdown defaults with `not-content`.
- Keep the brand mark and navy/cyan palette. Use flat white and lightly tinted neutral surfaces, with clear focus indicators and enough contrast in both themes.
- Keep navigation labels visible. Custom article actions use the shared icon-only `IconButton` with Chinese accessible labels and hover/focus tooltips.
- Keep search, theme, language, and the mobile menu accessible in the header on narrow screens. Put the same portal directory and destinations in the navigation drawer; stack homepage paths and the product diagram vertically.
- Write homepage section headings in MDX Markdown so the article table of contents includes them. Shared Astro components render the cards and diagram below those headings.
- Show only working capabilities. Search uses Pagefind; Markdown and llms endpoints read the same content collection. API pages describe implemented interfaces and their support boundaries. A documentation assistant or documentation MCP is not part of this site.

## Verification

The 42 guides and three portal homepages are available in both languages, for 90 pages. Run formatting, Astro/content checks, a production build, local link checks, and `npm run check:navigation`. The navigation check reads the built HTML to verify direct loads, portal membership, active links, all portal destinations, language switches, and previous/next boundaries. Visual review should include all three homepages, a long article, both themes, and the mobile navigation drawer, with a single theme/language pair visible in the header.

## Publication boundary

The project is intended for private preparation. The organization owner must confirm private repository visibility before source is pushed. CI validates and uploads a build artifact; it does not deploy a public site. Cloudflare configuration is preparatory. No production hosting, DNS change, or public documentation release is part of this implementation.
