---
title: "接口总览"
description: "在 HTTP、自动化 MCP、设备执行器和你生成的客户端之间选择。每种接口只有一个主页面。"
sidebar:
  label: 接口总览
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
  sourceHash: "7ba22eede19f4917530e06de6cf4eb64afdf0b595a8149fc0f4c2bc79de41e2f"
---

选择接口时，先确定工作在哪里执行，以及调用者需要什么权限。平台 HTTP API、自动化 MCP 服务和设备 daemon 解决的是不同集成问题。

## 接口矩阵

| 接口            | 用途                                       | 边界                                                    |
| --------------- | ------------------------------------------ | ------------------------------------------------------- |
| 平台 HTTP       | 管理可访问资源，或调用已注册自动化         | 管理登录与机器调用使用不同凭据。                        |
| 自动化 MCP      | 让兼容 Agent 发现并调用允许的 Job          | 工具暴露已注册工作，不能任意修改运行配置。              |
| 设备 CLI        | 配对并管理执行电脑                         | 为平台执行工具，不是通用平台管理 CLI。                  |
| 平台 SDK        | 根据当前 Schema 构建应用自己的 HTTP 客户端 | 当前基线没有指定受支持的通用 Python/TypeScript SDK 包。 |
| IDE / ACP / A2A | 通过兼容且已说明的传输协议连接             | 当前基线没有指定内置 IDE 扩展或通用 ACP/A2A 服务。      |

不要仅凭名称假定应该安装名为 `aiworkforce` 的 npm 或 pip 包。内部运行时依赖的 SDK，也不等于面向平台 API 用户的官方 SDK。

## 从应用使用 HTTP

从 [REST API](/zh-cn/developer/api-reference/) 开始。按 [OpenAPI 参考](/zh-cn/integrations/openapi/) 读取实际部署后端的 `/openapi.json`，并使用应用已有的密钥存储。如何构建这个客户端见 [SDK](/zh-cn/integrations/sdk/)。没有受支持的通用 Python 或 TypeScript SDK 包。

客户端应设置正确的 Bearer Token、校验响应封装、在重试同一次调用时保留幂等键，并轮询异步运行状态。日志记录运行 ID 与结果，不记录密钥或完整敏感输入。通常封装这些操作的小型客户端已足够；生成代码也应对照实际部署 Schema 审阅。

## 使用兼容 MCP 客户端

管理员可以配置允许的 Host 和 Origin，将平台 Streamable HTTP MCP 入口暴露在 `/mcp`。应先发现工具，不要猜测名称。服务提供符合条件的已注册 Job 工具，并按凭据 scope 提供 `automation_get_run`、`automation_cancel_run`。

调用时提供 Job 的 `input` 与 `idempotency_key`，返回异步运行句柄，客户端需要继续检查结果。服务会重新核对 Token 有效期、撤销状态、Job 允许列表及当前授权，建立传输连接不代表永久获得访问权。

## 操作设备

唯一的设备 CLI 是[设备执行器 CLI](/zh-cn/integrations/cli/)。安装、配对、无界面使用、服务定义和故障排查都在那一页。本总览不重复那些命令。

## 相关文档

- [设备执行器 CLI](/zh-cn/integrations/cli/)
- [SDK](/zh-cn/integrations/sdk/)
- [OpenAPI 参考](/zh-cn/integrations/openapi/)
- [MCP](/zh-cn/integrations/mcp/)
- [API 首页](/zh-cn/api/)
- [集成概览](/zh-cn/integrations/overview/)
- [运行时管理](/zh-cn/deployment/runtime-environments/)
- [安全与权限](/zh-cn/deployment/security/)
