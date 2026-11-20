---
title: "Write requirements an employee can verify"
description: "Turn a business problem into bounded requirements, observable acceptance criteria, and a confirmed delivery draft."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

A useful requirement lets the person requesting a change and the employee implementing it agree on the same observable result. Write it before authorizing development. This guide uses a hypothetical validation-message change to show the method; the example describes a proposed change, not a feature promised by AI Workforce.

## Establish the shared context

Keep product context separate from the individual change. Explain who uses the product, the problem they face today, the result the team wants, and the constraints that affect a solution. Link existing research or project files instead of copying a large background document into every task.

For example: “Owners cannot tell why an employee name was rejected. We want them to correct the input without leaving the creation flow.” That gives a reason for the change. “Rewrite the entire creation dialog” proposes an implementation and expands the scope before the problem has been agreed.

For a first requirement, provide:

| Context          | Question to answer                                                    |
| ---------------- | --------------------------------------------------------------------- |
| User and problem | Who is blocked, and what are they trying to achieve?                  |
| Current behavior | What happens now? Include a reproducible example or source.           |
| Intended outcome | What should the user be able to accomplish afterward?                 |
| Constraints      | Which repositories, data, compatibility rules, and permissions apply? |
| Review owner     | Who can answer questions and confirm the requirement?                 |

Mark assumptions and unknowns explicitly. An unsupported guess should become a question, rather than quietly becoming a development instruction.

## Describe one feature with stable references

Use a short overview, any terms that could be misunderstood, and a small set of requirements. Give each requirement an identifier that remains stable when its wording changes. The identifiers below are a writing convention; AI Workforce does not require this syntax or create records from it automatically.

```markdown
## Outcome

Owners can correct a blank employee name before submission.

## Terms

Blank name: an empty value or a value containing only whitespace.

## REQ-NAME-01 — Explain a blank name

For an owner creating an employee, explain why a blank name
cannot be submitted so they can supply a valid value.

AC-NAME-01.1: When the name contains only whitespace, show the agreed
validation message next to the name input.
AC-NAME-01.2: When the user supplies a nonblank name, clear that message.
AC-NAME-01.3: When the name is blank, do not create an employee instance.

## Outside this change

No changes to template discovery, naming policy, or existing employees.

## Allowed repositories

The agreed frontend repository only.
```

Each criterion describes one behavior. Replace words such as “fast,” “correct,” or “handles errors” with conditions and results a reviewer can observe. If performance matters, agree on a measurement and environment instead of inventing a target during implementation.

## Explain the rules between requirements

After individual criteria, describe interactions: what happens when an earlier validation fails, which default applies, whether retrying can create duplicate work, and how missing permissions appear. Preserve the difference between a mandatory behavior and an optional improvement.

Split work when outcomes can be accepted independently. Keep changes together when neither result works without the other. An optional extension can follow later; it should not be hidden inside the acceptance criteria of a small fix.

## Confirm the draft in AI Workforce

Open an appropriate Issue from **Task inbox** and choose **Create workbench draft**. Select a project with a ready Requirements employee and submit the drawer. In the requirements conversation, review the criteria and the card’s editable repositories. Respond to a requirement-confirmation request if your board presents one. See [Task inbox](/user-guide/inbox-tasks/).

If the employee discovers a material gap, clarify the draft before confirming. Confirming a requirement establishes the agreed work; it does not grant missing repository credentials or make an unconfigured delivery pipeline usable.

The expected result is a confirmed, bounded requirement with criteria that another person can use to accept or reject the delivered change. Continue with [design and execution planning](/learn/blueprints-work-orders/) and [Issue to PR](/recipes/issue-to-pr/).

## Further reading

The distinction between product context, feature requirements, and atomic acceptance criteria is informed by [8090's Requirements Writing Guide](https://docs.8090.ai/opinions/requirements-writing-guide). The examples and AI Workforce workflow above are specific to this documentation.
