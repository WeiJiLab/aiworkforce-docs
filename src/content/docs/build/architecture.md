---
title: "Employee architecture"
description: "See what an AI employee is made of, from role and instructions through capabilities, execution, governance, and deliverables."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

An AI employee is a versioned bundle of responsibility and capability, placed into a runtime that can act, and governed by permissions and evidence. The bundle is not the chat transcript, and the chat transcript is not proof that the bundle is correct.

Builders use this model when they define a role. Users meet the same model as a workspace employee created from a published template. They do not edit this package in the creation flow.

## The employee model

| Part                        | What it contains                                          | Where it lives today                                     |
| --------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| Identity and responsibility | Role, goals, scope, invocation rules                      | `employee.yaml` and `router.md`                          |
| Instructions                | Policies, task context, and what the session may remember | Role instructions, the current request, runtime guidance |
| Capabilities                | Skills, plugins, tools, MCP dependencies                  | `skills/`, plugin metadata, tool grants, `mcp_servers`   |
| Execution                   | Runtime, sessions, handoff                                | Workspace session and the configured runtime or device   |
| Governance                  | Permissions, evaluation, evidence                         | Grants, package validation, reviewed outputs             |
| Deliverables                | Tasks, artifacts, reports, actions                        | Inbox items, files, and delivery records                 |

These parts are composed. A skill without a responsibility is a method with no job. A responsibility without a tool grant is an intention. An execution without evidence is a conversation.

## Identity and responsibility

The role names one job. Goals say what a useful result is. Scope says which inputs and systems the job may touch. Invocation rules say when this employee should be chosen and when the request belongs somewhere else.

That chain is the spine of [employee definition](/build/employee-definition/):

`Role → Responsibility → Invocation scenarios → Capabilities → Constraints → Evaluation`

A research assistant that summarizes supplied materials is a different employee from one that publishes those materials. Write the exclusion in the role, not only in a later prompt.

## Instructions

Instructions have layers. Stable policy belongs to the role. The current goal, files, and acceptance criteria belong to the session. Memory, where the workspace keeps it, is reviewed context rather than a hidden second instruction file. [Agent instructions](/build/prompts-rules/) explains which layer to edit. Natural-language policy does not grant access.

## Capabilities

| Capability | Role in the employee                                |
| ---------- | --------------------------------------------------- |
| Skill      | A reusable method with inputs, steps, and an output |
| Plugin     | A package of skills and related agents              |
| Tool       | An operation the runtime is allowed to perform      |
| MCP server | An external service the role expects to call        |

`mcp_servers` in the manifest is a name and a description. Connection configuration, installation, and account authorization are separate steps, documented for builders in [MCP servers](/build/mcp-integration/) and for operators in [MCP integration](/integrations/mcp/). Do not put credentials in the package.

[Skills](/build/skills/) and [plugins](/build/plugins/) show the package layout. [Tools](/build/tools/) separates a declared tool from a granted one.

## Execution

A published template becomes a workspace instance. The instance must finish initialization before a session starts. A session holds the conversation and the execution context, including the capabilities prepared for that run. The platform keeps the model loop. Tools run in the configured runtime, which may be platform execution or an authorized device. See [runtime management](/deployment/runtime-environments/).

[Agent composition](/build/composition/) covers parent and child agents. Mentioning a subagent in prose does not prove the runtime invoked one. Handoff back to a person is [human approval](/user-guide/human-approval/), not another hidden agent.

## Governance and deliverables

Package validation checks structure: required files, manifest fields, skill references, and exposed credentials. It does not prove the employee does the job well. [Employee testing](/build/testing/) is how you try the normal case, the missing input, and the out-of-scope request. [Publishing](/build/publishing/) puts a reviewed package where a workspace can create an instance. Updating the source package does not prove an existing instance received the change.

Deliverables are what a person reviews: a task, an artifact, a report, or an action that still needs approval. Evidence is the support for those deliverables. Evaluation compares the result with the responsibility and the acceptance criteria. [Agent evaluation](/software-factory/evaluation/) is that comparison for engineering work. The same idea applies to any employee, using the checks you can actually run.

## A minimal example

```text
research-assistant/
├── .claude-plugin/plugin.json
├── .aiworkforce/employee.yaml
├── .aiworkforce/router.md
├── README.md
└── skills/main/SKILL.md
```

`employee.yaml` carries the role. `router.md` points at `skills/main/SKILL.md` and says what to do when inputs are missing or the request is outside the role. The skill describes the method. The plugin file names the package. None of these files authorize a repository or an external account.

## Related guides

- [Employee definition](/build/employee-definition/)
- [Templates](/build/templates/)
- [Using AI employees](/user-guide/ai-employees/)
