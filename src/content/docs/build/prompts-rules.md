---
title: "Prompts and rules"
description: "Put responsibilities, task instructions, and repository guidance in the right place, then inspect the effective session prompt."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Use prompts to describe the job, the current task, and how success will be checked. Keep reusable role instructions separate from one request's input so an employee can handle more than one example reliably.

## Choose the instruction layer

| Layer            | What belongs here                                                 | Where to maintain it                                           |
| ---------------- | ----------------------------------------------------------------- | -------------------------------------------------------------- |
| Employee role    | Responsibilities, use cases, exclusions, required inputs, outputs | Employee definition and published template.                    |
| Employee profile | This instance's responsibilities and suitable tasks               | Employee profile → Role, with workspace management permission. |
| Reusable method  | Steps, checks, and output format for a repeatable task            | `skills/<skill-id>/SKILL.md` in the package.                   |
| Automation task  | The registered work and its input/output contract                 | The Job's draft, then its published version.                   |
| Delivery lane    | Instructions for the employee working in that lane                | The board's lane configuration.                                |
| Current request  | Goal, supplied facts, scope, and acceptance criteria              | The session message or the Job's declared input.               |

Role profile fields are copied when an instance is created; changing that profile does not rewrite the source template. Likewise, changing a template does not prove an existing instance received the change.

## Write a task that can be checked

For a documentation review employee, a task could say:

```text
Review the supplied quickstart for steps a new user cannot follow.
Use only the supplied page and the stated product behavior.
Return a table with the unclear step, the missing prerequisite,
and a proposed correction. Mark uncertain behavior as a question.
Do not edit or publish the page.
```

Put the supplied page in the input, rather than allowing it to redefine the employee's role. State which sources may be used and what must remain a question. For a Job, keep the instruction in its configuration and validate input against the declared schema; callers cannot replace its runtime configuration through the invocation API.

## Understand repository rules

AI Workforce does not provide a universal importer for Cursor Rules, Augment instructions, or every IDE's settings. In the Claude Code runtime, project instructions follow that runtime's supported configuration sources. Platform-managed instance instructions may be materialized as `CLAUDE.md`; do not treat that generated file as the source employee package.

The employee package validator rejects a root `CLAUDE.md`. Maintain the package's role and router in `.aiworkforce/`, methods in skills, and repository contributor instructions in `AGENTS.md`. Do not add a second instruction hierarchy merely to make a package pass validation.

## Verify the effective behavior

Open the session's system-prompt inspection action to review the assembled instructions you are permitted to see. Check the employee, workspace, and lane context rather than assuming the most recently edited text is active. Test a normal request, missing input, and conflicting source text.

Natural-language rules guide behavior; workspace permissions, employee credential grants, tool authorization, and approvals enforce access. A prompt saying “read only” is not a substitute for selecting tools and credentials appropriate to that task.

## Related guides

- [Employee definition](/build/employee-definition/)
- [Skills and plugins](/build/skills-plugins/)
- [Hooks and subagents](/build/hooks-subagents/)
