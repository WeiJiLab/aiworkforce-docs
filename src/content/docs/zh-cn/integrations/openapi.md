---
title: "OpenAPI 参考"
description: "从你运行的后端读取 /openapi.json。本站不托管生成的端点目录。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "031d493592ee4c045ddc17e1886825bf79211e3aa9ba2d54c1210b034196437d"
---

后端使用 FastAPI 的默认配置，在 `/openapi.json` 暴露生成的 schema。该文件是你正在调用的那次部署的参考。本文档站点不会镜像它，也不会在后端变化时重新生成。

## 使用你将要调用的 schema

从你要集成的环境获取 `https://<your-backend>/openapi.json`。[REST API](/zh-cn/developer/api-reference/)里的本地示例使用 `http://localhost:8080`。来自另一个环境的 schema 可能列出你的部署并不提供的路由。

只选择你需要的操作。本站页面描述的是已经审阅过的契约：登录、工作空间发现、自动化调用、运行状态、运行审计和取消。只出现在 schema 里的路由，在具备同样的请求、响应和权限说明之前，不在这里文档化。不要从路径推断权限。

## 谨慎生成

生成的代码应对照已部署 schema 审阅。成功的业务响应信封是 `{ "code": 0, "message": "ok", "data": ... }`。同时检查 HTTP 状态。认证失败返回 401。权限失败可以返回 403。校验失败通常返回 422。映射的状态冲突返回 409。限流返回 429，并带有 `Retry-After`。当前默认是每个凭据每分钟 120 次机器请求，按后端进程强制执行，部署可以配置。

按 [SDK](/zh-cn/integrations/sdk/) 构建客户端。仍然没有已发布的通用 SDK 包。
