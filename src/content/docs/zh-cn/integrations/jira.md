---
title: "Jira"
description: "管理员为这个工作空间接好 Jira Cloud 项目之后，导入未关闭的 Issue。"
sidebar:
  label: Jira
last_verified: "2026-11-20"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "f67e364cff87e00432717783b9b2dc3e4e6e667690f19fdd5c08166cb85c7eb1"
---

在 AI Workforce 里，Jira 是一次性的、只读的 Task inbox 导入。只有管理员为这个工作空间、并为指定的人接好一个 Jira Cloud 项目之后，它才会出现。工作空间的集成目录里没有 Jira 卡片，没有项目浏览器，也不会把状态写回 Jira。

挂在员工上的 Jira MCP 服务是另一条路。那是[外部连接器](/zh-cn/integrations/employee-tools/)，有自己的工具和授权。它不是这次导入。

## 它是什么

部署里保存着一份导入来源列表。每一条 Jira 来源写明一个工作空间、可以使用它的用户、一个 Jira Cloud 站点、一个项目 key，以及存放账号邮箱和 API Token 的密钥变量名。名单里的人，同时还要有该工作空间的执行权限，才能在导入任务时看到这条来源。

## 何时使用

要把某个已知 Jira Cloud 项目里未关闭的 Issue 变成收件箱任务时使用它。导入的人要用自己的 Token 选择仓库或项目时，用 [GitHub](/zh-cn/integrations/github/) 或[云效 Codeup](/zh-cn/integrations/yunxiao/)。收件箱里已经有事项、还要让员工去调查时，再使用 Job 和 [Issue 自动化](/zh-cn/workflows/issue-automation/)。

## 两边交换什么

预览读取已配置项目中未关闭的 Issue：key、标题、描述、状态和链接。描述取自 Jira 的文档正文。导入把这些字段写成一条新的收件箱任务。评论、附件和子任务链接留在 Jira。正文超过 20,000 字时截断，并保留原链接。平台对 Jira 只做只读请求，不跟随重定向。

## 如何连接

### 导入任务的人

1. 打开「导入任务」，选择 Jira。
2. 弹窗若提示来源尚未配置，请管理员去连接。在产品里点选 Jira，不会开始一次 OAuth 安装。
3. 来源出现后选中它。名称旁边是连接名和项目 key。
4. 来源若显示尚未就绪，说明部署里还缺凭据。管理员补齐之前，导入不可用。
5. 勾选未关闭的 Issue 并导入。每批最多 25 项。已经在收件箱里的会被标出并跳过。

### 自建部署的管理员

把一条来源加进部署的事项导入列表。Token 和账号邮箱放在密钥库里。列表条目只保存变量名，不保存密钥正文。

| 字段     | 填写什么                                                             |
| -------- | -------------------------------------------------------------------- |
| 身份     | 稳定的来源编号，以及使用者能认出的名称。                             |
| 供应商   | `jira`。                                                             |
| 工作空间 | 工作空间编号，以及允许调用这条来源的用户编号。                       |
| 范围     | Jira 项目 key。                                                      |
| 站点     | Cloud 站点，形如 `https://<site>.atlassian.net`。                    |
| 凭据     | 能读取该项目的 API Token 的变量名，以及 Atlassian 账号邮箱的变量名。 |

把后端环境变量 `ISSUE_IMPORT_SOURCES` 设为 JSON 数组。将示例编号和范围替换为已获准的工作空间、用户与 Jira 项目。通过密钥库提供 `JIRA_IMPORT_TOKEN` 和 `JIRA_IMPORT_EMAIL`。部署注入数组与凭据后，重启后端。

```json
[
  {
    "id": "jira-example",
    "name": "Jira project import",
    "provider": "jira",
    "workspace_id": 42,
    "user_ids": [101],
    "scope": "ENG",
    "token_env": "JIRA_IMPORT_TOKEN",
    "site": "https://example.atlassian.net",
    "email_env": "JIRA_IMPORT_EMAIL"
  }
]
```

## 连接之后能做什么

导入的任务及复制的描述保存在工作空间的任务收件箱。打开一条，确认范围，需要开发时再把它送到工作台草稿。导入不创建会话，也不启动开发。同一条 Issue 再次导入时，会跳过已有的收件箱记录，并保留后来的修改。匹配依据是 Jira 站点加上 Issue ID。手工录入的旧记录，以及自动化用另一个来源键保存的记录，不会被自动合并。

## 权限与凭据

调用者必须在来源名单上，并且有该工作空间的执行权限。其他人的来源不会出现在响应里。浏览器拿不到 Token。邮箱或 Token 变量为空的来源会显示为尚未就绪，不能读取。

API Token 需要能读取该项目中的 Issue。这条连接不会给员工一个 Jira 登录。如果希望员工访问 Jira，那是单独的 MCP 连接和单独的授权。

## 限制

这一版按批导入未关闭的 Issue。它不订阅 Jira Webhook，不轮询后续变化，也不更新 Jira 的状态、评论或经办人。没有自助的 OAuth 应用，产品里也不能改选另一个项目。读取失败时，这一批不会写入一部分任务，错误里也不包含远端正文或凭据。超时之后先重新预览，再导入仍然缺少的项。

## 相关文档

- [集成目录](/zh-cn/integrations/overview/)
- [Issue 自动化](/zh-cn/workflows/issue-automation/)
- [任务收件箱](/zh-cn/user-guide/inbox-tasks/)
- [工具与连接器](/zh-cn/integrations/employee-tools/)
