---
title: "Platform configuration"
description: "Choose the correct configuration scope for preferences, credentials, model channels, and execution devices."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Configuration exists at several scopes. Change the setting that controls the failing capability rather than copying credentials or model values between unrelated screens.

## Find the right scope

| Scope              | Typical responsibility                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| Personal settings  | Your preferences, account connections, platform token, runtime configuration, and device connections. |
| Workspace settings | Shared workspace details, member grants, and workspace credentials.                                   |
| Employee/session   | The selected worker, available model and thinking level, session permissions, and execution target.   |
| Administration     | Published templates, initialization configuration, model channels, and operational monitoring.        |

Only actions allowed by your account and workspace role appear or succeed. Ask the relevant owner to make a scoped change if you cannot access the setting.

## Configure a model channel

Administrators open **Runtime kernels** and choose the relevant kernel. The interface provides separate Claude Code and Pydantic AI configuration surfaces. Configure the channel's service endpoint, credentials, and model identifiers in that surface. The available protocol and options depend on the kernel and channel purpose.

Pydantic AI separates language, decision, and voice channel configuration. A configured voice channel does not by itself add a working voice entry to the primary agent. Decision routing has its own configuration and validation; it is not the same as selecting the chat model.

After saving, verify that the intended model appears for an eligible employee or session. Use a short task to check connectivity before changing multiple employees. A saved channel is not proof that its endpoint is reachable.

## Configure credentials and devices

Use credential fields to store or replace secrets. Where a masked value already exists, distinguish keeping it from explicitly replacing or clearing it. Do not put a key into a service URL, employee instructions, memory, or a troubleshooting screenshot.

Under **Device connections**, inspect the device's real workspace, capabilities, and online state before choosing it for execution. An offline default device can remain selected but cannot currently perform work. Revoking device authorization affects later access; it is not a file rollback.

## Validate and recover

Make one change, save it, and repeat a small relevant task. Check the employee's initialization status, model availability, and connection authorization separately. If a configured model is marked unavailable, ask the administrator to check the channel rather than entering an arbitrary model name.

Keep the previous non-secret configuration and observed error in the change record. Resolve the specific failure before publishing automations that depend on it.

See [models and costs](/models/overview/), [teams and access](/administration/teams-access/), and [troubleshooting](/resources/troubleshooting/).
