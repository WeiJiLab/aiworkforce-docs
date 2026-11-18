---
title: "Yunxiao Codeup"
description: "Connect Alibaba Cloud Yunxiao for Codeup repositories, Projex work items, and a Flow pipeline binding."
sidebar:
  label: Yunxiao
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Yunxiao is the code-host connection for Alibaba Cloud DevOps, plus a separate Projex import and an optional Flow pipeline binding. Codeup repository permission, Projex work-item permission, and Flow pipeline permission are different grants on the same Yunxiao token family. One of them does not imply the others.

Shared connection rules are in [code repositories](/integrations/code-repositories/).

## What it is

You connect either Yunxiao Central at `https://codeup.aliyun.com` or a Region instance whose host ends in `.devops.aliyuncs.com`. Central connections also store the organization's native id. The connection can list Codeup repositories. A person can import Projex work items into Task inbox with their own token and a project picker. A delivery project can bind a Flow pipeline for the board to record.

## When to use it

Use Yunxiao when the repository, the Projex project, or the Flow pipeline lives there. Use [GitHub](/integrations/github/) when you need polled issue and pull request events. Use [Jira](/integrations/jira/) or [Linear](/integrations/linear/) for those administrator-connected imports.

## What moves between the systems

Repository discovery stores the native repository id, path, web URL, clone URL, and default branch. Central calls `openapi-rdc.aliyuncs.com`. A Region instance calls `/oapi/v1` on that instance. Clone URLs stay free of credentials. Codeup connections require the Git username that actually logs in on Yunxiao.

Projex import reads organizations (Central only), projects, and work items in one category: task, requirement, or bug. The inbox item keeps the title, body, native id, original status, and URL when Yunxiao returns one. The platform does not invent a link. Search uses Yunxiao's read-only search. It does not create or edit work items. Comments, attachments, and continuous sync stay on Yunxiao.

A Flow binding stores the pipeline the board should observe. The release path still uses the pipeline tool configured on the project.

## Connect it

### Codeup repositories

1. Add a Yunxiao personal access token under **External service credentials**. Central tokens use `https://codeup.aliyun.com`. Region tokens must use the exact `https://<instance>.devops.aliyuncs.com` host.
2. Create a Codeup connection. Choose Central or Region. For Central, enter the native organization id. Enter the Git login name Yunxiao expects.
3. Browse repositories and add the ones this workspace should use.
4. Authorize each employee that should use the credential.

### Projex import

1. Open **Import tasks** and choose Yunxiao.
2. Select your enabled Yunxiao token. Add one in the dialog if you do not have it yet. The dialog stores it with the other encrypted workspace credentials and does not show the secret back.
3. For Central, choose the organization the token can access, then the Projex project. Region skips the organization step and uses the instance on the token.
4. Choose task, requirement, or bug. Select items and import. Each batch accepts at most 25.

Archived items, and items whose logical status is not normal, cannot be imported. Custom status names are left as Yunxiao reports them. The product does not guess which Chinese status means done.

### Flow on a delivery project

On the Software Factory project, select a Yunxiao Flow pipeline for the environment. Central asks for the organization. The picker loads pipelines from the Yunxiao service address you configure. The release employee still needs the pipeline tool selected for that environment. See [CI/CD integration](/software-factory/cicd/).

## What you can do afterward

An authorized employee can fetch and change Codeup repositories within the token's Codeup rights. Projex import creates Task inbox items and stops. It does not open a session or start development. Route a confirmed item through [issue automation](/workflows/issue-automation/) and the delivery board when the work should continue.

A delivery project can also read Projex as a work-item source, with its own project id, category id, edition, and token. That read is separate from the one-time inbox import.

## Permissions and credentials

Listing repositories, reading code, reading Projex work items, and Git fetch are authorized separately. A Codeup repository token that cannot read organizations, projects, and work items cannot import Projex. Create the token in the Yunxiao account settings for Central, or in the Region instance's personal access token settings.

The token is encrypted. Deleting it in the workspace does not revoke it in Yunxiao and does not stop a running session. Remove grants and connection references first when the platform blocks deletion.

## Limits

There is no Codeup or Projex event poll, and no write-back from import. The same work item imported again, even with another token or another category, is skipped. The identity is the instance, the organization, and the native work item id. Project and work-item search cover at most the first 10,000 matches. Organization listing uses the full list Yunxiao returns.

Central and Region cannot be mixed on one token. A Region token bound to the wrong host will not browse that enterprise. GitHub's pull request viewer does not apply to Codeup.

## Related guides

- [Integration directory](/integrations/overview/)
- [Code repositories](/integrations/code-repositories/)
- [Issue automation](/workflows/issue-automation/)
- [CI/CD integration](/software-factory/cicd/)
