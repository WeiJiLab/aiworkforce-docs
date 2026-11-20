---
title: "Security and permissions"
description: "Understand workspace permissions, execution credentials, network access, and the data produced by a task."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Review access at the resource and execution levels. A person can be authorized to manage a workspace while an employee still needs a separate credential grant. A job can be allowed to run while its external provider refuses a particular operation.

## Workspace and employee access

Workspace membership and resource authorization govern access to employees, sessions, Jobs, and related records. Management endpoints verify the current user; a user ID embedded in a route is not permission to act as someone else.

Repository credentials are workspace resources. Before an employee uses one, the platform checks the workspace, provider instance, enabled state, and employee grant. Initial automatic-delivery enablement also verifies the relevant execution employees' grants. Plain-language exclusions in an employee manifest help define the role, but cannot grant or revoke actual provider access.

Grant the narrow upstream permissions required by the task. Use a read-only account or token for reading tasks when the provider supports it. For release work, identify which employee and pipeline can write, merge, or deploy, and keep the required human confirmation in the workflow.

## Credential storage and rotation

Sensitive configuration is encrypted through the backend's secret-cipher service. The signing and encryption keys remain deployment-managed; changing an encryption key without a migration can make stored values unreadable. Normal credential-management responses expose metadata rather than plaintext secrets.

Personal Automation Tokens are separately scoped to allowed Jobs and support expiry and revocation. Device secrets are created by the pairing flow and kept in owner-only daemon state. Provider secrets, platform login credentials, and device credentials should remain in their respective stores, not in skill text or shared examples.

Revoking an employee grant changes subsequent authorization checks; it does not prove an already started process has stopped. Deleting a provider credential from the platform does not revoke the corresponding upstream token. Record both actions when retiring access.

Some settings responses available to system administrators can contain plaintext credential values. Keep raw configuration responses in restricted storage and redact them before sharing logs or screenshots.

## Network boundaries

For a remote deployment, use HTTPS and correctly configured reverse-proxy trust. Keep PostgreSQL and private runtime/control endpoints on the intended network. The platform's Automation MCP transport validates allowed hosts/origins; an MCP-compatible client still needs a valid credential and resource authorization.

An MCP server, plugin hook, or shell tool can access the network available to its execution environment. Configure egress restrictions at that environment when isolation is required. This documentation does not imply a universal network sandbox around every tool.

## Device execution and data flow

The daemon runs commands as the current OS user. Its approved working directory is a contextual boundary, not a filesystem sandbox. Use a dedicated account or isolated execution host when a task must not reach unrelated local data.

The cloud platform retains the model/agent loop during device execution. Tool results and file content supplied to the task can therefore reach the platform and the configured model provider. Local command execution does not imply local-only inference or data residency.

Daemon execution journals can contain command and output data. Preserve unknown execution evidence during recovery; do not erase journals to clear a safety fence. Restrict their storage and backups to the intended host account.

## Retention and review

Sessions, artifacts, traces, Issue observations, and delivery evidence can contain business data. Follow your deployment's actual retention and deletion controls, and account for workspace files and backups separately. A deleted UI resource is not proof that every upstream system or backup has removed its copies.

Before enabling an integration, verify the task's input scope, the recipient of outputs, the model/runtime provider, the employees with grants, and the place where evidence is stored. The available controls describe product behavior; they are not a claim of a particular compliance certification.

## Related guides

- [Authentication](/developer/authentication/)
- [Runtime environments](/deployment/runtime-environments/)
- [Self-host](/deployment/self-host/)
- [Code repositories](/integrations/code-repositories/)
