---
title: "自托管"
description: "在自己运维的基础设施上运行 AI Workforce 服务栈，包括本地 Compose、单机发布，以及两者的边界。"
audience:
  - platform-engineer
product_area: deployment
last_verified: "2026-11-19"
sidebar:
  label: 自托管平台
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
  sourceHash: "2f6f01cfe5aff1679426ee0245c35f020a62ae0c41b5a42c42a3e17c52446d68"
---

自托管是指由你们自己运行 AI Workforce 的服务：Web 应用、后端、PostgreSQL，以及这些服务保存的工作空间文件。运营方托管的部署是同一套产品，只是由别人替你们运行。使用工作空间、数字员工和工作流的方式不变。变的是谁运维这些服务，以及这些记录放在哪里。

平台服务提供本地开发栈和面向单机的 Compose 发布流程。设备执行器也可以单独部署到 Kubernetes，连接已有的平台。

如果还在选择平台和设备的部署位置，先看[运行时管理](/zh-cn/deployment/runtime-environments/)。

## 企业如何部署和管理数字员工

| 企业需要控制什么                 | 如何配置                                                                               | 谁负责运行                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 会话记录和工作空间文件的存放位置 | 在企业运维的主机上部署平台、PostgreSQL 和持久化数据卷。                                | AI Workforce 后端驱动模型调用、检查授权并保存记录。企业运维服务、备份数据并管理升级。    |
| 哪台机器可以操作项目文件         | 在持有项目文件的电脑上配对设备执行器，创建会话时选中它。平台可以继续由运营方托管。     | 平台管理会话与授权。工具以设备上的操作系统用户身份运行，文件访问范围取决于该用户的权限。 |
| 哪个服务可以收到推理请求         | 为员工使用的运行内核配置模型端点。要求推理留在企业网络内时，选择在内网完成推理的端点。 | 平台把本次推理所需的提示、文件内容和工具结果发给该端点。                                 |

例如，团队可以让数字员工在一台已配对的开发机上测试私有仓库的变更。如果还要求会话历史由企业保管，就把平台也部署在企业主机上。推理请求发往哪里，取决于模型端点的配置。[选择会话执行位置](/zh-cn/deployment/daemon/session-execution/) · [配置模型渠道](/zh-cn/administration/configuration/)

## 可以运行什么

| 布局                      | 它是什么                                                                           | 预期                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 本地开发栈                | `deploy/local`：Compose、源码挂载、前后端热更新、本地数据卷                        | 只供自己使用的开发环境。这是从一份源码检出就能启动的路径。                                       |
| 主机模式开发              | `deploy/local/deploy.sh`：PostgreSQL 在 Compose 里，API 和前端进程在主机上         | 同一目录里的另一个开发入口。中断进程后它会停。                                                   |
| 单机发布                  | `deploy/shared/compose`：PostgreSQL 16、后端镜像、前端镜像和 Caddy，由环境入口启动 | 一台主机原地更新，更新期间这台主机有一段不可用时间。不要在源码目录里直接运行共享发布脚本。       |
| 平台的 Kubernetes 或 Helm | 本基线没有维护中的 Operator 或 Chart                                               | 只有在自己保留迁移顺序、数据卷、运行时归属和就绪检查时，才另行打包这些服务。                     |
| 多机滚动更新              | 尚未实现                                                                           | 发布路径在一台主机上更新，迁移和启动期间会停掉正在运行的应用。负载均衡和共享存储不在这条路径里。 |

发布镜像由该环境的构建产出。本指南不增加公开镜像名，也不提供 `docker pull` 命令。发布主机的配置是环境入口已经校验过的运行配置契约。把 `deploy/local/.env` 拷到发布主机上，并不是那份契约。

## 服务各自做什么

