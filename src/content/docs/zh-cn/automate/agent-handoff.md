---
title: "Agent 交接"
description: "在会话、另一次运行或人之间传递工作。提示词里的一句话不是交接记录。"
status: limited
sidebar:
  badge:
    text: 部分支持
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "4e353c2cbf8f7f0bc93982fe5ad1aa87888acdbf64274c0b48a7cac1aff57d9a"
---

交接意味着下一个执行者能看到当前状态，并且上一个执行者不再拥有下一步。当前产品把这件事记在不同的地方。它不提供任意 Agent 之间的一套通用交接协议。

## 选择记录

| 情况                      | 实际发生的事                           | 接着读                                               |
| ------------------------- | -------------------------------------- | ---------------------------------------------------- |
| 同一目标，补充细节        | 继续该会话                             | [会话与计划](/zh-cn/user-guide/sessions-planning/)   |
| Job 再次运行              | 新的运行，或在配置了复用时使用绑定会话 | [运行与恢复](/zh-cn/automate/runs-recovery/)         |
| 父 Agent 在一次执行内委派 | 只有追踪里出现调用时才是 subagent      | [Agent 组合](/zh-cn/build/composition/)              |
| 人来做下一步              | 在交付卡片上接管，然后明确交还         | [人工确认](/zh-cn/user-guide/human-approval/)        |
| 工程工作更换泳道          | 卡片带着会话和证据移动                 | [Agent 编排](/zh-cn/software-factory/orchestration/) |

继续会话会保留对话。开始新会话不会复制此前的每项决定，除非你把该上下文放进新请求。复用会话的 Job 会有意积累上下文。这种积累也可能掩盖是哪一次运行引入了错误。

## 交还给人

如果你接管一张卡片，自动推进会停止。只恢复暂停并不能清除接管。明确交还，并记下你做了什么。提示词里写“不确定就问人”本身不会创建批准请求。使用卡片或运行已经提供的提问和批准点。

除非你能指出每次委派的追踪，以及每个 Agent 实际拥有的授权，否则不要把工作流描述成 Agent 之间的接力。
