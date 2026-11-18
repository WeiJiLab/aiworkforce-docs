---
title: "Custom workflows"
description: "Compose a Job, a delivery-lane pipeline, or a skill workflow. There is no separate general-purpose canvas."
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A custom workflow is one of the definitions the product already stores. It still uses the same automation, employees, runs, and evidence as Software Factory and issue handling. You do not install another engine to leave the built-in lanes.

## Three definitions

| Definition     | Where you edit it                                   | What a node can be                                           | How it starts                                      |
| -------------- | --------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| Job            | Automations → the execution Job                     | One employee or one allowlisted code executor                | Manual, schedule, webhook, GitHub event, Issue, IM |
| Lane pipeline  | Automations → Pipeline, after you pick a board lane | That lane's agent tasks and code executors                   | Manual or cron, and only after at least two nodes  |
| Skill workflow | The employee package, as a workflow on a skill      | Skill, subagent, tool, approval, parallel, condition, branch | When that skill runs inside a session              |

The pipeline canvas is real. It is not a canvas for an arbitrary business process detached from a board. Creating a pipeline asks for a workspace, a board, and a lane because the nodes are that lane's executors. Edges continue on success, on failure, or always. A node can also wait until its `when` conditions hold, map inputs from the trigger or an upstream node, fan out over a list, and retry. Enable the pipeline only after you save. If an upstream contract changes, the pipeline can pause until the mapping is fixed.

A Job does not grow that canvas. If you have one executor, configure the trigger on the Job. The pipeline editor tells you this when you try to enable a single node.

## When to use which

Use a Job for [your first workflow](/getting-started/first-automation/), a scheduled research run, or an issue or pull request event. Use a lane pipeline when one lane must run two executors in order, for example an agent task whose output a code executor settles. Use a skill workflow when the branching belongs inside one employee's method. [Agent composition](/build/composition/) explains the package side, including the requirement to see the delegation in the trace.

## How to configure a small pipeline

1. On the delivery board, confirm the lane already has the executors you intend to chain.
2. Open Pipeline, select the workspace, board, and lane, and create the pipeline.
3. Add at least two nodes. Map each downstream input from the trigger or the upstream output. Do not leave a required field unmapped.
4. Set the edge to succeeded, failed, or always. Use failed for a fallback, not for the main path.
5. Save, read any contract errors, then enable. Add a cron trigger only if this lane should run on a schedule. A disabled pipeline does not start when the cron is due.
6. Run it once and open the pipeline run. Each node has its own status: pending, queued, succeeded, failed, or skipped.

## What you still cannot define

- A loop counter or an unbounded cycle. The graph rejects a cycle.
- A pipeline node that is not an existing executor.
- Webhook, GitHub, Issue, or IM triggers on the pipeline itself. Put those on a Job.
- A WIP limit, a general dependency graph between cards, or a workflow that is not attached to a lane.
- A guarantee that a skill's condition or subagent ran, unless the trace shows it.

## Related guides

- [Create a workflow](/automate/workflow-builder/)
- [Workflow concepts](/workflows/concepts/)
- [Kanban automation workbench](/workflows/kanban-workbench/)
- [Hooks and subagents](/build/hooks-subagents/)

## Limits

Custom here means the stored Job, pipeline, or skill definition. It does not mean an empty workflow type you can point at any system. If the screen cannot select the executor, the workflow does not exist yet.
