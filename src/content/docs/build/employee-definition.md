---
title: "Employee definition"
description: "Define a role as responsibility, invocation, capabilities, constraints, and the evaluation that checks them."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

An employee definition turns a package into a job a person can delegate. This is the central page in Build AI employees. The chain below is how a role, a plugin, and an evaluation stay about the same job:

`Role → Responsibility → Invocation scenarios → Capabilities → Constraints → Evaluation`

Workspace users do not upload this file when they create an employee. They select a published template. Start with [Using AI employees](/user-guide/ai-employees/) for that path, and with [employee architecture](/build/architecture/) for the surrounding model.

## Before you begin

Use one bounded outcome. A research assistant that prepares a brief from supplied materials is a complete example. Adding publishing, ticket updates, and code changes to the same role makes the later evaluation meaningless.

## Package structure

```text
research-assistant/
├── .claude-plugin/plugin.json
├── .aiworkforce/employee.yaml
├── .aiworkforce/router.md
├── README.md
└── skills/main/SKILL.md
```

`plugin.json` names the package. `employee.yaml` is the role. `router.md` points at the single entry skill and explains missing inputs or requests outside the role. The README tells a person how to use the employee.

## Write the chain

The fields below are the supported manifest shape for this example.

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

Read the chain against that file:

| Step                 | In this example                                                         |
| -------------------- | ----------------------------------------------------------------------- |
| Role                 | `name` and `description`: prepare a brief, nothing else                 |
| Responsibility       | Summarize supplied materials with sources; do not publish them          |
| Invocation scenarios | `use_cases`: preparing for a research discussion                        |
| Capabilities         | `entry_skill: main`, which must exist at `skills/main/SKILL.md`         |
| Constraints          | Ask for missing materials; `non_responsibilities` exclude external send |
| Evaluation           | A brief a person can check against the supplied sources                 |

Use a kebab-case `id`. Keep responsibilities and exclusions distinct. The router must name the same entry skill. `mcp_servers`, when present, is a list of `name` and `description`. It is not a connection string and it grants nothing. Put the method itself in the skill, not only in this manifest. See [Skills](/build/skills/).

Invocation scenarios are the requests this employee should accept. A scenario that needs a tool or an external service is a capability dependency, not a sentence in the description. If the scenario is "search the approved knowledge source," declare that MCP dependency and configure it separately.

## Validate, then evaluate

Use **Validate** in the employee builder before **Submit build**. Fix missing files, missing fields, unknown skill references, and conflicting boundaries. Validation can also report exposed credentials. A valid package is a structural check.

Then run three requests: a normal brief, a request with no materials, and a request to publish or send the brief. The first should cite sources. The second should ask for materials instead of inventing them. The third should stay inside `non_responsibilities`. Inspect the brief and its sources. This is the evaluation for the role. [Employee testing](/build/testing/) expands the same idea. [Agent evaluation](/software-factory/evaluation/) applies it when the deliverable is a code change.

Written constraints describe behavior. Actual access still depends on tools, credentials, and runtime authorization. After publication, create a workspace instance and confirm the applied capabilities. Changing the template does not prove an existing instance changed. See [publishing](/build/publishing/).

## Related guides

- [Skills and plugins](/build/skills-plugins/)
- [MCP servers](/build/mcp-integration/)
- [Artifacts and evidence](/user-guide/artifacts-evidence/)