| 部分          | 职责                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| Web 应用      | 工作空间界面。发布用的 Compose 把它放在 Caddy 后面。本地栈把它发布到主机端口。            |
| 后端          | 数字员工、会话、授权、自动化，以及模型循环。                                              |
| PostgreSQL 16 | 账号、工作空间记录、会话和自动化状态。                                                    |
| 数据卷        | 数据库文件、工作空间目录和后端的 home 目录。发布栈还会保留代理的证书数据。                |
| 设备执行器    | 可选。在你批准的电脑上跑工具进程，并向平台源站发起出站连接。它不是 Compose 里的一项服务。 |

发布用的 Compose 在代理上提供 HTTP 和 HTTPS，不把 PostgreSQL 暴露到公网端口。本地 Compose 会把前端、后端和 PostgreSQL 发布到主机端口，并且不运行 Caddy。

模型循环跑在你托管的平台上。任务用到的提示、文件内容和工具结果，仍会发到你配置的模型端点。自己托管平台，只是把平台这边的那份数据放在你的磁盘上。只有模型端点本来就在你的网络里，推理才会留在你的网络里。

## 前提

本地栈需要：

- Docker Engine 或 Docker Desktop，以及 Compose v2
- 平台源码仓库
- 从示例复制来的 `deploy/local/.env`，并换掉其中的占位密钥
- 后端能访问你将使用的模型端点、MCP 服务和代码托管站点

组织已经在运维的发布主机需要：

- 该环境自己的入口，由它调用共享发布脚本
- 该入口会校验的运行配置
- 存放数据库和工作空间数据卷的磁盘
- 对外名称的 DNS 和 TLS，在反向代理上终结
- 与这套数据库一起长期使用的同一组认证密钥和加密密钥

不要把生产密钥写进 `deploy/local/.env`。

## 启动本地栈

在平台仓库根目录执行：

```bash
cp deploy/local/.env.example deploy/local/.env
docker compose --env-file deploy/local/.env \
  -f deploy/local/docker-compose.yml up --build
```

第一次启动前先读这份复制出来的文件。把仍然写着 `replace-with` 的值换掉。它们只供本地使用。本指南不增加配置项。

后端容器会等到 PostgreSQL 健康，执行安全的 expand 迁移和 DBOS schema 步骤，再启动 API。一次新的 `up --build` 就够了。这个本地文件不需要再单独执行迁移命令。

然后打开：

- 前端：<http://localhost:5173>
- 后端：<http://localhost:8080>

示例文件会为这个本地进程打开账号创建。本地数据库是空的时候，打开前端，在登录页创建第一个账号。密码至少 8 位。进入之后，管理员在**运行时内核**里配置模型通道：服务地址、凭据和模型标识符。通道已经保存，也不代表地址一定可达。先跑一个小会话，再把这套栈当成可以承接正式工作。见[平台配置](/zh-cn/administration/configuration/)。

先看进程是否活着，再看它能不能接工作：

```bash
curl 'http://localhost:8080/api/health/live'
curl 'http://localhost:8080/api/health/ready'
```

`/api/health/live` 只说明进程在运行，不会访问数据库。`/api/health/ready` 说明这个实例能否按它的部署角色提供服务，其中包括数据库。`/api/health` 是兼容端点，会检查数据库。`/api/version` 返回进程拿到的发布 SHA。在这个本地栈上，除非环境另外设置，这个值是 `local`。

这些探测都不能证明模型通道、MCP 服务或仓库凭据能够完成任务。

默认端口已被占用时，修改 `deploy/local/.env` 里的 `FRONTEND_PORT`、`BACKEND_PORT` 或 `POSTGRES_PORT`，然后重新启动。

选中的 Docker 上下文是一台远程虚拟机时，笔记本上的绑定挂载在那台机器上是空的。加上虚拟机覆盖文件，让镜像里带上源码：

```bash
docker compose --env-file deploy/local/.env \
  -f deploy/local/docker-compose.yml \
  -f deploy/local/docker-compose.vm.yml up --build
```

本地栈会挂载仓库，编辑时重新加载前后端，并把 PostgreSQL、工作空间和依赖缓存放进这个 Compose 项目自己的命名卷。它不使用发布镜像，也不运行 Caddy。不要把它暴露到公网。本地模板默认打开管理员终端，这个终端可以在后端容器里打开一个 shell。

