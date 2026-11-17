---
title: "运行环境"
description: "在平台执行、自托管部署与已授权设备 Worker 之间选择合适的运行方式。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
  sourceHash: "efd9cbb48fadbbd4269395fa816075a23b390793e26b626217b48f90b3a393ab"
---

平台负责员工对话、模型循环、任务状态与授权；执行环境决定工具在哪里运行。自行托管平台、选择运行内核和选择设备有关联，但其中任何一项都不会自动补齐另外两项。

## 环境选择

| 环境           | 运行内容                                       | 准备条件                                                                   |
| -------------- | ---------------------------------------------- | -------------------------------------------------------------------------- |
| 运营方托管平台 | Web 应用、后端、数据库和已配置的云端执行       | 账号、工作空间权限、就绪员工及已启用供应商连接。                           |
| 自托管平台     | 由组织自行运营同一服务栈                       | 应用镜像或源码、PostgreSQL、持久化工作目录、运行时与模型配置、网络和备份。 |
| 本地开发栈     | 源码挂载的前后端与本地 Docker 卷               | Docker Engine/Desktop、Compose v2，使用平台仓库现有本地配置。              |
| 已授权设备     | 工具进程在批准的电脑运行，模型循环仍由平台管理 | 兼容 daemon、明确同意主机执行、浏览器配对及会话选择。                      |

运行时枚举包含多种内核名称。名称存在不代表部署已经可用：本基线的主会话注册表绑定 Claude Code 与 Pydantic AI。选择员工前，确认其实际内核、渠道模型配置及支持的能力。

## 启动本地开发栈

在平台源码仓库根目录使用已有本地模板和 Compose 文件：

```bash
cp deploy/local/.env.example deploy/local/.env
docker compose --env-file deploy/local/.env \
  -f deploy/local/docker-compose.yml up --build
```

启动前检查本地配置。本指南不增加新配置项。该栈先启动 PostgreSQL，执行安全的 expand 迁移和 DBOS Schema 步骤，再启动应用。前端默认位于 `http://localhost:5173`，后端位于 `http://localhost:8080`。

检查服务健康状态：

```bash
curl 'http://localhost:8080/api/health/live'
curl 'http://localhost:8080/api/health/ready'
```

存活检查反映进程状态，就绪检查反映能否接收工作；两者都不能证明所选模型、MCP 或仓库凭据能够完成任务，还需创建小会话检查真实输出。本地栈使用开发热更新，不是生产部署教程。

## 运营自托管环境

已有部署资产采用 Docker Compose，包含 PostgreSQL、后端、前端、反向代理与持久化卷。使用对应环境的部署入口和现有配置契约。不要把数据库、私有执行控制路径或内部 Tool Bridge 入口当成通用公开 API 暴露。

恢复计划应一起考虑数据库、工作目录，以及稳定的加密和签名密钥。显式管理 Schema 迁移，不能用应用启动替代迁移流程。发布失败可以恢复应用镜像与配置，但不会自动降低数据库版本。应独立验证备份，不要假定每次发布都产生了备份。

本基线没有确立维护中的 Kubernetes Operator 或 Helm Chart。采用其他服务打包方式时，需要保留迁移顺序、持久化存储、运行时归属、Worker 协调和就绪检查语义。

## 连接设备

使用[设备 CLI](/zh-cn/developer/cli-sdk/)配对 macOS/Linux 执行电脑。设备发起经过认证的出站连接，浏览器无需访问本地监听端口。执行进程使用主机用户权限，批准的工作目录用于标识上下文，不是操作系统隔离边界。

模型循环仍在平台运行，因此任务使用的文件内容和工具结果可能传到平台及配置的模型供应商。停止、断开和未知执行状态需要真实 Worker 证据，不要通过删除本地执行日志强行恢复在线。

## 相关文档

- [平台架构](/zh-cn/developer/architecture/)
- [安全与数据边界](/zh-cn/deployment/security/)
- [代码仓库连接](/zh-cn/integrations/code-repositories/)
