---
title: "协作模板"
description: "选择已发布的协作模板，按照它定义的阶段从进入工作流推进到完成。"
sidebar:
  label: "协作模板"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-21"
  sourceHash: "e3a96f0d4c34fda258d35718e9e0cfc0587ba011c30730254545155921070fec"
---

协作模板是一张交付卡片的执行模型。它定义某类工作的阶段、员工要求、交接产物和完成规则，为看板提供可执行的流程。

在配置员工或编写看板顺序前，先选择协作模板。已发布的模板版本提供后续阶段遵循的交接契约。工作空间可以为这些阶段绑定不同的员工实例，但阶段名称、产物 key 和完成方式仍然属于对应的模板版本。

打开**工作台 → 新建交付项目**，选择已发布模板，并在创建项目之前展开**查看完整流程与自动化**。模板会成为看板的可执行工作流。

## 从协作模板开始

| 要推进的工作                        | 从这个模板开始                                                                                          | 第一个具名产物                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 把需求说明整理成可开发卡片          | `spec-intake-to-rfc-ticket-breakdown`                                                                   | `acceptance`                                                  |
| 把已确认卡片推进到草稿 Pull Request | `pr-author`                                                                                             | `implementation_brief`                                        |
| 在合并或发布前检查变更              | `pr-spec-adherence-check`、`customer-escalation-to-product-fix` 或 `release-candidate-readiness-review` | `acceptance_criteria`、`reproduction` 或 `candidate_evidence` |
| 把反馈、故障或支持问题变成工作      | `customer-escalation-to-product-fix`、`incident-investigator` 或 `docs-gap-from-support-ticket`         | `reproduction`、`event_timeline` 或 `gap_analysis`            |

本节下面的四篇指南分别说明这些以模板为中心的路径。它们解释如何选择和运行模板，不会额外定义一套覆盖已发布场景的工作流。

## 已发布的场景模板

| 模板                                                      | 阶段和交接产物                                                                                                | 完成方式       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------- |
| `customer-escalation-to-product-fix` · 客户反馈到修复验证 | 客服研判 → `reproduction`；开发修复 → `pull_request`；测试验证 → `verification`；客服回复草稿 → `reply_draft` | `HUMAN_REVIEW` |
| `spec-intake-to-rfc-ticket-breakdown` · 需求到可开发卡片  | 需求分析 → `acceptance`；技术评审 → `work_order`                                                              | `HUMAN_REVIEW` |
| `release-notes-multi-audience` · 发布说明到审阅稿         | 发布取证 → `change_set`；文档撰写 → `release_draft`；产品审阅 → `reviewed_notes`                              | `HUMAN_REVIEW` |
| `pr-author` · Issue 到草稿 PR                             | 需求核对 → `implementation_brief`；实现与提审 → `draft_pr`                                                    | `AUTO`         |
| `pr-spec-adherence-check` · PR 验收标准核对               | 规格整理 → `acceptance_criteria`；逐条核验 → `adherence_report`                                               | `AUTO`         |
| `risk-based-test-plan-generator` · 风险驱动测试计划       | 风险分析 → `risk_register`；测试设计 → `test_plan`                                                            | `AUTO`         |
| `docs-gap-from-support-ticket` · 支持工单到文档补缺       | 支持分析 → `gap_analysis`；文档编辑 → `documentation_draft`                                                   | `AUTO`         |
| `incident-investigator` · 故障调查与复盘                  | 事件调查 → `event_timeline`；复盘分析 → `incident_report`                                                     | `HUMAN_REVIEW` |
| `release-candidate-readiness-review` · 候选版本放行评审   | 发布取证 → `candidate_evidence`；就绪评审 → `readiness_report`                                                | `HUMAN_REVIEW` |
| `weekly-product-digest` · 产品周报审阅                    | 本周素材整理 → `weekly_sources`；周报编辑 → `weekly_digest`                                                   | `HUMAN_REVIEW` |

`AUTO` 表示最后阶段返回 `READY` 并完成收尾后，卡片可以自动完成。`HUMAN_REVIEW` 表示最后一个产物会交给人工确认。任何阶段都可以在缺少信息、权限或决定时返回 `NEEDS_REVIEW`。

## 用一张卡片运行模板

1. 选择与工作相符的已发布场景，查看它的阶段、必配员工、产物和完成规则。
2. 创建交付项目，为每个必配阶段绑定一名就绪员工，并授予该阶段所需的仓库和外部能力。
3. 在第一个阶段创建卡片，写入来源材料、仓库范围、环境范围和验收条件。
4. 打开编排运行，查看每个阶段的具名产物。后续阶段会收到模板 `requires` 映射声明的上游产物。
5. 审阅最后一个产物。模板使用 `HUMAN_REVIEW` 时记录人工确认，模板使用 `AUTO` 时等待收尾完成。

模板完成规则只覆盖这张卡片描述的交付物，不会自行发布外部公告或批准生产发布。创建和发布自定义场景见[模板](/zh-cn/build/templates/)与[发布与分发](/zh-cn/build/publishing/)。
