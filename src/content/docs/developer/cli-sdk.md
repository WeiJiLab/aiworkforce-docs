---
title: "CLI, SDK, and protocol access"
description: "Use the interfaces that exist today: HTTP, Automation MCP, and the device execution client."
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

Start with the [API reference](/developer/api-reference/). Retrieve the deployed backend's `/openapi.json`, select only the endpoints your application needs, and keep credentials in your application's existing secret store.

Your client should set the expected Bearer token, validate the response envelope, preserve an idempotency key while retrying one invocation, and poll asynchronous run status. Log the run ID and outcome instead of the secret or entire sensitive input. A small client around these operations is often sufficient; code generation should be reviewed against the deployed schema.

## Use a compatible MCP client

An administrator can expose the platform's Streamable HTTP MCP endpoint at `/mcp` with its permitted hosts and origins configured. Discover tools instead of inventing names: the server exposes eligible registered Job tools, plus `automation_get_run` and `automation_cancel_run` when the credential's scopes allow them.

Invocation supplies the Job's `input` and an `idempotency_key`. It returns an asynchronous run handle, which the client must inspect. Token expiry, revocation, Job allowlist, and current authorization are rechecked; an established transport does not permanently grant access.

## Operate a device worker

The native client is named `aiworkforce-device-exec`. Obtain a compatible binary from your maintainer; release-install automation requires actual published release assets. Developers of the daemon can build it with `cargo build --locked` in its own repository.

```bash
aiworkforce-device-exec connect --workspace /absolute/project/path \
  --platform https://platform.example.org
aiworkforce-device-exec status --json
aiworkforce-device-exec doctor --json
aiworkforce-device-exec stop
```

Replace the platform origin and directory. Pairing asks for trusted host-execution consent and opens a browser authorization flow; `--no-browser` supports headless use. A browser approval is separate from the worker reaching the platform's online execution state.

`start`, `restart`, and `disconnect` manage the connection lifecycle. `service --format launchd` or `service --format systemd` prints a service definition for separate review and installation; connecting does not silently install an OS service. Device commands execute with the host user's permissions, not inside an implied filesystem sandbox.

## Related guides

- [Integration overview](/integrations/overview/)
- [Runtime environments](/deployment/runtime-environments/)
- [Security and data boundaries](/deployment/security/)
