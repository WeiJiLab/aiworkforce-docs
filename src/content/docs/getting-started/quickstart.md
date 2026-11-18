---
title: "Quickstart"
description: "Take an Issue through an existing delivery board and review the code change and its verification evidence."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Use an existing Software Factory board to turn one Issue into a reviewed code change. By the end, the card will link the confirmed request, a code reference, the verification evidence, and your review decision.

## Before you start

Choose a small, reproducible Issue in a workspace that has:

- A delivery project and board, with permission for you to confirm and review a card.
- A [connected repository](/integrations/code-repositories/) and ready employees in the relevant lanes, with the required repository access.
- A test environment or pipeline for the checks you will run.

If you need to prepare a workspace, start with [delivery board setup](/getting-started/first-software-factory/). You can also [read the worked example](/recipes/issue-to-pr/) without a configured workspace.

## 1. Confirm the Issue on the delivery board

Open the workspace **Inbox**, review the Issue, and route it to the intended delivery project. Open the resulting draft and confirm the work scope, allowed repositories, and acceptance criteria through the card's human request.

For example, submitting the project form with an empty name should display “Enter a project name.” Submitting it with a valid name should still create the project.

## 2. Follow implementation

Open the delivery workbench from **Automations** at `/automations?tab=board-flow`. Select your project and open the confirmed card. Start or resume its development session and respond to any questions or approval requests on the card.

The development lane records a pull request or another code reference, depending on the project's repository integration. Follow that reference to inspect the change.

## 3. Verify the change and record your decision

Open the verification results on the card. Check the diff against the agreed scope. For each acceptance criterion, confirm the result, the tested commit or candidate revision, and the environment. For the project form, check both empty and valid submissions.

If a check fails, return the work with the failed criterion and its evidence. Recheck the new revision after the fix. Record your review decision on the card with the supporting evidence. Merge and release follow your project's configured [review and release process](/software-factory/review-release/).

## Next steps

If the card stops progressing, use [Troubleshoot a blocked delivery card](/getting-started/delivery-board-troubleshooting/) to find the next action.

Read [Issue to PR](/recipes/issue-to-pr/) for a worked example. Use [Automation](/getting-started/first-automation/) to collect recurring work before it reaches the board.
