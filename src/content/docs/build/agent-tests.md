---
title: FDE Agent tests
description: Administrators queue an employee against a test suite, or open plugin evaluation in the FDE workbench.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

**Agent tests** (Agent 评估) is administrator-only. Other FDE users do not see it in navigation. The screen has two tabs: **Agent tests** (Agent 评估) and **Agent evaluation** (Agent 评测).

## Queue a suite

**Create test** (创建测试) asks for a digital employee and a test suite. The test is queued as soon as it is created. The list shows the total and refreshes every 5 seconds while a test is queued or running. Open a test to read each case's status, score, and duration.

An empty employee list or an empty suite list means there is nothing to select. This tab does not author the suite. It also does not move a delivery card. Use **Validate** to check the Agent Package structure. See [Employee testing](/build/testing/). Judging one delivery task from its records is [Execution evaluation](/software-factory/evaluation/).

## Evaluate a plugin

The **Agent evaluation** tab can return to the current build or to the [standard employee marketplace](/build/market/). **Build and regression** (构建与回归) keeps history for the selected employee and version, including a published version or a current draft. **Online anomalies** (线上异常) needs a traceable online instance of that employee.

You can continue an interrupted run after confirming the original run has stopped. Only cases that have not started continue, and existing evidence is kept. In-progress cases are recorded as environment errors. The platform rejects a resume while a run is still in progress. **Cancel this run** (取消本轮执行) stops after the current step and keeps evidence from completed runs. **Download full evidence** (下载完整证据) is available when a run is not active.
