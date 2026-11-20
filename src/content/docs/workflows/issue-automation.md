---
title: "Issue automation"
description: "Start from a GitHub issue or an inbox item, then investigate and route confirmed work into delivery."
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Issue automation starts a workflow when an issue appears, and keeps the investigation in a run you can inspect. The current product ingests GitHub issues, can import tasks into the inbox, and can route a confirmed item onto the delivery board. It does not ship a classifier, a duplicate detector, or a priority model.

## What it is

An issue event or imported task becomes an inbox item or Job input. A Job can investigate and file a request in the inbox or directly on a delivery board. Development follows the target board’s [intake rules](/software-factory/intake/), including any required human confirmation.

## When to use it

Use it when external issues should wake an employee or land in the inbox. Use the board alone when the work already starts as a delivery draft. Use a pull request trigger when the unit of work is an existing pull request rather than an issue. That path is [pull request automation](/workflows/pull-request-automation/).

## How it works

```text
GitHub issue poll or inbox import
        → Job run or inbox item
        → delivery draft → requirements clarification → lane execution → verification → pull request
```

| Stage           | Available now                                                                            | Planned, and not a hidden setting                    |
| --------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Event ingestion | GitHub token polling for issue open, close, reopen, labels, and comments                 | GitHub App, repository webhooks, historical backfill |
| Import          | GitHub and Yunxiao pickers. Jira and Linear when an administrator has connected a source | A self-serve Linear setup guide                      |
| Classification  | You can ask the employee, in the Job task, to label what it found                        | A platform classifier                                |
| Duplicates      | Collection uses stable source identities so the same item is not filed twice             | A semantic duplicate detector                        |
| Priority        | A person decides, or the employee proposes a priority in its answer                      | A priority engine                                    |
| Assignment      | The Job already names its employee. The board uses the lane's employee.                  | Automatic routing across a team                      |
| Implementation  | The board admits a clarified draft under its configured intake rules                     | Commits directly from the source event               |
| Verification    | Run inspection, then board tests and acceptance review                                   | Automatic issue resolution                           |
| Update          | Task inbox state, card evidence, and a pull request from delivery                        | GitHub write-back from the poller                    |
| Failure         | Failed, timed out, or rejected runs; dead-letter after repeated technical failures       | Manual replay of old events                          |

Polling details, including the 60-second floor and the baseline on first sync, are in [event-driven automation](/automate/event-driven/).

## How to configure it

1. Save a GitHub token under the workspace's external credentials. Import the repository with a connection that references that token. The token is not copied onto the Job.
2. Create a Job on the employee that should investigate. Add a GitHub issue event and the conditions you need, such as a label. New rules start disabled.
3. If the Job should file requests, configure **Collect tasks / issues** before running and publishing it. Choose **Task inbox** for a review queue or select a workbench project for a delivery draft. The collection UI requires Claude Code. Record the collection receipt even when no items match.
4. Preview a sample to check the matching rules and input schema. Then run the Job manually with a representative input and inspect its run and collection receipt.
5. Publish the Job and enable the rule after the manual result is satisfactory. The first successful poll establishes a baseline and does not replay history.
6. For the inbox destination, open the item and [create a workbench draft](/user-guide/inbox-tasks/). For the project destination, open the draft directly in the target workbench. Follow the board’s intake rules and check scope, acceptance criteria, and allowed repositories on the draft.

Jira and Linear appear as import sources. They import only through a connection an administrator has already authorized. GitHub and Yunxiao have their own repository or project pickers. Setup for each host is in [GitHub](/integrations/github/), [Yunxiao Codeup](/integrations/yunxiao/), [Jira](/integrations/jira/), and [Linear](/integrations/linear/).

## A practical issue

When a GitHub issue is opened in the watched repository, the Job investigation records its result in a Run. Check the collection receipt for the chosen destination. Follow the delivery card and its test records after it enters Development. Respond on the card when the configured flow requires a human decision.

## Failure and recovery

Check both the Job and the rule. A paused source does not admit waiting events, and turning it back on starts a new baseline instead of replaying the gap. Rejected events, such as a schema or permission failure, are not retried forever. Fix the cause and let a new event in. Runs and recovery are documented in [runs and recovery](/automate/runs-recovery/).

## Related guides

- [GitHub](/integrations/github/)
- [Event-driven automation](/automate/event-driven/)
- [Task inbox](/user-guide/inbox-tasks/)
- [Issue to PR](/recipes/issue-to-pr/)
- [Workflow concepts](/workflows/concepts/) and [applications](/workflows/applications/)

## Limits

Do not write a tutorial that classifies, prioritizes, assigns, and resolves an issue with no person in the loop. Those verbs are not separate product stages today. The supported loop is ingest, investigate, confirm, then deliver on the board.
