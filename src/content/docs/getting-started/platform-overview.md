---
title: "Platform overview"
description: "Find the delivery workbench, workflow automation, workspace sessions, and execution setup."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

AI Workforce gives engineering teams a delivery workbench for software changes and automation for recurring or event-driven work. Use the [core concepts](/getting-started/core-concepts/) to understand the records each surface creates.

## Deliver in the Software Factory

Open the **delivery workbench** from Automations at `/automations?tab=board-flow`. The [project](/user-guide/projects/) configures the board, repositories, and lane employees. Follow a delivery card to confirm scope, track implementation and verification, and review the result.

The workspace [Task inbox](/user-guide/inbox-tasks/) holds collected or imported requests. Route a reviewed request to a workbench draft and confirm it before starting development. Try the [quickstart](/getting-started/quickstart/) to follow one Issue through the workbench.

## Automate recurring or event-driven work

Open **Automations** at `/automations` to configure Jobs, triggers, and runs. Set up a schedule or an available event trigger, run the Job by hand, and inspect the output before enabling automatic execution. For tasks that collect actionable requests, configure a destination in the inbox or the workbench. See [Automation concepts](/automate/fundamentals/).

## Work in a workspace

Open **Workspaces** to choose where work happens. Select a ready employee and start a session for direct work such as investigating a request or refining a design. The session keeps the conversation and execution history together. [Artifacts and evidence](/user-guide/artifacts-evidence/) helps you review the resulting files and records.

## Configure execution

Set up the [repository connection](/integrations/code-repositories/), [runtime](/deployment/runtime-environments/), and relevant [pipeline resources](/software-factory/cicd/) for your project. Grant each lane employee access to the resources it needs. Teams can use a published template to create an employee or use [employee architecture](/build/architecture/) to define roles, skills, and tool dependencies.

## Operate

Use [teams and access](/administration/teams-access/) for workspace access and [platform governance](/operate/evaluation-governance/) for the relationship between grants, tool authorization, model routing, cost, audit, and quality gates. If an action is missing, check workspace permissions and deployment configuration.
