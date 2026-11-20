---
title: "Publishing and distribution"
description: "Publish a validated Agent Package as a template and confirm which instances received it."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Publish an Agent Package in two steps. Submit the validated build to the configured marketplace repository, then sync the marketplace entry to a workspace employee template.

## Before you publish

Validate the package and run draft evaluations before you submit. Record the behavior covered by the version in `plugin.json` and `employee.yaml`. See [employee testing](/build/testing/).

When adapting a procedure for reuse, keep the work steps, tool requirements, and acceptance checks. Replace project-specific examples with synthetic examples and remove credentials, private references, and customer data from the package. Configure workspace-specific endpoints and permissions during setup. Confirm the receiving workspace's data and tool scope before testing the template there. See [security and permissions](/deployment/security/).

A structural pass can still describe the wrong job. Read the role, the exclusions, and the entry skill once more. [Agent definition](/build/employee-definition/) is the page to correct if those do not match.

## Submit the build to the marketplace

**Submit build** merges the draft and pushes it to the configured shared marketplace branch. After indexing succeeds, the builder removes the associated build sessions and requirement worktree. Save any build notes you need before submitting. If indexing fails after the push, use the index retry and check the marketplace entry. The remote branch may already contain the change.

## Sync the employee template

Open the **Standard employee marketplace** and sync the indexed Plugin to a digital employee template. Syncing can overwrite the configuration of an existing template. Review the target template first, then confirm that the result appears in the intended workspace’s template picker.

## What consumers receive

A workspace user with permission creates an employee from the published template and waits for initialization. They do not upload the YAML. The instance copies the role profile at creation time. Editing the template afterward does not rewrite that instance. Editing the instance profile does not rewrite the template.

Open the instance and refresh **Methods and capabilities** to see the applied skills and tools. If a capability is missing, compare the applied package with the marketplace source and the template’s settings. Record the source revision separately from the displayed template version.

## Distribution boundary

This release distributes employees through published templates and packages applied by the platform. It does not describe a public marketplace or an automatic rollout to every workspace. Administrators control which templates a deployment shows. [Templates](/build/templates/) is the catalog view of those starting points. [Teams and access](/administration/teams-access/) controls who may create an employee from one.
