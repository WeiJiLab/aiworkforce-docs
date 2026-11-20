---
title: "Webhooks"
description: 在工单创建时触发 Job，从事件回执中读取运行 ID 并查询分析结果。
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "12b7b45f4b5416f4af8235394cb49320efbc58bcf6614d539c034eaf41414cf9"
---

当工单系统要在创建工单时启动分析，先为已发布的分析 Job 配置并启用 Webhook 触发规则。见[监视与 Webhook](/zh-cn/automate/watchers-webhooks/)。

工单后端向 `POST /api/automation/v1/triggers/{trigger_id}/events` 发送 JSON 对象。选择**请求中的输入**时，可发送 `{"input":{"ticket_id":"TKT-42"}}`，具体字段遵循 Job 的 schema。选择**固定输入**时，请发送 `{"input":{}}` 并在规则上配置输入。HTTP `202` 表示平台已接收事件，`data.id` 是事件 ID。在 `data.results` 中找到对应 `definition_id` 的结果并读取 `run_id`。如果该值为空，检查 `disposition` 和 `message`。

使用有读取权限的凭据调用 `GET /api/automation/v1/runs/{run_id}`，按 `status` 判断进度。成功后，由工单后端把 `output` 中的摘要写回工单。见 [REST API](/zh-cn/developer/api-reference/)。

## 调用你被允许调用的 Job

发送事件需要带有 `automation:invoke` 的 Personal Automation Token，且 `allowed_definition_ids` 包含目标 Job。轮询 Run 需要 `automation:read` 和对该 Run 的访问权限。规则上的**签发自动化访问令牌**会签发仅用于调用的凭据。重发同一事件时，复用 `Idempotency-Key` 和请求体。见[认证](/zh-cn/developer/authentication/)。

不要发明签名方案。使用部署为该端点写明的认证。把令牌放在发起调用的仓库之外。

## 知道边界

Webhook 不会授予调用方创建员工、更改授权或合并代码的权限。它启动一个 Job。Job 生成工作台草稿时，卡片能否进入开发由看板接入规则决定。调用和取消契约见 [REST API](/zh-cn/developer/api-reference/)。有名字的产品连接，包括这些产品自己使用的聊天和监控回调，见[集成目录](/zh-cn/integrations/overview/)。
