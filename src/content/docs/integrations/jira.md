---
title: "Jira"
description: "Import open Jira Cloud issues after an administrator connects a project for this workspace."
sidebar:
  label: Jira
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Jira in AI Workforce is a one-time, read-only import into Task inbox. It runs only after an administrator connects a Jira Cloud project for this workspace and for specific people. There is no Jira card in the workspace integration catalog, no project browser, and no write-back.

A Jira MCP server attached to an employee is a different path. That server is an [external connector](/integrations/employee-tools/), with its own tools and grants. It is not this import.

## What it is

The deployment holds a list of import sources. Each Jira source names one workspace, the users who may use it, one Jira Cloud site, one project key, and the secret-store variables that hold the account email and API token. People in that list, who also have execute permission on the workspace, see the source when they import tasks.

## When to use it

Use it when open issues from a known Jira Cloud project should become inbox tasks. Use [GitHub](/integrations/github/) or [Yunxiao Codeup](/integrations/yunxiao/) when the person importing can pick the repository or project with their own token. Use a Job and [issue automation](/workflows/issue-automation/) after the inbox item exists, if an employee should investigate it.

## What moves between the systems

The preview reads open issues in the configured project: key, title, description, status, and URL. Description is taken from Jira's document body. Import writes those fields onto a new inbox task. Comments, attachments, and subtask links stay in Jira. The body is truncated at 20,000 characters and keeps the original link. The platform calls Jira with read-only requests and does not follow redirects.

## Connect it

### As a person importing tasks

1. Open **Import tasks** and choose Jira.
2. If the dialog says the source is not configured, ask an administrator to connect it. Choosing Jira in the product does not start an OAuth install.
3. When a source is listed, select it. The label shows the connection name and the project key.
4. If the source is not ready, the credentials are missing in the deployment. Import stays unavailable until an administrator finishes that.
5. Select open issues and import. Each batch accepts at most 25. Items already in the inbox are marked and skipped.

### As an administrator of a self-hosted deployment

Add a source to the deployment's issue-import list. The token value and the account email stay in the secret store. The list entry stores the variable names, not the secret text.

| Field       | What to set                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Identity    | A stable source id and a name people will recognize.                                            |
| Provider    | `jira`.                                                                                         |
| Workspace   | The workspace id, plus the user ids allowed to call this source.                                |
| Scope       | The Jira project key.                                                                           |
| Site        | The Cloud site, `https://<site>.atlassian.net`.                                                 |
| Credentials | Variable names for an API token that can read the project, and for the Atlassian account email. |

Restart the service after the deployment receives the list and the secrets. Jira Server and Jira Data Center are not accepted. The site must be Atlassian Cloud HTTPS.

## What you can do afterward

Imported tasks sit in Task inbox. Open one, confirm scope, and route it to a workbench draft when someone should build it. The import does not create a session and does not start development. Later edits in the inbox are kept if you import the same issue again. The match is the Jira site plus the issue id. Older inbox rows that were typed in by hand, or saved by an automation under a different source key, are not merged automatically.

## Permissions and credentials

The caller must be listed on the source and must be allowed to execute in the workspace. Other people's sources are omitted from the response. The browser never receives the token. A source whose email or token variable is empty is visible as not ready and cannot be read.

The API token needs permission to read issues in that project. The connection does not grant an employee a Jira login. Employee access to Jira, if you want it, is a separate MCP connection and a separate grant.

## Limits

This release imports open issues once per batch. It does not subscribe to Jira webhooks, poll for later changes, or update Jira status, comments, or assignees. There is no self-serve OAuth app and no in-product way to pick a different project. Failed reads do not insert a partial batch, and the error does not include the remote body or the credential. After a timeout, preview again and import what is still missing.

## Related guides

- [Integration directory](/integrations/overview/)
- [Issue automation](/workflows/issue-automation/)
- [Task inbox](/user-guide/inbox-tasks/)
- [Tools and connectors](/integrations/employee-tools/)
