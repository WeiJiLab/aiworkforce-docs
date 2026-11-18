---
title: Build a Viewer App
description: Add a JSON artifact viewer to the platform frontend and try it in the file preview.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Viewer Apps render artifacts inside the platform’s file preview. Build **JSON Size** to show a filename and the UTF-8 byte count of its preview text. You can switch between this view and the built-in JSON formatter on the same file.

You need the platform source and the pnpm version specified in `frontend/package.json`. Work in `frontend/`, alongside the built-in apps for Markdown, HTML, JSON, code, OpenAPI, and pull requests.

## Create the app package

Create `apps/json-size/src/` and save this `apps/json-size/package.json`. The workspace supplies the viewer contract and the host shares React with the app.

```json
{
  "name": "@aiworkforce/viewer-app-json-size",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "dependencies": {
    "@aiworkforce/viewer-contract": "workspace:*",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  }
}
```

## Match JSON previews

Save `apps/json-size/viewer.manifest.json`. The build discovers apps by directory and requires a unique `id`. This rule matches text artifacts with JSON format in preview mode. For equally specific matches, higher priority comes first. The built-in JSON viewer uses 100, so the new app is an alternative in the viewer menu.

```json
{
  "id": "json-size",
  "name": "JSON Size",
  "version": "1.0.0",
  "hostApiVersion": 1,
  "priority": 50,
  "matches": [{ "modes": ["preview"], "kind": "text", "format": "json" }]
}
```

## Render the view

Save `apps/json-size/src/viewer.tsx`. Export the named `Viewer` component and both version numbers. `requestInput` supplies the input for the current request. If a preview is truncated, this count covers only the text the host supplied.

```tsx
import {
  ContentKind,
  requestInput,
  type ViewerProps,
} from "@aiworkforce/viewer-contract";

export const contractVersion = 1;
export const stateVersion = 1;

export function Viewer({ request }: ViewerProps) {
  const { name, content } = requestInput(request);
  if (content.kind !== ContentKind.Text) return null;
  const bytes = new TextEncoder().encode(content.text).byteLength;
  return (
    <p>
      {name} · {bytes} B
    </p>
  );
}
```

## Try it on a file

Run these commands from `frontend/`. The build writes `.viewer-build/viewer-catalog.json` and a versioned module for each app. The dev server serves the catalog and watches app sources for changes.

```sh
pnpm install
pnpm typecheck
pnpm build:viewers
pnpm dev
```

Open `/tests/browser/artifact-viewers.html` on the local dev server. In the changed files list, select `report.json`, open its file preview, then choose **JSON Size** in the artifact viewer menu. You should see `report.json · 121 B` for the sample file. Switch back to **JSON** to see the formatted content.

If the option is missing, check that `json-size` appears in the generated catalog and that you are previewing file content. The example matches `preview` only. For production, `pnpm build` packages the catalog and the viewer modules with the frontend.
