---
title: 开发 Viewer App
description: 在平台前端为 JSON 产物添加查看器，并在文件预览中验证。
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "cad2843055c1d42a7b97cf3672f69331a1e0995ccb1593db7eb1a43ad66f8a36"
---

Viewer App 决定一个产物在文件预览里如何展示。这个例子会添加 **JSON Size**，显示文件名和预览文本的 UTF-8 字节数。你可以在同一个文件上切换到内置 JSON 查看器，查看格式化后的内容。

准备好平台前端源码，并使用 `frontend/package.json` 指定的 pnpm 版本。以下步骤都在 `frontend/` 下进行。内置的 Markdown、HTML、JSON、代码、OpenAPI 和拉取请求查看器也在这里的 `apps/` 下。

## 创建 App 包

创建 `apps/json-size/src/` 目录，把下面的内容保存为 `apps/json-size/package.json`。查看器契约由工作区提供，React 由宿主与 App 共用。

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

## 声明匹配哪些产物

创建 `apps/json-size/viewer.manifest.json`。构建脚本会扫描 App 目录，每个 App 都需要唯一的 `id`。下面的规则匹配预览模式下的 JSON 文本。匹配精度相同时，优先级高的查看器排在前面。内置 JSON 查看器的优先级为 100，因此示例会作为另一个选项出现在查看器菜单中。

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

## 渲染预览内容

创建 `apps/json-size/src/viewer.tsx`，按名称导出 `Viewer` 组件和两个版本号。组件通过 `requestInput` 取得当前请求的输入。如果预览被截断，计数只包含宿主传入的那部分文本。

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

## 在文件预览里试用

在 `frontend/` 下运行以下命令。构建会生成 `.viewer-build/viewer-catalog.json` 和各 App 带版本号的模块。开发服务器会提供这份目录，并在 App 源码变更后重新构建。

```sh
pnpm install
pnpm typecheck
pnpm build:viewers
pnpm dev
```

在本地开发服务器打开 `/tests/browser/artifact-viewers.html`。展开变更文件列表，选择 `report.json`，点击「预览文件内容」，然后在「产物查看器」菜单里选择 **JSON Size**。此时应看到 示例文件的结果 `report.json · 121 B`。切回 **JSON** 就能查看格式化后的内容。

如果菜单中没有这个选项，先检查生成的目录中是否有 `json-size`，再确认当前打开的是文件内容预览。示例只匹配 `preview` 模式。发布时运行 `pnpm build`，即可将查看器目录和模块一起打入前端产物。
