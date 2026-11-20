---
title: "Microsoft Teams"
description: "通过机器人与一名允许的 Teams 用户私聊，或经由 Teams 工作流发送通知。"
sidebar:
  label: Microsoft Teams
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "4bed6a07c8eb26e661fa126dd5e9c1456d5ccdad692abfcbd5cefefd16f4633f"
---

Microsoft Teams 是一条消息渠道，两种模式做的事不一样。应用机器人只和一名允许的用户私聊。工作流模式向固定会话发通知，不接收消息。两种模式都不是 AI Workforce 里的 Teams 工作流引擎。

## 它是什么

机器人使用 Azure Bot 注册，并打开 Microsoft Teams 渠道。保存时 AI Workforce 会校验应用凭据。回复地址从第一次私聊得知。工作流模式保存的是 Teams 里接收 Webhook 请求的那条 HTTPS 地址，通知发到那里。

## 何时使用

一个人要从 Teams 和主员工说话时，用机器人。固定会话只需要收到通知、不需要回传时，用工作流模式。需要频道消息或「频道已创建」事件时，用 [Slack](/zh-cn/integrations/slack/)。

## 两边交换什么

允许的用户发给机器人的消息可以到达主会话，也可以启动 Job。Job 输入带有消息正文、会话 ID 和发送者 ID。不支持群聊。工作流模式向该地址对应的会话发送通知。它没有入站事件，不能选成自动化来源。

## 如何连接

按使用场景选择入口。**连接消息渠道**保存自动化连接。主会话的**消息渠道**保存主会话绑定。见[消息渠道](/zh-cn/integrations/overview/#消息渠道)。

### 应用机器人

1. 创建 Azure Bot，启用 Microsoft Teams 渠道，并把机器人作为个人应用安装到 Teams。
2. 在所选入口选择 Microsoft Teams，再选择应用机器人。
3. 填写 Microsoft App ID、应用注册里的客户端密码，以及允许的 Teams 用户。优先填这个用户的 Microsoft Entra 对象 ID。UPN 或邮箱只有在 Teams 消息真的带上该字段时才有效。
4. 单租户应用填写 Entra 目录 ID。多租户应用把租户留空。
5. 确认已填写**允许的 Teams 用户**，再保存。应用机器人表单要求填写该字段，并会检查 Microsoft 凭据。
6. 发一条私聊，回复地址才会被记下来。机器人上要公布的回调路径是 `/api/im/teams/webhook`，挂在部署的公网 HTTPS 域名上。

### 工作流通知

1. 在目标会话里创建接收 Webhook 请求的 Teams 工作流，并复制它的 HTTPS 地址。
2. 选择工作流模式。填写连接标识，并粘贴该地址。
3. 把投递目标设成同一个会话。目标必填，而且要和地址背后的会话一致。

## 连接之后能做什么

被允许的用户可以在这条私聊里继续主会话。Job 触发可以指定这个机器人渠道、一个会话 ID，以及允许启动运行的发送者 ID。消息正文是不可信输入。它不会扩大员工的授权。

工作流模式可以送出产品发出的通知。它听不到回复，也不能启动 Job。

## 权限与凭据

应用 ID 和客户端密码是 Azure Bot 的凭据。租户 ID 用来钉住单租户应用。允许的用户是唯一会被接受私聊的人。密钥放在渠道上。在 Azure 里轮换之后，要把新值保存到这里。删除渠道不会删除 Azure Bot。

## 限制

没有群聊，没有全团队订阅，也没有 Teams 的事项或代码连接。工作流模式只发通知。机器人模式需要公网 HTTPS 地址。保存时没填允许用户的渠道，在补上该字段之前一直不能接收消息。Teams 不提供飞书妙记、Slack 的频道创建事件，也没有自己的看板。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [事件驱动自动化](/zh-cn/automate/event-driven/)
- [Slack](/zh-cn/integrations/slack/)
- [监视与 Webhook](/zh-cn/automate/watchers-webhooks/)
