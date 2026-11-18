---
title: "Sentry"
description: "在个人连接上接收 Sentry Issue 事件，并在已启用的规则匹配时启动 Job。"
status: limited
sidebar:
  label: Sentry
  badge:
    text: 部分支持
    variant: caution
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "e6c8a80b6bd73317bbc972b813317d8cdc010fcfd427d7299ec6b359871efa63"
---

Sentry 是接收 Issue 事件的监控连接。连接属于你本人，并且只在一个工作空间里。Issue 事件匹配已启用的规则时，可以运行一个已发布的 Job。这条连接不会更新 Sentry Issue，不会指派负责人，也不会自己生成调研报告。

## 它是什么

你在 Sentry 注册一个 Internal Integration，并保存组织、安装 ID、API Token 和 Client Secret。AI Workforce 向 Sentry 核对这份身份，然后给出要贴回该集成的 Webhook 地址。只接受这个安装上的 Issue hook。

## 何时使用

新的、已解决、已分配、已归档或重新变为未解决的 Issue 应该唤醒员工时，使用 Sentry。事件类告警用 [PagerDuty](/zh-cn/integrations/pagerduty/)。工作是「到点再检查一次」，而不是「这个 Issue 变了」时，使用日程。两种触发都写在[调研与监控](/zh-cn/workflows/research-monitoring/)里。

## 两边交换什么

Sentry 把 Issue 事件送到部署。平台校验签名和安装身份，再保存规范化后的事件。Job 可以看到 Issue ID、标题、项目、级别、链接；如果是回归，还可以看到未解决的子状态。预览样例使用同样的形状，不表示真实 Webhook 已经送达。

支持的事件是 Issue 创建、解决、分配、归档和未解决。Sentry 的归档通知以 ignored 动作到来，平台记成已归档。回归以未解决到来，子状态是 `regressed`。

一条规则可以放一到十二条条件。每条条件是一种事件类型加上它的筛选项。这条条件上的每个筛选项都要匹配，任意一条条件匹配就会入场。筛选项可以要求项目 ID、级别、标题中的一段文字，以及子状态。某个筛选项不该收窄事件时，就不要设置它。没有环境筛选，因为 Issue hook 不提供可靠的环境字段。

## 如何连接

1. 在 Sentry 创建 Internal Integration。允许 Organization Read、Issue & Event Read 和 Project Read。复制安装 UUID。这个 UUID 是安装实例，不是应用 ID，也不是 Client ID。
2. 打开工作空间的「集成」，选择 Sentry，添加连接。这条连接供你在此空间的自动化使用。
3. 起名。Sentry 地址填 `https://sentry.io`、`https://us.sentry.io` 或 `https://de.sentry.io`。填写组织 slug 和安装 UUID。
4. 填写 Internal Integration 的 API Token 和 Client Secret。保存。地址、组织和安装在保存后固定。换组织要新建连接。
5. 验证。验证会调用 Sentry，核对组织和安装。有未保存的修改时先保存再验证。网络或限流失败会记下健康错误，不会清掉已经成功的授权。认证或身份失败会把连接标成授权异常。
6. 打开 Webhook 配置。把地址贴进 Internal Integration，启用 Issue webhook，并让这条连接上的 Client Secret 与 Sentry 的保持一致。产品不会去配置 Sentry 的旧 Webhooks 插件，也不会把 Token 放进 URL。
7. 在 Job 上选择 Sentry 事件、这条连接，以及项目或标题条件。发布 Job 并启用规则。

部署要有公网 HTTPS 地址，才能给出 Webhook URL。不接受自建 Sentry。

## 连接之后能做什么

匹配的事件启动 Job。员工使用自己的工具。事件载荷是不可信输入，不会增加权限。同一个 Job 也可以按日程运行。先阅读运行，再把结果当成修复。这条连接不会去解决 Sentry Issue。

删除连接后不再接收新事件。Sentry 里的 Webhook 也要一并去掉。已有的事件来源此后无法通过授权检查。

## 权限与凭据

Token 和 Client Secret 加密保存。API 不返回它们。你是所有者时，可以在连接页面查看已保存的密钥。其他工作空间成员不能使用你的连接，管理员也不行。管理自己的连接，仍然需要该工作空间的执行权限。

Token 需要上面的组织、项目和 Issue 读取权限。Client Secret 用来校验 `Sentry-Hook-Signature`。Hook 里的安装 UUID 必须和你保存的一致。第一条事件不会替你绑定一个空的安装。

## 限制

没有 OAuth 安装向导，不会写回 Sentry，不会自动授予 MCP，也没有历史回填。Webhook 是否送达，不会被存成一份已核实的远端健康结果。界面会说明 Webhook 仍要在 Sentry 里确认。Issue hook 不提供环境筛选。签名后完全相同的正文会被当成同一次投递。真实回归通常会改变 last seen 或 count 一类字段，从而得到新的身份。

只处理 Issue 这一类资源。其他 Sentry 资源在确认后忽略。未验证或已停用的连接会拒绝事件。来源暂停时保留身份，但不运行 Job。重新打开后，旧事件不会重放。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [PagerDuty](/zh-cn/integrations/pagerduty/)
- [调研与监控](/zh-cn/workflows/research-monitoring/)
- [事件驱动自动化](/zh-cn/automate/event-driven/)
