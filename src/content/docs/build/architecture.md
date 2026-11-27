---
title: "Employee architecture"
description: "Map a professional digital employee from role and mission through skills, knowledge, tools, workflow, permissions, evaluation, and lifecycle."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-27"
---

A digital employee is a versioned professional capability placed in a runtime that can act. It has a defined role and mission, the skills and knowledge needed for that work, tools and workflow rules, explicit permissions, and a way to evaluate the result. Evidence from execution lets a team decide whether the work can continue.

Builders use this model when they define a role. Users meet the same model as a workspace employee created from a published template. The creation flow configures an instance. It does not replace the source package.

## The employee model

| Product concept      | What it answers                                                      | Where it is represented today                            |
| -------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| Role                 | What professional responsibility does this employee hold?            | `employee.yaml` and `router.md`                          |
| Mission              | What result is the employee accountable for?                         | Role goals, task contract, and acceptance criteria       |
| Skill                | What repeatable method does it apply?                                | `skills/` and referenced instructions                    |
| Knowledge and memory | What project and organizational context may it use?                  | Project files, workspace context, and reviewed memory    |
| Tools                | Which operations can it call?                                        | Plugin metadata, tool declarations, and MCP dependencies |
| Workflow             | In which sequence and handoff does it work?                          | Session flow, collaboration template, and delivery board |
| Trigger              | What starts a run?                                                   | A person, event, schedule, or delivery lane              |
| Permission           | Which resources and actions are authorized?                          | Workspace grants, connections, and runtime identity      |
| Evaluation           | How does a person know the result is good?                           | Tests, review findings, quality gates, and evidence      |
| Lifecycle            | How is the employee built, published, used, evaluated, and improved? | Builder, template, instance, run, and revision records   |

These parts are composed. A skill without a role is a method with no job. A role without a tool grant is an intention. A workflow without an acceptance criterion has no clear finish. An execution without evidence is a conversation.

## Role and mission

The role names one professional responsibility. The mission says what a useful result is. Scope says which inputs and systems the job may touch. Invocation rules say when this employee should be chosen and when the request belongs somewhere else.

That chain is the spine of [agent definition](/build/employee-definition/):

`Role → Mission → Skills and knowledge → Tools and workflow → Permissions → Evaluation`

A research assistant that summarizes supplied materials is a different employee from one that publishes those materials. Write the exclusion in the role and mission, then enforce the boundary with grants and review gates.

## Skills, knowledge, and memory

Skills describe repeatable methods with inputs, steps, and outputs. Knowledge provides the project and organizational context needed to apply those methods. Memory is context that the workspace keeps and can review. It is not a hidden second instruction file.

Stable policy belongs to the role. The current goal, files, and acceptance criteria belong to the session. [Agent instructions](/build/prompts-rules/) explains which layer to edit. Natural-language policy does not grant access.

## Tools, workflow, and triggers

A tool is an operation the runtime is allowed to perform. An MCP server is an external service the role expects to call. A workflow describes the sequence, handoff, and human decisions around the work. A trigger starts a run from a person, event, schedule, or delivery lane.

`mcp_servers` in the manifest is a name and a description. Connection configuration, installation, account authorization, and runtime placement are separate steps, documented for builders in [MCP servers](/build/mcp-integration/) and for operators in [MCP integration](/integrations/mcp/). Do not put credentials in the package.

[Skills](/build/skills/) and [plugins](/build/plugins/) show the package layout. [Tools](/build/tools/) separates a declared tool from a granted one.

## Permissions and execution

A published template becomes a workspace instance. The instance must finish initialization before a session starts. A session holds the conversation and execution context, including the capabilities prepared for that run. Tools run in the configured runtime, which may be platform execution or an authorized device. Workspace grants and the runtime identity determine what the employee can actually access. See [runtime management](/deployment/runtime-environments/) and [security and permissions](/deployment/security/).

[Agent composition](/build/composition/) covers parent and child agents. Mentioning a subagent in prose does not prove the runtime invoked one. Handoff back to a person is [human approval](/user-guide/human-approval/), not another hidden agent.

## Evaluation and lifecycle

Package validation checks structure: required files, manifest fields, skill references, and exposed credentials. It does not prove the employee does the job well. [Employee testing](/build/testing/) tries the normal case, missing input, and out-of-scope request. [Publishing](/build/publishing/) puts a reviewed package where a workspace can create an instance.

Evaluation continues after publishing. Keep representative cases, rerun them when the role, skill, knowledge, grant, or model route changes, and inspect the evidence against the mission and acceptance criteria. [Agent evaluation](/software-factory/evaluation/) provides the engineering delivery checks. Platform governance adds access, audit, cost, and quality controls.

The lifecycle is:

```text
Define → Validate → Publish → Instantiate → Run → Review → Improve
```

Updating the source package does not prove an existing instance received the change. A new revision should be tested and published, and the affected instance or workflow should be checked again.

## Deliverables and evidence

Deliverables are what a person reviews: a task, an artifact, a report, or an action that still needs approval. Evidence is the support for those deliverables. The expert workbench exposes review findings, test evidence, and security evidence. The delivery board carries those records between stages. A confident final message does not replace a reproducible result.

## A minimal example

```text
research-assistant/
├── .claude-plugin/plugin.json
├── .aiworkforce/employee.yaml
├── .aiworkforce/router.md
├── README.md
└── skills/main/SKILL.md
```

`employee.yaml` carries the role and mission. `router.md` points at `skills/main/SKILL.md` and says what to do when inputs are missing or the request is outside the role. The skill describes the method. The plugin file names the package. None of these files authorize a repository or an external account.

## Related guides

- [Agent definition](/build/employee-definition/)
- [Templates](/build/templates/)
- [Managed agents and digital employees](/user-guide/ai-employees/)
- [Agent evaluation](/software-factory/evaluation/)
