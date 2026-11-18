---
title: "事件驱动自动化"
description: "用平台事件、Issue 或 IM 消息启动 Job，而不是只等时钟。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "ca7a0007358bc8e410b5d3e1caffb8460a4ab36eb28defd4dbffa5328b80d3b0"
---

事件驱动的自动化在某件事发生时调用已发布的 Job。不一定需要时钟。在部署提供这些类型时，触发可以包括平台事件、Issue、IM 消息和 Webhook。连接器存在，并不会创建订阅。事件源必须先配置并授权，才能送来输入。各供应商的接法见[集成目录](/zh-cn/integrations/overview/)。

## 何时使用事件

工作应该作出反应时使用事件：新的 Issue 到达、平台事件匹配规则，或一条消息要求一项有边界的任务。只有工作是“到这个时间再检查一次”时才使用日程。日程见[触发与日程](/zh-cn/automate/triggers-schedules/)。入站 HTTP 调用见[监视与 Webhook](/zh-cn/automate/watchers-webhooks/)。

## 让 Job 可以安全地重复

事件可能送达不止一次。给 Job 一个它能识别的输入，收集收件箱事项时使用稳定的来源标识。上一次收集成功，并不表示这次运行更新了该事项。发布 Job 不会运行它。只有手动运行显示出你期望的输出之后，才启用自动执行。

当前的收集界面需要 Claude Code 运行时。聊天摘要不是已保存的 Issue。从收集事项生成的工作台草稿，在开发之前仍需要[人工确认](/zh-cn/user-guide/human-approval/)。

## 如果事件一直不来

分别检查 Job、触发规则是否启用，以及来源授权。已暂停的 Job 可以手动运行，这次手动运行不会恢复自动触发。在提供方那里修复提供方连接。更换平台登录令牌，不能恢复已被撤销的上游凭据。
