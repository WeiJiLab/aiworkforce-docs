---
title: "CI/CD 集成"
description: "在合并或发布能够运行之前，接上看板所需的仓库和流水线资源。"
status: limited
sidebar:
  badge:
    text: 部分支持
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "e73f32b7f871f7453c001a7f086f75194143259cae1ea2f9749698b74c23130c"
---

CI/CD 集成是软件工厂项目上配置的代码托管和流水线资源。工作台不代替你的 CI 系统，也不自带构建集群。自动合并和生产发布要求这些集成存在，并且已授权给执行员工。卡片不会创建它们。

## 要连接什么

把代码托管连接为工作空间仓库，然后授权应读取或写入它的员工。见[代码仓库](/zh-cn/integrations/code-repositories/)。GitHub Actions 绑定写在 [GitHub](/zh-cn/integrations/github/)。云效 Flow 绑定写在[云效 Codeup](/zh-cn/integrations/yunxiao/)。指明哪名员工和哪条流水线可以写入、合并或部署。保留这些操作仍然需要的人工确认。只读凭据不能合并。员工不能使用的工作空间凭据也不能合并。

在启用声称会测试或发布的泳道之前，配置项目的流水线资源。提供方、实例、启用状态和工作空间必须与你要使用的连接一致。删除平台凭据不会撤销上游令牌，也不会停止已经开始的会话。

## 一次运行如何使用 CI

测试发布和测试验证记录已配置流程返回的结果。失败可以把工作退回修复。生产发布为通过的批次记录合并结果。已完成扫描已合并的卡片，以进行生产发布和之后的清理。批次关闭并不表示生产发布已经完成。这些结果的区分见[发布治理](/zh-cn/software-factory/release-governance/)。

如果流水线没有配置，不要在卡片上写一条通过的 CI 检查。记录自动阶段没有运行；只有人真正跑过时，才使用点名的手动检查。该记录是[构建与测试](/zh-cn/software-factory/build-test/)。
