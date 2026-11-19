---
title: "员工测试"
description: "通过结构校验和一组小型任务试验测试 Agent 包。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
  sourceHash: "0da117c262bfe4b45e13a4eaadb5fc3d0b1b3875aba59b2e708f86b90895c3b1"
---

测试员工是两种不同的检查。校验告诉你 Agent 包在结构上完整。任务试验告诉你岗位在你选择的输入上如何表现。[Agent 构建器](/zh-cn/build/builder/)提供 **Validate** 和 **Submit build**。管理员还可以从 [FDE Agent 评估](/zh-cn/build/agent-tests/)把已有套件排进队列。如何根据已有记录判断一次交付任务，见[执行评测](/zh-cn/software-factory/evaluation/)。下面三个试验是你修改 Agent 包时的手工检查。

<div id="校验员工包" aria-hidden="true"></div>

## 校验 Agent 包

在 **Submit build** 之前运行 **Validate**。修复缺失文件、缺失清单字段、未知 Skill 引用、冲突的边界和暴露的凭据。校验通过不是质量分数。只有下面的试验与职责相符之后再发布。

## 试三个请求

使用[Agent 定义](/zh-cn/build/employee-definition/)中的入口 Skill 和约束。

1. **正常。** 提供必需输入。输出应符合声明的输出，并引用你提供的来源。
2. **缺少输入。** 省去一项必需输入。员工应索要它，而不是编造结果。
3. **超出范围。** 要求一件列在 `non_responsibilities` 中的事。员工应拒绝该行动。

修改指令或 Skills 后，重复同样的三个请求。把新输出与之前的输出比较。如果员工调用了工具，确认调用已被授权，并且工具结果出现在追踪里。声明从未变成调用的情况，见[工具](/zh-cn/build/tools/)。

## 读实例，不要只读文件

用已发布模板创建工作空间员工，并刷新 **Methods and capabilities**。没有到达实例的文件修改不会出现在会话里。测试人们实际会使用的那个实例。

记下模板版本、三个输入，以及你接受了什么。在更完整的评测流程出现之前，这份记录就是该岗位的评测证据。
