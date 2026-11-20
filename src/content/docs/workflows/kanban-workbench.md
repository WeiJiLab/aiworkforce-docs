---
title: "Kanban automation workbench"
description: "Use the delivery board as a continuous software workflow. Lanes show execution state, and employees run the cards."
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

The Kanban automation workbench is the delivery workbench. Open **Workbench** (工作台) in the primary navigation. The address is `/automations?tab=board-flow`. It turns a board into a software-delivery workflow that keeps running. It is the same Software Factory path, watched as cards, lanes, and batches. It is not a general-purpose Kanban product and not a second engine.

## What it is

A **card** is the work item. A **lane** is a column with built-in or custom behavior. A **step** on the card is execution state. A **run** is the session or pipeline node that did the work. An **artifact** is the produced change or file. **Evidence** is the session, code reference, test record, and human decision stored with the card.

The board is the work-management surface. The workflow is the lane rules. Automation starts and continues that work. The employee executes it.

## When to use it

Use the board when several engineering items must move through the same lanes, sometimes as a batch, and you need each item's run and acceptance evidence. Use a single [automation Job](/automate/fundamentals/) when the work is one bounded task and should not become a delivery card.

## How it works

Built-in lanes:

```text
Requirements (需求) → Development (开发) → Test deployment (测试发布) → Testing (测试验证) → Production (生产发布) → Done (已完成)
```

| Lane                       | Key     | What moves the card                                                     | Granularity                                      |
| -------------------------- | ------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| Requirements               | DRAFT   | Clarification records a ready card, with a decision when required       | Per card                                         |
| Development                | DEV     | The lane employee codes in a session                                    | Per card                                         |
| Test deployment (测试发布) | PREPARE | Ready cards join a candidate batch                                      | Batch                                            |
| Testing (测试验证)         | TEST    | Tests run and record passed or failed                                   | Per card, inside the release batch               |
| Production (生产发布)      | RELEASE | Merge the passing batch, then deploy eligible merged changes separately | Batch for merge, records on cards for production |
| Done                       | DONE    | Recover resources and close eligible cards                              | Card and shared test resources                   |

Inside a lane the step can be clarifying, ready, coding, running, passed, failed, merge, deploy, verify, or waiting on a person. That step is the workflow state. Changing a label without a run does not perform the work.

Custom lanes are allowed. A custom lane does not inherit Requirements or Development behavior. The board template and the lane pipeline decide what happens there.

There is no WIP limit. Parallelism is multiple cards, plus batches that group cards for test and release. Dependencies in this release are batch membership, not a general dependency graph.

## How to configure it

1. Create the workbench project and board. Connect repositories and any pipeline the test or release lanes should call. A card does not create those resources.
2. Put ready employees on the lanes. Authorize those employees for the repositories they may change. A workspace repository connection is not that grant.
3. Open **Orchestration** from Automations, choose the workspace, board, and lane, and chain that lane's executors only when the lane needs more than one. A single executor stays a Job with its own schedule.
4. Review what marks a draft as ready. The standard intake orchestration dispatches clarified cards to Development when enabled. Check the card scope, acceptance criteria, and allowed repositories. An approval on the card does not grant repository credentials.
5. Watch the card's session, test record, and decision. Take over to stop automatic progress. Hand the work back explicitly. Resuming a pause does not clear a takeover.

Code executors on a lane are named platform capabilities, such as test admit, release advance, and batch move. They are not arbitrary code from configuration.

## A practical card

On an enabled standard board, the intake orchestration moves clarified cards to Development and dispatches the development employee. Check the resulting session, code reference, and test evidence on the card. Answer questions, return failed work for repair, and respond to merge or production approval requests when the batch policy calls for them.

The standard flow closes a successfully merged batch. Check the separate production result and cleanup record on the member cards. See [release governance](/software-factory/release-governance/).

## When a card is blocked

| State                    | What to do                                                                       |
| ------------------------ | -------------------------------------------------------------------------------- |
| Waiting on a person      | Answer the card. The run can sit in awaiting-human without holding a slot.       |
| Test failed              | Read the test record. Return the work. Do not edit the column and call it fixed. |
| Taken over               | Automatic progress stays stopped until you hand it back.                         |
| Missing repository grant | Authorize the lane employee. A longer prompt does not add the grant.             |
| Pipeline paused          | Fix the mapping the editor reported, save, then resume.                          |

## Related guides

- [Software Factory](/software-factory/overview/)
- [Work intake](/software-factory/intake/), [dispatch](/software-factory/dispatch/), and [orchestration](/software-factory/orchestration/)
- [Evidence](/software-factory/evidence/) and [runs and recovery](/automate/runs-recovery/)
- [Workflow concepts](/workflows/concepts/)

## Limits

The board does not schedule by a WIP limit, a priority number, or a hand-maintained Backlog → Done vocabulary. Use the lanes above, or the custom lanes you configured. Per-card sandboxes and a preview browser are outside this release.
