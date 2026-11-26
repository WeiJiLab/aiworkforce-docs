---
title: "Expert workbench example"
description: "Follow one export request from its source and architecture decision through code review, initial testing, and retesting."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-26"
---

The project team needs to export a workspace’s data as CSV. This walkthrough expands the data export permissions scenario from the Platform welcome page design. The requirements, pull request, and test report are sample records you can explore without signing in.

## Try the workbench

The four views draw on the Showcase Agents examples. The requirements view combines the source trace from the requirements prototype with a Spec Studio document. Architecture follows the SAD Agent evidence view. Code Review ties findings to a PR snapshot, and Test Agent keeps the initial run and retest in the same evidence trail. The workbench uses sample records.

Open the request source and trace AC-3 from the specification to the authorization boundary. Open the matching review finding, then switch from the initial run to the retest to see which evidence changed.

<iframe src="/illustrations/expert-workbench/en/" title="Interactive expert workbench for data export permissions" loading="lazy" style="width:100%;height:42rem;border:0;border-radius:14px;"></iframe>

[Open the expert workbench demo on its own](/illustrations/expert-workbench/en/)

## Requirements and specification

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

The requirement owner confirms the four outcomes before the implementation is handed off. The implementation and tests use the same criterion IDs. [See how to write acceptance criteria](/learn/requirements-writing/).

## Architecture decision

**ADR-024 · Authorization at the export boundary.** Open the API, authorization, and CSV generation nodes in the workbench to see which source supports each responsibility. The decision carries AC-3 into the PR review. It calls for verifying the requester’s access to the target workspace before generating the file.

## Code review

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

The reviewer requests changes. The developer adds the workspace check and the missing test, then sends the updated revision for verification. [Follow the pull request review workflow](/software-factory/pr-to-merge/).

## Test cases and acceptance

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

Continue with [using the expert workbench](/user-guide/agent-chat/) to assign a task, or [deliver an issue on an existing board](/getting-started/quickstart/) to follow the team handoff.
