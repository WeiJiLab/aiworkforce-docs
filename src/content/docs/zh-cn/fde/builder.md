---
title: 数字员工构建器
description: 在需求工作树里迭代 Plugin，校验员工包，并提交构建。
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "9440305b24a5a5669de05512bce3843d94dba2fccf1e421016964a14868c2985"
---

在 FDE 工作台打开**数字员工构建**。这个界面修改的是 Plugin。在工作空间安装已发布模板是另一个界面：[构建你的第一个数字员工](/zh-cn/getting-started/first-employee/)。

构建器需要 kebab-case 插件标识。**新建数字员工**开始一个。**新建会话**把该标识写入会话，并更新构建器，同时保留已有会话和需求文件。构建器尚未初始化时，先到[数字员工市场配置](/zh-cn/fde/marketplace/)初始化。初始化失败时使用**重试初始化**。不是 kebab-case 的插件标识会被拒绝。

就绪的会话与构建器 Agent 对话。需求工作树路径显示在输入框下方。需求已绑定时，可以从会话打开插件文件。**Validate** 检查员工包结构。**Submit build** 提交这次构建。包里该放什么，见[员工定义](/zh-cn/build/employee-definition/)、[Agent 指令](/zh-cn/build/prompts-rules/)和 [Skills 与 Plugins](/zh-cn/build/skills-plugins/)。

从市场转换插件时，所选插件源码会复制到独立的需求工作树，并打开会话，由构建器按期望补齐数字员工规范并校验。转换从[标准数字员工市场](/zh-cn/fde/market/)开始。构建完成后，按[发布与分发](/zh-cn/build/publishing/)发布到内部市场。
