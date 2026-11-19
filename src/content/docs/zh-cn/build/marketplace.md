---
title: 数字员工市场配置
description: 设置 FDE 市场和 Agent 构建器使用的 Git 仓库地址与 Token。
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
  sourceHash: "c094ad5df050a0d731199483119fee7c6efe0cdecc207f41a887fcca4038f7d7"
---

在 FDE 工作台的配置分组打开**数字员工市场**。这一页需要仓库地址和 Git Token。默认仓库是 `aiworkforce-internal-agents`。Token 可以复用服务器上已经为 openstar-agents 市场保存的密钥，也可以在这里替换。

先在这一页初始化构建器，[Agent 构建器](/zh-cn/build/builder/)才能打开会话。这一页不编辑 Plugin。Agent 包内容留在构建器里，可转换的插件列在[标准数字员工市场](/zh-cn/build/market/)。

Token 是凭据。不要把它写进员工指令、Skill 或会议记录。
