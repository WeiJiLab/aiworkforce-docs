---
title: "我的机器"
description: "连接 macOS 或 Linux 电脑，确认设备在线并管理配对。"
sidebar:
  label: 我的机器
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "a3134a91e9a70fee527dfc7c052eaf07cdf09d662f5ada3606c874679c1cc554"
---

## 配对电脑

向部署管理员取得适用于这台 macOS 或 Linux 电脑的 `aiworkforce-daemon`，以 `aiworkforce-daemon` 为名安装到 `PATH` 中的目录。准备好要授权的项目目录、平台的 HTTPS 地址，以及能登录该平台的账号。

在电脑上运行以下命令，将两个示例值换成你的项目绝对路径和平台地址。

```bash
aiworkforce-daemon doctor --json
aiworkforce-daemon connect \
  --workspace /absolute/project/path \
  --platform https://platform.example.org
```

在终端确认允许主机执行，再在浏览器中核对账号、电脑和目录后批准。通过 SSH 连接时，可给 `connect` 加上 `--no-browser`，在另一台设备上打开终端显示的授权链接。

## 确认上线

批准后，CLI 会启动后台 worker。运行 `aiworkforce-daemon status --json`，确认 worker 在线。随后就可以[为会话选择这台电脑](/zh-cn/deployment/daemon/session-execution/)。

## 管理已连接的电脑

在个人设置的**设备连接**中查看在线状态、标记默认设备或撤销授权。`stop` 暂停本机 worker 并保留配对，`start` 可再次启动。要解除配对，运行 `aiworkforce-daemon disconnect`。

如需开机启动，可用 `service --format launchd` 或 `service --format systemd` 生成服务定义，核对运行账号、目录和平台地址后自行安装。完整命令见[设备执行器 CLI](/zh-cn/integrations/cli/)。
