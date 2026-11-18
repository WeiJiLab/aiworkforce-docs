---
title: "Run tools on your computer"
description: "A daemon runs employee tools on a macOS or Linux computer you manage. The conversation and model loop stay on the platform."
sidebar:
  label: Daemon
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A daemon moves tool execution to a computer you manage. You still use employees from the workspace, the delivery board, and the console. AI Workforce keeps the conversation, the model loop, and authorization. The daemon runs the tools.

Platform execution is the usual path. Use a daemon when the work has to happen on a machine the platform cannot reach. Hosting the web application and database yourself is a different decision: [Self-host](/deployment/self-host/).

## Who should use a daemon

Use a daemon when platform execution cannot meet the constraint:

- The checkout, build, or test service can only be reached from inside your network.
- The work needs a computer you already run: a checkout, credentials, or hardware that should stay there.
- Commands must run as a person on that computer, not as a process inside the platform.

Open **Device connections** (设备连接) in personal settings to connect a computer, see whether it is online, revoke it, or mark a default. The default is a label. It does not change a session by itself.

## Prefer platform execution when

Stay on platform execution when these are enough:

- The task uses connections the platform already has, and it does not need a private checkout.
- You do not want to install a worker, approve a directory, and keep that computer online.
- You need the service records on infrastructure you operate. That is [Self-host](/deployment/self-host/), not a daemon. A daemon does not install the web application or the database.

[Runtime management](/deployment/runtime-environments/) is the choice among platform execution, a self-hosted service stack, and an authorized computer.

## What leaves the computer

The checkout and the computer's own credentials stay on the computer. During a task, file contents and tool results the employee uses are sent to the platform, and then to the model provider configured for that employee.

The browser does not open a port on the computer. The daemon makes an outbound HTTPS and WebSocket connection to your platform origin. No inbound port, public address, or VPN is required for the browser to reach the machine.

A sentence in the prompt does not replace authorization. Workspace permissions, the session's tool grant, and the computer you selected are what allow a call. See [Security and permissions](/deployment/security/).

## How it works

1. Install `aiworkforce-device-exec` for that operating system. This baseline does not publish a public download URL or a checksum manifest. Get the binary from the person who operates your deployment.
2. Pair the computer. The command below uses placeholders. Replace both values:

```bash
aiworkforce-device-exec connect \
  --workspace /absolute/project/path \
  --platform https://platform.example.org
```

The CLI explains host execution and asks you to confirm it. It opens a browser so you can approve the computer, the directory, and the signed-in account. On a machine without a browser, add `--no-browser` and finish that same approval somewhere else. The browser does not show a device token.

3. The CLI then starts a background worker. Browser approval and an online worker are different. Run `aiworkforce-device-exec status --json`. Pairing is complete when that status shows the worker online.
4. Before the first message in an employee session, set **Execution location** (执行位置) to the platform or to one online computer you own. After the session starts, that choice stays fixed. If the daemon goes offline or you revoke it, the session does not fall back to the platform.
5. Tools for that session run on the selected computer. Commands run as the operating-system user. `--workspace` is the working directory. It is not an operating-system sandbox. On a personal device, only the session owner can run those tools.

`aiworkforce-device-exec service --format launchd` or `systemd` prints a service definition. The CLI does not install it. Review the directory, the platform origin, and the user, then install the unit yourself. The command list is [Device Executor CLI](/integrations/cli/).

## Requirements

- macOS or Linux. Put the binary on `PATH`.
- Outbound HTTPS and WebSocket access to your platform origin.
- An account that can approve this computer and this directory.
- An employee session where you select that computer before the first message.

Run `aiworkforce-device-exec doctor --json` before `connect` when setup fails. Read the JSON. A failure there is the computer, not a platform outage. This baseline does not document a version flag or an upgrade channel.

## When it does not start

| What you see                                  | What to check                                                                                                                                               |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `doctor` fails before `connect`               | The binary, the operating system, and whether you can use the working directory.                                                                            |
| The browser never finishes approval           | You passed `--no-browser` and have not completed the printed flow, or `--platform` is not your deployment.                                                  |
| The browser succeeded and `status` is offline | Approval and the outbound worker are different steps. The platform does not dial back into a local port.                                                    |
| Authentication is rejected                    | Sign in again for this origin. A platform login does not repair a revoked device. Pair again.                                                               |
| Tools run in another directory                | `--workspace` is the directory you approved. Pair again with the absolute path you intend.                                                                  |
| The session keeps running on the platform     | **Execution location** was left on the platform, or it was set after the first message. A connected computer and a default label do not select the session. |

Stopping a worker does not revoke the platform credential. `disconnect` ends this pairing. It does not delete the account. Unknown stop state stays isolated until the computer reports what happened. Do not delete the local journal to force the computer back online.

## Next steps

- [Device Executor CLI](/integrations/cli/) for `doctor`, `status`, `stop`, and the service definitions.
- [Runtime management](/deployment/runtime-environments/) to choose platform execution, self-hosting, or a daemon.
- [Security and permissions](/deployment/security/) for what a task can send off the computer.
- [Self-host](/deployment/self-host/) when you need to run the service stack yourself.
