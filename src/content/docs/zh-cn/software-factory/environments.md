---
title: "开发环境"
description: "把编码工作放在平台运行时或已授权设备上。卡片不会创建隔离环境。"
status: limited
sidebar:
  badge:
    text: 部分支持
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "4281f8e79978b9ab0278dc406dd29e1fea26e2cf8d1d6db7d30e9fae3cbff731"
---

开发环境是变更的工具和命令实际运行的地方。软件工厂使用执行员工已经配置的运行时。创建交付卡片不会准备沙箱、预览 URL 或一次性虚拟机。

## 选择与授权匹配的位置

[运行时管理](/zh-cn/deployment/runtime-environments/)是完整的选择：平台执行、自托管部署，或已授权的设备 worker。平台保留对话和授权。设备在已批准的工作目录中以主机用户身份运行命令。该目录是上下文，不是隔离边界。

员工使用的仓库凭据会对照该员工当前的授权来检查。工作空间连接不够。提供方、实例、启用状态和工作空间必须匹配。见[代码仓库](/zh-cn/integrations/code-repositories/)。

## 环境必须让什么成为事实

在把测试结果当作证据之前，环境必须是团队能说清的：哪个运行时、如果有设备是哪一台、哪个仓库修订，以及跑了哪些命令。[构建与测试](/zh-cn/software-factory/build-test/)记录测试泳道。如果缺少流水线资源，就写明自动检查没有运行。不要把一次没有记录的本地命令说成项目的 CI 结果。

本版本没有文档化的按卡片预览环境。如果团队使用外部预览，只有有人打开过之后，才把它作为证据链到卡片上。链接本身不是一次通过的检查。
