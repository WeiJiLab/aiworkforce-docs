# Documentation interface

The site uses one reading layout for Docs, Learn, Customize & Extend, and Developer. A persistent top navigation switches those areas. English and Chinese share slugs. Typography and the product's navy and cyan organize the interface.

## Reference review

| Reference                                                          | Strength                                                                              | Application to AI Workforce                                                                                                                                        | Trade-off                                              |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| [Cursor](https://cursor.com/docs)                                  | Docs / Learn / API as top-level DX; task cards on the docs home; restrained surfaces. | Lead with Docs / Learn / Customize & Extend / Developer in the header. Docs home is task-oriented; Learn is course tracks; Developer covers apps and integrations. | Do not copy Cursor prose or claim Cursor features.     |
| [8090 Software Factory](https://docs.8090.ai/general/introduction) | Separate reading contexts with a persistent switcher and article shell.               | Keep article headings, content actions, and table of contents. Use header nav plus portal-scoped sidebars.                                                         | Avoid role labels (User / Builder) as the primary IA.  |
| [Augment](https://docs.augmentcode.com/introduction)               | Strong product families and clear next steps.                                         | Lead Docs with Software Factory, Kanban Automation, and Issue Automation.                                                                                          | Keep the first screen free of internal layer diagrams. |

## Decisions

- Top navigation: **Docs · Learn · Customize & Extend · Developer · Console**. Console is the external product link from `src/lib/site.mjs`. The source repository is not linked; the product is not presented as open source.
- The header is a full-width bar above the sidebar. Brand and Docs / Learn / Customize & Extend / Developer sit on the left, search in the center, and theme, language, and Console on the right. Do not move that bar into the sidebar column. The header and sidebar share one chrome color and meet without a seam. The article and table of contents sit in a rounded surface on the right.
- Each portal has its own sidebar. Route middleware keeps previous/next inside the current portal and language.
- Docs homepage leads with software delivery, then task sections matching the Docs IA. It does not open with “Create your first AI Employee.”
- Learn homepage asks what the reader wants to do, with three path cards. Practice playbooks remain available.
- Developer is a first-class area for Viewer Apps, HTTP, webhooks, MCP, and CLI/SDK boundaries. Agent Protocol / ACP / A2A pages are not published.
- Preserve stable guide URLs when possible. Moved or removed pages use redirects in `astro.config.mjs`.
- Keep brand mark, navy/cyan palette, Pagefind search, theme, and language switching.
- Custom article actions use the shared icon-only `IconButton` with Chinese accessible labels.
- On narrow screens, Docs / Learn / Customize & Extend / Developer and Console move into the sidebar footer. The header keeps the brand, search, theme, and language.

## Verification

Run formatting, Astro/content checks, a production build, link checks, and `npm run check:navigation`. Visual review should include Docs home, Learn home, Developer home, quickstart, both languages, and confirmation that Agent Protocol is absent from navigation.

## Publication

GitHub Actions validates the `pages` branch and deploys that build to GitHub Pages. `main` is not the publication branch.
