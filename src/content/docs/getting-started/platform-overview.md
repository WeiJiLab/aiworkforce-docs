---
title: "Platform map"
description: "Find the screens for workflows, employees, the delivery board, and operations after the core records are clear."
sidebar:
  label: Platform map
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Read [core concepts](/getting-started/core-concepts/) first. This page only names the screens those records use. It is not a second architecture.

## Workflows and automation

**Automations** at `/automations` holds Jobs, triggers, and runs. Saving a draft, publishing, enabling automatic execution, and running manually are different actions. Triggers can be schedules, webhooks, platform events, issues, or IM messages where that type is available.

**Pipeline** on the same screen edits a lane pipeline: two or more executors on a delivery-board lane, with success and failure edges. A one-executor task stays a Job.

## The delivery board

The **delivery workbench** at `/automations?tab=board-flow` is both Software Factory and the Kanban workbench. Cards move through Requirements, Development, Test release, Test verification, Production release, and Done, or through custom lanes you configured. Creating a card does not configure a repository or a pipeline.

The workspace **task inbox** reviews collected or imported requests. An inbox item has its own source and review state. Collecting it does not approve implementation.

## Employees and context

Open **Workspaces** to choose where work happens. Select an employee and start a conversation. A session keeps that conversation and its execution history together. Artifacts let you inspect produced files and, when the runtime supports it, file changes.

Users create employees from published templates. Builders define the role, inputs, outputs, skills, and tool dependencies before publishing. [Employee definition](/build/employee-definition/) is the starting point for a new role. Putting a tool name in instructions does not grant access.

## Operate and integrate

Team access, platform configuration, model channels, runtime placement, and audit answer different operational questions. [Security](/deployment/security/) and [runtime](/deployment/runtime-environments/) are the boundaries. [Integrations](/integrations/overview/) covers repositories, chat channels including Slack and DingTalk, and monitoring events. Changing one screen does not repair another.

## A first workflow

1. Choose a workspace and a ready employee.
2. Give it a task with context and acceptance criteria.
3. Inspect the response, files, and supporting evidence.
4. If the task should recur or react to an event, add a Job and inspect a run before enabling it.
5. If the task changes software, confirm the request on a delivery card before development starts.

If a page or action is missing, check workspace permission and deployment configuration. A missing connection or runtime has to be configured before the employee can use it.

Continue with [your first workflow](/getting-started/first-automation/) or [your first Software Factory workflow](/getting-started/first-software-factory/).
