---
title: "Quality gates"
description: "Decide which recorded result is allowed to move a card forward, and which result must send it back."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

A quality gate is a condition that must be true before work moves to the next lane or is treated as accepted. In the current workbench, the gates you can actually use are the configured lane checks and the human decisions on the card. There is no separate policy language that scores a card and promotes it automatically.

## Gates that exist

| Gate                   | Moves forward when                                                                       | Sends work back when                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Requirements readiness | The Requirements lane records `READY`, with human confirmation if the board calls for it | Clarification or a requested decision is still pending                 |
| Development handoff    | The session's change is recorded on the card                                             | The employee is blocked or a person has taken over and not handed back |
| Test result            | The testing lane records a pass for the candidate                                        | A recorded failure returns work for repair                             |
| Release approval       | A person approves the action when the batch policy requires it                           | A configured approval is still missing                                 |
| Merge                  | The project has a working repository integration and the batch is eligible               | The integration or the batch record is missing                         |

A missing check is not a pass. Creating the card does not satisfy the repository or pipeline gate. [Build and test](/software-factory/build-test/) is the test record. [Business verification](/software-factory/business-verification/) is the comparison with the confirmed outcome. Both can be required. Neither replaces the other.

## Do not bypass the gate in prose

Record any process exception with the skipped check, scope, reason, and risk. A note or employee instruction cannot satisfy the standard test gate. The lane still needs its configured passing result. The merge and production approval rules are in [release governance](/software-factory/release-governance/).
