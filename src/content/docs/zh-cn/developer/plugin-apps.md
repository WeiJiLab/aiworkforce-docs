---
title: "开发 Plugin App"
description: "用静态 HTML 或 MCP App 为数字员工添加专用工作界面。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-26"
  sourceHash: "3a4b4f5c191a0f98114b60a47b56262dc86b125fa7cf53d1c6a7656420e5213f"
---

Plugin App 为数字员工提供专用界面，例如浏览规格文件或审阅报告。具备相应工作空间权限的成员可以在**自定义工作台**打开已启用的应用。带 MCP UI 资源的工具运行完成后，也可以从员工会话里的工具结果打开对应界面。

| 想做什么                 | 接入方式                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| 展示独立的参考资料或报告 | 把 UTF-8 HTML 放在 `.aiworkforce/apps/main/index.html`，在文件内打包样式和资源。上限为 256 KiB。      |
| 给员工插件添加交互界面   | 声明 `.aiworkforce/apps.yaml`，通过 stdio 运行插件包里的 MCP 服务。                                   |
| 接入已配置的托管提供方   | 在员工插件里使用 `.aiworkforce/hosted-workbench.yaml`。部署也可以在工作空间目录注册独立的托管工作台。 |
| 增加会话产物的展示方式   | 用 [Viewer App](/zh-cn/developer/viewer-apps/) 注册产物查看器。                                       |

## 打包一个交互应用

参照 [MCP Apps 快速入门](https://apps.extensions.modelcontextprotocol.io/api/documents/Quickstart.html)注册工具和 HTML 资源，再把服务及依赖打包进[员工插件](/zh-cn/build/plugins/)。把下面的声明放到 `.aiworkforce/apps.yaml`，让库存查询应用默认打开中央仓库。

```yaml
schemaVersion: 1
apps:
  - id: inventory-lookup
    title: 库存查询
    entry:
      kind: mcp-app
      server: inventory
      tool: open_inventory
      arguments:
        warehouse: central
    tools:
      - stock
```

```json
{
  "mcpServers": {
    "inventory": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/server.mjs"]
    }
  }
}
```

把 JSON 保存为插件根目录的 `.mcp.json`。stdio 入口支持 `node` 和 `python3`。给 `open_inventory` 设置 `_meta.ui.resourceUri`，指向实际存在的 `ui://` 资源，其 MIME 类型为 `text/html;profile=mcp-app`。按入口工具的输入 Schema 提供默认参数。界面需要的附加工具和 UI 资源分别列入 `tools` 和 `resources`，并在工具元数据中赋予应用可见性。

静态页面可以用 `data-workbench-context="摘录名称"` 标记可选入会话草稿的内容。交互页面通过 [Plugin App API](/zh-cn/developer/plugin-app-api/)调用工具，并把选中的上下文交给宿主。

## 检查已安装的应用

1. 校验并发布插件，再将它应用到测试工作空间的员工。如果修改了已安装的插件，更新该员工的插件版本，让宿主读取新的制品。
2. 在**自定义工作台**打开应用，核对初始数据。试调一项已声明的工具，再确认未声明的工具不可用。独立托管工作台需为目标工作空间配置提供方，并使用提供方声明的只读工具。
3. 验证会话入口时，在该员工的会话里运行 MCP 工具，再从已完成的结果打开应用。核对恢复的输入和结果，并确认用户可以检查和发送应用提供的草稿。