常用命令：

```bash
docker compose --env-file deploy/local/.env -f deploy/local/docker-compose.yml ps
docker compose --env-file deploy/local/.env -f deploy/local/docker-compose.yml logs -f backend frontend
docker compose --env-file deploy/local/.env -f deploy/local/docker-compose.yml down
```

`down` 停止容器并保留数据卷。`down --volumes` 会删除本地数据库、工作空间文件和依赖缓存。这些卷属于本地 Compose 项目，这条命令不会删掉另一台发布主机上的数据。

`bash deploy/local/deploy.sh` 是主机模式的开发入口。它用 Compose 启动 PostgreSQL，执行同样的 expand 和 DBOS 步骤，然后在主机上运行 API 和前端，直到你中断它。这台主机需要事先装好后端和前端的工具链。希望整套服务都在容器里时，使用上面的 Compose 文件。

## 在 Kubernetes 上运行设备执行器

可在 Kubernetes 中运行一个已授权的 Linux 设备执行器，连接现有 AI Workforce 平台。daemon 主动连接平台的 WSS 端点，Pod 无需入站端口。平台继续管理会话、授权和模型调用。任务以 Pod 用户身份运行，应只派发你信任的任务。

1. 从平台取得一个专用设备的 token、设备 ID 和授权用户 ID。在目标命名空间创建名为 `awf-device` 的 Secret，键名为 `token`、`device-id` 和 `actor-id`。每个执行器使用不同的设备凭据。
2. 在 `aiworkforce-daemon` 源码检出中构建镜像，推送到集群能拉取的镜像仓库。

   ```sh
   docker build -t registry.example.com/aiworkforce-device-exec:example .
   docker push registry.example.com/aiworkforce-device-exec:example
   ```

3. 在 `deploy/kubernetes/device.yaml` 中替换镜像地址，把 `AWF_CONTROL_URL` 改成平台的 `wss://你的平台域名/api/daemon/v2/connect`。为两个 PVC 使用集群默认 StorageClass 或显式指定 StorageClass。状态卷须允许 UID `10001` 在 `/var/lib/awf` 下创建并拥有 `device` 目录。
4. 在 Secret 所在的命名空间应用清单。查看日志，并在平台确认设备在线后再发起会话。

   ```sh
   kubectl -n YOUR_NAMESPACE apply -f deploy/kubernetes/device.yaml
   kubectl -n YOUR_NAMESPACE logs deployment/awf-device
   ```

每个设备部署一个副本。`/workspace` 和 `/var/lib/awf` 使用各自的 PVC。Pod 重建时保留状态卷。若上次的执行没有确认停止，新的 Pod 会保留隔离状态并拒绝新租约。遇到这种情况，保留 journal 供排查。

在 daemon 源码检出中运行 `python3 tests/kubernetes/test_lifecycle.py`，可在临时 k3d 集群复现执行、取消、租约到期、断线重连、驱逐和非正常退出后的隔离。这个测试使用 Pod 内的本地控制端。部署后在平台再跑一次小会话，验证实际 WSS 路由和设备鉴权。

## 网络与数据

| 留在部署上                                                    | 可能离开部署                                                         |
| ------------------------------------------------------------- | -------------------------------------------------------------------- |
| PostgreSQL 数据、工作空间文件、会话恢复点，以及认证和加密密钥 | 模型循环发给已配置模型端点的内容：提示、任务用到的文件内容、工具结果 |
| 发布代理的证书和数据库卷                                      | 数字员工对 MCP、代码托管站点，以及执行环境网络上其他工具的调用       |
| 设备执行器在那台电脑上的执行日志                              | 设备发回平台的工具结果；模型循环之后还可能把它们发给模型端点         |

