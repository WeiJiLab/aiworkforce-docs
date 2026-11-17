# 按读者任务组织的文档入口

核对日期：2026-11-17。依据 8090 实际页面切换与导航，AI Workforce 已采用 Docs、Developers、Learn 三个独立阅读入口。

## 8090 的三层导航

1. **全站入口**：左栏底部固定 Docs、Developers、Learn、Contact support，下方为主题选择。切换入口后，左栏的文档树整体变化。
2. **当前入口的目录**：左栏中部只展示当前阅读情境的内容。品牌与搜索位于左栏顶部，目录与全站入口的职责清楚。
3. **当前文章目录**：右栏展示本页标题层级，用于长文定位。

它的桌面正文上方没有品牌、分区、搜索、语言和主题共同占据的全宽导航。正文工具区域主要提供侧栏折叠与搜索；文章从分类、标题、摘要和内容操作开始。

## 三个入口的实际职责

| 入口       | 主要读者                                                  | 读者的问题                         | 实际内容组织                                                                                                  |
| ---------- | --------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Docs       | 产品、业务、工程协作人员与管理员                          | 如何使用和配置平台？               | General、Connections、Agent Prompts、Modules、Agents、Administration、Roles & Access Control、Resources       |
| Developers | 集成开发者与平台工程师                                    | 如何从程序中访问平台？             | External API、Organization API，以及 Conversations、Automations、Requirements、Skills、Work orders 等资源接口 |
| Learn      | 产品经理、技术负责人、Builder、FDE 等需要掌握工作方法的人 | 如何准备高质量输入并完成可靠交付？ | Requirements Writing、Blueprint Writing、Work Order Writing、Jira Migration、Reverse Engineering、Agent Skill |

这里的角色是阅读入口的适用人群，不是账号权限。Learn 也包含有经验的工程与交付人员；它的区别是讲方法、范例和判断标准。

## 同一个主题的三种问题

以 Requirements 为例：

- Docs 的 `/modules/requirements` 讲初始化、导航、编辑/建议/查看、评论、版本与导出等产品操作。
- Learn 的 `/opinions/requirements-writing-guide` 讲产品背景与功能需求的区别、稳定编号、用户结果、原子验收标准，以及拆分、合并、嵌套的判断。
- Developers 的 `/api-reference` 下按资源和端点讲鉴权、参数、请求、响应、分页与错误。

因此，同一个业务主题可以在多个入口出现，各篇回答不同问题并互相引用。共享术语和产品事实，避免复制同一份操作内容。

## AI Workforce 的三个入口

保留 Docs、Developers、Learn 的清晰命名，在入口页用中文副标题明确读者任务。42 篇指南与三个入口首页均有中英版本，共 90 个页面。

| 入口       | 副标题与主要角色                               | 本站内容归属                                                                                                  |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Docs       | 使用数字员工；业务用户、团队成员、管理员       | 入门、工作空间、员工、会话、事项、产物、自动化操作、交付工作台操作、连接配置、团队权限、模型用量、支持        |
| Developers | 构建与集成；Builder、FDE、开发者、平台工程师   | 员工定义、Skills/Plugins、工具与 MCP、Hooks/Subagents、架构、认证、API、CLI/SDK、运行环境、自托管、安全、贡献 |
| Learn      | 方法与实践；产品经理、Builder、FDE、交付负责人 | 需求写作、技术方案、执行任务设计、提示词方法、反馈研判、质量验收、Issue 到 PR 的端到端实践                    |

Builder 的职责横跨方法与实现：Learn 解释如何界定职责和验收能力，Developers 解释如何编写员工包、接入工具和验证实现。入口首页可以提供按角色推荐的起步顺序。

| 入口       | 英文首页      | 中文首页            | 每种语言的指南数 |
| ---------- | ------------- | ------------------- | ---------------- |
| Docs       | `/`           | `/zh-cn/`           | 26               |
| Developers | `/developer/` | `/zh-cn/developer/` | 11               |
| Learn      | `/learn/`     | `/zh-cn/learn/`     | 5                |

用户进入 Learn 时，只看到方法与实践目录；进入 Developers 时，只看到构建、集成与运维目录。底部始终提供跨入口切换。Docs 首页保留三类起步路径，明确标记将进入 Docs、Learn 或 Developers；各入口首页解释自己的阅读目标，并连接到相关指南。

## 界面方向

- 页头左侧放 AI Workforce 品牌与搜索，右上角放主题与语言选择。
- 左栏中间放当前入口的目录，可独立滚动。
- 左栏底部固定三个分区和支持入口，保持图标与可见文字。
- 每页只渲染一组主题与语言控件，位于右上角；侧栏和移动端抽屉不重复提供偏好控件。
- 正文保留阅读栏与右侧本页目录，减少顶部全站导航的视觉负担。
- 保留产品的 8/10/14px 圆角，分别用于导航、控件和卡片。
- 移动端将相同的入口层级放入导航抽屉，主题与语言仍保留在页头。
- 标题、正文与导航采用紧凑字号和行距，收紧段落及章节留白，保持阅读密度。

## 路由与目录规则

`src/lib/navigation.ts` 明确登记每个页面所属入口。Starlight 生成本地化目录后，路由中间件只保留当前入口的目录。直接打开文章、从站外链接进入或切换语言，都会解析到同一个入口；上一页与下一页也限定在当前入口和语言中。

既有指南 URL 保持稳定，入口归属不依赖 URL 前缀。例如，`/build/prompts-rules/` 与 `/recipes/issue-to-pr/` 属于 Learn；`/build/employee-definition/` 属于 Developers；`/integrations/overview/` 与 `/software-factory/overview/` 属于 Docs。新增文章必须明确归属一个入口，并按“操作 / 方法 / 技术契约”组织内容；跨主题关系使用正文链接表达。

首页与文章使用同一套内容布局。首页的二级标题由 Markdown 生成，进入本页目录；共享组件只负责图示和入口卡片。每个首页禁用上一页，下一步从自己的阅读入口开始。

## 验证

执行生产构建后运行：

```sh
npm run check:links
npm run check:navigation
```

`check:navigation` 从构建 HTML 检查全部 90 个页面：每篇只属于一个入口、目录完整且不重复、当前页标识正确、三个底部入口指向对应语言首页、语言选择保留当前文章、上一页与下一页不跨入口或语言。添加页面时同步更新 `src/lib/navigation.ts` 与 `scripts/check-navigation.mjs` 中的导航契约。

## 参考页面

- [8090 Docs](https://docs.8090.ai/general/introduction)
- [8090 Developers](https://docs.8090.ai/api-reference)
- [8090 Learn](https://docs.8090.ai/opinions/requirements-writing-guide)
- [8090 Requirements 产品操作](https://docs.8090.ai/modules/requirements)
