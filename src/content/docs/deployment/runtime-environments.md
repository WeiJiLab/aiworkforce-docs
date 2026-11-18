---
title: "Runtime management"
description: "Choose between platform execution, a self-hosted deployment, and an authorized device worker."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

The platform controls the employee's conversation, model loop, task state, and authorization. The execution environment determines where tools operate. Hosting the platform yourself, choosing a runtime kernel, and selecting a device are related choices, but none automatically supplies the other two.

## Environment choices

| Environment              | What runs there                                                             | Preparation                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Operator-hosted platform | Web application, backend, database, and configured cloud execution          | An account, workspace access, ready employees, and enabled provider connections.                                           |
| Self-hosted platform     | The same service stack under your organization's operation                  | Application images/source, PostgreSQL, persistent workspace storage, runtime/model configuration, networking, and backups. |
| Local development stack  | Source-mounted frontend/backend and local Docker volumes                    | Docker Engine/Desktop and Compose v2; use the platform repository's existing local configuration.                          |
| Authorized device        | Tool processes on an approved computer; the platform retains the model loop | Compatible daemon, explicit host execution consent, browser pairing, and session selection.                                |

The runtime enum includes several kernel names. A listed name is not proof of a working deployment: the main session registry in this baseline binds Claude Code and Pydantic AI. Confirm the employee's actual kernel, configured channel/model, and supported capabilities before selecting it for a task.

## Start the local development stack

From the platform source repository root, use the existing local template and Compose file:

```bash
cp deploy/local/.env.example deploy/local/.env
docker compose --env-file deploy/local/.env \
  -f deploy/local/docker-compose.yml up --build
```

Review the local configuration before starting. This guide introduces no new configuration keys. The stack starts PostgreSQL, applies the safe expand migration and DBOS schema step, then starts the application. The frontend defaults to `http://localhost:5173` and backend to `http://localhost:8080`.

Check service health:

```bash
curl 'http://localhost:8080/api/health/live'
curl 'http://localhost:8080/api/health/ready'
```

Liveness reports the process; readiness reports whether it can serve work. Neither proves the selected model, MCP server, or repository credential can complete a task. Create a small session and inspect a real output too. The local stack uses development reload and is not a production deployment recipe.

## Operate a self-hosted environment

The provided deployment assets use Docker Compose with PostgreSQL, backend, frontend, a reverse proxy, and persistent volumes. Use the environment-specific deployment entrypoints and the existing configuration contract. Do not expose the database, private execution control paths, or internal tool-bridge endpoints as general public APIs.

Keep database state, workspace files, and stable encryption/signing keys together in the recovery plan. Apply schema changes explicitly; application startup is not a substitute for migration management. The release flow can restore application images/configuration after a failure, but does not automatically downgrade the database. Verify backups independently instead of assuming every deployment created one.

No maintained Kubernetes operator or Helm chart is established by this baseline. If you package the services differently, preserve migration ordering, persistent storage, runtime ownership, worker coordination, and readiness semantics.

## Connect a device

Use the [device CLI](/developer/cli-sdk/) to pair a macOS/Linux execution computer. The device makes an outbound authenticated connection; the browser does not need to reach a local listening port. The execution process runs as the host user. An approved working directory identifies context, not an OS isolation boundary.

The model loop remains on the platform, so file content and tool results used for a task can travel to the platform and configured model provider. Stop, disconnect, and unknown-execution states need actual worker evidence; do not delete local journals to force a computer back online.

## Related guides

- [Platform architecture](/developer/architecture/)
- [Security and data boundaries](/deployment/security/)
- [Code repositories](/integrations/code-repositories/)
