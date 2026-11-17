---
title: "身份认证"
description: "为管理 API、自动化调用和设备执行选择正确的 Bearer 凭据。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
  sourceHash: "b4d32b0878ba6100b75b62266cc06feafae9e8c3482dc364bff670b6781a74fe"
---

AI Workforce 为不同调用者使用不同凭据。将 Token 视为不透明的密钥，并使用端点要求的凭据。登录 Token、Personal Automation Token、供应商 Token 与设备凭据不能互换。

## 凭据类型

| 凭据                       | 用途                                            | 获取方式                                                  |
| -------------------------- | ----------------------------------------------- | --------------------------------------------------------- |
| 登录访问 Token             | 工作空间、Job 配置等登录用户管理 API            | `POST /api/auth/login`。                                  |
| Personal Automation Token  | 通过机器 API 调用、读取或取消允许的已注册自动化 | 自动化 Token 管理，或 `POST /api/automation-tokens`。     |
| 平台 Personal Access Token | 受支持的平台身份、MCP 或运行时流程              | 现有个人访问 Token 设置和轮换流程，仅用于明确支持的入口。 |
| 供应商凭据                 | 访问 GitHub、GitLab、Codeup 等上游系统          | 工作空间凭据管理或供应商专属连接流程。                    |
| 设备凭据                   | 认证已配对的执行电脑                            | 设备 daemon 的私有配对流程。                              |

## 登录并验证身份

示例使用本地后端默认地址；非本地开发时，替换为实际部署的 HTTPS 域名。下面的占位值不是实际凭据。

```bash
curl --request POST 'http://localhost:8080/api/auth/login' \
  --header 'Content-Type: application/json' \
  --data '{"email":"you@example.org","password":"<YOUR_PASSWORD>"}'
```

成功响应使用 `code: 0`，在 `data` 中包含 `access_token`、`token_type` 和 `user`。后续以 Bearer 方式传入返回的 Token：

```bash
curl 'http://localhost:8080/api/auth/me' \
  --header 'Authorization: Bearer <LOGIN_ACCESS_TOKEN>'
```

不要根据 JWT 库推断格式。当前实现使用自己的签名访问 Token 格式；服务端检查有效期、用户和账号凭据版本。要求修改临时密码的账号，必须先完成修改，才能执行普通管理操作。

## 创建有范围的机器凭据

外部自动化应先以有权限操作目标 Job 的用户登录，再签发 Personal Automation Token，只授予所需 scope，并明确 `allowed_definition_ids`。调用相关 scope 包括 `automation:invoke`、`automation:read` 和 `automation:cancel`。根据集成使用周期设置有效期。

创建响应返回 Token 明文，后续列表只返回元数据。将其保存在调用端已有的密钥存储中。每次请求仍会检查撤销状态、有效期、当前工作空间访问与 Job 允许列表。授予 Job Token，不等于允许调用者创建任意员工或替换已注册执行配置。

## 处理访问拒绝

`401` 表示需要该端点接受的有效凭据。登录过期时重新认证，不要无限重试旧 Token。权限或校验错误需要检查工作空间成员关系、授权、Token scope、允许的 Job ID 及 Job 状态。供应商授权问题应在对应连接中修复，替换登录 Token 不能修复已撤销的仓库 Token。

不要把 Token 放进 URL、版本库、提示词、截图或共享终端历史。向 Issue 附上示例输出前，先移除凭据。

## 相关文档

- [API 参考](/zh-cn/developer/api-reference/)
- [CLI、SDK 与协议入口](/zh-cn/developer/cli-sdk/)
- [安全与数据边界](/zh-cn/deployment/security/)
