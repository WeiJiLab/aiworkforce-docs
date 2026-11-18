---
title: "Software Factory overview"
description: "Take engineering requests from the inbox or delivery board through implementation, verification, and review."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Software Factory is the AI Workforce delivery workflow for turning a confirmed engineering request into a verified change. Open the **delivery workbench** from **Automations** at `/automations?tab=board-flow`. A delivery card brings together the requirements, execution, test results, and review decisions for one change.

## Choose a workflow

| Goal                                                  | What you get                                                                                                           | Start here                                                                         |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Turn a request into work the team can accept          | An inbox item or a delivery draft with a source, agreed scope, acceptance criteria, and permitted repositories         | [Work intake and backlog](/software-factory/intake/)                               |
| Take an Issue through implementation and verification | A delivery card linked to a code change or PR, the tested revision, and the evidence for review                        | [Quickstart](/getting-started/quickstart/) or [Issue to PR](/recipes/issue-to-pr/) |
| Review a change and follow its release                | A review decision, followed by merge, deployment, and cleanup records where the project is configured for those stages | [Review and release](/software-factory/review-release/)                            |
| Collect incoming requests on a recurring basis        | Inbox items or delivery drafts from configured sources, with a collection receipt to inspect                           | [Automation concepts](/automate/fundamentals/)                                     |

## From intake to a pull request

1. Route an inbox Issue into a workbench draft. A person reviews the scope and confirms the acceptance criteria and repositories before development.
2. Start or resume development from the confirmed card. The configured lane employee works in a session and links the code reference or PR.
3. Follow the candidate through test preparation and testing where those lanes are configured. A batch groups cards that are tested together. Check the actual revision, environment, and test results against the agreed acceptance criteria.
4. Use the card's evidence to accept the change, return it for repair, or record a waiver. For projects that handle merge and release, check those outcomes and cleanup in their respective records.

Built-in lanes cover requirements, development, test preparation, testing, merge to main, and completion. On a custom board, follow the configured stages and actions. [Agent orchestration](/software-factory/orchestration/) explains how cards and batches move through those stages.

## What you configure first

A [delivery project](/user-guide/projects/) connects the board, repository and pipeline resources, and the employees that run each lane. Configure [repository connections](/integrations/code-repositories/) and grant the execution employees access to the repositories they need. Follow [set up and run a delivery board](/getting-started/first-software-factory/) for a readiness checklist and guidance on handling blocked work.

## People stay in the loop

The team confirms scope before development and makes decisions using the evidence on the card. An Automation Job can collect Issues into the inbox or workbench when collection is configured. A person confirms the draft before it enters development. During execution, use the card to respond to questions or take over, then explicitly hand the work back when it is ready to continue. Inspect batch membership before making a decision that applies to a shared batch.

## Architecture

| Layer                         | How it supports delivery                                                                                                                                                                | Related guides                                                                                                                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Work intake and orchestration | The workbench tracks drafts, cards, and batches. The project assigns ready work to lane employees.                                                                                      | [Intake](/software-factory/intake/), [dispatch](/software-factory/dispatch/), [orchestration](/software-factory/orchestration/)                                                                                |
| Execution                     | Delivery and collection use Claude Code. The workbench runs lane work with the execution environment configured for the employee, such as the platform runtime or an authorized device. | [Harness](/software-factory/harness/), [environments](/software-factory/environments/)                                                                                                                         |
| Verification and evidence     | The configured pipeline supplies build and test results. Reviewers compare the tested change with acceptance criteria and trace the supporting records.                                 | [CI/CD](/software-factory/cicd/), [build and test](/software-factory/build-test/), [business verification](/software-factory/business-verification/), [evidence](/software-factory/evidence/)                  |
| Governance                    | Gates use recorded results and decisions. Merge and production release require the repository and pipeline integrations for those stages.                                               | [Evaluation](/software-factory/evaluation/), [observability](/software-factory/observability/), [quality gates](/software-factory/quality-gates/), [release governance](/software-factory/release-governance/) |
