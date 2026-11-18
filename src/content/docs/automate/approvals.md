---
title: "Approvals and notifications"
description: "Put a person in an automation when the next step changes scope or accepts a result. There is no general notification product."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

An approval is a recorded human decision. A notification is how someone learns that a decision is waiting. The current product records decisions on inbox items, automation runs, and delivery cards. IM can be a trigger where that type is available. There is no separate notification center, escalation policy, or mailbox product documented as part of this release.

## Ask for a decision, not a status

Use an approval when the automation would otherwise widen scope, write to an external system, or treat a collected request as ready for development. The patterns that exist today:

- A collected Issue stays in the inbox or becomes a workbench draft. Development waits for confirmation.
- A run can be inspected, retried, or cancelled by a caller with the cancel scope. Cancellation requests the stop. It does not prove the process has already stopped.
- A delivery card can ask a question, record a takeover, and require an explicit hand-back.

[Human approval](/user-guide/human-approval/) is the user-facing version of these decisions. This page is the automation view.

## Do not confuse a message with permission

An IM trigger can start a Job. The message is input. It is not an authorization to merge, deploy, or spend beyond the employee's grants. If the Job's output is a draft, the draft still needs a person. If you need a team to see a failure, point them at the run record and the session. Do not assume an unread chat sent a page, an email, or a ticket unless that destination is configured and you have seen it receive one.

Write the decision as scope plus evidence. A waived check names the check, the reason, and the risk. [Runs and recovery](/automate/runs-recovery/) covers what a retry is allowed to repeat.
