---
title: "PagerDuty"
description: "在个人连接上接收 PagerDuty 事件，并在已启用的规则匹配时启动 Job。"
status: limited
sidebar:
  label: PagerDuty
  badge:
    text: 部分支持
    variant: caution
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "400708cf518244b9056117ab1da5eac11c262b201eeafa021295e45fd995c7e9"
---

PagerDuty 是接收 Incident 事件的监控连接。连接属于你本人，并且只在一个工作空间里。事件匹配已启用的规则时，可以运行一个已发布的 Job。这条连接不会在 PagerDuty 里确认、解决或重新指派 Incident。

## 它是什么

你保存美国或欧洲区域的 PagerDuty API Token。Token 验证通过后，AI Workforce 可以登记一条账号 Webhook，把 Incident 事件送回这个部署。PagerDuty 返回的签名密钥加密保存，不会返回给浏览器。

## 何时使用

Incident 被触发、确认、解决或升级，并且要让员工看一看时，使用 PagerDuty。Issue 生命周期用 [Sentry](/zh-cn/integrations/sentry/)。工作应该按时间运行，而不是跟着 Incident 走时，使用[调研与监控](/zh-cn/workflows/research-monitoring/)里的日程。

## 两边交换什么

PagerDuty 投递已订阅的 Incident 事件。平台校验签名，再保存 Job 可以阅读的规范化事件：Incident ID、标题、服务、紧急程度、状态和链接。预览使用这个形状的样例。预览成功不表示 Webhook 已经送达。

事件包括 Incident 触发、确认、解决和升级。一条规则可以放一到十二条条件。每条条件是一种事件类型加上它的筛选项。这条条件上的每个筛选项都要匹配，任意一条条件匹配就会入场。筛选项可以要求服务 ID、紧急程度和标题中的一段文字。某个筛选项不该收窄事件时，就不要设置它。

## 如何连接

1. 创建能读取服务和 Incident 的 PagerDuty API Token。创建订阅还需要对 webhook subscriptions 的读写权限。
2. 打开工作空间的「集成」，选择 PagerDuty，为你在此空间的自动化添加连接。
3. 起名，并选择美国或欧洲区域。API 地址是该区域的官方地址：`https://api.pagerduty.com` 或 `https://api.eu.pagerduty.com`。区域和地址在第一次保存后固定。
4. 填写 API Token 并保存。希望由订阅步骤生成签名密钥时，把签名密钥留空。
5. 验证。有未保存的修改时先保存。认证失败会标成授权异常。上游暂时失败会记下健康错误，不会清掉已经成功的授权。
6. 配置事件订阅。产品会为触发、确认、解决和升级创建或修复账号 Webhook，目标是这个部署的公网 HTTPS 地址。已有的健康订阅会保留签名密钥。缺失或对不上的订阅会被替换。如果 PagerDuty 不显示旧密钥，会删掉这个回调上匹配的孤立订阅，再创建新的。
7. 在 Job 上选择 PagerDuty 事件、这条连接，以及服务或紧急程度条件。发布 Job 并启用规则。

登记订阅之前，部署需要公网 HTTPS 地址。

## 连接之后能做什么

匹配的事件启动 Job。员工使用它已经拥有的工具。Incident 载荷不会授予新工具，也不能证明 Incident 已经修好。先阅读运行，再决定人要在 PagerDuty 里做什么。

保存下来的订阅编号表示订阅曾经登记成功。它不表示 PagerDuty 现在仍然健康。投递停了就再配置一次订阅。删除连接时，会先去掉这条连接创建的远端订阅，再删除本地连接。远端删除失败时，连接会留下来，方便重试。

## 权限与凭据

Token 加密保存，API 不返回它。你是所有者、并且订阅还没有锁住它时，可以在连接上查看。其他人不能使用你的连接，工作空间管理员也不行。你仍然需要该工作空间的执行权限。

订阅存在之后，不能在这条连接上更换 API Token。请新建连接，再把规则指过去。这样可以避免 Webhook 绑到另一个 PagerDuty 账号。签名密钥可以轮换，并立即生效。

## 限制

没有 OAuth 安装向导，不会写回 Incident，不会自动授予 MCP，也没有历史回填。未验证或已停用的连接会拒绝事件。来源暂停期间到达的事件不会运行 Job，重新打开也不会重放。只处理原生的 Incident 事件结构。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [Sentry](/zh-cn/integrations/sentry/)
- [调研与监控](/zh-cn/workflows/research-monitoring/)
- [事件驱动自动化](/zh-cn/automate/event-driven/)
