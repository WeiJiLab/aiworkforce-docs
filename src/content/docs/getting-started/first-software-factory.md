---
title: "Set up and run a delivery board"
description: "Check the delivery project's lanes, repositories, and pipelines, and recover blocked cards."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Use this guide when setting up a Software Factory board or deciding why work has stopped. To follow a single Issue on a board that is ready to use, start with [Quickstart](/getting-started/quickstart/).

## Prerequisites

Open the **delivery workbench** from **Automations** at `/automations?tab=board-flow`. In the intended workspace, select a [delivery project](/user-guide/projects/) and check the configuration for the stages you will use.

| Check                      | What to confirm                                                                                                                                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Board and lanes            | Identify where the team confirms requirements, starts development, and reviews tests. Check which actions are available on the selected board.                                                                                |
| Repositories and grants    | Confirm the repository connection belongs to the intended workspace and is enabled. Verify that each execution employee has a grant for the repositories it needs. See [code repositories](/integrations/code-repositories/). |
| Execution readiness        | Check that the employees assigned to the lanes are ready on the configured runtime. See [task dispatch](/software-factory/dispatch/).                                                                                         |
| Test and release resources | Verify the [CI/CD integration](/software-factory/cicd/) and the environment for each configured stage. Merge and production release need their own working repository and pipeline integrations.                              |

## 1. Confirm the request before development

On the draft card, confirm the intended change, the criteria a reviewer can check, and the repositories the change may touch. If a criterion is ambiguous, leave the card in draft and ask for clarification there. When the request is ready, start or resume development from the card so the session remains linked to the requirement.

## 2. Resume work when a card is blocked

Inspect the card's current lane, active execution, and pending questions before deciding what to do next.

| What you see                                  | What to check or do                                                                                                                                             |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An employee needs input or approval           | Read the request on the card and respond with the decision and its scope.                                                                                       |
| Execution cannot access a required repository | Check the project connection and the executing employee's grant before restarting the work.                                                                     |
| A person has taken over                       | Record the work performed and explicitly hand the card back to continue automatic progress. Resuming a pause leaves a takeover in effect.                       |
| A test failed                                 | Check the recorded failure and any active repair. Return the change for repair through the configured lane. Verify the revised change when the repair is ready. |

If an action applies to a shared test batch, inspect every member card before confirming. For a Job run that failed while collecting requests, see [runs, results, and recovery](/automate/runs-recovery/).

## 3. Require verification and evidence

Match the code reference, tested revision, environment, and results to the card's acceptance criteria. Record the result of each required check. If the pipeline could not run, record that outcome and attach any checks run separately. When a reviewer waives a check, record the reason, scope, and remaining risk. See [evidence and trace](/software-factory/evidence/) and [quality gates](/software-factory/quality-gates/).

## 4. Follow merge, release, and cleanup

For a project configured to merge and release, check each outcome as it becomes available. When a batch closes, check the recorded merge result. Use the release record to verify the revision that reached the target environment and the cleanup record to confirm that delivery resources were released. See [review and release](/software-factory/review-release/).

## Expected result

The team can identify the configured stages, the card and session handling a request, and the record that explains where the work is ready, blocked, or complete. Use [Issue to PR](/recipes/issue-to-pr/) to practice on a small change.
