---
title: "Task dispatch"
description: "Assign a ready delivery card to the lane employee that should do the work."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Dispatch is how a confirmed card reaches an employee. In the current workbench, that happens by the board, the lane, and the employees configured on the project. There is no separate dispatcher service with its own queue, priority language, or global worker pool. Do not describe a scheduler the deployment does not run.

## Assign the card you confirmed

A card is ready for development when the Requirements lane records it as clarified (`READY`). With the standard intake orchestration enabled, the lane moves the card into Development and dispatches its session once the board and execution prerequisites are satisfied. Open that session from the card. The lane employee must be ready and have the repository grants needed for the work.

Custom lanes can coordinate by card or by batch. Available actions depend on the selected board. Dispatching a card onto a lane does not create the pipeline, the test environment, or the production permission.

## What dispatch does not decide

It does not choose a model, widen a tool grant, or skip verification. Those are [runtime](/deployment/runtime-environments/), [security](/deployment/security/), and [quality gates](/software-factory/quality-gates/). If the wrong employee is on the lane, change the project configuration. Do not compensate with a longer prompt in the session.

When several cards must be tested together, a batch is the grouping. Operating on a batch can affect every member card. Inspect that scope before you confirm. The ongoing coordination of lanes and batches is [agent orchestration](/software-factory/orchestration/).
