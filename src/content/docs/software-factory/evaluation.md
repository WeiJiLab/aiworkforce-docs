---
title: "Agent evaluation"
description: "Judge whether an employee did the job you defined, using checks and examples rather than a fluent reply."
sidebar:
  label: Execution evaluation
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Execution evaluation answers a narrow question: did this employee, on this task, produce a result that meets the responsibility and the acceptance criteria? A confident reply, a long session, or a green conversation is not that answer. Platform controls — grants, models, cost, and audit — are [platform governance](/operate/evaluation-governance/), not a second score for the same task.

The delivery path can validate an employee package, run a task, and keep execution, test, and delivery records. It does not turn a benchmark score into an automatic promotion gate. Administrators have a separate screen, [FDE Agent tests](/fde/agent-tests/), for queued suite runs and plugin evaluation. That screen does not move a delivery card. Use the checks below with the records you already have. [Quality gates](/software-factory/quality-gates/) are how a recorded result blocks or allows delivery. [Agent evaluation and governance](/operate/evaluation-governance/) is how those checks sit next to permissions, models, and audit.

## What you can measure now

| Signal             | What it supports                                           | What it does not support            |
| ------------------ | ---------------------------------------------------------- | ----------------------------------- |
| Package validation | Required files, fields, skill references, leaked secrets   | Task quality                        |
| Task trial         | Behavior on a normal, incomplete, and out-of-scope request | Performance of every future request |
| Test result        | The checks that ran against a change                       | Untested acceptance criteria        |
| Source citation    | A claim tied to a supplied excerpt                         | A claim with no excerpt             |
| Human decision     | Accept, return, or waive, with a named reason              | A status that says only "done"      |

Pick signals that match the responsibility. A research employee is evaluated on citations and refusals. A coding employee on a delivery card is evaluated on the confirmed acceptance criteria, the diff, and the tests that ran.

## One evaluation case

Use the research assistant from [employee definition](/build/employee-definition/).

| Case          | Input                                    | Accept when                                                             |
| ------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| Normal        | Two short sources and a question         | Findings cite those sources and list real gaps                          |
| Missing input | A question and no materials              | The employee asks for materials and does not invent findings            |
| Out of scope  | "Email this brief to the customer"       | The employee refuses to send it                                         |
| Weak evidence | A source that does not contain the claim | The brief marks the claim unsupported instead of quoting unrelated text |

Record the case, the session or run id, and the decision. Re-run the same cases after you change the skill or the instructions. A package that still validates can still fail the missing-input case. Structural validation did not get worse; the behavior did.

For a delivery card, add the engineering cases you can actually execute: the targeted test command, the pull request diff, and the acceptance criterion identifier. [Build and test](/software-factory/build-test/) is the test record. [Business verification](/software-factory/business-verification/) is the comparison with the confirmed outcome. If a pipeline is not configured, say that the test was not run. Do not record an absent command as a pass.

## Pilot one repeatable workflow

Start with one kind of work, such as small fixes in an existing repository. Agree on the scope, acceptance criteria, and evidence reviewers need. Establish a baseline from comparable recent tasks or from tasks your team handles through its existing process during the pilot. Use the same acceptance criteria and measurement rules for both groups.

| Measure                    | What to record                                                                                                                                             |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cycle time                 | Time from confirming the task to the final review decision                                                                                                 |
| First-pass acceptance rate | Share of reviewed tasks accepted on the first review                                                                                                       |
| Rework and takeovers       | How often reviewers return work or people take over, and the human time spent when recorded                                                                |
| Cost per accepted task     | Total recorded costs divided by accepted tasks in each group. Include any tracked people, model, and environment costs for retries and unsuccessful tasks. |

When a task fails or needs intervention, use its [evidence and trace](/software-factory/evidence/) to capture the input, expected behavior, and observed failure as a regression case. Rerun those cases when you change the employee's instructions, skills, or tools. Review acceptance, human effort, and cost together before expanding to another workflow.

## How to use the result

Failing a case returns the work: change the skill, the instructions, the tool grant, or the task framing, then run the case again. Passing these cases supports a limited claim: this employee handled these inputs under this configuration. It does not authorize a broader role, a new repository, or an unattended release.

When you waive a failed check, write the check, the scope, the reason, and the risk on the card or in the review note. A waiver is a decision. It is not a passing score.

## Related guides

- [Employee testing](/build/testing/)
- [Evidence and trace](/software-factory/evidence/)
- [Artifacts and evidence](/user-guide/artifacts-evidence/)
