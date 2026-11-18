---
title: "Webhooks"
description: "从外部系统调用已发布的 Job。出站 Webhook 订阅不是一个单独的产品界面。"
support: limited
sidebar:
  badge:
    text: 有限制
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "a288243eaaa120949af82c0d8d77c0bbc2843fdaa0828f382c6e574aa2d036b7"
---

当前产品里的 Webhook 是自动化 Job 上的入站触发。外部系统调用平台，若已启用自动执行且调用满足部署的认证，已发布的 Job 可以运行。本页是这次调用的开发者视图。把触发规则挂到 Job 上的产品步骤见[监视与 Webhook](/zh-cn/automate/watchers-webhooks/)。

没有一份文档化的出站 Webhook 产品，会把每次运行事件推送到你注册的 URL。如果需要结果，轮询这次运行。`POST` 调用返回 HTTP 202 和一个运行句柄。从运行中读取 `status`、`output`、`summary` 和 `error`。202 表示工作已被接受，不是已经完成。

## 调用你被允许调用的 Job

使用 Personal Automation Token，其范围和 `allowed_definition_ids` 包含该 Job。见[认证](/zh-cn/developer/authentication/)。发送 Job 输入，并在重试同一次启动请求时复用同一个幂等键。新键会开始新的工作。HTTP 请求的幂等不会让运行内部的每个工具都幂等。

不要发明签名方案。使用部署为该端点写明的认证。把令牌放在发起调用的仓库之外。

## 知道边界

Webhook 不会授予调用方创建员工、更改授权或合并代码的权限。它启动一个 Job。如果该 Job 登记了收件箱事项或工作台草稿，开发仍要由人确认。调用和取消契约见 [REST API](/zh-cn/developer/api-reference/)。
