---
title: "Using AI employees"
description: "Choose an employee, assign work, and review the result. Package authoring lives in Build AI employees."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

An AI employee is a configured worker in a workspace. Its template supplies reusable capabilities, while its workspace configuration and authorizations determine where it can work and which connected resources it can use. This guide covers choosing an employee, assigning a task, supplying context, watching execution, and reviewing the result. It does not explain how to author an employee package. Builders use [employee architecture](/build/architecture/).

## Choose the right responsibility

Before creating an employee, write down the job you want it to perform. Include expected inputs, the output you will review, and any actions that require human confirmation. Compare those needs with the published templates available in your workspace.

A focused employee is easier to evaluate than a worker expected to handle unrelated responsibilities. If no suitable template exists, ask a builder to create one using an [employee definition](/build/employee-definition/).

## Create an employee

1. Open workspace management and select **Employees**.
2. Start employee creation and choose a published template.
3. Read the template description and complete the configuration steps offered by the flow. Some templates offer connection or capability choices.
4. Give the employee a name that distinguishes its role in this workspace.
5. Submit once and wait for initialization to complete.

Start a conversation only after the employee is ready. Initialization prepares the execution resources needed for work; a name appearing in the employee list does not guarantee that setup has finished.

## Work with an employee

Open a session, describe the goal, and supply the required context. State the acceptance criteria and the boundary of permitted actions. Review the response and any files it generates before treating the task as complete.

A template's written constraints describe intended behavior. External permissions still depend on configured connections and authorization. Do not assume that instructions alone enforce every action boundary.

## Maintain a useful employee

When a recurring failure concerns the method, inputs, or output structure, share a reproducible example with the template builder. When a failure concerns connectivity or startup, ask a workspace manager to inspect execution resources and authorization.

Avoid creating duplicate employees to recover from an unexplained startup failure. Resolve the initialization error, then confirm readiness with a small task.

Continue with [Agent Chat](/user-guide/agent-chat/), [Skills and Plugins](/build/skills-plugins/), and [artifacts and evidence](/user-guide/artifacts-evidence/).
