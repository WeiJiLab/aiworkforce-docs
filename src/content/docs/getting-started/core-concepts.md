---
title: "Core concepts"
description: "See how AI employees, capabilities, automation, Software Factory, and governance work as one system."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

AI Workforce is not a set of isolated features. Five abstractions cooperate: an employee does the work, capabilities say how, automation decides when, Software Factory carries engineering work through verification, and governance decides what is allowed to continue.

Use the same words in a conversation, an inbox item, an automation run, and a delivery card. Those records can show different states because they answer different questions.

## Five abstractions

| Abstraction      | Question it answers                                     | What you inspect                                       |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| AI employee      | Who is responsible for this outcome?                    | Role, workspace instance, and readiness                |
| Capabilities     | Which methods and tools can that employee use?          | Skills, plugins, tools, and MCP dependencies           |
| Automation       | What starts the work, and what happens after it starts? | Job, triggers, and an individual run                   |
| Software Factory | How does engineering work reach a reviewed delivery?    | Intake, execution, verification, evidence, and release |
| Governance       | What is permitted, proven, and allowed to proceed?      | Permissions, evaluation, evidence, and human decisions |

A workspace groups the employees, resources, and context used together. Access to the workspace is separate from permission to manage it or to execute work.

## How they combine

An **AI employee** is the actor. A published template supplies a reusable role; the workspace employee is the instance you actually assign. Initialization has to finish before a session is useful. Creating the instance does not author the template. Builders define the role in [Build AI employees](/build/architecture/); users choose and task a published employee in [Using AI employees](/user-guide/ai-employees/).

**Capabilities** are how that actor works:

- A **Skill** is a reusable method for one kind of task.
- A **Plugin** packages skills and related agents.
- A **tool** performs an operation.
- An **MCP server** exposes external tools. Naming a server in the employee manifest documents the dependency. It does not store credentials or grant access.

Instructions describe intended behavior. The runtime and authorization decide which tools actually run. Read [Employee architecture](/build/architecture/) for the full composition, and [MCP servers](/build/mcp-integration/) for the employee-facing dependency. Protocol and connection setup live in [MCP integration](/integrations/mcp/).

**Automation** turns a signal into work. A Job defines the task and executor. A trigger — schedule, webhook, platform event, Issue, or IM, where that type is enabled — decides when to invoke it. A run records one execution. Publishing a Job does not create a run, and a successful run does not by itself resolve a business request. Automation is a way to start and recover work, not only a cron expression. See [Automation concepts](/automate/fundamentals/).

**Software Factory** is the engineering delivery system. Confirmed requirements become delivery cards. Employees execute lane work. Verification, evidence, and human review decide whether a change is ready to merge or release. It is not a promise that an agent writes code unattended. See [Software Factory](/software-factory/overview/).

**Governance** connects permission, evaluation, and evidence. A prompt that says "read only" does not replace a tool grant. A green conversation does not replace a test result or an acceptance decision. People keep the decisions that change scope, take over execution, or release software.

## Records that must stay distinct

| Record              | What it proves                                               |
| ------------------- | ------------------------------------------------------------ |
| Session             | The conversation and execution context for one goal          |
| Inbox task or issue | A tracked request, its source, and its review state          |
| Automation run      | One invocation of a Job, including failure and recovery      |
| Artifact            | An output, such as a report or file                          |
| Evidence            | Support for a claim: a source, test, linked session, or diff |
| Delivery card       | Engineering work moving through a configured board           |

An artifact can be useful without being correct. A collected inbox item is not approval to change code. A delivery card keeps requirements, executions, and human decisions together; the card's existence does not configure a repository or a pipeline.

## Shared layers

The same five abstractions sit on six layers that the rest of the documentation uses:

| Layer                      | Belongs here                       |
| -------------------------- | ---------------------------------- |
| Workforce capability       | Employee, Skills, Plugins          |
| Execution                  | Agent, harness, runtime            |
| Orchestration              | Automation and dispatch            |
| Engineering infrastructure | Environment and CI/CD              |
| Quality and assurance      | Verification, evidence, evaluation |
| Work management            | Inbox, artifacts, projects         |

[Platform overview](/getting-started/platform-overview/) maps these layers onto product surfaces. The [glossary](/concepts/glossary/) lists English and Chinese terms. [Quickstart](/getting-started/quickstart/) is the shortest path through a first session.
