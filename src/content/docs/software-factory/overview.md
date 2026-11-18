---
title: "Software Factory overview"
description: "Follow engineering work from intake through execution, verification, evidence, and a human release decision."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Software Factory is AI Workforce's engineering delivery system. It connects a confirmed request to employee execution, an environment that can check the change, and evidence a person uses to decide whether the change ships. The product surface is the **delivery workbench**, opened from **Automations** at `/automations?tab=board-flow`.

This is not a product for unattended code generation. An agent can draft a change. The factory's job is to make the path from input to a verified delivery inspectable.

## Three layers

| Layer        | What must be true                                                                   | Where to read it                                                                                                                                                                                     |
| ------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Execution    | An employee, in a harness and runtime, performs a dispatched task                   | [Dispatch](/software-factory/dispatch/), [orchestration](/software-factory/orchestration/), [harness](/software-factory/harness/)                                                                    |
| Verification | The result is checked in an environment, by tests, and against the business outcome | [Environments](/software-factory/environments/), [build and test](/software-factory/build-test/), [business verification](/software-factory/business-verification/)                                  |
| Governance   | Evidence, evaluation, and gates decide whether to deliver                           | [Evidence](/software-factory/evidence/), [evaluation](/software-factory/evaluation/), [quality gates](/software-factory/quality-gates/), [release governance](/software-factory/release-governance/) |

Execution without verification is a conversation that edited files. Verification without governance is a test result nobody used. Governance without evidence is a status label.

## From intake to a pull request

1. **Intake.** A request enters as an inbox item or a workbench draft. A person confirms scope, acceptance criteria, and allowed repositories. See [work intake](/software-factory/intake/).
2. **Dispatch.** A ready card is assigned to the lane employee that should do the work. See [task dispatch](/software-factory/dispatch/).
3. **Execute.** That employee works in a session, on the configured runtime. Batches group cards when a later stage tests them together. See [agent orchestration](/software-factory/orchestration/).
4. **Verify.** Test preparation and testing record results. Failures can send work back. A business check compares the change with the confirmed acceptance criteria.
5. **Evidence.** The card keeps the session, the code reference or pull request, the test result, and the human decision. See [evidence and trace](/software-factory/evidence/).
6. **Release.** Merge and production release run only with working repository and pipeline integration. A closed batch is not proof that production release finished. See [review and release](/software-factory/review-release/).

Built-in lanes are requirements, development, test preparation, testing, merge to main, and completion. Custom boards can arrange work differently. Available actions depend on the selected board.

## What you configure first

Before any automatic delivery, configure the workbench project and board, the repositories and pipeline resources, and the employees on the lanes. Employees must be ready. Repository credentials belong to the workspace; referencing one in a connection does not authorize every employee. Authorize the execution employees for the delivery roles. Provider, instance, enabled state, and workspace must match the connection you intend. See [code repositories](/integrations/code-repositories/).

## People stay in the loop

A draft is not permission to modify code. During execution, answer questions and approval requests on the card. Taking over stops automatic progress and keeps the current state. Hand the work back explicitly. Resuming a pause does not clear a takeover. An operation on a shared batch can affect every member card.

[Your first Software Factory workflow](/getting-started/first-software-factory/) walks one card. [Issue to PR](/recipes/issue-to-pr/) is the longer practice. [Automation concepts](/automate/fundamentals/) explains Jobs that collect work into the inbox or the workbench. Those Jobs do not replace the confirmation step.
