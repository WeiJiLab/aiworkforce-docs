---
title: "Release governance"
description: "Separate merge, production release, and cleanup, and keep a person responsible for each outcome."
sidebar:
  label: Release governance
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Release governance is the policy for merge, production release, and cleanup: which result is allowed to proceed, and who remains responsible. The path a reviewer walks through the records is [review and release](/software-factory/review-release/). This page does not repeat that path.

## Three outcomes

1. **Merge.** A passing batch can be merged when the project has a working repository integration and the execution employees are authorized. The batch records the merge outcome.
2. **Production release.** After a successful merge, completion scans merged cards and progresses the configured production release. A closed batch does not mean this step finished.
3. **Cleanup.** Resource cleanup follows through the completion lane. A failed cleanup stays visible. It does not rewrite a release that succeeded, and a successful release does not hide a failed cleanup.

Custom boards may arrange these steps differently. Follow the configured lanes. [Review and release](/software-factory/review-release/) is the reviewer's path through the same records.

## What must already be true

Automated merge and production release require the code host, the pipeline resources, and the employee grants. The card supplies none of them. Identify who may write, merge, or deploy, and keep the human confirmation that workflow still requires. A waived test does not become a release approval. Name the waiver separately.

Taking over a card stops automatic progress. Hand it back explicitly before you expect the release lane to continue. Ending the platform's pull-request follow-up does not close the external pull request.

[Security and permissions](/deployment/security/) is the boundary for those credentials. [CI/CD integration](/software-factory/cicd/) is how the pipeline is attached.
