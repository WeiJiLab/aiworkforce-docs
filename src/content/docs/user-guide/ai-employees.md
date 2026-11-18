---
title: "Agents and AI employees"
description: "Agents execute steps inside workflows. An AI employee is the configured workspace form of an agent—not the product model."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

An **agent** is the execution participant inside a workflow. An **AI employee** is the configured worker you assign in a workspace—the product's common form of an agent, not a separate product line. Its template supplies reusable capabilities; workspace configuration and authorizations determine where it can work and which connected resources it can use.

This guide covers choosing an employee, assigning a task, supplying context, watching execution, and reviewing the result. It does not explain how to author an employee package. Builders use the [FDE workbench](/fde/) and [employee architecture](/build/architecture/). Software delivery still starts from [Software Factory](/software-factory/overview/), not from creating an employee first.

## Choose the right responsibility

Before creating an employee, write down the job you want it to perform. Include expected inputs, the output you will review, and any actions that require human confirmation. Compare those needs with the published templates available in your workspace.

A focused employee is easier to evaluate than a worker expected to handle unrelated responsibilities. If no suitable template exists, ask a builder to create one using an [employee definition](/build/employee-definition/).

## Create an employee

1. Open workspace management and select **Digital employees** (数字员工).
2. Choose **Add digital employee** (添加数字员工) and pick a published template. **Marketplace** (市场) only browses templates. The instance is created on this tab.
3. Read the template description and complete the configuration steps offered by the flow. Some templates offer connection or capability choices.
4. Give the employee a name that distinguishes its role in this workspace.
5. Submit once and wait for initialization to complete.

Start a conversation only after the employee is ready. Initialization prepares the execution resources needed for work; a name appearing in the employee list does not guarantee that setup has finished.

## Work with an employee

Open a session, describe the goal, and supply the required context. State the acceptance criteria and the boundary of permitted actions. Review the response and any files it generates before treating the task as complete.

A template's written constraints describe intended behavior. External permissions still depend on configured connections and authorization. Do not assume that instructions alone enforce every action boundary.

## Maintain a useful employee

When a recurring failure concerns the method, inputs, or output structure, share a reproducible example with the template builder. When a failure concerns connectivity or startup, ask someone who can manage this workspace's digital employees to inspect initialization. Grant changes are separate: the workspace creator, a team leader, or an administrator. See [Teams and access](/administration/teams-access/).

Avoid creating duplicate employees to recover from an unexplained startup failure. Resolve the initialization error, then confirm readiness with a small task.

Continue with [Workspace](/user-guide/workspace/), [Agent Chat](/user-guide/agent-chat/), and [artifacts and evidence](/user-guide/artifacts-evidence/).
