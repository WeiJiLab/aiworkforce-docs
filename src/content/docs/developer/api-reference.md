---
title: "API reference"
description: "Use the current management and Automation HTTP endpoints with concrete request examples and asynchronous run handling."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

This reference covers the current core HTTP contracts: signing in, discovering workspace resources, and invoking a registered Automation. Paths are relative to the platform backend. The examples use `http://localhost:8080` for local development; use your deployment's HTTPS origin remotely.

The backend exposes its generated schema at `/openapi.json` with FastAPI's default configuration. Retrieve that schema from the backend you actually run when building a broader client. These routes are implementation contracts, not a promise that every management endpoint has independent version compatibility.

## Management endpoints

Use the login access token described in [Authentication](/developer/authentication/).

| Method and path                        | Purpose                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `POST /api/auth/login`                 | Sign in with JSON `email` and `password`.                                                                    |
| `GET /api/auth/me`                     | Read the authenticated user.                                                                                 |
| `GET /api/workspaces`                  | List accessible workspaces.                                                                                  |
| `GET /api/automations`                 | List Jobs visible through workspace authorization; optional `workspace_id` and `workspace_agent_id` filters. |
| `GET /api/automations/{definition_id}` | Read a Job and its configuration.                                                                            |
| `POST /api/automation-tokens`          | Issue a scoped Personal Automation Token.                                                                    |

For example, discover Jobs in workspace `7` using the actual workspace ID from the first response:

```bash
curl 'http://localhost:8080/api/workspaces' \
  --header 'Authorization: Bearer <LOGIN_ACCESS_TOKEN>'

curl 'http://localhost:8080/api/automations?workspace_id=7' \
  --header 'Authorization: Bearer <LOGIN_ACCESS_TOKEN>'
```

## Issue a machine token

Create and publish the intended Job first. Limit the credential to its real definition ID:

```bash
curl --request POST 'http://localhost:8080/api/automation-tokens' \
  --header 'Authorization: Bearer <LOGIN_ACCESS_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Documentation integration","scopes":["automation:invoke","automation:read"],"allowed_definition_ids":["<DEFINITION_ID>"]}'
```

The response's `data.token` contains the new secret. Normal token listings do not reveal it. Add `automation:cancel` only if the caller needs the cancellation endpoint.

## Start and inspect a run

The external invocation API uses the Personal Automation Token. The Job must have a published version and be active. Its `input` object must match that version's schema; the request cannot override the employee, tools, or task configuration.

```bash
curl --request POST \
  'http://localhost:8080/api/automation/v1/automations/<DEFINITION_ID>/runs' \
  --header 'Authorization: Bearer <PERSONAL_AUTOMATION_TOKEN>' \
  --header 'Content-Type: application/json' \
  --header 'Idempotency-Key: docs-request-001' \
  --data '{"input":{}}'
```

This returns HTTP `202` with the run under `data`, including its `id`, `definition_id`, `version_id`, `status`, and `reused`. Empty input works only when the Job's input schema allows it. `202` acknowledges asynchronous work; inspect its later status and result:

```bash
curl 'http://localhost:8080/api/automation/v1/runs/<RUN_ID>' \
  --header 'Authorization: Bearer <PERSONAL_AUTOMATION_TOKEN>'
```

The run response also includes `output`, `summary`, `error`, and lifecycle timestamps. `GET /api/automation/v1/runs/{run_id}/audit` reads its audit view. With the cancel scope, `POST /api/automation/v1/runs/{run_id}/cancel` requests cancellation; it does not prove the underlying process has already stopped.

## Retries and errors

Reuse the same `Idempotency-Key` for retrying the same request after a lost response. The key is limited to 200 characters and is checked against the credential and request. Reusing it for different input or a different Job is rejected. Generate a new key for deliberately new work.

Successful business responses use `{ "code": 0, "message": "ok", "data": ... }`. Check both the HTTP status and response body. Authentication failures return `401`; permission failures can return `403`; request validation commonly returns `422`. Mapped state conflicts return `409`. Rate limiting returns `429` with `Retry-After`; the current default is 120 machine requests per minute per credential, enforced per backend process and configurable by the deployment. Do not treat a retry as permission to duplicate side effects.

## Related guides

- [Automation fundamentals](/automate/fundamentals/)
- [CLI, SDK, and protocol access](/developer/cli-sdk/)
