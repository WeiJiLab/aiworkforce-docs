# Docs / Learn / API 信息架构

核对日期：2026-11-18。顶栏为 **Docs · Learn · API · Console**。英文与中文共用相同 slug；侧栏按栏目（portal）切换，上一页 / 下一页不跨栏目、不跨语言。源码仓库不放进顶栏。

## 顶栏去向

| 项      | 含义               | 去向                         |
| ------- | ------------------ | ---------------------------- |
| Docs    | 产品参考与配置     | `/` 与 `/zh-cn/`             |
| Learn   | 教程与课程路径     | `/learn/` 与 `/zh-cn/learn/` |
| API     | 程序化集成         | `/api/` 与 `/zh-cn/api/`     |
| Console | 产品控制台（外链） | `https://aiworkforce.run`    |

不要把 User / Builder / Platform Engineer 做成顶栏或 Docs 一级栏目；读者角色放在 Learn 路径描述里。

## 产品模型

工作流是组织单位。自动化触发并运行它。智能体（数字员工是其工作空间配置形态）在工作流内执行。软件工厂、看板自动化、Issue 自动化是工作流应用。

首页与 Docs 首屏以软件交付 / 软件工厂为主线，不以「创建第一名数字员工」开场。数字员工内容保留，并收在 Docs → Build Workflows → Agents → Employees。

## Docs 侧栏

顺序由 `src/lib/sidebar.mjs` 中 `PORTALS.docs` 决定：

1. Get started / 开始使用
2. Software Factory / 软件工厂
3. Automate Work / 自动化工作
4. Build Workflows / 构建工作流（Employees 在 Agents 下）
5. Run Workflows / 运行工作流
6. Operate / 运营（含 Self-host / 自托管）
7. Integrations / 集成。概览是目录，按代码托管、事项导入、消息渠道、监控告警分组，每项连接有自己的指南。MCP、Webhook 与员工工具仍留在 API 或「构建工作流」，目录只链接过去。不收录 ACP / A2A。
8. Resources / 资源

## Learn 侧栏

三条任务路径，而不是角色标签：

1. Software Factory Foundations
2. Build with AI Workforce
3. Run a Software Factory

另保留实践手册（需求、方案与工单、反馈）。课时可以是短文，或诚实指向对应 Docs 页。

## API 侧栏

从 Docs 的「集成与开发」中独立出来：

1. API Reference（鉴权、REST、OpenAPI）
2. Developer Guides（架构、贡献）
3. SDK / CLI
4. Webhooks
5. MCP

不收录 ACP / A2A，也不恢复 Agent Protocol 文档页。旧地址 `/integrations/agent-protocol/` 与 `/developer/` 已重定向。

## 支持状态

页面可用 `status`: `available`（默认）、`beta`、`limited`、`planned`。Beta / 部分支持 / 规划中使用侧栏徽标。当前 IA 不再保留底部「规划中」分组；规划页应移除或标明后暂不挂入主侧栏。

## 验证

```sh
npm run check:links
npm run check:navigation
```

`check:navigation` 确认每页只有当前栏目侧栏、顶栏含 Docs/Learn/API/Console、不含源码仓库链接和 Agent Protocol，以及语言切换与分页留在同一栏目。
