---
title: "Expert workbench overview"
description: "Choose a digital employee and a workbench for a specialist task, then review its output and evidence."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-26"
---

Use the expert workbench when a digital employee can help you produce or review a specific engineering artifact. Start from a workspace employee’s session. If the workspace has installed a plugin with a dedicated interface, you can also open it from **Custom workbenches** in workspace management. The available apps depend on the employees, plugins, and permissions in that workspace.

| Task                           | What you provide                                    | What you review                                          |
| ------------------------------ | --------------------------------------------------- | -------------------------------------------------------- |
| Requirements and specification | A request, its constraints, and examples            | The scope, unresolved questions, and acceptance criteria |
| Code review                    | A PR or changed files and agreed criteria           | Findings with file references and suggested changes      |
| Test design and verification   | The criteria, target revision, and test environment | Test cases, observed results, and remaining gaps         |

Try all three tasks in the [data export permissions example](/getting-started/expert-workbench-example/).

## Choose where to start

1. **Start a session.** In the workspace sidebar, select a ready employee whose role matches the task. Give it the input, requested output, and acceptance criteria. [Assign tasks and follow sessions](/user-guide/agent-chat/).
2. **Open a custom interface.** In the target workspace, open **Custom workbenches** and choose an installed app. For example, a plugin can display a repository’s documents or a report alongside the relevant employee conversation. [See how Plugin Apps are packaged and exposed](/developer/plugin-apps/).
3. **Review the outcome.** Check the source, revision, and evidence against the criteria. Ask for a focused revision or record the human approval when the evidence is sufficient. [Review results and artifacts](/user-guide/artifacts-evidence/).

## Hand off through the delivery workbench

When several people or employees need to advance the same change, attach the confirmed specification, PR, and test evidence to the relevant delivery card. The delivery workbench tracks assignment, handoff, and acceptance across roles. [Deliver an issue on an existing board](/getting-started/quickstart/).
