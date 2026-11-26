---
title: "Use the expert workbench"
description: "Open a session, give a digital employee a clear task, and follow up in the same conversation."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Use the expert workbench to work with a digital employee on a specific task, such as clarifying requirements, reviewing code, or verifying test results. In the workspace sidebar, select a ready employee and open a session. Send a task with the intended result and how you will check it. If your workspace has no suitable employee, follow [Create a digital employee](/getting-started/first-employee/).

## Start a useful session

Choose a goal that matches the employee’s role. Include the desired output, constraints, and acceptance criteria in the same request. Attach or point to the source material the task needs. See [Provide task context](/user-guide/knowledge-context/).

For example, ask for a summary grounded in supplied text, a set of open questions, or a proposed implementation plan. Explain whether the employee should only investigate or may also modify files. An instruction to perform an action does not grant missing connection permissions.

Before sending, check the session’s [permission mode](/user-guide/sessions-planning/#choose-an-execution-boundary).

## Keep context focused

Continue the same session when correcting an omission or clarifying the current task. Quote the specific requirement that needs revision and explain how you will judge the next result. Use the employee’s session history to find earlier work and pin a session you return to often.

Start a new session when the objective or working context changes substantially. A conversation containing several unrelated projects is harder to review, especially when files and execution traces are associated with it.

## Review during and after execution

After sending the task, follow the session status and any tool activity. When the employee returns a result, check it against the original request. See [Track execution progress](/user-guide/sessions-planning/) and [Review results and artifacts](/user-guide/artifacts-evidence/).

## Recover from an incomplete result

If the employee lacks input, supply the missing material in the session. If a connection is unavailable, ask the workspace creator, a team leader, or an administrator to check the grant. See [Teams and access](/administration/teams-access/). If execution fails, inspect the visible error before repeating the request; a repeated instruction will not fix an unavailable runtime.
