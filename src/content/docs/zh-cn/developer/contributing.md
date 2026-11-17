---
title: "参与文档贡献"
description: "在本地运行文档站，提交准确、双语、便于审核的改动。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
  sourceHash: "82d941726e4fb930b264b88030e2872b396f8c57cfd26402ece2bef4524f0c05"
---

你可以通过澄清步骤、修正产品行为或补充有用示例来改进 AI Workforce Docs。内容应来自在产品或当前源码中能够核实的行为，并写清前提和限制，让读者能够复现结果。

## 本地运行

文档站维护在 `aiworkforce-docs` 仓库根目录。目前仓库保持私有，仅仓库成员可以访问，站点尚未部署。使用 `package.json` 支持的 Node 版本，按锁文件安装依赖：

```bash
cd aiworkforce-docs
npm ci
npm run dev
```

在仓库根目录或当前工作树根目录执行这些命令。

打开 Astro 输出的本地地址。英文首页位于 `/`，简体中文首页位于 `/zh-cn/`。检查生产环境搜索与生成资源时，先构建再预览静态输出：

```bash
npm run build
npm run preview
```

搜索索引在生产构建时生成。

## 编写与翻译

在 `src/content/docs/` 中创建 Markdown 或 MDX 页面。对应中文页面位于 `src/content/docs/zh-cn/` 下，保持相同的相对路径。路由标识和技术术语需要对应。英文作为源语言，中文可以自然表达，但不能改变技术含义。

参考 `templates/` 中的模板，提供标题、描述和翻译元数据。先说明结果与前置条件，再解释步骤、预期结果、常见问题和相关页面。Starlight 会渲染页面标题，正文不要重复一级标题。

标记为 `complete` 的中文页面必须记录 `sourceHash`，值为对应英文完整源文件的 SHA-256。英文文件更新后，先审阅中文翻译，再更新哈希。使用 `shasum -a 256 src/content/docs/path/to/page.md` 计算，并将结果作为带引号的字符串写入中文 Frontmatter。不能未经审阅就刷新哈希。

如果尚未完成审阅，将中文页面状态设为 `needs-review`，页面可以带翻译提示发布。缺少中文页面不会阻止英文页面发布；译文就绪前，Starlight 使用语言回退内容。

文档链接使用站内绝对路径。有中文译文时，中文页面应链接中文路由。示例不包含凭据、客户数据、私有原始资料或本地机器路径。提案应明确写成提案，不能描述为已有产品能力。

## 验证改动

提交 Pull Request 前运行项目检查：

```bash
npm run format
npm run format:check
npm run check
npm run build
npm run check:links
```

检查两种语言的路由、导航、窄屏布局和代码示例。构建成功不能替代在产品中实际跟随教程。源行为变化时，也要复核对应翻译与翻译状态。

## 提交审核

保持改动聚焦。说明读者遇到的问题、改动后的行为和已经完成的验证；必要时关联能够解释修正原因的产品变更。人工审核应覆盖技术准确性、术语、翻译和公开信息范围。

获得部署授权后，可以通过 Cloudflare Pages 从仓库根目录构建，将根目录设置留空，构建命令设为 `npm run build`，输出目录设为 `dist/`。项目连接、仓库权限、预览访问权限和自定义域名需要单独配置；仓库是否私有不会自动决定已部署站点的访问权限。

## 相关文档

- [平台架构](/zh-cn/developer/architecture/)
- [术语表](/zh-cn/concepts/glossary/)
