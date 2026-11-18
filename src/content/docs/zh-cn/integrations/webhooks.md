---
title: "Webhooks"
description: 在工单创建时触发 Job，从事件回执中读取运行 ID 并查询分析结果。
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "2a40becac6ceabbeb540d010f62281cb0ee6320ad246c1982ac9b90a08a7ebcd"
---

当工单系统要在创建工单时启动分析，先为已发布的分析 Job 配置并启用 Webhook 触发规则。见[监视与 Webhook](/zh-cn/automate/watchers-webhooks/)。

工单后端向 `POST /api/automation/v1/triggers/{trigger_id}/events` 发送包含 `input` 对象的 JSON。HTTP `202` 表示已接收事件。回执的 `data.id` 是事件 ID。要查询运行，在 `data.results` 中找到对应 `definition_id` 的条目，使用其中的 `run_id`。如果该值为空，检查该项的 `disposition` 和 `message`。

使用有读取权限的凭据调用 `GET /api/automation/v1/runs/{run_id}`，按 `status` 判断进度。成功后，由工单后端把 `output` 中的摘要写回工单。见 [REST API](/zh-cn/developer/api-reference/)。

## 调用你被允许调用的 Job

使用 Personal Automation Token，其范围和 `allowed_definition_ids` 包含该 Job。见[认证](/zh-cn/developer/authentication/)。发送 Job 输入，并在重试同一次启动请求时复用同一个幂等键。新键会开始新的工作。HTTP 请求的幂等不会让运行内部的每个工具都幂等。

不要发明签名方案。使用部署为该端点写明的认证。把令牌放在发起调用的仓库之外。

## 知道边界

Webhook 不会授予调用方创建员工、更改授权或合并代码的权限。它启动一个 Job。如果该 Job 登记了收件箱事项或工作台草稿，开发仍要由人确认。调用和取消契约见 [REST API](/zh-cn/developer/api-reference/)。有名字的产品连接，包括这些产品自己使用的聊天和监控回调，见[集成目录](/zh-cn/integrations/overview/)。
