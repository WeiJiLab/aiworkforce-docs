---
title: "BoardFlow templates"
description: "Choose a published workflow scenario with defined stages, handoff artifacts, and completion rules."
sidebar:
  label: "BoardFlow templates"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-21"
---

A published board template defines the stages, employee tasks, required employees, handoff schemas, and automation recipes for a delivery board. The current BoardFlow catalog contains ten curated scenarios. Each scenario starts from one card and gives every stage a named artifact that later stages can read.

Open **Admin console → Board templates** to maintain templates. In a workspace, open **Workbench → New delivery project**, choose a published template, and expand **View the full flow and automations** before creating the board. The template's stages become the board's executable lanes. Assign a ready digital employee to each required stage.

`AUTO` completes the card after the final stage returns `READY` and the close-out automation finishes. `HUMAN_REVIEW` sends the final artifact to the human review lane. Any stage can still return `NEEDS_REVIEW` when it needs information, access, or a decision. A template's completion rule applies to the described card delivery. It does not publish an external announcement or approve a production release by itself.

## Current scenario templates

| Template                                                                       | Stages and handoff artifacts                                                                                                       | Completion   | Use it for                                                                                  |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------- |
| `customer-escalation-to-product-fix` · Customer feedback to fix verification   | Support triage → `reproduction`; Development fix → `pull_request`; Test verification → `verification`; Reply draft → `reply_draft` | Human review | A customer report that needs a reproducible fix, verification, and a reply draft            |
| `spec-intake-to-rfc-ticket-breakdown` · Requirements to development-ready card | Requirements analysis → `acceptance`; Technical review → `work_order`                                                              | Human review | A brief that needs scope, acceptance criteria, and technical constraints before development |
| `release-notes-multi-audience` · Release notes to review draft                 | Release evidence → `change_set`; Documentation writing → `release_draft`; Product review → `reviewed_notes`                        | Human review | Version changes that need sourced notes for several audiences                               |
| `pr-author` · Issue to draft PR                                                | Requirements check → `implementation_brief`; Implementation and review → `draft_pr`                                                | Auto         | A confirmed issue that can move directly to implementation and a draft PR                   |
| `pr-spec-adherence-check` · PR acceptance criteria check                       | Specification review → `acceptance_criteria`; Criterion-by-criterion review → `adherence_report`                                   | Auto         | A pull request that needs a traceable check against its specification                       |
| `risk-based-test-plan-generator` · Risk-based test plan                        | Risk analysis → `risk_register`; Test design → `test_plan`                                                                         | Auto         | A feature or release that needs a test plan based on risk and impact                        |
| `docs-gap-from-support-ticket` · Support ticket to documentation gap           | Support analysis → `gap_analysis`; Documentation editing → `documentation_draft`                                                   | Auto         | A support question that needs a verified answer or a documentation change                   |
| `incident-investigator` · Incident investigation and retrospective             | Incident investigation → `event_timeline`; Retrospective analysis → `incident_report`                                              | Human review | An incident that needs a sourced timeline, hypotheses, and follow-up actions                |
| `release-candidate-readiness-review` · Release candidate readiness review      | Release evidence → `candidate_evidence`; Readiness review → `readiness_report`                                                     | Human review | A candidate release that needs an evidence-based go or no-go decision                       |
| `weekly-product-digest` · Weekly product digest review                         | Weekly source gathering → `weekly_sources`; Digest editing → `weekly_digest`                                                       | Human review | A weekly product update assembled from feedback and delivered changes                       |

The stage names and artifact keys above come from the published scenario mappings. The workspace can bind different employee instances to those stages, while the handoff contract stays attached to the template version.

## How the Software Factory guides map to templates

The guides describe entry points into the catalog. Select the scenario that matches the work before assigning employees.

| Guide                                                             | Template scenarios                                                                                                                                    |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Requirements to a card](/software-factory/requirements-to-card/) | `spec-intake-to-rfc-ticket-breakdown`                                                                                                                 |
| [Card to a pull request](/software-factory/card-to-pr/)           | `pr-author`, or the development stages in `customer-escalation-to-product-fix`                                                                        |
| [Pull request to merge](/software-factory/pr-to-merge/)           | `pr-spec-adherence-check`, the verification stage in `customer-escalation-to-product-fix`, or `release-candidate-readiness-review`                    |
| [Signal to a card](/software-factory/signal-to-card/)             | Use intake first, then choose `customer-escalation-to-product-fix`, `incident-investigator`, or `docs-gap-from-support-ticket` for the resulting card |

The four guides group related work. They do not imply that every board has the built-in Requirements, Development, Test deployment, Testing, and Production lanes in the same order. The selected board template and its published version determine the executable stages.

## Follow one template through a card

1. Choose a published scenario and inspect its stages, required employees, and completion rule.
2. Create the board and bind each required stage to a ready employee with the repositories and external capabilities that stage needs.
3. Create one card in the first stage. Include the source material and any repository or environment scope the scenario requires.
4. Open the pipeline run and inspect each stage's named artifact. A later stage receives the artifacts declared by its `requires` mapping.
5. When the final artifact is ready, follow the template's completion rule. Human review records the decision on the card before close-out.

For the board initialization path, see [Run your first automation Job](/getting-started/first-automation/). For template authoring and publishing, see [Templates](/build/templates/) and [Publishing and distribution](/build/publishing/).
