---
title: "Employee definition"
description: "Define a digital employee with explicit responsibilities, inputs, outputs, and a reusable entry skill."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

An employee definition turns a reusable agent package into a job that people can understand and delegate to. Start with one bounded outcome: for example, prepare a research brief from materials supplied by the user.

## Before you begin

This guide is for Builders and FDEs maintaining employee packages. Workspace users create an employee from a published template; they do not upload this YAML in the employee creation flow. Start with [AI employees](/user-guide/ai-employees/) if you want to use an existing employee.

## Package structure

```text
research-assistant/
├── .claude-plugin/plugin.json
├── .aiworkforce/employee.yaml
├── .aiworkforce/router.md
├── README.md
└── skills/main/SKILL.md
```

`plugin.json` provides package metadata, including a name. `employee.yaml` describes the role. `router.md` points to the single entry skill and explains how to handle missing inputs or requests outside the role. The README explains usage.

## Describe the job

The following example uses supported manifest fields:

```yaml
id: research-assistant
name: Research assistant
version: "0.1.0"
description: Prepare a research brief from supplied materials.
author: documentation-team
entry_skill: main
use_cases:
  - Prepare for a research discussion
responsibilities:
  - Summarize supplied materials with source references
non_responsibilities:
  - Publish or send material externally
required_inputs:
  - research_materials
optional_inputs:
  - research_question
outputs:
  - id: research_brief
    description: Findings, source references, and open questions
constraints:
  - Ask for missing materials before drawing conclusions
```

Use a kebab-case `id`. Keep responsibilities and exclusions distinct. `entry_skill: main` must correspond to `skills/main/SKILL.md`; the router must identify that same entry skill.

`mcp_servers`, when present, is a list of `name` and `description` entries describing intended services. It does not contain connection credentials or grant access.

## Validate and try the role

Use **Validate** in the employee builder before **Submit build**. Resolve missing files, missing manifest fields, unknown skill references, and conflicting boundaries. Then try a normal request, a request with missing inputs, and a request outside the role. Inspect the resulting brief and its sources.

A valid package is a structural check, not proof of task quality. Written constraints describe behavior; actual access also depends on tools, credentials, and runtime authorization. After publication, create a workspace instance from the template and confirm the applied capabilities.

## Related guides

- [Skills and plugins](/build/skills-plugins/)
- [MCP integration](/build/mcp-integration/)
- [Artifacts and evidence](/user-guide/artifacts-evidence/)
