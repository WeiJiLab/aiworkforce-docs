---
title: "Core concepts"
description: "Understand the shared vocabulary used across employees, sessions, automation, and delivery."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Use these concepts when describing work to an employee or discussing a result with your team. They also explain why a conversation, an inbox item, and an automation run can show different states.

## Workspace and employee

A **workspace** groups the employees, resources, and work context used for collaboration. Access to a workspace and permission to manage or execute work are separate concerns.

An **AI employee** is a configured worker with a defined responsibility. A published **template** supplies reusable capabilities; a workspace employee is the instance you actually work with. Creating an employee includes initialization, so wait until it is ready before beginning a session.

A **Skill** describes how to perform a task. A **Plugin** packages capabilities that can include Skills and agents. A **tool** performs an operation; an **MCP server** exposes external tools through the Model Context Protocol. Instructions describe intended behavior, while the execution environment and authorization determine the available tools.

## Session, task, and run

A **session** is the conversation and execution context for work with an employee. Continue a session to refine the same task; begin another when the goal or context changes substantially.

A **task or issue** in the inbox is a tracked request. Its source and review state belong to that request. It may be linked to delivery work, but collecting it does not approve implementation.

An **automation definition** describes repeatable work and its configured triggers. A **run** records a particular execution. Publishing a definition does not itself create a run, and a successful run does not automatically prove that a collected business request has been resolved.

## Artifact and evidence

An **artifact** is an output such as a report or source file. **Evidence** supports a claim: a source excerpt, test result, linked session, or inspected change. A generated file can be useful without proving that its contents are correct.

A **delivery card** tracks work through a configured board. Stages, assigned employees, review decisions, and associated sessions help the team understand progress.

## Put the concepts into practice

Before starting, name the workspace, desired outcome, required inputs, and reviewer. After execution, inspect the artifact and the evidence supporting each acceptance criterion. If something is blocked, identify whether the problem concerns a request, a particular run, or the employee's setup.

See the [glossary](/concepts/glossary/) for English–Chinese terminology and the [quickstart](/getting-started/quickstart/) for a first session.
