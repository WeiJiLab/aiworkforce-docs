---
title: "Business verification"
description: "Compare a change with the confirmed acceptance criteria. The product does not score business outcomes by itself."
support: limited
sidebar:
  badge:
    text: Limited
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Business verification asks whether the change does what the confirmed requirement said, for the people who needed that outcome. Tests can support that answer. They do not replace it. The current workbench records requirements, test results, and human decisions. It does not include a separate business-verification product, a metric catalog, or an automatic acceptance score.

## Use the criteria you already confirmed

Start from the identifiers and observable behavior written at intake. [Requirements writing](/learn/requirements-writing/) is the method. On the card, keep those criteria visible in the development session. A design note that mentions a behavior does not add it to the agreed scope.

Check each criterion you own:

- What should be true now.
- What you observed.
- Which artifact, test, or source shows it.
- Which criteria you did not check.

If a criterion cannot be observed, say it is unverified. Do not mark the card accepted because the conversation ended. [Feedback and review](/learn/feedback-review/) helps when the observation is a defect, new scope, or a question.

## Record the decision

Accept the criterion, return it, or waive it. A waiver names the check, the reason, the scope, and the risk. "Continue" is not a waiver. [Agent evaluation](/software-factory/evaluation/) shows a small set of cases. [Evidence and trace](/software-factory/evidence/) is where the observation should be stored so the next reader does not depend on the chat scrollback.
