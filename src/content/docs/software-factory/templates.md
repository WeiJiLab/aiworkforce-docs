---
title: "Collaboration templates"
description: "Choose a published collaboration template for a delivery workflow."
sidebar:
  label: "Collaboration templates"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-21"
---

A collaboration template is a published workflow scenario for a delivery board. It defines the stages, employee assignments, handoffs, and automations that move a card from intake to completion.

Administrators publish and maintain collaboration templates in the Admin console. In a workspace, open **Workbench → New delivery project**, choose a published template, and review the flow before creating the delivery project. The selected template provides the starting workflow for the project.

## Current scenario templates

| Template | Use it for |
| --- | --- |
| `customer-escalation-to-product-fix` · Customer feedback to fix verification | Taking a customer report through a fix, verification, and reply draft |
| `spec-intake-to-rfc-ticket-breakdown` · Requirements to development-ready card | Turning an unclear brief into a scoped, development-ready card |
| `release-notes-multi-audience` · Release notes to review draft | Preparing sourced release notes for several audiences |
| `pr-author` · Issue to draft PR | Moving a confirmed issue into implementation and a draft pull request |
| `pr-spec-adherence-check` · PR acceptance criteria check | Checking a pull request against its specification |
| `risk-based-test-plan-generator` · Risk-based test plan | Creating a test plan from feature or release risk |
| `docs-gap-from-support-ticket` · Support ticket to documentation gap | Finding and filling a documentation gap from a support question |
| `incident-investigator` · Incident investigation and retrospective | Organizing incident evidence into a retrospective |
| `release-candidate-readiness-review` · Release candidate readiness review | Reviewing evidence before a candidate release decision |
| `weekly-product-digest` · Product weekly digest | Summarizing feedback and product changes for a weekly update |

## Software Factory guides

These guides are task-oriented entry points. Choose the collaboration template that matches the work before configuring employees.

| Guide | Suggested template |
| --- | --- |
| [Requirements to a card](/software-factory/requirements-to-card/) | `spec-intake-to-rfc-ticket-breakdown` |
| [Card to Pull Request](/software-factory/card-to-pr/) | `pr-author` or `customer-escalation-to-product-fix` |
| [Pull Request to merge](/software-factory/pr-to-merge/) | `pr-spec-adherence-check` or `release-candidate-readiness-review` |
| [Signal to a card](/software-factory/signal-to-card/) | `customer-escalation-to-product-fix`, `incident-investigator`, or `docs-gap-from-support-ticket` |

## Use a collaboration template

1. Choose a published template that matches the work.
2. Create a delivery project and assign ready employees to the required stages.
3. Add the source material to the first card, then follow the run and review its outputs.

See [Run your first automation](/getting-started/first-automation/) for the setup walkthrough. See [Templates](/build/templates/) and [Publishing and distribution](/build/publishing/) to create and publish templates.
