---
title: "MCP integration"
description: "Connect to the platform MCP endpoint and to external MCP servers. Employee dependencies are a different page."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

This page is the service integration: the platform MCP endpoint and external MCP servers. How an Agent Package names a dependency is [MCP dependencies](/build/mcp-integration/). The two pages must agree: a manifest entry is a name and a description. It does not contain the endpoint, the secret, or the grant.

## Platform Automation MCP

An administrator configures permitted hosts and origins for the Streamable HTTP MCP endpoint at `/mcp`. Use a Personal Automation Token to discover and invoke Job tools. The platform PAT authenticates a platform identity and carries no Automation scopes. The tools `automation_get_run` and `automation_cancel_run` require the relevant read or cancel scope.

Use a tool name returned by discovery for your credential. Discovery and invocation apply separate access checks for shared workspace Jobs. Verify access by testing an approved input. Invocation accepts the Job `input` and an `idempotency_key` and returns an asynchronous Run handle. See [authentication](/developer/authentication/) for the access and revocation rules on existing Runs.

To integrate a shared Job that is missing from discovery, check the Job’s publication state, workspace access, and token allowlist. The [REST API](/developer/api-reference/) also accepts an authorized Job’s definition ID.

## External MCP servers

Cloud business connections accept HTTP/SSE services. Device tools are mounted through the session's device authorization. A package cannot grant itself a device by naming a path. Editor support for MCP does not imply every authentication method. Verify the deployed endpoint, permitted host, client headers, and credential type.

Keep credentials out of employee YAML, skill text, and chat. If two sources configure the same server name differently, resolve the conflict at the source. Then confirm the instance from [tools and connectors](/integrations/employee-tools/). Named product connections are listed in the [integration directory](/integrations/overview/).
