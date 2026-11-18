---
title: "Projects"
description: "Use a Software Factory project to configure a board, repositories, and lane employees. It is not a second workspace."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A workspace is where people and employees collaborate. A **project** in the current product is the Software Factory workbench project: the board, the repositories, the pipeline resources, and the employees assigned to lanes. There is no separate cross-workspace project object. Use this page when delivery work needs that configuration. Everyday tasks stay in the workspace and the inbox.

## What a project configures

Open the delivery workbench from **Automations** at `/automations?tab=board-flow`. The project ties together:

- The board and its lanes. Built-in lanes are Requirements, Development, Test release, Test verification, Production release, and Done. Custom boards can differ.
- Repository connections the cards are allowed to use.
- Pipeline resources required before automated merge or production release.
- The employees that execute lane work.

Creating a card, or even creating the project, does not authorize those employees. Repository credentials belong to the workspace. Each execution employee still needs its own grant. See [code repositories](/integrations/code-repositories/).

## What stays outside the project

Inbox items, chat sessions, and automation runs are not projects. An inbox item can be routed into a workbench draft. A Job can collect items into the inbox or into a workbench project. Neither step confirms requirements. Confirmation is a human decision on the draft. See [work intake](/software-factory/intake/) and [human approval](/user-guide/human-approval/).

If the work does not change software, you do not need a project. Use a workspace employee and review the artifact.
