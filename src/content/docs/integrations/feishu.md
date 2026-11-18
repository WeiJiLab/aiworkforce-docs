---
title: "Feishu and Lark"
description: "Chat through the platform Feishu or Lark app, and start a Job when a Feishu Minutes transcript is ready."
status: limited
sidebar:
  label: Feishu
  badge:
    text: Limited
    variant: caution
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Feishu and Lark are one connection family. Lark is the same platform app and the same personal authorization when the account brand is Lark. The product shows the brand on the connection. It does not add a second setup.

Two uses are separate. Chat reaches the primary employee through a platform app an administrator has enabled. Feishu Minutes starts a Job from a personal authorization, by polling for a ready transcript. The Minutes summary stays in the Job result.

## What it is

Chat is a messaging channel. After the platform app is enabled, a person scans a QR code in Feishu or Lark and binds their identity. They do not paste an app secret.

Minutes is an event source on a Job. The platform looks for Minutes the authorized person created or joined, exports a ready transcript, and runs the Job. A title keyword can narrow which Minutes match.

## When to use it

Use chat when someone should talk to the primary employee from Feishu or Lark. Use Minutes when a meeting transcript should become a reviewed summary inside a run. Use [DingTalk](/integrations/dingtalk/), [Slack](/integrations/slack/), or another channel page when the conversation lives there. Use [event-driven automation](/automate/event-driven/) for the Job rules that are not specific to Feishu.

## What moves between the systems

A chat message can reach the bound primary session. An automation trigger, where the channel accepts inbound messages, can pass the message text, the conversation id, and the sender id into one Job. The channel does not send the workspace token or the employee grant.

A Minutes event carries the minute token, title, URL, and transcript. The transcript in the event is the material the Job reads. Instructions that appear inside the transcript are content, not a replacement for the Job's task. The summary is stored with the run. The Minutes poll does not post the summary back to Feishu, send a chat message, or create a Feishu document.

## Connect it

### Chat

1. An administrator opens the platform Feishu settings, scans to create or bind the Feishu or Lark app, and enables it. Binding a new app invalidates previous user identities and task-group routes. Those people authorize again.
2. Open **Integrations** or **message channels**, choose Feishu, and scan with the Feishu or Lark mobile app. The QR code expires and can be refreshed. You do not enter an app secret.
3. After the identity is connected, turn chat on if the screen still asks for that step. Send a message to the bot to continue the primary session.

Missing document, meeting, or Minutes permissions on the app do not block chat. Those operations wait until the administrator completes the permission check.

### Minutes

1. In personal Feishu settings, finish the user authorization until the connection status is connected. A Lark account is labeled Lark.
2. On the Job, choose the Feishu Minutes trigger and select that personal connection. The source is created for you if this connection does not have one yet.
3. Optionally set a title keyword, up to 200 characters. Leave it empty to accept any title.
4. Publish the Job and enable the rule. The first successful sync only records a baseline.

Only the source owner manages that source. If the previous source disappears, select the connection again.

## What you can do afterward

Chat continues in the primary session. For an automation, choose this channel, one conversation id, and the sender ids allowed to start the Job. A message subscription needs a specific conversation. It does not accept every conversation.

The Minutes Job receives the transcript and returns the summary in the run. The featured template asks for conclusions, decisions, action items, and open questions, and it keeps the summary inside the run. Read the run before anyone treats the draft as the meeting record. Pausing the source blocks new runs for every rule on it. Resuming builds a new baseline and does not catch up on Minutes from the pause.

Feishu tools on an employee, including tools that read Minutes the employee is allowed to open, are configured on the employee. See [tools and connectors](/integrations/employee-tools/). A managed Feishu MCP entry uses that managed authorization. Do not paste a private app secret into it.

## Permissions and credentials

Users do not handle the platform app secret. Administrators enable the app and complete Feishu's permission confirmation when Feishu asks for it. The Minutes authorization is a user grant on that person's Feishu or Lark account. The Job only lists connections that are connected. Another person's connection is not a source you can select.

Chat permissions and Minutes permissions are independent. A working chat does not mean Minutes export is allowed, and a Minutes grant does not by itself bind the primary session.

## Limits

Minutes are polled about once a minute, over the last seven days. The first sync does not replay older Minutes. Each round exports one transcript. A transcript that is not ready is retried on a later round. The full transcript is limited to 400 KB. If more than the pending queue can hold shows up inside seven days, the cursor stays put or defers the overflow until an export frees a slot. There is no Feishu webhook for this event.

The summary is not written back to the Minute, to a chat, or to a new Feishu document by this trigger. Employee tools that can write to Feishu are a separate grant, and the Minutes template tells the employee not to use them.

Feishu is a chat channel and a Minutes trigger. It is not a board, a code host, or a workflow engine.

## Related guides

- [Integration directory](/integrations/overview/)
- [Event-driven automation](/automate/event-driven/)
- [Tools and connectors](/integrations/employee-tools/)
- [AI employees](/user-guide/ai-employees/)
