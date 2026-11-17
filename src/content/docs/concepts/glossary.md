---
title: "Glossary"
description: "Use consistent English and Simplified Chinese terms across the product documentation."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

This glossary defines the shared product vocabulary used by users, builders, and developers. English names remain the reference for technical identifiers; Chinese explanations describe the same concepts in natural product language.

## Shared vocabulary

| English             | 简体中文     | Meaning                                                         |
| ------------------- | ------------ | --------------------------------------------------------------- |
| Workspace           | 工作空间     | Shared context for employees, resources, and collaboration.     |
| AI employee         | 数字员工     | A configured worker with a defined responsibility.              |
| Employee template   | 员工模板     | Reusable capabilities published for creating employees.         |
| Employee definition | 员工定义     | Responsibilities, inputs, outputs, and capability requirements. |
| Agent               | 智能体       | An execution participant or capability, depending on context.   |
| Skill               | 技能         | Instructions describing how to perform a task.                  |
| Plugin              | 插件         | A package of reusable capabilities.                             |
| Tool                | 工具         | An operation available to an executing agent.                   |
| MCP server          | MCP 服务     | An external tool provider using the Model Context Protocol.     |
| Session             | 会话         | Conversation and associated execution context.                  |
| Task inbox          | 任务收件箱   | The review surface for incoming requests.                       |
| Issue               | 事项 / Issue | A tracked request with its own source and review state.         |
| Automation          | 自动化       | A definition of repeatable work and configured triggers.        |
| Run                 | 运行         | One execution of an automation or work process.                 |
| Artifact            | 产物         | A generated or modified output that can be inspected.           |
| Evidence            | 证据         | Information supporting a claim or review decision.              |
| Delivery workbench  | 交付工作台   | The product surface for coordinated software delivery.          |
| Delivery card       | 交付卡片     | Work tracked through a configured board.                        |
| Human review        | 人工审核     | A person's inspection and decision about work.                  |

## Read terms in context

An employee template and a workspace employee are different: publishing a template makes capabilities available, while creating an employee initializes a worker in a workspace.

A session, an inbox issue, and an automation run are also distinct. A run may collect an issue; the issue can still await review. A session can produce an artifact without proving that the related request is resolved.

Use **artifact** when referring to the output itself and **evidence** when referring to what supports a conclusion. For example, a report is an artifact; its source excerpts help provide evidence.

## Writing and translation

Keep technical identifiers, field names, and paths unchanged inside code. Translate explanatory prose, labels, and task context without changing the underlying behavior. Prefer the terms above when linking pages so readers can move between learning paths without learning a second vocabulary.

Continue with [core concepts](/getting-started/core-concepts/) or the [contribution guide](/developer/contributing/).
