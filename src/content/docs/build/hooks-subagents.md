---
title: "Hooks and subagents"
description: "Split specialized work into subagents and understand the runtime-specific boundary of lifecycle hooks."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

Subagents delegate a bounded part of a task to a specialized agent. Hooks run logic at runtime events. Both affect execution, but they serve different purposes: use a subagent for reasoning work with an output to review, and a hook for a deterministic runtime reaction.

## Define a focused subagent

Agent Packages can include subagent documents at `agents/*.md`. The filename is the identity used by package workflow references. For example, create `agents/source-reviewer.md`:

```markdown
---
name: source-reviewer
description: Review whether a research brief's claims have supplied sources.
---

Read the supplied brief and source excerpts.
For each claim, return supported, unsupported, or uncertain,
with the corresponding source reference and a short reason.
Do not fetch additional sources or publish the brief.
```

In the entry skill, explain what material to delegate, what the subagent should return, and how the parent checks that result. Give it the necessary evidence rather than assuming it knows every message in the parent conversation.

The package scanner reads skill and subagent documents and parses supported `awf` workflow fences. Workflow references must identify existing skills or subagents, and a workflow needs one terminal `return`. A displayed workflow graph describes the package; it is not proof that each action has executed successfully.

## Validate the handoff

Try a brief with one supported claim, one unsupported claim, and one ambiguous source. Confirm that the subagent returns distinctions the parent can use. Inspect the execution trace for actual delegation and the parent's final synthesis. Merely mentioning a subagent in prose does not prove a runtime invoked it.

A package subagent is also distinct from a separately created workspace employee. Cross-employee assignment, delivery lane handoff, and a runtime's local subagent invocation have different state and authorization boundaries.

## Understand hook support

Claude Code integrations attach event hooks for platform functions such as tool authorization, repeated-tool-call protection, MCP output redaction, and file-change checkpoints. The runtime also uses its supported user, project, and local settings sources. Imported plugin manifests can carry hook assets, whose syntax and execution depend on the selected runtime version.

There is no general platform Hooks editor that guarantees identical behavior across every runtime. For a plugin hook, review the runtime's supported hook contract, required command, dependencies, working directory, and failure behavior. Test it in an isolated workspace on the runtime used by the employee. Do not copy platform hook internals into a package or assume an installed plugin's hooks are portable to another runtime.

## Pick the right mechanism

| Need                                       | Use                                                |
| ------------------------------------------ | -------------------------------------------------- |
| A repeatable working method                | A Skill.                                           |
| Specialized analysis to return to a parent | A subagent.                                        |
| A scheduled or external event              | An Automation trigger.                             |
| Runtime lifecycle behavior                 | A compatible, reviewed hook.                       |
| A human decision before continuing         | The product's approval or human-intervention flow. |

## Related guides

- [Prompts and rules](/build/prompts-rules/)
- [Skills and plugins](/build/skills-plugins/)
- [Runtime environments](/deployment/runtime-environments/)
