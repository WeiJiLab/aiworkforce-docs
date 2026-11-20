---
title: "Troubleshoot self-hosted machines"
description: "Diagnose local setup, browser pairing, worker connectivity, and session location by symptom."
sidebar:
  label: Troubleshooting
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

On the paired computer, run `aiworkforce-device-exec doctor --json` to check the host environment, then `aiworkforce-device-exec status --json` to see whether the worker is online.

| What you see                                  | What to check                                                                                                                                               |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `doctor` fails before `connect`               | The binary, the operating system, and whether you can use the working directory.                                                                            |
| The browser never finishes approval           | You passed `--no-browser` and have not completed the printed flow, or `--platform` is not your deployment.                                                  |
| The browser succeeded and `status` is offline | Approval and the outbound worker are different steps. The platform does not dial back into a local port.                                                    |
| Authentication is rejected                    | Sign in again for this origin. A platform login does not repair a revoked device. Pair again.                                                               |
| Tools run in another directory                | `--workspace` is the directory you approved. Pair again with the absolute path you intend.                                                                  |
| The session keeps running on the platform     | **Execution location** was left on the platform, or it was set after the first message. A connected computer and a default label do not select the session. |

Stopping a worker does not revoke the platform credential. `disconnect` ends this pairing. It does not delete the account. Unknown stop state stays isolated until the computer reports what happened. Do not delete the local journal to force the computer back online.

To pair again, see [My machines](/deployment/daemon/my-machines/). For command options and service management, see the [Device Executor CLI](/integrations/cli/).
