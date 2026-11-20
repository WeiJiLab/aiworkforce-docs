---
title: "工作进入与待办"
description: "在任何员工修改代码之前，把进入的请求变成已确认的草稿。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "ac08c20344fd9c5b71f0179b16023b007ba6fb31d90ebf370481ce7b416d1a21"
---

进入是请求变成交付草稿的方式。待办是团队尚未接受进入开发的草稿和卡片。收集到一项，并不是这项接受。功能说明按[需求到卡片](/zh-cn/software-factory/requirements-to-card/)推进，直到卡片被确认。

## 请求从哪里进入

工作空间任务收件箱保存收集或导入的请求。当配置了**收集任务 / 事项**并且运行记录了服务端回执时，自动化可以添加事项。聊天摘要不是已保存的 Issue。事项也可以进入工作台项目，并在那里成为草稿。审阅和流转事项的操作见[任务收件箱](/zh-cn/user-guide/inbox-tasks/)。

核对草稿的范围、验收标准和允许变更的仓库。看板要求人工决定时，在卡片上答复。标准看板启用需求接入编排后，可自动将已澄清（`READY`）的卡片派发到开发。需要强制审阅时，先检查目标看板的配置，再转入草稿。见[人工确认](/zh-cn/user-guide/human-approval/)。

## 让待办可以被检查

每一项都应显示来源和审阅状态。同一来源会被再次检查时，稳定的来源标识很重要。较早的一次成功收集不能证明当前运行更新了该事项。不是软件工作的事项留在收件箱。不要为了让待办看起来完整而把它们搬上看板。

标准本身的写法见[需求写作](/zh-cn/learn/requirements-writing/)。这些卡片依赖的工作台配置见[项目](/zh-cn/user-guide/projects/)。就绪卡片的下一步是[任务分派](/zh-cn/software-factory/dispatch/)。
