---
title: "Skills"
description: "编写可复用 Skill：写明输入、方法和人可以检查的输出。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
  sourceHash: "a97974c95c8fe2588f54ee9c6743e2273a1cf0f55ed227a4c3aad5b5395dd378"
---

Skill 是某一类任务的可复用方法。它不是员工，也不是工具。员工定义指定哪个 Skill 是入口。Skill 说明如何完成这项工作。只有职责仍然匹配时，多名员工才能共用同一种方法。外围插件的打包和分发见 [Plugins](/zh-cn/build/plugins/) 与 [Skills 和 Plugins](/zh-cn/build/skills-plugins/)。

<div id="把-skill-放进员工包" aria-hidden="true"></div>

## 把 Skill 放进 Agent 包

为入口 Skill 创建 `skills/main/SKILL.md`。目录名就是 `entry_skill` 和工作流引用使用的标识。下面的例子对应[Agent 定义](/zh-cn/build/employee-definition/)中的研究助手：

```markdown
---
name: main
description: Prepare a research brief from materials supplied by the user.
---

## Inputs

Ask for research_materials if none are available.
Use research_question to focus the brief when it is supplied.

## Method

1. Read only the supplied materials.
2. Separate supported findings from assumptions.
3. Cite the source for each finding.
4. List questions the materials do not answer.

## Output

Return a research_brief with findings, references, and open questions.
Do not publish or send the brief.

## Stop

If the request is to send, publish, or change an external system, stop and say that work is outside this skill.
```

方法必须具体到可以照着做。只写“要有帮助”的指令，审阅者没有可比对的标准。不要把凭据和主机名写进 Skill 文件。

## 把它接到岗位上

在 `employee.yaml` 中，`entry_skill: main` 必须指向这个目录。`router.md` 必须指向同一个 Skill，并说明必需输入缺失时怎么做。文件存在但没有被引用，就不是这名员工的方法。

确实需要第二个 Skill 时，给它单独的目录，并写明它负责的任务。不要把同一步骤复制到多个 agent 里。需要 subagent 时，文件放在 `agents/*.md`，见 [Agent 组合](/zh-cn/build/composition/)。

## 确认跑起来的是这个 Skill

提交构建前先校验 Agent 包。然后用有材料、无材料、超出范围的请求各试一次。发布后打开员工资料并刷新 **Methods and capabilities**，查看实例上的 Skills。Skill 缺失通常说明模板、包版本或已应用的配置不是你刚编辑的那一份。更新源文件并不能证明正在运行的实例已经改变。

如果方法需要外部系统，该依赖是单独配置和授权的 [MCP 服务](/zh-cn/build/mcp-integration/)或[工具](/zh-cn/build/tools/)。Skill 可以说明何时使用它。Skill 不能授予它。

## 相关指南

- [Agent 定义](/zh-cn/build/employee-definition/)
- [Plugins](/zh-cn/build/plugins/)
- [员工测试](/zh-cn/build/testing/)
