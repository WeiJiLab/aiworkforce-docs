---
title: 标准数字员工市场
description: 将验证过的岗位能力包同步为模板，或从外部市场的插件开始构建草稿。
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "66e5e10213e1d441a4599c40e4c0086a9a0ad86c08807ccdeba20ea527f3a09e"
---

打开**标准数字员工市场**。内部市场列出岗位能力包。CI 排障样例通过后，选择已验证的版本，点击 **同步到数字员工模板**。项目成员随后可以在目标工作空间创建员工。

列表为空时，请系统管理员在[数字员工市场配置](/zh-cn/build/marketplace/)初始化构建器，再刷新或同步市场。也可以在[岗位模板构建](/zh-cn/build/builder/)中新建草稿。

**新增外部市场**保存 Git 仓库地址和分支。刷新时解析 `.claude-plugin/marketplace.json`。插件可以来自目录、GitHub 或 Git URL。**从插件构建岗位模板**把所选插件源码复制到需求工作树，打开构建会话，并按你给出的期望补齐规范后校验。

删除市场插件会清掉该插件的会话和 worktree，从主干移除插件，然后提交并推送到远端。删除不能证明工作空间里已经安装的模板也被移除。模板分发见[发布与分发](/zh-cn/build/publishing/)。
