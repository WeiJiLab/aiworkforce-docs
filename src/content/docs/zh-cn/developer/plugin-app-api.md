---
title: "Plugin App API"
description: "查看 MCP Apps 桥接协议、AI Workforce 扩展以及控制台承载应用所用的认证接口。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-26"
  sourceHash: "bc45d95daed29cdb54cedbf1ea37ffae0d3fd9061293c4cff4505e88a41bf042"
---

在界面里使用 MCP Apps 的 `App` 客户端，由 Platform 宿主转发请求。在调用 `connect()` 前注册初始工具输入和结果的处理器。连接后通过 `getHostCapabilities()` 读取能力，再显示当前宿主支持的操作。员工工作台、独立托管工作台和会话内应用支持的能力有所不同。[MCP Apps 客户端参考](https://apps.extensions.modelcontextprotocol.io/api/classes/app.App.html)

## 界面调用宿主

| API                                | AI Workforce 中的行为                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `ui/initialize`                    | SDK 的 `connect()` 协商协议，并返回宿主能力及语言、主题、显示模式等上下文。                                              |
| `tools/call`                       | 调用当前应用会话允许的工具。通过 `_meta.progressToken` 请求可用的 `notifications/progress`。                             |
| `tools/list`                       | 应用来源提供工具目录时，列出允许调用的工具。                                                                             |
| `resources/read`                   | 应用来源提供资源访问能力时，读取已授权的资源 URI。                                                                       |
| `ui/message`                       | 宿主提供消息能力时，把文本写入可编辑的会话草稿，由用户发送。                                                             |
| `ui/update-model-context`          | 随用户下一条消息带上应用上下文。工作台接受最多 4,000 个字符的文本。会话内的文本和结构化内容合计上限是 8,000 UTF-8 字节。 |
| `sampling/createMessage`           | 在具备能力的员工会话中请求一次文本生成。用户确认后，用员工配置的模型处理应用提供的文本。                                 |
| `ui/open-link`、`ui/download-file` | 宿主声明相应能力时，可请求打开链接或下载文件，由用户确认。                                                               |
| `ui/request-display-mode`          | 请求当前宿主声明支持的显示模式。                                                                                         |
| `ui/notifications/size-changed`    | 上报内容尺寸。支持自适应的内嵌宿主会在允许范围内调整高度。                                                               |

宿主发送 `ui/notifications/tool-input`、`ui/notifications/tool-result` 和 `ui/notifications/host-context-changed`。应用来源支持变更通知时，还会收到 `notifications/tools/list_changed` 和 `notifications/resources/list_changed`。收到 `ui/resource-teardown` 后释放界面资源。

## AI Workforce 扩展

- **浏览器状态。** 宿主在 `experimental` 中声明 `com.aiworkforce/app-state` 时，`aiworkforce/app-state/read` 返回 `{ state }`，`aiworkforce/app-state/write` 接受 `{ state: string | null }`。传入 `null` 可清除状态。每份最多 2 MiB，保存在当前浏览器，按应用、用户和工作空间等维度隔离。
- **仓库上下文。** 在资源的 `_meta.ui` 设置 `aiworkforce/workspaceRepositoryContext: true` 后，员工工作台提供仓库选择。再设置 `aiworkforce/repositoryDocumentation: true`，宿主可以用 `documentation.revision` 和 `documentation.files` 提供已授权的 Markdown 快照。没有快照时查看 `documentationStatus`。
- **会话报告。** 使用仓库上下文的应用可通过 `aiworkforce/sessionReport` 声明会话文件路径，例如 `output/report-{sessionId}.json`。宿主按会话文件权限读取，通过 `ui/notifications/tool-result` 的 `structuredContent` 传入数据。启用报告时包含 `report` 和 `requestedRunId`，可用运行编号识别当前请求对应的结果。

## 控制台 HTTP 接口

以下认证接口由 Platform 控制台使用。iframe 通过桥接协议操作，登录与应用会话凭据由宿主持有。调用按工作空间和员工权限检查。工作台目录返回宿主分配的 App key 和关联员工。

| 方法和路由                                                                      | 用途                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `GET /api/workspaces/{workspace_id}/workbenches`                                | 列出工作空间可用的工作台。                                               |
| `GET /api/workspaces/{workspace_id}/agents/{agent_id}/plugins/{plugin_key}/app` | 读取静态 Plugin App 资源。                                               |
| `GET /api/sessions/{session_id}/mcp-apps/tools?server={server}`                 | 查询会话内指定服务提供了哪些可用的应用工具。                             |
| `POST /api/sessions/{session_id}/mcp-apps/launch`                               | 用 `call_message_id` 和 `result_message_id` 从已完成的工具结果打开应用。 |

员工 App 以 `/api/workspaces/{workspace_id}/agents/{agent_id}/apps/{app_key}` 为基础路径。启动返回 `session_id` 和 `revision`，后续请求都携带这两个字段。

| 方法和后缀                          | 附加参数或返回内容                                                   |
| ----------------------------------- | -------------------------------------------------------------------- |
| `POST /launch`                      | 可传 `arguments`。返回应用、HTML、初始参数与结果，以及应用会话标识。 |
| `POST /calls`、`POST /calls/events` | 传 `tool` 和 `arguments`。事件接口流式返回进度和结果。               |
| `POST /tools/list`                  | 返回当前应用会话可调用的工具定义。                                   |
| `POST /resources`                   | 传 `uri`，返回获准读取的资源内容。                                   |
| `POST /changes`                     | 传 `tools` 和 `resources` 的变更计数，返回最新计数。                 |
| `POST /sampling`                    | 传 `conversation_id` 和 `params`，用于已授权的文本采样。             |
| `DELETE /session`                   | 关闭应用会话，返回 HTTP `204`。                                      |

独立托管工作台使用 `/api/workspaces/{workspace_id}/workbenches/{workbench_key}/mcp`。在基础路径用 `POST` 打开。用 `POST /{session_id}/tools` 或 `POST /{session_id}/tools/events` 携带 `{ name, arguments }` 调用只读工具，最后用 `DELETE /{session_id}` 关闭。

接入清单见[开发 Plugin App](/zh-cn/developer/plugin-apps/)。要核对当前部署的接口结构，可按 [OpenAPI 指南](/zh-cn/integrations/openapi/)查看。
