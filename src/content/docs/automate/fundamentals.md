---
title: "Automation concepts"
description: "Turn a signal into work with a Job, a trigger, and a run. A schedule is only one kind of trigger."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Automation starts work and records what happened. It is not only a cron job. A Job can be invoked by a schedule, a webhook, a platform event, an Issue, or an IM message when that trigger type is available. It can also be run by hand. The sections below keep the Job, the trigger, and the run separate so a failure has a place to look.

Event-driven starts are in [event-driven automation](/automate/event-driven/). Inbound webhooks are in [watchers and webhooks](/automate/watchers-webhooks/). Recurring work is in [loops and recurring work](/automate/loops/). A person stepping in is in [approvals and notifications](/automate/approvals/).

An Automation **Job** defines what work to perform and which employee or supported executor performs it. A **trigger** defines when to invoke that Job. A **run** records one execution. Keeping these concepts separate makes it easier to inspect failures and change a schedule without losing the task's identity.

## Create a bounded Job

Open **Automations** at `/automations`. Choose an execution employee in a workspace you can operate. Give the Job a concrete task, expected inputs, and an inspectable output. Begin with a small task that can be checked manually.

Before enabling a trigger, agree on which work the employee can do routinely and which decisions a person keeps. Write down the allowed tools and data sources, the evidence a reviewer needs, and what the employee should report if it cannot finish within scope. Use [approvals and notifications](/automate/approvals/) to plan how people will review exceptions.

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

### Example of recurring issue intake

Schedule a Job to review new defect reports from an authorized source each weekday. Ask the employee to capture the source link, observed behavior, and any available reproduction steps or missing information. Send candidates to the workspace inbox for triage. Review the first run against the source and its collection receipt. The triage owner decides which reports need clarification and which should be routed to a delivery draft. The [Issue to PR recipe](/recipes/issue-to-pr/) follows a report after that handoff.

## Inspect and recover

Open run history and inspect status, output, session, and any collection receipt. If a run fails, resolve missing authorization, invalid inputs, or unavailable tools before retrying. For collection tasks, use stable source identities to avoid duplicate requests. A workbench draft still needs human confirmation before development begins.

## Related guides

- [Inbox and tasks](/user-guide/inbox-tasks/)
- [Issue to PR](/recipes/issue-to-pr/)
- [MCP integration](/build/mcp-integration/)
