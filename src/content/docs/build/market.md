---
title: Standard employee marketplace
description: Sync internal digital employees, or convert a plugin from an external Claude Code marketplace into a build.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Open **Standard employee marketplace** (标准数字员工市场). It lists internal digital employees, and it can read an external Claude Code plugin market.

If the list is empty, initialize and pull the repository on [Employee marketplace settings](/build/marketplace/), or sync the market. You can also start a new Plugin id in the [employee builder](/build/builder/).

**Add external market** (新增外部市场) stores a Git repository URL and branch. Refresh parses `.claude-plugin/marketplace.json`. Plugins can come from a directory, GitHub, or a Git URL. **Convert to digital employee** (转换为数字员工) copies the selected plugin into a requirement worktree, opens a builder session, and validates the employee spec from the expectations you give it.

Deleting an employee clears that plugin's sessions and worktrees, removes the plugin from the main branch, then commits and pushes. Deletion does not prove that a template already installed in a workspace was removed. Template distribution is [Publishing and distribution](/build/publishing/).
