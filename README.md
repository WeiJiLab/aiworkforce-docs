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

English and Chinese share the same slugs across four portals: Docs, Learn, Customize & Extend, and Developer. Sidebars are defined in `src/lib/sidebar.mjs` and filtered by route middleware. Top navigation also links to Console. [Navigation](NAVIGATION.md) explains the sections, support states, and redirects.

A page may set `status` to `available` (the default), `beta`, or `planned`. Beta and planned pages say so in the sidebar and above the article. A page describes the behavior this release supports, so it does not carry a partial-support badge. Do not describe a planned interface as something a reader can call.

Content lives in `src/content/docs/`. Chinese files mirror the English paths under `zh-cn/`. Start a guide from `templates/guide.md`. Starlight supplies the H1. Use absolute links to the language-appropriate page. Add every new guide to the correct portal in `src/lib/sidebar.mjs`. Existing guide URLs stay valid when their section changes; removed pages need redirects.

After a production build, `npm run check:navigation` checks direct page loads, the portal sidebar, top navigation, localized language targets, and pagination within each portal. The sidebar does not include a contact-support link. Homepage section headings are written as Markdown so Starlight can generate their table of contents.

Every page requires a title, description, and translation metadata. `sourceVersion` records the reviewed product/date baseline. A Chinese page marked `complete` also records `sourceHash`, the SHA-256 of the entire English file. After reviewing a translation, compute its new hash:

```sh
shasum -a 256 src/content/docs/getting-started/quickstart.md
```

Copy that hash into the corresponding Chinese frontmatter. If translation review is pending, set its status to `needs-review`; the page displays a notice and CI permits publication. A new English page can ship before its translation: the content check reports the missing pair and Starlight serves its language fallback. Never refresh a hash without reviewing the translation.

## Agent access

- `/llms.txt` is the generated bilingual index, grouped by the shared information architecture. Planned pages are marked.
- `/llms-full.txt` is generated from all published pages.
- `/getting-started/quickstart.md` and `/zh-cn/getting-started/quickstart.md` expose page content without navigation or scripts.
- The English homepage is available at `/index.md`; the Chinese homepage at `/zh-cn.md`.
- A page whose status is not `available` includes that state in the Markdown export.

Draft pages are excluded from these endpoints. Content endpoints are generated from the same collection as the website, so no duplicated text files need maintenance. Documentation MCP and downloadable integration skills are future work, not available services.

## GitHub Pages

The publication branch is `pages`. GitHub Actions validates that branch and deploys the built site. Pull requests into `pages` are validated and are not deployed. `main` is not used for publication.

| Setting            | Value                               |
| ------------------ | ----------------------------------- |
| Workflow           | `.github/workflows/public-docs.yml` |
| Publication branch | `pages`                             |
| Build output       | `dist`                              |
| Node.js            | 24                                  |
| Site               | https://docs.aiworkforce.run/       |

GitHub Pages is configured for `docs.aiworkforce.run`, so the site is served from the domain root.

## Product accuracy

The initial guides were checked against platform commit `c75d55ab`, including employee creation, employee manifest validation, automation session result collection, and delivery workbench lanes. Contributors should validate UI steps and examples against the current implementation. Do not publish internal source archives, customer material, credentials, or private operational addresses from the adjacent knowledge repository.
