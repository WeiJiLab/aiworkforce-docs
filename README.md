# AI Workforce Docs

A static product documentation site built with Astro and Starlight, maintained in the `aiworkforce-docs` repository. English is served at `/`; Simplified Chinese at `/zh-cn/`. The site shares the platform's navy/cyan palette, brand mark, and system font stack.

The project is being prepared for private review. Confirm that GitHub repository visibility is private before uploading source or creating a pull request. The documentation site has not been deployed.

## Local development

Use Node.js 22.23.4 or newer. No platform backend, credentials, or project environment variables are needed.

```sh
cd aiworkforce-docs
npm ci
npm run dev
```

Run the commands from the repository root, or the root of your active worktree.

Before submitting a pull request:

```sh
npm run format:check
npm run check
npm run build
npm run check:links
npm run check:navigation
```

`npm run preview` serves the production build, including the Pagefind search index. Search indexing is a production build step; use the preview to verify it.

## Content and portals

The site has three independent reading contexts. Each portal has a bilingual homepage, its own sidebar, and previous/next links that stay within the same portal and language. The sidebar footer always links to all three portals and support. Theme and language controls appear once in the header's top-right corner; switching languages preserves the current page.

| Portal     | English / Chinese entry             | Audience and purpose                                                                          | Guides per language |
| ---------- | ----------------------------------- | --------------------------------------------------------------------------------------------- | ------------------- |
| Docs       | `/` / `/zh-cn/`                     | Business users, team members, and administrators using and configuring the product            | 26                  |
| Developers | `/developer/` / `/zh-cn/developer/` | Builders, FDEs, developers, and platform engineers building packages and integrations         | 11                  |
| Learn      | `/learn/` / `/zh-cn/learn/`         | Product, engineering, Builder/FDE, and delivery teams framing requirements and reviewing work | 5                   |

There are 42 guides in each language and six localized portal homepages: 90 pages in total. API, CLI, SDK, and self-hosting topics distinguish implemented interfaces from unsupported capabilities. [Navigation](NAVIGATION.md) explains the portal boundaries; [competitive coverage](COMPETITIVE-COVERAGE.md) maps reference topics from Cursor, Augment, and 8090 to this structure.

Content lives in `src/content/docs/`. English and Chinese use the same relative filenames, with Chinese under `zh-cn/`. Start a guide from `templates/guide.md`; Starlight supplies the H1. Use absolute links to the language-appropriate page. Register new guides in the appropriate portal in `src/lib/navigation.ts` and update the rendered navigation contract in `scripts/check-navigation.mjs`. Existing guide URLs remain stable when their portal changes: `build/prompts-rules` and `recipes/issue-to-pr`, for example, belong to Learn.

After a production build, `npm run check:navigation` checks direct page loads, portal membership, active links, portal switches, localized language targets, and pagination boundaries across all 90 pages. Homepage section headings are written as Markdown so Starlight can generate their table of contents.

Every page requires a title, description, and translation metadata. `sourceVersion` records the reviewed product/date baseline. A Chinese page marked `complete` also records `sourceHash`, the SHA-256 of the entire English file. After reviewing a translation, compute its new hash:

```sh
shasum -a 256 src/content/docs/getting-started/quickstart.md
```

Copy that hash into the corresponding Chinese frontmatter. If translation review is pending, set its status to `needs-review`; the page displays a notice and CI permits publication. A new English page can ship before its translation: the content check reports the missing pair and Starlight serves its language fallback. Never refresh a hash without reviewing the translation.

## Agent access

- `/llms.txt` is the generated bilingual index.
- `/llms-full.txt` is generated from all published pages.
- `/getting-started/quickstart.md` and `/zh-cn/getting-started/quickstart.md` expose page content without navigation or scripts.
- The English homepage is available at `/index.md`; the Chinese homepage at `/zh-cn.md`.

Draft pages are excluded from these endpoints. Content endpoints are generated from the same collection as the website, so no duplicated text files need maintenance. Documentation MCP and downloadable integration skills are future work, not available services.

## Cloudflare Pages

When deployment is authorized, connect this repository to Cloudflare Pages with these settings:

| Setting                | Value                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| Production branch      | `main`                                                                                        |
| Root directory         | Repository root (leave blank)                                                                 |
| Build command          | `npm ci && npm run check && npm run build && npm run check:links && npm run check:navigation` |
| Build output directory | `dist`                                                                                        |
| Node.js                | Select a build image with Node 22.23.4+ or Node 24+                                           |
| Planned custom domain  | `docs.aiworkforce.run`                                                                        |

GitHub Actions validates formatting, Astro types/schema, translations, the production build, local links, and portal navigation, and uploads the build for review. A connected Cloudflare Pages project can deploy `main` after merge and supply PR branch previews. Hosting, preview access, and DNS must be configured separately; the repository's private visibility does not provide access control for a deployed site. No hosting or DNS has been provisioned by this change.

## Product accuracy

The initial guides were checked against platform commit `c75d55ab`, including employee creation, employee manifest validation, automation session result collection, and delivery workbench lanes. Contributors should validate UI steps and examples against the current implementation. Do not publish internal source archives, customer material, credentials, or private operational addresses from the adjacent knowledge repository.
