---
title: "示例项目"
description: "把文档中的研究助手包当作完整示例。本站不提供可下载目录。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "ce18b8b9fb5d34d7106b94694828236780eb00ad35c503da818255dd6b475e3b"
---

本文档中的完整示例是一名研究助手：根据给定材料准备简报，并拒绝发布这些材料。它说明的是 Agent 包布局，不是你的部署一定已经发布的模板，也不是可以从本站克隆的仓库。

## 示例包含什么

```text
research-assistant/
├── .claude-plugin/plugin.json
├── .aiworkforce/employee.yaml
├── .aiworkforce/rule.md
├── README.md
└── skills/main/SKILL.md
```

按这个顺序阅读：

1. [员工架构](/zh-cn/build/architecture/)看组成部分。
2. [Agent 定义](/zh-cn/build/employee-definition/)看岗位链路和清单字段。
3. [Skills](/zh-cn/build/skills/)看 `SKILL.md`。
4. [员工测试](/zh-cn/build/testing/)和 [Agent 评测](/zh-cn/software-factory/evaluation/)看三个请求和评测案例。

## 目录里没有的东西

没有市场，没有 zip 下载，也不保证示例的 `id` 存在于你的工作空间。构建者校验通过后，通过[发布与分发](/zh-cn/build/publishing/)发布包。使用者再从该已发布模板创建实例。

端到端的工程路径使用 [Issue 到 Pull Request](/zh-cn/recipes/issue-to-pr/)和[配置并运行交付看板](/zh-cn/getting-started/first-software-factory/)。这些指南跟随产品记录。它们不是额外的示例仓库。
