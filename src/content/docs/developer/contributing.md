---
title: "Contribute to the docs"
description: "Run the documentation site locally and submit accurate, bilingual, reviewable changes."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Help improve AI Workforce Docs by fixing an unclear step, correcting product behavior, or adding a useful example. Start from behavior you can verify in the product or its current source. Describe prerequisites and limits so readers can reproduce the result.

## Run the site locally

The public documentation source is maintained in `aiworkforce-docs`. For local development, use a Node version supported by `package.json` and install the locked dependencies.

```bash
cd aiworkforce-docs
npm ci
npm run dev
```

Run these commands from the repository root, or the root of your active worktree.

Open the local address printed by Astro. The English site is at `/`; Simplified Chinese is at `/zh-cn/`. Build and preview the static output when checking production search and generated assets:

```bash
npm run build
npm run preview
```

Search indexes are generated during the production build.

## Write and translate a page

Create a Markdown or MDX page under `src/content/docs/`. The corresponding Chinese page uses the identical relative path under `src/content/docs/zh-cn/`. Keep route identities and technical terms aligned. English is the source language; Chinese should read naturally while preserving the same technical meaning.

Use the templates in `templates/` and provide a title, description, and translation metadata. Begin with the outcome and prerequisites, then explain the steps, expected result, common problems, and related pages. Starlight renders the page title, so do not repeat it as a top-level heading.

A Chinese page marked `complete` must record `sourceHash`, the SHA-256 of the entire corresponding English source file. After the English file changes, review the Chinese translation before updating its hash. Compute the hash with `shasum -a 256 src/content/docs/path/to/page.md` and copy it into the Chinese frontmatter as a quoted string. Never refresh the hash without reviewing the translation.

If review is pending, set the Chinese page's status to `needs-review`. It can publish with a translation notice while the review is outstanding. A missing Chinese page does not block the English page from publishing; Starlight serves the language fallback until the translation is available.

Use absolute site paths for documentation links. Chinese pages should link to Chinese routes when a translation exists. Keep credentials, customer data, private source material, and local machine paths out of examples. Label proposals as proposals rather than describing them as existing product features.

## Validate the change

Run the project's checks before opening a pull request:

```bash
npm run format
npm run format:check
npm run check
npm run build
npm run check:links
```

Review both language routes, navigation, narrow-screen layout, and code examples. A successful build does not replace following the tutorial in the product. If source behavior changes, review the translated page and its translation status too.

## Submit for review

Keep the change focused. Explain the reader's problem, the resulting behavior, and the validation you performed. Link relevant product changes when they explain a correction. Human review should confirm technical accuracy, terminology, translation, and the absence of private information.

Open the pull request against `main`. GitHub Actions validates the pull request and uploads the built site as an artifact. A push to `main` publishes `dist/` to GitHub Pages after validation succeeds. The published site is [AI Workforce Docs](https://docs.aiworkforce.run/).

## Related guides

- [Platform architecture](/developer/architecture/)
- [Glossary](/concepts/glossary/)
