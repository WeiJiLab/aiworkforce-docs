---
title: "Event-driven automation"
description: "Start a Job from a platform event, an Issue, or an IM message instead of waiting for a clock."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

An event-driven automation invokes a published Job when something happens. The clock is not required. Where your deployment offers them, trigger types include platform events, Issues, IM messages, and webhooks. A connector's existence does not create the subscription. The event source has to be configured and authorized before it can deliver input. Provider setup is in the [integration directory](/integrations/overview/).

## When to use an event

Use an event when the work should react: a new Issue arrives, a platform event matches a rule, or a message asks for a bounded task. Use a schedule only when the work is "check again at this time." Schedules are documented in [triggers and schedules](/automate/triggers-schedules/). Inbound HTTP calls are documented in [watchers and webhooks](/automate/watchers-webhooks/).

## Make the Job safe to repeat

Events can be delivered more than once. Give the Job an input it can recognize, and use stable source identities when it collects inbox items. A previous successful collection does not mean this run updated the item. Publishing the Job does not run it. Enable automatic execution only after a manual run shows the output you expect.

The collection UI requires Claude Code and records saved items in the run receipt. A collected item directed to a workbench project becomes a draft. Once it is clarified and marked `READY`, a board with the standard intake orchestration enabled can send it to Development automatically. Check the board’s [intake rules](/software-factory/intake/) if your team requires a person to review each draft.

## If the event never arrives

Check the Job, the trigger's enabled state, and the source authorization separately. A paused Job can be run manually, and that manual run does not resume automatic triggers. Repair the provider connection at the provider. Changing a platform login token does not restore a revoked upstream credential.
