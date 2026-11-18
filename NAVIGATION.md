# Docs / Learn / FDE / API 信息架构

核对日期：2026-11-18。顶栏为 **Docs · Learn · FDE · API · Console**。英文与中文共用相同 slug；侧栏按栏目（portal）切换，上一页 / 下一页不跨栏目、不跨语言。源码仓库不放进顶栏。

## 顶栏去向

| 项      | 含义                         | 去向                         |
| ------- | ---------------------------- | ---------------------------- |
| Docs    | 产品参考与配置               | `/` 与 `/zh-cn/`             |
| Learn   | 教程与课程路径               | `/learn/` 与 `/zh-cn/learn/` |
| FDE     | FDE 工作台：发现、构建、发布 | `/fde/` 与 `/zh-cn/fde/`     |
| API     | 程序化集成                   | `/api/` 与 `/zh-cn/api/`     |
| Console | 产品控制台（外链）           | `https://aiworkforce.run`    |

FDE 是控制台里的独立工作台，不是读者角色标签。不要把 User / Builder / Platform Engineer 做成顶栏或 Docs 一级栏目；读者角色放在 Learn 路径描述里。

## 产品模型

工作流是组织单位。自动化触发并运行它。智能体（数字员工是其工作空间配置形态）在工作流内执行。软件工厂、看板自动化、Issue 自动化是工作流应用。

首页与 Docs 首屏以软件交付 / 软件工厂为主线。使用已发布员工留在 Docs → Use employees。定义、打包、发布和评测员工留在 FDE。已有指南换栏目时保留原 slug，例如 `/build/employee-definition/`。

## Docs 侧栏

顺序由 `src/lib/sidebar.mjs` 中 `PORTALS.docs` 决定：

1. Get started / 开始使用
2. Software Factory / 软件工厂。先是四条回路：需求 → 卡片、卡片 → PR、PR → 合并、信号 → 卡片。其后是 Issue、看板和 Pull Request 自动化，以及路径细则。
3. Automate Work / 自动化工作（含 Agent handoff）
4. Use employees / 使用数字员工
5. Run Workflows / 运行工作流
6. Integrations / 集成。概览是目录，按代码托管、事项导入、消息渠道、监控告警分组，每项连接有自己的指南。员工工具挂在概览之后。MCP 与 Webhook 留在 API。不收录 ACP / A2A。
7. Resources / 资源

运行工作流的第一页是 Daemon：在你管理的电脑上执行工具。自托管服务栈不在这一组。

## FDE 侧栏

对齐控制台里的 FDE 工作台。构建者参考页仍使用原来的 `/build/` 地址。运营从文档栏目移到这里，地址不变。

1. Customer discovery / 客户发现：访谈机器人、邀请、会议助手、会议记录
2. Build / 构建：构建器，以及员工定义、指令、架构、能力与组合
3. Publish and marketplace / 发布与市场
4. Configuration / 配置：渠道配置，仅管理员
5. Evaluation / 评测：员工测试，以及仅管理员的 Agent 评估
6. Operate / 运营：项目、权限、模型、评测与治理、审计、安全、自托管

## Learn 侧栏

三条任务路径，而不是角色标签：

1. Software Factory Foundations
2. Build with AI Workforce
3. Run a Software Factory

另保留实践手册（需求、方案与工单、反馈）。课时可以是短文，或指向对应的 Docs、FDE 参考页。

## API 侧栏

从 Docs 的「集成与开发」中独立出来：

1. API Reference（鉴权、REST、OpenAPI）
2. Developer Guides（架构、贡献）
3. SDK / CLI
4. Webhooks
5. MCP

不收录 ACP / A2A，也不恢复 Agent Protocol 文档页。旧地址 `/integrations/agent-protocol/` 与 `/developer/` 已重定向。

## 支持状态

页面可用 `status`: `available`（默认）、`beta`、`planned`。Beta / 规划中使用侧栏徽标。页面只写当前支持的行为，不使用「部分支持」徽标。当前 IA 不再保留底部「规划中」分组；规划页应移除或标明后暂不挂入主侧栏。

## 验证

```sh
npm run check:links
npm run check:navigation
```

`check:navigation` 确认每页只有当前栏目侧栏、顶栏含 Docs/Learn/FDE/API/Console、不含源码仓库链接和 Agent Protocol，以及语言切换与分页留在同一栏目。
