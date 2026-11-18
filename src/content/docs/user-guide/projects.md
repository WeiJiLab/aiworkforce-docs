---
title: "Projects"
description: "Use a Software Factory project to configure a board, repositories, and lane employees. It is not a second workspace."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A workspace is where people and employees collaborate. A **project** in the current product is the Software Factory workbench project: the board, the repositories, the pipeline resources, and the employees assigned to lanes. There is no separate cross-workspace project object. Use this page when delivery work needs that configuration. Everyday tasks stay in the workspace and Task inbox.

## What a project configures

Open **Workbench** (工作台) in the primary navigation. The delivery workbench is at `/automations?tab=board-flow`. **Automations** is the Job page, not this board. The project ties together:

- The board and its lanes. Built-in lanes are Requirements (需求), Development (开发), Test deployment (测试发布), Testing (测试验证), Production (生产发布), and Done (已完成). Custom boards can differ.
- Repository connections the cards are allowed to use.
- Pipeline resources required before automated merge or the Production lane.
- The employees that execute lane work.

A new project is saved in observe mode. Board settings says: “A new project is saved in observe mode · start it after checks pass.” Confirming requirements on a draft does not approve a repository change. Creating a card, or even creating the project, does not authorize those employees. Repository credentials belong to the workspace. Each execution employee still needs its own grant. See [code repositories](/integrations/code-repositories/).

## What stays outside the project

Task inbox items, chat sessions, and automation runs are not projects. An inbox item can be routed into a workbench draft. A Job can collect items into the inbox or into a workbench project. Neither step confirms requirements. Confirmation is a human decision on the draft. See [work intake](/software-factory/intake/) and [human approval](/user-guide/human-approval/).

If the work does not change software, you do not need a project. Use a workspace employee and review the artifact.
