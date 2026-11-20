---
title: "Microsoft Teams"
description: "Chat privately with one allowed Teams user through a bot, or send a notification through a Teams workflow."
sidebar:
  label: Microsoft Teams
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Microsoft Teams is a messaging channel with two modes that do different jobs. The app bot holds a private chat with one allowed user. The workflow mode posts a notification to a fixed conversation and does not receive messages. Neither mode is a Teams workflow engine inside AI Workforce.

## What it is

The bot uses an Azure Bot registration and the Microsoft Teams channel. AI Workforce checks the app credentials when you save. The reply address is learned from the first private chat. Workflow mode stores the HTTPS address of a Teams workflow that receives a webhook request, and sends notices there.

## When to use it

Use the bot when one person should talk to the primary employee from Teams. Use workflow mode when a fixed conversation should receive a notification and nothing needs to come back. Use [Slack](/integrations/slack/) when you need channel messages or a channel-created event.

## What moves between the systems

Bot messages from the allowed user can reach the primary session and can start a Job. The Job input carries the message text, conversation id, and sender id. Group chat is not supported. Workflow mode sends an outbound notification to the conversation bound to that URL. It has no inbound event, so it cannot be selected as an automation source.

## Connect it

Choose the setup surface for your purpose. **Connect a messaging channel** saves an Automation connection. **Messaging channels** in the primary session saves the primary session binding. See [Messaging](/integrations/overview/#messaging).

### App bot

1. Create an Azure Bot, enable the Microsoft Teams channel, and install the bot in Teams as a personal app.
2. Choose Microsoft Teams and select the app bot in the selected setup screen.
3. Enter the Microsoft App ID, the client secret from the app registration, and the allowed Teams user. Prefer that user's Microsoft Entra object id. A UPN or email works only when the Teams message actually includes that field.
4. For a single-tenant app, enter the Entra directory id. Leave the tenant empty for a multi-tenant app.
5. Confirm that **Allowed Teams user** is filled in, then save. The app-bot form requires this field and checks the Microsoft credentials.
6. Send a private chat so the reply address can be stored. The callback path to publish on the bot is `/api/im/teams/webhook`, on the deployment's public HTTPS origin.

### Workflow notifications

1. In the target conversation, create a Teams workflow that receives a webhook request, and copy its HTTPS URL.
2. Choose workflow mode. Set a connection id and paste the URL.
3. Set the delivery target to the same conversation. The target is required, and it has to match the conversation behind the URL.

## What you can do afterward

The allowed user can continue the primary session in that private chat. A Job trigger can name this bot channel, one conversation id, and the sender ids allowed to start a run. The message text is untrusted input. It does not widen the employee's grants.

Workflow mode can deliver a notice the product sends. It cannot hear a reply and cannot start a Job.

## Permissions and credentials

The app id and client secret are the Azure Bot credentials. The tenant id pins a single-tenant app. The allowed user is the only person whose private chat is accepted. Keep the secret on the channel. Rotating it in Azure requires saving the new value here. Deleting the channel does not delete the Azure Bot.

## Limits

There is no group chat, no team-wide subscription, and no Teams issue or code connection. Workflow mode is notify-only. The bot mode needs a public HTTPS endpoint. A channel saved without the allowed user stays unable to receive messages until that field is saved. Teams does not provide Feishu Minutes, Slack channel creation, or a board of its own.

## Related guides

- [Integration directory](/integrations/overview/)
- [Event-driven automation](/automate/event-driven/)
- [Slack](/integrations/slack/)
- [Watchers and webhooks](/automate/watchers-webhooks/)
