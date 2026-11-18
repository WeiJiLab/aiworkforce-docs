---
title: "Research and monitoring"
description: "Schedule an employee to produce a reviewable artifact, or start a Job from a monitoring event."
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A scheduled research workflow is a one-shot or recurring Job whose task is to gather and write up information. Monitoring is a different trigger on the same Job model: a Sentry issue event or a PagerDuty incident event, when that connection is configured. Neither one is a separate research product or a separate monitoring engine.

## What it is

The workflow is the Job's task and the employee's skills and tools. Automation is the cron rule, or the monitoring event rule, that creates a run. The agent is that employee. The artifact is the session output. Evidence is whatever sources the answer actually cites, plus the run record. A person decides whether the artifact can be used.

## When to use it

Use a schedule when the same question should be answered on a cadence you can inspect. Use a monitoring event when an external alert should start that employee. Use Software Factory when the expected output is a code change with tests and a release decision.

## How to configure a scheduled run

1. Create a Job for one employee. Write a bounded question, the sources it may use, and the shape of the answer. Do not start with a Job that publishes or edits an external system.
2. Run it manually. Read the session and open any file it created.
3. Add one cron rule. Pipeline cron is only for a lane pipeline with at least two executors. A research task with one employee stays on the Job.
4. Publish, then enable automatic execution. A schedule on a paused Job does not run.
5. On the next run, compare the artifact with the sources. Accept it, ask for a correction in a reused session, or leave the result unused.

Choose a new session per run when each report should stand alone. Reuse the Job's session only when later runs should accumulate context, and say so in the task. Reuse makes a bad source harder to see.

## How a monitoring event differs

Connect [Sentry](/integrations/sentry/) or [PagerDuty](/integrations/pagerduty/) before the event can fire. The event still has to match an enabled trigger, and the employee still needs its own tool grants. An alert payload is untrusted input. It does not widen permissions and it does not prove the underlying incident is fixed.

## A practical research run

Trigger: weekdays at a time you set. Context: the question in the task, plus tools the employee can already call. Agent: one employee. Steps: collect, draft, stop. Verification: you check cited sources. There is no research score. Output: the session and its files. Human point: accept or reject before anyone treats the draft as a finding.

## Related guides

- [Sentry](/integrations/sentry/)
- [PagerDuty](/integrations/pagerduty/)
- [Triggers and schedules](/automate/triggers-schedules/)
- [Loops and recurring work](/automate/loops/)
- [Artifacts and evidence](/user-guide/artifacts-evidence/)
- [Workflow concepts](/workflows/concepts/)

## Limits

There is no research-agent template, no open-ended monitor that runs until cancelled as its own product, and no workflow-level score for a written report. Employee-package evaluation is a separate check. See [execution evaluation](/software-factory/evaluation/).
