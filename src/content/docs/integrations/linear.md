---
title: "Linear"
description: "Import open Linear issues after an administrator connects a team for this workspace."
status: limited
sidebar:
  label: Linear
  badge:
    text: Limited
    variant: caution
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Linear in AI Workforce is a one-time, read-only import into Task Inbox. It runs only after an administrator connects a Linear team for this workspace and for specific people. There is no Linear OAuth install, no team browser, and no write-back.

## What it is

The deployment holds a list of import sources. Each Linear source names one workspace, the users who may use it, one team key, and the secret-store variable that holds a personal API key. People in that list, who also have execute permission on the workspace, see the source when they import tasks.

## When to use it

Use it when open issues from a known Linear team should become inbox tasks. Use [GitHub](/integrations/github/) or [Yunxiao Codeup](/integrations/yunxiao/) when the person importing should pick the repository or project themselves. Use [Jira](/integrations/jira/) for a Jira Cloud project under the same administrator-connected pattern.

## What moves between the systems

The preview reads open issues in the configured team through Linear's API: identifier, title, description, status, and URL. Completed and canceled issues are not offered. Import writes the title, body, source key, status, and URL onto a new inbox task. Comments, attachments, and sub-issues stay in Linear. The body is truncated at 20,000 characters and keeps the original link. Requests are read-only and do not follow redirects.

## Connect it

### As a person importing tasks

1. Open **Import tasks** and choose Linear.
2. If the dialog says the source is not configured, ask an administrator to connect it.
3. Select the source. The label shows the connection name and the team key.
4. If the source is not ready, the API key is missing in the deployment. Import stays unavailable until that is set.
5. Select open issues and import. Each batch accepts at most 25. Items already in the inbox are marked and skipped.

### As an administrator of a self-hosted deployment

Add a source to the deployment's issue-import list. Store the API key in the secret store. The list entry stores the variable name.

| Field       | What to set                                                       |
| ----------- | ----------------------------------------------------------------- |
| Identity    | A stable source id and a name people will recognize.              |
| Provider    | `linear`.                                                         |
| Workspace   | The workspace id, plus the user ids allowed to call this source.  |
| Scope       | The Linear team key.                                              |
| Credentials | The variable name for a personal API key that can read that team. |

The API host is Linear's cloud API. Restart the service after the deployment receives the list and the secret. There is no self-hosted Linear endpoint in this import.

## What you can do afterward

Imported tasks sit in Task Inbox. A person can open one and route a confirmed item to a workbench draft. The import does not create a session and does not start development. Importing the same Linear issue again skips the existing inbox record and keeps later edits. The identity is Linear's issue id. Hand-entered rows, and automation rows saved under a different source key, are not merged automatically.

## Permissions and credentials

The caller must be listed on the source and must be allowed to execute in the workspace. The browser never receives the API key. A source whose token variable is empty is visible as not ready and cannot be read. The key needs team read access. Connecting the source does not authorize an employee to call Linear.

## Limits

This release does not poll Linear, subscribe to Linear webhooks, or update Linear issues. There is no in-product setup that lets a member paste a key or choose another team. Failed reads do not insert a partial batch. After a timeout, preview again and import what is still missing.

## Related guides

- [Integration directory](/integrations/overview/)
- [Issue automation](/workflows/issue-automation/)
- [Inbox and tasks](/user-guide/inbox-tasks/)
- [Jira](/integrations/jira/)
