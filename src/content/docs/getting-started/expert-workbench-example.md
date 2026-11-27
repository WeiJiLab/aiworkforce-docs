---
title: "Expert workbench example"
description: "Use one data export request to work through Security Review, Code Review, and Test Evidence in an interactive workbench."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-26"
---

The project team needs to export a workspace’s data as CSV. This walkthrough expands the data export permissions scenario from the Platform welcome page design. The requirements, pull request, and test report are sample records you can explore without signing in.

## Try the workbench

This is an interactive workbench shaped like a real Plugin App. Switch between Security Review, Code Review, and Test Evidence in the left rail. The header keeps the employee, repository, pull request, and run context visible while each view connects evidence to the next action.

Start in Security Review and filter to high-risk findings. Add missing evidence to the employee draft, switch to Code Review to request changes, then compare `RUN-401` with `RUN-402` in Test Evidence before accepting the retest.

<iframe src="/illustrations/expert-workbench/en/" title="Interactive expert workbench for data export permissions" loading="lazy" style="width:100%;height:42rem;border:0;border-radius:14px;"></iframe>

[Open the expert workbench demo on its own](/illustrations/expert-workbench/en/)

## Requirements and security context

**ENG-124 · From request to acceptance criteria.** Give the requirements specialist the original request and ask which roles, resources, and outcomes the team needs to confirm.

> Let people with export permission download their workspace’s data as CSV.

<div class="intro-review">

<details open>
<summary>Review the acceptance criteria</summary>

| ID   | Scenario                                                           | Expected result                                                 |
| ---- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| AC-1 | A workspace member has export permission and access to the data.   | The CSV contains only records the member is authorized to read. |
| AC-2 | A workspace member lacks export permission.                        | The request returns 403 and delivers no file.                   |
| AC-3 | A member with export permission requests another workspace’s data. | The request returns 403 and delivers no file.                   |
| AC-4 | An authorized export has no matching records.                      | The CSV contains the column headers and zero data rows.         |

</details>

</div>

The requirement owner confirms the four outcomes before the implementation is handed off. Security Review connects these criteria to workspace authorization and sensitive-data logging. See [Security and permissions](/deployment/security/) for resource access and execution credentials.

## Architecture decision and security boundary

**ADR-024 · Authorization at the export boundary.** Open the API, authorization, and CSV generation nodes in the workbench to see which source supports each responsibility. The decision carries AC-3 into the PR review. It calls for verifying the requester’s access to the target workspace before generating the file.

## Code Review and the change loop

**ENG-125 · PR #128.** Give the reviewer the changed files and the confirmed criteria. Ask which criteria lack evidence, where the issue appears, and what the developer needs to change.

<div class="intro-review">

<details open>
<summary>Inspect the review findings</summary>

| Finding                                          | Evidence                      | Follow-up                                              |
| ------------------------------------------------ | ----------------------------- | ------------------------------------------------------ |
| AC-3 needs a resource-level authorization check. | `auth.ts:42` checks the role. | Check that the member can access the target workspace. |
| AC-4 lacks regression coverage.                  | `export.test.ts`              | Add a test for a CSV with headers and no data rows.    |

</details>

</div>

The reviewer requests changes. The developer adds the workspace check and the missing test, then sends the updated revision for verification. See [Review and release](/software-factory/review-release/) for stage-specific decisions.

## Test Evidence and the release decision

**ENG-126 · Regression report for the updated PR #128.** Give the test specialist the criterion IDs and the revision to verify. Ask for the environment, expected outcomes, and observations.

Initial run `RUN-401` on `export-r1` records a failure for EXP-03 (AC-3). EXP-04 (AC-4) had not been added. Retest `RUN-402` on `export-r2` records both outcomes alongside the earlier results so a reviewer can compare the revisions.

<div class="intro-review">

<details open>
<summary>Compare the test cases with the reported results</summary>

The sample run used the test environment and revision `export-r2` of PR #128.

| Criterion | Observed result                                      | Verdict |
| --------- | ---------------------------------------------------- | ------- |
| AC-1      | The CSV contained only authorized records.           | Passed  |
| AC-2      | The request returned 403 and delivered no file.      | Passed  |
| AC-3      | The request returned 403 and delivered no file.      | Passed  |
| AC-4      | The CSV contained column headers and zero data rows. | Passed  |

</details>

**What can the release owner confirm from this report?**

<details name="export-release-decision">
<summary>Approve production release from the test report</summary>

The report covers the four criteria on the tested revision. The release owner still needs to confirm the production rollout scope.

</details>

<details name="export-release-decision">
<summary>Accept the test evidence and leave release scope pending</summary>

The four criteria passed on the tested revision. Record that revision and its report on the delivery card, then leave the rollout scope for the release owner to confirm.

</details>

</div>

Continue with [using the expert workbench](/user-guide/agent-chat/) to assign a task, or read [Viewing execution progress](/user-guide/sessions-planning/) and [Human approval](/user-guide/human-approval/) to continue review and handoff.
