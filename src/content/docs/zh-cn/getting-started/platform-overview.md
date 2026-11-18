---
title: "平台概览"
description: "找到使用员工、构建能力、自动化工作和交付软件对应的产品界面。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "c9f740d1f6a7cd83523d3b60e7a5b5c2a1196d6f549055196ac3af670f5fac2d"
---

AI Workforce 围绕工作空间、其中的员工，以及这些员工产生的记录来组织工作。下面的界面对应[核心概念](/zh-cn/getting-started/core-concepts/)：使用、构建、自动化、交付和运营。

## 使用工作空间

打开 **Workspaces** 选择工作发生的位置。选中员工并开始对话。会话把这段对话和它的执行历史放在一起。产物用于查看生成的文件；当运行时支持时，也可以查看文件变更。

**任务收件箱**审阅收集或导入的请求。收件箱事项有自己的来源和审阅状态。收集到事项，并不等于批准实现。软件工厂的**项目**是交付配置，包括看板、仓库和泳道员工，不是工作空间的另一个名字。见[项目](/zh-cn/user-guide/projects/)。

## 构建能力

使用者从已发布模板创建员工。构建者在发布前定义岗位、输入、输出、Skills 和工具依赖。[员工架构](/zh-cn/build/architecture/)是这张地图。[MCP 服务](/zh-cn/build/mcp-integration/)说明岗位期望哪些外部工具。把工具名称写进指令不会授予访问权。

## 自动化与交付

**Automations**（`/automations`）保存 Job、触发规则和运行。保存草稿、发布、启用自动执行和手动运行是不同操作。在相应类型可用时，触发可以是日程、Webhook、平台事件、Issue 或 IM 消息。日程只是其中一种触发。

**交付工作台**从 Automations 的 `/automations?tab=board-flow` 进入，是软件工厂的产品界面。它连接已确认的需求、员工执行、验证和人工决定。创建卡片不会配置仓库或流水线。启用自动交付前，先阅读[软件工厂](/zh-cn/software-factory/overview/)。

## 运营

团队访问、平台配置、模型渠道、运行位置和审计回答的是不同的运营问题。[运营与治理](/zh-cn/operate/evaluation-governance/)说明员工授权、工具授权、模型路由、成本、审计和质量门禁如何关联。改一个页面不能修好另一个页面上的问题。

## 第一条工作流

1. 选择工作空间和一个就绪的员工。
2. 给出带有上下文和验收标准的任务。
3. 检查回答、文件和支持证据。
4. 接受、继续修改，或记录人工决定。
5. 如果任务需要重复发生或响应事件，添加自动化，并在启用前检查一次运行。
6. 如果任务会改变软件，在开发开始前于交付卡片上确认请求。

如果页面或操作不存在，检查工作空间权限和部署配置。缺少的连接或运行时必须先配置，员工才能使用。

继续阅读[核心概念](/zh-cn/getting-started/core-concepts/)、[你的第一个自动化](/zh-cn/getting-started/first-automation/)或[你的第一个软件工厂流程](/zh-cn/getting-started/first-software-factory/)。
