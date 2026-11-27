---
title: "Expert workbench overview"
description: "Work through Security Review, Code Review, and Test Evidence views, then hand the decision back to the digital employee."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-27"
---

An expert workbench combines a ready digital employee with a **Plugin App**. The employee provides the task execution and tool access. The Plugin App provides the task-specific interface for displaying a specification, browsing repository documentation, reviewing a report, or running an interactive check. This page focuses on apps exposed by employee plugins and the review decisions you make along the same evidence trail.

A Plugin App can appear in two places:

| Entry point                                        | What happens                                                                                                                                              |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Custom workbenches** in a workspace              | The workspace lists apps provided by installed and enabled plugins on ready employees. You can open an app directly and pin it to the main sidebar.       |
| A completed MCP tool result in an employee session | The app opens beside the result with the tool's saved input and output. This is useful when the interface explains or continues one particular tool call. |

The available apps depend on the employees installed in the workspace, the plugin version they use, and your workspace permissions.

## Choose a task view

| View                | Give the employee                                            | Action in the app                                                         |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------- |
| **Security Review** | Permission scope, sensitive data, and architecture decisions | Filter risks, open evidence locations, and ask for proof                  |
| **Code Review**     | PR snapshot, changed files, and acceptance criteria          | Locate findings, request changes, or accept the review                    |
| **Test Evidence**   | Test environment, revision, and run records                  | Compare initial and retest evidence, then accept or continue verification |

Switch between the three views in the [data export permissions example](/getting-started/expert-workbench-example/) to follow the path from security boundary to release decision.

## Open an app from the workspace

1. Open the target workspace and choose **Custom workbenches** in the workspace navigation.
2. Choose an app and open it. Confirm that the employee, repository, pull request, or run shown at the top matches the task.
3. Choose **Security Review**, **Code Review**, or **Test Evidence**, then use filters, disclosures, and revision controls to narrow the review.
4. When evidence is missing, choose **Add to employee draft** or **Ask employee for evidence**. Review the draft before sending.
5. Choose **Accept security review**, **Request changes**, or **Accept test evidence** after checking the linked evidence. Pin a workbench when you return to it often.

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

The app is the working interface. The employee session keeps the conversation, tool calls, drafts, and execution records. Review the source, plugin or repository revision, expected result, and evidence before accepting the output. Use [Security and permissions](/deployment/security/) for authorization boundaries, [Review and release](/software-factory/review-release/) for delivery stages, and [Review results and artifacts](/user-guide/artifacts-evidence/) for files and reports.

When the same change needs several roles or staged verification, connect the confirmed specification, implementation reference, and test evidence to a delivery card. The delivery workbench tracks assignment, handoff, and acceptance across roles. [Deliver an issue on an existing board](/getting-started/quickstart/).

To build one of these interfaces, see [Build a Plugin App](/developer/plugin-apps/) and the [Plugin App API](/developer/plugin-app-api/).
