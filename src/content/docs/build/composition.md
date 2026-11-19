---
title: "Agent composition"
description: "Delegate a bounded task to another agent without treating a mention in prose as a real handoff."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

Composition is how one employee delegates part of a task to another agent and still owns the result. The current Agent Package layout supports subagents as `agents/*.md` and hooks as execution extensions. Whether a particular runtime invokes them is something you verify in the trace. Writing the word "subagent" in a skill does not create a delegation.

There is no separate multi-agent product that guarantees a parent, a child, and a shared memory. Use the checks on this page before you describe a workflow as delegated.

## When to split

Split a task when the child has a different input, a smaller scope, and an output the parent can review. Do not split so that two agents repeat the same instructions. Keep the reusable method in a skill. The parent remains accountable for the employee definition's outputs and exclusions.

A person is not a child agent. When the next step needs a human decision, use [human approval](/user-guide/human-approval/) or a delivery-card takeover. [Agent handoff](/automate/agent-handoff/) covers handoff across sessions and runs, which is a different record from an in-process subagent.

## Prove the delegation happened

Try one parent task with a single supported claim, one unsupported claim, and one ambiguous source. Confirm the child returns distinctions the parent uses in the final result. Open the execution trace and look for the actual delegation, not only the final prose.

If the trace shows no child invocation, the parent did the work itself or ignored the instruction. Fix the package or the runtime support before documenting the role as a team of agents. [Hooks and subagents](/build/hooks-subagents/) has the implementation checks for those extension points.

## Keep the boundary

The child inherits no extra permission from being named. Tool grants, repository grants, and MCP authorization stay on the execution employee and the runtime. A child prompt cannot widen them. Record which agent produced which part of the artifact so a reviewer can see the composition instead of one undifferentiated reply.
