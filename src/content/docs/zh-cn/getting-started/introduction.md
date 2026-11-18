---
title: "简介"
description: "先完成一项经过验证的软件变更，再用同一套工作流处理自动化和数字员工。"
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "782db3d8b68e4de7da3d81d0b8ee2cba01264971e7699f973a71d79e2a93f50c"
---

AI Workforce 是以工作流为中心的平台。工作流定义工作如何完成。自动化启动这条工作流并让它持续运行。数字员工是执行步骤的智能体。人仍然对范围、接管和发布负责。

同一套模型覆盖一次性任务、来自 GitHub 的事件、日程，以及持续消耗卡片的交付看板。软件工厂、看板工作台和 Issue 处理是这个模型的应用。它们不是三个产品。

默认的第一条路径是一项经过验证的软件变更。[软件工厂](/zh-cn/software-factory/overview/)在交付工作台上用四条回路推进这项变更：[需求到卡片](/zh-cn/software-factory/requirements-to-card/)、[卡片到 Pull Request](/zh-cn/software-factory/card-to-pr/)、[Pull Request 到合并](/zh-cn/software-factory/pr-to-merge/)，以及[信号回到卡片](/zh-cn/software-factory/signal-to-card/)。卡片把已确认的需求、实现、验证证据和团队决定连在一起。

## 选择路径

- **交付第一项变更。** 按[快速入门](/zh-cn/getting-started/quickstart/)把一条 Issue 变成经过审阅的变更。完整示例见[从 Issue 到 PR](/zh-cn/recipes/issue-to-pr/)。需要看板规则时阅读[看板工作台](/zh-cn/workflows/kanban-workbench/)。
- **配置软件工厂。** 项目、仓库或泳道员工还没准备好时，按[配置软件工厂](/zh-cn/getting-started/first-software-factory/)准备。
- **运行第一个工作流。** 按[你的第一个工作流](/zh-cn/getting-started/first-automation/)创建 Job，检查一次手动运行，然后再启用触发规则。需要稳定用词时阅读[工作流概念](/zh-cn/workflows/concepts/)。
- **使用员工。** 按[构建你的第一个数字员工](/zh-cn/getting-started/first-employee/)，从已发布模板创建员工。然后使用[工作空间](/zh-cn/user-guide/workspace/)和 [Agent 对话](/zh-cn/user-guide/agent-chat/)。
- **响应 Issue。** 用 [Issue 自动化](/zh-cn/workflows/issue-automation/)接收 GitHub Issue 或收件箱事项。开发开始之前先确认。

构建者定义可复用的员工。使用者从已发布模板创建工作空间员工。自动化要求一名就绪的员工执行工作。看板在交付工作流里使用这些员工。员工包的编写步骤在[构建数字员工](/zh-cn/build/employee-definition/)里，不在使用指南里。

## 开始之前

你需要某个 AI Workforce 部署上的账号，以及一个工作空间的访问权。普通成员（`NORMAL_USER`）登录后进入**工作台**，没有 **FDE 工作台**，也没有**管理控制台**。数字员工模板缺失时，由 FDE 用户或系统管理员发布。看板模板缺失时，由系统管理员发布。员工起不来时，请能管理该空间数字员工的人检查。改授权由空间创建者、团队 leader 或管理员进行。没有名为 workspace manager 的账号。角色见[团队与访问权限](/zh-cn/administration/teams-access/)。交付工作流还需要仓库连接、就绪的泳道员工，以及验证变更的方法。可用能力取决于该部署。当前版本尚未提供的能力标为**规划中**。

第一次软件变更请使用一条小 Issue，并写上审阅者能够核对的验收标准。如果第一次任务不会修改软件，请使用你可以分享的小段输入，并要求带有明确验收标准的书面输出。

## 怎样算完成

对于软件变更，审阅者能够打开已确认的需求，识别被检查的版本，阅读结果，并看到团队是接受了变更还是退回修复。当工作还应在没有看板的情况下再次发生时，你有一个 Job、一次检查过的运行，以及至多一条你知道去哪里找的触发规则。开发开始之前，请求必须已经是一张已确认的交付卡片。

如果员工无法启动，检查初始化，并请能管理该空间数字员工的人查看执行配置。如果回答或代码变更缺少依据，接受之前先要求来源或验证步骤。

## 下一步

阅读[核心概念](/zh-cn/getting-started/core-concepts/)了解共用词汇。[平台地图](/zh-cn/getting-started/platform-overview/)列出界面。[工作流应用](/zh-cn/workflows/applications/)比较上面这些路径。
