---
title: "Agent protocol"
description: "The current agent-facing interfaces are HTTP and Automation MCP. ACP and A2A servers are not in this release."
status: planned
sidebar:
  badge:
    text: Planned
    variant: note
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

An agent protocol would be a documented way for an external agent to discover work, call it, and read the result. This baseline does not include a bundled IDE extension or a general ACP or A2A server. Do not implement against an assumed ACP or A2A endpoint on AI Workforce.

## What you can call today

| Interface                | Use it for                                           | Do not use it for                                         |
| ------------------------ | ---------------------------------------------------- | --------------------------------------------------------- |
| HTTP API                 | Invoke a registered Job and read the run             | Assuming every management route is a stable versioned SDK |
| Automation MCP at `/mcp` | Let a compatible agent discover registered Job tools | Changing runtime or employee configuration                |
| Device CLI               | Pair a computer that executes tools                  | Administering the platform                                |

Contracts and examples are in [REST API](/developer/api-reference/), [MCP integration](/integrations/mcp/), and the [interface matrix](/developer/cli-sdk/). Authentication is a Personal Automation Token or the management credential required by that route, not a guessed JWT.

## What remains unprovided

There is no agent-to-agent envelope, no standard task lifecycle beyond the automation run statuses, and no protocol negotiation documented for third-party agents. If a later release adds one, it will be a new page with request and response examples. Until then, integrate with the HTTP or MCP surface above and treat any other protocol name as unsupported.
