---
title: "Sessions, plans, and review"
description: "Control the scope of a session, inspect execution plans, and review tool actions before accepting a result."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

A session connects your request, the employee's execution, and the resulting files. Use one session for a coherent goal, and review the work through its plan, tool activity, and artifacts.

## Start and continue a session

Choose a ready employee in the intended workspace. Explain the goal, relevant files or source text, acceptance criteria, and which actions are permitted. Continue the same session when refining that goal. Use the employee's session history to return to earlier work; pin a session when you need frequent access.

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

When an authorization request appears, read the tool name and input preview before allowing or rejecting it. A read-only or expired interaction cannot be answered there. Use the session's Debug mode when you need the underlying event chronology or tool results.

## Review and reset deliberately

Open generated files and compare changes with your acceptance criteria. Submit a concrete correction in the same session, describing which result needs revision and the evidence required.

Clearing a conversation resets its messages and model context and cancels the current turn and unhandled queued messages. It does not restore workspace files or remove existing work orders. Review the confirmation before proceeding.

See [Agent Chat](/user-guide/agent-chat/), [artifacts and evidence](/user-guide/artifacts-evidence/), and [troubleshooting](/resources/troubleshooting/).
