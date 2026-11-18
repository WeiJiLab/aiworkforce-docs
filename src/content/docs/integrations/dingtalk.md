---
title: "DingTalk"
description: "Receive DingTalk bot messages over a Stream connection or an HTTP callback, and start a Job from an allowed sender."
sidebar:
  label: DingTalk
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

DingTalk is a messaging channel. A bot receives messages from your enterprise and can reply with text. It can also start a Job when an automation names the conversation and the sender. DingTalk does not run the workflow, the board, or the delivery lanes.

## What it is

You create an internal enterprise app on the DingTalk open platform, enable its bot, and save the app credentials in AI Workforce. Stream mode keeps a long connection, so the platform does not need a public callback. HTTP mode receives messages at a public HTTPS address.

## When to use it

Use DingTalk when the conversation is already in DingTalk. Use [Feishu and Lark](/integrations/feishu/) or [WeCom](/integrations/wecom/) for those products. Use [event-driven automation](/automate/event-driven/) when you are deciding between a message, a schedule, and another event.

## What moves between the systems

The bot can receive text and rich text. Replies and notices the platform sends are text. A group message has to mention the bot. The primary session accepts messages from the enterprise member id you enter, and the first private message sets the reply target for that session.

An automation receives the message text, the conversation id, and the sender id. It does not receive the app secret. The sender list on the trigger is separate from the member id on the primary session.

## Connect it

1. On the DingTalk open platform, create an internal enterprise app, enable the bot, and publish it. Choose Stream to avoid a public URL, or HTTP if DingTalk should call your deployment.
2. Open **Connect a messaging channel** and choose DingTalk. DingTalk is in that dialog with the other chat providers.
3. Enter the Client ID (also called AppKey), the Client Secret (also called AppSecret), and your own enterprise member User ID.
4. Name the channel if you want it labeled in the channel list. Save.
5. For HTTP mode, copy the callback path `/api/im/dingtalk/webhook` onto a publicly reachable HTTPS address in the DingTalk app, and enable the message events DingTalk requires.
6. Send the bot a private message so the primary session has a reply target.

Saving verifies the credentials for this provider. The secret is stored with the channel and is not shown back as part of the channel list.

## What you can do afterward

People in the allowed scope can talk to the primary employee. For a Job, add an IM trigger, select this channel, set one conversation id, and list the sender ids allowed to start a run. A message trigger needs that conversation id. It cannot subscribe to every conversation. Up to 100 sender ids can be listed.

The Job then runs under its own employee and tools. A DingTalk message does not grant repository access or permission to change an external issue.

## Permissions and credentials

The Client ID and Client Secret come from the DingTalk app credentials. The member User ID limits which person the primary session accepts. Automation senders are configured on the trigger, so a message that reaches the bot can still fail to start a Job when the sender is not listed.

Rotate the secret in DingTalk and save the channel again when the secret leaks. Removing the channel in AI Workforce does not delete the DingTalk app.

## Limits

DingTalk is a chat channel. It has no issue import, no code connection, and no workflow of its own. HTTP mode works only when the deployment is reachable at the public HTTPS callback. Stream mode does not remove DingTalk's own requirement to publish the app. Group replies still depend on mentioning the bot. Webhook-style notification channels on other providers are a different mode. DingTalk's two modes both receive messages.

## Related guides

- [Integration directory](/integrations/overview/)
- [Event-driven automation](/automate/event-driven/)
- [Slack](/integrations/slack/)
- [Feishu and Lark](/integrations/feishu/)
