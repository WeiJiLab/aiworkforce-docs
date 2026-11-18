---
title: "工作流应用"
description: "软件工厂、交付看板和 Issue 处理是同一套工作流的应用，不是三套引擎。"
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "16c4ba3bd7bfd4d9486e9a0cdf2d39ebfd4d5191d8f60d6df1bc6fcf457191a8"
---

工作流应用是运行同一平台的一种具体方式。它不自带引擎。每个应用都使用工作流定义、用来启动并继续的自动化、员工或代码执行器、任务、运行、环境、证据、产物和人工确认。

## 选择一个应用

```text
软件工厂         已确认的工程工作 → 经过验证的交付
看板工作台       同一条交付路径，在看板上被观察并持续推进
Issue 自动化     外部 Issue 或收件箱事项 → 已确认的卡片
Pull Request     GitHub PR 事件 → 一次员工运行
调研             日程 → 由人审阅的产物
自定义           Job、泳道编排或技能工作流
```

| 应用         | 你定义的工作流            | 由什么启动                          | 今天可以完成什么                           | 接着读                                                    |
| ------------ | ------------------------- | ----------------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| 软件工厂     | 看板泳道及其员工          | 一张已确认的卡片                    | 执行、测试记录、证据，以及人作出的发布决定 | [概览](/zh-cn/software-factory/overview/)                 |
| 看板工作台   | 这些泳道、批次和泳道编排  | 卡片状态、泳道扫描、编排触发        | 软件交付在看板上持续推进                   | [工作台](/zh-cn/workflows/kanban-workbench/)              |
| Issue 自动化 | 一个 Job，路由之后是工厂  | GitHub Issue 轮询、收件箱导入或收集 | 收件箱事项，以及确认后的交付卡片           | [Issue](/zh-cn/workflows/issue-automation/)               |
| Pull Request | 绑定 PR 事件的 Job        | 轮询到的 PR、Review 和评论事件      | 一次员工运行。不会自动合并。               | [Pull Request](/zh-cn/workflows/pull-request-automation/) |
| 调研与监控   | 一个定时 Job              | Cron，或 Sentry、PagerDuty 事件     | 经过审阅的产物，或由事件启动的运行         | [调研](/zh-cn/workflows/research-monitoring/)             |
| 自定义       | Job、泳道编排或技能工作流 | 手动、Cron，或 Job 上的触发规则     | 界面实际保存下来的执行器图                 | [自定义工作流](/zh-cn/workflows/custom-workflows/)        |

## 共用的路径

```text
软件工厂
  Issue 或草稿 → 确认 → 分派 → 员工 → 环境
        → 构建与测试 → 验证 → 证据 → PR → 发布决定

看板工作台
  泳道上的卡片 → 泳道规则 → 由泳道员工领取
        → 运行 → 证据 → 下一泳道，或在验证失败时退回

Issue 自动化
  Issue 事件或导入 → 收件箱 → 人工确认
        → 上面的软件工厂路径
```

看板的列就是[工作流概念](/zh-cn/workflows/concepts/)中的泳道。它们不是软件工厂旁边的第二套看板。工作台用来观察并继续软件工厂的工作。

## 始终共用的概念

- **工作流。** 泳道、编排或技能定义。不为每个应用另画一张图。
- **自动化。** 创建运行的 Job 或编排触发。
- **智能体。** 数字员工，或泳道上允许列表中的代码执行器。
- **任务与运行。** 收件箱事项或卡片，以及执行记录。
- **环境与证据。** 运行时、仓库授权，以及会话、差异、测试和决定。
- **确认。** 草稿确认、卡片上的问题、接管和发布。

[分派](/zh-cn/software-factory/dispatch/)把就绪卡片交给泳道员工。[编排](/zh-cn/software-factory/orchestration/)推进卡片和批次。不要寻找独立的分派服务。

## 相关指南

- [集成目录](/zh-cn/integrations/overview/)
- [工作流概念](/zh-cn/workflows/concepts/)
- [数字员工](/zh-cn/user-guide/ai-employees/)
- [你的第一个软件工厂工作流](/zh-cn/getting-started/first-software-factory/)
- [从 Issue 到 Pull Request](/zh-cn/recipes/issue-to-pr/)
