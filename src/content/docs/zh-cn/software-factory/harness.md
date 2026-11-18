---
title: "编码 Agent 与 Harness"
description: "查看编码员工实际运行在哪种执行封装里。本版本没有 Harness 注册表。"
support: limited
sidebar:
  badge:
    text: 有限制
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "af08b4431d159dd0b466564719606195fb3f1c840f49774f489fffb6b98f3d61"
---

Harness 是编码 Agent 外围的执行封装：运行时加载的指令、它可以调用的工具，以及这些工具运行的位置。AI Workforce 把模型和 Agent 循环留在平台上。工具在已配置的运行时中执行。对仓库工作，该运行时常常是交付和收集功能所引用的 Claude Code 运行时，或一台已授权的设备 worker。

本版本不提供 Harness 注册表、自有的版本化 Harness 包格式，或可互换编码 Agent 的目录。在提示词里写另一个厂商的 Agent 名称，并不会切换运行时。

## 你可以选择什么

在[运行时管理](/zh-cn/deployment/runtime-environments/)中选择运行时和设备。平台仍然持有对话、任务状态和授权。设备以主机用户身份运行工具。已批准的工作目录标识的是上下文。它不是操作系统隔离边界。本地执行命令并不等于只在本地推理。提供给任务的工具结果和文件内容可以到达平台和已配置的模型提供方。

员工包可以声明 Skills、工具和 MCP 依赖。这些声明不会安装 Harness，也不会授予设备。把模板应用到实例，并单独授权设备或仓库。

## 如何判断跑的是哪个 Harness

阅读会话和交付卡片的执行记录。追踪应显示运行时和工具调用。如果追踪里没有某次工具调用，那么无论提示词怎么写，Agent 都没有使用该工具。编码变更遇到已记录检查的地方是[构建与测试](/zh-cn/software-factory/build-test/)。离开设备的数据见[安全与权限](/zh-cn/deployment/security/)。
