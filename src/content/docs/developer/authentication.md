---
title: "Authentication"
description: "Select the correct Bearer credential for management APIs, Automation invocation, and device execution."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

AI Workforce uses different credentials for different callers. Treat tokens as opaque secrets and send the credential expected by the endpoint. A login token, a Personal Automation Token, a provider token, and a device credential are not interchangeable.

## Credential types

| Credential                     | Intended use                                                                   | How it is obtained                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Login access token             | Signed-in management APIs such as workspaces and Job configuration             | `POST /api/auth/login`.                                                                            |
| Personal Automation Token      | Invoke, read, or cancel allowed registered Automations through the machine API | Create through Automation token management or `POST /api/automation-tokens`.                       |
| Platform Personal Access Token | Supported platform identity/MCP/runtime flows                                  | Existing personal access token settings and rotation flow; use only where that flow is documented. |
| Provider credential            | Access GitHub, GitLab, Codeup, or other configured upstream systems            | Workspace credential management or the provider-specific connection flow.                          |
| Device credential              | Authenticate a paired execution computer                                       | Device daemon's private pairing flow.                                                              |

## Sign in and verify identity

The examples use the default local backend address. Replace the address with your deployment's HTTPS origin outside local development. Placeholder values below are not credentials.

```bash
curl --request POST 'http://localhost:8080/api/auth/login' \
  --header 'Content-Type: application/json' \
  --data '{"email":"you@example.org","password":"<YOUR_PASSWORD>"}'
```

A successful response wraps `access_token`, `token_type`, and `user` under `data`, with `code: 0`. Send the returned token as a Bearer value:

```bash
curl 'http://localhost:8080/api/auth/me' \
  --header 'Authorization: Bearer <LOGIN_ACCESS_TOKEN>'
```

Do not infer the token format from a JWT library. The current implementation uses its own signed access-token format. The server checks expiry, the user, and the account credential version. An account requiring a temporary-password change must complete that change before normal management operations.

## Create a scoped machine credential

For external automation, sign in as a user who can operate the target Job, then issue a Personal Automation Token with only the necessary scopes and explicit `allowed_definition_ids`. Supported invocation scopes include `automation:invoke`, `automation:read`, and `automation:cancel`. Add an expiry appropriate to the integration's lifetime.

Creation returns the plaintext token; later list responses return metadata. Store it in the caller's existing secret store. Revocation, expiry, current workspace access, and the Job allowlist are checked again when requests arrive. Giving a caller a Job token does not give it permission to create arbitrary employees or replace the registered execution configuration.

## Recover from rejected access

A `401` means the caller needs a valid credential for that endpoint. Reauthenticate an expired login rather than retrying it indefinitely. A permission or validation response requires checking workspace membership, grants, token scope, allowed Job IDs, and Job state. Provider authorization must be repaired at the provider connection; changing a login token does not fix a revoked repository token.

Keep tokens out of URLs, source control, prompts, screenshots, and shared terminal history. Redact example output before attaching it to an Issue.

## Related guides

- [API reference](/developer/api-reference/)
- [CLI, SDK, and protocol access](/developer/cli-sdk/)
- [Security and data boundaries](/deployment/security/)
