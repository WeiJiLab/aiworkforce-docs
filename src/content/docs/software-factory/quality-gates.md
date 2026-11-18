---
title: "Quality gates"
description: "Decide which recorded result is allowed to move a card forward, and which result must send it back."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A quality gate is a condition that must be true before work moves to the next lane or is treated as accepted. In the current workbench, the gates you can actually use are the configured lane checks and the human decisions on the card. There is no separate policy language that scores a card and promotes it automatically.

## Gates that exist

| Gate                      | Moves forward when                                                         | Sends work back when                                                   |
| ------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Requirements confirmation | A person confirms scope, criteria, and repositories                        | The request is still a draft                                           |
| Development handoff       | The session's change is recorded on the card                               | The employee is blocked or a person has taken over and not handed back |
| Test result               | The testing lane records a pass for the candidate                          | A recorded failure returns work for repair                             |
| Explicit waiver           | A person names the skipped check, scope, reason, and risk                  | The note only says "continue"                                          |
| Merge                     | The project has a working repository integration and the batch is eligible | The integration or the batch record is missing                         |

A missing check is not a pass. Creating the card does not satisfy the repository or pipeline gate. [Build and test](/software-factory/build-test/) is the test record. [Business verification](/software-factory/business-verification/) is the comparison with the confirmed outcome. Both can be required. Neither replaces the other.

## Do not bypass the gate in prose

An employee instruction that says "skip tests if you are confident" does not change the lane. If a team waives a check, write the waiver where the card keeps decisions. [Release governance](/software-factory/release-governance/) applies the same rule to merge and production. [Agent evaluation and governance](/operate/evaluation-governance/) shows how these gates sit next to permissions and cost.
