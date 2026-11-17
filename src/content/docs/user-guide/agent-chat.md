---
title: "Agent Chat"
description: "Give an employee clear instructions, maintain useful context, and review its responses."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Agent Chat is where you give an employee work and discuss the result. A session keeps the conversation and its associated work together so you can continue refining a task without restating every decision.

## Start a useful session

Choose a ready employee in the correct workspace. Start with a goal that matches its responsibility. Provide the input, desired output, constraints, and acceptance criteria in the same request.

For example, ask for a summary grounded in supplied text, a set of open questions, or a proposed implementation plan. Explain whether the employee should only investigate or may also modify files. An instruction to perform an action does not grant missing connection permissions.

## Keep context focused

Continue the same session when correcting an omission or clarifying the current task. Quote the specific requirement that needs revision and explain how you will judge the next result.

Start a new session when the objective or working context changes substantially. A conversation containing several unrelated projects is harder to review, especially when files and execution traces are associated with it.

## Review during and after execution

Read the employee's progress and final response. If the work produces files, open them in the artifact area. For code work, compare the changed files and inspect the verification evidence before deciding that a requirement has been met.

Ask the employee to distinguish completed actions from proposed next steps. A statement that a test should be run is different from a recorded test result. Likewise, a link to a pull request should be opened and checked before you rely on its description.

## Recover from an incomplete result

If the employee lacks input, supply the missing material in the session. If a connection is unavailable, ask the workspace manager to check configuration and authorization. If execution fails, inspect the visible error before repeating the request; a repeated instruction will not fix an unavailable runtime.

A successful session ends with a result that matches the acceptance criteria, supporting evidence that you can inspect, and a clear human decision about the next action.

Continue with [artifacts and evidence](/user-guide/artifacts-evidence/) and [inbox and tasks](/user-guide/inbox-tasks/).
