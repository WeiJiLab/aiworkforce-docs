---
title: "Platform map"
description: "Find the delivery workbench first, then the screens for workflows, employees, and operations."
sidebar:
  label: Platform map
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Read [core concepts](/getting-started/core-concepts/) first. This page only names the screens those records use. It is not a second architecture.

For a software change, start on the delivery workbench. The sections below name that screen and the others these records use.

## Workflows and automation

**Automations** at `/automations` holds Jobs, triggers, and runs. Saving a draft, publishing, enabling automatic execution, and running manually are different actions. Triggers can be schedules, webhooks, platform events, issues, or IM messages where that type is available.

**Pipeline** on the same screen edits a lane pipeline: two or more executors on a delivery-board lane, with success and failure edges. A one-executor task stays a Job.

## The delivery board

Open **Workbench** (工作台) in the primary navigation. The **delivery workbench** at `/automations?tab=board-flow` is both Software Factory and the Kanban workbench. **Automations** (自动化) is the Job page, not this board. Cards move through Requirements (需求), Development (开发), Test deployment (测试发布), Testing (测试验证), Production (生产发布), and Done (已完成), or through custom lanes you configured. Creating a card does not configure a repository or a pipeline. Confirming a requirement records scope. It does not approve a repository change or grant credentials.

The workspace **task inbox** reviews collected or imported requests. An inbox item has its own source and review state. Collecting it does not approve implementation.

## Employees and context

Open **Workspaces** to choose where work happens. Select an employee and start a conversation. A session keeps that conversation and its execution history together. Artifacts let you inspect produced files and, when the runtime supports it, file changes.

Users create employees from published templates. Builders define the role, inputs, outputs, skills, and tool dependencies in the [FDE workbench](/fde/) before publishing. [Employee definition](/build/employee-definition/) is the starting point for a new role. Putting a tool name in instructions does not grant access.

## Operate and integrate

Team access, platform configuration, model channels, runtime placement, and audit answer different operational questions. [Security](/deployment/security/) and [runtime](/deployment/runtime-environments/) are the boundaries. [Integrations](/integrations/overview/) covers repositories, chat channels including Slack and DingTalk, and monitoring events. Changing one screen does not repair another.

## A first workflow

For a software change:

1. Open a workspace whose delivery project is ready, or follow [set up and run a delivery board](/getting-started/first-software-factory/).
2. Follow the [quickstart](/getting-started/quickstart/) from one Issue to a reviewed change.
3. If the same kind of intake should recur, add a Job and inspect a run before enabling it.

For a task that does not change software:

1. Choose a workspace and a ready employee.
2. Give it a task with context and acceptance criteria.
3. Inspect the response, files, and supporting evidence.
4. If the task should recur or react to an event, add a Job and inspect a run before enabling it.

If a page or action is missing, check workspace permission and deployment configuration. A missing connection or runtime has to be configured before the employee can use it.

Continue with the [quickstart](/getting-started/quickstart/) or [your first workflow](/getting-started/first-automation/).
