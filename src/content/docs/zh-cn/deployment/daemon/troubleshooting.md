---
title: "自托管机器故障排查"
description: "按症状检查本机环境、浏览器配对、worker 在线状态和会话执行位置。"
sidebar:
  label: 故障排查
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
  sourceHash: "7d8817c922ba117af6b2fa4b879e415090dfcd05fac3484dca098f771b4f198f"
---

先在配对的电脑上运行 `aiworkforce-device-exec doctor --json` 检查本机环境，再用 `aiworkforce-device-exec status --json` 查看 worker 是否在线。

| 你看到的                      | 要检查的                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `connect` 之前 `doctor` 失败  | 二进制文件、操作系统，以及你能否使用该工作目录。                                         |
| 浏览器没有完成批准            | 你使用了 `--no-browser` 却没有完成打印出的流程，或者 `--platform` 不是你的部署。         |
| 浏览器成功了，`status` 仍离线 | 批准和出站 worker 是两步。平台不会回拨到本地端口。                                       |
| 认证被拒绝                    | 为这个地址重新登录。平台登录不能修复已撤销的设备。重新配对。                             |
| 工具跑在另一个目录            | `--workspace` 就是你批准的目录。用打算使用的绝对路径重新配对。                           |
| 会话仍在平台上执行            | **执行位置**留在平台，或在第一条消息之后才设置。已连接的电脑和默认标记不会选中这个会话。 |

停止 worker 不会撤销平台凭据。`disconnect` 结束这一次配对，不删除账号。未知的停止状态会保持隔离，直到电脑报告发生了什么。不要删除本地日志来强迫电脑重新上线。

重新配对见[我的机器](/zh-cn/deployment/daemon/my-machines/)。命令参数和服务管理见[设备执行器 CLI](/zh-cn/integrations/cli/)。
