---
title: Standard employee marketplace
description: Share a tested role package as an employee template or start a draft from an external plugin.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Open **Standard employee marketplace** (标准数字员工市场). The internal market lists role packages. When the CI diagnosis examples pass, select the tested package and choose **Sync to digital employee template**. A member can then create an employee in the target workspace.

If the list is empty, ask a system administrator to initialize the builder in [Employee marketplace settings](/build/marketplace/). Then refresh or sync the market. You can start a role template draft in the [role template builder](/build/builder/).

**Add external market** (新增外部市场) stores a Git repository URL and branch. Refresh parses `.claude-plugin/marketplace.json`. Plugins can come from a directory, GitHub, or a Git URL. **Build a role template from this plugin** copies the selected plugin into a requirement worktree, opens a builder session, and validates the employee spec from the expectations you give it.

Deleting a market plugin clears its sessions and worktrees, removes the plugin from the main branch, then commits and pushes. Deletion does not prove that a template already installed in a workspace was removed. Template distribution is [Publishing and distribution](/build/publishing/).