发布部署应通过 HTTPS 提供服务。只信任这套部署自己的反向代理转发过来的头。不要把 PostgreSQL、私有执行控制路径和内部 Tool Bridge 入口做成公开 API。自动化 MCP 会检查允许的主机和来源，调用方仍然需要凭据和授权。细节见[安全与权限](/zh-cn/deployment/security/)。

设备执行器发起经过认证的出站连接。浏览器不需要能访问那台电脑上的监听端口。批准的工作目录用来标识上下文，不是操作系统沙箱。命令以主机用户身份运行。

除了你自己配置的端点，没有另一份必须放行的供应商主机清单。后端连不上模型或 MCP 时，任务会失败，即使 `/api/health/ready` 已经成功。Shell 工具、插件 Hook 和 MCP 使用它们所在环境的网络。这个产品没有给每个工具套上一层统一的网络沙箱。

## 升级与恢复

本地栈在更新源码后，用同一条 `up --build` 再启动。需要同一套数据库时，保留 env 文件和数据卷。

发布路径在一台主机上原地更新。正在运行的应用会先停，然后执行 expand 迁移，再启动新镜像。发布失败时会尝试恢复之前的镜像和配置。数据库不会自动降级，因此 expand 迁移必须仍能配合上一版应用工作。发布路径接着检查 DBOS schema 是否已经存在。启动发布镜像不会执行 DBOS 的 DDL。本地入口会在 API 启动前执行这一步。把它们当成两套不同的步骤。

测试和生产的发布入口每次发布都不新建数据库和文件备份。备份脚本还在，运维人员可以单独运行。依赖某份备份之前，先验证它。已经存在的备份会保留。在产品里删掉一条记录，不能证明备份或模型供应商也丢掉了副本。

把数据库、工作空间数据卷，以及稳定的认证密钥和加密密钥放进同一份恢复计划。`AIWORKFORCE_SECRET_ENCRYPTION_KEY` 必须和它加密过的那套数据库放在一起。不经过迁移就换掉这把密钥，已保存的密钥可能无法再读出。

会话文件历史使用 `AIWORKFORCE_SESSION_CHECKPOINT_MAX_MIB`。默认是单个会话 1024 MiB。这个值不是整台主机、Git 缓存或全部历史会话的磁盘配额。

认为升级完成之前，把 `/api/version` 和你打算运行的源码或镜像对照，检查 `/api/health/ready`，再重复一个小会话。

## 排查

| 现象                               | 先看什么                                                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `live` 成功而 `ready` 失败         | 先看 PostgreSQL，再看后端日志。就绪还取决于这个实例能否按自己的角色提供服务。删掉数据卷修不好一次迁移。                         |
| 两项健康检查都成功，任务仍然失败   | 模型通道、员工初始化和凭据。见[平台配置](/zh-cn/administration/configuration/)和[问题排查](/zh-cn/resources/troubleshooting/)。 |
| 界面、API 或数据库端口已被占用     | 修改 `deploy/local/.env` 里的 `FRONTEND_PORT`、`BACKEND_PORT` 或 `POSTGRES_PORT`，然后重新启动。                                |
| 远程 Docker 主机上的源码目录是空的 | 加上 `deploy/local/docker-compose.vm.yml`。                                                                                     |
| 登录页不能创建账号                 | 本地示例会打开账号创建。发布部署遵循它自己的运行配置。                                                                          |
| 设备一直离线                       | 浏览器里的批准和执行器在线是两步。使用 `aiworkforce-daemon status --json`。见[设备执行器 CLI](/zh-cn/integrations/cli/)。       |
| 改完之后已保存的密钥解不开         | 加密密钥和数据库不是同一代。恢复当初加密这套数据库的那把密钥。                                                                  |

## 相关文档

- [运行时管理](/zh-cn/deployment/runtime-environments/)
- [安全与权限](/zh-cn/deployment/security/)
- [设备执行器 CLI](/zh-cn/integrations/cli/)
- [平台配置](/zh-cn/administration/configuration/)
- [问题排查](/zh-cn/resources/troubleshooting/)
