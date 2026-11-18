---
title: "Glossary"
description: "Use one English and Simplified Chinese vocabulary for workflows, automation, agents, runs, and evidence."
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

This glossary is the shared vocabulary for users, builders, and developers. English names remain the reference for technical identifiers. Chinese explanations describe the same concepts in product language.

## Shared vocabulary

| English             | 简体中文     | Meaning                                                                                                        |
| ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| Workflow            | 工作流       | Reusable definition of how work is performed. Not a synonym of automation.                                     |
| Automation          | 自动化       | The mechanism that starts a workflow and keeps later runs coming. In the product, a Job plus triggers.         |
| Job                 | 自动化任务   | One automation definition: the task, one executor, and that Job's triggers.                                    |
| Pipeline            | 编排         | A graph of executors on a delivery-board lane. Requires at least two executors to enable.                      |
| Agent               | 智能体       | The execution participant inside a workflow. The organizing product model stays Workflow → Automation → Agent. |
| AI employee         | 数字员工     | A configured workspace form of an agent—not a separate product model. Demoted under Agents in Docs.            |
| Employee template   | 员工模板     | Reusable capabilities published for creating employees.                                                        |
| Employee definition | 员工定义     | Responsibilities, inputs, outputs, and capability requirements.                                                |
| Skill               | 技能         | A reusable method for one kind of task.                                                                        |
| Plugin              | 插件         | A package of skills and related agents.                                                                        |
| Tool                | 工具         | An operation available to an executing agent.                                                                  |
| MCP server          | MCP 服务     | An external tool provider using the Model Context Protocol. Naming it does not grant access.                   |
| Run                 | 运行         | One execution instance of a Job or a pipeline.                                                                 |
| Task                | 任务         | A unit of work: an inbox item, a delivery card, or a pipeline node.                                            |
| Session             | 会话         | Conversation and associated execution context.                                                                 |
| Runtime             | 运行时       | The execution infrastructure that runs a session.                                                              |
| Environment         | 环境         | The workspace resources where execution happens: repositories, devices, and pipelines.                         |
| Artifact            | 产物         | A generated or modified output that can be inspected.                                                          |
| Evidence            | 证据         | Information that supports a claim or a review decision.                                                        |
| Task inbox          | 任务收件箱   | The review surface for incoming requests.                                                                      |
| Issue               | 事项 / Issue | A tracked request with its own source and review state.                                                        |
| Delivery workbench  | 交付工作台   | The board where software-delivery cards move through lanes.                                                    |
| Delivery card       | 交付卡片     | One engineering work item on that board.                                                                       |
| Lane                | 泳道         | A board column with execution behavior. Built-in lanes are not hand-edited status labels.                      |
| Human review        | 人工审核     | A person's inspection and decision about work.                                                                 |
| Dispatch            | 分派         | Assigning a ready card to the employee configured on its lane.                                                 |
| Orchestration       | 编排推进     | The workbench moving cards and batches through lanes. The pipeline screen is also called 编排.                 |

The product label **编排** covers both the pipeline screen and, in these docs, the board's movement of cards. When the sentence is about the graph editor, it means the pipeline. When it is about cards advancing, it means orchestration. [Workflow concepts](/workflows/concepts/) keeps the two apart.

## Read terms in context

An employee template and a workspace employee are different. Publishing a template makes capabilities available. Creating an employee initializes a worker in a workspace.

A workflow and an automation are different. You can run a workflow by hand with no trigger enabled. A trigger without a workflow only names a time or an event.

A session, an inbox issue, and a run are also distinct. A run may collect an issue. The issue can still await review. A session can produce an artifact without proving that the request is resolved.

Use **artifact** for the output itself and **evidence** for what supports a conclusion. A report is an artifact. Its source excerpts are evidence.

Workflow verification checks this run against acceptance criteria. Employee evaluation checks a package or plugin. Do not use one word for both.

## Writing and translation

Keep technical identifiers, field names, and paths unchanged inside code. Translate explanatory prose. Prefer the terms above when linking pages.

Continue with [core concepts](/getting-started/core-concepts/) or the [contribution guide](/developer/contributing/).
