---
title: "Approvals and notifications"
description: "Find notifications and decide when an automation needs human approval."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

An approval is a recorded human decision. Use the bell in the top bar or the **Notifications** tab in the inbox to see notifications. Open the linked item or card to make the decision. IM can also start Jobs where the trigger type is available.

## Ask for a decision, not a status

Use an approval when the automation would otherwise widen scope, write to an external system, or treat a collected request as ready for development. The patterns that exist today:

- A collected Issue stays in the inbox or becomes a workbench draft. The target board’s [intake rules](/software-factory/intake/) determine whether a person has to confirm the draft.
- Reading a Run requires read access. Cancellation requires cancel access and requests a stop. Check the result and session to confirm that execution stopped. Use the run history to retry an eligible Run.
- A delivery card can ask a question, record a takeover, and require an explicit hand-back.

[Human approval](/user-guide/human-approval/) is the user-facing version of these decisions. This page is the automation view.

## Do not confuse a message with permission

An IM trigger can start a Job. The message is input. It is not an authorization to merge, deploy, or spend beyond the employee's grants. If the Job output is a draft, check the target board’s intake and approval rules. If you need a team to see a failure, point them at the run record and the session. Do not assume an unread chat sent a page, an email, or a ticket unless that destination is configured and you have seen it receive one.

Write the decision as scope plus evidence. A waived check names the check, the reason, and the risk. [Runs and recovery](/automate/runs-recovery/) covers what a retry is allowed to repeat.
