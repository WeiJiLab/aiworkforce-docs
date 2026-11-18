---
title: "Quickstart"
description: "Take an Issue from the workspace inbox through implementation, verification, and review in Software Factory."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Use Software Factory to take a small engineering request from the workspace inbox to a reviewed code change. Pick an Issue you can reproduce and verify, such as correcting a form's validation message.

## Before you start

Use a workspace with a configured delivery project and board, a [connected repository](/integrations/code-repositories/), and a test environment or pipeline for the checks you plan to run. Make sure the employees assigned to the relevant lanes are ready and have the required repository access. For configuration, see [set up and run a delivery board](/getting-started/first-software-factory/) and [create your first AI employee](/getting-started/first-employee/).

## 1. Confirm the Issue on the delivery board

Open the workspace **Inbox**, review the Issue, and route it to the intended delivery project. Open the resulting draft and confirm the work scope, allowed repositories, and acceptance criteria through the card's human request.

For the form example, submitting an empty field should show the corrected message. A valid value should still submit successfully.

## 2. Follow implementation

Open the delivery workbench from **Automations** at `/automations?tab=board-flow`. Select your project and open the confirmed card. Start or resume its development session and respond to any questions or approval requests on the card.

The development lane records a pull request or another code reference, depending on the project's repository integration. Follow that reference to inspect the change.

## 3. Verify the change and record your decision

Open the verification results on the card. Check the diff against the agreed scope and compare the results with each acceptance criterion. Verify which commit or candidate revision the checks ran against and which environment they used.

If a check fails, return the work with the failed criterion and its evidence. Recheck the new revision after the fix. The quickstart is complete when the card links the confirmed requirement, the code change, the verification evidence, and your review decision. Merge and release follow your project's configured [review and release process](/software-factory/review-release/).

## Next steps

Read [Issue to PR](/recipes/issue-to-pr/) for a worked example. Use [Automation](/getting-started/first-automation/) to collect recurring work before it reaches the board.
