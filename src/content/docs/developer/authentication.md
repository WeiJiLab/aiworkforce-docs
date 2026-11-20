---
title: "Authentication"
description: "Select the correct Bearer credential for management APIs, Automation invocation, and device execution."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
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

For external automation, sign in as a user who can operate the target Job. Use `POST /api/automation-tokens` to choose only the required scopes (`automation:invoke`, `automation:read`, or `automation:cancel`), set the Job IDs in `allowed_definition_ids`, and configure `expires_at`. The general **Tokens** form in Automations grants all three scopes for the selected Jobs and has no expiry field.

Creation returns the plaintext token. Store it in the caller’s secret store. Token validation checks expiry and revocation. Job invocation also checks the caller’s current access to the Job. Run status, audit, and cancellation use the token’s scopes, Job allowlist, and ownership of the existing Run. When removing workspace access, revoke the associated Personal Automation Tokens directly to cut off their access to existing Runs.

## Recover from rejected access

A `401` means the caller needs a valid credential for that endpoint. Reauthenticate an expired login rather than retrying it indefinitely. A permission or validation response requires checking workspace membership, grants, token scope, allowed Job IDs, and Job state. Provider authorization must be repaired at the provider connection; changing a login token does not fix a revoked repository token.

Keep tokens out of URLs, source control, prompts, screenshots, and shared terminal history. Redact example output before attaching it to an Issue.

## Related guides

- [API reference](/developer/api-reference/)
- [CLI, SDK, and protocol access](/developer/cli-sdk/)
- [Security and data boundaries](/deployment/security/)
