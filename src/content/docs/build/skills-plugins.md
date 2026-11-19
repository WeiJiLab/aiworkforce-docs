---
title: "Capabilities overview"
description: "See how skills, plugins, tools, and MCP dependencies divide one Agent Package."
sidebar:
  label: Capabilities overview
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

This page maps the capability pages. It does not replace them. Write the method in [Skills](/build/skills/). Package it in [Plugins](/build/plugins/). Decide what may run in [Tools](/build/tools/). Declare the external service the role expects in [MCP dependencies](/build/mcp-integration/). Connection setup for that service is [MCP integration](/integrations/mcp/), not a second copy of this page.

| Page                  | Owns                                               | Does not own                              |
| --------------------- | -------------------------------------------------- | ----------------------------------------- |
| Capabilities overview | How the pieces fit in one package                  | A second copy of the skill or plugin file |
| Skills                | `SKILL.md`: inputs, method, output                 | Publication and grants                    |
| Plugins               | Package metadata, version, and application         | The steps of the method                   |
| Tools                 | The difference between a declared tool and a grant | MCP transport and authentication          |
| MCP dependencies      | The server name the role expects                   | The endpoint, credential, and client      |

A **Skill** is a reusable method. A **Plugin** packages skills and related agents. The [agent definition](/build/employee-definition/) adds the role, boundaries, inputs, and outputs. The research-assistant files live in those guides. Validate the package, then open the instance and refresh **Methods and capabilities**. A valid package is not proof the running instance received it, and a server name in the manifest is not a connection.

## Related guides

- [Employee architecture](/build/architecture/)
- [Skills](/build/skills/)
- [Plugins](/build/plugins/)
- [MCP dependencies](/build/mcp-integration/)
