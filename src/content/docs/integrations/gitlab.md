---
title: "GitLab"
description: "Connect a GitLab instance with a personal access token, associate projects, and read issues on a delivery project."
sidebar:
  label: GitLab
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

GitLab is a code-host connection for a specific instance, including GitLab.com. The platform lists projects the token can read and can later read issues from a repository already bound to a delivery project. It does not poll merge requests, and it does not provide the GitHub pull request viewer for GitLab.

Shared token, instance, and employee-grant rules are in [code repositories](/integrations/code-repositories/).

## What it is

You save a GitLab personal access token against the instance origin, create a workspace connection that references it, and add projects from that instance. A delivery project can then use one of those repositories as a read-only work-item source.

## When to use it

Use GitLab when employees or a Software Factory project need a GitLab repository. Use [GitHub](/integrations/github/) when the work depends on polled pull request or issue events. Use the inbox import on GitHub or [Yunxiao Codeup](/integrations/yunxiao/) when the task is a one-time copy into Task inbox. GitLab is not one of those import providers.

## What moves between the systems

Discovery calls the instance API at `/api/v4` and stores the native project id, path, web URL, clone URL, and default branch. Projects may sit in a group or in nested subgroups. The addresses are HTTPS and contain no credential.

On a delivery project, a GitLab Issues source reads issues and their notes for a repository the project already binds. The read is for display and inspection. It does not create GitLab notes, change labels, or close issues.

## Connect it

1. In **External service credentials**, add a GitLab personal access token. Set the instance to the HTTPS origin, such as `https://gitlab.com` or your own GitLab host. Do not append a group or project path.
2. In **Integrations** or the repository list, create a GitLab connection that uses that credential. Name it. Provider and instance stay fixed after you save an existing connection.
3. Browse projects and add the ones this workspace should use. Confirm the clone URL and default branch.
4. Authorize each employee that should use the credential.

An empty list, 403, or 404 means the token, membership, group policy, or instance address needs a check. It does not mean an organization approval is waiting in the background. A deploy token cannot replace the API access token. SSO and administrator policy still have to be completed in GitLab.

## What you can do afterward

An authorized employee can use the token's GitLab permissions inside a task that references the credential. Reading the project list does not by itself let the employee push. Grant the employee, and give the token `read_repository` when the task needs to fetch.

On the delivery project, add a work-item source, choose GitLab Issues, and select a repository already bound to that project. Save, then open the source to read issues. Pipeline providers on the board are GitHub Actions and Yunxiao Flow. See [CI/CD integration](/software-factory/cicd/).

## Permissions and credentials

API listing usually needs `read_api`. Git fetch needs `read_repository`. Grant only the scopes this workspace will use. The token is encrypted with the other workspace credentials. Deleting it here does not revoke it in GitLab and does not stop a running session. Remove employee grants and repository references before the platform will delete the credential.

The credential belongs to the workspace. The creator is recorded, and anyone with the current workspace access to credentials can manage it.

## Limits

There is no GitLab event poll, no merge-request trigger, and no GitLab issue import into Task inbox. Issue reads on the delivery project are read-only. The built-in pull request viewer is for connected GitHub repositories. Being able to browse a GitLab project does not mean every delivery adapter runs against that instance. Confirm the project, the employee grant, and the pipeline you actually configured.

## Related guides

- [Integration directory](/integrations/overview/)
- [Code repositories](/integrations/code-repositories/)
- [CI/CD integration](/software-factory/cicd/)
- [Software Factory overview](/software-factory/overview/)
