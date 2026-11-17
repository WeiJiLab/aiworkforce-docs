---
title: "员工定义"
description: "用明确的职责、输入、输出和入口技能，定义可复用的数字员工。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
  sourceHash: "71dd498c5ef121a0216ed65be6b1d9207cda71ff644e0efc314a2eebbc48b182"
---

员工定义把可复用的 Agent 包变成一个可以理解、可以委派的岗位。先选定一个有边界的结果，例如根据用户提供的材料编写研究简报。

## 开始之前

本指南面向维护员工包的 Builder 和 FDE。工作空间用户从已发布模板创建员工，不是在创建页面上传这里的 YAML。如果你希望使用现成员工，请先阅读[数字员工](/zh-cn/user-guide/ai-employees/)。

## 包的结构

```text
research-assistant/
├── .claude-plugin/plugin.json
├── .aiworkforce/employee.yaml
├── .aiworkforce/router.md
├── README.md
└── skills/main/SKILL.md
```

`plugin.json` 提供包名等元数据；`employee.yaml` 描述岗位；`router.md` 指向唯一入口技能，说明如何处理输入不足或超出职责的请求；README 说明使用方法。

## 描述岗位

以下示例采用当前支持的 Manifest 字段：

```yaml
id: research-assistant
name: 研究助手
version: "0.1.0"
description: 根据用户提供的材料编写研究简报。
author: documentation-team
entry_skill: main
use_cases:
  - 为研究讨论做准备
responsibilities:
  - 总结提供的材料并标注来源
non_responsibilities:
  - 对外发布或发送材料
required_inputs:
  - research_materials
optional_inputs:
  - research_question
outputs:
  - id: research_brief
    description: 主要发现、来源与待确认问题
constraints:
  - 缺少材料时先询问，不直接下结论
```

`id` 使用 kebab-case。职责和不负责范围不能冲突。`entry_skill: main` 必须对应 `skills/main/SKILL.md`，路由说明也应指向同一个入口技能。

如果需要 `mcp_servers`，其中每项使用 `name` 和 `description` 描述预期服务。这里不放连接凭据，也不会因为写了名称就获得访问权限。

## 校验并试用

在员工构建器中先执行「校验」，再「提交构建」。解决缺少文件、必填字段、技能引用错误及职责冲突。随后分别尝试正常请求、输入不足的请求和超出岗位范围的请求，检查简报内容与引用来源。

结构校验通过不代表任务质量已经合格。文字约束描述行为要求；实际访问还取决于工具、凭据和运行时授权。发布后，从模板创建工作空间实例，并确认实例实际应用的能力。

## 相关文档

- [Skills 与 Plugins](/zh-cn/build/skills-plugins/)
- [MCP 集成](/zh-cn/build/mcp-integration/)
- [产物与证据](/zh-cn/user-guide/artifacts-evidence/)
