---
title: "Workflow concepts"
description: "A workflow defines how work is performed. Automation starts it. An agent executes the steps. A run records one instance."
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

## Try an issue trigger

Select **Simulate a run** (▷) in the editor to see which instructions the developer receives. Then change **Label** to `enhancement` and try the same issue again. The sample issue has the `bug` label, so the second run is skipped. The demo uses local sample data.

<iframe src="/illustrations/automation-editor/en/" title="Interactive example: configure and test an issue automation" style="width:100%;height:clamp(36rem, 72vh, 47rem);border:0;border-radius:12px;"></iframe>

[Open the automation editor on its own](/illustrations/automation-editor/en/)

## Workflows, automation, and runs

AI Workforce is a workflow-native platform. A **workflow** is the reusable definition of how work is performed. **Automation** is the mechanism that starts that work and keeps it running. An **agent** — in the product, a digital employee — executes specific steps. A **run** is one execution instance. A **task** is one unit of work inside that instance.

Those words are not three product modules and not three engines. Software Factory, the delivery board, and issue handling are applications of the same workflow.

Creating an agent gives you someone who can be called. Creating a workflow gives you work that can continue: a trigger, a definition, an executor, a record, and evidence a person can check. The agent is an execution resource the workflow calls.

## What you open in the product

The documentation uses the words above. The screens use these names:

| Concept    | Product object                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------- |
| Workflow   | A delivery board, a lane **pipeline** (编排), or the workflow declared inside an employee skill |
| Automation | An automation **Job**: the task, the executor, and the triggers that invoke it                  |
| Agent      | A digital employee, or a code executor on a board lane                                          |
| Run        | One Job run, or one pipeline run that records each node's run                                   |
| Task       | An inbox item, a delivery card, or one node in a pipeline                                       |
| Evidence   | The session, code reference, test record, and human decision kept with the work                 |

Open **Automations** (自动化) at `/automations` for Jobs. Open **Pipeline** on that screen for a lane pipeline. Open **Workbench** (工作台) for the board. Its address is `/automations?tab=board-flow`.

## Lifecycle

```text
Trigger → Context → Definition → Agent execution → Environment
        → Verification → Evidence → Delivery → Feedback
```

| Stage                  | What it answers                                     | In this release                                                                                                    |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Trigger                | What starts the work?                               | Manual run, schedule, webhook, GitHub event poll, Issue, IM message, or a board lane. See the limits below.        |
| Context                | What may the executor read?                         | Workspace, repository connection, issue or card, session memory, and employee knowledge.                           |
| Workflow definition    | What are the steps and dependencies?                | One Job, a lane pipeline of executors, or a skill workflow. A free-form process canvas is not a separate product.  |
| Agent execution        | Who performs the step?                              | The Job's employee, a lane employee, or an allowlisted board code executor.                                        |
| Execution environment  | Where does it run?                                  | Platform runtime, a self-hosted deployment, or an authorized device. Not a per-card sandbox.                       |
| Verification           | Did the work meet the agreed outcome?               | Tests on the board, acceptance criteria, and a human comparison. There is no automatic business score.             |
| Evidence and artifacts | What proves the claim, and what was produced?       | Session, files, code reference or pull request, test record, and the decision on the card.                         |
| Delivery               | Where does the result go?                           | Task inbox update, pull request, review, release lane, or a message. Release still needs the integration to exist. |
| Feedback and recovery  | What happens when a person or a failure intervenes? | Human approval, takeover, hand-back, retry on a pipeline node, and a later run.                                    |

A trigger does not define the work. Publishing a Job or enabling a pipeline does not create a run. A successful run does not by itself resolve a business request.

## Parts you can reuse

