---
title: "Connect design to executable work"
description: "Keep requirements, technical decisions, and execution scope connected without confusing documents with platform records."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

A confirmed requirement explains the result people need. A technical design explains how the system will produce it. An execution plan assigns a bounded piece of that change to an employee. Keeping these artifacts connected prevents an implementation from satisfying a convenient interpretation of the wrong requirement.

In this guide, **blueprint** means a technical design document your team maintains. AI Workforce does not currently provide a separate Blueprint module or interpret 8090's component-reference syntax. The platform also has orchestration work orders associated with delegated work; those records are distinct from software-factory delivery cards and from a planning document called a work order.

## Start from a confirmed requirement

Read the requirement and its acceptance criteria before choosing components or dividing work. Follow the source reference and record the revision used for planning. If the change is still ambiguous, return the question to the requirement owner.

For the validation-message example in [requirements writing](/learn/requirements-writing/), the design should explain where blank input is checked and how the message is cleared. It should not introduce a new naming policy merely because the developer noticed adjacent code.

## Write a design that connects to real code

For a small change, a few paragraphs may be enough. For a change that crosses boundaries, cover the following:

| Section           | Useful content                                                    |
| ----------------- | ----------------------------------------------------------------- |
| Context and scope | Requirement references, affected behavior, and exclusions.        |
| Current behavior  | Components and contracts observed in the repository.              |
| Proposed flow     | Which component owns each decision and what crosses a boundary.   |
| Data and access   | Inputs, state changes, authorization, and sensitive values.       |
| Failure behavior  | Validation errors, interrupted work, and safe retry expectations. |
| Verification      | Which checks will demonstrate each acceptance criterion.          |
| Open decisions    | Questions that still require a person to decide.                  |

Use source paths and symbols that exist. Mark proposed components as proposed. Put implementation rationale here while preserving the requirement's agreed meaning. Save the document in an appropriate repository or project file and provide its reference in the requirements conversation or card materials; a filename alone does not create a live dependency graph.

## Define an execution boundary

An executable assignment needs an outcome, owned scope, exclusions, required context, permitted resources, and evidence to return. A useful instruction might be:

```text
Outcome: satisfy REQ-NAME-01 using the agreed validation behavior.
Scope: the existing creation form and its relevant validation tests.
Exclude: backend naming policy, template discovery, existing employees.
Read first: the confirmed requirement and the design revision linked here.
Resources: the approved frontend repository; no additional credentials.
Return: changed-file or code reference, checks performed, results, and gaps.
If the requirement conflicts with current behavior, ask before expanding scope.
```

Include only the criteria this assignment owns, preserving their identifiers and meaning. Avoid splitting a task by arbitrary file count. Split at boundaries where the result can be independently checked and where the next assignment has a clear dependency.

## Apply the plan in the workbench

Use the delivery card's requirements and associated session to carry the agreed design and scope into execution. Confirm editable repositories and lane employees in the project configuration. A design that mentions a repository does not authorize an employee to use its credentials.

After implementation, compare the actual changes with the requirement and design. If a design decision changed, record the reason and the new reference. If the requested outcome changed, clarify the requirements rather than quietly rewriting the criteria to match the implementation.

Continue with [review and release](/software-factory/review-release/) and [artifacts and evidence](/user-guide/artifacts-evidence/).

## Further reading

This separation of intent, technical design, and execution scope is informed by [8090's Blueprint Writing Guide](https://docs.8090.ai/opinions/blueprint-writing-guide) and [Work Order Writing Guide](https://docs.8090.ai/opinions/work-order-writing-guide). Their product modules and reference syntax are not AI Workforce features.
