---
title: Agent 构建器
description: 在需求工作树里迭代 Plugin，校验 Agent 包，并提交构建。
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "f6391eb8f63a2a4176188276b6cb7c20a5489a99ef07ae67e2fce579e06d81f4"
---

在 FDE 工作台打开**数字员工构建**。这个界面修改的是 Plugin。在工作空间安装已发布模板是另一个界面：[从模板创建第一个数字员工](/zh-cn/getting-started/first-employee/)。

使用 kebab-case 的 Plugin 标识。**新建数字员工**会新建 Plugin。**新建会话**将该标识关联到会话，同时保留已有会话和需求文件。构建器因尚未初始化而不可用时，请系统管理员在**管理控制台 → 数字员工市场**初始化。初始化步骤失败时，可使用**重试初始化**。

就绪的会话与构建器 Agent 对话。需求工作树路径显示在输入框下方。需求已绑定时，可以从会话打开插件文件。**Validate** 检查 Agent 包结构。**提交构建**会将已校验的草稿推送到共享市场分支。提交的影响见[发布](/zh-cn/build/publishing/)。包里该放什么，见[Agent 定义](/zh-cn/build/employee-definition/)、[Agent 指令](/zh-cn/build/prompts-rules/)和 [Skills 与 Plugins](/zh-cn/build/skills-plugins/)。

从市场转换插件时，所选插件源码会复制到独立的需求工作树，并打开会话，由构建器按期望补齐数字员工规范并校验。转换从[标准数字员工市场](/zh-cn/build/market/)开始。构建完成后，按[发布与分发](/zh-cn/build/publishing/)发布到内部市场。
