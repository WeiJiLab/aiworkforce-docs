---
title: "Agent 定义"
description: "把岗位写成职责、调用场景、能力、约束，以及用来检查它们的评测。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
  sourceHash: "9fdbc6f4150eeb55b4d6d46d90e3eb44ea0d0d50eccfddf0a86671968487cddb"
---

先定义 Agent 接受什么任务、能使用哪些能力，以及怎样判断结果合格。本页以研究助手为例，把它作为数字员工交给团队使用。这个 Agent 包通过 `employee.yaml` 描述岗位，并把岗位要求逐项落实到插件和评测中。

`岗位 → 职责 → 调用场景 → 能力 → 约束 → 评测`

工作空间用户创建员工时不上传这个文件。他们选择已发布模板。使用路径见[使用数字员工](/zh-cn/user-guide/ai-employees/)。周围的模型见[员工架构](/zh-cn/build/architecture/)。

## 开始之前

只写一个有边界的结果。根据给定材料准备简报的研究助手是一个完整例子。把发布、更新工单和修改代码放进同一个岗位，会使后面的评测失去意义。

<div id="包结构" aria-hidden="true"></div>

## Agent 包结构

```text
research-assistant/
├── .claude-plugin/plugin.json
├── .aiworkforce/employee.yaml
├── .aiworkforce/router.md
├── README.md
└── skills/main/SKILL.md
```

`plugin.json` 为包命名。`employee.yaml` 是岗位。`router.md` 指向唯一的入口 Skill，并说明输入缺失或请求超出岗位时如何处理。README 告诉使用者如何使用这名员工。

## 写下这条链路

下面的字段是此示例支持的清单形状。

```yaml
id: research-assistant
name: Research assistant
version: "0.1.0"
description: Prepare a research brief from supplied materials.
author: documentation-team
entry_skill: main
use_cases:
  - Prepare for a research discussion
responsibilities:
  - Summarize supplied materials with source references
non_responsibilities:
  - Publish or send material externally
required_inputs:
  - research_materials
optional_inputs:
  - research_question
outputs:
  - id: research_brief
    description: Findings, source references, and open questions
constraints:
  - Ask for missing materials before drawing conclusions
```

用这条链路对照文件：

| 步骤     | 在这个例子中                                           |
| -------- | ------------------------------------------------------ |
| 岗位     | `name` 和 `description`：只准备简报                    |
| 职责     | 带来源地总结给定材料；不对外发布                       |
| 调用场景 | `use_cases`：为研究讨论做准备                          |
| 能力     | `entry_skill: main`，且必须存在 `skills/main/SKILL.md` |
| 约束     | 材料缺失时先询问；`non_responsibilities` 排除对外发送  |
| 评测     | 一份人可以对照给定来源检查的简报                       |

`id` 使用 kebab-case。职责和排除项要分开。路由必须指向同一个入口 Skill。出现 `mcp_servers` 时，它只是 `name` 和 `description` 的列表。它不是连接串，也不授予任何权限。方法本身写在 Skill 里，不要只写在这份清单里。见 [Skills](/zh-cn/build/skills/)。

调用场景是这名员工应该接受的请求。需要工具或外部服务的场景是能力依赖，不是描述里的一句话。如果场景是“搜索已批准的知识来源”，就要声明相应的 MCP 依赖，并单独配置。

## 先校验，再评测

在 **Submit build** 之前，于员工构建器中使用 **Validate**。修复缺失文件、缺失字段、未知 Skill 引用和互相冲突的边界。校验也可以报告暴露的凭据。通过校验只说明结构成立。

然后发出三个请求：一份正常简报、没有材料的请求，以及要求发布或发送简报的请求。第一个应引用来源。第二个应索要材料，而不是编造内容。第三个应留在 `non_responsibilities` 之内。检查简报和它的来源。这就是这个岗位的评测。[员工测试](/zh-cn/build/testing/)展开同一想法。交付物是代码变更时，使用 [Agent 评测](/zh-cn/software-factory/evaluation/)。

写下来的约束描述行为。实际访问仍取决于工具、凭据和运行时授权。发布之后，创建工作空间实例并确认已应用的能力。修改模板并不能证明已有实例已经改变。见[发布](/zh-cn/build/publishing/)。

## 相关指南

- [Skills 与 Plugins](/zh-cn/build/skills-plugins/)
- [MCP 服务](/zh-cn/build/mcp-integration/)
- [产物与证据](/zh-cn/user-guide/artifacts-evidence/)
