---
title: "员工架构"
description: "了解数字员工由什么组成：职责、指令、能力、执行、治理和交付物。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "dcd06afa15d40f9c8aa5ee94d49149ffb3f017df191b96f2f651751bea505f17"
---

数字员工是一份带版本的职责与能力组合，被放到可以行动的运行时里，并受权限和证据约束。这个组合不是聊天记录，聊天记录也不能证明组合是正确的。

构建者用这个模型定义岗位。使用者遇到的是从已发布模板创建的工作空间员工。创建流程里不编辑这份员工包。

## 员工模型

| 部分       | 包含什么                           | 当前落在哪里                                   |
| ---------- | ---------------------------------- | ---------------------------------------------- |
| 身份与职责 | 岗位、目标、范围、调用规则         | `employee.yaml` 与 `router.md`                 |
| 指令       | 策略、任务上下文、会话可以记住什么 | 岗位指令、当前请求、运行时指引                 |
| 能力       | Skills、Plugins、工具、MCP 依赖    | `skills/`、插件元数据、工具授权、`mcp_servers` |
| 执行       | 运行时、会话、交接                 | 工作空间会话，以及已配置的运行时或设备         |
| 治理       | 权限、评测、证据                   | 授权、员工包校验、经过审阅的输出               |
| 交付物     | 任务、产物、报告、行动             | 收件箱事项、文件和交付记录                     |

这些部分是组合关系。没有职责的 Skill 只是没有岗位的方法。没有工具授权的职责只是意图。没有证据的执行只是一段对话。

## 身份与职责

岗位只命名一件工作。目标说明什么结果有用。范围说明这项工作可以接触哪些输入和系统。调用规则说明何时应该选择这名员工，以及请求应交给别处的情况。

这条链路是[员工定义](/zh-cn/build/employee-definition/)的主干：

`岗位 → 职责 → 调用场景 → 能力 → 约束 → 评测`

总结给定材料的研究助手，和发布这些材料的员工，不是同一个岗位。把排除项写进岗位，而不是只写在后来的提示词里。

## 指令

指令分层。稳定策略属于岗位。当前目标、文件和验收标准属于会话。工作空间保存的记忆是经过审阅的上下文，不是隐藏的第二份指令文件。[Agent 指令](/zh-cn/build/prompts-rules/)说明该改哪一层。自然语言策略不会授予访问权。

## 能力

| 能力     | 在员工中的作用                   |
| -------- | -------------------------------- |
| Skill    | 带有输入、步骤和输出的可复用方法 |
| Plugin   | Skills 和相关 agents 的能力包    |
| 工具     | 运行时被允许执行的一项操作       |
| MCP 服务 | 岗位预期要调用的外部服务         |

清单中的 `mcp_servers` 只有名称和描述。连接配置、安装和账号授权是分开的步骤。构建者见 [MCP 服务](/zh-cn/build/mcp-integration/)，操作者见 [MCP 集成](/zh-cn/integrations/mcp/)。不要把凭据放进员工包。

[Skills](/zh-cn/build/skills/) 和 [Plugins](/zh-cn/build/plugins/) 给出目录结构。[工具](/zh-cn/build/tools/)区分声明的工具和已授权的工具。

## 执行

已发布模板变成工作空间实例。实例必须完成初始化，会话才能开始。会话保存对话和执行上下文，包括为这次运行准备的能力。平台保留模型循环。工具在已配置的运行时中执行，可以是平台执行，也可以是已授权设备。见[运行时管理](/zh-cn/deployment/runtime-environments/)。

[Agent 组合](/zh-cn/build/composition/)说明主 Agent 与子 Agent。在正文里提到 subagent，并不能证明运行时调用了它。交还给人的步骤是[人工确认](/zh-cn/user-guide/human-approval/)，不是另一个隐藏的 Agent。

## 治理与交付物

员工包校验检查结构：必需文件、清单字段、Skill 引用，以及是否暴露凭据。它不能证明员工把工作做好了。[员工测试](/zh-cn/build/testing/)用来尝试正常请求、缺失输入和超出范围的请求。[发布](/zh-cn/build/publishing/)把经过检查的员工包放到工作空间可以创建实例的位置。更新源员工包，并不能证明已有实例已经收到变更。

交付物是人要审阅的东西：任务、产物、报告，或仍需批准的行动。证据是这些交付物的依据。评测把结果与职责和验收标准比较。工程工作中的这种比较见 [Agent 评测](/zh-cn/software-factory/evaluation/)。同一想法也适用于任何员工，使用你实际能够运行的检查。

## 最小示例

```text
research-assistant/
├── .claude-plugin/plugin.json
├── .aiworkforce/employee.yaml
├── .aiworkforce/router.md
├── README.md
└── skills/main/SKILL.md
```

`employee.yaml` 承载岗位。`router.md` 指向 `skills/main/SKILL.md`，并说明输入缺失或请求超出岗位时怎么处理。Skill 描述方法。插件文件为包命名。这些文件都不会授权仓库或外部账号。

## 相关指南

- [员工定义](/zh-cn/build/employee-definition/)
- [模板](/zh-cn/build/templates/)
- [使用数字员工](/zh-cn/user-guide/ai-employees/)
