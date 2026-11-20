---
title: "监视与 Webhook"
description: "用来自外部的 Webhook 启动 Job。当前版本没有单独的 Watcher 资源。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "875f54c03b804aeddd632913003a4f82bd10fa4717142d4f7cd75f1550d4d467"
---

Webhook 触发让外部系统通过调用平台来启动已发布的 Job。当前版本没有一个单独的 Watcher 对象替你轮询任意系统。如果需要平台发现变化，使用受支持的事件触发或日程。见[事件驱动自动化](/zh-cn/automate/event-driven/)。

与产品触发相对的、面向开发者的 Webhook 行为，摘要在 [Webhooks](/zh-cn/integrations/webhooks/)。本页讲的是自动化：哪个 Job 运行，以及启用前必须检查什么。

## 配置触发规则

先创建 Job 并检查一次手动运行。仅当提供 Webhook 类型时再添加。外部调用方必须能够到达你的部署暴露的端点，并且调用必须满足该部署要求的认证。员工清单里的连接器名称不会注册这个端点。

不要把 Webhook 密钥放进 Skill 或聊天。把它和其他集成密钥放在一起。泄露后在来源处轮换。撤销平台凭据并不总是撤销上游密钥。

## 把送达当成至少一次

调用方可能重试。Job 通过 API 启动工作时，应使用稳定标识和幂等键。请求级幂等不会让运行内部的每个工具都幂等。在重试一个已经写到某处的运行之前，先查看已有输出。

先在测试工作空间发布并激活 Job，再启用 Webhook 规则，然后发送第一条经过认证的事件。使用获准的小范围输入，核对事件回执及其 Run。测试通过前保持生产规则暂停。见[开发者 Webhook 契约](/zh-cn/integrations/webhooks/)。
