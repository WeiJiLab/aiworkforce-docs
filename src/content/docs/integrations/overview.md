---
title: "Integration directory"
description: "Open the guide for each connection AI Workforce supports, grouped the way the product groups them."
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

An integration is a named connection between AI Workforce and another system. Use it to make a repository available, to let an event start a Job, to import tasks, or to carry a conversation with an employee. A successful connection still needs the grant, the selected resource, and the enabled trigger that the task actually uses.

The groups below follow the product: code hosting, issue import, messaging, and monitoring. MCP, inbound webhooks, and employee tools already have their own guides. This directory links to them. ACP and A2A are not connections in this product.

## Code hosting

Workspace credentials, repository connections, and employee grants follow one model. Provider differences are on each host's page.

| Connection                                            | Use it when                                                                                              |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [GitHub](/integrations/github/)                       | The code lives on GitHub, or a Job should react to polled issue, pull request, review, or push activity. |
| [GitLab](/integrations/gitlab/)                       | The code lives on a GitLab instance, or a delivery project should read that instance's issues.           |
| [Yunxiao Codeup](/integrations/yunxiao/)              | The code or Projex work items live on Alibaba Cloud Yunxiao, including a Region instance.                |
| [Code repositories](/integrations/code-repositories/) | You need the shared rules for tokens, instances, discovery, and employee grants.                         |

## Issue import

GitHub and Yunxiao imports use a repository or project picker on the signed-in user's own token. Those steps are on the host pages above. Jira and Linear appear in the same import dialog only after an administrator has connected a source for that workspace.

| Connection                      | Use it when                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| [Jira](/integrations/jira/)     | An administrator has connected a Jira Cloud project, and you want open issues in Task Inbox. |
| [Linear](/integrations/linear/) | An administrator has connected a Linear team, and you want open issues in Task Inbox.        |

Import creates inbox tasks. It does not start a session, sync later changes, or write status back.

## Messaging

These are chat channels. A channel can reach the primary employee and, where the channel accepts inbound messages, start a Job from an allowed sender in one conversation. The channel does not replace the workflow, the board, or the Job.

| Connection                                        | Use it when                                                                                         |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Feishu and Lark](/integrations/feishu/)          | People chat through the platform Feishu or Lark app, or a Job should summarize Feishu Minutes.      |
| [DingTalk](/integrations/dingtalk/)               | A DingTalk bot should receive messages over Stream or an HTTP callback.                             |
| [Slack](/integrations/slack/)                     | A Slack app should receive messages over Socket Mode or the Events API, or post to one channel.     |
| [Microsoft Teams](/integrations/microsoft-teams/) | One allowed user should chat with a bot, or a Teams workflow should receive a notification.         |
| [WeCom](/integrations/wecom/)                     | An enterprise WeCom bot or custom app should exchange messages, or a group bot should post notices. |
| [WeChat](/integrations/wechat/)                   | A person should chat from personal WeChat, or an Official Account should receive messages.          |

Open **Integrations** for the cards the workspace catalog lists. DingTalk is chosen in the same **Connect a messaging channel** dialog as the other chat providers.

## Monitoring

A monitoring connection receives events for the person who created it in that workspace. It can start a published Job. It does not file a research report by itself, and it does not update the external incident.

| Connection                            | Use it when                                                              |
| ------------------------------------- | ------------------------------------------------------------------------ |
| [Sentry](/integrations/sentry/)       | A Sentry issue is created, resolved, assigned, archived, or unresolved.  |
| [PagerDuty](/integrations/pagerduty/) | A PagerDuty incident is triggered, acknowledged, resolved, or escalated. |

The Job that runs is the same Job model as a schedule. See [research and monitoring](/workflows/research-monitoring/).

## Tools and inbound calls

| Guide                                                 | Use it when                                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Tools and connectors](/integrations/employee-tools/) | An employee should call an external system through an installed MCP server.                       |
| [MCP integration](/integrations/mcp/)                 | A client should call registered Jobs through the platform MCP endpoint, or you run an MCP server. |
| [Webhooks](/integrations/webhooks/)                   | An external system should start one published Job with an inbound call.                           |
| [Watchers and webhooks](/automate/watchers-webhooks/) | You are attaching that inbound trigger on the Job.                                                |

## Related guides

- [Issue automation](/workflows/issue-automation/)
- [Pull request automation](/workflows/pull-request-automation/)
- [Event-driven automation](/automate/event-driven/)
