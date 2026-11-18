---
title: "GitHub"
description: "用个人访问 Token 连接 GitHub 仓库，轮询 Issue 与 Pull Request 活动，并导入未关闭的 Issue。"
sidebar:
  label: GitHub
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "ef00ebab20bf6778cb98ec0f24d594010b36f03ac1559420b6d2889c7de6e951"
---

GitHub 既是代码托管连接，也是事件来源。工作空间里的 Token 可以列出你有权访问的仓库；员工只有在被明确授权之后才能使用这个 Token；Job 可以响应平台通过轮询观察到的活动。轮询器只读。它不会评论、打标签、提交 Review、关闭事项或推送代码。

本页同时覆盖 GitHub.com，以及你填成 HTTPS 域名的 GitHub Enterprise 实例。凭据的共同规则见[代码仓库](/zh-cn/integrations/code-repositories/)。

## 它是什么

连接保存的是某一个 GitHub 域名上的个人访问 Token，然后指向这个 Token 能看见的仓库。事件规则监视一个已连接的仓库，把匹配到的观察入场为一次 Job 运行。Issue 导入把未关闭的 Issue 复制进 Task Inbox。软件工厂项目还可以把一个 GitHub Actions 工作流指定为看板要记录的流水线。

## 何时使用

仓库在 GitHub 上、Job 需要在 Issue、Pull Request、Review、评论、分支或已完成的 Actions 活动出现时醒来，或者要把未关闭的 Issue 放进收件箱时，使用 GitHub。其他托管用 [GitLab](/zh-cn/integrations/gitlab/) 或[云效 Codeup](/zh-cn/integrations/yunxiao/)。[Jira](/zh-cn/integrations/jira/) 和 [Linear](/zh-cn/integrations/linear/) 只提供管理员接好来源之后的导入。

## 两边交换什么

仓库发现会保存原生仓库 ID、路径、网页地址、克隆地址和默认分支。这些地址里不放密钥。

一次轮询读取 GitHub REST，并保存白名单里的事件字段。Job 的输入是一个封装，包含 `schema_version`、`id`、`source_id`、`type`、`received_at` 和 `data`。Token、模型和工作目录不会被复制进这个输入。事件里的提交 SHA 是 GitHub 返回的事实，不表示运行时已经检出这次提交。

Issue 导入复制标题、正文、来源键、状态和链接。正文超过 20,000 字时会截断，并保留原链接。评论、附件和子任务关系留在 GitHub。

| 轮询能观察到的活动                                | 规则可以按什么筛选                             |
| ------------------------------------------------- | ---------------------------------------------- |
| Issue 打开、关闭、重新打开、添加或移除标签        | 标签                                           |
| 新增 Issue 评论                                   | 评论文本、评论者身份                           |
| Pull Request 打开、更新、转为可审阅               | 目标分支。打开和更新还可以筛选草稿             |
| Pull Request 关闭、合并、重新打开、添加或移除标签 | 标签                                           |
| Pull Request 会话评论                             | 评论文本、评论者身份                           |
| Review 提交或撤销                                 | 已提交的 Review 可按批准、要求修改或仅评论筛选 |
| Review 代码行评论                                 | 评论文本、评论者身份                           |
| 分支推送                                          | 分支模式。操作者未知                           |
| Actions 工作流完成                                | 分支、工作流名称、运行结果                     |

评论事件默认接受所有者、成员和协作者，并跳过 Bot。一条规则可以放一到十二条事件条件。任意一条匹配就会入场。同一条条件上的每个筛选项都要匹配。

## 如何连接

### 仓库访问

1. 打开工作空间的「外部服务凭据」，添加 GitHub 个人访问 Token。实例填 `https://github.com`，或者 GitHub Enterprise Server 的 HTTPS 域名。不要带用户名、密码、路径、查询参数或片段。
2. 打开「集成」或工作空间的仓库列表。创建一条引用该凭据的连接，并给它起名。连接属于工作空间。
3. 浏览这个 Token 能访问的仓库，把本空间要用的加进来。核对克隆地址和默认分支。
4. 在凭据上授权每一个应该使用它的员工。能管理凭据的工作空间成员可以改元数据和授权。管理接口不返回密钥明文。

组织仓库可能要组织管理员审批。细粒度 Token 要先选 Resource owner，再选仓库。在仓库搜索里输入组织名，不会切换 owner。Classic Token 只有在组织策略允许时才能用，并且可能还要做 SSO 授权。

### 事件规则

1. 创建或打开 Job，选择 GitHub 事件。
2. 按仓库名或所有者选择仓库。已有来源会直接复用。仓库还没连接时，选择器使用你能访问的连接。Job 只保存对这条连接的引用，不复制 Token。
3. 选择事件和最窄的条件。新规则保存后默认停用。
4. 用样例预览。预览检查匹配和输入 schema。它不创建运行，也不向 GitHub 发帖。
5. 发布 Job，再启用规则。第一次成功读取只记录基线。

