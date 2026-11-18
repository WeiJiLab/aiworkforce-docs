---
title: "Issue automation"
description: "Start from a GitHub issue or an inbox item, then investigate and route confirmed work into delivery."
status: limited
sidebar:
  badge:
    text: Limited
    variant: caution
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Issue automation starts a workflow when an issue appears, and keeps the investigation in a run you can inspect. The current product ingests GitHub issues, can import tasks into the inbox, and can route a confirmed item onto the delivery board. It does not ship a classifier, a duplicate detector, or a priority model.

## What it is

An issue event or an imported task becomes an inbox item or the input of a Job. The Job's employee investigates. A person confirms scope before anyone changes code. After confirmation, Software Factory and the [Kanban workbench](/workflows/kanban-workbench/) execute the card. The issue path and the board path are one workflow with a human gate, not two engines.

## When to use it

Use it when external issues should wake an employee or land in the inbox. Use the board alone when the work already starts as a delivery draft. Use a pull request trigger when the unit of work is an existing pull request rather than an issue. That path is [pull request automation](/workflows/pull-request-automation/).

## How it works

```text
GitHub issue poll or inbox import
        → Job run or inbox item
        → person confirms scope
        → delivery draft → lane execution → verification → pull request
```

| Stage           | Available now                                                                            | Planned, and not a hidden setting                    |
| --------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Event ingestion | GitHub token polling for issue open, close, reopen, labels, and comments                 | GitHub App, repository webhooks, historical backfill |
| Import          | GitHub and Yunxiao pickers. Jira and Linear when an administrator has connected a source | A self-serve Linear setup guide                      |
| Classification  | You can ask the employee, in the Job task, to label what it found                        | A platform classifier                                |
| Duplicates      | Collection uses stable source identities so the same item is not filed twice             | A semantic duplicate detector                        |
| Priority        | A person decides, or the employee proposes a priority in its answer                      | A priority engine                                    |
| Assignment      | The Job already names its employee. The board uses the lane's employee.                  | Automatic routing across a team                      |
| Implementation  | After confirmation, the development lane                                                 | Unattended commits from the event                    |
| Verification    | Run inspection, then board tests and acceptance review                                   | Automatic issue resolution                           |
| Update          | Inbox state, card evidence, and a pull request from delivery                             | GitHub write-back from the poller                    |
| Failure         | Failed, timed out, or rejected runs; dead-letter after repeated technical failures       | Manual replay of old events                          |

Polling details, including the 60-second floor and the baseline on first sync, are in [event-driven automation](/automate/event-driven/).

## How to configure it

1. Save a GitHub token under the workspace's external credentials. Import the repository with a connection that references that token. The token is not copied onto the Job.
2. Create a Job on the employee that should investigate. Add a GitHub issue event and the conditions you need, such as a label. New rules start disabled.
3. Preview a sample. Preview checks the match and the input schema. It does not create a run.
4. Publish the Job and enable the rule only after a manual run looks right. The first successful read establishes a baseline and does not replay history.
5. If the Job should file inbox items, add **Collect tasks / issues** and choose the inbox or a workbench project. The collection UI requires the Claude Code runtime. A sentence in the chat is not a saved issue. An empty collection still has to record that nothing matched.
6. Open the inbox item, route it to a workbench draft, and confirm scope, acceptance criteria, and repositories. Then follow [your first Software Factory workflow](/getting-started/first-software-factory/).

Jira and Linear appear as import sources. They import only through a connection an administrator has already authorized. GitHub and Yunxiao have their own repository or project pickers. Setup for each host is in [GitHub](/integrations/github/), [Yunxiao Codeup](/integrations/yunxiao/), [Jira](/integrations/jira/), and [Linear](/integrations/linear/).

## A practical issue

Trigger: a GitHub issue is opened in a repository the rule watches. Context: the whitelisted event fields and the workspace. Agent: the Job's employee. Steps: investigate, collect an inbox item if configured, stop for confirmation, then develop only on the confirmed card. Verification: you read the run before confirmation, and the board records tests after development. Output: the run, the inbox item, and later the card's pull request. Human points: enablement, draft confirmation, card questions, and release.

## Failure and recovery

Check both the Job and the rule. A paused source does not admit waiting events, and turning it back on starts a new baseline instead of replaying the gap. Rejected events, such as a schema or permission failure, are not retried forever. Fix the cause and let a new event in. Runs and recovery are documented in [runs and recovery](/automate/runs-recovery/).

## Related guides

- [GitHub](/integrations/github/)
- [Event-driven automation](/automate/event-driven/)
- [Inbox and tasks](/user-guide/inbox-tasks/)
- [Issue to PR](/recipes/issue-to-pr/)
- [Workflow concepts](/workflows/concepts/) and [applications](/workflows/applications/)

## Limits

Do not write a tutorial that classifies, prioritizes, assigns, and resolves an issue with no person in the loop. Those verbs are not separate product stages today. The supported loop is ingest, investigate, confirm, then deliver on the board.
