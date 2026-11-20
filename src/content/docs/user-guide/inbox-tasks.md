---
title: "Task inbox"
description: "Review incoming requests and decide which work should proceed to delivery."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

The workspace Task inbox holds requests collected by automation or imported into the workspace. It gives each item a source and a review state so teams can decide what deserves attention before committing to execution.

## Open Task inbox

Open workspace management and select **Task inbox**. Review the available views, such as waiting items, linked work, snoozed items, and archived items. Filters help narrow the list by source, type, or state.

Select an item to inspect its description, source link, structured fields, and any collected evidence. A summary is a starting point; check the original source when the intended change or business impact is unclear.

## Make a review decision

Use the actions available for that item's current workflow. Depending on the configured workflow and your permissions, you can request more information, accept or move an item, snooze it, dismiss it, mark it as a duplicate, or reopen it.

Record a reason when a decision changes the interpretation or priority of the request. For duplicates, identify the item that should remain authoritative. Snoozing defers review; it does not complete the underlying work.

## Move suitable work toward delivery

Open an eligible request and choose **Create workbench draft**. The action opens a drawer in the workbench. Select a project with a ready Requirements employee, review the request, and submit the drawer to create the draft. Open the requirements conversation to check scope, acceptance criteria, and the card’s allowed write repositories.

Collecting a request and starting implementation are separate decisions. An automation run can succeed by collecting an item even though the item is still waiting for review. A delivery card can remain blocked while its source item is visible in the inbox.

## Check the outcome

After review, confirm that the item appears in the intended state or view. If linked delivery exists, open it to follow implementation progress and associated evidence.

If an expected item is missing, check filters and refresh the list. If an import or collection fails, inspect that operation's error. If an action is unavailable, check the item workflow, required fields, and your workspace permission.

Continue with [automation fundamentals](/automate/fundamentals/), the [software factory overview](/software-factory/overview/), and the [Issue to PR recipe](/recipes/issue-to-pr/).
