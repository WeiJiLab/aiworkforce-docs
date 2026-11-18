---
title: "软件工厂概览"
description: "把工程工作从进入、执行、验证、证据走到由人作出的发布决定。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
  sourceHash: "d80194bd79f12f4d6f10b01e7e8c57161b22a1744738a6f9da05acf0f07b5db9"
---

软件工厂是 AI Workforce 的工程交付体系。它把已确认的请求连接到员工执行、能够检查变更的环境，以及人用来决定是否交付的证据。产品界面是**交付工作台**，从 **Automations** 的 `/automations?tab=board-flow` 进入。

这不是无人值守生成代码的产品。Agent 可以起草变更。工厂要做的是让从输入到经过验证的交付这条路径可以被检查。

## 三个层次

| 层次 | 必须成立的事实                            | 阅读位置                                                                                                                                                                                            |
| ---- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 执行 | 员工在 Harness 和运行时中完成被分派的任务 | [任务分派](/zh-cn/software-factory/dispatch/)、[编排](/zh-cn/software-factory/orchestration/)、[Harness](/zh-cn/software-factory/harness/)                                                          |
| 验证 | 在环境中、用测试、并对照业务结果检查产出  | [环境](/zh-cn/software-factory/environments/)、[构建与测试](/zh-cn/software-factory/build-test/)、[业务验证](/zh-cn/software-factory/business-verification/)                                        |
| 治理 | 证据、评测和门禁决定是否交付              | [证据](/zh-cn/software-factory/evidence/)、[评测](/zh-cn/software-factory/evaluation/)、[质量门禁](/zh-cn/software-factory/quality-gates/)、[发布治理](/zh-cn/software-factory/release-governance/) |

没有验证的执行，只是一段改过文件的对话。没有治理的验证，只是没人使用的测试结果。没有证据的治理，只是一个状态标签。

## 从进入到 Pull Request

1. **进入。** 请求以收件箱事项或工作台草稿进入。人确认范围、验收标准和允许的仓库。见[工作进入](/zh-cn/software-factory/intake/)。
2. **分派。** 就绪的卡片分配给应完成该工作的泳道员工。见[任务分派](/zh-cn/software-factory/dispatch/)。
3. **执行。** 该员工在已配置的运行时中通过会话工作。后续阶段要一起测试时，批次把卡片组合起来。见 [Agent 编排](/zh-cn/software-factory/orchestration/)。
4. **验证。** 测试准备和测试记录结果。失败可以把工作退回。业务检查把变更与已确认的验收标准比较。
5. **证据。** 卡片保留会话、代码引用或 Pull Request、测试结果和人工决定。见[证据与追踪](/zh-cn/software-factory/evidence/)。
6. **发布。** 只有仓库和流水线集成可用时，合并和生产发布才会执行。批次关闭不能证明生产发布已经完成。见[审阅与发布](/zh-cn/software-factory/review-release/)。

内置泳道是需求、开发、测试准备、测试、合并到主干和完成。自定义看板可以有不同安排。可用操作取决于所选看板。

## 先配置什么

启用任何自动交付之前，配置工作台项目和看板、仓库和流水线资源，以及泳道上的员工。员工必须就绪。仓库凭据属于工作空间；在连接里引用凭据，并不会授权每一名员工。为交付角色授权执行员工。提供方、实例、启用状态和工作空间必须与你要使用的连接一致。见[代码仓库](/zh-cn/integrations/code-repositories/)。

## 人留在回路里

草稿不是修改代码的许可。执行过程中，在卡片上回答问题和批准请求。接管会停止自动推进并保留当前状态。需要继续时明确交还。只恢复暂停并不能清除接管。对共享批次的操作可能影响其中每张卡片。

[你的第一个软件工厂流程](/zh-cn/getting-started/first-software-factory/)走通一张卡片。[Issue 到 PR](/zh-cn/recipes/issue-to-pr/)是更完整的实践。[自动化概念](/zh-cn/automate/fundamentals/)说明把工作收集到收件箱或工作台的 Job。这些 Job 不能代替确认步骤。
