---
title: "Software Factory overview"
description: "Coordinate requirements, development, testing, and release through the delivery workbench."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

AI Workforce's Software Factory connects requirements, employee execution, code changes, verification, and delivery records. Its product entry is the **delivery workbench**, available from **Automations** at `/automations?tab=board-flow`.

A delivery card represents work to be completed. Employee sessions perform lane work; batches coordinate related cards during candidate preparation and testing. The card keeps requirements, executions, deliverables, and human decisions connected.

## Prepare the workbench

Before enabling automatic delivery, configure a workbench project and board, its repositories and pipeline resources, and the employees assigned to the relevant lanes. Confirm that the employees are ready and can access the intended resources.

Repository credentials belong to the workspace. Referencing a credential in a repository connection does not authorize every employee. Explicitly authorize the execution employees required by the delivery roles. Provider, instance, enabled state, and workspace must match the intended connection.

## Follow the delivery flow

Built-in lanes support:

1. **Requirements:** clarify the request and confirm its scope and acceptance criteria.
2. **Development:** start or resume an employee session for each ready card and record the resulting code work.
3. **Test preparation:** group ready cards into a candidate batch and prepare the configured test release.
4. **Testing:** verify member cards and record results; failures can return work for repair.
5. **Merge to main:** process a passing batch and record its merge outcome.
6. **Completion:** progress configured production release and resource cleanup, recording the result on each card.

Custom board lanes can also coordinate work by card or batch. Available actions depend on the selected board and its configuration. Automated merging and production release require working repository and pipeline integration; creating a card alone does not supply them.

## Keep people in the loop

Issues routed into the workbench become drafts awaiting human confirmation, not immediate authorization to modify code. Confirm the requirements, acceptance criteria, and allowed repositories.

During execution, respond to questions and approval requests from the card. If you take over, automatic progress stops and the current state is kept. Hand work back explicitly when ready; resuming a pause alone does not clear a takeover. Operations on a shared batch can affect every member card, so inspect the scope before confirming.

## Verify completion

Read the execution records, code references or PR, test evidence, and release status. A successful conversation is only one part of delivery. Use the recorded downstream results to determine what actually finished.

## Related guides

- [Issue to PR](/recipes/issue-to-pr/)
- [Artifacts and evidence](/user-guide/artifacts-evidence/)
- [Automation fundamentals](/automate/fundamentals/)
