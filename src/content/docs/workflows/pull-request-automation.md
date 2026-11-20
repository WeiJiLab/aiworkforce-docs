---
title: "Pull request automation"
description: "Start an employee when a polled GitHub pull request event matches. Merge stays on the release lane."
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Pull request automation is an event-driven workflow. A Job watches pull request activity through GitHub token polling and runs one employee. It is the same automation model as [issue automation](/workflows/issue-automation/), with a different event. It does not approve, merge, or release on its own.

## What it is

You define the Job, the repository source, and the pull request conditions. Automation admits a matching observation as a run. The employee investigates inside that run. If the change should move through test and merge, that continuation is the delivery board's release lane, not a second engine inside the Job.

## When to use it

Use it to react to a pull request opening, a changed head SHA, a ready-for-review transition, a comment, or a review. Use the [Kanban workbench](/workflows/kanban-workbench/) when the platform itself is producing the change and must carry it through test and release. Use issue automation when the source is an issue rather than a pull request.

## How it works

```text
Pull request observation → rule match → one Run → employee session
        → person reads the result
        → release lane, only if this change is already on the board
```

Supported observations are pull request open, head SHA change, ready for review, close, merge, reopen, labels, conversation comments, review submission or dismissal, and line comments. Conditions can include the target branch, draft state, review state, label, or comment text. Several conditions on one rule match with OR.

The poll compares the open pull request list. A pull request that is opened and closed between two polls can be missed. Review scans cover pull requests updated in the last seven days. Pending reviews do not trigger. Bot authors do not trigger. `Checks completed` and resolved review threads are not events in this release.

## How to configure it

1. Connect the repository with the workspace GitHub token, as described in [GitHub](/integrations/github/).
2. On the Job, choose a pull request event and the narrowest condition that should wake the employee. Leave the rule disabled until you have inspected a manual run.
3. Preview a sample. Preview does not create a run and does not post to GitHub.
4. Publish and enable. Read the run's status, session, and input. The input is the event envelope. It does not include the token, and it does not mean the runtime checked out that commit.
5. If the employee should comment or push, that permission comes from the employee's own repository grant. The polling token's read access does not grant it.

## A practical review

Trigger: a pull request is marked ready for review. Context: the event's repository, number, branch, and draft flag. Agent: the Job's employee. Steps: read the event, inspect what the grant allows, and write the finding in the session. Verification: you compare the finding with the diff. The platform does not record a GitHub review unless the employee, using its own grant, actually submitted one. Output: the run and the session. Human points: whether the finding is accepted, and any merge on the release lane.

## Related guides

- [GitHub](/integrations/github/)
- [Event-driven automation](/automate/event-driven/)
- [Review and release](/software-factory/review-release/)
- [Workflow concepts](/workflows/concepts/)

## Limits

There is no one-step "review every pull request" template, no check-suite trigger, and no automatic merge from this Job. A branch event cannot reliably identify the pusher, so a Job that pushes to a watched branch can observe itself. Give that Job a separate output branch.
