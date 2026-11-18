---
title: "Device Executor CLI"
description: "Install, pair, and operate aiworkforce-device-exec. It runs tools on a computer; it does not administer the platform."
status: limited
audience:
  - developer
  - platform-engineer
product_area: integrations
last_verified: "2026-11-18"
sidebar:
  label: Device Executor CLI
  badge:
    text: Limited
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

`aiworkforce-device-exec` is the device executor. It pairs a macOS or Linux computer so AI Workforce can run tools there. The platform keeps the conversation, the model loop, and authorization. This CLI does not create employees, edit grants, call the management API, or install a general `aiworkforce` admin command.

The limit is that scope. There is no supported npm or pip package for this client, and this baseline does not publish a public download URL or a checksum manifest. Obtain the binary from the maintainer of your deployment.

The interface map for HTTP, MCP, and SDK clients is [Interface overview](/developer/cli-sdk/). Do not copy the device procedure into that page.

## Install and verify

1. **Get a release build.** Ask your maintainer for the `aiworkforce-device-exec` binary that matches the computer's operating system. Daemon developers can build it from its own repository with `cargo build --locked`. A package name alone is not an install path.
2. **Check the file you received.** Confirm the filename and that your maintainer expects that build. This documentation cannot verify a checksum that the release process has not published.
3. **Check the computer.** The supported hosts are macOS and Linux. Put the binary on `PATH`. Then run:

```bash
aiworkforce-device-exec doctor --json
```

`doctor` reports whether this machine can host execution. Read the JSON. A failure here is an environment problem, not a platform outage.

4. **Pair.** Use your deployment's platform origin. The host below is a placeholder, not a live service:

```bash
aiworkforce-device-exec connect \
  --workspace /absolute/project/path \
  --platform https://platform.example.org
```

Replace both values. `--workspace` is the approved working directory. It identifies context. It is not an operating-system sandbox. `--platform` is the HTTPS origin of your AI Workforce deployment.

5. **Confirm the connection.** Browser approval and an online worker are different steps. After you approve host execution, run:

```bash
aiworkforce-device-exec status --json
```

Pairing is complete only when `status` shows the worker online. Approval in the browser, by itself, does not.

## Commands

| Command                                          | What it does                                           | What to read                                                                             |
| ------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `connect --workspace <path> --platform <origin>` | Start pairing and an outbound authenticated connection | The path must be absolute. The origin must be your deployment.                           |
| `connect --no-browser`                           | Same pairing without opening a browser on this machine | You still have to finish the printed authorization flow. Headless does not skip consent. |
| `status --json`                                  | Show whether the worker is connected                   | Use this after pairing and after a restart.                                              |
| `doctor --json`                                  | Check the local execution environment                  | Run this before `connect` when setup fails.                                              |
| `stop`                                           | Stop the running worker                                | This does not uninstall the binary or revoke the platform credential.                    |
| `start`, `restart`, `disconnect`                 | Manage the connection lifecycle                        | `disconnect` ends this pairing session. It does not delete the platform account.         |
| `service --format launchd`                       | Print a macOS service definition                       | Review it before installing. The CLI does not install it.                                |
| `service --format systemd`                       | Print a Linux service definition                       | Review it before installing. The CLI does not install it.                                |

Commands run as the host user. Tool results and file content given to a task can still reach the platform and the configured model provider. See [security and permissions](/deployment/security/).

## Headless pairing

`--no-browser` is for a machine with no local browser. The command still requests trusted host-execution consent and prints the authorization step you must complete elsewhere. A finished browser login is not the same as `status` reporting the worker online. If the printed flow expires, run `connect` again. Do not reuse an old approval for a new directory or origin.

## Run as a service

Generate the definition, review it, then install it with the operating system tools. Connecting does not install a service.

```bash
aiworkforce-device-exec service --format launchd
aiworkforce-device-exec service --format systemd
```

Review the working directory, the platform origin, and the user the service will run as. Install or remove the service with `launchctl` or `systemctl` after that review. `stop` stops the current process. It does not unload a service unit you installed yourself. Uninstall by removing that unit the same way you installed it, then run `disconnect` if the worker should forget this pairing.

## When pairing fails

| What you see                                  | Check                                                                                                                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `doctor` fails before `connect`               | The binary, the OS, and the permissions of the working directory.                                                                                                |
| The browser never finishes approval           | You are on `--no-browser` and have not completed the printed flow, or the origin is not your deployment.                                                         |
| The browser succeeded but `status` is offline | Approval and the outbound worker connection are different. Run `status --json` again after the process is up. The platform does not dial back into a local port. |
| Authentication is rejected                    | Sign in again for this origin. A platform login does not repair a revoked device credential. Pair again.                                                         |
| Tools run in an unexpected directory          | `--workspace` is the context you approved. Pair again with the absolute path you intend.                                                                         |

## Versions

This baseline does not document a version flag, an upgrade channel, or a compatibility matrix for the binary. To change builds, obtain the replacement from the same maintainer, run `doctor --json`, and pair again if `status` no longer matches the deployment. Do not mix a binary from one release line with a platform origin the maintainer has not approved.

## Related guides

- [Runtime management](/deployment/runtime-environments/)
- [Security and permissions](/deployment/security/)
- [Interface overview](/developer/cli-sdk/)
