---
title: "GitLab"
description: "用个人访问 Token 连接 GitLab 实例、关联项目，并在交付项目上读取 Issue。"
sidebar:
  label: GitLab
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "7c4a2798b09e6d8c75086b3692c2cba21cf69b69432f584e9432d7fb8f2046c5"
---

GitLab 是针对某一个实例的代码托管连接，包括 GitLab.com。平台会列出 Token 能读取的项目，之后也可以读取已经绑定到交付项目上的仓库 Issue。它不会轮询 Merge Request，也不会把 GitHub 的 Pull Request 查看器套到 GitLab 上。

Token、实例和员工授权的共同规则见[代码仓库](/zh-cn/integrations/code-repositories/)。

## 它是什么

你把 GitLab 个人访问 Token 记在实例地址上，创建一条引用它的工作空间连接，再从该实例添加项目。交付项目随后可以把其中一个仓库当作只读的工作项来源。

## 何时使用

员工或软件工厂项目需要 GitLab 仓库时使用它。工作依赖轮询到的 Pull Request 或 Issue 事件时，用 [GitHub](/zh-cn/integrations/github/)。要把事项一次性复制进 Task Inbox 时，用 GitHub 或[云效 Codeup](/zh-cn/integrations/yunxiao/) 的导入。GitLab 不是这些导入来源之一。

## 两边交换什么

发现过程调用实例的 `/api/v4`，保存原生项目 ID、路径、网页地址、克隆地址和默认分支。项目可以在组里，也可以在多层子组里。地址是 HTTPS，里面没有凭据。

在交付项目上，GitLab Issues 来源会读取已经绑定的仓库的 Issue 及其评论（notes）。这次读取用来查看。它不会在 GitLab 上新建评论、改标签或关闭 Issue。

## 如何连接

1. 在「外部服务凭据」里添加 GitLab 个人访问 Token。实例填 HTTPS 域名，例如 `https://gitlab.com` 或自建 GitLab 的主机。不要把组或项目路径加在后面。
2. 在「集成」或仓库列表里创建一条使用该凭据的 GitLab 连接，并命名。已保存的连接，供应商和实例不能再改。
3. 浏览项目，把本空间要用的加进来。核对克隆地址和默认分支。
4. 授权每一个应该使用该凭据的员工。

列表为空、403 或 404，说明要检查 Token、成员身份、组策略或实例地址。这不表示后台正在等组织审批。Deploy Token 不能代替 API 访问 Token。SSO 和管理员策略仍要在 GitLab 里完成。

## 连接之后能做什么

被授权的员工可以在引用该凭据的任务里使用 Token 的 GitLab 权限。能列出项目，不代表员工可以推送。需要拉取代码时，给员工授权，并让 Token 具备 `read_repository`。

在交付项目上添加工作项来源，选择 GitLab Issues，再选一个已经绑定到该项目的仓库。保存后打开来源即可阅读 Issue。看板上的流水线供应商是 GitHub Actions 和云效 Flow。见 [CI/CD 集成](/zh-cn/software-factory/cicd/)。

## 权限与凭据

列出项目通常需要 `read_api`。Git 拉取需要 `read_repository`。只授予这个工作空间会用到的范围。Token 和其他工作空间凭据一样加密保存。在这里删除它，不会在 GitLab 上撤销，也不会停掉正在运行的会话。平台允许删除之前，要先去掉员工授权和仓库引用。

凭据属于工作空间。系统记录创建人；当前有凭据管理权限的人都可以管理它。

## 限制

没有 GitLab 事件轮询，没有 Merge Request 触发，也没有把 GitLab Issue 导入 Task Inbox 的功能。交付项目上的 Issue 读取是只读的。内置 Pull Request 查看器用于已连接的 GitHub 仓库。能浏览一个 GitLab 项目，不表示每个交付适配器都跑在这个实例上。要核对的是项目、员工授权，以及你实际配置的流水线。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [代码仓库](/zh-cn/integrations/code-repositories/)
- [CI/CD 集成](/zh-cn/software-factory/cicd/)
- [软件工厂概览](/zh-cn/software-factory/overview/)
