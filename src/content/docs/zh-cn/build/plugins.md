---
title: "Plugins"
description: "把 Skills 和相关 agents 打成包，使岗位可以版本化、校验并应用到员工实例。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
  sourceHash: "1aa35ce1a41433a227c2c69261109fd2016fc7c425e0b9e00ae39ce1ea508d5d"
---

Plugin 是岗位外围的包。Skill 是包里的一种方法。员工定义给这个包一个岗位、边界和入口 Skill。使用者不会在创建员工的界面安装这个包。已发布模板或已启用的包应用到工作空间实例时，他们才会得到它。

## 包元数据

Agent 包包含 `.claude-plugin/plugin.json`、`.aiworkforce/employee.yaml`、`.aiworkforce/router.md`、README 和 `skills/`。最小插件文件：

```json
{
  "name": "research-assistant",
  "version": "0.1.0",
  "description": "Prepare research briefs from supplied materials."
}
```

`name` 标识这个包。员工 `id` 应能与它对应。行为变化时给包一个新版本。文件里的版本字符串本身不会更新已经用旧模板创建的员工。

## 什么放进插件

可复用方法放在 [Skills](/zh-cn/build/skills/)。岗位链路放在[Agent 定义](/zh-cn/build/employee-definition/)。只有父 Agent 必须委派一项有边界的任务时，才把 subagent 放进 `agents/*.md`。见 [Agent 组合](/zh-cn/build/composition/)。

连接名称可以作为 MCP 依赖写下来。凭据、令牌和主机密钥不属于插件。应用插件不会授权外部账号。这一段缺口由[工具](/zh-cn/build/tools/)和 [MCP 服务](/zh-cn/build/mcp-integration/)说明。

如果需要从工作空间或工具结果打开专用界面，可以[开发 Plugin App](/zh-cn/developer/plugin-apps/)。

## 应用并检查

在构建器中校验包，然后提交构建。在把包视为可发布之前，处理缺失文件和暴露的凭据。发布后创建或刷新工作空间实例，打开 **Methods and capabilities**。实例显示的是实际应用的 Skills 和工具。

如果两个包用不同配置定义了同一个服务名，在来源处解决冲突。不要假设其中一个会静默获胜。[发布与分发](/zh-cn/build/publishing/)说明经过校验的包如何变成工作空间可以使用的模板。

合并后的总览仍是 [Skills 和 Plugins](/zh-cn/build/skills-plugins/)。
