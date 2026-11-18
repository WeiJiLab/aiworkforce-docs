---
title: "云效 Codeup"
description: "连接阿里云云效，使用 Codeup 仓库、导入 Projex 工作项，并绑定 Flow 流水线。"
sidebar:
  label: 云效
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "6a77aab7c6c84f65d567acebbc8a2895a366551570445fe97f37b62635cffc0c"
---

云效是阿里云 DevOps 的代码托管连接，另外还有独立的 Projex 导入，以及可选的 Flow 流水线绑定。Codeup 仓库权限、Projex 工作项权限和 Flow 流水线权限，是同一类云效 Token 上的不同授权。有其中一项，不代表另外两项也有。

连接的共同规则见[代码仓库](/zh-cn/integrations/code-repositories/)。

## 它是什么

可以连接中心版 `https://codeup.aliyun.com`，也可以连接主机名以 `.devops.aliyuncs.com` 结尾的 Region 实例。中心版连接还要保存组织的原生 ID。连接可以列出 Codeup 仓库。导入的人可以用自己的 Token 和项目选择器，把 Projex 工作项导入 Task Inbox。交付项目可以绑定一条 Flow 流水线，供看板记录。

## 何时使用

仓库、Projex 项目或 Flow 流水线在云效上时使用它。需要轮询 Issue 和 Pull Request 事件时用 [GitHub](/zh-cn/integrations/github/)。管理员代为连接的导入用 [Jira](/zh-cn/integrations/jira/) 或 [Linear](/zh-cn/integrations/linear/)。

## 两边交换什么

仓库发现保存原生仓库 ID、路径、网页地址、克隆地址和默认分支。中心版调用 `openapi-rdc.aliyuncs.com`。Region 实例调用该实例上的 `/oapi/v1`。克隆地址不携带凭据。Codeup 连接必须填写在云效上实际登录用的 Git 用户名。

Projex 导入按一个分类读取组织（仅中心版）、项目和工作项。分类是任务、需求或缺陷。收件箱事项保留标题、正文、原生编号、原始状态；云效返回了链接时也保留链接。平台不会编造链接。搜索使用云效的只读查询，不会在云效里创建或修改工作项。评论、附件和持续同步留在云效。

Flow 绑定保存的是看板要观察的那条流水线。发布路径仍然使用项目上配置的流水线工具。

## 如何连接

### Codeup 仓库

1. 在「外部服务凭据」里添加云效个人访问令牌。中心版使用 `https://codeup.aliyun.com`。Region 令牌必须使用准确的 `https://<实例>.devops.aliyuncs.com`。
2. 创建 Codeup 连接。选择中心版或 Region。中心版要填写组织原生 ID，并填写云效要求的 Git 登录名。
3. 浏览仓库，把本空间要用的加进来。
4. 授权每一个应该使用该凭据的员工。

### 导入 Projex

1. 打开「导入任务」，选择云效。
2. 选择你已启用的云效 Token。还没有的话，可以在弹窗里添加。弹窗会把它和其他加密的工作空间凭据放在一起，不会把明文回显出来。
3. 中心版先选 Token 能访问的组织，再选 Projex 项目。Region 不选组织，直接用 Token 上的实例。
4. 选择任务、需求或缺陷，勾选后导入。每批最多 25 项。

已归档的项，以及 logical status 不是正常状态的项，不能导入。自定义状态名按云效返回的原文保留。产品不会根据中文状态名猜测哪一个表示已完成。

### 在交付项目上使用 Flow

在软件工厂项目里，为环境选择一条云效 Flow 流水线。中心版会要求组织。选择器从你配置的云效服务地址加载流水线。发布员工仍然需要该环境选中的流水线工具。见 [CI/CD 集成](/zh-cn/software-factory/cicd/)。

## 连接之后能做什么

被授权的员工可以在 Token 的 Codeup 权限范围内拉取和修改仓库。Projex 导入创建 Task Inbox 事项后就结束。它不打开会话，也不启动开发。事项确认之后要继续做，再走 [Issue 自动化](/zh-cn/workflows/issue-automation/)和交付看板。

交付项目也可以把 Projex 配成工作项来源，单独填写项目 ID、分类 ID、版本和 Token。这次读取和一次性的收件箱导入不是同一条路径。

## 权限与凭据

列出仓库、读取代码、读取 Projex 工作项和 Git 拉取，是分开授权的。一个只能访问 Codeup 仓库、却读不了组织、项目和工作项的 Token，不能导入 Projex。中心版在云效账号设置里创建令牌；Region 在该实例的个人访问令牌设置里创建。

Token 加密保存。在工作空间里删除它，不会在云效上撤销，也不会停掉正在运行的会话。平台阻止删除时，先去掉授权和连接引用。

## 限制

没有 Codeup 或 Projex 的事件轮询，导入也不会写回。同一工作项再次导入会被跳过，即使换了 Token 或改了分类。身份是实例、组织和原生工作项 ID。项目搜索和工作项搜索最多覆盖前 10,000 条。组织列表使用云效返回的完整列表。

一个 Token 不能混用中心版和 Region。Region Token 绑错了主机，就浏览不到那家企业。GitHub 的 Pull Request 查看器不用于 Codeup。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [代码仓库](/zh-cn/integrations/code-repositories/)
- [Issue 自动化](/zh-cn/workflows/issue-automation/)
- [CI/CD 集成](/zh-cn/software-factory/cicd/)
