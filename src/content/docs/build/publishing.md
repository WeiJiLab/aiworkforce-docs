---
title: "Publishing and distribution"
description: "Publish a validated employee package as a template and confirm which instances received it."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Publishing makes a package available as a template other people can use to create workspace employees. It is not the same as creating one employee, and it does not push the new version into employees that already exist.

## Before you publish

Validate the package and complete the task trials in [employee testing](/build/testing/). The version in `plugin.json` and `employee.yaml` should identify this behavior. **Submit build** stores the build. Publishing is the later step that exposes a template.

When adapting a procedure for reuse, keep the work steps, tool requirements, and acceptance checks. Replace project-specific examples with synthetic examples and remove credentials, private references, and customer data from the package. Configure workspace-specific endpoints and permissions during setup. Confirm the receiving workspace's data and tool scope before testing the template there. See [security and permissions](/deployment/security/).

A structural pass can still describe the wrong job. Read the role, the exclusions, and the entry skill once more. [Employee definition](/build/employee-definition/) is the page to correct if those do not match.

## What consumers receive

A workspace user with permission creates an employee from the published template and waits for initialization. They do not upload the YAML. The instance copies the role profile at creation time. Editing the template afterward does not rewrite that instance. Editing the instance profile does not rewrite the template.

Open the instance and refresh **Methods and capabilities** to see the applied skills and tools. If a skill is missing, the template version or the applied package is not the one you published. Say which version a team should use. Do not tell them that every existing employee updated itself.

## Distribution boundary

This release distributes employees through published templates and packages applied by the platform. It does not describe a public marketplace or an automatic rollout to every workspace. Administrators control which templates a deployment shows. [Templates](/build/templates/) is the catalog view of those starting points. [Teams and access](/administration/teams-access/) controls who may create an employee from one.
