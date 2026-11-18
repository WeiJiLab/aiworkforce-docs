---
title: "Agent 组合"
description: "把有边界的任务委派给另一个 Agent，不要把正文里的提及当成真正的交接。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "b3fbb81161b27b12c0d87c8204869cecaa3147669edb136b931eab43e2409fa6"
---

组合是一名员工把任务的一部分委派给另一个 Agent，并仍然对结果负责。当前员工包把 subagent 放在 `agents/*.md`，把 hooks 当作执行扩展。某个运行时是否真的调用它们，要在追踪里核实。在 Skill 里写下“subagent”并不会创建委派。

没有一个单独的多 Agent 产品能保证父 Agent、子 Agent 和共享记忆一定存在。在把工作流描述成已委派之前，使用本页的检查。

## 何时拆分

当子任务有不同的输入、更小的范围，以及父 Agent 可以审阅的输出时，再拆分。不要拆成两个 Agent 重复同一套指令。可复用方法留在 Skill 里。父 Agent 仍然对员工定义中的输出和排除项负责。

人不是子 Agent。下一步需要人决定时，使用[人工确认](/zh-cn/user-guide/human-approval/)或交付卡片上的接管。[Agent 交接](/zh-cn/automate/agent-handoff/)说明跨会话和运行的交接，那是与进程内 subagent 不同的记录。

## 证明委派发生过

用一项父任务试一次：一个有支持的结论、一个没有支持的结论、一个含糊的来源。确认子 Agent 返回的区分被父 Agent 用进最终结果。打开执行追踪，寻找实际的委派，而不是只看最终正文。

如果追踪里没有子调用，就是父 Agent 自己做了工作，或忽略了指令。在把岗位写成一组 Agent 之前，先修复员工包或运行时支持。这些扩展点的实现检查见 [Hooks 与 subagents](/zh-cn/build/hooks-subagents/)。

## 守住边界

被点名不会让子 Agent 得到额外权限。工具授权、仓库授权和 MCP 授权仍在执行员工和运行时上。子提示词不能放宽它们。记下产物的哪一部分由哪个 Agent 产出，审阅者才能看到组合，而不是一段无法区分的回复。
