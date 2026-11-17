---
title: "Skills and plugins"
description: "Package reusable working methods and understand how they become employee capabilities."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

A **Skill** describes a repeatable way to complete a task. A **Plugin** packages capabilities such as skills and subagents. An employee definition adds the role, boundaries, inputs, and expected outputs that make those capabilities useful as a job.

## Write one useful skill

Create `skills/main/SKILL.md` inside an employee package. The directory name is the skill identity used by the employee manifest and workflow references. Give the skill a clear description and executable instructions:

```markdown
---
name: main
description: Prepare a research brief from materials supplied by the user.
---

## Inputs

Ask for research_materials if none are available.
Use research_question to focus the brief when supplied.

## Method

1. Read the supplied materials.
2. Separate supported findings from assumptions.
3. Cite the source for each finding.
4. List unanswered questions.

## Output

Return a research_brief with findings, references, and open questions.
Do not publish or send it externally.
```

Make the method specific enough to follow and the output easy to inspect. A skill that only says “be helpful” gives the user no stable expectation.

## Compose the package

Employee packages include `.claude-plugin/plugin.json`, `.aiworkforce/employee.yaml`, `.aiworkforce/router.md`, and a README. For example, package metadata can contain:

```json
{
  "name": "research-assistant",
  "version": "0.1.0",
  "description": "Prepare research briefs from supplied materials."
}
```

The employee's `entry_skill` must identify an existing skill. Subagents, when needed, live in `agents/*.md`. Keep reusable methods in skills rather than duplicating the same instructions across several agents.

## Apply and verify

Validate the package in the builder and resolve reported errors before submitting the build. Try the role with representative inputs and check that it produces the promised result. Package validation also detects issues such as missing files and exposed credentials; it does not replace a real task evaluation.

Published templates and enabled packages determine which capabilities can be applied to an employee instance. Open the employee profile and refresh **Methods and capabilities** to inspect the instance's actual skills and tools. Updating a source package does not by itself prove that a running instance has received that update.

If a skill is absent, first check the selected template, package version, and whether the configuration was applied. If the method requires external access, configure and authorize the relevant MCP service separately.

## Related guides

- [Employee definition](/build/employee-definition/)
- [MCP integration](/build/mcp-integration/)
- [Agent chat](/user-guide/agent-chat/)
