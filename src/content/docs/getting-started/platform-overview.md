---
title: "Platform overview"
description: "Find the product surfaces for using employees, building capabilities, automating work, and delivering software."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

AI Workforce organizes work around a workspace, its employees, and the records those employees create. The surfaces below match the [core concepts](/getting-started/core-concepts/): use, build, automate, deliver, and operate.

## Use the workspace

Open **Workspaces** to choose where work happens. Select an employee and start a conversation. A session keeps that conversation and its execution history together. Artifacts let you inspect produced files and, when the runtime supports it, file changes.

The **Task inbox** reviews collected or imported requests. An inbox item has its own source and review state. Collecting it does not approve implementation. A Software Factory **project** is the delivery configuration — board, repositories, and lane employees — not a second name for the workspace. See [Projects](/user-guide/projects/).

## Build capabilities

Users create employees from published templates. Builders define the role, inputs, outputs, skills, and tool dependencies before publishing. [Employee architecture](/build/architecture/) is the map. [MCP servers](/build/mcp-integration/) document which external tools a role expects. Putting a tool name in instructions does not grant access.

## Automate and deliver

**Automations** at `/automations` hold Jobs, triggers, and runs. Saving a draft, publishing, enabling automatic execution, and running manually are different actions. Triggers can be schedules, webhooks, platform events, Issues, or IM messages where that type is available. A schedule is only one of those triggers.

The **delivery workbench**, opened from Automations at `/automations?tab=board-flow`, is the Software Factory surface. It connects confirmed requirements, employee execution, verification, and human decisions. Creating a card does not configure a repository or a pipeline. Read [Software Factory](/software-factory/overview/) before enabling automatic delivery.

## Operate

Team access, platform configuration, model channels, runtime placement, and audit answer different operational questions. [Operate and govern](/operate/evaluation-governance/) explains how employee grants, tool authorization, model routing, cost, audit, and quality gates relate. Changing one screen does not repair another.

## A first workflow

1. Choose a workspace and a ready employee.
2. Give it a task with context and acceptance criteria.
3. Inspect the response, files, and supporting evidence.
4. Accept it, refine it, or record a human decision.
5. If the task should recur or react to an event, add an automation and inspect a run before enabling it.
6. If the task changes software, confirm the request on a delivery card before development starts.

If a page or action is missing, check workspace permission and deployment configuration. A missing connection or runtime has to be configured before the employee can use it.

Continue with [core concepts](/getting-started/core-concepts/), [your first automation](/getting-started/first-automation/), or [your first Software Factory workflow](/getting-started/first-software-factory/).
