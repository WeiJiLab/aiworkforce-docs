---
title: Built-in Viewer Apps
description: Choose a viewer to read documents, inspect data and diagrams, or review code changes and pull requests.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-24"
---

When you open a session artifact, the platform matches its content, detected format, and current view mode to a Viewer App. If several apps match, use the artifact viewer menu to switch. For example, open `dashboard.html` in the HTML preview to see the report layout, then switch to the code viewer to read the HTML that produced it.

## Documents and data

| Viewer       | What to open                                      | What you can see                                                                                                                 |
| ------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Markdown     | A `README.md`, delivery notes, or Markdown report | Read the document with rendered headings, lists, and code blocks.                                                                |
| HTML preview | An HTML report such as `dashboard.html`           | Inspect the layout and inline styles in an isolated preview. Scripts, forms, and external resources are disabled in the preview. |
| JSON         | Structured output such as `report.json`           | Read indented objects and arrays with large integers and duplicate keys preserved.                                               |

## Diagrams and specifications

| Viewer               | What to open                                                     | What you can see                                                                                                                                 |
| -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Architecture Diagram | Draw.io, SVG, Graphviz DOT, Mermaid, or Context Mapper CML files | Render the diagram with pan and zoom. Context Mapper diagrams also expose model details and layout options. Switch to source if rendering fails. |
| DOORS ReqIF          | A ReqIF or ReqIFZ requirements export                            | Read specification modules, chapters, requirements, attributes, coverage links, and available attachments.                                       |

## Code and collaboration

| Viewer        | What to open                                                                     | What you can see                                                              |
| ------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Code and diff | A text file or two revisions of a code change                                    | Read the source, or use compare mode to inspect added and removed lines.      |
| Pull Request  | A PR snapshot, or a PR reference in a session connected to its GitHub repository | Read the description, file changes, commits, checks, and reviews in one view. |

## API

| Viewer     | What to open                                         | What you can see                                                                                 |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Swagger UI | A JSON or YAML file containing an OpenAPI definition | Browse paths and HTTP methods, then expand an operation to inspect its parameters and responses. |

To add another view for an existing artifact type, follow the tutorial to display the byte count of a JSON file. [Build a Viewer App](/developer/viewer-apps/)