| Part          | Role                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| Trigger       | When this definition is invoked. A Job and a pipeline keep their own trigger lists.                         |
| Context       | The workspace, inputs, and untrusted event payload. Tokens and tool grants are not injected from the event. |
| Execution     | The employee session or the code executor.                                                                  |
| Control       | Pipeline edge conditions, node `when` predicates, retry, upstream-failure policy, and human approval.       |
| Environment   | Runtime placement, device, repository, and pipeline resources configured before the run.                    |
| Verification  | Test lanes, acceptance criteria, and review. Distinct from evaluation of the Agent Package.                 |
| Output        | Artifacts, inbox items, card updates, and pull requests.                                                    |
| Observability | Run history, session, node status, and cost on the model channel. A second tracing product is not included. |

## Three ways a workflow runs

The same records apply. The difference is what causes the next run.

```text
One-shot       manual Run on a Job, then it finishes
Event-driven   an external event admits one Run
Continuous     a delivery board keeps consuming cards
```

| Model        | Starts when                                                           | Finishes when                               | Product surface                       |
| ------------ | --------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------- |
| One-shot     | You choose **Run manually**                                           | That run reaches a terminal status          | An automation Job                     |
| Event-driven | A schedule fires, a webhook arrives, or a polled GitHub event matches | That invocation's run finishes              | A Job trigger, or a pipeline cron     |
| Continuous   | A card is ready on a lane, or a lane scan finds work                  | The card reaches Done, or a person stops it | Delivery workbench and lane pipelines |

Save, publish, and enable are different actions. A paused Job can still be run by hand. That manual run does not turn automatic triggers back on. A pipeline with one executor should stay a Job: the editor requires at least two executors before you can enable the pipeline.

## The delivery board is the Kanban

Kanban in this product is the delivery workbench, not a separate board widget on Software Factory. The board is the work-management surface. The workflow is the lane rules. Automation is what starts and continues lane work. The employee is the executor. The run is the record. Evidence is what a reviewer uses to accept the card.

Built-in lanes, in delivery order:

```text
Requirements (需求) → Development (开发) → Test deployment (测试发布) → Testing (测试验证) → Production (生产发布) → Done (已完成)
DRAFT → DEV → PREPARE → TEST → RELEASE → DONE
```

A card's step is execution state: clarifying, ready, coding, running, passed, failed, merge, deploy, verify, or waiting for a person. Do not treat the column as a label someone maintains by hand. Custom lanes can be added. Their behavior comes from the board template, not from the built-in kinds.

There is no WIP-limit control. Cards that share a batch move together in Test deployment (测试发布), Testing (测试验证), Production (生产发布), and Done (已完成). An operation on a batch can affect every member card.

**Dispatch** assigns a confirmed card to the employee configured on the lane. **Orchestration** is the workbench moving cards and batches through those lanes, including a lane pipeline that chains executors. Dispatch does not choose a model or skip verification. Orchestration is not a general multi-agent runtime. Read [task dispatch](/software-factory/dispatch/) and [agent orchestration](/software-factory/orchestration/).

## Verification is not employee evaluation

Workflow verification asks whether this run met the acceptance criteria: tests, a recorded comparison, and a human decision. Employee evaluation asks whether a package or plugin behaves as specified. A fluent session is neither. See [business verification](/software-factory/business-verification/) and [execution evaluation](/software-factory/evaluation/).

## Example A. GitHub issue

| Piece        | This release                                                                                     | Not this release                                             |
| ------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Trigger      | Issue opened, closed, reopened, labeled, or commented, observed by GitHub token polling          | A GitHub App, a repository webhook, or instant delivery      |
| Context      | Whitelisted event fields, the workspace, and the repository connection                           | Checkout of the event SHA; the event does not prove that     |
| Agent        | The Job's execution employee                                                                     | Automatic assignee selection                                 |
| Steps        | The Job runs. It may collect an inbox item. A person confirms scope before development.          | A built-in classifier, duplicate detector, or priority model |
| Verification | You inspect the run. Delivery verification applies only after the item becomes a confirmed card. | An automatic resolution of the GitHub issue                  |
| Output       | A run, an optional inbox item, and later a pull request if the board executes the card           | A write-back to GitHub from the event adapter                |
| Human        | Confirm the draft. Answer questions on the card.                                                 | Unattended implementation                                    |

