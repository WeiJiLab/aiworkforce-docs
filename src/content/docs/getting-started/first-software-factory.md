---
title: "Your first Software Factory workflow"
description: "Move one confirmed request from a delivery draft through execution, verification, and review."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Software Factory is the path from a confirmed engineering request to a reviewed change. This first workflow follows one card. It does not turn on unattended merge or production release. Those steps need repository credentials, execution employees, and pipeline resources that a new card does not create for you.

## Prerequisites

You need a workspace, a configured workbench project and board, at least one repository connection, and ready employees for the lanes you will use. The execution employees need grants for the repositories they should touch. A repository connection on the workspace is not that grant. Read [code repositories](/integrations/code-repositories/) if the connection is not ready.

## 1. Confirm the request before development

Issues routed into the workbench become drafts. A draft is waiting for a person to confirm scope, acceptance criteria, and allowed repositories. Confirming the requirement does not grant missing credentials or repair a pipeline. Leave the card as a draft if the acceptance criteria are still ambiguous.

## 2. Let one employee execute the ready card

When the card is ready, start or resume the development session from the card. Keep the allowed repositories and the acceptance criteria visible in that work. Respond to questions on the card. If you take over, automatic progress stops and the current state is kept. Hand the work back explicitly when you want the lane to continue. Resuming a pause does not clear a takeover.

## 3. Require verification and evidence

A completed conversation is not a completed delivery. Follow the card into Test release and Test verification when the board uses those built-in lanes. Read the execution record, the code reference or pull request, and the test result. A failing test can return the work for repair. If you waive a check, name the check, the reason, the scope, and the remaining risk.

## 4. Stop before an unconfigured release

Merge and production release run only when the project has working repository and pipeline integration. Do not treat a closed batch as proof that production release or cleanup finished. [Review and release](/software-factory/review-release/) explains those later records.

## Expected result

You can point to one confirmed requirement, the session that did the work, the change or pull request, and the evidence you used to accept or return it. The full map is [Software Factory overview](/software-factory/overview/). The same path, with more of the team's decisions written down, is [Issue to PR](/recipes/issue-to-pr/).
