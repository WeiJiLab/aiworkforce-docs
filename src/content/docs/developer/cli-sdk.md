---
title: "Interface overview"
description: "Choose HTTP, Automation MCP, the device executor, or a client you generate. Each interface has one home page."
sidebar:
  label: Interface overview
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Choose an interface based on where the work should run and what authority the caller needs. The platform's HTTP API, its Automation MCP server, and the device daemon solve different integration problems.

## Interface matrix

| Interface       | Use it for                                                        | Boundary                                                                          |
| --------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Platform HTTP   | Manage accessible resources or invoke a registered Automation     | Management login and machine invocation use different credentials.                |
| Automation MCP  | Let a compatible agent discover and call allowed Jobs             | Tools expose registered work, not arbitrary runtime configuration.                |
| Device CLI      | Pair and operate an execution computer                            | It runs tools for the platform; it is not a general platform administration CLI.  |
| Platform SDK    | Build an application-specific HTTP client from the current schema | No supported general Python/TypeScript SDK package is specified by this baseline. |
| IDE / ACP / A2A | Connect through a compatible documented transport                 | No bundled IDE extension or general ACP/A2A server is specified by this baseline. |

Do not install an assumed `aiworkforce` npm or pip package based on its name. An internal runtime SDK dependency is also different from an official SDK for users of the platform API.

## Use HTTP from your application

Start with the [REST API](/developer/api-reference/). Retrieve the deployed backend's `/openapi.json`, as described in the [OpenAPI reference](/integrations/openapi/), and keep credentials in your application's existing secret store. Building that client is the [SDK](/integrations/sdk/) guide. There is no supported general Python or TypeScript SDK package.

Your client should set the expected Bearer token, validate the response envelope, preserve an idempotency key while retrying one invocation, and poll asynchronous run status. Log the run ID and outcome instead of the secret or entire sensitive input. A small client around these operations is often sufficient; code generation should be reviewed against the deployed schema.

## Use a compatible MCP client

An administrator can expose the platform's Streamable HTTP MCP endpoint at `/mcp` with its permitted hosts and origins configured. Discover tools instead of inventing names: the server exposes eligible registered Job tools, plus `automation_get_run` and `automation_cancel_run` when the credential's scopes allow them.

Invocation supplies the Job's `input` and an `idempotency_key`. It returns an asynchronous run handle, which the client must inspect. Token expiry, revocation, Job allowlist, and current authorization are rechecked; an established transport does not permanently grant access.

## Operate a device

The only device CLI is [Device Executor CLI](/integrations/cli/). That page owns install, pairing, headless use, service definitions, and recovery. This overview does not repeat those commands.

## Related guides

- [Device Executor CLI](/integrations/cli/)
- [SDK](/integrations/sdk/)
- [OpenAPI reference](/integrations/openapi/)
- [Agent protocol](/integrations/agent-protocol/)
- [Integration overview](/integrations/overview/)
- [Runtime management](/deployment/runtime-environments/)
- [Security and permissions](/deployment/security/)
