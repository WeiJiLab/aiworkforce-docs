---
title: "Webhooks"
description: "Call a published Job from an external system. Outbound webhook subscriptions are not a separate product surface."
status: limited
sidebar:
  badge:
    text: Limited
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A webhook in the current product is an inbound trigger on an Automation Job. An external system calls the platform, and a published Job may run if automatic execution is enabled and the call meets the deployment's authentication. This page is the developer view of that call. The product steps for attaching the trigger are in [watchers and webhooks](/automate/watchers-webhooks/).

There is no documented outbound webhook product that posts every run event to a URL you register. If you need the result, poll the run. `POST` invocation returns HTTP 202 with a run handle. Read `status`, `output`, `summary`, and `error` from the run. 202 means the work was accepted, not that it finished.

## Call the Job you were allowed to call

Use a Personal Automation Token whose scopes and `allowed_definition_ids` include that Job. See [authentication](/developer/authentication/). Send the Job input and reuse the same idempotency key when you retry the same start request. A new key starts new work. Idempotency of the HTTP request does not make every tool inside the run idempotent.

Do not invent a signature scheme. Use the authentication your deployment documents for that endpoint. Store the token outside the repository that sends the call.

## Know the boundary

A webhook does not grant the caller permission to create employees, change grants, or merge code. It starts one Job. If that Job files an inbox item or a workbench draft, a person still confirms development. See [REST API](/developer/api-reference/) for the invocation and cancel contracts.
