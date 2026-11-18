---
title: "平台概览"
description: "找到交付工作台、自动化工作流、工作空间会话和执行配置入口。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "0497556190ebca554561de017b518d8013c1232d13ddc86719c3feb405fe5736"
---

AI Workforce 为研发团队提供管理软件变更的交付工作台，以及处理周期性任务和事件的自动化能力。各个入口产生的记录见[核心概念](/zh-cn/getting-started/core-concepts/)。

## 在软件工厂交付变更

从 Automations 的 `/automations?tab=board-flow` 打开**交付工作台**。[项目](/zh-cn/user-guide/projects/)定义使用的看板、仓库和泳道员工。沿交付卡片确认范围、跟进实现和验证，并审阅结果。

工作空间的[任务收件箱](/zh-cn/user-guide/inbox-tasks/)保存采集或导入的请求。将已审阅的请求转为工作台草稿，在开发前确认需求。按[快速入门](/zh-cn/getting-started/quickstart/)走通一条 Issue。

## 配置周期性或事件驱动的工作

在 `/automations` 打开 **Automations**，配置 Job、触发规则和运行。设置日程或当前可用的事件触发规则，先手动运行一次并检查输出，再启用自动执行。若任务需要收集待处理请求，可以配置发送到收件箱或工作台。参见[自动化概念](/zh-cn/automate/fundamentals/)。

## 在工作空间协作

打开 **Workspaces** 选择工作空间。选择就绪的员工并启动会话，用于调查请求、细化设计等需要直接协作的任务。会话保留对话和执行历史。通过[产物与证据](/zh-cn/user-guide/artifacts-evidence/)查看生成的文件与相关记录。

## 配置执行资源

为项目配置[仓库连接](/zh-cn/integrations/code-repositories/)、[运行时](/zh-cn/deployment/runtime-environments/)及所需的[流水线资源](/zh-cn/software-factory/cicd/)。按泳道职责为员工授权。团队可以用已发布模板创建员工，也可以参考[员工架构](/zh-cn/build/architecture/)定义岗位、Skills 和工具依赖。

## 运营

在[团队与访问](/zh-cn/administration/teams-access/)中了解工作空间权限。参见[平台治理](/zh-cn/operate/evaluation-governance/)了解授权、工具访问、模型路由、成本、审计与质量门禁之间的关系。如果找不到相应操作，检查工作空间权限和部署配置。
