---
title: "Your first workflow"
description: "Create a Job, run it once by hand, and only then enable a trigger."
sidebar:
  label: Your first workflow
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A first workflow here is one automation Job. The Job is the definition of a bounded task and its employee. A trigger is optional and comes after you have seen a run. This is not the delivery board, and it is not a multi-step pipeline. Those are [Software Factory](/getting-started/first-software-factory/) and [custom workflows](/workflows/custom-workflows/).

## Prerequisites

You need a workspace you can operate and a ready employee whose responsibility matches the task. Use an employee that can finish the task from input you supply. Do not start with a Job that writes to an external system.

## 1. Define a small Job

Open **Automations** at `/automations`. Choose the execution employee. Describe a concrete task, the input, and an output you can check. Decide whether each run starts a new session or reuses the Job's bound session. A new session keeps runs separate. Reuse lets context accumulate, which is harder to judge on a first workflow.

## 2. Run it before you enable a trigger

Save a draft if you are still editing. **Run manually** creates an execution you can inspect now. **Publish** stores the execution configuration and does not create a run. **Enable automatic execution** allows configured triggers to invoke the Job. Publishing does not require a successful test, so inspect a manual run before you enable anything unattended.

Open the run and read its status, output, and session. If it fails, fix authorization, inputs, or missing tools before retrying. A paused published Job can still be run manually. That manual run does not turn automatic triggers back on.

## 3. Add one trigger

Add a single schedule only after the manual result is acceptable. Keep the first rule simple. A Job can have more than one scheduling rule later. Each rule belongs to that Job. Publishing still does not execute the Job. If an expected run does not appear, check both the Job state and the trigger's enabled state.

Event-driven starts are covered in [event-driven automation](/automate/event-driven/). Webhook triggers are covered in [watchers and webhooks](/automate/watchers-webhooks/). A lane pipeline, which needs at least two executors, is covered in [create a workflow](/automate/workflow-builder/).

## Expected result

You have one Job, one inspected manual run, and at most one enabled trigger whose next run you know how to find. You have not proved that a collected business request is resolved. If the Job should file inbox items, add **Collect tasks / issues** only after the basic run is reliable. A chat summary is not a saved issue.

Continue with [workflow concepts](/workflows/concepts/) to place this Job among boards and events, or with [runs and recovery](/automate/runs-recovery/) if a later run fails.
