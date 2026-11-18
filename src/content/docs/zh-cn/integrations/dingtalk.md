---
title: "钉钉"
description: "通过 Stream 长连接或 HTTP 回调接收钉钉机器人消息，并由允许的发送者启动 Job。"
sidebar:
  label: 钉钉
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "add15471cf28846f1bec92622043a6c6522cbd4e1d4e04f8dbd5e2176b6ca052"
---

钉钉是一条消息渠道。机器人接收企业里的消息，并用文本回复。自动化写明会话和发送者之后，它也可以启动一个 Job。钉钉不运行工作流、看板或交付泳道。

## 它是什么

在钉钉开放平台创建企业内部应用，启用机器人，再把应用凭据保存到 AI Workforce。Stream 模式保持长连接，平台不需要公网回调。HTTP 模式通过公开的 HTTPS 地址接收消息。

## 何时使用

对话已经在钉钉里时使用它。飞书或 Lark 见[飞书与 Lark](/zh-cn/integrations/feishu/)，企业微信用[企业微信](/zh-cn/integrations/wecom/)。要在消息、日程和其他事件之间选择时，看[事件驱动自动化](/zh-cn/automate/event-driven/)。

## 两边交换什么

机器人可以接收文本和富文本。平台发出的回复和通知是文本。群聊里需要 @机器人。主会话只接受你填写的那个企业成员 ID 发来的消息，第一条私聊会确定这个会话的回复目标。

自动化收到消息正文、会话 ID 和发送者 ID。它收不到应用密钥。触发器上的发送者名单，和主会话上的成员 ID，是两处配置。

## 如何连接

1. 在钉钉开放平台创建企业内部应用，启用机器人并发布。不想暴露公网地址时选 Stream；要让钉钉调用你的部署时选 HTTP。
2. 打开「连接消息渠道」，选择钉钉。钉钉和其他聊天渠道在同一个对话框里。
3. 填写 Client ID（也叫 AppKey）、Client Secret（也叫 AppSecret），以及你自己的企业成员 User ID。
4. 需要在渠道列表里区分时，给渠道起名。保存。
5. HTTP 模式要把回调路径 `/api/im/dingtalk/webhook` 配到部署可公开访问的 HTTPS 地址上，并打开钉钉要求的消息事件。
6. 先给机器人发一条私聊，让主会话有回复目标。

保存时会校验这类渠道的凭据。密钥随渠道保存，渠道列表不会把它显示出来。

## 连接之后能做什么

在允许范围内的人可以和主员工对话。Job 上添加 IM 触发，选择这条渠道，填写一个会话 ID，并列出允许启动运行的发送者 ID。消息触发必须有这个会话 ID，不能订阅所有会话。发送者最多 100 个。

Job 仍使用它自己的员工和工具。一条钉钉消息不会带来仓库权限，也不会允许去改外部事项。

## 权限与凭据

Client ID 和 Client Secret 来自钉钉应用凭证。成员 User ID 决定主会话接受谁。自动化的发送者配在触发器上，所以消息即使到了机器人，发送者不在名单里也不会启动 Job。

密钥泄露时，在钉钉轮换，再把渠道保存一遍。在 AI Workforce 里删除渠道，不会删除钉钉应用。

## 限制

钉钉是聊天渠道。它没有事项导入，没有代码连接，也没有自己的工作流。HTTP 模式要求部署能在公网 HTTPS 回调上被访问。Stream 模式也不免除钉钉自己的应用发布要求。群里回复仍然依赖 @机器人。其他产品上的 Webhook 通知是另一种模式。钉钉的两种模式都会接收消息。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [事件驱动自动化](/zh-cn/automate/event-driven/)
- [Slack](/zh-cn/integrations/slack/)
- [飞书与 Lark](/zh-cn/integrations/feishu/)
