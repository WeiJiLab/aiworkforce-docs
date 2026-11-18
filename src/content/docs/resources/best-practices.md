---
title: "Best practices"
description: "Apply the same boundaries when you use an employee, build one, automate work, or ship a change."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

These practices are the constraints the rest of the documentation keeps repeating. They are not a new feature.

## Define the job before the prompt

Write the outcome, the inputs, the exclusions, and the check a person will use. Put stable policy in the employee definition and the skill. Put this request's materials in the session. A long chat prompt should not be the only copy of the responsibility. See [employee definition](/build/employee-definition/) and [requirements writing](/learn/requirements-writing/).

## Separate records

A session, an inbox item, a run, an artifact, and a delivery card answer different questions. Do not treat one green state as all of them. Cite the record that supports the claim.

## Authorize narrowly

Name the tool or repository in the package only as a dependency. Grant it on the employee that must use it. A workspace connection is not that grant. A prompt is not that grant.

## Prove the result

Run the normal case, the missing input, and the out-of-scope request for an employee. For a code change, record the test that ran and the acceptance criterion it relates to. A missing check is unverified. A waiver names the check, the scope, the reason, and the risk.

## Do not describe planned work as available

If a page is marked Limited or Planned, follow that boundary. Schedules, webhooks, and events are different triggers. Software Factory does not write and release code by itself. There is no general SDK package and no ACP or A2A server in this baseline.

More of the same judgment is in [playbooks](/learn/) and [feedback and review](/learn/feedback-review/).
