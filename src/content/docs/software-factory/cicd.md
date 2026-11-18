---
title: "CI/CD integration"
description: "Connect the repository and pipeline resources a board needs before merge or release can run."
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

CI/CD integration is the repository host and the pipeline resources configured on a Software Factory project. The workbench does not replace your CI system, and it does not ship a built-in build farm. Automated merge and production release require those integrations to exist and to be authorized for the execution employees. A card does not create them.

## What to connect

Connect the code host as a workspace repository, then authorize the employees that should read or write it. See [code repositories](/integrations/code-repositories/). GitHub Actions bindings are covered with [GitHub](/integrations/github/). Yunxiao Flow bindings are covered with [Yunxiao Codeup](/integrations/yunxiao/). Identify which employee and which pipeline may write, merge, or deploy. Keep the human confirmation those actions still require. A read-only credential cannot merge. A workspace credential the employee cannot use cannot merge either.

Configure the project's pipeline resources before you enable a lane that claims to test or release. Provider, instance, enabled state, and workspace must match the connection you intend. Deleting a platform credential does not revoke the upstream token and does not stop a session that already started.

## How a run uses CI

Test release and test verification record the result the configured flow returns. A failure can send work back for repair. Production release records the merge outcome for a passing batch. Done scans merged cards for production release and later cleanup. A closed batch does not mean production release finished. [Release governance](/software-factory/release-governance/) separates those outcomes.

If the pipeline is not configured, do not write a passing CI check into the card. Record that the automated stage did not run, and use a named manual check only when a person actually ran it. [Build and test](/software-factory/build-test/) is that record.
