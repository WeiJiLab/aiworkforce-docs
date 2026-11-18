---
title: "Coding agents and harnesses"
description: "See which execution harness a coding employee actually runs in. There is no harness registry in this release."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A harness is the execution wrapper around a coding agent: instructions the runtime loads, tools it can call, and the place those tools run. AI Workforce keeps the model and agent loop on the platform. Tools run in the configured runtime. For repository work, that runtime is often the Claude Code runtime referenced by delivery and collection features, or an authorized device worker.

This release does not ship a harness registry, a versioned harness package format of its own, or a catalog of interchangeable coding agents. Naming another vendor's agent in a prompt does not switch the runtime.

## What you can select

Choose the runtime and the device in [runtime management](/deployment/runtime-environments/). The platform still holds the conversation, the task state, and authorization. A device runs tools as the host user. An approved working directory identifies context. It is not an operating-system isolation boundary. Local command execution does not mean local-only inference. Tool results and file content supplied to the task can reach the platform and the configured model provider.

The employee package can declare skills, tools, and MCP dependencies. Those declarations do not install a harness and do not grant the device. Apply the template to the instance and authorize the device or the repository separately.

## How to tell which harness ran

Read the session and the delivery card's execution record. The trace should show the runtime and the tool calls. If the trace does not show a tool call, the agent did not use that tool, regardless of the prompt. [Build and test](/software-factory/build-test/) is where a coding change meets a recorded check. [Security and permissions](/deployment/security/) covers the data that leaves the device.
