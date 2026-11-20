---
title: "Issue 自动化"
description: "从 GitHub Issue 或收件箱事项开始调查，并把已确认的工作送入交付。"
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "7e7228c672deb1330a62a95601f4a8bb6867c3873dfcaf28fb6d92612e3b509f"
---

Issue 自动化在事项出现时启动工作流，并把调查留在可以检查的运行里。当前产品可以接收 GitHub Issue，把任务导入收件箱，并把已确认的事项送到交付看板。它没有分类器、重复检测或优先级模型。

## 它是什么

Issue 事件或导入的任务可成为收件箱事项或 Job 输入。Job 可以调查并把请求收集到收件箱，或直接送入交付看板。开发遵循目标看板的[接入规则](/zh-cn/software-factory/intake/)，包括配置要求的人工确认。

## 何时使用

外部事项需要唤醒员工或进入收件箱时使用它。工作已经从交付草稿开始时，只使用看板。工作单元是已有 Pull Request 而不是 Issue 时，使用 [Pull Request 自动化](/zh-cn/workflows/pull-request-automation/)。

## 如何工作

```text
GitHub Issue 轮询或收件箱导入
        → Job 运行或收件箱事项
        → 交付草稿 → 需求澄清 → 泳道执行 → 验证 → Pull Request
```

| 阶段     | 现在可用                                                               | 规划中，且不是隐藏设置             |
| -------- | ---------------------------------------------------------------------- | ---------------------------------- |
| 事件进入 | 用 GitHub Token 轮询 Issue 的打开、关闭、重新打开、标签和评论          | GitHub App、仓库 Webhook、历史回填 |
| 导入     | GitHub 和云效有选择器。Jira 和 Linear 要在管理员接好来源之后才能导入。 | 自助式 Linear 配置教程             |
| 分类     | 你可以在 Job 任务里要求员工标明它发现了什么                            | 平台分类器                         |
| 重复     | 收集使用稳定的来源身份，避免同一事项被登记两次                         | 语义重复检测                       |
| 优先级   | 由人决定，或由员工在回答里提议一个优先级                               | 优先级引擎                         |
| 分配     | Job 已经指定员工。看板使用泳道上的员工。                               | 在团队中自动路由                   |
| 实现     | 看板按接入规则将已澄清草稿送入开发                                     | 由来源事件直接提交代码             |
| 验证     | 先检查运行，再使用看板测试和验收审阅                                   | 自动把 Issue 标为已解决            |
| 更新     | 收件箱状态、卡片证据，以及交付产生的 Pull Request                      | 轮询器写回 GitHub                  |
| 失败     | 失败、超时或被拒绝的运行；技术失败反复出现后进入死信                   | 手工重放旧事件                     |

轮询细节，包括 60 秒的最短间隔和首次同步的基线，见[事件驱动自动化](/zh-cn/automate/event-driven/)。

## 如何配置

1. 在工作空间的外部服务凭据中保存 GitHub Token。用引用该 Token 的连接导入仓库。Token 不会被复制到 Job 上。
2. 为负责调查的员工创建 Job。添加 GitHub Issue 事件和需要的条件，例如标签。新规则默认停用。
3. 如果 Job 要登记请求，先配置**收集任务 / 事项**，再运行和发布。选择**任务收件箱**时，请求进入审阅队列。选择工作台项目时，请求成为交付草稿。收集界面要求 Claude Code。没有匹配项时也应记录空收集回执。
4. 用样例预览检查匹配条件和输入 schema。再用有代表性的输入手动运行 Job，检查运行和收集回执。
5. 手动结果符合预期后，发布 Job 并启用规则。首次成功轮询会建立基线，不会回放历史。
6. 目标为收件箱时，打开事项并[创建工作台草稿](/zh-cn/user-guide/inbox-tasks/)。目标为工作台项目时，直接在目标看板上打开草稿。遵循目标看板接入规则，在草稿中核对范围、验收标准和允许写入的仓库。

Jira 和 Linear 会作为导入来源出现。它们只通过管理员已经授权的连接导入。GitHub 和云效有自己的仓库或项目选择器。各来源的接法见 [GitHub](/zh-cn/integrations/github/)、[云效 Codeup](/zh-cn/integrations/yunxiao/)、[Jira](/zh-cn/integrations/jira/) 和 [Linear](/zh-cn/integrations/linear/)。

## 一个实际的 Issue

监视的仓库出现新 GitHub Issue 时，Job 调查结果会记在 Run 中。用收集回执核对目标位置。卡片进入开发后，跟进交付卡片和测试记录。流程要求人工决定时，在卡片上答复。

## 失败与恢复

同时检查 Job 和规则。来源暂停后，尚未入场的事件不会进入；重新打开来源会建立新基线，而不是补跑空档。被拒绝的事件，例如 schema 或权限失败，不会无限重试。先修复原因，再让新事件进入。运行与恢复见[运行与恢复](/zh-cn/automate/runs-recovery/)。

## 相关指南

- [GitHub](/zh-cn/integrations/github/)
- [事件驱动自动化](/zh-cn/automate/event-driven/)
- [任务收件箱](/zh-cn/user-guide/inbox-tasks/)
- [从 Issue 到 Pull Request](/zh-cn/recipes/issue-to-pr/)
- [工作流概念](/zh-cn/workflows/concepts/)和[工作流应用](/zh-cn/workflows/applications/)

## 限制

不要写成一条没有人参与、就能分类、排序、分配并解决 Issue 的教程。这些动作今天不是独立的产品阶段。已支持的回路是进入、调查、确认，然后在看板上交付。
