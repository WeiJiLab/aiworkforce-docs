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

## 共用的路径

<figure class="application-route not-content" aria-label="从外部 Issue 到发布决定">
  <div class="application-flow">
    <div class="route-stage intake-stage"><img src="/illustrations/application-intake.svg" width="240" height="86" alt="" />Issue 自动化</div>
    <span class="step">外部 Issue<small>进入收件箱</small></span>
    <span class="step">人工确认<small>生成交付卡片</small></span>
    <div class="route-stage factory-stage"><img src="/illustrations/application-delivery.svg" width="240" height="86" alt="" />软件工厂</div>
    <span class="step">员工执行</span>
    <span class="step">测试验证</span>
    <span class="step decision">发布决定<small>人审阅证据与 PR</small></span>
    <span class="retry">失败退回修正</span>
  </div>
  <figcaption><strong>看板工作台</strong>在泳道上跟踪这张卡片，查看运行记录和交付证据。</figcaption>
</figure>

## 选择一个应用

### 推进软件交付

- [把外部 Issue 转成交付卡片](/zh-cn/workflows/issue-automation/)。Issue 自动化将事项收进收件箱，你确认范围后再转为交付卡片。
- [交付一张已确认的卡片](/zh-cn/software-factory/overview/)。软件工厂按泳道分派员工执行和测试，由你审阅证据并决定是否发布。
- [查看卡片进度并推进下一步](/zh-cn/workflows/kanban-workbench/)。在看板工作台查看卡片所在的泳道和运行记录，验证通过后推进，失败时退回修正。

### 响应事件或定期运行

- [让员工跟进 PR 评审或评论](/zh-cn/workflows/pull-request-automation/)。GitHub PR 事件匹配规则时，Job 启动一次员工运行。合并由人决定。
- [安排定期调研或响应告警](/zh-cn/workflows/research-monitoring/)。用定时 Job 生成可审阅的报告，或用 Sentry、PagerDuty 告警启动调查。

### 定义团队自己的流程

- [组合自定义工作流](/zh-cn/workflows/custom-workflows/)。用 Job 运行独立任务，用泳道编排推进卡片，或用技能工作流复用一组步骤。

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
