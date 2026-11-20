---
title: "WeCom"
description: "Receive WeCom messages with a smart bot or a custom app, or post a notice with a group bot."
sidebar:
  label: WeCom
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

WeCom (企业微信) is a messaging channel for an enterprise. A smart bot and a custom app can receive messages and reply. A group bot can only post a notice to one group. WeCom does not replace the Job or the delivery board.

## What it is

The smart bot stays connected over a WebSocket and does not need a public callback. The custom app receives encrypted callbacks and can send app messages to members. The group bot stores a webhook URL from the group and sends notifications there.

## When to use it

Use the smart bot when the deployment should not expose a callback. Use the custom app when WeCom should call your deployment and you need app messages. Use the group bot when a fixed group should receive notices and replies are not required. Use [DingTalk](/integrations/dingtalk/) or [WeChat](/integrations/wechat/) for those products.

## What moves between the systems

Inbound modes can pass a message to the primary session and, through an automation trigger, to a Job. The Job receives the text, conversation id, and sender id. The group-bot mode sends an outbound notice. It does not receive messages and cannot be an automation event source.

## Connect it

Choose the setup surface for your purpose. **Connect a messaging channel** saves an Automation connection. **Messaging channels** in the primary session saves the primary session binding. See [Messaging](/integrations/overview/#messaging).

1. In the WeCom admin console, create the smart bot, the custom app, or the group bot.
2. Choose WeCom in the selected setup screen.
3. Enter the credentials for the mode.

| Mode       | What you enter                                                                     | Callback                                           |
| ---------- | ---------------------------------------------------------------------------------- | -------------------------------------------------- |
| Smart bot  | Bot ID and Bot Secret from the bot's API mode                                      | None. The connection is a WebSocket                |
| Custom app | Corp ID, app Secret, Agent ID, callback Token, and the 43-character EncodingAESKey | Public HTTPS address using `/api/im/wecom/webhook` |
| Group bot  | A connection id and the group bot webhook URL                                      | None. This mode only sends                         |

The callback Token and EncodingAESKey must match the message-receiving settings in WeCom. For the group bot, the delivery target has to be the group behind that URL. The other modes can learn a reply target from the first inbound message, or you can set a user or group id before sending a notice.

## What you can do afterward

Members who reach an inbound channel can talk to the primary employee. A Job can select the channel, one conversation id, and up to 100 sender ids. A message subscription needs a specific conversation id. The employee's tools and repository grants are unchanged by the chat connection.

## Permissions and credentials

Bot secrets, app secrets, callback tokens, and EncodingAESKey values are stored with the channel. Corp ID and Agent ID identify the enterprise app. Deleting the channel in AI Workforce does not delete the WeCom app or the group bot. Revoke those in WeCom when the secret should stop working upstream.

## Limits

The group bot cannot hear replies and cannot start a Job. The custom app needs a public HTTPS callback and encrypted message settings that match WeCom. There is no WeCom issue import, code connection, or workflow product. Chat is the integration. The Job is the work.

## Related guides

- [Integration directory](/integrations/overview/)
- [Event-driven automation](/automate/event-driven/)
- [DingTalk](/integrations/dingtalk/)
- [WeChat](/integrations/wechat/)
