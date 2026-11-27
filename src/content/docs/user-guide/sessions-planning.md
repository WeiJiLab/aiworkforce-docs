---
title: "Track execution progress"
description: "Check session status, follow an execution plan, and see what tools the digital employee used."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

A session connects your request, the employee’s execution, and the resulting files. After you send a task, use the session status, execution plan, and tool activity to see what has happened and whether the employee needs your input.

## Check session status

The interface distinguishes working, waiting for attention, failed, and interrupted sessions. An idle conversation is not evidence that every business requirement has been satisfied. Automation and delegated sessions may be available as execution records rather than editable conversations.

## Choose an execution boundary

Where the selected runtime supports them, the composer offers these permission modes:

| Mode                       | Intended behavior                                                   |
| -------------------------- | ------------------------------------------------------------------- |
| Default permissions        | Ask when an operation needs authorization.                          |
| Accept edits automatically | Accept file edits; other operations can still require confirmation. |
| Plan mode                  | Develop a plan without directly editing files.                      |
| Skip confirmation          | Execute operations automatically with the permitted runtime access. |

Check the current mode before sending. The product can retain session settings; do not infer the mode from a previous conversation. For a connected device, commands run as its local operating-system user. Its working directory is not an operating-system sandbox, and the device authorization controls apply instead of the cloud permission selector.

## Follow plans and tool actions

When the runtime reports a plan, **View execution plan** appears. Open it to inspect pending, active, completed, or failed steps. A plan is not shown for every response, and a completed step is a progress signal rather than independent verification.

When an authorization request appears, read the tool name and input preview before allowing or rejecting it. A read-only or expired interaction cannot be answered there. See [Human approval](/user-guide/human-approval/). Use the session's Debug mode when you need the underlying event chronology or tool results.

## Check execution records in the workbench

Security Review, Code Review, and Test Evidence show saved app context. When reading a finding, confirm that its file location belongs to the current PR snapshot. When switching test runs, confirm that the report ID and revision change together. **Employee ready** means the app can call the employee. It does not mean that a permission check or test has passed.

## Clear a conversation

**Clear context** is in the composer of an editable main-agent session that uses cloud execution. It resets messages and model context, cancels the current turn, and clears unhandled queued messages. Workspace files and existing work orders are retained.

When the work is ready to check, see [Review results and artifacts](/user-guide/artifacts-evidence/). For execution problems, see [troubleshooting](/resources/troubleshooting/).
