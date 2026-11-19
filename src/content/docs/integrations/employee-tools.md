---
title: "Tools and connectors"
description: "Select available MCP tools, authorize the external account, and check the employee's connection."
sidebar:
  label: External connectors
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

An employee can use tools exposed by a configured MCP service. Use this guide when choosing or checking an existing connection in the product. Builders who declare the dependency on an Agent Package should use [MCP servers](/build/mcp-integration/). Operators who configure the protocol endpoint should use [MCP integration](/integrations/mcp/).

## Choose the capability

Browse the MCP catalog from **Integrations**, or review the tools offered during employee creation. Published templates may already include MCP services. Additional available services can be selected in the creation flow. The platform Feishu MCP follows its managed connection and authorization flow; do not put custom credentials into that managed service.

## Verify the instance

1. Open the employee profile in its workspace.
2. Open **Methods and capabilities** and refresh the catalog.
3. Find the MCP entry and inspect its installation, source, and available tools.
4. Check its connection where the action is available. Complete the indicated authorization if needed.
5. Start a session and try a small read operation against a resource that the account is allowed to access.

The profile distinguishes a configured service from an installed service, and an unconfirmed connection from a connected one. An expired or missing check is not a blanket ban on assigning work; use the diagnostics to investigate the capability the task needs.

## Diagnose a missing tool

If a tool is absent, check that the employee actually received the intended template or plugin configuration. When authorization is required, complete or reconnect the external account. A catalog listing and a successful connection check do not grant access to every external resource; verify the account's permissions too.

Try a small read operation before assigning a task that writes to another system. Keep the session and tool result so you can show what succeeded or failed. Give the template maintainer the server name and error context when the configuration itself needs correction.

## Related guides

- [Integration directory](/integrations/overview/)
- [AI employees](/user-guide/ai-employees/)
- [MCP dependencies in an Agent Package](/build/mcp-integration/)
