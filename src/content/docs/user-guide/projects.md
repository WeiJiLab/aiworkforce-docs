---
title: "Projects"
description: "Use a Software Factory project to configure a board, repositories, and lane employees. It is not a second workspace."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

A workspace is where people and employees collaborate. A **project** in the current product is the Software Factory workbench project: the board, the repositories, the pipeline resources, and the employees assigned to lanes. There is no separate cross-workspace project object. Use this page when delivery work needs that configuration. Everyday tasks stay in the workspace and Task inbox.

## What a project configures

Open **Workbench** (工作台) in the primary navigation. The delivery workbench is at `/automations?tab=board-flow`. **Automations** is the Job page, not this board. The project ties together:

- The board and its lanes. Built-in lanes are Requirements (需求), Development (开发), Test deployment (测试发布), Testing (测试验证), Production (生产发布), and Done (已完成). Custom boards can differ.
- Repository connections the cards are allowed to use.
- Pipeline resources required before automated merge or the Production lane.
- The employees that execute lane work.

A board created from a published template activates when initialization succeeds. Review its configuration in the creation wizard before submitting it. Repository credentials belong to the workspace, and each execution employee needs an applicable grant. Review the card’s write scope before development. If the board has no repositories configured and the card has no explicit write scope, supported development flows can use the development employee’s existing workspace repository grants. See [code repositories](/integrations/code-repositories/).

## What stays outside the project

An inbox item can be routed into a workbench draft. A Job can collect items into the inbox or directly into a workbench project. The draft then follows the target board’s [intake rules](/software-factory/intake/).

If the work does not change software, you do not need a project. Use a workspace employee and review the artifact.
