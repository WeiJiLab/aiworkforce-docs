---
title: "专家工作台示例"
description: "用数据导出权限案例，从需求来源、架构决策走到 PR 审查、初测与复测。"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-26"
  sourceHash: "a440d37325cdda5825701884e062aac4b4ecea9de45e962c3babfd7bd9ac2a7e"
---

项目团队需要把工作空间里的数据导出为 CSV。这页沿用 Platform 访客首页设计中的「数据导出权限」案例。下方的需求、PR 和测试报告使用示例数据，打开文档即可演练。

## 试一试专家工作台

四个界面参考 Showcase Agents 的示例。需求与规格结合需求编写原型的来源追溯和 Spec Studio 的规格文档。架构设计参考 SAD Agent 的节点证据。Code Review 把审查发现绑定到 PR 快照，Test Agent 在同一条证据链上保留初测和复测。演练使用示例数据。

先展开原始需求，沿 AC-3 找到架构中的工作空间授权边界。再打开对应的审查发现，在「测试用例」里切换初测和复测，看看哪些证据发生了变化。

<iframe src="/illustrations/expert-workbench/zh-cn/" title="数据导出权限专家工作台交互演练" loading="lazy" style="width:100%;height:42rem;border:0;border-radius:14px;"></iframe>

[单独打开专家工作台演练](/illustrations/expert-workbench/zh-cn/)

## 需求与规格

**ENG-124 · 把请求写成验收标准。** 把原始请求交给需求专家，请它找出需要确认的角色、资源范围和预期结果。

> 允许有导出权限的人把所在工作空间的数据下载为 CSV。

<div class="intro-review">

<details open>
<summary>查看验收标准</summary>

| 编号 | 场景                                       | 预期结果                         |
| ---- | ------------------------------------------ | -------------------------------- |
| AC-1 | 工作空间成员有导出权限，也有数据访问权限。 | CSV 只包含该成员有权读取的记录。 |
| AC-2 | 工作空间成员没有导出权限。                 | 返回 403，不提供下载文件。       |
| AC-3 | 有导出权限的成员请求另一个空间的数据。     | 返回 403，不提供下载文件。       |
| AC-4 | 授权范围内没有匹配的记录。                 | CSV 保留表头，数据行数为零。     |

</details>

</div>

需求负责人先确认这四项标准，再交给开发。后面的审查和测试沿用同一组编号。[查看需求写作指南](/zh-cn/learn/requirements-writing/)。

## 架构决策

**ADR-024 · 在导出边界完成授权检查。** 展开工作台上的导出 API、工作空间授权和 CSV 生成节点，查看各自的职责与来源。决策把 AC-3 带入 PR 审查，要求在生成文件前确认请求者能访问目标工作空间。

## 代码审查

**ENG-125 · PR #128。** 把变更文件和已确认的验收标准交给审查专家，请它找出缺少证据的条目，标明位置和修复建议。

<div class="intro-review">

<details open>
<summary>查看审查发现</summary>

| 审查发现                    | 证据                        | 建议动作                           |
| --------------------------- | --------------------------- | ---------------------------------- |
| AC-3 缺少资源级权限校验。   | `auth.ts:42` 只校验了角色。 | 补上对目标工作空间的访问权限校验。 |
| AC-4 缺少空结果的回归覆盖。 | `export.test.ts`            | 增加只有表头、没有数据行的用例。   |

</details>

</div>

审查人要求修改。开发补上工作空间权限检查和缺失用例，再提交新版供测试验证。[查看 PR 审查流程](/zh-cn/software-factory/pr-to-merge/)。

## 测试用例与验收

**ENG-126 · 更新后的 PR #128 回归报告。** 把验收标准编号和待测版本交给测试专家，请它记录运行环境、预期结果和实际观察。

**初测** `RUN-401` 在 `export-r1` 上记录了 EXP-03（AC-3）失败，EXP-04（AC-4）当时尚未添加。**复测** `RUN-402` 在 `export-r2` 中记录了这两项结果，并保留初测记录供审阅者对照。

<div class="intro-review">

<details open>
<summary>对照测试用例和结果</summary>

演练在测试环境中验证了 PR #128 的 `export-r2` 版本。

| 验收项 | 实际观察                     | 结果 |
| ------ | ---------------------------- | ---- |
| AC-1   | CSV 只包含授权范围内的记录。 | 通过 |
| AC-2   | 返回 403，未提供下载文件。   | 通过 |
| AC-3   | 返回 403，未提供下载文件。   | 通过 |
| AC-4   | CSV 保留表头，数据行数为零。 | 通过 |

</details>

**这份报告可以支持哪项决定？**

<details name="export-release-decision">
<summary>根据报告批准上线</summary>

报告覆盖的是受测版本的四项验收标准。生产发布的范围还需要由负责人确认。

</details>

<details name="export-release-decision">
<summary>接受测试证据，发布范围仍待确认</summary>

受测版本通过了四项检查。把版本和回归报告记在交付卡片上，等发布负责人确认上线范围。

</details>

</div>

可以回到[使用专家工作台](/zh-cn/user-guide/agent-chat/)交办自己的任务，也可以[在已有看板上交付第一条 Issue](/zh-cn/getting-started/quickstart/)，继续看团队如何交接。
