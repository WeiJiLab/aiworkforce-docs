---
title: "Release governance"
description: "Separate merge, the Production lane, and cleanup, and keep a person responsible for each outcome."
sidebar:
  label: Release governance
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Release governance is the policy for merge, the Production lane (生产发布), and cleanup: which result is allowed to proceed, and who remains responsible. The path a reviewer walks through the records is [review and release](/software-factory/review-release/). This page does not repeat that path.

## Three outcomes

1. **Merge.** A passing batch can be merged when the project has a working repository integration and the execution employees are authorized. The batch records the merge outcome.
2. **Production (生产发布).** A separate orchestration in the Production lane can deploy merged changes according to the configured release schedule and target. Check the production result on the cards after merge.
3. **Cleanup.** Resource cleanup follows through the Done lane. A failed cleanup stays visible. It does not rewrite a release that succeeded, and a successful release does not hide a failed cleanup.

Custom boards may arrange these steps differently. Follow the configured lanes. [Review and release](/software-factory/review-release/) is the reviewer's path through the same records.

## What must already be true

Automated merge and production require working repository and pipeline integrations plus the relevant employee grants. Check the batch’s required approvals for **Merge** and **Deploy to production** separately. The initial approval list is empty unless configured. When an action has no required approval, it can proceed automatically once the other conditions are met. A test waiver note does not satisfy a test gate or an approval.

Taking over a card stops automatic progress. Hand it back explicitly before you expect the release lane to continue. Ending the platform's pull-request follow-up does not close the external pull request.

[Security and permissions](/deployment/security/) is the boundary for those credentials. [CI/CD integration](/software-factory/cicd/) is how the pipeline is attached.
