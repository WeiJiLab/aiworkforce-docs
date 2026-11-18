---
title: "Connect code repositories"
description: "Configure a provider connection, associate repositories, and authorize the employees that will use them."
sidebar:
  label: Code repositories
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

A workspace repository is an identified code resource with a provider connection. Keep the repository identity, access credential, and employee grant distinct: you may be able to browse a repository yourself while an employee still lacks authorization to clone or modify it.

## Supported connection families

| Provider       | Instance information                                                                        | Important boundary                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| GitHub         | Public or explicitly configured enterprise HTTPS origin                                     | The built-in PR viewer supports connected GitHub repositories; do not assume identical viewers for every provider. |
| GitLab         | Explicit GitLab instance origin                                                             | Instance access and repository browsing do not prove every delivery adapter supports that deployment.              |
| Yunxiao Codeup | Central edition or a supported Region instance; Central requires the native organization ID | Match edition, instance, and credential family before selecting resources.                                         |

An instance origin is an HTTPS domain, without an embedded username/password, repository path, query, or fragment. The current resource model accepts the default HTTPS port. Enter the repository separately rather than appending it to the instance field.

## Set up access

1. Open the workspace's repository management, or choose the provider from **Integrations**.
2. Create or select a workspace credential for that provider and instance.
3. Create a connection using the credential, then browse the resources it can access.
4. Add the intended repository and check its clone URL and default branch.
5. Explicitly authorize each employee that should use the credential.
6. Start a small employee task that reads a known file and inspect its result.

Credentials are workspace resources; their creator is recorded but is not the sole person permitted to manage them. Current workspace access determines who can manage their metadata and grants. Secret values are not returned in the normal management response.

## Prepare for automated delivery

A repository connection alone does not enable the Software Factory. Configure the workbench project, allowed repositories, execution employees, and test/release pipeline resources. When first enabling automatic delivery or changing relevant employee/token bindings, the platform checks the execution employees' grants.

Run preparation checks current workspace, instance, enabled state, and employee authorization. Do not rely on an older successful run after a grant has been revoked. A personal Git credential is not a substitute for a workspace repository credential in the employee's authorized repository context.

## Troubleshoot the right layer

| Symptom                                     | Check                                                                                  |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| Repository absent from discovery            | Provider account permissions, selected namespace, pagination, and connection instance. |
| Credential visible but unavailable          | Enabled state, provider/instance match, and the connection's selected instance.        |
| User can browse but employee cannot execute | Explicit employee grant and the actual employee used by the session or lane.           |
| Delivery cannot start                       | Project repository selection, role bindings, grants, and pipeline capability.          |
| Credential deletion is blocked              | Remove employee grants and repository connection references first.                     |

Deleting a platform credential does not revoke the upstream provider token or terminate an already running session. Rotate or revoke the upstream secret through the provider when that is the intended outcome.

## Related guides

- [Integration overview](/integrations/overview/)
- [Software Factory overview](/software-factory/overview/)
- [Security and data boundaries](/deployment/security/)
