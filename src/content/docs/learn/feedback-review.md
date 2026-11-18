---
title: "Turn feedback into reviewed work"
description: "Preserve source observations, triage incoming feedback, and route confirmed work without treating collection as authorization."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Customer feedback and monitoring signals are inputs to a decision. Before asking an employee to implement a change, establish what was observed, whether it is reproducible, and which outcome the team intends to improve. How a report becomes a card is [Signal → card](/software-factory/signal-to-card/). AI Workforce's workspace Task inbox provides the review surface; this guide does not assume a separate feedback-theme module.

## Preserve the observation

Open a collected or imported item and read its source, description, and any evidence. Separate the person's actual report from the employee's interpretation. “The submit action appeared inactive after editing the name” is an observation. “The database is broken” is a hypothesis until evidence supports it.

Record the affected user or role without exposing unnecessary personal data, the relevant time or version, the steps taken, the observed result, and the expected result. Link the original material if the reviewer can access it. If the report is incomplete, request information instead of filling in the gaps with invented reproduction steps.

## Triage before implementation

Use the actions available for the item's workflow and your permissions:

| Decision            | When it is useful                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------- |
| Request information | The report lacks enough context to investigate.                                           |
| Accept              | The observation is useful and deserves follow-up. Acceptance alone does not start coding. |
| Mark duplicate      | An existing item already owns the same problem; preserve the original source.             |
| Snooze              | The team should reconsider later, with a meaningful review time.                          |
| Dismiss or archive  | Record why no further work is needed, using the available workflow.                       |

One report can contain several problems. Keep the source item and derive a focused action when necessary. Avoid combining unrelated requests just because they arrived in the same meeting or channel.

## Check automated collection

When an Automation uses **Collect tasks / issues**, inspect the run's collection receipt. A chat summary that says “saved” is insufficient. Successful saving returns a real Issue identity; an empty result has its own recorded completion. A failed save must remain visible as a failure.

Use a stable source identity when the same source is checked repeatedly. An earlier run's successful collection does not establish that the current run updated the item. Keep the configured destination explicit: a workspace inbox for review, or a workbench project that can create eligible delivery drafts. Items that do not support development remain inbox material.

## Create a bounded follow-up

For a development-capable item, use its workbench action and choose the intended project. Read the draft, confirm the editable repositories, and turn the report into [testable requirements](/learn/requirements-writing/). The requirements employee and a person clarify and confirm the work before development becomes ready.

If the configured collector already created a draft in the target workbench, follow that link instead of creating a second card. Check the collection receipt and the item's linked delivery state when unsure.

## Close the learning loop

After delivery, compare the recorded result with the original observation. Link the actual code or release evidence when communicating what changed. A collected item, a completed session, and a production fix have different meanings; describe the state that the evidence supports.

If a new report reveals a different problem, preserve it as new work rather than silently extending the completed task. Continue with [inbox and tasks](/user-guide/inbox-tasks/) and [review and release](/software-factory/review-release/).

## Further reading

The broader signal-to-delivery loop is also described in [Augment's Software Factory guide](https://docs.augmentcode.com/cosmos/software-factory/overview) and [8090's Feedback module](https://docs.8090.ai/modules/feedback). Their integrations and feedback objects are specific to those products.
