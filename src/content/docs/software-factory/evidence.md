---
title: "Evidence and trace"
description: "Keep the session, the change, the test, and the human decision as separate records a reviewer can open."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Evidence shows what happened during delivery. A trace links the confirmed requirement to the session, the code change, the verification result, and later decisions. A reviewer can follow those records to see which outcomes the evidence supports.

## Keep the records distinct

| Record                         | Claim it can support                                                           |
| ------------------------------ | ------------------------------------------------------------------------------ |
| Confirmed requirement          | The agreed scope and acceptance criteria                                       |
| Session                        | What the employee was asked and which tools ran                                |
| Pull request or code reference | What changed                                                                   |
| Test or build record           | Which checks ran on which revision, in which environment, and with what result |
| Run audit                      | The automation status, output, and error for that invocation                   |
| Human decision                 | Accept, return, waive, or take over                                            |
| Merge record                   | Which change was merged to the target branch                                   |
| Release record                 | Which revision reached the intended environment                                |
| Cleanup record                 | Whether the delivery flow released its resources                               |

Use the recorded checks to determine which acceptance criteria the result covers. See [Review and release](/software-factory/review-release/) for delivery stages and [Review results and artifacts](/user-guide/artifacts-evidence/) for work outside the delivery workbench.

## Follow one change

Start from the card and follow the session ID, the code reference, any test batch, and the recorded human decision. Match the test result to the revision that ran in the test environment. If a required record is missing, keep the outcome unverified and follow up for the evidence. The [Issue to PR recipe](/recipes/issue-to-pr/) shows this for a small change.

For a testing task, finding a defect can satisfy the task's acceptance criteria if the team ran the agreed checks on the intended revision and captured the required report and logs. If a test script finishes successfully and the required logs are missing, collect those logs or rerun the test before accepting the task.

Use [Observability](/software-factory/observability/) to locate records when something fails. [Audit and compliance](/operate/audit/) covers who invoked a run and what the platform stored.
