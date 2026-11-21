---
title: "跟进交付看板的首次运行"
description: "用已发布的看板模板初始化泳道和编排，跟进第一张卡片的执行。"
last_verified: "2026-11-20"
prev: false
next: false
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-21"
  sourceHash: "274fd17a3431e8dd8fb36d3f62446b0311d3e2b184d03c7446971e42510acedd"
---

工作空间可以从已发布的看板模板创建交付看板。模板定义泳道及其提示词、任务、员工要求和自动化配方。创建时为必配泳道指派员工，初始化后由这块看板维护自己的交付策略。

<picture>
  <source media="(max-width: 52rem)" srcset="/illustrations/first-workflow/zh-cn-compact.svg" />
  <img src="/illustrations/first-workflow/zh-cn.svg" alt="看板模板中的交付泳道，以及选择模板、指派员工、初始化看板和跟进卡片的步骤。" />
</picture>

## 1. 选择已发布的看板模板

管理员在**管理控制台 → 看板模板**维护组织的模板，也可以从现有看板捕获模板。

在工作空间打开**工作台 → 新建交付项目**。在创建看板向导选择可用的已发布模板，展开**查看完整流程与自动化**，查看每条泳道使用哪些编排。然后给看板命名，核对泳道顺序。10 个精选场景和交接产物见 [BoardFlow 看板模板](/zh-cn/software-factory/templates/)。

## 2. 指派员工，初始化看板

为每条标记为必配的泳道选择可用的数字员工实例。核对模板预选的共享 MCP 和 Skill，按需调整。需要同步外部工作项时再配置来源。检查配置后点击**创建看板**。初始化成功后，看板及已配置的自动化会启用。[配置软件工厂](/zh-cn/getting-started/first-software-factory/)

## 3. 用一张卡片核对编排运行

进入看板，在需求泳道新建需求会话，或从**任务收件箱**创建草稿。核对范围和验收标准，出现确认请求时在卡片上答复。启用标准接入编排后，可自动推进已澄清卡片。在**泳道流程**打开对应的编排运行，对照卡片核对节点和员工会话。见[工作流构建器](/zh-cn/automate/workflow-builder/#组合一条泳道编排)。

如果只需让一个员工完成一项独立任务，可以创建一个 Job，手动运行并检查结果后，再按需启用定时触发。[创建 Job](/zh-cn/automate/workflow-builder/#组合一个-job)
