---
title: "MCP 集成"
description: "连接平台 MCP 端点和外部 MCP 服务。员工依赖在另一页。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "c61f85876ff8b405852ea436dadcc1de5b87f8280d38139344118a10e01b7b05"
---

本页是服务集成：平台 MCP 端点和外部 MCP 服务。Agent 包如何给依赖命名，见 [MCP 依赖](/zh-cn/build/mcp-integration/)。两页必须一致：清单条目是名称和描述。它不包含端点、密钥或授权。

## 平台自动化 MCP

管理员可为 `/mcp` 的 Streamable HTTP MCP 端点配置允许的主机与来源。发现和调用 Job 工具时，使用 Personal Automation Token。平台 PAT 用于平台身份认证，不携带自动化 scope。`automation_get_run` 和 `automation_cancel_run` 分别需要读取和取消 scope。

使用当前凭据发现结果中的工具名。工作空间共享 Job 的发现和调用会分别检查访问权限。用获准的输入验证调用。调用传入 Job 的 `input` 和 `idempotency_key`，返回异步 Run 句柄。已有 Run 的访问及撤权规则见[认证](/zh-cn/developer/authentication/)。

共享 Job 未出现在发现结果时，检查 Job 发布状态、工作空间访问权限和 Token 允许列表。也可通过 [REST API](/zh-cn/developer/api-reference/) 使用获准 Job 的 definition ID。

## 外部 MCP 服务

云端业务连接接受 HTTP/SSE 服务。设备工具通过会话的设备授权挂载。Agent 包不能靠写一个路径来授予自己设备。编辑器支持 MCP，并不代表每种认证方式都可用。核实已部署的端点、允许的主机、客户端头和凭据类型。

不要把凭据放进员工 YAML、Skill 文本或聊天。如果两个来源对同一个服务名给出了不同配置，在来源处解决冲突。然后从[工具与连接器](/zh-cn/integrations/employee-tools/)确认实例。有名字的产品连接列在[集成目录](/zh-cn/integrations/overview/)。
