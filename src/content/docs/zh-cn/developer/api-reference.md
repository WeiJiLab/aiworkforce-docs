---
title: "API 参考"
description: "通过真实管理与自动化 HTTP 端点集成平台，包含请求示例、幂等与异步运行处理。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
  sourceHash: "e5e2da3b46ab757782c5cc7e9ec7ae038907ad1de7d0038ec8809751a9a9afd0"
---

本页覆盖当前核心 HTTP 契约：登录、发现工作空间资源，以及调用已注册自动化。路径相对于平台后端。示例使用本地开发地址 `http://localhost:8080`，远程访问时替换为实际 HTTPS 域名。

在 FastAPI 默认配置下，后端通过 `/openapi.json` 提供生成的 Schema。构建更完整的客户端时，应读取实际运行版本的 Schema。这些路由描述当前实现，不代表所有管理端点都具有独立的版本兼容承诺。

## 管理端点

使用[身份认证](/zh-cn/developer/authentication/)中说明的登录访问 Token。

| 方法与路径                             | 用途                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| `POST /api/auth/login`                 | 使用 JSON `email`、`password` 登录。                                           |
| `GET /api/auth/me`                     | 读取当前认证用户。                                                             |
| `GET /api/workspaces`                  | 列出可访问的工作空间。                                                         |
| `GET /api/automations`                 | 根据工作空间授权列出可见 Job，可用 `workspace_id`、`workspace_agent_id` 筛选。 |
| `GET /api/automations/{definition_id}` | 读取 Job 与配置。                                                              |
| `POST /api/automation-tokens`          | 签发有范围的 Personal Automation Token。                                       |

例如，先读取真实工作空间 ID，再查询工作空间 `7` 的 Job：

```bash
curl 'http://localhost:8080/api/workspaces' \
  --header 'Authorization: Bearer <LOGIN_ACCESS_TOKEN>'

curl 'http://localhost:8080/api/automations?workspace_id=7' \
  --header 'Authorization: Bearer <LOGIN_ACCESS_TOKEN>'
```

## 签发机器 Token

先创建并发布目标 Job，将凭据限制到其真实定义 ID：

```bash
curl --request POST 'http://localhost:8080/api/automation-tokens' \
  --header 'Authorization: Bearer <LOGIN_ACCESS_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Documentation integration","scopes":["automation:invoke","automation:read"],"allowed_definition_ids":["<DEFINITION_ID>"]}'
```

响应中的 `data.token` 包含新密钥，普通 Token 列表不会再显示明文。只有调用者需要取消运行时，才添加 `automation:cancel`。

## 启动并检查运行

外部调用 API 使用 Personal Automation Token。Job 必须已有发布版本且处于启用状态。`input` 对象必须符合该版本的 Schema，请求不能覆盖员工、工具或任务配置。

```bash
curl --request POST \
  'http://localhost:8080/api/automation/v1/automations/<DEFINITION_ID>/runs' \
  --header 'Authorization: Bearer <PERSONAL_AUTOMATION_TOKEN>' \
  --header 'Content-Type: application/json' \
  --header 'Idempotency-Key: docs-request-001' \
  --data '{"input":{}}'
```

接口返回 HTTP `202`，在 `data` 中提供运行记录，包括 `id`、`definition_id`、`version_id`、`status` 与 `reused`。只有 Job 的输入 Schema 允许时，空输入才有效。`202` 只表示异步工作已接收，需要继续读取后续状态与结果：

```bash
curl 'http://localhost:8080/api/automation/v1/runs/<RUN_ID>' \
  --header 'Authorization: Bearer <PERSONAL_AUTOMATION_TOKEN>'
```

运行响应还包含 `output`、`summary`、`error` 和生命周期时间。`GET /api/automation/v1/runs/{run_id}/audit` 读取审计视图。具备取消 scope 时，`POST /api/automation/v1/runs/{run_id}/cancel` 请求取消，但不能据此判断底层进程已经停止。

## 重试与错误

因响应丢失而重试同一个请求时，复用相同 `Idempotency-Key`。键最多 200 字符，按凭据和请求检查；将同一个键用于不同输入或不同 Job 会被拒绝。明确需要新工作时才生成新键。

成功的业务响应使用 `{ "code": 0, "message": "ok", "data": ... }`，应同时检查 HTTP 状态与响应体。认证失败返回 `401`，权限不足可能返回 `403`，请求校验常见为 `422`，映射的状态冲突返回 `409`。限流返回 `429` 和 `Retry-After`；当前默认每个凭据每分钟 120 次机器请求，由后端进程内分别限制，部署可调整。重试不代表可以重复执行副作用。

## 相关文档

- [自动化基础](/zh-cn/automate/fundamentals/)
- [CLI、SDK 与协议入口](/zh-cn/developer/cli-sdk/)
