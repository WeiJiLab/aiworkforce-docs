---
title: "监视与 Webhook"
description: "用来自外部的 Webhook 启动 Job。当前版本没有单独的 Watcher 资源。"
support: limited
sidebar:
  badge:
    text: 有限制
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "f948e6c56bfc1e410cf4cd12fccf6c8ec4fc75b22f80344fc06760585df6c29c"
---

Webhook 触发让外部系统通过调用平台来启动已发布的 Job。当前版本没有一个单独的 Watcher 对象替你轮询任意系统。如果需要平台发现变化，使用受支持的事件触发或日程。见[事件驱动自动化](/zh-cn/automate/event-driven/)。

与产品触发相对的、面向开发者的 Webhook 行为，摘要在 [Webhooks](/zh-cn/integrations/webhooks/)。本页讲的是自动化：哪个 Job 运行，以及启用前必须检查什么。

## 配置触发规则

先创建 Job 并检查一次手动运行。仅当提供 Webhook 类型时再添加。外部调用方必须能够到达你的部署暴露的端点，并且调用必须满足该部署要求的认证。员工清单里的连接器名称不会注册这个端点。

不要把 Webhook 密钥放进 Skill 或聊天。把它和其他集成密钥放在一起。泄露后在来源处轮换。撤销平台凭据并不总是撤销上游密钥。

## 把送达当成至少一次

调用方可能重试。Job 通过 API 启动工作时，应使用稳定标识和幂等键。请求级幂等不会让运行内部的每个工具都幂等。在重试一个已经写到某处的运行之前，先查看已有输出。

只有经过签名或按部署要求认证的测试调用产生了你期望的运行之后，才启用自动执行。文档里的未签名示例不是一个可用的订阅。
