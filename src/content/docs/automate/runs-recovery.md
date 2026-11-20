---
title: "Runs, results, and recovery"
description: "Inspect run evidence, handle failures and uncertain execution, and retry without losing the original record."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
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

For a [public invocation](/developer/api-reference/) that accepts `Idempotency-Key`, reuse the key and input when resending the same request. Use a new key for a deliberate new execution. **Run once manually** in Automations creates a fresh key on each submission. If the response is lost, check run history before submitting again. Request deduplication applies to Run creation. Check the run’s existing side effects before retrying its work.

## Cancel and hand over

Request cancellation for work that should stop, then inspect the final state and the connected session. Cancellation cannot undo an external action that has already completed.

A new Run may reuse the Job’s bound session. Use the Run ID to identify the execution and the session to read its conversation. If a collected Issue goes to the workbench, check that board’s [intake rules](/software-factory/intake/).

## Related guides

- [Triggers and schedules](/automate/triggers-schedules/)
- [Artifacts and evidence](/user-guide/artifacts-evidence/)
- [Troubleshooting](/resources/troubleshooting/)
