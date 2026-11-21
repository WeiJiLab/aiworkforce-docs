---
title: "BoardFlow 看板模板"
description: "选择已经定义泳道、交接产物和完成规则的已发布工作流场景。"
sidebar:
  label: "BoardFlow 看板模板"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-21"
  sourceHash: "e05dd1de24158466a506e639b86fce9f2b25a53edce21861906ac46030d813cc"
---

已发布的看板模板定义交付看板的阶段、员工任务、必配员工、交接 Schema 和自动化配方。当前 BoardFlow 目录包含 10 个精选场景。每个场景从一张卡片开始，每个阶段都交付一个具名产物，后续阶段可以读取这个产物。

管理员在**管理控制台 → 看板模板**维护模板。工作空间在**工作台 → 新建交付项目**打开创建向导，选择已发布模板，并在创建看板前展开**查看完整流程与自动化**。模板中的阶段会成为看板可执行的泳道。为每个必配阶段指派一名就绪的数字员工。

`AUTO` 表示最后一个阶段返回 `READY` 并完成收尾编排后，卡片自动完成。`HUMAN_REVIEW` 表示最后一个产物会进入人工确认泳道。任何阶段都可以在缺少信息、权限或决定时返回 `NEEDS_REVIEW`。模板的完成规则只覆盖这张卡片描述的交付物，不会自行发布外部公告或批准生产发布。

## 当前场景模板

| 模板                                                      | 阶段和交接产物                                                                                                | 完成方式 | 适用场景                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------- |
| `customer-escalation-to-product-fix` · 客户反馈到修复验证 | 客服研判 → `reproduction`；开发修复 → `pull_request`；测试验证 → `verification`；客服回复草稿 → `reply_draft` | 人工确认 | 客户报告需要可复现的修复、验证和回复草稿     |
| `spec-intake-to-rfc-ticket-breakdown` · 需求到可开发卡片  | 需求分析 → `acceptance`；技术评审 → `work_order`                                                              | 人工确认 | 说明需要在开发前明确范围、验收标准和技术约束 |
| `release-notes-multi-audience` · 发布说明到审阅稿         | 发布取证 → `change_set`；文档撰写 → `release_draft`；产品审阅 → `reviewed_notes`                              | 人工确认 | 版本变更需要面向多个受众撰写有来源的说明     |
| `pr-author` · Issue 到草稿 PR                             | 需求核对 → `implementation_brief`；实现与提审 → `draft_pr`                                                    | 自动完成 | 已确认的 Issue 可以直接进入实现并提交草稿 PR |
| `pr-spec-adherence-check` · PR 验收标准核对               | 规格整理 → `acceptance_criteria`；逐条核验 → `adherence_report`                                               | 自动完成 | Pull Request 需要对照规格进行可追溯核验      |
| `risk-based-test-plan-generator` · 风险驱动测试计划       | 风险分析 → `risk_register`；测试设计 → `test_plan`                                                            | 自动完成 | 功能或发布需要根据风险和影响面制定测试计划   |
| `docs-gap-from-support-ticket` · 支持工单到文档补缺       | 支持分析 → `gap_analysis`；文档编辑 → `documentation_draft`                                                   | 自动完成 | 支持问题需要经过核实的回答或文档改动         |
| `incident-investigator` · 故障调查与复盘                  | 事件调查 → `event_timeline`；复盘分析 → `incident_report`                                                     | 人工确认 | 故障需要有来源的时间线、根因假设和后续行动   |
| `release-candidate-readiness-review` · 候选版本放行评审   | 发布取证 → `candidate_evidence`；就绪评审 → `readiness_report`                                                | 人工确认 | 候选版本需要基于证据做放行或暂缓决定         |
| `weekly-product-digest` · 产品周报审阅                    | 本周素材整理 → `weekly_sources`；周报编辑 → `weekly_digest`                                                   | 人工确认 | 需要根据反馈和已交付变更整理每周产品更新     |

上面的阶段名称和产物 key 来自已发布的场景映射。工作空间可以为这些阶段绑定不同的员工实例，交接契约仍然属于对应的模板版本。

## 软件工厂指南如何对应模板

这些指南是目录中的工作入口。配置员工前，先选择与工作相符的场景。

| 指南                                                        | 对应的模板场景                                                                                                                   |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [需求到卡片](/zh-cn/software-factory/requirements-to-card/) | `spec-intake-to-rfc-ticket-breakdown`                                                                                            |
| [卡片到 Pull Request](/zh-cn/software-factory/card-to-pr/)  | `pr-author`，或 `customer-escalation-to-product-fix` 中的开发阶段                                                                |
| [Pull Request 到合并](/zh-cn/software-factory/pr-to-merge/) | `pr-spec-adherence-check`、`customer-escalation-to-product-fix` 中的验证阶段，或 `release-candidate-readiness-review`            |
| [信号到卡片](/zh-cn/software-factory/signal-to-card/)       | 先完成工作进入，再为结果卡片选择 `customer-escalation-to-product-fix`、`incident-investigator` 或 `docs-gap-from-support-ticket` |

四条指南用于归纳相关工作，并不表示每块看板都必须按相同顺序使用内置的需求、开发、测试发布、测试验证和生产发布泳道。真正执行的阶段由所选看板模板及其已发布版本决定。

## 用一张卡片跟进模板

1. 选择已发布场景，查看阶段、必配员工和完成规则。
2. 创建看板，为每个必配阶段绑定一名就绪员工，并授予该阶段所需的仓库和外部能力。
3. 在第一个阶段新建一张卡片，写入来源材料，以及场景要求的仓库或环境范围。
4. 打开编排运行，查看每个阶段的具名产物。后续阶段会收到 `requires` 映射声明的上游产物。
5. 最后一个产物就绪后，按模板完成规则继续。人工确认会把决定记录在卡片上，再进入收尾。

看板初始化流程见[运行第一个自动化任务](/zh-cn/getting-started/first-automation/)。模板编写和发布见[模板](/zh-cn/build/templates/)与[发布与分发](/zh-cn/build/publishing/)。
