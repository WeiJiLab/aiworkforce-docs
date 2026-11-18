---
title: "能力总览"
description: "看清 Skills、Plugins、工具和 MCP 依赖如何拆分同一个员工包。"
sidebar:
  label: 能力总览
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "724b68079dd5fab74b3d08d6ca88b5b7d9bda4846469247cb6e5247de3a75920"
---

本页只做能力页面的地图，不代替那些页面。方法写在 [Skills](/zh-cn/build/skills/)。打包写在 [Plugins](/zh-cn/build/plugins/)。什么可以执行写在[工具](/zh-cn/build/tools/)。岗位期望的外部服务写在 [MCP 依赖](/zh-cn/build/mcp-integration/)。那个服务的连接配置在 [MCP 集成](/zh-cn/integrations/mcp/)，不是本页的第二份副本。

| 页面     | 负责                         | 不负责                    |
| -------- | ---------------------------- | ------------------------- |
| 能力总览 | 这些部分如何放进同一个包     | 再抄一份 Skill 或插件文件 |
| Skills   | `SKILL.md`：输入、方法、输出 | 发布和授权                |
| Plugins  | 包的元数据、版本和应用       | 方法的步骤                |
| 工具     | 声明的工具和授权之间的差别   | MCP 传输和认证            |
| MCP 依赖 | 岗位期望的服务名             | 端点、凭据和客户端        |

**Skill** 是可复用方法。**Plugin** 打包 Skills 和相关 agents。[员工定义](/zh-cn/build/employee-definition/)补上岗位、边界、输入和输出。研究助手的文件在那些指南里。校验包之后，打开实例并刷新 **Methods and capabilities**。校验通过不能证明正在运行的实例已经收到变更，清单里的服务名也不是连接。

## 相关指南

- [员工架构](/zh-cn/build/architecture/)
- [Skills](/zh-cn/build/skills/)
- [Plugins](/zh-cn/build/plugins/)
- [MCP 依赖](/zh-cn/build/mcp-integration/)
