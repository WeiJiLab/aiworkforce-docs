---
title: "Skills"
description: "Create a reusable skill with explicit inputs, a method, and an output a person can check."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

A skill is a reusable method for one kind of task. It is not the employee, and it is not a tool. The employee definition says which skill is the entry point. The skill says how to do that work. Several employees can use the same method only when their responsibilities still match it. Packaging and distribution of the surrounding plugin are covered in [plugins](/build/plugins/) and [skills and plugins](/build/skills-plugins/).

<div id="put-the-skill-in-the-package" aria-hidden="true"></div>

## Add the skill to the Agent Package

Create `skills/main/SKILL.md` for the entry skill. The directory name is the identity used by `entry_skill` and by workflow references. This example matches the research assistant in [agent definition](/build/employee-definition/):

```markdown
---
name: main
description: Prepare a research brief from materials supplied by the user.
---

## Inputs

Ask for research_materials if none are available.
Use research_question to focus the brief when it is supplied.

## Method

1. Read only the supplied materials.
2. Separate supported findings from assumptions.
3. Cite the source for each finding.
4. List questions the materials do not answer.

## Output

Return a research_brief with findings, references, and open questions.
Do not publish or send the brief.

## Stop

If the request is to send, publish, or change an external system, stop and say that work is outside this skill.
```

The method has to be specific enough to follow. An instruction that only says "be helpful" gives the reviewer nothing to compare. Keep credentials and host names out of the skill file.

## Connect it to the role

In `employee.yaml`, `entry_skill: main` must refer to this directory. `router.md` must name the same skill and tell the employee what to do when required inputs are missing. A skill that is not referenced is not the employee's method, even if the file exists.

When a second skill is justified, give it its own directory and a description of the task it owns. Do not copy the same steps into several agents. Subagents, when you need them, live in `agents/*.md` and are covered by [agent composition](/build/composition/).

## Check that the skill is the one that ran

Validate the package before submitting the build. Then try the skill with materials, without materials, and with an out-of-scope request. Open the employee profile after publication and refresh **Methods and capabilities** to see the skills on the instance. A missing skill usually means the template, the package version, or the applied configuration is not the one you edited. Updating the source file does not prove the running instance changed.

If the method needs an external system, that dependency is an [MCP server](/build/mcp-integration/) or a [tool](/build/tools/), configured and authorized separately. The skill may tell the employee when to use it. The skill cannot grant it.

## Related guides

- [Agent definition](/build/employee-definition/)
- [Plugins](/build/plugins/)
- [Employee testing](/build/testing/)
