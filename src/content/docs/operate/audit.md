---
title: "Audit and compliance"
description: "Read automation run audit records and know which actions the platform does not archive for you."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

The automation audit view records what the platform stored for a Run. An authorized reader can fetch it through `GET /api/automation/v1/runs/{run_id}/audit`. Keep caller attribution in the invoking system’s audit logs. Session history, delivery decisions, and administrator monitoring have their own records.

## What you can read

The run response includes status, output, summary, error, and lifecycle timestamps. The audit view is the read of that run for an authorized caller. Cancellation is a different call and only requests a stop. A workspace role that can read session history does not grant general project-file access or this API scope.

Keep the records next to the claim. A run audit shows the Job invocation. A delivery card shows the human decision and the code reference. A monitoring chart shows capacity. [Evidence and trace](/software-factory/evidence/) maps them. [Usage and analytics](/administration/analytics/) is not an audit log.

## What you must record yourself

Revoking an employee grant changes later checks and does not prove an in-flight process stopped. Deleting a platform credential does not revoke the upstream token. Record both actions when you retire access. The platform does not describe an immutable archive of those administrator actions in this documentation.

Do not copy secrets, customer content, or private addresses into an audit note or into this docs site. Store tokens in the caller's secret store. If a control requires a retention period or a specific report, treat that as a deployment obligation, not as a feature of the audit endpoint.
