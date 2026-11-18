---
title: "Build your first AI employee"
description: "Create a workspace employee from a published template and accept or reject its first result."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

This path is for someone using AI Workforce, not for someone authoring an employee package. You select a published template, wait until the workspace employee is ready, give it one bounded task, and review the result. Builders who need to define a new role should start at [employee definition](/build/employee-definition/).

## Prerequisites

You need a workspace you can access, permission to create an employee, and at least one published template. The deployment needs a working execution environment. If templates are missing, ask an administrator to publish one before continuing.

## 1. Choose the job, then the template

Write down the outcome, the input you will supply, and what you will check. Open workspace management, go to **Employees**, and start creation. Read the template's responsibilities and pick the closest match. A template that claims unrelated jobs is harder to judge than a narrow one.

Give the employee a name that identifies its role in this workspace. Submit once. Initialization prepares execution resources. A name in the list does not mean the employee is ready, and submitting the flow again does not repair a failed initialization.

## 2. Assign one task

Open the employee's conversation only after it is ready. Provide the goal, the source material, and the boundary. For example:

```text
Summarize the following note for a project team.
Produce three changes, two follow-up questions, and a source quote for each change.
Use only the text below. Mark anything missing as unknown.
Do not modify files or contact anyone.

[Paste an approved note here]
```

Replace the bracketed text before sending. This example needs no external connection.

## 3. Watch the work and review the output

Stay in the same session while the goal is unchanged. Read the structure you asked for and check that every quote appears in the input. If the employee creates a file, open that artifact and read it. A fluent summary is not evidence that the quotes are real.

Ask for a specific correction in the same session when something is missing. Start a new session when the goal or the source material changes substantially.

## Expected result

You can name the employee, the input you provided, what it produced, and why you accept or reject that output. You have not published a template or granted a new tool. Those steps belong to [Build AI employees](/build/architecture/).

## If it does not start

Check initialization status with a workspace manager. If the employee asks for external access on this example, restate that the pasted text is the only source. Continue with [Agent Chat](/user-guide/agent-chat/) or [artifacts and evidence](/user-guide/artifacts-evidence/).
