---
title: "Collaboration templates"
description: "Choose a published collaboration template and follow its stages from intake to completion."
sidebar:
  label: "Collaboration templates"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-21"
---

A collaboration template is the operating model for a delivery card. It defines the stages, employee requirements, handoff artifacts, and completion rule that a board uses for one kind of work.

Choose the template before configuring employees or writing a board-specific sequence. The published template version supplies the contract that later stages follow. A workspace can bind different employee instances to those stages, while the stage names, artifact keys, and completion behavior stay attached to the template version.

Open **Workbench → New delivery project**, choose a published template, and expand **View the full flow and automations** before creating the project. The template becomes the executable workflow for the board.

## Start with a collaboration template

| Work you need to move forward                               | Start with this template                                                                                 | First named artifact                                           |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Turn a brief into a development-ready card                  | `spec-intake-to-rfc-ticket-breakdown`                                                                    | `acceptance`                                                   |
| Turn a confirmed card into a draft Pull Request             | `pr-author`                                                                                              | `implementation_brief`                                         |
| Check a change before merge or release                      | `pr-spec-adherence-check`, `customer-escalation-to-product-fix`, or `release-candidate-readiness-review` | `acceptance_criteria`, `reproduction`, or `candidate_evidence` |
| Turn feedback, an incident, or a support question into work | `customer-escalation-to-product-fix`, `incident-investigator`, or `docs-gap-from-support-ticket`         | `reproduction`, `event_timeline`, or `gap_analysis`            |

The four guides under this section explain these template-led paths in detail. They describe how to choose and run a template. They do not define an additional workflow that overrides the published scenario.

## Published scenario templates

| Template                                                                       | Stages and handoff artifacts                                                                                                       | Completion     |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `customer-escalation-to-product-fix` · Customer feedback to fix verification   | Support triage → `reproduction`; Development fix → `pull_request`; Test verification → `verification`; Reply draft → `reply_draft` | `HUMAN_REVIEW` |
| `spec-intake-to-rfc-ticket-breakdown` · Requirements to development-ready card | Requirements analysis → `acceptance`; Technical review → `work_order`                                                              | `HUMAN_REVIEW` |
| `release-notes-multi-audience` · Release notes to review draft                 | Release evidence → `change_set`; Documentation writing → `release_draft`; Product review → `reviewed_notes`                        | `HUMAN_REVIEW` |
| `pr-author` · Issue to draft PR                                                | Requirements check → `implementation_brief`; Implementation and review → `draft_pr`                                                | `AUTO`         |
| `pr-spec-adherence-check` · PR acceptance criteria check                       | Specification review → `acceptance_criteria`; Criterion-by-criterion review → `adherence_report`                                   | `AUTO`         |
| `risk-based-test-plan-generator` · Risk-based test plan                        | Risk analysis → `risk_register`; Test design → `test_plan`                                                                         | `AUTO`         |
| `docs-gap-from-support-ticket` · Support ticket to documentation gap           | Support analysis → `gap_analysis`; Documentation editing → `documentation_draft`                                                   | `AUTO`         |
| `incident-investigator` · Incident investigation and retrospective             | Incident investigation → `event_timeline`; Retrospective analysis → `incident_report`                                              | `HUMAN_REVIEW` |
| `release-candidate-readiness-review` · Release candidate readiness review      | Release evidence → `candidate_evidence`; Readiness review → `readiness_report`                                                     | `HUMAN_REVIEW` |
| `weekly-product-digest` · Product weekly digest                                | Weekly source gathering → `weekly_sources`; Digest editing → `weekly_digest`                                                       | `HUMAN_REVIEW` |

`AUTO` can complete the card after the final stage returns `READY` and close-out finishes. `HUMAN_REVIEW` sends the final artifact to a person. Any stage can return `NEEDS_REVIEW` when it lacks information, access, or a decision.

## Run a template through a card

1. Choose a published scenario that matches the work and inspect its stages, required employees, artifacts, and completion rule.
2. Create a delivery project and bind one ready employee to each required stage. Grant each stage the repository and external capabilities it needs.
3. Create a card in the first stage. Include the source material, repository scope, environment scope, and acceptance conditions.
4. Open the orchestration run and inspect each named artifact. Later stages receive the artifacts declared by the template's `requires` mapping.
5. Review the final artifact. Confirm the card when the template uses `HUMAN_REVIEW`, or let close-out finish when the template uses `AUTO`.

The card's completion rule covers the delivery described by the card. It does not publish an external announcement or approve a production release by itself. See [Templates](/build/templates/) and [Publishing and distribution](/build/publishing/) to create and publish your own scenarios.
