---
title: "CLI"
description: "Pair and operate an execution computer with aiworkforce-device-exec. It is not a general admin CLI."
support: limited
sidebar:
  badge:
    text: Limited
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

The supported command-line client is `aiworkforce-device-exec`. It pairs a macOS or Linux computer so the platform can run tools there. It does not create employees, edit grants, or call the management API. Platform administration stays in the product and the HTTP API.

## Install only a binary you were given

Obtain a compatible binary from your maintainer. Release-install automation requires published release assets that actually exist. Developers of the daemon can build it with `cargo build --locked` in its own repository. Do not assume an npm or pip package of the same name.

## Pair and inspect

```bash
aiworkforce-device-exec connect --workspace /absolute/project/path \
  --platform https://platform.example.org
aiworkforce-device-exec status --json
aiworkforce-device-exec doctor --json
aiworkforce-device-exec stop
```

Replace the origin and the directory. Pairing asks for trusted host-execution consent and opens a browser authorization flow. `--no-browser` supports headless use. Browser approval is separate from the worker reaching the platform's online execution state.

`start`, `restart`, and `disconnect` manage the connection. `service --format launchd` or `service --format systemd` prints a service definition for separate review and installation. Connecting does not install an operating-system service. Commands run as the host user, not inside an implied filesystem sandbox.

The device makes an outbound authenticated connection. The browser does not need to reach a local listening port. Tool results can still reach the platform and the configured model provider. See [runtime management](/deployment/runtime-environments/) and [security and permissions](/deployment/security/).
