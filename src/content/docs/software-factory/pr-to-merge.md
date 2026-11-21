---
title: "Pull request to merge"
description: "Review, repair, and verify a change before a person accepts merge and release."
sidebar:
  label: "Pull request → merge"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-21"
---

A published template defines which evidence is produced before a pull request or release can move forward. The matching scenario depends on the decision you need. A failed check or a review asking for changes returns the card through the configured rework path. Production deployment is a separate step with its own result.

The built-in delivery board can carry these records through Test deployment (测试发布), Testing (测试验证), and Production (生产发布). A scenario template can also focus on one evidence gate, such as checking a PR against its specification or reviewing a release candidate.

```mermaid
flowchart TD
    ready["Person: accept the change for review"] --> checks["Test deployment and Testing"]
    checks --> decision["Person: review the findings and evidence"]
    decision -->|Accept| release["Merge the passing batch"]
    release --> deploy["Deploy to production when configured"]
    deploy --> ship["Person: verify the deployed revision"]
    checks -->|Check failed| fix["Development employee: repair the card"]
    decision -->|Changes needed| fix
    fix -->|Check again| checks
    class ready,decision,ship human
    class checks,fix,release,deploy agent
```

Test deployment and Testing are board lanes, not a sequence of separate reviewer products. The test employee records results for the candidate that was actually exercised. [Pull request automation](/workflows/pull-request-automation/) can also start a Job when a polled GitHub pull request event matches. That Job investigates. It does not merge, and it does not approve the pull request unless the employee, using its own grant, actually submitted a review.

A closed batch means the batch finished its close-out. Production and resource cleanup have their own records. [Review and release](/software-factory/review-release/) lists what to read at each stage. [Release governance](/software-factory/release-governance/) is the rule for which result may move a card, and which waiver is valid.

## Choose the evidence template

| Template                             | Stages and artifacts                                                                                                               | Completion behavior                                                         |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `pr-spec-adherence-check`            | Specification review → `acceptance_criteria`; Criterion-by-criterion review → `adherence_report`                                   | `AUTO` after the report is ready                                            |
| `customer-escalation-to-product-fix` | Support triage → `reproduction`; Development fix → `pull_request`; Test verification → `verification`; Reply draft → `reply_draft` | `HUMAN_REVIEW`, with one configured verification rework path to Development |
| `release-candidate-readiness-review` | Release evidence → `candidate_evidence`; Readiness review → `readiness_report`                                                     | `HUMAN_REVIEW` for the release decision                                     |

These scenarios use named artifacts rather than a free-form status comment. Read the tested revision, source links, failed cases, and decision owner from the artifact before accepting the next stage. See [Collaboration templates](/software-factory/templates/) for the full catalog.

## Where you participate

- **Choose what the lanes may do.** Connect the test workflow and the release integration you want the board to call. A lane runs the executors saved on that lane.
- **Review the evidence.** Compare the diff with the confirmed scope. For each acceptance criterion, read the result, the tested commit or candidate, and the environment. Ask for the missing record before accepting the change.
- **Make the release decision.** Accepting the requirements confirms that revision of the requirement. Accepting the change for review is a later decision. Confirming what merged, and what reached production, are later records still. An employee session does not merge the pull request by being finished.

When a test fails, return the card with the failed criterion and the evidence. The development employee repairs that card. Avoid a second repair session while the first execution is still active. If you take over, record what you did and hand the work back through the recovery action. Resuming a pause leaves a takeover in place. Ending the platform's pull-request follow-up leaves the external pull request open and the card in manual handling until you hand it back.

A batch-level response can resume every member card. Read the membership before you approve or retry shared work.

## Lane employees

| Employee             | Role in this loop                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| Test employee        | Records verification against the candidate in the Testing batch.                                |
| Development employee | Repairs the same card when a check fails or you ask for changes.                                |
| Release employee     | Carries merge, wait, deploy, and verify steps that the project's integrations actually support. |

[Business verification](/software-factory/business-verification/) is the comparison between the change and the confirmed acceptance criteria. [Build and test](/software-factory/build-test/) is the Testing-lane record. [CI/CD integration](/software-factory/cicd/) is how a pipeline becomes that record.

## Set it up

1. Choose the published evidence template that matches the decision. [Collaboration templates](/software-factory/templates/) lists the stage contracts and completion rules.
2. Connect the code host and the repository. Prepare the [environment](/software-factory/environments/) and the test tools the selected stages should run. [Configure the Software Factory](/getting-started/first-software-factory/) covers the board wizard.
3. Bind ready employees to the required stages. Authorize them for the repositories and pipeline resources those stages call.
4. Open a card whose development stage has recorded a code reference, or start the first stage with the candidate evidence. Read the delivery workbench, the pipeline run, each named artifact, and any question waiting on the card.

## Next step

Continue with [Signal → card](/software-factory/signal-to-card/) when feedback or an incident should become the next piece of work. [Evidence and trace](/software-factory/evidence/) is the map of the records this loop leaves behind.
