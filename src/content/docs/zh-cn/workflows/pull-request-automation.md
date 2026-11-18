---
title: "Pull Request 自动化"
description: "当轮询到的 GitHub Pull Request 事件匹配时启动员工。合并仍留在发布泳道。"
status: limited
sidebar:
  badge:
    text: 部分支持
    variant: caution
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "3f9d85c9735f2c85d51bc2c18285de339c6d8cc4031c6ea427dceae0dab7e525"
---

Pull Request 自动化是一条事件驱动的工作流。Job 通过 GitHub Token 轮询观察 Pull Request 活动，并运行一名员工。它和 [Issue 自动化](/zh-cn/workflows/issue-automation/)使用同一套自动化，只是事件不同。它不会自行批准、合并或发布。

## 它是什么

你定义 Job、仓库来源和 Pull Request 条件。自动化把一次匹配的观察入场为运行。员工在这次运行里调查。如果变更还要经过测试和合并，后续是交付看板的发布泳道，不是 Job 内部的第二套引擎。

## 何时使用

用它响应 Pull Request 的打开、更新、转为可审阅、评论或 Review。当平台自己在产出变更，并且必须把它送过测试和发布时，使用[看板工作台](/zh-cn/workflows/kanban-workbench/)。来源是 Issue 而不是 Pull Request 时，使用 Issue 自动化。

## 如何工作

```text
Pull Request 观察 → 规则匹配 → 一次运行 → 员工会话
        → 人阅读结果
        → 只有这项变更已经在看板上时，才进入发布泳道
```

已支持的观察包括：PR 打开、head 更新、转为可审阅、关闭、合并、重新打开、标签、会话评论、Review 提交或撤销，以及代码行评论。条件可以包括目标分支、草稿状态、Review 状态、标签或评论文本。同一条规则上的多个条件按 OR 匹配。

轮询比较当前打开的 Pull Request 列表。在两次轮询之间打开又关闭的 PR 可能观察不到。Review 扫描最近 7 天更新过的 PR。PENDING review 不触发。作者为 Bot 时不触发。本版本没有 `Checks completed`，也没有 Review 讨论串已解决事件。

## 如何配置

1. 按 [GitHub](/zh-cn/integrations/github/) 中的方式，用工作空间的 GitHub Token 连接仓库。
2. 在 Job 上选择 Pull Request 事件，以及应当唤醒员工的最窄条件。在你检查过一次手动运行之前，保持规则停用。
3. 用样例预览。预览不创建运行，也不向 GitHub 发帖。
4. 发布并启用。阅读运行的状态、会话和输入。输入是事件封装。它不包含 Token，也不表示运行时已经检出该提交。
5. 如果员工需要评论或推送，权限来自员工自己的仓库授权。轮询 Token 的读取权限不会授予写权限。

## 一次实际的审阅

触发：一个 Pull Request 被标为可审阅。上下文：事件中的仓库、编号、分支和草稿标记。智能体：Job 的员工。步骤：阅读事件，查看授权允许做什么，并把发现写进会话。验证：你把发现和差异比较。除非员工使用自己的授权真正提交了 GitHub Review，否则平台不会记录一条 GitHub 审阅。输出：运行和会话。人介入的位置：是否接受这份发现，以及发布泳道上的合并。

## 相关指南

- [GitHub](/zh-cn/integrations/github/)
- [事件驱动自动化](/zh-cn/automate/event-driven/)
- [审阅与发布](/zh-cn/software-factory/review-release/)
- [工作流概念](/zh-cn/workflows/concepts/)

## 限制

没有一步启用的「审阅每个 Pull Request」模板，没有 check suite 触发，也不会由这个 Job 自动合并。分支事件无法可靠识别推送者，因此会推送到被监视分支的 Job 可能观察到自己。让这样的 Job 使用独立的输出分支。
