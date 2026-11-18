---
title: "GitHub"
description: "Connect GitHub repositories with a personal access token, poll issue and pull request activity, and import open issues."
sidebar:
  label: GitHub
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

GitHub is a code-host connection and an event source. A workspace token can list repositories you can access, an employee can use that token only after an explicit grant, and a Job can react to activity the platform observes by polling GitHub. The poller reads. It does not comment, label, review, close, or push.

Use this page for GitHub.com and for a GitHub Enterprise instance you enter as an HTTPS origin. The shared credential rules are in [code repositories](/integrations/code-repositories/).

## What it is

The connection stores a personal access token for one GitHub origin, then points at repositories that token can see. Event rules watch one connected repository and admit a matching observation as a Job run. Issue import copies open issues into Task inbox. A Software Factory project can also name a GitHub Actions workflow as a pipeline the board records.

## When to use it

Use GitHub when the repository to read or change is on GitHub, when a Job should wake up for issue, pull request, review, comment, branch, or completed Actions activity, or when open issues should land in the inbox. Use [GitLab](/integrations/gitlab/) or [Yunxiao Codeup](/integrations/yunxiao/) for those hosts. Use [Jira](/integrations/jira/) or [Linear](/integrations/linear/) only for the administrator-connected import those products have.

## What moves between the systems

Repository discovery stores the native repository id, path, web URL, clone URL, and default branch. Secrets stay out of those addresses.

A poll reads GitHub REST and stores a whitelisted event. The Job input is an envelope with `schema_version`, `id`, `source_id`, `type`, `received_at`, and `data`. The token, model, and working directory are not copied into that input. The commit SHA in the event is a fact from GitHub. It does not mean the runtime has checked out that commit.

Issue import copies the title, body, source key, status, and URL. Bodies longer than 20,000 characters are truncated and keep the original link. Comments, attachments, and subtask relationships stay on GitHub.

| Activity the poll can observe                             | What the rule can filter on                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------- |
| Issue opened, closed, reopened, labeled, unlabeled        | Labels                                                                    |
| Issue comment created                                     | Comment text, author association                                          |
| Pull request opened, updated, ready for review            | Target branch. Open and update can also filter draft state                |
| Pull request closed, merged, reopened, labeled, unlabeled | Labels                                                                    |
| Pull request conversation comment                         | Comment text, author association                                          |
| Review submitted or dismissed                             | Submitted reviews can filter on approved, changes requested, or commented |
| Review line comment                                       | Comment text, author association                                          |
| Branch push                                               | Branch pattern. The actor is unknown                                      |
| Actions workflow completed                                | Branch, workflow name, conclusion                                         |

Comment events default to the associations owner, member, and collaborator, and they skip bots. A rule holds one to twelve event conditions. Any matching condition admits the event. Every filter on a single condition has to match.

## Connect it

### Repository access

1. Open the workspace's **External service credentials** and add a GitHub personal access token. The instance is `https://github.com`, or the HTTPS origin of your GitHub Enterprise Server, with no user, password, path, query, or fragment.
2. Open **Integrations** or the workspace repository list. Create a connection that references that credential, and name the connection. The connection belongs to the workspace.
3. Browse the repositories the token can access and add the ones this workspace should use. Check the clone URL and default branch.
4. On the credential, authorize each employee that should use it. Workspace members who can manage credentials can change the metadata and the grants. The management response does not return the secret.

Organization repositories can require an organization administrator's approval. For a fine-grained token, choose the resource owner first, then the repositories. Typing an organization name into the repository search does not switch the owner. A classic token is available only when the organization policy allows it, and it may still need SSO authorization.

### Event rules

1. Create or open the Job. Choose a GitHub event.
2. Select the repository by name or owner. An existing source is reused. If the repository is not connected yet, the picker uses a connection you can access. The Job stores a reference to that connection. It does not copy the token.
3. Pick the event and the narrowest condition. A new rule is saved disabled.
4. Preview a sample. Preview checks the match and the input schema. It does not create a run and does not post to GitHub.
5. Publish the Job, then enable the rule. The first successful read only records a baseline.

