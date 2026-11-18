---
title: "Workflow builder"
description: "Compose a Job, its triggers, and its destination. The current release has no separate graph editor."
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

A workflow in the current product is an Automation Job plus the triggers and the optional collection destination attached to it. There is no visual graph editor that stores nodes, branches, and loops as a separate document. Do not look for a canvas that is not on the Automations screen.

## Compose what exists

Open **Automations** at `/automations`.

1. Choose the execution employee and write the task, inputs, and output.
2. Choose a new session per run, or reuse the Job's bound session. Reuse accumulates context. A new session keeps runs easier to compare.
3. Save, run manually, and read the run before you publish.
4. Add one or more triggers. Each scheduling rule belongs to that Job. Event and webhook triggers are separate types. See [event-driven automation](/automate/event-driven/).
5. If the Job should file requests, add **Collect tasks / issues** and choose the workspace inbox or a workbench project. This tool is optional and the collection UI requires the Claude Code runtime.

Publish stores the configuration. It does not create a run. Enable automatic execution only when a manual result is acceptable.

## What you cannot draw

There is no workflow node for an arbitrary branch, a parallel fan-out, or a loop counter. Recurring work uses schedule rules, documented in [loops and recurring work](/automate/loops/). A person in the middle uses [approvals and notifications](/automate/approvals/) or a delivery-card takeover. Multi-step engineering delivery belongs to the [Software Factory](/software-factory/overview/), which uses boards and lanes rather than this Job editor.
