---
title: "Linear"
description: "管理员为这个工作空间接好 Linear 团队之后，导入未关闭的 Issue。"
sidebar:
  label: Linear
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "5314fa4c2c2ef1a2a2edb53fdea43ef48a36649cb4d11a5b15e24f3e5cc5cb2c"
---

在 AI Workforce 里，Linear 是一次性的、只读的 Task inbox 导入。只有管理员为这个工作空间、并为指定的人接好一个 Linear 团队之后，它才会出现。没有 Linear 的 OAuth 安装，没有团队浏览器，也不会把状态写回 Linear。

## 它是什么

部署里保存着一份导入来源列表。每一条 Linear 来源写明一个工作空间、可以使用它的用户、一个团队 key，以及存放个人 API key 的密钥变量名。名单里的人，同时还要有该工作空间的执行权限，才能在导入任务时看到这条来源。

## 何时使用

要把某个已知 Linear 团队里未关闭的 Issue 变成收件箱任务时使用它。导入的人自己选择仓库或项目时，用 [GitHub](/zh-cn/integrations/github/) 或[云效 Codeup](/zh-cn/integrations/yunxiao/)。Jira Cloud 项目用同样由管理员连接的方式，见 [Jira](/zh-cn/integrations/jira/)。

## 两边交换什么

预览通过 Linear 的 API 读取已配置团队中未关闭的 Issue：编号、标题、描述、状态和链接。已完成和已取消的不会出现。导入把标题、正文、来源键、状态和链接写成一条新的收件箱任务。评论、附件和子 Issue 留在 Linear。正文超过 20,000 字时截断，并保留原链接。请求是只读的，不跟随重定向。

## 如何连接

### 导入任务的人

1. 打开「导入任务」，选择 Linear。
2. 弹窗若提示来源尚未配置，请管理员去连接。
3. 选中来源。名称旁边是连接名和团队 key。
4. 来源若显示尚未就绪，说明部署里还没有 API key。补上之前，导入不可用。
5. 勾选未关闭的 Issue 并导入。每批最多 25 项。已经在收件箱里的会被标出并跳过。

### 自建部署的管理员

把一条来源加进部署的事项导入列表。API key 放在密钥库里。列表条目只保存变量名。

| 字段     | 填写什么                                       |
| -------- | ---------------------------------------------- |
| 身份     | 稳定的来源编号，以及使用者能认出的名称。       |
| 供应商   | `linear`。                                     |
| 工作空间 | 工作空间编号，以及允许调用这条来源的用户编号。 |
| 范围     | Linear 团队 key。                              |
| 凭据     | 能读取该团队的个人 API key 的变量名。          |

把后端环境变量 `ISSUE_IMPORT_SOURCES` 设为 JSON 数组。将示例编号和范围替换为已获准的工作空间、用户与 Linear 团队。通过密钥库提供 `LINEAR_IMPORT_TOKEN`。部署注入数组与凭据后，重启后端。

```json
[
  {
    "id": "linear-example",
    "name": "Linear team import",
    "provider": "linear",
    "workspace_id": 42,
    "user_ids": [101],
    "scope": "ENG",
    "token_env": "LINEAR_IMPORT_TOKEN"
  }
]
```

## 连接之后能做什么

导入的任务及复制的描述保存在工作空间的任务收件箱。人可以打开一条，把已确认的事项送到工作台草稿。导入不创建会话，也不启动开发。同一条 Linear Issue 再次导入时，会跳过已有的收件箱记录，并保留后来的修改。身份是 Linear 的 Issue ID。手工录入的记录，以及自动化用另一个来源键保存的记录，不会被自动合并。

## 权限与凭据

调用者必须在来源名单上，并且有该工作空间的执行权限。浏览器拿不到 API key。Token 变量为空的来源会显示为尚未就绪，不能读取。Key 需要该团队的读取权限。接上来源，并不会授权员工去调用 Linear。

## 限制

这一版不轮询 Linear，不订阅 Linear Webhook，也不更新 Linear Issue。产品里不能让成员自己粘贴 key，也不能改选另一个团队。读取失败时，这一批不会写入一部分任务。超时之后先重新预览，再导入仍然缺少的项。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [Issue 自动化](/zh-cn/workflows/issue-automation/)
- [任务收件箱](/zh-cn/user-guide/inbox-tasks/)
- [Jira](/zh-cn/integrations/jira/)