### Issue import

1. Open **Import tasks** and choose GitHub.
2. Select an enabled GitHub token saved for this workspace. This picker accepts github.com tokens. A GitHub Enterprise token is not listed here.
3. Choose a repository where that token can read issues.
4. Select open issues and import. Each batch accepts at most 25. Already imported items are skipped.

## What you can do afterward

An authorized employee can use the permissions the token actually has: read a file, and write or push when both the token and the grant allow it. A personal Git credential on the machine does not replace that workspace grant.

A matching event starts one run of the published Job. From there, [issue automation](/workflows/issue-automation/) and [pull request automation](/workflows/pull-request-automation/) describe how a person confirms work before delivery. The built-in pull request viewer applies to connected GitHub repositories.

On a Software Factory project, GitHub Actions can be selected as the pipeline the board records. That binding is separate from the "workflow completed" poll. See [CI/CD integration](/software-factory/cicd/).

## Permissions and credentials

Choose the token scopes for the operation. Metadata read does not make code or issues readable.

| Operation                             | Fine-grained access to include |
| ------------------------------------- | ------------------------------ |
| List and read file contents, branches | Contents: Read                 |
| Issues and issue comments             | Issues: Read                   |
| Pull requests, reviews, line comments | Pull requests: Read            |
| Completed Actions runs                | Actions: Read                  |

The exact reads depend on which rules are enabled. GitHub Enterprise calls that instance's `/api/v3`. Each poll checks workspace execute permission, the repository-to-connection link, token ownership, and that the source is still enabled. Reading events does not grant the employee Git write access.

The token is encrypted. Deleting it in AI Workforce does not revoke it on GitHub and does not stop a session that has already started. Revoke or rotate the token on GitHub when that is the goal. A credential that is still referenced by a connection, a grant, a delivery project, or unfinished work cannot be deleted until those references are removed.

## Limits

Polling is not a webhook stream. After a successful sync, the same source waits at least 60 seconds. Rate limits, network delays, and the number of sources stretch that interval. A rate limit waits at least 15 minutes and does not advance the cursor. Each list stops at 10 pages of 100 items. An incomplete list, or a poll that runs longer than 45 seconds, keeps the previous cursor and surfaces an error.

The first successful read establishes a baseline. History before that read is not replayed. Pausing the source drops events that have not been admitted. Resuming starts a new baseline and does not catch up. Turning every rule for one event type off drops that feed's baseline. The next subscription starts clean.

A pull request that opens and closes between two polls can be missed, because open pull requests are compared as a snapshot. Issue open uses issues in every state, so an issue that is opened and closed quickly can still be seen. Branch comparison uses the current SHA. A deletion or a tag does not trigger. A branch that moves from A to B and back to A can trigger again. The pull request update actor is the pull request author, with that limitation recorded on the event. The branch actor is unknown, so a Job that pushes to a watched branch can observe itself. Give that Job a separate output branch.

Review scans cover pull requests updated in the last seven days. Pending reviews do not trigger. A review that is submitted and dismissed between polls is not reconstructed. Actions reads workflow runs created in the last seven days, distinguished by run id and attempt. `Checks completed` and resolved or unresolved review threads are not events. User allowlists, comment regular expressions, and one rule that subscribes to many repositories are not part of this release. There is no GitHub App, no repository webhook, no historical backfill, and no manual replay.

Bot authors do not trigger issue, pull request, comment, review, or workflow events.

Issue import does not migrate comments, attachments, or subtasks, does not keep syncing, and does not write back. Closed issues are not offered. Repeating an import skips the existing inbox record and keeps later edits.

## Related guides

- [Integration directory](/integrations/overview/)
- [Code repositories](/integrations/code-repositories/)
- [Issue automation](/workflows/issue-automation/)
- [Pull request automation](/workflows/pull-request-automation/)
- [Event-driven automation](/automate/event-driven/)
