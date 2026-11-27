---
title: "Introduction"
description: "Understand AI Workforce as an enterprise platform for AI collaboration and software delivery."
last_verified: "2026-11-27"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-27"
---

AI Workforce is an enterprise platform for AI collaboration and software delivery. It brings professional digital employees, people, project knowledge, engineering systems, and delivery evidence into one path from requirements through development, testing, security, and release.

The platform has three connected layers:

- **Professional digital employees** turn engineering roles into reusable production capability. A requirements assistant, architecture assistant, developer, tester, or security reviewer can each have a clear responsibility, tools, knowledge, permissions, and acceptance criteria.
- **R&D collaboration and delivery** organizes people and employees around workspaces, tasks, delivery boards, collaboration templates, and handoffs. The team can move from a confirmed requirement to implementation, verification, security review, and release.
- **The enterprise runtime foundation** provides sessions, execution environments, model endpoints, integrations, access control, audit, evaluation, and evidence. It gives the team a way to operate AI in a real engineering environment.

The long-term direction is an agentic software factory that keeps improving through repeated delivery evidence. The current product already exposes the building blocks for that direction through the [expert workbench](/user-guide/expert-workbench/), [Software Factory](/software-factory/overview/), and enterprise deployment controls.

## Start with a verified delivery

The same platform model covers a one-shot task, an event from GitHub, a schedule, and a delivery board that keeps consuming cards. These are workflow applications built from the same employees, automations, sessions, and evidence.

[Get started](/#get-started) by choosing a small request with acceptance criteria. Use the expert workbench when a person needs to collaborate with one specialist employee, including a security review, code review, or test-evidence check. Use the delivery workbench when several roles need to move a change from requirements to release.

[Software Factory](/software-factory/overview/) connects four delivery loops: [requirements to a card](/software-factory/requirements-to-card/), [a card to a pull request](/software-factory/card-to-pr/), [a pull request to merge](/software-factory/pr-to-merge/), and [a signal back to a card](/software-factory/signal-to-card/). The card links the confirmed requirement, implementation, verification evidence, security findings, and human decision.

A builder defines a reusable employee. A workspace user creates an employee from a published template. Automation or a person assigns work. The delivery system carries the result to the next stage. To write an Agent Package, see [Customize & Extend](/build/).

## Your turn to review

<div class="intro-review">

**Delivery card · Fix the export button on an empty list**

The team confirmed one acceptance criterion. When the list is empty, the Export button should be disabled. A digital employee submitted a fix. You decide whether it is ready to merge.

| Card record       | Evidence                        |
| ----------------- | ------------------------------- |
| Revision to merge | `b72e`                          |
| Last verification | `a19c` · Empty-list test passed |

**What would you do with this card?**

<details name="intro-review-choice">
<summary>Accept the change for merge</summary>

Check the revisions again. The test passed on `a19c`. The proposed change is at `b72e`. Accepting now would leave the card without evidence for the revision you reviewed. Try the other decision.

</details>
<details name="intro-review-choice">
<summary>Ask the employee to verify the proposed revision</summary>

The employee reruns the test on `b72e` and attaches the result to the card. The Export button is disabled on an empty list. You can now check the result against the criterion, record your acceptance, and follow the team's merge process.

</details>
</div>

## Before you begin

You need an account on an AI Workforce deployment and access to a workspace. A Member (`NORMAL_USER`) signs in to **Workbench** (工作台). That account does not get **FDE workbench** or **Admin console**. An FDE user or a system administrator publishes a missing digital employee template. A system administrator publishes a missing collaboration template. Someone who can manage digital employees in the workspace checks an employee that will not start. The workspace creator, a team leader, or an administrator changes grants. There is no workspace manager account. [Teams and access](/administration/teams-access/) lists these roles. For a delivery workflow, the project also needs a repository connection, ready lane employees, and a way to verify the change. Availability depends on that deployment. Capabilities that are not in the current release are marked **Planned**.

For a first change, use one small Issue with acceptance criteria a reviewer can check. For a first task that does not change software, use a small input you are allowed to share and ask for a written output with explicit acceptance criteria.

## What success looks like

For a software change, a reviewer can open the confirmed requirement, identify the revision that was checked, read the test and security results, and see whether the team accepted the change or returned it for repair. When work should happen again without a board, you have a Job, one inspected run, and at most one trigger you know how to find. Development does not start until the request is a confirmed delivery card.

If an employee cannot start, check initialization and ask someone who can manage that workspace's digital employees. If an answer or a code change lacks support, ask for the sources or the verification steps before accepting it.

## Next steps

Read [core concepts](/getting-started/core-concepts/) for the shared vocabulary. [Workflow applications](/workflows/applications/) compares the paths above. To understand how a role becomes a governed production unit, read [employee architecture](/build/architecture/).
