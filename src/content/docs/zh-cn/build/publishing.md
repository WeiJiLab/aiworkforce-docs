---
title: "发布与分发"
description: "把经过校验的 Agent 包发布为模板，并确认哪些实例收到了它。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
  sourceHash: "bbbba5555512c8589118b24fa09f14a50bcdcc48ed19ffe38caf1a837b6a6769"
---

发布使 Agent 包成为其他人可以用来创建工作空间员工的模板。它不等于创建一名员工，也不会把新版本推进已经存在的员工。

## 发布之前

校验 Agent 包，并完成[员工测试](/zh-cn/build/testing/)中的任务试验。`plugin.json` 和 `employee.yaml` 中的版本应标识这次行为。**Submit build** 保存构建。发布是之后让模板可见的步骤。

把项目中的工作方法整理成通用模板时，保留工作步骤、工具依赖和验收标准。用虚构示例替换原项目示例，从 Agent 包中移除凭据、内部引用和客户数据。在目标工作空间单独配置服务地址与权限，确认数据和工具的使用范围后再试跑模板。参见[安全与权限](/zh-cn/deployment/security/)。

结构通过仍可能描述了错误的岗位。再读一次岗位、排除项和入口 Skill。如果它们不一致，应修改[Agent 定义](/zh-cn/build/employee-definition/)。

## 使用者得到什么

有权限的工作空间用户从已发布模板创建员工，并等待初始化。他们不上传 YAML。实例在创建时复制岗位资料。之后编辑模板不会改写该实例。编辑实例资料也不会改写模板。

打开实例并刷新 **Methods and capabilities**，查看已应用的 Skills 和工具。如果缺少 Skill，说明模板版本或已应用的包不是你发布的那一份。告诉团队应使用哪个版本。不要告诉他们每名已有员工都会自行更新。

## 分发边界

当前版本通过已发布模板和平台应用的包来分发员工。这里不描述公开市场，也不描述向每个工作空间自动铺开。管理员控制部署展示哪些模板。[模板](/zh-cn/build/templates/)是这些起点的目录视图。谁可以从模板创建员工，由[团队与访问](/zh-cn/administration/teams-access/)控制。
