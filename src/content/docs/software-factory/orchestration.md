---
title: "Agent orchestration"
description: "Coordinate lane sessions and batches so related cards move together without hiding a human decision."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Orchestration in Software Factory is the workbench moving cards and batches through lanes. It is not a general multi-agent runtime. Each lane session keeps its own execution context. A batch groups cards when a stage, such as test preparation or testing, operates on them together.

## Follow the built-in lanes

Built-in lanes are requirements, development, test preparation, testing, merge to main, and completion. Requirements confirms the request. Development starts or resumes a session for a ready card. Test preparation groups ready cards into a candidate batch. Testing records results and can return work for repair. Merge and completion record their own outcomes. Custom boards can use a different arrangement. Read the configured lanes rather than assuming this list.

An operation on a shared batch can affect every member card. Inspect membership before you confirm. A successful conversation in development is only one record. The batch's test and merge records answer different questions.

## Keep people able to stop the flow

Respond to questions on the card. If a person takes over, automatic progress stops and the current state is kept. Hand the work back explicitly. Resuming a pause does not clear a takeover. [Agent handoff](/automate/agent-handoff/) compares this card-level handoff with a session continuation and an in-process subagent.

Orchestration does not grant tools or choose the runtime. The employee on the lane uses the grants and the runtime already configured. See [harness](/software-factory/harness/) and [task dispatch](/software-factory/dispatch/).
