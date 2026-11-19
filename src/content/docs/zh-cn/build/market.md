---
title: 标准数字员工市场
description: 同步内部数字员工，或把外部 Claude Code 插件市场中的插件转换成一次构建。
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "69caa4ee9e22a02eac1cb3f4200de1b592136b8d39b1a98395885cf36be0e357"
---

打开**标准数字员工市场**。这里列出内部数字员工，也可以读取外部 Claude Code 插件市场。

列表为空时，到[数字员工市场配置](/zh-cn/build/marketplace/)初始化并拉取仓库，或同步市场。也可以在[Agent 构建器](/zh-cn/build/builder/)里直接新建一个 Plugin 标识。

**新增外部市场**保存 Git 仓库地址和分支。刷新时解析 `.claude-plugin/marketplace.json`。插件可以来自目录、GitHub 或 Git URL。**转换为数字员工**把所选插件源码复制到需求工作树，打开构建会话，并按你给出的期望补齐规范后校验。

删除一名员工会清掉该插件的会话和 worktree，从主干移除插件，然后提交并推送到远端。删除不能证明工作空间里已经安装的模板也被移除。模板分发见[发布与分发](/zh-cn/build/publishing/)。
