---
title: "Issue 自动化"
description: "从 GitHub Issue 或收件箱事项开始调查，并把已确认的工作送入交付。"
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "acd7cd88146e63e359d0df5d1d55e7068f30e7b6bad5ef5387cb91f8a5cfc655"
---

Issue 自动化在事项出现时启动工作流，并把调查留在可以检查的运行里。当前产品可以接收 GitHub Issue，把任务导入收件箱，并把已确认的事项送到交付看板。它没有分类器、重复检测或优先级模型。

## 它是什么

一条 Issue 事件或一项导入的任务，会成为收件箱事项或 Job 的输入。Job 的员工进行调查。改代码之前，由人确认范围。确认之后，软件工厂和[看板工作台](/zh-cn/workflows/kanban-workbench/)执行这张卡片。Issue 路径和看板路径是同一条带有人工门禁的工作流，不是两套引擎。

## 何时使用

外部事项需要唤醒员工或进入收件箱时使用它。工作已经从交付草稿开始时，只使用看板。工作单元是已有 Pull Request 而不是 Issue 时，使用 [Pull Request 自动化](/zh-cn/workflows/pull-request-automation/)。

## 如何工作

```text
GitHub Issue 轮询或收件箱导入
        → Job 运行或收件箱事项
        → 人确认范围
        → 交付草稿 → 泳道执行 → 验证 → Pull Request
```

| 阶段     | 现在可用                                                               | 规划中，且不是隐藏设置             |
| -------- | ---------------------------------------------------------------------- | ---------------------------------- |
| 事件进入 | 用 GitHub Token 轮询 Issue 的打开、关闭、重新打开、标签和评论          | GitHub App、仓库 Webhook、历史回填 |
| 导入     | GitHub 和云效有选择器。Jira 和 Linear 要在管理员接好来源之后才能导入。 | 自助式 Linear 配置教程             |
| 分类     | 你可以在 Job 任务里要求员工标明它发现了什么                            | 平台分类器                         |
| 重复     | 收集使用稳定的来源身份，避免同一事项被登记两次                         | 语义重复检测                       |
| 优先级   | 由人决定，或由员工在回答里提议一个优先级                               | 优先级引擎                         |
| 分配     | Job 已经指定员工。看板使用泳道上的员工。                               | 在团队中自动路由                   |
| 实现     | 确认之后进入开发泳道                                                   | 由事件直接产生无人值守的提交       |
| 验证     | 先检查运行，再使用看板测试和验收审阅                                   | 自动把 Issue 标为已解决            |
| 更新     | 收件箱状态、卡片证据，以及交付产生的 Pull Request                      | 轮询器写回 GitHub                  |
| 失败     | 失败、超时或被拒绝的运行；技术失败反复出现后进入死信                   | 手工重放旧事件                     |

轮询细节，包括 60 秒的最短间隔和首次同步的基线，见[事件驱动自动化](/zh-cn/automate/event-driven/)。

## 如何配置

1. 在工作空间的外部服务凭据中保存 GitHub Token。用引用该 Token 的连接导入仓库。Token 不会被复制到 Job 上。
2. 为负责调查的员工创建 Job。添加 GitHub Issue 事件和需要的条件，例如标签。新规则默认停用。
3. 用样例预览。预览检查匹配和输入 schema，不创建运行。
4. 只有手动运行的结果可以接受时，才发布 Job 并启用规则。第一次成功读取只建立基线，不回放历史。
5. 如果 Job 要把请求登记进收件箱，添加**收集任务 / 事项**，并选择收件箱或工作台项目。收集界面要求 Claude Code 运行时。聊天里的一句话不是已保存的事项。没有匹配项时，也必须记录这次空收集。
6. 打开收件箱事项，把它路由到工作台草稿，并确认范围、验收标准和仓库。然后按[你的第一个软件工厂工作流](/zh-cn/getting-started/first-software-factory/)继续。

Jira 和 Linear 会作为导入来源出现。它们只通过管理员已经授权的连接导入。GitHub 和云效有自己的仓库或项目选择器。各来源的接法见 [GitHub](/zh-cn/integrations/github/)、[云效 Codeup](/zh-cn/integrations/yunxiao/)、[Jira](/zh-cn/integrations/jira/) 和 [Linear](/zh-cn/integrations/linear/)。

## 一个实际的 Issue

触发：规则所监视的仓库里打开了一个 GitHub Issue。上下文：白名单事件字段和工作空间。智能体：Job 的员工。步骤：调查，按配置收集收件箱事项，停下来等待确认，然后只在已确认的卡片上开发。验证：确认前你阅读运行；开发之后由看板记录测试。输出：运行、收件箱事项，以及之后卡片上的 Pull Request。人介入的位置：启用规则、确认草稿、回答卡片，以及发布。

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
