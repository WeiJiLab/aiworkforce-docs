---
title: Employee builder
description: Iterate a Plugin in a requirement worktree, validate the package, and submit the build.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Open **Employee builder** (数字员工构建) in the FDE workbench. This screen changes a Plugin. Installing a published template in a workspace is a different screen: [Build your first AI employee](/getting-started/first-employee/).

The builder needs a kebab-case plugin id. **New digital employee** (新建数字员工) starts one. **New session** (新建会话) writes that id into a session and updates the builder while keeping existing sessions and requirement files. If the builder is not initialized, initialize it on [Employee marketplace settings](/fde/marketplace/) first. When initialization fails, use **Retry initialization** (重试初始化). A plugin id that is not kebab-case is rejected.

A ready session talks to the builder agent. The requirement worktree path is shown under the composer. Open the plugin files from the session when a requirement is bound. **Validate** checks package structure. **Submit build** submits that build. What belongs in the package is [Employee definition](/build/employee-definition/), [Agent instructions](/build/prompts-rules/), and [Skills and plugins](/build/skills-plugins/).

Converting a marketplace plugin copies its source into a separate requirement worktree and opens a session so the builder can fill in the employee spec and validate it. Start that conversion from the [standard employee marketplace](/fde/market/). After the build, publish to the internal market from [Publishing and distribution](/build/publishing/).
