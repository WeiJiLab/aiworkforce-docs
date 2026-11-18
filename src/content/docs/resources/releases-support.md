---
title: "Changelog and support"
description: "Coordinate deployment updates, identify compatibility boundaries, and use the support route agreed with your team."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

AI Workforce deployments can run different product revisions, runtime versions, and employee-template versions. This documentation follows the current documented behavior; it is not proof that every deployment has the same capabilities.

## Identify what is running

When reporting a problem or planning an update, ask the deployment administrator for the deployed revision or image reference and the relevant update date. Also record the employee template, selected runtime kernel, and any connected execution-client version involved.

A model name is not a platform version. Updating an employee template is different from updating the backend, browser frontend, or a local execution client. Record which component changed before comparing behavior.

## Review an update before applying it

The deployment owner should review the change description, database or configuration requirements, compatibility with connected clients, and backup and recovery procedures. Test the update using representative workflows before relying on it for unattended work.

A useful acceptance check includes:

1. Sign in and open an authorized workspace.
2. Start a small employee task with the expected model and execution target.
3. Read its output and verify an authorized external connection if required.
4. Inspect an automation run and its collected result when automation is used.
5. Confirm that expected members retain the intended access.

Use a reviewed release artifact and the deployment's established release process. This guide does not initiate an upgrade or promise automatic version migration. The deployment owner decides timing and recovery actions.

## Choose a support route

Use your organization's agreed contact or issue tracker. For a private deployment, keep the report within the authorized support group. Start with the [troubleshooting checklist](/resources/troubleshooting/) and include the original session or run rather than an unsupported completion summary.

Administrators have a **Feedback** management view for recorded issues and suggestions. It tracks categories and status transitions such as submitted, processing, resolved, rejected, and closed. A recorded feedback status is separate from whether a particular code change is deployed or verified in your environment.

This documentation does not designate a public community chat, support email, response-time commitment, or public release feed. Use the channels supplied by the people operating your deployment.

## Improve the documentation

Describe the page, unclear step, actual deployed behavior, and a proposed correction. Follow the [contribution guide](/developer/contributing/) within the repository access and review process your team has approved. Review both language versions when changing technical meaning.

See [teams and access](/administration/teams-access/), [configuration](/administration/configuration/), and [troubleshooting](/resources/troubleshooting/).
