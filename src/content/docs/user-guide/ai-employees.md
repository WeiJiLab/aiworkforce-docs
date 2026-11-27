---
title: "Managed agents and digital employees"
description: "Use a professional digital employee as a governed production unit inside an AI Workforce delivery process."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-27"
---

A **digital employee** is AI Workforce's basic production unit. It is a workspace instance of a published role template, with a defined responsibility, mission, skills, knowledge and memory, tools, workflow, triggers, permissions, evaluation method, and lifecycle. The template turns an engineering role into a reusable capability. The workspace supplies project context and grants access to the systems that the role is allowed to use.

A requirements assistant, developer, tester, security reviewer, or release assistant can each be a different employee. The employee can work in a conversation, in the expert workbench, or inside a delivery workflow. The platform manages the underlying sessions, execution environment, tool authorization, handoffs, and evidence.

This guide covers choosing an employee, assigning a task, supplying context, watching execution, and reviewing the result. It does not explain how to author an Agent Package. To author one, see [Customize & Extend](/build/) and [employee architecture](/build/architecture/). Software delivery can start from [Software Factory](/software-factory/overview/) when several roles need to collaborate.

## Choose the right responsibility

Before creating an employee, write down the job it should perform. Include the expected inputs, the result a person will review, the tools it needs, the actions that require human confirmation, and the cases that belong to another role. Compare those needs with the published templates available in your workspace.

A focused employee is easier to evaluate than a worker expected to handle unrelated responsibilities. If no suitable template exists, ask a builder to create one using an [agent definition](/build/employee-definition/).

## Create an employee

1. Open workspace management and select **Digital employees** (数字员工).
2. Choose **Add digital employee** and pick a published template. You can also open **Marketplace** from the target workspace and choose **Create an employee from this template** to return to that workspace for setup.
3. Read the template's role, mission, capabilities, permissions, and evaluation expectations. Complete the configuration steps offered by the flow. Some templates offer connection or capability choices.
4. Give the employee a name that distinguishes its role in this workspace.
5. Submit once and wait for initialization to complete.

Start a conversation only after the employee is ready. Initialization prepares the execution resources needed for work. A name appearing in the employee list does not guarantee that setup has finished.

## Work with an employee

Open a session, describe the goal, and supply the required project context. State the acceptance criteria and the boundary of permitted actions. Use the expert workbench when the work needs a person to inspect evidence, filter risks, request changes, or accept a review. Use a delivery workflow when the output must move to another role.

Review the response, generated files, commands, test results, security findings, and other evidence before treating the task as complete. A template's written constraints describe intended behavior. External permissions still depend on configured connections and authorization. Do not assume that instructions alone enforce every action boundary.

## Evaluate and maintain the employee

Evaluation is part of the employee lifecycle. Keep a small set of representative cases that cover the normal request, missing input, unsafe request, and a case that needs human takeover. Rerun the same cases after changing the role, skill, knowledge, tool grant, or model route. Compare the result and evidence with the role's acceptance criteria.

When a recurring failure concerns the method, inputs, or output structure, share a reproducible example with the template builder. When a failure concerns connectivity or startup, ask someone who can manage this workspace's digital employees to inspect initialization. Grant changes are separate. The workspace creator, a team leader, or an administrator makes them. See [Teams and access](/administration/teams-access/).

Avoid creating duplicate employees to recover from an unexplained startup failure. Resolve the initialization error, then confirm readiness with a small task.

Continue with [Workspace](/user-guide/workspace/), [Assign a task to a digital employee](/user-guide/agent-chat/), [Review results and artifacts](/user-guide/artifacts-evidence/), and [Agent evaluation](/software-factory/evaluation/).
