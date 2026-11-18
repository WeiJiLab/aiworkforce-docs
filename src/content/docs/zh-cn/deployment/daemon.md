---
title: "自托管机器概览"
description: "了解何时用 Daemon 在自己的电脑上执行工具，以及任务数据会发往哪里。"
sidebar:
  label: 概览
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "153edaf55e635988d3644e5e8e869211974c07ad1e3f46c5d1f4425925582b30"
---

Daemon 让数字员工在你管理的 macOS 或 Linux 电脑上执行工具。你仍在 AI Workforce 里发起会话、查看结果。平台负责对话、模型调用和授权，电脑负责执行命令。

## 谁应该使用 Daemon

如果任务依赖内网里的代码仓库或测试服务、这台电脑上的硬件，或必须以本机用户身份运行的构建命令，可以把执行位置设在这台电脑上。任务只需使用平台已连接的服务时，直接选择平台执行即可。

如果团队需要自己运行 Web 应用和数据库，请参阅[自托管部署](/zh-cn/deployment/self-host/)。各种运行方式的适用条件见[运行时管理](/zh-cn/deployment/runtime-environments/)。

## 什么会离开这台电脑

代码检出目录和设备凭据保存在本机。员工读取的文件内容和工具结果会发送到平台，并可传给该员工配置的模型服务。Daemon 主动向平台发起 HTTPS 和 WebSocket 连接，电脑无需开放入站端口。详见[安全与权限](/zh-cn/deployment/security/)。

## 开始使用

1. 批准电脑和工作目录，确认设备在线。见[我的机器](/zh-cn/deployment/daemon/my-machines/)。
2. 打开员工会话，在发送第一条消息前选中这台电脑。见[会话执行位置](/zh-cn/deployment/daemon/session-execution/)。
3. 如果浏览器已批准但设备仍离线，按症状查看[故障排查](/zh-cn/deployment/daemon/troubleshooting/)。
