---
title: "任务分派"
description: "把就绪的交付卡片分配给应完成该工作的泳道员工。"
support: limited
sidebar:
  badge:
    text: 有限制
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "fdd66b324dae73491d21caa3223d77521f2dec8e3c0c40e26a719a0366911e11"
---

分派是已确认的卡片到达员工的方式。在当前工作台里，这由看板、泳道和项目上配置的员工完成。没有一个带有自己的队列、优先级语言或全局 worker 池的独立分派服务。不要描述部署并没有运行的调度器。

## 分配你已确认的卡片

人确认了范围、验收标准和允许的仓库之后，卡片才就绪。从该卡片启动或继续开发会话。员工必须已经就绪，并且必须对它应修改的仓库持有授权。工作空间上的仓库连接不是这项授权。

自定义泳道可以按卡片或按批次协调。可用操作取决于所选看板。把卡片分到泳道上，并不会创建流水线、测试环境或生产权限。

## 分派不决定什么

它不选择模型，不放宽工具授权，也不跳过验证。这些分别是[运行时](/zh-cn/deployment/runtime-environments/)、[安全](/zh-cn/deployment/security/)和[质量门禁](/zh-cn/software-factory/quality-gates/)。如果泳道上的员工不对，修改项目配置。不要用会话里更长的提示词来弥补。

多张卡片必须一起测试时，批次是分组方式。对批次的操作可能影响其中每张卡片。确认前先看这个范围。泳道和批次的持续协调见 [Agent 编排](/zh-cn/software-factory/orchestration/)。
