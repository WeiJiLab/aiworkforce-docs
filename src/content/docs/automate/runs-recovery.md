---
title: "Runs, results, and recovery"
description: "Inspect run evidence, handle failures and uncertain execution, and retry without losing the original record."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

A run is the record of one Job execution. Use its identity, input, session, and result to understand what happened. A successful conversation and a saved business result are separate facts.

## Review a completed run

Open the Job's run history and inspect:

- The trigger source and supplied input: did the intended project or time window arrive?
- The execution session: which employee and tools performed the work?
- The final status and output: did execution finish, and does the output satisfy the task?
- Collection receipts, when configured: were the resulting Issues saved to the intended destination?

The collection tool is optional. When enabled, it requires a server receipt for saved items or an explicit empty result. A message saying “created three tasks” is insufficient evidence by itself. The current collection UI requires the Claude Code runtime.

## Diagnose before retrying

| Symptom                    | First check                                        | Next action                                                  |
| -------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| No run appeared            | Job state, rule state, time zone, event conditions | Correct the activation or source configuration               |
| Tool access failed         | Employee authorization and connector availability  | Grant the required resource through its normal configuration |
| Invalid input              | Required fields and payload mapping                | Correct the input, then start a new manual run               |
| Collection failed          | Save or empty-result receipt                       | Inspect the session and destination before repeating         |
| Execution became uncertain | Session activity and external side effects         | Reconcile the actual result before starting work again       |

An uncertain execution can mean the runtime started but the platform cannot safely attach to its result. Do not infer that no work happened from a missing final response. Check external systems for already-created records, commits, or messages.

## Retry deliberately

An explicit retry creates a new run from the terminal run's original input and preserves the original record. If the input itself was wrong, correct it and start a new manual run instead. Record both run IDs when investigating repeated failures.

Generic retry requires an active Job with the same published version. Re-run tests from the test entry point and recover workbench runs from their card. An uncertain execution can still reserve employee capacity; reconcile it before retrying.

The durable execution system can recover bookkeeping and steps known to be safe. It does not automatically assume that replaying an opaque Agent invocation is harmless. For external writes, use stable source identities and review existing outputs before retrying.

API clients should reuse the same idempotency key when retrying delivery of the same start request. Use a new key for a deliberate new execution. Request idempotency does not make every tool called inside a run idempotent.

## Cancel and hand over

Request cancellation for work that should stop, then inspect the final state and the connected session. Cancellation cannot undo an external action that has already completed.

When a collected Issue enters the delivery workbench, confirm scope, acceptance criteria, and allowed repositories before development. Delivery workbench takeover and release controls are described in [review and release](/software-factory/review-release/).

## Related guides

- [Triggers and schedules](/automate/triggers-schedules/)
- [Artifacts and evidence](/user-guide/artifacts-evidence/)
- [Troubleshooting](/resources/troubleshooting/)
