---
title: "My machines"
description: "Connect a macOS or Linux computer, verify the worker is online, and manage its pairing."
sidebar:
  label: My machines
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

## Pair your computer

Get `aiworkforce-device-exec` for your macOS or Linux computer from your deployment operator and install it on `PATH` under the name `aiworkforce-device-exec`. Have the project directory, the platform’s HTTPS address, and an account for that deployment ready.

On the computer, run the following commands. Replace both example values with the absolute project path and your platform address.

```bash
aiworkforce-device-exec doctor --json
aiworkforce-device-exec connect \
  --workspace /absolute/project/path \
  --platform https://platform.example.org
```

Confirm host execution in the terminal. In the browser, review the account, computer, and directory before approving. Over SSH, add `--no-browser` to `connect` and open the printed authorization link on another device.

## Verify the connection

After approval the CLI starts a background worker. Run `aiworkforce-device-exec status --json` and confirm the worker is online. Then [select the computer for a session](/deployment/daemon/session-execution/).

## Manage connected computers

Open **Device connections** in personal settings to check status, mark a default computer, or revoke access. `stop` pauses the local worker and retains its pairing. Use `start` to resume. To end the pairing, run `aiworkforce-device-exec disconnect`.

For startup at boot, generate a service definition with `service --format launchd` or `service --format systemd`. Review the user, directory, and platform address before installing it yourself. See the [Device Executor CLI](/integrations/cli/).
