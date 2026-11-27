# Docs / Learn / Customize & Extend / Developer 信息架构

核对日期：2026-11-21。顶栏为 **Docs · Learn · Customize & Extend · Developer · Console**。英文与中文共用相同 slug；侧栏按栏目（portal）切换，上一页 / 下一页不跨栏目、不跨语言。源码仓库不放进顶栏。

## 顶栏去向

| 项                 | 含义                  | 去向                                 |
| ------------------ | --------------------- | ------------------------------------ |
| Docs               | 产品参考与配置        | `/` 与 `/zh-cn/`                     |
| Learn              | 教程与课程路径        | `/learn/` 与 `/zh-cn/learn/`         |
| Customize & Extend | 定制和扩展 Agent 能力 | `/build/` 与 `/zh-cn/build/`         |
| Developer          | 应用开发与程序化集成  | `/developer/` 与 `/zh-cn/developer/` |
| Console            | 产品控制台（外链）    | `https://aiworkforce.run`            |

Customize & Extend 是文档栏目，中文名为「定制与扩展」。控制台中对应的产品入口是「FDE 工作台」（`/fde/`）。不要把 User / Builder / Platform Engineer 做成顶栏或 Docs 一级栏目；读者角色放在 Learn 路径描述里。

## 产品模型

岗位模板定义可委派的职责，数字员工实例在工作空间的授权范围内接单，团队逐项验收任务。工作流描述任务如何推进，自动化负责触发，专业智能体可承担执行步骤。软件工厂、看板自动化、Issue 自动化是工作流应用。

首页用软件维护岗位介绍模板、实例与任务，并从软件工厂看板展示一次可验收的交付。创建员工和交办任务的入门指南归入「开始使用」。定义 Agent 行为、扩展和组合能力、评测和发布模板归入「定制与扩展」。已有指南换栏目时保留原 slug，例如 `/build/employee-definition/`。

## Docs 侧栏

顺序由 `src/lib/sidebar.mjs` 中 `PORTALS.docs` 决定。栏目第一项是首页链接 **Docs home / 文档首页**，指向 `/` 与 `/zh-cn/`。其后分组为：

1. Get started / 开始使用。首页和侧栏依次提供「创建数字员工」「使用专家工作台」「使用交付工作台」。「使用专家工作台」收录会话指南和数据导出权限示例。「使用交付工作台」收录第一条 Issue、第一个看板和首次运行教程。
2. Expert workbench / 专家工作台。首页和侧栏提供专家工作台概览，以及上下文、执行进度、人工确认和产物审阅指南。
3. Software Factory / 软件工厂。先是概览和「协作模板」子组，再是四条回路：需求 → 卡片、卡片 → PR、PR → 合并、信号 → 卡片。其后是 Issue、看板和 Pull Request 自动化，以及路径细则。卡片排查指南紧接在「软件工厂路径」子组之后。
4. Automate Work / 自动化工作（含任务收件箱和 Agent handoff）
5. Run Workflows / 运行工作流
6. Deploy Managed Agents / 部署托管智能体。先从企业部署概览比较运行位置，再查看自托管平台指南。「自托管机器」子组收录设备概览、我的机器、会话执行位置、固定容量执行池和故障排查。执行池章节标注候选实现的部署条件。
7. Integrations / 集成。点击一级栏目「集成」可展开或收起目录。展开后，灰色分类标题下直接列出所有连接器。概览是目录，按代码托管、事项导入、消息渠道、监控告警分组，每项连接有自己的指南。员工工具挂在概览之后。MCP 连接与协议、Webhook 留在 Developer，Agent 的 MCP 依赖声明在定制与扩展。不收录 ACP / A2A。
8. Resources / 资源。收录简介、核心概念、「托管智能体与数字员工」、工作空间指南和平台地图。

## 定制与扩展侧栏

栏目首页是 `/build/`。旧 `/fde/` 文档链接按语言跳转到对应的 `/build/` 页面。运营从文档栏目移到这里，地址不变。

栏目首页从 CI 排障的岗位访谈讲到草稿验证、模板交付、工作空间验收和回归，再提供 Agent 包配置参考。

1. 定义 Agent（Define an agent）：Agent 定义、指令、构建器和架构
2. 配置能力（Configure capabilities）：Skills、Plugins、Tools 和 MCP 依赖
3. Agent 协作：组合、Hooks 与子 Agent
4. 测试与评测：结构校验、任务测试与管理员评测
5. 模板与发布：模板、发布、市场与分发
6. 运营：项目、权限、模型、评测与治理、审计、安全

## Learn 侧栏

两条学习路径：

1. Software Factory Foundations
2. Build with AI Workforce

另保留实践手册（需求、方案与工单、反馈）。

## Developer 侧栏

从 Docs 的「集成与开发」中独立出来：

1. API Reference（鉴权、REST、OpenAPI）
2. Developer Guides（架构、贡献）
3. SDK / CLI
4. Webhooks
5. MCP
6. Apps（开发 Plugin App、Plugin App API、内置 Viewer Apps、开发 Viewer App）

不收录 ACP / A2A，也不恢复 Agent Protocol 文档页。旧地址 `/integrations/agent-protocol/` 与 `/api/` 已重定向。

## 支持状态

页面可用 `status`: `available`（默认）、`beta`、`planned`。Beta / 规划中使用侧栏徽标。部署步骤描述当前支持的行为，不使用「部分支持」徽标。当前 IA 不再保留底部「规划中」分组。规划中的「执行环境调度」带徽标列入 Developer 的「开发指南」，「固定容量执行池」可从「自托管平台」和「运行时管理」进入。

## 验证

```sh
npm run check:links
npm run check:navigation
```

`check:navigation` 确认每页只有当前栏目侧栏、顶栏含 Docs/Learn/Customize & Extend/Developer/Console、不含源码仓库链接和 Agent Protocol，以及语言切换与分页留在同一栏目。
