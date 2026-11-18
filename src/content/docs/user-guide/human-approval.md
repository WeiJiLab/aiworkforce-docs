---
title: "Human approval"
description: "Decide when a person must confirm scope, take over execution, or accept a result before anyone acts on it."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Human approval is a decision, not a status badge. AI Workforce asks for it when a request would change scope, when execution needs a person to continue, and when a result is about to be treated as accepted. Using an employee does not include editing the employee package. This page is about the decisions in front of you.

## Where a person decides

| Moment              | What you confirm                                     | What confirmation does not do               |
| ------------------- | ---------------------------------------------------- | ------------------------------------------- |
| Inbox review        | The item is real and worth a next step               | Start coding or approve a repository        |
| Workbench draft     | Scope, acceptance criteria, and allowed repositories | Grant missing credentials or fix a pipeline |
| In-session question | A clarification the employee asked for               | Silently widen the task                     |
| Takeover            | You are doing the next step yourself                 | Clear itself when a pause resumes           |
| Review              | The artifact or change meets the criteria you named  | Prove an unrun test passed                  |

A collected inbox item is not approval. A fluent answer is not approval. Accepting a result means you can point at the output and the evidence. [Artifacts and evidence](/user-guide/artifacts-evidence/) is how you read that output.

## Take over and hand back

On a delivery card, taking over stops automatic progress and keeps the current state. Record what you changed. Hand the work back through the recovery action when the lane should continue. Resuming a pause does not clear a takeover. Ending follow-up on a pull request does not close the external pull request.

For an automation, a manual run of a paused Job does not re-enable its triggers. If a run is waiting on a person, resolve that decision before retrying. See [approvals and notifications](/automate/approvals/).

## Keep the decision specific

Name the decision, the scope, and the evidence. "Approve the stated requirements for the frontend repository only" is a decision. "Looks good" is not. If you waive a check, name the check, the reason, the scope, and the remaining risk.
