---
title: "快速入门"
description: "用软件工厂将收件箱里的 Issue 推进到代码实现、验证和审阅。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "86506060f62377f8689190f969cf7dd885ae8559d6b5867b6f8df52eca34ad21"
---

用软件工厂把收件箱里的一项小需求推进到可审阅的代码变更。选一个容易复现、便于验收的 Issue，例如修正表单的校验提示。

## 开始之前

使用已有交付项目和看板的工作空间，确认其中有[已连接的代码仓库](/zh-cn/integrations/code-repositories/)，以及运行所需检查的测试环境或流水线。确认相关泳道上的员工已就绪，并获得所需的仓库权限。配置步骤见[配置并运行交付看板](/zh-cn/getting-started/first-software-factory/)和[创建你的第一个数字员工](/zh-cn/getting-started/first-employee/)。

## 1. 在交付看板上确认 Issue

打开工作空间的「收件箱」，检查 Issue 后将其转入目标交付项目。打开生成的草稿，通过卡片上的人工确认请求，确认工作范围、允许修改的仓库和验收标准。

以表单为例，字段留空时应显示修正后的提示，填入有效值时仍能正常提交。

## 2. 跟进实现

从 **Automations** 打开交付工作台（`/automations?tab=board-flow`），选择项目并打开已确认的卡片。启动或恢复开发会话，在卡片上处理提问和审批请求。

根据项目的仓库集成配置，开发泳道会记录 Pull Request 或其他代码引用。打开对应引用查看变更。

## 3. 验证变更并记录审阅决定

打开卡片中的验证结果。核对代码差异是否符合约定范围，并逐项检查是否满足验收标准。确认测试对应的提交或候选版本，以及测试实际使用的环境。

检查失败时，附上未通过的验收项和相关证据，退回修复。修复后重新检查新版本。当卡片关联了已确认的需求、代码变更、验证证据和审阅决定，你就完成了本教程。后续合并和发布按项目的[审阅与发布流程](/zh-cn/software-factory/review-release/)执行。

## 下一步

阅读[从 Issue 到 PR](/zh-cn/recipes/issue-to-pr/)查看完整示例。需要持续收集需求时，可以先用[自动化](/zh-cn/getting-started/first-automation/)收集，再转入看板。
