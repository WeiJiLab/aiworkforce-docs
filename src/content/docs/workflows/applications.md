---
title: "Workflow applications"
description: "Software Factory, the delivery board, and issue handling are applications of one workflow, not three engines."
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A workflow application is a concrete way to run the same platform. It does not bring its own engine. Each application uses a workflow definition, automation to start and continue it, employees or code executors, tasks, runs, an environment, evidence, artifacts, and human approval.

## Choose an application

```text
Software Factory     confirmed engineering work → verified delivery
Kanban workbench     the same delivery, watched and continued on a board
Issue automation     an external issue or inbox item → a confirmed card
Pull request         a GitHub pull request event → one employee run
Research             a schedule → an artifact a person reviews
Custom               a Job, a lane pipeline, or a skill workflow
```

| Application             | Workflow you define                           | What starts it                                  | What you can finish today                                       | Read next                                            |
| ----------------------- | --------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| Software Factory        | Board lanes and the employees on them         | A confirmed card                                | Execution, test records, evidence, and a human release decision | [Overview](/software-factory/overview/)              |
| Kanban workbench        | Those lanes, batches, and lane pipelines      | Card state, lane scans, pipeline triggers       | Continuous board movement for software delivery                 | [Workbench](/workflows/kanban-workbench/)            |
| Issue automation        | A Job, then the factory if you route the item | GitHub issue poll, inbox import, or collection  | An inbox item and, after confirmation, a delivery card          | [Issues](/workflows/issue-automation/)               |
| Pull request            | A Job bound to PR events                      | Polled pull request, review, and comment events | An employee run. Not an automatic merge.                        | [Pull requests](/workflows/pull-request-automation/) |
| Research and monitoring | A scheduled Job                               | Cron, or a Sentry or PagerDuty event            | A reviewed artifact or an event-started run                     | [Research](/workflows/research-monitoring/)          |
| Custom                  | Job, lane pipeline, or skill workflow         | Manual, cron, or the triggers on the Job        | The executor graph the screen actually stores                   | [Custom workflows](/workflows/custom-workflows/)     |

## Shared path

```text
Software Factory
  Issue or draft → confirm → dispatch → employee → environment
        → build and test → verification → evidence → PR → release decision

Kanban workbench
  Card on a lane → lane rules → claim by the lane employee
        → run → evidence → next lane, or back when verification fails

Issue automation
  Issue event or import → inbox → human confirmation
        → the Software Factory path above
```

The board columns are the lanes in [workflow concepts](/workflows/concepts/). They are not a second Kanban product beside Software Factory. The workbench is how you watch and continue Software Factory work.

## What stays in common

- **Workflow.** Lanes, a pipeline, or a skill definition. Not a new diagram per application.
- **Automation.** The Job or pipeline trigger that creates a run.
- **Agent.** The digital employee, or an allowlisted code executor on a lane.
- **Task and run.** The inbox item or card, and the execution record.
- **Environment and evidence.** Runtime, repository grants, and the session, diff, test, and decision.
- **Approval.** Draft confirmation, card questions, takeover, and release.

[Dispatch](/software-factory/dispatch/) sends a ready card to the lane employee. [Orchestration](/software-factory/orchestration/) moves cards and batches. Do not look for a standalone dispatcher service.

## Related guides

- [Workflow concepts](/workflows/concepts/)
- [AI employees](/user-guide/ai-employees/)
- [Your first Software Factory workflow](/getting-started/first-software-factory/)
- [Issue to PR](/recipes/issue-to-pr/)
