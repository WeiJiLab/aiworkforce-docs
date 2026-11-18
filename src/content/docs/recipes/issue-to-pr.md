---
title: "Issue to PR"
description: "See how a small Issue goes through implementation, a failed check, and review of the repaired change."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Follow one Issue from the inbox to a review decision. A project form shows “Invalid input” when its name field is empty. The team asks for a clearer message, catches a regression in the first candidate, and verifies the repair before accepting it.

The card, code references, and results below are illustrative. You can read the example without an account. To repeat the workflow in your workspace, follow the [Quickstart](/getting-started/quickstart/).

## 1. Inspect the Issue

In the workspace **Task inbox** (任务收件箱), read the Issue's source and reproduction steps. In this example, the reviewer opens the project form, leaves the name empty, and submits. They confirm the generic message and identify the frontend repository as the place to make the change. If an Automation collected the Issue, the collection receipt can help confirm where it came from.

## 2. Route it to a workbench draft

Use the Issue's workbench routing action and choose the intended project. In the resulting draft, record the scope and acceptance criteria. For this card, the reviewer limits edits to the frontend repository and keeps the server validation rules in place.

| Criterion | Expected result                                           |
| --------- | --------------------------------------------------------- |
| AC1       | Submitting an empty name displays “Enter a project name.” |
| AC2       | Submitting a valid name creates the project.              |

The reviewer checks both criteria and confirms scope and repository access through the card's human request. This confirmation records scope and lets the configured delivery flow proceed. It does not approve a repository change or grant credentials. If a detail is unclear, clarify it in the associated requirements session before confirming.

## 3. Follow the execution

Open **Workbench** (工作台) in the primary navigation. The board is at `/automations?tab=board-flow`. Open the card, follow the development session, and respond to questions or approvals on the card. The example card links a PR from the frontend repository. Depending on the repository integration and delivery path, a card may link a branch or commit instead.

If manual investigation is needed, take over and keep a written decision. Hand the work back explicitly after resolving the blocker. A shared batch may include other cards, so review its members before batch operations.

## 4. Verify, return, and recheck

Follow the code reference from the card and check the diff against the confirmed scope. Then check both form submissions in the test environment. For batch testing, use the candidate revision actually deployed for testing. The reviewer can record results like these on the card and link each one to the underlying check or observation.

| Tested revision | Environment              | Evidence                                                                                                 | Review decision                                                   |
| --------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Candidate A     | Project test environment | Build passed. AC1 passed. AC2 failed: submitting a valid name kept the form open and created no project. | Return to development with the AC2 reproduction steps and result. |
| Candidate B     | Project test environment | Build passed. AC1 displayed the new message. AC2 created a project and displayed its details.            | Accept candidate B for the confirmed scope and link both results. |

After the repair, the reviewer reruns both checks on candidate B and records a new decision. The card now connects the confirmed Issue, the development session and code reference, the evidence for each tested revision, and the decision to accept the repair.

If the project also handles merge and release, follow the separate records to confirm which revision merged, which revision reached production, and whether cleanup finished. See [Review and release](/software-factory/review-release/) for the checks at each stage.

## Related guides

- [Software Factory overview](/software-factory/overview/)
- [Task inbox](/user-guide/inbox-tasks/)
- [Evidence and trace](/software-factory/evidence/)
