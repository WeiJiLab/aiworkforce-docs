---
title: "Evidence and trace"
description: "Keep the session, the change, the test, and the human decision as separate records a reviewer can open."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Evidence supports a claim. A trace is the path across the records that hold those claims. Software Factory is useful when a reviewer can open the requirement, the session, the code reference or pull request, the test result, and the release record without guessing which chat "felt done."

## Keep the records distinct

| Record                         | Claim it can support                                         |
| ------------------------------ | ------------------------------------------------------------ |
| Confirmed requirement          | The agreed scope and acceptance criteria                     |
| Session                        | What the employee was asked and which tools ran              |
| Pull request or code reference | What changed                                                 |
| Test or build record           | Which configured checks ran, and their result                |
| Run audit                      | The automation status, output, and error for that invocation |
| Human decision                 | Accept, return, waive, or take over                          |

An artifact can be useful and still be wrong. A green test does not prove an unchecked criterion. A merged pull request does not prove production release. [Review and release](/software-factory/review-release/) walks those later records. [Artifacts and evidence](/user-guide/artifacts-evidence/) is the same idea for work that is not on a delivery card.

## Follow one change

Start from the card. Note the session id, the code reference, the batch if there is one, and the decision text. If a record is missing, the claim that depended on it is unverified. Do not backfill a pass. [Observability](/software-factory/observability/) is how you find these records when something fails. [Audit and compliance](/operate/audit/) is the operational view of who invoked a run and what the platform stored.
