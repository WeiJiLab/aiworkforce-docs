---
title: "Plugin App API"
description: "Reference for the MCP Apps bridge, AI Workforce extensions, and the authenticated console endpoints that host apps."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-26"
---

Use the MCP Apps `App` client in the view and let the Platform host forward requests. Register handlers for the initial tool input and result before calling `connect()`. After connecting, check `getHostCapabilities()` and show actions supported by that host. Employee workbenches, standalone hosted workbenches, and apps embedded in a conversation expose different capabilities. [MCP Apps client reference](https://apps.extensions.modelcontextprotocol.io/api/classes/app.App.html)

## View to host

| API                                | AI Workforce behavior                                                                                                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui/initialize`                    | The SDK’s `connect()` negotiates the protocol and returns host capabilities and context, including locale, theme, and available display modes.                                      |
| `tools/call`                       | Invoke a tool allowed for the current app session. Include `_meta.progressToken` to receive available `notifications/progress`.                                                     |
| `tools/list`                       | List callable tools when the app source exposes a tool catalog.                                                                                                                     |
| `resources/read`                   | Read an allowed resource URI when the source exposes resource access.                                                                                                               |
| `ui/message`                       | Put text in an editable chat draft when the host exposes messaging. The user sends the draft.                                                                                       |
| `ui/update-model-context`          | Attach context to the next user-sent message. The workbench accepts up to 4,000 characters of text. In a conversation, text and structured content share an 8,000 UTF-8 byte limit. |
| `sampling/createMessage`           | Request one text completion in an eligible employee conversation. The user approves the request, which uses the employee’s configured model and app-supplied text.                  |
| `ui/open-link`, `ui/download-file` | Ask the host to open a link or download a file when it advertises the capability. The user confirms the action.                                                                     |
| `ui/request-display-mode`          | Request an advertised display mode. Follow the host’s available modes.                                                                                                              |
| `ui/notifications/size-changed`    | Report content size. An inline host that supports auto-sizing adjusts the frame height within its supported range.                                                                  |

The host sends `ui/notifications/tool-input`, `ui/notifications/tool-result`, and `ui/notifications/host-context-changed`. For sources that expose change notifications it also sends `notifications/tools/list_changed` and `notifications/resources/list_changed`. Release view resources on `ui/resource-teardown`.

## AI Workforce extensions

- **Browser state.** If the host advertises `com.aiworkforce/app-state` under `experimental`, `aiworkforce/app-state/read` returns `{ state }` and `aiworkforce/app-state/write` accepts `{ state: string | null }`. Use `null` to clear the value. Each value is limited to 2 MiB and stored in the current browser under the app’s user and workspace scope.
- **Repository context.** Set `aiworkforce/workspaceRepositoryContext: true` in the resource’s `_meta.ui` for the employee workbench’s repository picker. With `aiworkforce/repositoryDocumentation: true`, the host can supply authorized Markdown via `documentation.revision` and `documentation.files`. Check `documentationStatus` when the snapshot is absent.
- **Session reports.** For a repository-aware app, set `aiworkforce/sessionReport` to a session file path such as `output/report-{sessionId}.json`. The host reads it under the user’s session-file permissions. It sends data bindings in the `structuredContent` of `ui/notifications/tool-result`, including `report` and `requestedRunId` when enabled. Use the run ID to identify results for the current request.

## Console HTTP reference

These authenticated endpoints back the Platform console. The iframe uses the bridge, and the console holds the login and app-session credentials. Workspace and employee permissions apply to requests. The workspace directory returns the host-assigned app key and associated employee.

| Method and route                                                                | Purpose                                                                       |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `GET /api/workspaces/{workspace_id}/workbenches`                                | List available workbenches.                                                   |
| `GET /api/workspaces/{workspace_id}/agents/{agent_id}/plugins/{plugin_key}/app` | Read a static plugin App resource.                                            |
| `GET /api/sessions/{session_id}/mcp-apps/tools?server={server}`                 | Find enabled app tools for a server in the conversation.                      |
| `POST /api/sessions/{session_id}/mcp-apps/launch`                               | Open a completed tool result using `call_message_id` and `result_message_id`. |

Employee App routes use `/api/workspaces/{workspace_id}/agents/{agent_id}/apps/{app_key}` as their base. Launch returns `session_id` and `revision`; include both in subsequent requests.

| Method and suffix                   | Additional payload or result                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `POST /launch`                      | Optional `arguments`; returns the app, HTML, initial arguments and result, and app-session identifiers. |
| `POST /calls`, `POST /calls/events` | `tool` and `arguments`; the events form streams progress and the result.                                |
| `POST /tools/list`                  | Returns the app session’s callable tool definitions.                                                    |
| `POST /resources`                   | `uri`; returns the permitted resource contents.                                                         |
| `POST /changes`                     | `tools` and `resources` revision counters; returns the latest counters.                                 |
| `POST /sampling`                    | `conversation_id` and `params` for authorized text sampling.                                            |
| `DELETE /session`                   | Closes the app session, returning HTTP `204`.                                                           |

Standalone hosted workbenches use `/api/workspaces/{workspace_id}/workbenches/{workbench_key}/mcp`. Open with `POST` at the base, call a read-only tool with `POST /{session_id}/tools` or `POST /{session_id}/tools/events` and `{ name, arguments }`, then close with `DELETE /{session_id}`.

See [Build a Plugin App](/developer/plugin-apps/) for manifests, or read the [OpenAPI guide](/integrations/openapi/) to inspect the schema for your deployment.
