---
title: Role capability tests
description: Test a role package on sample tasks or run a suite against a specific workspace employee.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Administrators open **Role capability tests** in the FDE workbench. Use **Plugin evaluation and regression** to test a draft or package version. Use **Suite benchmarks** to check a particular workspace employee. For the maintenance role, give it a failed CI log and check that it cites the relevant lines. With the log missing, check that it asks for it.

## Queue a suite

**Create test** (创建测试) asks for a digital employee and a test suite. The test is queued as soon as it is created. The list shows the total and refreshes every 5 seconds while a test is queued or running. Open a test to read each case's status, score, and duration.

An empty employee list or an empty suite list means there is nothing to select. This tab does not author the suite. It also does not move a delivery card. Use **Validate** to check the Agent Package structure. See [Employee testing](/build/testing/). Judging one delivery task from its records is [Execution evaluation](/software-factory/evaluation/).

## Evaluate a plugin

The **Plugin evaluation and regression** tab can return to the current build or to the [standard employee marketplace](/build/market/). **Build and regression** (构建与回归) keeps history for the selected employee and version, including a published version or a current draft. **Online anomalies** (线上异常) needs a traceable online instance of that employee.

You can continue an interrupted run after confirming the original run has stopped. Only cases that have not started continue, and existing evidence is kept. In-progress cases are recorded as environment errors. The platform rejects a resume while a run is still in progress. **Cancel this run** (取消本轮执行) stops after the current step and keeps evidence from completed runs. **Download full evidence** (下载完整证据) is available when a run is not active.
