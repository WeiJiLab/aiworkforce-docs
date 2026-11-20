---
title: "Webhooks"
description: Trigger a Job when a ticket is created and use the event receipt to look up the analysis run.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

To analyze a ticket when it is created, configure and enable a webhook trigger on the published analysis Job. See [watchers and webhooks](/automate/watchers-webhooks/).

Have the ticket backend send a JSON object to `POST /api/automation/v1/triggers/{trigger_id}/events`. For **Request input**, send `{"input":{"ticket_id":"TKT-42"}}`, adapting the value to your Job’s schema. For **Fixed input**, send `{"input":{}}` and configure the input on the rule. HTTP `202` means the platform accepted the event. `data.id` identifies the event. Find your `definition_id` in `data.results` and use its `run_id`. If it is null, inspect the result’s `disposition` and `message`.

With a credential that can read runs, poll `GET /api/automation/v1/runs/{run_id}` for the run’s `status`. On success, have the ticket backend write the summary from `output` back to the ticket. See the [REST API](/developer/api-reference/).

## Call the Job you were allowed to call

Sending an event requires a Personal Automation Token with `automation:invoke` and the target Job in `allowed_definition_ids`. Polling a Run requires `automation:read` and access to that Run. The rule’s **Issue an automation access Token** action issues an invoke-only credential. Reuse the `Idempotency-Key` and request body when resending the same event. See [authentication](/developer/authentication/).

Do not invent a signature scheme. Use the authentication your deployment documents for that endpoint. Store the token outside the repository that sends the call.

## Know the boundary

A webhook does not grant the caller permission to create employees, change grants, or merge code. It starts one Job. If the Job files a workbench draft, the board’s intake rules govern its admission to Development. See [REST API](/developer/api-reference/) for the invocation and cancel contracts. Named product connections, including the chat and monitoring hooks those products use, are in the [integration directory](/integrations/overview/).
