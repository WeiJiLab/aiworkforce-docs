---
title: "CLI"
description: "用 aiworkforce-device-exec 配对并操作一台执行计算机。它不是通用管理 CLI。"
support: limited
sidebar:
  badge:
    text: 有限制
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "4f26237cfafc4c567969c1392774598922f8fb4424873cd1d693c8d7fe114a97"
---

受支持的命令行客户端是 `aiworkforce-device-exec`。它配对一台 macOS 或 Linux 计算机，使平台可以在那里运行工具。它不创建员工、不编辑授权，也不调用管理 API。平台管理留在产品和 HTTP API 中。

## 只安装交给你的二进制文件

从维护者处获取兼容的二进制文件。发布安装自动化需要真实存在的已发布资源。守护进程的开发者可以在其自己的仓库里用 `cargo build --locked` 构建。不要假设存在同名的 npm 或 pip 包。

## 配对并检查

```bash
aiworkforce-device-exec connect --workspace /absolute/project/path \
  --platform https://platform.example.org
aiworkforce-device-exec status --json
aiworkforce-device-exec doctor --json
aiworkforce-device-exec stop
```

替换来源地址和目录。配对会请求可信主机执行同意，并打开浏览器授权流程。`--no-browser` 支持无界面使用。浏览器批准与 worker 进入平台在线执行状态是分开的。

`start`、`restart` 和 `disconnect` 管理连接。`service --format launchd` 或 `service --format systemd` 只打印服务定义，供另行审阅和安装。连接不会安装操作系统服务。命令以主机用户身份运行，不在隐含的文件系统沙箱里。

设备建立出站的已认证连接。浏览器不需要访问本地监听端口。工具结果仍然可以到达平台和已配置的模型提供方。见[运行时管理](/zh-cn/deployment/runtime-environments/)和[安全与权限](/zh-cn/deployment/security/)。
