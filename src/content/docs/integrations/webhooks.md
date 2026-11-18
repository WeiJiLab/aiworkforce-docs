---
title: "Webhooks"
description: Trigger a Job when a ticket is created and use the event receipt to look up the analysis run.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

To analyze a ticket when it is created, configure and enable a webhook trigger on the published analysis Job. See [watchers and webhooks](/automate/watchers-webhooks/).

Have the ticket backend send a JSON body containing `input` to `POST /api/automation/v1/triggers/{trigger_id}/events`. HTTP `202` means the platform accepted the event. The receipt’s `data.id` identifies the event. To look up the run, find the entry for your `definition_id` in `data.results` and use its `run_id`. If that value is null, inspect the entry’s `disposition` and `message`.

With a credential that can read runs, poll `GET /api/automation/v1/runs/{run_id}` for the run’s `status`. On success, have the ticket backend write the summary from `output` back to the ticket. See the [REST API](/developer/api-reference/).

## Call the Job you were allowed to call

Use a Personal Automation Token whose scopes and `allowed_definition_ids` include that Job. See [authentication](/developer/authentication/). Send the Job input and reuse the same idempotency key when you retry the same start request. A new key starts new work. Idempotency of the HTTP request does not make every tool inside the run idempotent.

Do not invent a signature scheme. Use the authentication your deployment documents for that endpoint. Store the token outside the repository that sends the call.

## Know the boundary

A webhook does not grant the caller permission to create employees, change grants, or merge code. It starts one Job. If that Job files an inbox item or a workbench draft, a person still confirms development. See [REST API](/developer/api-reference/) for the invocation and cancel contracts. Named product connections, including the chat and monitoring hooks those products use, are in the [integration directory](/integrations/overview/).
