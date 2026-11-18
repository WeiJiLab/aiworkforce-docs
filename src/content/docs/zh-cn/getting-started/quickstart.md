---
title: "在已有看板上交付第一条 Issue"
description: "用已有交付看板推进一条 Issue，审阅代码变更和验证证据。"
prev: false
next: false
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "4eef11e5e1b698a2560d6b3c0cc3eb53914d56ec45829966550e2e114676d9ce"
---

用已有的软件工厂看板完成一条 Issue 的交付审阅。完成后，卡片会关联已确认的需求、代码引用、验证证据和你的审阅决定。

## 开始之前

选一条范围小、易复现的 Issue，并确认所在工作空间具备以下条件。

- 已有交付项目和看板，你有权限确认和审阅卡片。
- [代码仓库已连接](/zh-cn/integrations/code-repositories/)，相关泳道上的员工已就绪，并获得所需的仓库权限。
- 已有运行所需检查的测试环境或流水线。

如果工作空间还未就绪，请先[配置交付看板](/zh-cn/getting-started/first-software-factory/)。也可以直接[查看完整示例](/zh-cn/recipes/issue-to-pr/)。

## 1. 在交付看板上确认 Issue

打开工作空间的**任务收件箱**，检查 Issue 后将其转入目标交付项目。打开生成的草稿，通过卡片上的人工确认请求，确认工作范围、允许修改的仓库和验收标准。确认需求只记录这个范围，不会同时批准修改仓库，也不会授予凭据。

以项目表单为例，名称留空时应显示「请输入项目名称。」这条提示。填写有效名称时，仍能正常创建项目。

## 2. 跟进实现

在主导航打开**工作台**（地址是 `/automations?tab=board-flow`），选择项目并打开已确认的卡片。启动或恢复开发会话，在卡片上处理提问和审批请求。

根据项目的仓库集成配置，开发泳道会记录 Pull Request 或其他代码引用。打开对应引用查看变更。

## 3. 验证变更并记录审阅决定

打开卡片中的验证结果，核对代码差异是否符合约定范围。逐项确认验收结果、受测提交或候选版本，以及实际使用的环境。以项目表单为例，分别验证名称留空和填写有效名称的提交结果。

检查失败时，附上未通过的验收项和相关证据，退回修复。修复后验证新版本，并在卡片上记录审阅决定和所依据的证据。合并和发布按项目的[审阅与发布流程](/zh-cn/software-factory/review-release/)执行。

## 下一步

如果卡片停止推进，参见[排查受阻的交付卡片](/zh-cn/getting-started/delivery-board-troubleshooting/)，确认下一步怎么处理。

阅读[从 Issue 到 PR](/zh-cn/recipes/issue-to-pr/)查看完整示例。需要持续收集需求时，可以先用[自动化](/zh-cn/getting-started/first-automation/)收集，再转入看板。
