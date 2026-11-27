---
title: "Provide task context"
description: "Provide task materials, maintain reviewed workspace memory, and distinguish connected sources from model context."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

An employee needs relevant context to produce useful work. AI Workforce currently provides task messages and attachments, project files, workspace memory, and authorized connections. Treat these as distinct sources rather than assuming that every available document is automatically read.

## Choose where information belongs

| Information                              | Suitable place                                              |
| ---------------------------------------- | ----------------------------------------------------------- |
| Instructions for this task               | The current session message.                                |
| A report, screenshot, or source document | A supported attachment or project file.                     |
| A stable team goal or convention         | Reviewed workspace memory.                                  |
| Information maintained by another system | An authorized connection, accessed through available tools. |
| A secret or access credential            | The appropriate credential settings.                        |

For a first attempt, provide a short source text and ask the employee to cite the passages it uses. For file-based work, identify the relevant file names and sections. An uploaded or listed file is not proof that its contents have reached the model.

## Prepare review context for a Plugin App

Before opening Security Review or Code Review, confirm that the employee, repository, PR revision, and architecture decision shown by the workbench match. A security review also needs the target resource scope, sensitive-field handling, and denied path. Test evidence needs the environment, run ID, and revision under test.

Workbench context affects the current app session. After choosing **Add to employee draft**, the employee receives those materials only when you send the next message. Keep durable constraints in reviewed workspace memory, and keep one-off file locations and acceptance criteria in the current session.

## Maintain workspace memory

Open workspace management and select **Memory**. Search by content or filter by type and status. Memory types include goals, constraints, preferences, decisions, terms, and standards.

With management permission, add a concise statement that will remain useful across tasks. Include its scope and relevant conditions: for example, which project a naming rule applies to. Proposed memories require a review decision. Read the full item, edit if necessary, and confirm or reject it. Revoke a confirmed memory when it is no longer valid.

The statuses are **Awaiting confirmation**, **Confirmed**, **Rejected**, and **Revoked**. Rejected and revoked statements should not be treated as current working guidance. A change to memory does not rewrite an earlier answer or undo actions already performed.

## Use connected knowledge deliberately

A connection makes an external capability available only within its configured authorization. Ask the employee to retrieve the relevant source and include a link or excerpt with the result. Verify access using a bounded read before depending on the source in an automation.

This workflow does not promise automatic indexing, synchronization, or exhaustive retrieval across an organization's documents. If your deployment connects a separate knowledge service, follow that service's configuration and inspect the evidence returned.

## Diagnose missing context

Check the workspace, source location, memory status, and employee authorization. Ask which source was actually used. Supply the missing excerpt or a precise file reference, then rerun the smallest relevant part of the task.

After sending the task, see [Track execution progress](/user-guide/sessions-planning/). For workspace and connection settings, see [Workspace](/user-guide/workspace/) and [MCP integration](/build/mcp-integration/).
