---
title: "Task dispatch"
description: "Assign a ready delivery card to the lane employee that should do the work."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Dispatch is how a confirmed card reaches an employee. In the current workbench, that happens by the board, the lane, and the employees configured on the project. There is no separate dispatcher service with its own queue, priority language, or global worker pool. Do not describe a scheduler the deployment does not run.

## Assign the card you confirmed

A card is ready after a person has confirmed scope, acceptance criteria, and allowed repositories. Start or resume the development session from that card. The employee must already be ready, and it must hold a grant for the repository it should change. A repository connection on the workspace is not that grant.

Custom lanes can coordinate by card or by batch. Available actions depend on the selected board. Dispatching a card onto a lane does not create the pipeline, the test environment, or the production permission.

## What dispatch does not decide

It does not choose a model, widen a tool grant, or skip verification. Those are [runtime](/deployment/runtime-environments/), [security](/deployment/security/), and [quality gates](/software-factory/quality-gates/). If the wrong employee is on the lane, change the project configuration. Do not compensate with a longer prompt in the session.

When several cards must be tested together, a batch is the grouping. Operating on a batch can affect every member card. Inspect that scope before you confirm. The ongoing coordination of lanes and batches is [agent orchestration](/software-factory/orchestration/).
