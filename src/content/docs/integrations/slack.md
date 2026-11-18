---
title: "Slack"
description: "Receive Slack messages over Socket Mode or the Events API, or post notifications to one channel."
sidebar:
  label: Slack
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Slack is a messaging channel. Socket Mode and the Events API receive messages and can start a Job. The incoming-webhook mode only posts to one channel. Slack does not replace the Job, the board, or a code host.

## What it is

You create a Slack app, install it in a workspace, and save the tokens AI Workforce asks for. Socket Mode keeps a long connection and detects the workspace. The Events API receives events at a public HTTPS callback and checks the signing secret. Webhook mode stores an incoming webhook URL and sends notifications to the channel that URL targets.

## When to use it

Use Socket Mode when the deployment should not expose a public callback. Use the Events API when Slack should call your deployment. Use webhook mode when the only need is a notification in a fixed channel. Use [DingTalk](/integrations/dingtalk/) or [Microsoft Teams](/integrations/microsoft-teams/) when the conversation is there.

## What moves between the systems

Inbound modes can deliver a message event to the primary session and to an automation. The Job input includes the provider, channel, event id, conversation id, sender id, and text. Slack can also emit a channel-created event when the app is subscribed to it. Webhook mode sends an outbound notification and does not receive messages, so it cannot be an automation event source.

The primary session accepts messages from the Slack member id you enter. For Socket Mode, send the bot a private message after saving so the session has a reply target.

## Connect it

1. Create the app at the Slack API console and install it in the workspace.
2. Open **Integrations** or **Connect a messaging channel** and choose Slack.
3. Pick the mode and enter the credentials for that mode.

| Mode        | What you enter                                                                                                   | What else Slack needs                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Socket Mode | Bot User OAuth Token (`xoxb-`), an app-level token (`xapp-`) with `connections:write`, and your member id (`U…`) | Socket Mode, the App Home Messages tab, and the event subscriptions below              |
| Events API  | Workspace id (`T…`), Bot User OAuth Token, and the Signing Secret                                                | A public HTTPS callback at `/api/im/slack/webhook`, plus the app in the target channel |
| Webhook     | A connection id and the incoming webhook URL                                                                     | The channel Slack bound to that URL                                                    |

For Socket Mode, subscribe to `message.im`, `message.channels`, `message.groups`, and `app_mention`. Grant `chat:write`, `im:history`, `channels:history`, `groups:history`, and `app_mentions:read`. Add `channel_created` and `channels:read` when a new channel should start a Job. Reinstall the app after permission changes. Saving a Socket Mode connection checks the credentials and records the workspace.

For the Events API, grant message read and `chat:write`. Subscribe to `channel_created` only when you need that trigger.

Webhook mode asks for a target id that matches the channel behind the URL. The other modes can learn the reply target from the first inbound message, or you can set a user or channel id in advance.

## What you can do afterward

Talk to the primary employee from the allowed Slack member. On a Job, select this channel, the conversation id, and the sender ids allowed to start a run. A message subscription needs one conversation id. A subscription to new channels can use `*` as the conversation only when the event is channel-created and the rule is not also subscribing to messages. List at most 100 sender ids. A webhook-only connection has no inbound events to select.

The Job uses its own employee and tools. A Slack message does not grant code or issue permissions.

## Permissions and credentials

Bot tokens and app tokens are secrets. The signing secret verifies Events API deliveries. Store them on the channel, not in a skill or a chat. Changing scopes in Slack requires a reinstall before the new events arrive. Deleting the channel in AI Workforce does not uninstall the Slack app or revoke the tokens. Revoke those in Slack.

## Limits

Webhook mode cannot receive messages and cannot start an automation. Socket Mode and the Events API are not interchangeable after the fact. Recreate the connection in the mode you need. There is no Slack issue sync, no repository connection, and no Slack workflow product inside AI Workforce. The channel carries the conversation. The Job does the work.

## Related guides

- [Integration directory](/integrations/overview/)
- [Event-driven automation](/automate/event-driven/)
- [DingTalk](/integrations/dingtalk/)
- [Microsoft Teams](/integrations/microsoft-teams/)
