---
title: "Tools"
description: "Distinguish a tool an employee may call from the grant that allows a particular call."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

A tool is an operation the runtime can perform: read a file, call an MCP tool, or record an inbox item. Declaring that a role needs the tool does not allow the call. Authorization is a separate decision on the employee instance, the device, or the external account.

This page is for builders deciding which tools a role should depend on. People checking an existing connection in the product should use [tools and connectors](/integrations/employee-tools/).

## Declare, configure, authorize

| Step      | What it does                                   | What it does not do                       |
| --------- | ---------------------------------------------- | ----------------------------------------- |
| Declare   | Names the tool or MCP server the role expects  | Grant access or store a secret            |
| Configure | Supplies the connection applied to an instance | Prove the external account still works    |
| Authorize | Lets that employee use a credential or device  | Authorize every employee in the workspace |

A skill may say when to call a tool. The wording is not the grant. Select the narrowest tool that completes the responsibility. A research brief does not need a tool that sends mail. A delivery employee that should open a pull request needs a repository grant for that employee, not only a workspace repository connection. See [code repositories](/integrations/code-repositories/).

## Check one call

Apply the Agent Package to a test instance. Inspect the tools on the employee, complete any account connection, and run one read that matches the role. A missing tool means the configuration did not reach the instance, the account is not authorized, or two sources conflict on the same server name. Fix the source. Do not add the secret to the skill file.

Device tools are available only through the session's device authorization. A package cannot grant itself a device by naming a path. Cloud business connections accept HTTP/SSE MCP services. Editor support for MCP does not mean every authentication method works. See [MCP integration](/integrations/mcp/).

Revoking a grant changes later checks. It does not prove a process that already started has stopped. Record that limit when you remove access. [Security and permissions](/deployment/security/) describes the same boundary for operators.
