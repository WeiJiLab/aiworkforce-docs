---
title: "Observability"
description: "Find the session, run, and delivery records for a change. There is no separate Software Factory telemetry product."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Observability here means you can find what happened to a card, a session, or a run. The current product keeps those records on the workbench, in session history, in automation run history, and on the administrator monitoring views. It does not add a separate tracing backend, a Software Factory metrics product, or a log drain you configure from this documentation.

## Where to look

| Question                                      | Open                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| What did the employee do in the conversation? | The session and its tool activity                            |
| Did the Job run, fail, or get cancelled?      | Run history, including status, output, error, and timestamps |
| Did collection save an Issue?                 | The server receipt, not the chat summary                     |
| Did the batch pass, merge, or release?        | The lane records on the card and the batch                   |
| Is the deployment under capacity pressure?    | [Usage and analytics](/administration/analytics/)            |

[Evidence and trace](/software-factory/evidence/) says which of these records supports which claim. Monitoring charts do not tell you whether the employee's answer was acceptable.

## When a record is missing

A missing run means you cannot claim the Job executed. Check the Job, the trigger, and authorization before you retry. The durable execution system can recover bookkeeping and steps it knows are safe. It does not assume that replaying an opaque agent call is harmless. For external writes, review existing outputs first. See [runs and recovery](/automate/runs-recovery/).

Audit of an automation run is available at `GET /api/automation/v1/runs/{run_id}/audit` for a caller who can read that run. That view is not a full compliance archive. See [audit and compliance](/operate/audit/).
