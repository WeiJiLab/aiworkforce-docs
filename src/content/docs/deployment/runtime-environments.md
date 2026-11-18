---
title: "Runtime management"
description: "Choose between platform execution, a self-hosted deployment, and an authorized device worker."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
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

## Run the platform yourself

[Self-host](/deployment/self-host/) is the procedure: the local development stack, the single-host release layout, health checks, network and recovery, and the limits of those assets. Hosting the platform does not choose a runtime kernel and does not attach a device. The local Compose file is a development stack. The release assets update one host. This baseline has no maintained Kubernetes operator or Helm chart.

## Connect a device

Read [Run tools on your computer](/deployment/daemon/) first, then pair a macOS or Linux computer with the [Device Executor CLI](/integrations/cli/). The device makes an outbound authenticated connection; the browser does not need to reach a local listening port. The execution process runs as the host user. An approved working directory identifies context, not an OS isolation boundary.

The model loop remains on the platform, so file content and tool results used for a task can travel to the platform and configured model provider. Stop, disconnect, and unknown-execution states need actual worker evidence; do not delete local journals to force a computer back online.

## Related guides

- [Self-host](/deployment/self-host/)
- [Platform architecture](/developer/architecture/)
- [Security and data boundaries](/deployment/security/)
- [Code repositories](/integrations/code-repositories/)
