---
title: "Core concepts"
description: "Workflow defines the work, automation starts it, and an employee executes it. Runs, tasks, and evidence stay separate records."
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Use one set of words for a conversation, an inbox item, an automation run, and a delivery card. The records can show different states because they answer different questions.

For a software change, the default path is a confirmed card on the delivery board. An Issue can enter the inbox and be routed to that draft before development starts.

A template defines the part of a role the team can delegate. A workspace employee uses that template and its own project access to take on tasks. A workflow describes how a task proceeds, and a trigger determines when it starts. Review the result of each task against its acceptance criteria.

## The core records

| Record     | Question it answers                                 | What you inspect                                        |
| ---------- | --------------------------------------------------- | ------------------------------------------------------- |
| Workflow   | How should this kind of work be performed?          | Board lanes, a lane pipeline, or a skill workflow       |
| Automation | What starts it, and what keeps the next run coming? | The Job or pipeline trigger. Not a synonym of workflow. |
| Agent      | Who performs a step?                                | A digital employee, or a lane's code executor           |
| Run        | What happened this time?                            | One Job run or one pipeline run                         |
| Task       | What is the unit of work?                           | An inbox item, a delivery card, or a pipeline node      |
| Evidence   | What supports the claim that the work is done?      | Session, diff, test, and the human decision             |

A workspace groups the employees, resources, and context used together. Access to the workspace is separate from permission to manage it or to execute work.

## How they combine

A **workflow** is reusable. On a delivery board it is the lanes and their rules. In Automations → Pipeline it is a graph of that lane's executors. Inside an Agent Package it is the workflow declared on a skill. [Workflow concepts](/workflows/concepts/) is the full map, including what is not on the screen.

**Automation** is the Job or the pipeline trigger. A trigger can be manual, a schedule, a webhook, a polled GitHub event, an Issue, an IM message, or the board noticing a ready card. Publishing does not create a run. See [automation concepts](/automate/fundamentals/).

An **AI employee** is the actor. A published template supplies a reusable role. The workspace employee is the instance you assign. Initialization has to finish before a session is useful. Builders define the role in [agent definition](/build/employee-definition/). Users choose a published employee in [AI employees](/user-guide/ai-employees/).

**Capabilities** are how that actor works:

- A **skill** is a reusable method for one kind of task.
- A **plugin** packages skills and related agents.
- A **tool** performs an operation.
- An **MCP server** exposes external tools. Naming a server in the employee manifest documents the dependency. It does not store credentials or grant access.

Instructions describe intended behavior. The runtime and authorization decide which tools actually run.

**Software Factory** carries a confirmed engineering request through the board. It is one [workflow application](/workflows/applications/), together with issue handling and scheduled work. It is not a promise that an agent writes code unattended.

## Capabilities, control, and proof

| Need                  | Where it lives                                     | Do not confuse it with                                     |
| --------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| Dispatch              | Assigning a ready card to the lane employee        | Orchestration, which moves cards and batches through lanes |
| Orchestration         | The workbench and a lane pipeline                  | A general multi-agent runtime                              |
| Workflow verification | Tests, acceptance criteria, and a human comparison | Employee evaluation, which checks a package or plugin      |
| Artifact              | The file, report, or code change                   | Evidence, which is why you believe the artifact            |
| Runtime               | Where the session executes                         | The environment's repositories, devices, and pipelines     |

A prompt that says "read only" does not replace a tool grant. A green conversation does not replace a test result. People keep the decisions that change scope, take over execution, or release software.

## Records that must stay distinct

| Record          | What it proves                                               |
| --------------- | ------------------------------------------------------------ |
| Session         | The conversation and execution context for one goal          |
| Task inbox item | A tracked request, its source, and its review state          |
| Automation run  | One invocation of a Job, including failure and recovery      |
| Pipeline run    | One pass through a lane pipeline, with a status per node     |
| Artifact        | An output, such as a report or file                          |
| Evidence        | Support for a claim: a source, test, linked session, or diff |
| Delivery card   | Engineering work moving through a configured board           |

An artifact can be useful without being correct. A collected inbox item is not approval to change code. A delivery card keeps requirements, executions, and human decisions together. The card does not configure a repository or a pipeline.

## Where to go next

[Quickstart](/getting-started/quickstart/) takes one Issue through a reviewed change on a configured board. [Your first workflow](/getting-started/first-automation/) adds a trigger only after a manual run makes sense. The [glossary](/concepts/glossary/) lists the English and Chinese terms.
