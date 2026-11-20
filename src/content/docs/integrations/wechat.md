---
title: "WeChat"
description: "Chat from personal WeChat by scanning a QR code, or receive Official Account messages with developer credentials."
sidebar:
  label: WeChat
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

WeChat is a messaging channel with two modes. Personal WeChat uses a QR confirmation and needs no app credentials. An Official Account uses developer credentials and WeChat's server callback. Sending from the Official Account follows WeChat's own customer-service rules. WeChat is not a team workflow engine.

## What it is

Personal mode links the phone account to the primary employee after you confirm the QR code. Official Account mode receives account messages at a public HTTPS callback and replies through WeChat's customer-service interface.

## When to use it

Use personal WeChat when one person should talk with the primary employee from WeChat. Use an Official Account when that account should receive messages. Use [WeCom](/integrations/wecom/) for enterprise WeCom apps and group bots.

## What moves between the systems

Personal chat carries the conversation to the primary session. An Official Account message can also be selected as an automation source when the channel is receiving events: the Job gets the text, conversation id, and sender id. The product does not import WeChat contacts, moments, or files as workspace tasks. Replies on the Official Account are limited to what WeChat allows for that interface.

## Connect it

Choose the setup surface for your purpose. **Connect a messaging channel** saves an Automation connection. **Messaging channels** in the primary session saves the primary session binding. See [Messaging](/integrations/overview/#messaging).

### Personal WeChat

1. Choose WeChat, then personal WeChat, in the selected setup screen.
2. Scan the QR code with WeChat on your phone and confirm. No App ID, secret, or callback URL is required.
3. Continue the conversation with the primary employee from that account.

### Official Account

1. In the WeChat Official Accounts Platform, open settings and development and copy the developer id and secret. Configure server message receiving.
2. In the channel dialog, choose the Official Account mode.
3. Enter the App ID, App Secret, and callback Token. If encrypted callbacks are on, also enter the EncodingAESKey. Plaintext mode can leave that key empty.
4. Save, then set the public callback to an HTTPS address ending in `/api/im/wechat/webhook`, and enable the message events in WeChat.

## What you can do afterward

The linked personal account can keep the primary session. An Official Account channel that receives events can be attached to a Job with one conversation id and the sender ids allowed to start a run. The message does not grant code access or other employee tools.

## Permissions and credentials

Personal mode stores the link created by the QR confirmation. It does not ask for a developer password. Official Account mode stores the App ID, App Secret, callback Token, and optional EncodingAESKey. Those values must match the Official Accounts Platform. Deleting the channel does not delete the Official Account. Change or reset the developer secret in WeChat when it should stop working.

## Limits

Personal WeChat is a private chat with the primary employee. It is not a group workspace and it does not subscribe to every WeChat conversation. Official Account replies depend on WeChat's customer-service rules, which can refuse a send even when the credential is valid. There is no WeChat issue import and no code connection.

## Related guides

- [Integration directory](/integrations/overview/)
- [WeCom](/integrations/wecom/)
- [Event-driven automation](/automate/event-driven/)
- [AI employees](/user-guide/ai-employees/)
