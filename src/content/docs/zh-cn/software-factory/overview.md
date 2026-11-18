---
title: "软件工厂概览"
description: "让工程需求从收件箱或交付看板进入实现、验证与审阅。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "faee712a9adf29a57b9a41ddf8bc7b6ce4200934a11d62fd484de30871dea7f4"
---

软件工厂是 AI Workforce 的工程交付工作流，帮助团队把已确认的需求推进到可验证的代码变更。在 **Automations** 中打开**交付工作台**（`/automations?tab=board-flow`）。一张交付卡片汇集同一项变更的需求、执行记录、测试结果和审阅决定。

## 选择工作流

| 目标                 | 可以得到什么                                                                   | 从哪里开始                                                                                    |
| -------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| 整理待处理需求       | 收件箱事项或交付草稿，包含来源，以及团队确认后的范围、验收标准和允许改动的仓库 | [需求接收与待办](/zh-cn/software-factory/intake/)                                             |
| 实现并验证一项 Issue | 关联代码变更或 PR 的交付卡片，以及受测版本和审阅证据                           | [快速入门](/zh-cn/getting-started/quickstart/)或[从 Issue 到 PR](/zh-cn/recipes/issue-to-pr/) |
| 审阅变更并跟进发布   | 审阅决定，以及项目配置了相应阶段时的合并、部署和资源清理记录                   | [审阅与发布](/zh-cn/software-factory/review-release/)                                         |
| 定期收集事项         | 来自已配置来源的收件箱事项或交付草稿，以及可检查的采集回执                     | [自动化概念](/zh-cn/automate/fundamentals/)                                                   |

## 从进入到 Pull Request

1. 将收件箱中的 Issue 转成交付工作台草稿。开发开始前，由人确认范围、验收标准和允许改动的仓库。
2. 从已确认的卡片启动或继续开发。泳道上配置的员工在会话中执行，并关联代码引用或 PR。
3. 如果看板配置了测试准备和测试泳道，跟进候选版本的验证过程。需要一起测试的卡片归入同一批次。对照已确认的验收标准，核对受测版本、环境和测试结果。
4. 根据卡片证据接受变更、退回修复，或记录豁免决定。项目配置了合并和发布时，分别查阅合并、发布和资源清理记录。

内置泳道覆盖需求、开发、测试准备、测试、合并到主干和完成。使用自定义看板时，按项目配置的泳道和操作推进。[Agent 编排](/zh-cn/software-factory/orchestration/)说明卡片和批次如何流转。

## 先配置什么

[交付项目](/zh-cn/user-guide/projects/)把看板、仓库和流水线资源，以及各泳道的执行员工关联起来。配置[仓库连接](/zh-cn/integrations/code-repositories/)，再给执行员工授予所需的仓库访问权限。[配置并运行交付看板](/zh-cn/getting-started/first-software-factory/)提供就绪检查项和卡片受阻时的处理方法。

## 人留在回路里

团队在开发前确认需求范围，并在验证后根据卡片证据作出决定。配置采集后，自动化 Job 可以把 Issue 收集到收件箱或工作台，草稿由人确认后进入开发。执行过程中，可以在卡片上回答问题或接管处理。准备继续时，明确交还工作。涉及共享批次的决定，需要先核对批次中的卡片。

## 架构

| 层次           | 如何支撑交付                                                                                       | 相关文档                                                                                                                                                                                                     |
| -------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 需求接收与编排 | 工作台记录草稿、卡片和批次。交付项目把就绪工作分配给泳道上的员工。                                 | [需求接收](/zh-cn/software-factory/intake/)、[任务分派](/zh-cn/software-factory/dispatch/)、[Agent 编排](/zh-cn/software-factory/orchestration/)                                                             |
| 执行           | 交付与采集使用 Claude Code。工作台在员工配置的执行环境中运行泳道任务，例如平台运行时或已授权设备。 | [Harness](/zh-cn/software-factory/harness/)、[环境](/zh-cn/software-factory/environments/)                                                                                                                   |
| 验证与证据     | 已配置的流水线提供构建和测试结果。审阅者对照验收标准检查受测变更，并查看证据。                     | [CI/CD](/zh-cn/software-factory/cicd/)、[构建与测试](/zh-cn/software-factory/build-test/)、[业务验证](/zh-cn/software-factory/business-verification/)、[证据](/zh-cn/software-factory/evidence/)             |
| 治理           | 门禁使用已记录的结果与决定。合并和生产发布需要各自的仓库与流水线集成。                             | [评测](/zh-cn/software-factory/evaluation/)、[可观测性](/zh-cn/software-factory/observability/)、[质量门禁](/zh-cn/software-factory/quality-gates/)、[发布治理](/zh-cn/software-factory/release-governance/) |
