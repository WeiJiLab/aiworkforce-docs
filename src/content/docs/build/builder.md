---
title: Agent builder
description: Iterate a Plugin in a requirement worktree, validate the Agent Package, and submit the build.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Open **Employee builder** (数字员工构建) in the FDE workbench. This screen changes a Plugin. Installing a published template in a workspace is a different screen: [Create your first AI employee from a template](/getting-started/first-employee/).

Use a kebab-case Plugin ID. **New digital employee** starts a Plugin. **New session** associates that ID with a session and keeps existing sessions and requirement files. If the builder is unavailable because it has not been initialized, ask a system administrator to initialize it in **Admin console → Employee marketplace**. Use **Retry initialization** when an initialization step fails.

A ready session talks to the builder agent. The requirement worktree path is shown under the composer. Open the plugin files from the session when a requirement is bound. **Validate** checks package structure. **Submit build** pushes the validated draft to the shared marketplace branch. See [publishing](/build/publishing/) for the effects of submission. What belongs in the package is [Agent definition](/build/employee-definition/), [Agent instructions](/build/prompts-rules/), and [Skills and plugins](/build/skills-plugins/).

Converting a marketplace plugin copies its source into a separate requirement worktree and opens a session so the builder can fill in the employee spec and validate it. Start that conversion from the [standard employee marketplace](/build/market/). After the build, publish to the internal market from [Publishing and distribution](/build/publishing/).
