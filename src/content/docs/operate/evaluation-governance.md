---
title: "Agent evaluation and governance"
description: "Operate digital employees with access control, evidence-based evaluation, model routing, cost, audit, and quality gates."
sidebar:
  label: Platform governance
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-27"
---

AI Workforce governance keeps a professional digital employee safe and useful as it moves through its lifecycle. Grants, tool authorization, model routing, cost, audit, evaluation, and quality gates answer different operational questions. They meet around the same employee and delivery record.

Evaluation is continuous. A successful single task does not prove that a role is ready for repeated use. Keep representative cases, inspect the evidence they produce, and rerun them after changing the role, skill, knowledge, tool grant, model route, or workflow.

## One employee, several decisions

| Decision                                          | Where it is made                                                                                  | What a prompt cannot replace     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------- |
| Who may use the workspace                         | [Teams and access](/administration/teams-access/)                                                 | A shared link                    |
| Which tools and repositories the employee may use | Employee grants and [security and permissions](/deployment/security/)                             | “Read only” in the instructions  |
| Where tools run                                   | [Runtime management](/deployment/runtime-environments/)                                           | A path written in the package    |
| Which model and what it costs                     | [Models and cost](/models/overview/) and [platform configuration](/administration/configuration/) | A model name typed into chat     |
| Whether the result may proceed                    | Lane records, quality gates, and human decisions                                                  | A confident final message        |
| What was invoked                                  | Run history and [audit](/operate/audit/)                                                          | A screenshot of the conversation |
| Whether the employee remains fit for the role     | Repeated evaluation cases and reviewed evidence                                                   | One successful run               |

Change the control that owns the failure. Rotating a login token does not restore a revoked repository credential. Updating a template does not update an existing instance. A monitoring chart does not accept a deliverable.

## Operate the evaluation loop

1. Define the role's mission, acceptance criteria, permitted actions, and takeover conditions.
2. Give the employee the narrowest grant that matches the role and route it to a model the deployment actually offers.
3. Run representative cases, including normal, missing-input, out-of-scope, and human-takeover cases.
4. Inspect the task result, commands, artifacts, tests, security findings, and handoff evidence.
5. Record the decision in the delivery workflow and change the role, skill, context, grant, or model route when the evidence shows a repeated failure.
6. Rerun the same cases before publishing or promoting the revised employee.

Budget the work with the usage you can read in [usage and analytics](/administration/analytics/). Require evidence before a quality gate opens. Do not widen a grant to hide a bad result.
