---
title: "MCP integration"
description: "Declare an employee's MCP capabilities and maintain the configuration applied through templates and plugins."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Model Context Protocol (MCP) lets an employee use tools exposed by external services. Discovering a server, configuring it, installing it, and authorizing the external account are separate steps. A server listed in a template is not proof that a tool call will succeed.

## Declare the capability

In an employee definition, `mcp_servers` documents the service's purpose:

```yaml
mcp_servers:
  - name: knowledge-search
    description: Search approved knowledge sources for this role
```

This is descriptive metadata. The actual connection configuration comes from the template, plugin, and platform configuration applied to the employee instance.

## Supply connection configuration

Builders maintain configuration through existing template and plugin management entries. Configuration takes effect after application to the instance. Connection templates may reference values supplied through existing personal configuration; unresolved required values prevent the affected service from becoming available. Keep credentials out of employee YAML, skill text, examples, and chat messages.

Cloud business connections accept HTTP/SSE services. Device tools are mounted through the session's device authorization flow, so a package cannot grant itself device access by declaring a location. Likewise, a manifest's service name grants no external permissions.

If the tool is missing, check that the intended configuration reached the instance. If authorization is required, reconnect the account. If two sources define conflicting configurations under the same server name, resolve the conflict at the source rather than assuming that one will silently win.

## Verify the applied configuration

Apply the template or plugin to a test instance, then follow [Connect and check employee tools in Docs](/integrations/employee-tools/) to inspect the instance, authorize its account, and perform a small read operation. Keep package metadata, installed configuration, and external-account authorization as separate checks.

## Related guides

- [AI employees](/user-guide/ai-employees/)
- [Skills and plugins](/build/skills-plugins/)
- [Platform architecture](/developer/architecture/)
