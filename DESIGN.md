# Documentation interface

The site uses one reading layout for the homepage and every article. One sidebar covers workflows, workflow applications, agents, execution, integrations, and resources. English and Chinese share that structure. Typography, a persistent support link, and the product's navy and cyan organize the interface.

## Reference review

The interface comparison uses the supplied desktop screenshots. The category review also reads the three sites' official navigation and documentation indexes; [competitive coverage](COMPETITIVE-COVERAGE.md) records the mapping and support boundaries.

| Reference                                                          | Strength                                                                                                                                      | Application to AI Workforce                                                                                                                                 | Trade-off                                                                                                                          |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [8090 Software Factory](https://docs.8090.ai/general/introduction) | Separate Docs, Developers, and Learn contexts, with a persistent portal switcher, article headings, content actions, and a table of contents. | Keep the article shell, headings, content actions, and table of contents. Use one directory organized by job, instead of copying the three-portal switcher. | A single directory needs clear section labels so use, build, and operate stay distinct.                                            |
| [Cursor](https://cursor.com/docs/cloud-agent/self-hosted)          | Restrained surfaces, readable text, useful density, and one accent for current location. Technical content begins quickly.                    | Use neutral backgrounds, a consistent reading column, limited borders, and a single cyan accent for active navigation and links.                            | Very dense menus can be hard for new users. Preserve clear group labels for the main sections.                                     |
| [Augment](https://docs.augmentcode.com/introduction)               | Strong product families, a concise introduction, an explanatory visual, and clear next steps.                                                 | Lead the homepage with the workflow applications, then show how a workflow runs.                                                                            | A large image or assistant interface can dominate the page. Use a compact lifecycle diagram; add an assistant only when it exists. |

## Decisions

- Keep the homepage and articles in the same sidebar and reading shell. The homepage leads with three workflow applications, then the workflow lifecycle. It does not open with an internal layer model.
- Keep brand and search to the left of the header, with one theme control and one language control at the top right. The directory scrolls independently. Its footer keeps support available.
- Show one directory. Do not split the site into Docs, Developers, and Learn sidebars. A topic that used to live in another portal keeps its URL and moves inside this directory.
- Preserve stable guide URLs. Previous and next links stay in the current language and follow sidebar order. Language changes keep the same article.
- Use a roughly 256px left navigation, a 720–760px reading column, and a quiet 208px table of contents where space permits. Keep the desktop content header minimal so the article begins promptly. The eyebrow names the sidebar section.
- Reuse the product's 8px navigation, 10px control, and 14px surface radii for active navigation, search, actions, cards, and the overview diagram. Keep reading columns and section dividers flat.
- Start article headers with the knowledge domain, title, and summary. Use 14px/24px body text, 28px/36px desktop titles (26px/34px on mobile), 20px/28px section headings, and 14px/22px summaries. Navigation uses 13px/20px rows and the table of contents uses 12px/18px. Portal homepages keep their introductory paragraph instead of repeating the metadata summary. Compact diagrams and task cards show the title and useful explanation without separate decorative icon or label rows; isolate their spacing from Markdown defaults with `not-content`.
- Keep the brand mark and navy/cyan palette. Use flat white and lightly tinted neutral surfaces, with clear focus indicators and enough contrast in both themes.
- Keep navigation labels visible. Custom article actions use the shared icon-only `IconButton` with Chinese accessible labels and hover/focus tooltips.
- Keep search, theme, language, and the mobile menu accessible in the header on narrow screens. Put the same portal directory and destinations in the navigation drawer; stack homepage paths and the product diagram vertically.
- Write homepage section headings in MDX Markdown so the article table of contents includes them. Shared Astro components render the cards and diagram below those headings.
- Show only working capabilities. Search uses Pagefind; Markdown and llms endpoints read the same content collection. API pages describe implemented interfaces and their support boundaries. A documentation assistant or documentation MCP is not part of this site.

## Verification

The guides are available in both languages. Run formatting, Astro/content checks, a production build, local link checks, and `npm run check:navigation`. The navigation check reads the built HTML to verify direct loads, one shared sidebar, active links, the support destination, language switches, and previous/next staying in the same language. Visual review should include the homepage, a long article, a page marked limited or planned, both themes, and the mobile navigation drawer, with a single theme/language pair visible in the header.

## Publication

GitHub Actions validates the `pages` branch and deploys that build to GitHub Pages. Pull requests into `pages` are checked and are not deployed. `main` is not the publication branch.
