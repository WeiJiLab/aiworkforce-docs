---
title: "Build and test"
description: "Record the build and test result for a candidate batch, and return failed work instead of inferring success."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Build and test is the workbench stage that prepares a candidate and records whether the configured checks passed. It is evidence about those checks. It is not a claim that every acceptance criterion was exercised.

## What the lanes record

Test preparation groups ready cards into a candidate batch and prepares the configured test release. Testing verifies the member cards and records results. A failure can return work for repair under the configured flow. Do not open a second repair session until you have read the active execution.

The result you can cite is the one the lane recorded: status, scope, and the execution it belongs to. A conversation that says "tests passed" is not a substitute for that record. If no pipeline is configured, the automated stage did not run. Say so. A person may run a named command and attach the output, and that output is then the evidence. An absent command is not a pass.

## Read the batch, not one card

A batch shares the candidate. An operation on the batch can affect every member. Check membership before you accept a green result for a card that was not in the candidate. [CI/CD integration](/software-factory/cicd/) is how the pipeline is connected. [Business verification](/software-factory/business-verification/) compares the same change with the confirmed outcome, which a unit test may not cover.

[Quality gates](/software-factory/quality-gates/) decide what a failed or missing result is allowed to unblock.
