---
title: "Troubleshooting"
description: "Locate a failure, collect useful session evidence, and report a reproducible issue without exposing credentials."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Start with the smallest operation that failed. A workspace permission problem, unavailable employee, disconnected device, model-channel failure, and incorrect answer require different fixes.

## Locate the failing layer

| Symptom                             | First checks                                                                |
| ----------------------------------- | --------------------------------------------------------------------------- |
| Workspace or action unavailable     | Current account, membership, grant, and requested action.                   |
| Employee cannot start               | Initialization state and the visible initialization error.                  |
| Model unavailable                   | Selected model, employee runtime, and administrator channel configuration.  |
| Tool or external source unavailable | Connection state, employee authorization, and external service permissions. |
| Device execution blocked            | Device online state, authorization, capabilities, and working directory.    |
| Result is incomplete or incorrect   | Required inputs, plan, tool results, artifact, and acceptance criteria.     |

Do not repeatedly create employees or submit an action while its outcome is unknown. First check whether an existing session or automation run already performed the work.

## Inspect a session

Open the original session and read the visible error and state. A session waiting for a user response may need an authorization decision or additional information rather than a restart.

Use **View execution plan** when present to find the blocked step. Open the session actions and Debug mode for the event chronology, tool input previews, and returned errors. Where execution tracing is available, select the relevant run and inspect its events or export the trace/error report.

Check the actual artifact or file change before retrying an action that can modify data. Interrupted execution can still have produced files or external effects.

## Prepare a useful report

Include:

- A short title and the expected versus observed behavior.
- The time and timezone, deployment address, and minimal reproduction steps.
- The original session URL and relevant workspace/employee identifiers.
- The automation run, delivery card, trace, or request identifier if that interface supplies one.
- The selected model, runtime or device, permission mode, and a redacted error excerpt.

Identifiers belong to different objects. A business request ID is not an HTTP trace identifier or an inbox issue ID. Preserve the identifier's label and source instead of renaming everything to a request ID.

## Escalate and verify

Send the report through the support route agreed for your deployment. Administrators can correlate it with backend logs and monitoring around the supplied time. Remove credentials, authorization headers, personal documents, and unrelated source contents before sharing a report.

After a fix, repeat the minimal reproduction, verify the output, and record the successful session or run. Keep the original failure evidence so the resolution can be reviewed.

See [configuration](/administration/configuration/), [usage analytics](/administration/analytics/), and [support and updates](/resources/releases-support/).
