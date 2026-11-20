---
title: "OpenAPI 参考"
description: "从你运行的后端读取 /openapi.json。本站不托管生成的端点目录。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "86e99af3197f8a3736a870b17c29745e672589f3cde86dd87503aa8d61daf895"
---

FastAPI 在后端的 `/openapi.json` 提供生成的路由 schema。默认平台网关不会将该路径转发给后端。请通过运维允许的连接，从后端获取 schema。

## 使用你将要调用的 schema

请使用目标部署的 schema。本地后端监听 `http://localhost:8080` 时，可获取 `http://localhost:8080/openapi.json`。托管部署请联系其运维人员获取 schema。

只选择你需要的操作。本站页面描述的是已经审阅过的契约：登录、工作空间发现、自动化调用、运行状态、运行审计和取消。只出现在 schema 里的路由，在具备同样的请求、响应和权限说明之前，不在这里文档化。不要从路径推断权限。

## 谨慎生成

生成的 schema 缺少部分路由的详细响应模型。生成客户端时，按 [REST API 响应契约](/zh-cn/developer/api-reference/)定义这些响应的类型。成功的业务响应信封是 `{ "code": 0, "message": "ok", "data": ... }`。同时检查 HTTP 状态。认证失败返回 401。权限失败可以返回 403。校验失败通常返回 422。映射的状态冲突返回 409。限流返回 429，并带有 `Retry-After`。默认是每个凭据每分钟 120 次机器请求，由各后端进程强制执行，部署可以配置。

按 [SDK](/zh-cn/integrations/sdk/) 构建客户端。仍然没有已发布的通用 SDK 包。
