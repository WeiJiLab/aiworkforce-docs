---
title: "Integration overview"
description: "Choose the connection that matches your task and distinguish platform capabilities from external-client compatibility."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

An integration can make an event arrive, make a resource available, or let an employee call a tool. Start by identifying which of those you need. A successful account connection does not automatically grant every employee access or enable a complete delivery pipeline.

## Capability matrix

| Category               | Current path                                                                        | What to verify                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Code hosting           | GitHub, GitLab, and Yunxiao Codeup connections and repository catalog               | Provider instance, token permissions, repository association, employee authorization.                     |
| Business collaboration | Feishu, DingTalk, Slack, Microsoft Teams, WeCom, and WeChat channel entries         | The provider-specific connection mode, deployed adapter, account binding, and message permissions.        |
| Monitoring             | Sentry Issue events and PagerDuty incident events                                   | Connection identity, webhook verification, selected resources, and an enabled trigger.                    |
| Employee tools         | Configured MCP servers from templates, plugins, and available catalog entries       | Actual instance installation, connection, authorization, and discovered tools.                            |
| External coding agents | Registered Automations exposed through HTTP and the platform's MCP endpoint         | An allowed, active Job, appropriate credential scopes, and asynchronous run handling.                     |
| IDE clients            | Use an IDE's compatible HTTP/MCP client, repository, and code-review workflow       | Client transport/authentication support; no bundled AI Workforce extension is implied.                    |
| Local execution        | Authorize a computer through the device daemon and select it in a session           | Device online state, approved directory, session grant, and runtime support.                              |
| ACP / A2A              | No general public ACP or A2A endpoint is established by this documentation baseline | Use the documented HTTP/MCP contracts rather than treating a protocol name as an implemented integration. |

Messaging entries are not interchangeable. For example, the permissions and delivery behavior of a Teams Workflow differ from a full bot. Use the connection mode actually configured in your deployment.

## Connect one resource first

1. Open **Integrations** and choose the provider category.
2. Create or select the connection in the intended workspace or account scope.
3. Complete the provider's authorization and confirm the external identity.
4. Select the repository, channel, or event resources the task needs.
5. Apply any employee-specific grants or capability configuration.
6. Try a small read or test event and inspect its recorded result.

For business systems that are not native catalog entries, use a compatible MCP service or a registered Automation integration. Confirm that its actual tools support the intended operation; adding a service name to an employee manifest is only descriptive metadata.

## Connect a coding agent

The platform's `/mcp` endpoint exposes registered Automation capabilities to authorized clients; it is different from an employee connecting to an external MCP server, and from the static documentation's Markdown endpoints. A compatible coding agent can discover allowed Jobs, start a run, and inspect its result without becoming a platform administrator.

MCP transport support in an editor does not imply support for every authentication method. Verify the deployed endpoint, permitted host, client headers, and credential type with your administrator. Use [API reference](/developer/api-reference/) when a direct HTTP integration is easier to control.

## Related guides

- [Code repositories](/integrations/code-repositories/)
- [Connect and check employee tools](/integrations/employee-tools/)
- [MCP package integration · Developers](/build/mcp-integration/)
- [Authentication](/developer/authentication/)
