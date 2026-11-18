---
title: "SDK"
description: "Build a small HTTP client from the deployed OpenAPI schema. No general platform SDK package is published."
status: limited
sidebar:
  badge:
    text: Limited
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

There is no supported general Python or TypeScript SDK package for the platform API in this baseline. Do not install an `aiworkforce` package because the name looks plausible. An internal runtime dependency is not a public SDK.

## Build the client you need

1. Retrieve `/openapi.json` from the backend you actually run. See [OpenAPI reference](/integrations/openapi/).
2. Select only the operations your application calls. Start with sign-in or a Personal Automation Token, Job invocation, and run status. The worked examples are in [REST API](/developer/api-reference/).
3. Send the expected Bearer token. Validate the `{ "code": 0, "message": "ok", "data": ... }` envelope and the HTTP status.
4. Reuse one idempotency key while retrying the same invocation. Poll the run. Log the run id and the outcome, not the secret or the full sensitive input.
5. Review any generated code against that deployed schema before you ship it.

Keep the token in the application's existing secret store. A client that could call a Job last week must still be rejected when the token expires, is revoked, or loses that Job on its allowlist.

## What not to generate

Do not generate wrappers for routes you have not read. Management login and machine invocation use different credentials. Device execution is the [CLI](/integrations/cli/), not this HTTP client. The comparison is the [interface matrix](/developer/cli-sdk/).
