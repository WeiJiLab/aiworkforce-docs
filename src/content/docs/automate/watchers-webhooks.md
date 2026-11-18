---
title: "Watchers and webhooks"
description: "Start a Job from an inbound webhook. There is no separate Watcher resource in the current release."
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

A webhook trigger lets an external system start a published Job by calling the platform. The current release does not have a separate Watcher object that polls arbitrary systems on your behalf. If you need the platform to notice a change, use a supported event trigger or a schedule. See [event-driven automation](/automate/event-driven/).

Developer-facing webhook behavior, as distinct from the product trigger, is summarized in [Webhooks](/integrations/webhooks/). This page is the automation: which Job runs, and what you must check before enabling it.

## Configure the trigger

Create the Job and inspect one manual run first. Add a webhook trigger only when that type is offered. The external caller must be able to reach the endpoint your deployment exposes, and the call must satisfy the authentication that deployment requires. A connector name in an employee manifest does not register this endpoint.

Do not put the webhook secret in a skill or in a chat. Store it with the other integration secrets. Rotate it at the source if it leaks. Revoking a platform credential does not always revoke the upstream secret.

## Treat delivery as at-least-once

The caller may retry. The Job should use stable identities and an idempotency key when it starts work through the API. Request idempotency does not make every tool inside the run idempotent. Review existing outputs before you retry a run that already wrote somewhere.

Enable automatic execution only after a signed or otherwise authenticated test call produces the run you expect. An unsigned example in documentation is not a working subscription.
