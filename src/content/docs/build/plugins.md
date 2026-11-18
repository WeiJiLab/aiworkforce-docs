---
title: "Plugins"
description: "Package skills and related agents so a role can be versioned, validated, and applied to an employee instance."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A plugin is the package around a role. A skill is one method inside it. An employee definition gives that package a job, boundaries, and an entry skill. Users do not install this package from the employee creation screen. They receive it when a published template or an enabled package is applied to a workspace instance.

## Package metadata

Employee packages include `.claude-plugin/plugin.json`, `.aiworkforce/employee.yaml`, `.aiworkforce/router.md`, a README, and `skills/`. A minimal plugin file:

```json
{
  "name": "research-assistant",
  "version": "0.1.0",
  "description": "Prepare research briefs from supplied materials."
}
```

The `name` identifies the package. The employee `id` should stay recognizable next to it. Version the package when behavior changes. A version string in the file does not by itself update employees already created from an older template.

## What belongs in the plugin

Put reusable methods in [skills](/build/skills/). Put the role chain in [employee definition](/build/employee-definition/). Put subagents in `agents/*.md` only when a parent agent must delegate a bounded task. See [agent composition](/build/composition/).

Connection names may be documented as MCP dependencies. Credentials, tokens, and host secrets do not belong in the plugin. Applying a plugin does not authorize an external account. [Tools](/build/tools/) and [MCP servers](/build/mcp-integration/) cover that gap.

## Apply and check

Validate the package in the builder, then submit the build. Resolve missing files and exposed credentials before you treat the package as publishable. After publication, create or refresh a workspace instance and open **Methods and capabilities**. The instance shows the skills and tools that were actually applied.

If two packages define the same server name with different configuration, fix the conflict at the source. Do not assume one silently wins. [Publishing and distribution](/build/publishing/) explains how a validated package becomes a template a workspace can use.

The combined overview remains [skills and plugins](/build/skills-plugins/).
