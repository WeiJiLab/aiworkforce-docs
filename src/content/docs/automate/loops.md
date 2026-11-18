---
title: "Loops and recurring work"
description: "Repeat a Job on a schedule or across runs. There is no loop block in the workflow editor."
support: limited
sidebar:
  badge:
    text: Limited
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Recurring work is a Job with one or more schedule rules, or a series of runs you start because the previous output asked for another pass. The workflow editor has no loop node, no iteration counter, and no "for each item" block. [Workflow builder](/automate/workflow-builder/) explains that boundary.

## Use a schedule on purpose

Add a schedule only after a manual run is acceptable. A Job can have multiple scheduling rules. Each rule belongs to that one Job. Keep day-of-month and day-of-week expressions simple: standard cron matches either field when both are restricted, so a date plus Monday does not mean "only when that date is a Monday."

Publishing does not execute the Job. Enabling automatic execution allows the rules to fire. A manual run of a paused Job does not turn those rules back on. If an expected run is missing, inspect the Job and the trigger separately. Details are in [triggers and schedules](/automate/triggers-schedules/).

## Repeat without duplicating work

Decide whether each run opens a new session or reuses the bound session. A new session makes each pass comparable. Reuse is how context carries forward. It is also how an old assumption survives into the next pass.

When the Job collects items, use a stable source identity. An earlier successful collection does not mean the current run updated the item. A run that finds nothing must record the empty result. Do not infer "no change" from a missing run.

Stop the recurrence by disabling the trigger or the Job's automatic execution. Deleting a chat does not delete the schedule.
