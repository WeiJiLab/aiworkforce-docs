---
title: "Introduction"
description: "Start from the workflow you need: a first run, an employee, or a delivery board."
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

AI Workforce is a workflow-native platform. A workflow defines how work is performed. Automation starts that workflow and keeps it running. A digital employee is the agent that executes steps. People remain responsible for scope, takeover, and release.

The same model covers a one-shot task, an event from GitHub, a schedule, and a delivery board that keeps consuming cards. Software Factory, the Kanban workbench, and issue handling are applications of that model. They are not three products.

## Choose your path

- **Run a first workflow.** Follow [your first workflow](/getting-started/first-automation/) to create a Job, inspect one manual run, and only then enable a trigger. Read [workflow concepts](/workflows/concepts/) when you need the words to stay stable.
- **Use an employee.** Follow the [quickstart](/getting-started/quickstart/) or [build your first AI employee](/getting-started/first-employee/) from a published template. Then use [workspaces](/user-guide/workspace/) and [Agent Chat](/user-guide/agent-chat/).
- **Deliver software.** Open [Software Factory](/software-factory/overview/) and the [Kanban workbench](/workflows/kanban-workbench/) when a confirmed request must move through execution, verification, evidence, and a human release decision.
- **React to an issue.** Use [issue automation](/workflows/issue-automation/) to ingest a GitHub issue or an inbox item. Confirm it before development starts.

A builder defines a reusable employee. A user creates a workspace employee from a published template. Automation asks a ready employee to perform work. The board uses those employees inside a delivery workflow. Package-authoring steps stay in [Build AI employees](/build/employee-definition/), not in the user guide.

## Before you begin

You need an account on an AI Workforce deployment and access to a workspace. A workspace manager provides templates, execution resources, and connections. Availability depends on that deployment. This documentation marks partial support as **Limited** and capabilities that are not in the current release as **Planned**.

For a first task, use a small input you are allowed to share and ask for a written output with explicit acceptance criteria. That makes it possible to tell a fluent answer from a verified result.

## What success looks like

You can open a workspace, start a session with a ready employee, give it a bounded task, and review the answer or the generated files. When that task should happen again, you have a Job, one inspected run, and at most one trigger you know how to find. When the task changes software, the request is a confirmed delivery card before development starts.

If an employee cannot start, check initialization and ask a workspace manager to inspect execution setup. If an answer lacks support, ask for the sources or the verification steps before accepting it.

## Next steps

Read [core concepts](/getting-started/core-concepts/) for the shared vocabulary. The [platform map](/getting-started/platform-overview/) names the screens. [Workflow applications](/workflows/applications/) compares the paths above.
