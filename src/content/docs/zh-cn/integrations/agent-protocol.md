---
title: "Agent 协议"
description: "当前面向 Agent 的接口是 HTTP 和自动化 MCP。本版本没有 ACP 和 A2A 服务。"
status: planned
sidebar:
  badge:
    text: 规划中
    variant: note
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "dc3b01a4e7d715790b81526bc534f7610012091ab5fc58d7397af74bd7e6fc02"
---

Agent 协议本应是外部 Agent 发现工作、调用工作并读取结果的一套文档化方式。本基线不包含捆绑的 IDE 扩展，也不包含通用的 ACP 或 A2A 服务。不要对着 AI Workforce 上一个假定的 ACP 或 A2A 端点实现。

## 今天可以调用什么

| 接口                  | 用于                                 | 不要用于                             |
| --------------------- | ------------------------------------ | ------------------------------------ |
| HTTP API              | 调用已注册的 Job 并读取运行          | 假定每条管理路由都是稳定版本化的 SDK |
| `/mcp` 上的自动化 MCP | 让兼容的 Agent 发现已注册的 Job 工具 | 修改运行时或员工配置                 |
| 设备 CLI              | 配对一台执行工具的计算机             | 管理平台                             |

契约和示例见 [REST API](/zh-cn/developer/api-reference/)、[MCP 集成](/zh-cn/integrations/mcp/)和[接口对照](/zh-cn/developer/cli-sdk/)。认证是 Personal Automation Token，或该路由要求的管理凭据，不是一个猜出来的 JWT。

## 仍然没有提供的部分

没有 Agent 之间的信封，没有超出自动化运行状态的标准任务生命周期，也没有为第三方 Agent 写明的协议协商。如果以后的版本增加一种协议，那将是带有请求和响应示例的新页面。在此之前，集成上面的 HTTP 或 MCP 接口，并把任何其他协议名称视为不受支持。
