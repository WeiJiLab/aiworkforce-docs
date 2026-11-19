---
title: "Create a workflow"
description: "Compose one Job, or a delivery-lane pipeline of two or more executors. A Job has no branch canvas."
sidebar:
  label: Create a workflow
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

There are two ways to define a workflow in the current product. A **Job** is one executor plus its triggers. A **pipeline** chains two or more executors on a delivery-board lane. There is no third canvas for an arbitrary process that is not attached to a lane. [Custom workflows](/workflows/custom-workflows/) states the same boundary.

## Compose a Job

Open **Automations** at `/automations`.

1. Choose the execution employee and write the task, inputs, and output.
2. Choose a new session per run, or reuse the Job's bound session. Reuse accumulates context. A new session keeps runs easier to compare.
3. Save, run manually, and read the run before you publish.
4. Add one or more triggers. Each scheduling rule belongs to that Job. Event and webhook triggers are separate types. See [event-driven automation](/automate/event-driven/).
5. If the Job should file requests, add **Collect tasks / issues** and choose the workspace inbox or a workbench project. This tool is optional, and the collection UI requires the Claude Code runtime.

Publish stores the configuration. It does not create a run. Enable automatic execution only when a manual result is acceptable. The Job editor does not store branches, fan-out, or a retry count. Recurring work uses schedule rules, documented in [loops and recurring work](/automate/loops/).

## Compose a lane pipeline

Open **Pipeline** from Automations. Select the workspace, the board, and the lane. The list shows that lane's executors: agent tasks and allowlisted code executors.

1. Create the pipeline and add at least two nodes. One node cannot be enabled as a pipeline. Configure that schedule on the Job instead.
2. Connect the nodes. An edge continues on success, on failure, or always. Failure is for a fallback, not for the main path.
3. Map each downstream input from the trigger or an upstream output. Required fields must be mapped. The editor reports contract errors and can pause the pipeline when an upstream contract changes.
4. Save, then enable. Add a manual run or a cron trigger. Webhook, GitHub, Issue, and IM triggers stay on Jobs. A pipeline that is not enabled does not start when its cron is due.
5. Open the pipeline run. Each node is pending, queued, succeeded, failed, or skipped.

A node can fan out over a list and retry a failed run. The graph rejects a cycle, so there is no loop counter. Multi-step engineering delivery still belongs to the [Software Factory](/software-factory/overview/) board. The pipeline is how one lane orders its executors. It does not replace card confirmation.

## What you still cannot draw

A person in the middle uses [approvals and notifications](/automate/approvals/) or a delivery-card takeover. A skill can declare conditions, branches, parallel steps, and human approval inside the Agent Package. Confirm those steps in the runtime trace. Writing them in prose does not create them. See [agent composition](/build/composition/).
