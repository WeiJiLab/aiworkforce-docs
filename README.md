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

## Content

English and Chinese share one sidebar and the same slugs. The directory is defined in `src/lib/sidebar.mjs`. There are 87 pages in each language, including the homepage. [Navigation](NAVIGATION.md) explains the sections, the support states, and the stable URLs.

A page may set `support` to `available` (the default), `limited`, or `planned`. Limited and planned pages say so in the sidebar and above the article. Do not describe a planned interface as something a reader can call.

Content lives in `src/content/docs/`. Chinese files mirror the English paths under `zh-cn/`. Start a guide from `templates/guide.md`. Starlight supplies the H1. Use absolute links to the language-appropriate page. Add every new guide to `src/lib/sidebar.mjs`. Existing guide URLs stay valid when their section changes.

After a production build, `npm run check:navigation` checks direct page loads, the shared sidebar, the current page, the support link, localized language targets, and pagination across both languages. Homepage section headings are written as Markdown so Starlight can generate their table of contents.

Every page requires a title, description, and translation metadata. `sourceVersion` records the reviewed product/date baseline. A Chinese page marked `complete` also records `sourceHash`, the SHA-256 of the entire English file. After reviewing a translation, compute its new hash:

```sh
shasum -a 256 src/content/docs/getting-started/quickstart.md
```

Copy that hash into the corresponding Chinese frontmatter. If translation review is pending, set its status to `needs-review`; the page displays a notice and CI permits publication. A new English page can ship before its translation: the content check reports the missing pair and Starlight serves its language fallback. Never refresh a hash without reviewing the translation.

## Agent access

- `/llms.txt` is the generated bilingual index, grouped by the shared information architecture. Limited and planned pages are marked.
- `/llms-full.txt` is generated from all published pages.
- `/getting-started/quickstart.md` and `/zh-cn/getting-started/quickstart.md` expose page content without navigation or scripts.
- The English homepage is available at `/index.md`; the Chinese homepage at `/zh-cn.md`.
- A page whose support is not `available` includes that state in the Markdown export.

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
