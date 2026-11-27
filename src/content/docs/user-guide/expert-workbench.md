---
title: "Expert workbench overview"
description: "Use a Plugin App with a digital employee to complete a focused task and review the evidence."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-27"
---

An expert workbench combines a ready digital employee with a **Plugin App**. The employee provides the task execution and tool access. The Plugin App provides the task-specific interface for displaying a specification, browsing repository documentation, reviewing a report, or running an interactive check. This page focuses on apps exposed by employee plugins.

A Plugin App can appear in two places:

| Entry point                                        | What happens                                                                                                                                              |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Custom workbenches** in a workspace              | The workspace lists apps provided by installed and enabled plugins on ready employees. You can open an app directly and pin it to the main sidebar.       |
| A completed MCP tool result in an employee session | The app opens beside the result with the tool's saved input and output. This is useful when the interface explains or continues one particular tool call. |

The available apps depend on the employees installed in the workspace, the plugin version they use, and your workspace permissions.

## What to do in an expert workbench

| Task                           | Give the employee                                                   | Review in the app or session                                                      |
| ------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Requirements and specification | The request, constraints, examples, and source material             | Scope, unresolved questions, acceptance criteria, and the source of each decision |
| Architecture design            | The confirmed specification, interface contract, and relevant files | Component boundaries, dependencies, and architecture decisions                    |
| Code review                    | A PR or changed files and the agreed criteria                       | Findings with file locations, missing evidence, and suggested changes             |
| Test design and verification   | Acceptance criteria, target revision, and test environment          | Test cases, observed results, and remaining gaps                                  |

Try all four tasks in the [data export permissions example](/getting-started/expert-workbench-example/).

## Open an app from the workspace

1. Open the target workspace and choose **Custom workbenches** in the workspace navigation.
2. Choose an app and open it. If the app provides a repository selector, select a synced repository that you are allowed to read. If it provides a project chat, use that chat to ask the employee about the displayed material.
3. Use the app's controls to inspect the initial data, call the tools it exposes, or read its authorized resources. An app can only use the tools and resources declared for its current app session.
4. When the app offers **Discuss** or a similar action, review the text it prepares before sending it to the employee. Selected app context is submitted with the next message only after you send it.
5. Pin a workbench when you return to it often. A pinned app appears below **Workbench** in the main sidebar.

The app may also provide a session report. When it does, compare the report's run or revision with the work you are reviewing. [Provide task context](/user-guide/knowledge-context/) explains how to give the employee the documents and constraints the app needs.

## Open an app from a tool result

1. In an employee session, run the MCP tool that provides the app interface.
2. On the completed tool result, choose the action to open its app.
3. Review the restored tool input and result before using the app. The app starts from that saved call, so you can inspect the same evidence that produced the result.
4. Use the app to request a follow-up, add context to the message draft, or inspect an authorized resource. Review the draft in the session before sending it.

Some apps can request a model response or ask to open a link or download a file. The console asks for confirmation before those actions. The exact actions available depend on the app and the current session.

## Check access and readiness

A workbench is listed when its employee is ready, the plugin is installed and enabled for that employee, and your account can execute work in the workspace. If the workspace has no matching app, check the employee's plugin version and readiness with the person who manages the workspace. A missing external connection still needs to be granted separately. Opening a Plugin App does not grant credentials to an employee or to an external service.

## Review and hand off the result

The app is the working interface. The employee session keeps the conversation, tool calls, drafts, and execution records. Review the source, plugin or repository revision, expected result, and evidence before accepting the output. Use [Review results and artifacts](/user-guide/artifacts-evidence/) to inspect files and reports.

When the same change needs several roles or staged verification, connect the confirmed specification, implementation reference, and test evidence to a delivery card. The delivery workbench tracks assignment, handoff, and acceptance across roles. [Deliver an issue on an existing board](/getting-started/quickstart/).

To build one of these interfaces, see [Build a Plugin App](/developer/plugin-apps/) and the [Plugin App API](/developer/plugin-app-api/).
