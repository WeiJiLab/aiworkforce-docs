---
title: "Development environments"
description: "Place coding work on the platform runtime or an authorized device. A card does not create an isolated environment."
status: limited
sidebar:
  badge:
    text: Limited
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

A development environment is where tools and commands for a change actually run. Software Factory uses the runtime already configured for the execution employee. Creating a delivery card does not provision a sandbox, a preview URL, or a disposable virtual machine.

## Choose the place that matches the grant

[Runtime management](/deployment/runtime-environments/) is the full choice: platform execution, a self-hosted deployment, or an authorized device worker. The steps for running the platform yourself are in [Self-host](/deployment/self-host/). The platform keeps the conversation and authorization. The device runs commands as the host user in an approved working directory. That directory is context, not an isolation boundary.

Repository credentials used by the employee are checked against that employee's current authorization. A workspace connection is not enough. Provider, instance, enabled state, and workspace must match. See [code repositories](/integrations/code-repositories/).

## What the environment must make true

Before you treat a test result as evidence, the environment has to be one the team can name: which runtime, which device if any, which repository revision, and which commands ran. [Build and test](/software-factory/build-test/) records the test lane. If the pipeline resource is missing, say the automated check did not run. Do not describe a local unrecorded command as the project's CI result.

There is no documented per-card preview environment in this release. If a team uses an external preview, link it from the card as evidence only after someone has opened it. The link alone is not a passing check.
