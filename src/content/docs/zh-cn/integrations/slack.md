---
title: "Slack"
description: "通过 Socket Mode 或 Events API 接收 Slack 消息，或向一个频道发送通知。"
sidebar:
  label: Slack
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "29ba0d553092744684c20a9ba76a89f8147f5aae0d0f1d82ef62cb4f050d86d7"
---

Slack 是一条消息渠道。Socket Mode 和 Events API 能接收消息，也可以启动 Job。Incoming Webhook 模式只向一个频道发通知。Slack 不能代替 Job、看板或代码托管。

## 它是什么

你创建一个 Slack 应用，安装到工作空间，再填入 AI Workforce 要求的 Token。Socket Mode 保持长连接，并识别工作空间。Events API 在公开的 HTTPS 回调上接收事件，并用 Signing Secret 校验来源。Webhook 模式保存一条 incoming webhook 地址，向该地址对应的频道发通知。

## 何时使用

部署不想暴露公网回调时用 Socket Mode。希望 Slack 来调用部署时用 Events API。只需要往固定频道发一条通知时用 Webhook 模式。对话在钉钉或 Teams 时，看[钉钉](/zh-cn/integrations/dingtalk/)和 [Microsoft Teams](/zh-cn/integrations/microsoft-teams/)。

## 两边交换什么

入站模式可以把消息事件送到主会话，也可以送到自动化。Job 输入包含供应商、渠道、事件 ID、会话 ID、发送者 ID 和正文。应用订阅了频道创建时，Slack 还可以发出 channel-created 事件。Webhook 模式只向外发通知，不接收消息，因此不能当作自动化的事件来源。

通过 Socket Mode 绑定主会话时，填写的成员 ID 用于限定发送者。保存后给机器人发一条私聊，让会话获得回复目标。Events API 表单使用工作空间 ID、Bot Token 和签名密钥。

## 如何连接

按使用场景选择入口。**连接消息渠道**保存自动化连接。主会话的**消息渠道**保存主会话绑定。见[消息渠道](/zh-cn/integrations/overview/#消息渠道)。

1. 在 Slack API 控制台创建应用，并安装到工作空间。
2. 在所选入口选择 Slack。
3. 选择模式，填写该模式的凭据。

| 模式        | 要填写的内容                                                                                               | Slack 侧还要做的事                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Socket Mode | Bot User OAuth Token（`xoxb-`）、带 `connections:write` 的应用级 Token（`xapp-`），以及你的成员 ID（`U…`） | 打开 Socket Mode 和 App Home 的消息页，并完成下面的事件订阅         |
| Events API  | 工作空间 ID（`T…`）、Bot User OAuth Token、Signing Secret                                                  | 把公开 HTTPS 回调指到 `/api/im/slack/webhook`，并把应用加入目标频道 |
| Webhook     | 连接标识，以及 incoming webhook 地址                                                                       | Slack 把该地址绑到的那个频道                                        |

Socket Mode 要订阅 `message.im`、`message.channels`、`message.groups` 和 `app_mention`。授权 `chat:write`、`im:history`、`channels:history`、`groups:history` 和 `app_mentions:read`。新频道也要启动 Job 时，再加上 `channel_created` 和 `channels:read`。改完权限后重新安装应用。保存 Socket Mode 连接时会校验凭据并记下工作空间。

Events API 要授予消息读取和 `chat:write`。只有需要这个触发时才订阅 `channel_created`。

Webhook 模式要求目标 ID 和该地址背后的频道一致。另外两种模式可以从第一条入站消息得知回复目标，也可以事先填写用户或频道 ID。

## 连接之后能做什么

被允许的 Slack 成员可以和主员工对话。Job 上选择这条渠道、会话 ID，以及允许启动运行的发送者 ID。消息订阅必须指定一个会话 ID。只有事件是「频道已创建」、并且规则不同时订阅消息时，会话才可以填 `*`。发送者最多 100 个。只有 Webhook 的连接没有入站事件可选。

Job 使用自己的员工和工具。一条 Slack 消息不会带来代码或事项权限。

## 权限与凭据

Bot Token、应用级 Token 都是密钥。Signing Secret 用来校验 Events API 的投递。把它们放在渠道上，不要写进 Skill 或聊天。在 Slack 里改范围之后，要重新安装，新事件才会到来。在 AI Workforce 里删除渠道，不会卸载 Slack 应用，也不会撤销 Token。要在 Slack 里撤销。

## 限制

Webhook 模式不能接收消息，也不能启动自动化。Socket Mode 和 Events API 不能事后互换，需要哪种就按那种重建连接。没有 Slack 事项同步，没有仓库连接，AI Workforce 里也没有一套 Slack 工作流产品。渠道负责把对话送过来。工作由 Job 完成。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [事件驱动自动化](/zh-cn/automate/event-driven/)
- [钉钉](/zh-cn/integrations/dingtalk/)
- [Microsoft Teams](/zh-cn/integrations/microsoft-teams/)
