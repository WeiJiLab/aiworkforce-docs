---
title: "Build a Plugin App"
description: "Add a dedicated interface to a digital employee with static HTML or an MCP App."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-26"
---

A Plugin App gives a digital employee a dedicated interface for a task, such as browsing specification files or reviewing a report. Workspace members can open an enabled app in **Custom workbenches** when their workspace permissions allow it. A tool with an MCP UI resource can also show an app beside a completed tool result in an employee session.

| What you want to build                      | Entry point                                                                                                                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A self-contained reference or report        | Put UTF-8 HTML in `.aiworkforce/apps/main/index.html`. Bundle styles and assets in the file. The file limit is 256 KiB.                                                     |
| An interactive interface in a plugin        | Declare `.aiworkforce/apps.yaml` and run the package’s MCP server over stdio.                                                                                               |
| A workbench backed by a configured provider | Use `.aiworkforce/hosted-workbench.yaml` for an employee app with a hosted provider. A deployment can also register standalone hosted workbenches in the workspace catalog. |
| A new way to render a session file          | Use a [Viewer App](/developer/viewer-apps/) and register an artifact renderer.                                                                                              |

## Package an interactive app

Start with the tool and HTML resource registration in the [MCP Apps quickstart](https://apps.extensions.modelcontextprotocol.io/api/documents/Quickstart.html). Bundle the server and its dependencies inside the [employee plugin](/build/plugins/). Put this declaration in `.aiworkforce/apps.yaml` to open the inventory app at the central warehouse.

```yaml
schemaVersion: 1
apps:
  - id: inventory-lookup
    title: Inventory lookup
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

Save the JSON as `.mcp.json` at the package root. The stdio entry can use `node` or `python3`. Register `open_inventory` with `_meta.ui.resourceUri` pointing to an existing `ui://` resource with MIME type `text/html;profile=mcp-app`. Match the entry arguments to its input schema. List the additional tools and UI resources the view needs in `tools` and `resources`, and give those tools app visibility.

For a static page, `data-workbench-context="Excerpt name"` marks an excerpt a user can select for the conversation draft. For an interactive page, use the [Plugin App API](/developer/plugin-app-api/) to call tools and pass the selected context to the host.

## Verify the installed app

1. Validate and publish the plugin, then apply it to an employee in a test workspace. If you changed an installed package, update the employee’s plugin so the host can use the new revision.
2. In **Custom workbenches**, open the installed app and check its initial data. Try a declared tool and check that an undeclared tool is unavailable. For a standalone hosted workbench, configure the provider for the workspace and use the provider’s declared read-only tools.
3. To verify the in-session entry, run the MCP tool in that employee’s conversation and open the app from the completed result. Check the restored arguments and result, then verify how a user can review and send an app-provided draft.
