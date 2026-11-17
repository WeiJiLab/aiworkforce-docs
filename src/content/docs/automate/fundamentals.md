---
title: "Automation fundamentals"
description: "Understand Jobs, triggers, runs, and the separate actions that control automatic execution."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

An Automation **Job** defines what work to perform and which employee or supported executor performs it. A **trigger** defines when to invoke that Job. A **run** records one execution. Keeping these concepts separate makes it easier to inspect failures and change a schedule without losing the task's identity.

## Create a bounded Job

Open **Automations** at `/automations`. Choose an execution employee in a workspace you can operate. Give the Job a concrete task, expected inputs, and an inspectable output. Begin with a small task that can be checked manually.

Decide whether each run should use a new session or reuse the Job's bound session. A new session separates runs; reuse allows context to accumulate. When collaborators manually run a reused-session Job, it retains its bound session.

## Save, run, publish, enable

These actions have distinct effects:

| Action                     | Effect                                                         |
| -------------------------- | -------------------------------------------------------------- |
| Save draft                 | Save configuration for further editing.                        |
| Run manually               | Create an execution to inspect now.                            |
| Publish                    | Publish the execution configuration; it does not create a run. |
| Enable automatic execution | Allow configured automatic triggers to invoke the Job.         |

Publication does not require a successful test. Try the Job and inspect its result before enabling a recurring trigger. A paused published Job can still be run manually; that manual run does not resume its automatic triggers.

## Add a trigger and a destination

The platform supports schedule, webhook, platform-event, Issue, and IM trigger types where available. A Job can have multiple scheduling rules; each rule belongs to one Job. Review the rule's input and enabled state as well as the Job's state.

For tasks that collect actionable requests, add **Collect tasks / issues** and choose the workspace inbox or workbench project. This tool is optional. When configured, successful collection requires a server receipt; a summary in chat is not a saved Issue. A run with no matching items must record the empty-collection result. The current collection UI requires the Claude Code runtime.

## Inspect and recover

Open run history and inspect status, output, session, and any collection receipt. If a run fails, resolve missing authorization, invalid inputs, or unavailable tools before retrying. For collection tasks, use stable source identities to avoid duplicate requests. A workbench draft still needs human confirmation before development begins.

## Related guides

- [Inbox and tasks](/user-guide/inbox-tasks/)
- [Issue to PR](/recipes/issue-to-pr/)
- [MCP integration](/build/mcp-integration/)
