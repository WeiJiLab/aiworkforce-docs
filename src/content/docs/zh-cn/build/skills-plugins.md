---
title: "Skills 与 Plugins"
description: "先看 Skills 和 Plugins 如何放在同一个员工包里，再进入各自的指南。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "9ee2723257db9738f9b5aa3d5210e31137366afc15aad2141e14969bd79e6685"
---

本页是总览。[Skills](/zh-cn/build/skills/) 说明如何写一种可复用方法。[Plugins](/zh-cn/build/plugins/) 说明如何打包、版本化并应用这种方法。按你正在做的事进入对应页面。下面保留两页共用的包结构事实。

**Skill（技能）**描述一种可以重复使用的工作方法。**Plugin（插件）**把技能、子 Agent 等能力打包。员工定义进一步补充岗位、边界、输入和预期输出，让这些能力成为可委派的工作。

## 先写一个有用的技能

在员工包中创建 `skills/main/SKILL.md`。目录名就是员工 Manifest 和流程引用使用的技能标识。技能应有清晰的描述与可执行步骤：

```markdown
---
name: main
description: 根据用户提供的材料编写研究简报。
---

## 输入

没有 research_materials 时，先请求用户提供。
如果提供 research_question，就据此聚焦简报。

## 方法

1. 阅读用户提供的材料。
2. 区分有依据的发现与假设。
3. 为每项发现标注来源。
4. 列出仍未回答的问题。

## 输出

返回包含发现、引用与待确认问题的 research_brief。
不对外发布或发送。
```

工作方法应具体到能够执行，输出应便于检查。只写「尽力帮助用户」不能建立稳定的交付预期。

## 组织员工包

员工包应包含 `.claude-plugin/plugin.json`、`.aiworkforce/employee.yaml`、`.aiworkforce/router.md` 与 README。例如，包元数据可以写成：

```json
{
  "name": "research-assistant",
  "version": "0.1.0",
  "description": "Prepare research briefs from supplied materials."
}
```

员工的 `entry_skill` 必须指向真实存在的技能。如果需要子 Agent，使用 `agents/*.md`。将可复用的方法放在技能中，避免在多个 Agent 中重复维护同一段指令。

## 应用并验证

在构建器中执行校验，修复错误后提交构建。使用有代表性的输入试用岗位，确认其确实交付承诺的结果。包校验也会发现缺少文件、暴露凭据等问题，但不能替代真实任务评测。

已发布模板和启用的包决定可以应用到员工实例的能力。打开员工档案，刷新「方法与能力」，查看实例实际拥有的技能和工具。源包更新本身不能证明现有实例已经收到更新。

如果缺少技能，先核对所选模板、包版本，以及配置是否已经应用到实例。工作方法依赖外部系统时，还需要单独配置并授权对应的 MCP 服务。

## 相关文档

- [员工定义](/zh-cn/build/employee-definition/)
- [MCP 集成](/zh-cn/build/mcp-integration/)
- [Agent 对话](/zh-cn/user-guide/agent-chat/)
