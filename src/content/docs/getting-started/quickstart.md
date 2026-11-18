---
title: "Quickstart"
description: "Create an employee from a published template and review the result of a first task."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Complete a small task with a workspace employee before configuring automation or adding external tools. This guide uses a short written summary so you can evaluate the result directly.

## Prerequisites

You need an AI Workforce account, access to a workspace, permission to create an employee, and at least one published template. Your deployment must have a working execution environment. Ask your workspace manager if these prerequisites are missing.

## 1. Open a workspace

Sign in and open **Workspaces**. Choose an existing workspace. If you have permission to create one, give it a name that describes its purpose. Keep your first experiment separate from unrelated work.

## 2. Create an employee

Open workspace management and the **Employees** tab. Start the employee creation flow, choose an available published template, and read its responsibilities. Complete the configuration shown by that template and give the employee a recognizable name.

Wait for initialization to finish and the employee to become ready. Repeatedly submitting the creation flow will not repair an initialization failure; inspect the error with your manager instead.

## 3. Give it a bounded task

Open the employee's conversation and provide a short, approved source text. For example:

```text
Summarize the following release notes for a project team.
Produce: three changes, two follow-up questions, and a source quote for each change.
Use only the text below. Mark missing information as unknown.
Do not modify files or contact anyone.

[Paste your release notes here]
```

Replace the bracketed instruction with your own text before sending. This task does not require an external connection.

## 4. Review and refine

Check that the response follows the requested structure and that every quote exists in the input. Ask the employee to correct a specific omission in the same session. If it creates a file, open the artifact and inspect its contents.

You have completed the quickstart when you can explain what the employee did, which inputs it used, and why you accept or reject the output.

## Troubleshooting

If no templates appear, ask an administrator to publish one. If the employee stays unavailable, check initialization and execution setup. If external access is requested for this example, clarify that the supplied text is the only source.

Continue with [your first workflow](/getting-started/first-automation/) when the same task should run again, or with [Agent Chat](/user-guide/agent-chat/), [artifacts and evidence](/user-guide/artifacts-evidence/), and [employee building](/build/employee-definition/).
