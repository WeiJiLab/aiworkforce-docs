---
title: "MCP integration"
description: "Connect to the platform MCP endpoint and to external MCP servers. Employee dependencies are a different page."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

This page is the protocol and connection guide. How an employee package declares a dependency on a server is [MCP servers](/build/mcp-integration/). The two pages must agree: a manifest entry is a name and a description. It does not contain the endpoint, the secret, or the grant.

## Platform Automation MCP

An administrator can expose the platform's Streamable HTTP MCP endpoint at `/mcp`, with the permitted hosts and origins configured. Discover tools. Do not invent tool names. The server exposes eligible registered Job tools, plus `automation_get_run` and `automation_cancel_run` when the credential's scopes allow them.

Invocation takes the Job `input` and an `idempotency_key`. It returns an asynchronous run handle. Inspect that run. Token expiry, revocation, the Job allowlist, and current authorization are checked again on the request. An open connection is not a permanent grant.

The same Jobs are available over HTTP. Prefer HTTP when you want an application client. Prefer this MCP endpoint when a compatible agent should call registered work. Neither interface edits runtime configuration.

## External MCP servers

Cloud business connections accept HTTP/SSE services. Device tools are mounted through the session's device authorization. A package cannot grant itself a device by naming a path. Editor support for MCP does not imply every authentication method. Verify the deployed endpoint, permitted host, client headers, and credential type.

Keep credentials out of employee YAML, skill text, and chat. If two sources configure the same server name differently, resolve the conflict at the source. Then confirm the instance from [tools and connectors](/integrations/employee-tools/).
