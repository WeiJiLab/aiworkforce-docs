---
title: "Core concepts"
description: "Understand how Software Factory, automation, execution roles, and governance work together."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

An Issue can enter the inbox and be routed to a draft on the delivery board. The team confirms the requirement before development. Software Factory coordinates delivery, Automation starts work from a trigger, and AI employees execute within their permissions. The team uses the evidence to decide what happens next.

Use the same words in a conversation, an inbox item, an automation run, and a delivery card. Those records can show different states because they answer different questions.

## Five abstractions

| Abstraction      | Question it answers                                     | What you inspect                                       |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Software Factory | How does engineering work reach a reviewed delivery?    | Intake, execution, verification, evidence, and release |
| Automation       | What starts the work, and what happens after it starts? | Job, triggers, and an individual run                   |
| AI employee      | Who performs the assigned work?                         | Role, workspace instance, and readiness                |
| Capabilities     | Which methods and tools can that employee use?          | Skills, plugins, tools, and MCP dependencies           |
| Governance       | What is permitted, proven, and allowed to proceed?      | Permissions, evaluation, evidence, and human decisions |

A workspace groups the employees, resources, and context used together. Access to the workspace is separate from permission to manage it or to execute work.

## How they combine

**Software Factory** coordinates engineering delivery on a board. Once a person confirms the requirement on a draft card, the employees assigned to its lanes can implement the change and prepare verification. The team reviews the evidence to decide whether the change is ready to merge or release. See [Software Factory](/software-factory/overview/).

**Automation** turns a signal into work. A Job defines the task and executor. A schedule, webhook, platform event, Issue, or IM message can trigger a Job where the deployment supports it. Each execution creates a run record for the team to inspect. See [Automation concepts](/automate/fundamentals/).

An **AI employee** is the actor. A published template supplies a reusable role; the workspace employee is the instance you actually assign. Initialization has to finish before a session is useful. Creating the instance does not author the template. Builders define the role in [Build AI employees](/build/architecture/); users choose and task a published employee in [Using AI employees](/user-guide/ai-employees/).

**Capabilities** are how that actor works:

- A **Skill** is a reusable method for one kind of task.
- A **Plugin** packages skills and related agents.
- A **tool** performs an operation.
- An **MCP server** exposes external tools. Naming a server in the employee manifest documents the dependency. It does not store credentials or grant access.

Instructions describe intended behavior. The runtime and authorization decide which tools actually run. Read [Employee architecture](/build/architecture/) for the full composition, and [MCP servers](/build/mcp-integration/) for the employee-facing dependency. Protocol and connection setup live in [MCP integration](/integrations/mcp/).

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

[Platform overview](/getting-started/platform-overview/) maps these concepts to product surfaces. The [glossary](/concepts/glossary/) lists English and Chinese terms. Follow the [quickstart](/getting-started/quickstart/) to take one Issue through the delivery workbench.
