---
title: "Agent evaluation and governance"
description: "See how grants, tool authorization, model routing, cost, audit, and quality gates control the same employee."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Governance is the relationship between controls, not a settings screen. An employee can be visible in a workspace and still be unable to call a tool. A model can be selected and still be too expensive for the task. A test can fail and still be waived only when a person writes the waiver down. This page shows how those controls meet. The checks themselves are in [agent evaluation](/software-factory/evaluation/) and [quality gates](/software-factory/quality-gates/).

## One employee, several decisions

| Decision                                          | Where it is made                                                                                  | What a prompt cannot replace     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------- |
| Who may use the workspace                         | [Teams and access](/administration/teams-access/)                                                 | A shared link                    |
| Which tools and repositories the employee may use | Employee grants and [security and permissions](/deployment/security/)                             | "Read only" in the instructions  |
| Where tools run                                   | [Runtime management](/deployment/runtime-environments/)                                           | A path written in the package    |
| Which model and what it costs                     | [Models and cost](/models/overview/) and [platform configuration](/administration/configuration/) | A model name typed into chat     |
| Whether the result may proceed                    | Lane records and human decisions                                                                  | A confident final message        |
| What was invoked                                  | Run history and [audit](/operate/audit/)                                                          | A screenshot of the conversation |

Change the control that owns the failure. Rotating a login token does not restore a revoked repository credential. Updating a template does not update an existing instance. A monitoring chart does not accept a deliverable.

## Operate the loop

Give the employee the narrowest grant that matches the role. Route it to a model the deployment actually offers. Budget the work with the usage you can read in [usage and analytics](/administration/analytics/). Require evidence before a gate opens. When evaluation shows a repeated failure, change the skill or the task framing and run the same cases again. Do not widen the grant to hide a bad result.
