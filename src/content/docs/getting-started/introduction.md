---
title: "Introduction"
description: "Start with a verified software change, using the same workflow for automation and employees."
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

AI Workforce is a workflow-native platform. A workflow defines how work is performed. Automation starts that workflow and keeps it running. A digital employee is the agent that executes steps. People remain responsible for scope, takeover, and release.

The same model covers a one-shot task, an event from GitHub, a schedule, and a delivery board that keeps consuming cards. Software Factory, the Kanban workbench, and issue handling are applications of that model. They are not three products.

The default first path is a verified software change. [Software Factory](/software-factory/overview/) gives each change a card on the delivery workbench. The card links the confirmed requirement, the implementation, the verification evidence, and the team's decision.

## Choose your path

- **Deliver your first change.** Follow the [quickstart](/getting-started/quickstart/) to turn one Issue into a reviewed change. Use [Issue to PR](/recipes/issue-to-pr/) for a worked example, and the [Kanban workbench](/workflows/kanban-workbench/) when you need the board's rules.
- **Set up the board.** Follow [set up and run a delivery board](/getting-started/first-software-factory/) when the project, repositories, or lane employees are not ready yet.
- **Run a first workflow.** Follow [your first workflow](/getting-started/first-automation/) to create a Job, inspect one manual run, and only then enable a trigger. Read [workflow concepts](/workflows/concepts/) when you need the words to stay stable.
- **Use an employee.** Follow [build your first AI employee](/getting-started/first-employee/) from a published template. Then use [workspaces](/user-guide/workspace/) and [Agent Chat](/user-guide/agent-chat/).
- **React to an issue.** Use [issue automation](/workflows/issue-automation/) to ingest a GitHub issue or an inbox item. Confirm it before development starts.

A builder defines a reusable employee. A user creates a workspace employee from a published template. Automation asks a ready employee to perform work. The board uses those employees inside a delivery workflow. Package-authoring steps stay in [Build AI employees](/build/employee-definition/), not in the user guide.

## Before you begin

You need an account on an AI Workforce deployment and access to a workspace. A Member (`NORMAL_USER`) signs in to **Workbench** (工作台). That account does not get **FDE workbench** or **Admin console**. An FDE user or a system administrator publishes a missing digital employee template. A system administrator publishes a missing board template. Someone who can manage digital employees in the workspace checks an employee that will not start. The workspace creator, a team leader, or an administrator changes grants. There is no workspace manager account. [Teams and access](/administration/teams-access/) lists these roles. For a delivery workflow, the project also needs a repository connection, ready lane employees, and a way to verify the change. Availability depends on that deployment. Capabilities that are not in the current release are marked **Planned**.

For a first change, use one small Issue with acceptance criteria a reviewer can check. For a first task that does not change software, use a small input you are allowed to share and ask for a written output with explicit acceptance criteria.

## What success looks like

For a software change, a reviewer can open the confirmed requirement, identify the revision that was checked, read the result, and see whether the team accepted the change or returned it for repair. When work should happen again without a board, you have a Job, one inspected run, and at most one trigger you know how to find. Development does not start until the request is a confirmed delivery card.

If an employee cannot start, check initialization and ask someone who can manage that workspace's digital employees. If an answer or a code change lacks support, ask for the sources or the verification steps before accepting it.

## Next steps

Read [core concepts](/getting-started/core-concepts/) for the shared vocabulary. The [platform map](/getting-started/platform-overview/) names the screens. [Workflow applications](/workflows/applications/) compares the paths above.
