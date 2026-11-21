---
title: "协作模板"
description: "选择用于交付工作流的已发布协作模板。"
sidebar:
  label: "协作模板"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-21"
  sourceHash: "ac9b1dd7a9257fcf52c46fd6b619eed0f2609a47e0ad27a2caeebba2671f82cc"
---

协作模板是用于交付看板的已发布工作流场景。它定义阶段、员工绑定、交接和自动化，帮助一张卡片从进入工作流推进到完成。

管理员在管理控制台发布和维护协作模板。在工作空间打开**工作台 → 新建交付项目**，选择已发布模板，并在创建交付项目前查看流程。选定的模板会为项目提供初始工作流。

## 当前场景模板

| 模板 | 适用场景 |
| --- | --- |
| `customer-escalation-to-product-fix` · 客户反馈到修复验证 | 将客户反馈推进到修复、验证和回复草稿 |
| `spec-intake-to-rfc-ticket-breakdown` · 需求到可开发卡片 | 把模糊需求整理成范围明确、可开发的卡片 |
| `release-notes-multi-audience` · 发布说明到审阅稿 | 为多个受众准备有来源的发布说明 |
| `pr-author` · Issue 到草稿 PR | 将已确认的 Issue 推进到实现和草稿 Pull Request |
| `pr-spec-adherence-check` · PR 验收标准核对 | 对照规格检查 Pull Request |
| `risk-based-test-plan-generator` · 风险驱动测试计划 | 根据功能或发布风险生成测试计划 |
| `docs-gap-from-support-ticket` · 支持工单到文档补缺 | 从支持问题定位并补全文档缺口 |
| `incident-investigator` · 故障调查与复盘 | 整理故障证据并形成复盘 |
| `release-candidate-readiness-review` · 候选版本放行评审 | 在候选版本决策前审阅相关证据 |
| `weekly-product-digest` · 产品周报审阅 | 汇总反馈和产品变更，形成每周更新 |

## 软件工厂指南

这些指南是面向任务的工作入口。配置员工前，先选择与工作相符的协作模板。

| 指南 | 建议模板 |
| --- | --- |
| [需求到卡片](/zh-cn/software-factory/requirements-to-card/) | `spec-intake-to-rfc-ticket-breakdown` |
| [卡片到 Pull Request](/zh-cn/software-factory/card-to-pr/) | `pr-author` 或 `customer-escalation-to-product-fix` |
| [Pull Request 到合并](/zh-cn/software-factory/pr-to-merge/) | `pr-spec-adherence-check` 或 `release-candidate-readiness-review` |
| [信号到卡片](/zh-cn/software-factory/signal-to-card/) | `customer-escalation-to-product-fix`、`incident-investigator` 或 `docs-gap-from-support-ticket` |

## 使用协作模板

1. 选择与工作相符的已发布模板。
2. 创建交付项目，为必配阶段指派已就绪的员工。
3. 将来源材料写入第一张卡片，然后跟进运行并审阅产物。

初始化流程见[运行第一个自动化任务](/zh-cn/getting-started/first-automation/)。创建和发布模板见[模板](/zh-cn/build/templates/)与[发布与分发](/zh-cn/build/publishing/)。