### 导入 Issue

1. 打开「导入任务」，选择 GitHub。
2. 选择本工作空间里已启用的 GitHub Token。这个选择器接受 github.com 的 Token。GitHub Enterprise 的 Token 不会出现在这里。
3. 选择该 Token 能读取 Issue 的仓库。
4. 勾选未关闭的 Issue 并导入。每批最多 25 项。已经导入的会跳过。

## 连接之后能做什么

被授权的员工可以使用这个 Token 实际具备的权限：读取文件；在 Token 和授权都允许时写入或推送。机器上的个人 Git 凭据不能代替这份工作空间授权。

匹配的事件会启动已发布 Job 的一次运行。之后怎样由人确认再进入交付，见 [Issue 自动化](/zh-cn/workflows/issue-automation/)和 [Pull Request 自动化](/zh-cn/workflows/pull-request-automation/)。内置的 Pull Request 查看器用于已连接的 GitHub 仓库。

在软件工厂项目上，可以把 GitHub Actions 选为看板要记录的流水线。这个绑定和「工作流完成」轮询是两回事。见 [CI/CD 集成](/zh-cn/software-factory/cicd/)。

## 权限与凭据

按要做的操作选择 Token 范围。只有 Metadata 读取，不代表代码或 Issue 可读。

| 操作                             | 细粒度 Token 需要包含 |
| -------------------------------- | --------------------- |
| 列出仓库、读取文件和分支         | Contents：Read        |
| Issue 和 Issue 评论              | Issues：Read          |
| Pull Request、Review、代码行评论 | Pull requests：Read   |
| 已完成的 Actions 运行            | Actions：Read         |

实际会读哪些接口，取决于已经启用的规则。GitHub Enterprise 调用该实例的 `/api/v3`。每次轮询都会复查工作空间执行权限、仓库和连接的关联、Token 归属，以及来源是否仍启用。读取事件不会给员工 Git 写权限。

Token 加密保存。在 AI Workforce 里删掉它，不会在 GitHub 上撤销，也不会停掉已经开始的会话。要失效或轮换，去 GitHub 操作。凭据仍被连接、授权、交付项目或未完成的工作引用时，平台会拒绝删除，要先去掉这些引用。

## 限制

轮询不是 Webhook 流。同一个来源在一次成功同步之后，至少要等 60 秒。限流、网络延迟和来源数量会把间隔拉得更长。遇到限流至少等待 15 分钟，并且不推进游标。每个列表最多读 10 页、每页 100 条。列表不完整，或单次轮询超过 45 秒，会保留原来的游标并显示错误。

第一次成功读取只建立基线，不会回放这之前的历史。暂停来源会丢掉尚未入场的事件。恢复后来源会建立新基线，不补跑空档。某一类事件的规则全部停用后，对应数据流的基线会被去掉，下次再订阅时重新开始。

Pull Request 比较的是当前打开列表，所以在两次轮询之间打开又关闭的 PR 可能看不到。Issue 打开会查看所有状态，因此打开后很快关闭的 Issue 仍可能被看到。分支比较的是当前 SHA。删除分支和 tag 不会触发。分支从 A 到 B 再回到 A，可以再次触发。Pull Request 更新的操作者记的是 PR 作者，事件里会标明这个限制。分支推送的操作者未知，因此会推送到被监视分支的 Job 可能观察到自己。让这样的 Job 使用单独的输出分支。

Review 只扫描最近 7 天更新过的 Pull Request。PENDING review 不触发。两次轮询之间提交后又撤销的 Review 无法还原。Actions 读取最近 7 天内创建的工作流运行，用运行 ID 和 attempt 区分。本版本没有 `Checks completed`，也没有 Review 讨论串已解决或未解决事件。用户名白名单、评论正则，以及一条规则订阅多个仓库，都不在这个版本里。没有 GitHub App，没有仓库 Webhook，没有历史回填，也没有手工重放。

作者是 Bot 时，Issue、Pull Request、评论、Review 和工作流事件不触发。

Issue 导入不迁移评论、附件和子任务，不会持续同步，也不会写回。已关闭的 Issue 不会出现在列表里。再次导入会跳过收件箱里已有的记录，并保留后来的人工修改。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [代码仓库](/zh-cn/integrations/code-repositories/)
- [Issue 自动化](/zh-cn/workflows/issue-automation/)
- [Pull Request 自动化](/zh-cn/workflows/pull-request-automation/)
- [事件驱动自动化](/zh-cn/automate/event-driven/)
