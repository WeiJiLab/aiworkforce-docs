---
title: "工作流构建"
description: "组合 Job、它的触发规则和目的地。当前版本没有单独的图编辑器。"
support: limited
sidebar:
  badge:
    text: 有限制
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "3edc7ba3d4d5be244224ee7bcbd8be7368f3e0eaafeaad4ed840d43215bc0102"
---

当前产品里的工作流，是一个自动化 Job，加上挂在它上面的触发规则和可选的收集目的地。没有一个可视化图编辑器把节点、分支和循环存成另一份文档。不要在 Automations 界面之外寻找一张并不存在的画布。

## 组合已经存在的部分

打开 **Automations**（`/automations`）。

1. 选择执行员工，写明任务、输入和输出。
2. 选择每次运行使用新会话，或复用 Job 绑定的会话。复用会积累上下文。新会话让运行更容易比较。
3. 保存，手动运行，并在发布前阅读这次运行。
4. 添加一个或多个触发规则。每条日程规则都属于这个 Job。事件和 Webhook 是不同的类型。见[事件驱动自动化](/zh-cn/automate/event-driven/)。
5. 如果 Job 应该登记请求，添加**收集任务 / 事项**，并选择工作空间收件箱或工作台项目。这个工具是可选的，收集界面需要 Claude Code 运行时。

发布保存配置。它不会创建运行。只有手动结果可以接受时，才启用自动执行。

## 你画不出来的东西

没有用于任意分支、并行扇出或循环计数器的工作流节点。重复工作使用日程规则，见[循环与周期性工作](/zh-cn/automate/loops/)。中间需要人时，使用[批准与通知](/zh-cn/automate/approvals/)或交付卡片上的接管。多步工程交付属于[软件工厂](/zh-cn/software-factory/overview/)，它使用看板和泳道，而不是这个 Job 编辑器。
