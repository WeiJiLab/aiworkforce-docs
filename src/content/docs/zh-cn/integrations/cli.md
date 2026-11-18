---
title: "设备执行器 CLI"
description: "安装、配对并操作 aiworkforce-device-exec。它在一台计算机上运行工具，不管理平台。"
audience:
  - developer
  - platform-engineer
product_area: integrations
last_verified: "2026-11-18"
sidebar:
  label: 设备执行器 CLI
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "de342a23bb2bed4928b57ae597dc38a926856d0618e2527f8fc1dfeec876029e"
---

`aiworkforce-device-exec` 是设备执行器。它配对一台 macOS 或 Linux 计算机，让 AI Workforce 在那里运行工具。平台保留对话、模型循环和授权。这个 CLI 不创建员工、不修改授权、不调用管理 API，也不是一条通用的 `aiworkforce` 管理命令。

限制就在这个范围。没有受支持的 npm 或 pip 包，本基线也不发布公开下载地址或校验和清单。向你的部署维护者获取二进制文件。

HTTP、MCP 和 SDK 的接口对照在[接口总览](/zh-cn/developer/cli-sdk/)。不要把设备操作步骤再抄到那一页。

## 安装与验证

1. **获取发行版本。** 向维护者索取与这台计算机操作系统匹配的 `aiworkforce-device-exec`。守护进程的开发者可以在它自己的仓库里用 `cargo build --locked` 构建。只有一个包名，并不是安装路径。
2. **核对拿到的文件。** 确认文件名，以及维护者预期的就是这个构建。发布流程没有公布校验和时，本文档不能替你验证校验和。
3. **检查运行环境。** 支持的主机是 macOS 和 Linux。把二进制文件放到 `PATH`，然后运行：

```bash
aiworkforce-device-exec doctor --json
```

`doctor` 报告这台机器能否承担执行。阅读 JSON。这里失败是环境问题，不是平台故障。

4. **执行配对。** 使用你的部署的平台地址。下面的主机是占位符，不是线上服务：

```bash
aiworkforce-device-exec connect \
  --workspace /absolute/project/path \
  --platform https://platform.example.org
```

两个值都要替换。`--workspace` 是已批准的工作目录。它标识上下文，不是操作系统沙箱。`--platform` 是你的 AI Workforce 部署的 HTTPS 源。

5. **验证连接状态。** 浏览器批准和 worker 在线是两个步骤。批准主机执行之后运行：

```bash
aiworkforce-device-exec status --json
```

只有 `status` 显示 worker 在线，配对才完成。只在浏览器里批准，本身并不算完成。

## 命令

| 命令                                             | 作用                                     | 要看什么                                             |
| ------------------------------------------------ | ---------------------------------------- | ---------------------------------------------------- |
| `connect --workspace <path> --platform <origin>` | 开始配对，并建立出站的已认证连接         | 路径必须是绝对路径。源必须是你的部署。               |
| `connect --no-browser`                           | 在这台机器上不打开浏览器，进行同样的配对 | 你仍要完成命令打印出的授权流程。无界面不会跳过同意。 |
| `status --json`                                  | 显示 worker 是否已连接                   | 配对之后和重启之后用它。                             |
| `doctor --json`                                  | 检查本地执行环境                         | 安装失败时，在 `connect` 之前运行。                  |
| `stop`                                           | 停止正在运行的 worker                    | 不会卸载二进制文件，也不会撤销平台凭据。             |
| `start`、`restart`、`disconnect`                 | 管理连接生命周期                         | `disconnect` 结束这次配对会话，不会删除平台账号。    |
| `service --format launchd`                       | 打印 macOS 服务定义                      | 安装前先审阅。CLI 不会替你安装。                     |
| `service --format systemd`                       | 打印 Linux 服务定义                      | 安装前先审阅。CLI 不会替你安装。                     |

命令以主机用户身份运行。交给任务的工具结果和文件内容仍然可以到达平台和已配置的模型提供方。见[安全与权限](/zh-cn/deployment/security/)。

## 无界面配对

`--no-browser` 用于这台机器没有本地浏览器的情况。命令仍会请求可信主机执行同意，并打印你必须在别处完成的授权步骤。浏览器登录完成，不等于 `status` 报告 worker 在线。打印出的流程过期后，重新运行 `connect`。不要把一次旧的批准用到新的目录或源上。

## 作为服务运行

先生成定义，审阅之后，再用操作系统的工具安装。连接本身不会安装服务。

```bash
aiworkforce-device-exec service --format launchd
aiworkforce-device-exec service --format systemd
```

审阅工作目录、平台源，以及服务将以哪个用户运行。审阅之后再用 `launchctl` 或 `systemctl` 安装或移除。`stop` 停止当前进程。它不会卸载你自己安装的服务单元。卸载方式与安装方式相同，然后如果 worker 应忘记这次配对，再运行 `disconnect`。

## 配对失败时

| 你看到的情况                     | 检查                                                                                         |
| -------------------------------- | -------------------------------------------------------------------------------------------- |
| `connect` 之前 `doctor` 就失败   | 二进制文件、操作系统，以及工作目录的权限。                                                   |
| 浏览器一直完不成批准             | 你用了 `--no-browser` 却没有完成打印出的流程，或者源不是你的部署。                           |
| 浏览器成功了，但 `status` 仍离线 | 批准和出站 worker 连接是两件事。进程起来之后再运行 `status --json`。平台不会回连到本地端口。 |
| 认证被拒绝                       | 对这个源重新登录。平台登录不能修复已撤销的设备凭据。重新配对。                               |
| 工具跑在意外的目录里             | `--workspace` 就是你批准的上下文。用你想要的绝对路径重新配对。                               |

## 版本

本基线没有记录版本参数、升级通道或二进制兼容矩阵。要更换构建，向同一维护者获取替换文件，运行 `doctor --json`，如果 `status` 不再匹配部署，就重新配对。不要把一个发布线的二进制和未经维护者认可的平台源混用。

## 相关指南

- [运行时管理](/zh-cn/deployment/runtime-environments/)
- [安全与权限](/zh-cn/deployment/security/)
- [接口总览](/zh-cn/developer/cli-sdk/)
