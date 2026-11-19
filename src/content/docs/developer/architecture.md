---
title: "Platform architecture"
description: "Understand how workspaces, employees, sessions, automation, and delivery records fit together."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

AI Workforce combines a product workspace with employee execution and structured work records. The same employee can participate in an interactive session, an Automation run, or a delivery lane, while each entry point retains its own task and execution context.

## Product and execution layers

| Layer                               | Responsibility                                                                                 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| Product interface                   | Workspaces, employee profiles, conversations, Task inbox, Automations, and delivery workbench. |
| Application services                | Coordinate authorization, configuration, session preparation, execution, and persistence.      |
| Domain model                        | Define employees, sessions, Issues, Jobs, triggers, runs, and delivery state.                  |
| Infrastructure and runtime adapters | Connect storage, execution runtimes, MCP tools, code hosts, and external services.             |

The frontend is a TypeScript React application. The Python backend organizes application use cases, domain rules, and infrastructure integrations separately. Runtime integrations supply execution capabilities; available tools and execution behavior depend on the configured runtime and the employee instance.

## From role to execution

A published template supplies a starting role and capabilities. Creating a workspace employee produces an instance that must finish initialization before use. A session then carries its conversation and execution context, including the capabilities and authorized resources prepared for that execution.

A Skill supplies a working method. A Plugin packages capabilities. MCP connects external tools. These are related building blocks, not interchangeable names for an employee.

## Work and orchestration

A Task inbox item records an actionable item and its source observations. It can be routed into a workbench draft for requirements confirmation. Delivery cards connect confirmed requirements to lane executions, code references, verification, and human intervention. Batches coordinate cards where a stage operates on a shared candidate.

An Automation Job stores an execution definition. Triggers invoke published Jobs when automatic execution is enabled. Each invocation creates a run with a recorded outcome. Reused-session Jobs can accumulate context; new-session Jobs keep executions separate.

## Authorization and evidence

Workspace access determines who can view or operate resources. Repository credential use is also checked against the execution employee's current authorization. A source definition or natural-language constraint cannot grant access on its own.

Use persisted records to follow what happened: the session for the conversation, the run for Automation status, the Issue receipt for saved collection, and delivery records for code, tests, merge, and release. These records answer different questions and should be inspected together.

This documentation site is a separate static Astro application. Its Pagefind search runs over published documentation; it does not query private workspace conversations or execute platform actions.

## Related guides

- [Core concepts](/getting-started/core-concepts/)
- [Agent definition](/build/employee-definition/)
- [Automation fundamentals](/automate/fundamentals/)
- [Software Factory overview](/software-factory/overview/)
