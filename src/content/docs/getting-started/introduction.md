---
title: "Introduction"
description: "Use and build AI employees, automate recurring work, and deliver verified software changes."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

AI Workforce helps teams assign work to AI employees and review the results. Teams can start with a single task, use Automation to run recurring or event-driven work, and use Software Factory to take a confirmed engineering request through implementation and verification.

People remain responsible for the result. An employee can prepare a report, investigate a request, or propose a code change. It does not approve its own scope or release its own software.

## Choose your path

- **Use AI Workforce.** Follow the [quickstart](/getting-started/quickstart/) or [build your first AI employee](/getting-started/first-employee/) from a published template. Then learn [workspaces](/user-guide/workspace/), [Agent Chat](/user-guide/agent-chat/), and [human approval](/user-guide/human-approval/).
- **Build AI employees.** Read [employee architecture](/build/architecture/) and define the role in [employee definition](/build/employee-definition/). Package methods as [skills](/build/skills/) and [plugins](/build/plugins/).
- **Automate recurring work.** Create [your first automation](/getting-started/first-automation/) to run a bounded task, inspect the result, and enable a trigger when it is ready.
- **Deliver software.** Start with [Software Factory](/software-factory/overview/) when the work must move from a confirmed request to verification, evidence, and release.
- **Operate the platform.** Set up [execution environments](/deployment/runtime-environments/), manage [teams and access](/administration/teams-access/), and configure [integrations](/integrations/overview/).

A builder publishes a reusable template with a role, procedures, and tool requirements. A team creates a workspace employee from that template and grants it access to the resources it needs. Automation can invoke a ready employee, and Software Factory assigns ready employees to stages on the delivery board. Teams can use [evaluation](/software-factory/evaluation/) to turn recurring failures into test cases for the next template version.

## Before you begin

You need an account on an AI Workforce deployment and access to a workspace. A workspace manager or platform administrator provides templates, execution resources, and connections. Availability depends on that deployment. This documentation marks partial support as **Limited** and capabilities that are not in the current release as **Planned**.

For a first task, use a small input you are allowed to share and ask for a written output with explicit acceptance criteria. That makes it possible to tell a fluent answer from a verified result.

## What success looks like

You can open a workspace, start a session with a ready employee, give it a bounded task, and review the answer or generated files. Continue the same session when you are still refining that task.

If an employee cannot start, check initialization and ask a workspace manager to inspect execution setup. If an answer lacks support, ask for the sources or verification steps before accepting it.

## Next steps

Read [platform overview](/getting-started/platform-overview/) and [core concepts](/getting-started/core-concepts/) before adding automation or delivery.
