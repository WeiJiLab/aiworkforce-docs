---
title: "MCP 集成"
description: "连接平台 MCP 端点和外部 MCP 服务。员工依赖在另一页。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "ce00d055e7da979048dafb4e856af47367ce8d78267739a5bdd67933d1b8fd33"
---

本页是协议和连接指南。员工包如何声明对某个服务的依赖，见 [MCP 服务](/zh-cn/build/mcp-integration/)。两页必须一致：清单条目是名称和描述。它不包含端点、密钥或授权。

## 平台自动化 MCP

管理员可以把平台的 Streamable HTTP MCP 端点暴露在 `/mcp`，并配置允许的主机和来源。发现工具。不要编造工具名。服务暴露有资格的已注册 Job 工具；当凭据范围允许时，还有 `automation_get_run` 和 `automation_cancel_run`。

调用传入 Job 的 `input` 和 `idempotency_key`。它返回一个异步运行句柄。检查该运行。令牌过期、撤销、Job 允许列表和当前授权会在请求时再次检查。一条已经打开的连接不是永久授权。

同样的 Job 也可以通过 HTTP 使用。你要做应用客户端时优先用 HTTP。兼容的 Agent 应调用已注册工作时，优先用这个 MCP 端点。两种接口都不编辑运行时配置。

## 外部 MCP 服务

云端业务连接接受 HTTP/SSE 服务。设备工具通过会话的设备授权挂载。员工包不能靠写一个路径来授予自己设备。编辑器支持 MCP，并不代表每种认证方式都可用。核实已部署的端点、允许的主机、客户端头和凭据类型。

不要把凭据放进员工 YAML、Skill 文本或聊天。如果两个来源对同一个服务名给出了不同配置，在来源处解决冲突。然后从[工具与连接器](/zh-cn/integrations/employee-tools/)确认实例。