The first successful poll only sets a baseline. Later polls are at least 60 seconds apart and observe state changes, not a full webhook stream. Details are in [event-driven automation](/automate/event-driven/). The practice path is [issue automation](/workflows/issue-automation/).

## Example B. Pull request review

| Piece        | This release                                                                                      | Not this release                                        |
| ------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Trigger      | PR opened, updated, marked ready, closed, merged, labeled, commented, or reviewed                 | Check suites completed, or a review thread resolved     |
| Context      | PR fields in the event payload, including draft state and target branch filters                   | The last pusher's identity on a branch event            |
| Agent        | The employee on the Job                                                                           | A review bot that approves on the platform's behalf     |
| Steps        | The employee investigates and can leave a result in the session                                   | Automatic merge from the Job                            |
| Verification | You read the session. Merge and production stay on the release lane when that integration exists. | A substitute for GitHub review                          |
| Output       | A run and whatever the employee was allowed to produce                                            | A guaranteed review comment on GitHub                   |
| Human        | The review decision, and any release approval                                                     | Username allow lists and multi-repository subscriptions |

## Example C. Kanban-driven Software Factory

| Piece        | This release                                                                                                      | Not this release                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Trigger      | A ready card, a lane scan, or a lane pipeline trigger                                                             | A hand-moved status that pretends to run     |
| Context      | The card, the project, allowed repositories, and the lane's employees                                             | A per-card sandbox or preview browser        |
| Agents       | Lane employees and allowlisted code executors such as test admit, release advance, and batch move                 | A catalog of other coding agents             |
| Steps        | Confirm requirements, develop, batch on Test deployment, record test results, then merge or release if integrated | Unattended deployment on the Production lane |
| Verification | Test results and a human comparison with the acceptance criteria                                                  | An automatic business score                  |
| Output       | Session, code reference or pull request, test record, and the decision on the card                                | A second evidence product                    |
| Human        | Confirm the draft, answer the card, take over, and decide release                                                 | A WIP limit                                  |

Walk one card in [your first Software Factory workflow](/getting-started/first-software-factory/). The board relationship is in [Kanban automation workbench](/workflows/kanban-workbench/).

## Example D. Scheduled research

| Piece        | This release                                                         | Not this release                          |
| ------------ | -------------------------------------------------------------------- | ----------------------------------------- |
| Trigger      | A cron rule on a Job, or a cron trigger on a pipeline                | A research-agent product                  |
| Context      | The task text and the tools that employee is already allowed to call | A special multi-repository research scope |
| Agent        | One execution employee                                               | A team that fans out by itself            |
| Steps        | Run, produce an artifact, stop                                       | A loop counter or an open-ended monitor   |
| Verification | You check the sources in the artifact                                | A research score                          |
| Output       | The session and its files                                            | Automatic publication                     |
| Human        | Accept or reject the artifact before anyone acts on it               | Unattended distribution                   |

Sentry issue events and PagerDuty incident events are monitoring triggers on a Job. They are not this research schedule. See [research and monitoring](/workflows/research-monitoring/).

## Related guides

- [Automation concepts](/automate/fundamentals/) for Jobs, triggers, and runs
- [Create a workflow](/automate/workflow-builder/) for a Job and a lane pipeline
- [AI employees](/user-guide/ai-employees/), [runtime](/deployment/runtime-environments/), and [evidence](/software-factory/evidence/)
- [Workflow applications](/workflows/applications/)

## Limits

- A Job has no branch canvas. Branches, fan-out, and retry belong to a lane pipeline, and that pipeline is created for a workspace, board, and lane.
- Pipeline triggers in the editor are manual and cron. GitHub, webhook, Issue, and IM triggers belong to Jobs.
- GitHub events are polled with a token. They are not a webhook stream, and the adapter does not write back to GitHub.
- Skill workflows can declare skill, subagent, tool, human approval, parallel, condition, and branch steps. Confirm the runtime trace. Naming a step in prose does not create it.
- People still confirm scope, take over execution, and approve release.
