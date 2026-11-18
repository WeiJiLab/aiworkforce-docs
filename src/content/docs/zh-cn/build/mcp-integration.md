---
title: "MCP 依赖"
description: "声明员工依赖的 MCP 服务。连接和协议配置在另一篇指南。"
sidebar:
  label: MCP 依赖
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
  sourceHash: "cb0e0cb822660438e14f095461f460dd0b93ce91776310a5be009ae05f35f66f"
---

模型上下文协议（Model Context Protocol，MCP）让员工能够使用外部服务提供的工具。本页讲的是员工依赖：岗位期望哪个服务，以及这种声明与可用连接有何不同。协议、端点和客户端配置见 [MCP 集成](/zh-cn/integrations/mcp/)。不要维护两份互相矛盾的连接步骤。发现服务、配置、安装和外部账号授权是不同的步骤。模板中列出某个服务，并不能证明工具调用一定成功。

## 声明能力

员工定义中的 `mcp_servers` 用于说明服务用途：

```yaml
mcp_servers:
  - name: knowledge-search
    description: 检索本岗位可访问的知识来源
```

这只是描述性元数据。实际连接配置来自应用到员工实例的模板、插件和平台配置。

## 提供连接配置

Builder 通过现有模板与插件管理入口维护配置，应用到实例后才会生效。连接模板可以引用现有个人配置提供的值；必需值无法解析时，对应服务不会可用。不要把凭据写进员工 YAML、技能正文、示例或聊天消息。

云端业务连接接受 HTTP/SSE 服务。设备工具通过会话中的设备授权流程挂载，不能仅靠在包中声明执行位置就获得设备访问权限。同样，Manifest 中的服务名称也不会授予外部权限。

工具缺失时，先确认预期配置是否已应用到实例。需要授权时，重新连接相应账号。如果两个来源对同名服务定义了冲突配置，应在配置来源处解决，不要假定系统会静默选择其中一个。

## 验证已应用的配置

将模板或插件应用到测试实例，再按 [Docs 中的连接与检查员工工具](/zh-cn/integrations/employee-tools/) 检查实例、完成账号授权，并尝试一次小范围读取。分别核对员工包元数据、已安装的连接配置和外部账号授权。

## 相关文档

- [数字员工](/zh-cn/user-guide/ai-employees/)
- [Skills 与 Plugins](/zh-cn/build/skills-plugins/)
- [平台架构](/zh-cn/developer/architecture/)
