# Documentation interface

The site uses one reading layout for Docs, Learn, and API. A persistent top navigation switches those areas. English and Chinese share slugs. Typography and the product's navy and cyan organize the interface.

## Reference review

| Reference                                                          | Strength                                                                              | Application to AI Workforce                                                                                          | Trade-off                                              |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [Cursor](https://cursor.com/docs)                                  | Docs / Learn / API as top-level DX; task cards on the docs home; restrained surfaces. | Lead with Docs / Learn / API in the header. Docs home is task-oriented; Learn is course tracks; API is programmatic. | Do not copy Cursor prose or claim Cursor features.     |
| [8090 Software Factory](https://docs.8090.ai/general/introduction) | Separate reading contexts with a persistent switcher and article shell.               | Keep article headings, content actions, and table of contents. Use header nav plus portal-scoped sidebars.           | Avoid role labels (User / Builder) as the primary IA.  |
| [Augment](https://docs.augmentcode.com/introduction)               | Strong product families and clear next steps.                                         | Lead Docs with Software Factory, Kanban Automation, and Issue Automation.                                            | Keep the first screen free of internal layer diagrams. |

## Decisions

- Top navigation: **Docs · Learn · API · Console**. Console is the external product link from `src/lib/site.mjs`. The source repository is not linked; the product is not presented as open source.
- The header is a full-width bar above the sidebar. Brand and Docs / Learn / API sit on the left, search in the center, and theme, language, and Console on the right. Do not move that bar into the sidebar column. The header and sidebar share one chrome color and meet without a seam. The article and table of contents sit in a rounded surface on the right.
- Each portal has its own sidebar. Route middleware keeps previous/next inside the current portal and language.
- Docs homepage leads with one verifiable software change, a linked delivery diagram, and three task paths. Category overviews explain work before individual objects; the sidebar holds the complete reference directory.
- Learn homepage asks what the reader wants to do, with three path cards. Practice playbooks remain available.
- API is a first-class area for HTTP, webhooks, MCP, and CLI/SDK boundaries. Agent Protocol / ACP / A2A pages are not published.
- Preserve stable guide URLs when possible. Moved or removed pages use redirects in `astro.config.mjs`.
- Keep brand mark, navy/cyan palette, Pagefind search, theme, and language switching.
- Custom article actions use the shared icon-only `IconButton` with Chinese accessible labels.
- On narrow screens, Docs / Learn / API and Console move into the sidebar footer. The header keeps the brand, search, theme, and language.

## Verification

Process diagrams use native SVG links from one bilingual definition shared by article views, standalone SVGs, and Markdown exports. Steps support keyboard focus, follow the current document language, and open the guide for that stage. Narrow article columns use a vertical layout; light and dark themes use the existing console palette. Keep each diagram focused on one business flow, with tools, permissions, and environments described as supporting conditions.

Run formatting, Astro/content checks, a production build, link checks, `npm run check:navigation`, and `npm run check:diagrams`. Visual review should include Docs home, Learn home, API home, quickstart, both languages, linked diagram steps in wide and narrow columns, and confirmation that Agent Protocol is absent from navigation.

## Publication

GitHub Actions validates the `pages` branch and deploys that build to GitHub Pages. `main` is not the publication branch.
