---
title: "SDK"
description: "根据已部署的 OpenAPI schema 编写一个小的 HTTP 客户端。没有发布通用平台 SDK 包。"
status: limited
sidebar:
  badge:
    text: 部分支持
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "3ebb4bc4c028b71c9c349b5ab02443a2b96d9c4626a79da123bce4f5c07be7ef"
---

本基线没有受支持的、面向平台 API 的通用 Python 或 TypeScript SDK 包。不要因为名字看起来合理就安装一个 `aiworkforce` 包。内部运行时依赖不是公开 SDK。

## 构建你需要的客户端

1. 从你实际运行的后端获取 `/openapi.json`。见 [OpenAPI 参考](/zh-cn/integrations/openapi/)。
2. 只选择应用会调用的操作。从登录或 Personal Automation Token、Job 调用和运行状态开始。可用示例在 [REST API](/zh-cn/developer/api-reference/)。
3. 发送预期的 Bearer 令牌。同时校验 `{ "code": 0, "message": "ok", "data": ... }` 信封和 HTTP 状态。
4. 重试同一次调用时复用一个幂等键。轮询运行。记录运行 ID 和结果，不要记录密钥或完整的敏感输入。
5. 在发布生成的代码之前，对照该已部署 schema 审阅它。

把令牌放在应用已有的密钥库里。上周还能调用某个 Job 的客户端，在令牌过期、被撤销或允许列表失去该 Job 时，仍然必须被拒绝。

## 不要生成什么

不要为你没有读过的路由生成封装。管理登录和机器调用使用不同的凭据。设备执行是 [CLI](/zh-cn/integrations/cli/)，不是这个 HTTP 客户端。对照表是[接口对照](/zh-cn/developer/cli-sdk/)。
