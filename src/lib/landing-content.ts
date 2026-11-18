export type HomeSection =
  | "cta"
  | "applications"
  | "build-software"
  | "automate-work"
  | "build-workflows"
  | "run-workflows"
  | "operate"
  | "integrations"
  | "agents";
export type LandingPortal = "api" | "learn";
export type PortalSection = "paths" | "guides" | "next";

export interface LandingGuide {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

interface HomeContent {
  readonly primaryCta: LandingGuide;
  readonly secondaryCta: LandingGuide;
  readonly applications: readonly LandingGuide[];
  readonly buildSoftware: readonly LandingGuide[];
  readonly automateWork: readonly LandingGuide[];
  readonly buildWorkflows: readonly LandingGuide[];
  readonly runWorkflows: readonly LandingGuide[];
  readonly operate: readonly LandingGuide[];
  readonly integrations: readonly LandingGuide[];
  readonly agents: {
    readonly title: string;
    readonly description: string;
    readonly links: readonly LandingGuide[];
  };
}

export interface PortalPath extends LandingGuide {
  readonly label: string;
  readonly outcome: string;
}

export interface PortalContent {
  readonly paths: readonly PortalPath[];
  readonly guides: readonly LandingGuide[];
  readonly next: readonly LandingGuide[];
}

import { withBase } from "./site.mjs";

export function localizedGuideHref(href: string, zh: boolean): string {
  return withBase(`${zh ? "/zh-cn" : ""}/${href}/`);
}

function guide(title: string, description: string, href: string): LandingGuide {
  return { title, description, href };
}

export function getHomeContent(zh: boolean): HomeContent {
  return {
    primaryCta: guide(
      zh ? "交付第一项变更" : "Deliver your first change",
      zh
        ? "把一条 Issue 送到交付看板，跟踪实现，并审阅验证证据。"
        : "Take an Issue through the delivery board, then review the change and its evidence.",
      "getting-started/quickstart",
    ),
    secondaryCta: guide(
      zh ? "查看交付示例" : "View a delivery example",
      zh
        ? "跟踪一次表单修复，查看验收标准、代码变更和审阅证据。"
        : "Follow a form fix from acceptance criteria to code and verification evidence.",
      "recipes/issue-to-pr",
    ),
    applications: [
      guide(
        zh ? "在现有看板上交付" : "Deliver on an existing board",
        zh
          ? "已有交付项目？用一条小 Issue 跑通需求确认、实现和审阅。"
          : "Already have a delivery project? Take a small issue through confirmation, implementation, and review.",
        "getting-started/quickstart",
      ),
      guide(
        zh ? "配置团队交付" : "Set up team delivery",
        zh
          ? "创建交付看板，连接仓库，配置执行和验证，试跑第一张卡片。"
          : "Create a delivery board, connect a repository, configure execution and verification, and try your first card.",
        "getting-started/first-software-factory",
      ),
      guide(
        zh ? "从外部系统启动 Job" : "Start a Job from an external system",
        zh
          ? "用入站 Webhook 触发已发布的 Job，然后查询运行结果。"
          : "Trigger a published Job with an inbound webhook, then query the run for its result.",
        "integrations/webhooks",
      ),
    ],
    buildSoftware: [
      guide(
        zh ? "交付流程概览" : "Delivery overview",
        zh
          ? "了解从工作进入到审阅与发布的交付路径。"
          : "Explore the delivery path from intake through review and release.",
        "software-factory/overview",
      ),
      guide(
        zh ? "Issue 自动化" : "Issue Automation",
        zh
          ? "把事项整理、确认并送入交付。"
          : "Triage, confirm, and route issues into delivery.",
        "workflows/issue-automation",
      ),
      guide(
        zh ? "看板自动化" : "Kanban Automation",
        zh
          ? "按泳道推进持续交付。"
          : "Move continuous delivery work through lanes.",
        "workflows/kanban-workbench",
      ),
      guide(
        zh ? "Pull Request 自动化" : "Pull Request Automation",
        zh
          ? "轮询 GitHub PR 事件，匹配规则时启动 Job 并查看调查结果。"
          : "Poll GitHub for pull request events, start a Job on a match, and review its findings.",
        "workflows/pull-request-automation",
      ),
      guide(
        zh ? "构建与验证" : "Build and verification",
        zh
          ? "核对候选版本和已配置的构建与测试结果。"
          : "Check the release candidate and its configured build and test results.",
        "software-factory/build-test",
      ),
    ],
    automateWork: [
      guide(
        zh ? "工作流概念" : "Workflow concepts",
        zh
          ? "工作流、自动化与运行如何区分。"
          : "How workflow, automation, and run differ.",
        "workflows/concepts",
      ),
      guide(
        zh ? "自动化基础" : "Automation fundamentals",
        zh
          ? "Job、触发与持续推进。"
          : "Jobs, triggers, and continuous progress.",
        "automate/fundamentals",
      ),
      guide(
        zh ? "触发与日程" : "Triggers and schedules",
        zh ? "决定工作流何时启动。" : "Decide when a workflow starts.",
        "automate/triggers-schedules",
      ),
      guide(
        zh ? "事件驱动" : "Event-driven work",
        zh ? "由外部事件启动运行。" : "Start runs from external events.",
        "automate/event-driven",
      ),
      guide(
        zh ? "持续工作" : "Continuous work",
        zh
          ? "循环、观察与看板消耗。"
          : "Loops, watchers, and board consumption.",
        "automate/loops",
      ),
    ],
    buildWorkflows: [
      guide(
        zh ? "智能体" : "Agents",
        zh
          ? "工作流内的执行参与者。数字员工是其中一种配置形态。"
          : "Execution participants inside a workflow. Employees are one configured form.",
        "user-guide/ai-employees",
      ),
      guide(
        zh ? "技能与插件" : "Skills and plugins",
        zh
          ? "可复用的工作方法与能力包。"
          : "Reusable methods and capability packages.",
        "build/skills-plugins",
      ),
      guide(
        zh ? "工具与 MCP" : "Tools and MCP",
        zh
          ? "一次操作，或 MCP 服务暴露的外部工具。"
          : "An operation, or tools exposed by an MCP server.",
        "build/mcp-integration",
      ),
      guide(
        zh ? "智能体交接" : "Agent handoffs",
        zh
          ? "在步骤之间传递上下文与责任。"
          : "Pass context and responsibility between steps.",
        "automate/agent-handoff",
      ),
      guide(
        zh ? "工作流配置" : "Workflow configuration",
        zh
          ? "用构建器组合触发、执行与审批。"
          : "Compose triggers, execution, and approvals in the builder.",
        "automate/workflow-builder",
      ),
    ],
    runWorkflows: [
      guide(
        zh ? "环境" : "Environments",
        zh
          ? "仓库、设备与流水线资源。"
          : "Repositories, devices, and pipeline resources.",
        "software-factory/environments",
      ),
      guide(
        zh ? "编码智能体与 Harness" : "Coding agents and harness",
        zh
          ? "执行变更的运行时与约束。"
          : "Runtime and constraints for applying changes.",
        "software-factory/harness",
      ),
      guide(
        zh ? "运行时" : "Runtime",
        zh
          ? "平台、自托管或已授权设备。"
          : "Platform, self-hosted, or an authorized device.",
        "deployment/runtime-environments",
      ),
      guide(
        zh ? "运行与恢复" : "Runs and recovery",
        zh
          ? "跟进一次运行并处理失败。"
          : "Follow a run and recover from failure.",
        "automate/runs-recovery",
      ),
      guide(
        zh ? "证据" : "Evidence",
        zh
          ? "证明工作完成，而不只是对话结束。"
          : "Proof the work finished, not only that the conversation ended.",
        "software-factory/evidence",
      ),
    ],
    operate: [
      guide(
        zh ? "项目" : "Projects",
        zh
          ? "交付项目与工作空间边界。"
          : "Delivery projects and workspace boundaries.",
        "user-guide/projects",
      ),
      guide(
        zh ? "权限" : "Permissions",
        zh
          ? "团队访问与授权边界。"
          : "Team access and authorization boundaries.",
        "administration/teams-access",
      ),
      guide(
        zh ? "模型与成本" : "Models and cost",
        zh ? "模型通道与用量观察。" : "Model channels and usage visibility.",
        "models/overview",
      ),
      guide(
        zh ? "评测与治理" : "Evaluation and governance",
        zh
          ? "验收、评测与发布门禁。"
          : "Acceptance, evaluation, and release gates.",
        "operate/evaluation-governance",
      ),
      guide(
        zh ? "可观测性" : "Observability",
        zh ? "运行记录与审计。" : "Run records and audit.",
        "software-factory/observability",
      ),
    ],
    integrations: [
      guide(
        zh ? "集成总览" : "Integrations overview",
        zh
          ? "仓库、消息渠道与事件入口。"
          : "Repositories, chat channels, and event entry points.",
        "integrations/overview",
      ),
      guide(
        zh ? "GitHub 与代码仓库" : "GitHub and repositories",
        zh
          ? "连接代码托管与交付项目。"
          : "Connect code hosting and delivery projects.",
        "integrations/code-repositories",
      ),
      guide(
        zh ? "MCP、Webhook 与 API" : "MCP, webhooks, and API",
        zh
          ? "程序化集成见 API 栏目。"
          : "Programmatic integration lives under API.",
        "api",
      ),
    ],
    agents: {
      title: zh ? "供 Agent 阅读" : "Documentation for agents",
      description: zh
        ? "每页可读取 Markdown 原文。索引按 Docs / Learn / API 分组，并标出部分支持或规划中的能力。"
        : "Read any page as Markdown. The index follows Docs, Learn, and API and marks limited or planned capabilities.",
      links: [
        {
          title: "llms.txt",
          description: zh ? "文档索引" : "Index",
          href: "/llms.txt",
        },
        {
          title: "llms-full.txt",
          description: zh ? "完整文档" : "Full text",
          href: "/llms-full.txt",
        },
      ],
    },
  };
}

export function getPortalContent(
  portal: LandingPortal,
  zh: boolean,
): PortalContent {
  const content: Record<LandingPortal, PortalContent> = {
    learn: {
      paths: [
        {
          label: zh ? "软件工厂" : "Software Factory",
          title: zh ? "软件工厂" : "Software Factory",
          description: zh
            ? "跟随一条 Issue，了解如何执行、验证和审阅变更。"
            : "Follow one issue through implementation, verification, and review.",
          href: "learn/software-factory-foundations",
          outcome: zh
            ? "理解软件工厂主线"
            : "Understand the Software Factory path",
        },
        {
          label: zh ? "构建工作流" : "Build Workflows",
          title: zh ? "构建工作流" : "Build Workflows",
          description: zh
            ? "创建自动化与智能体工作流，连接仓库、技能与交接。"
            : "Create automations and agent workflows; connect repos, skills, and handoffs.",
          href: "learn/build-with-ai-workforce",
          outcome: zh ? "发布一条可用工作流" : "Publish a working workflow",
        },
        {
          label: zh ? "运行软件工厂" : "Run a Software Factory",
          title: zh ? "运行软件工厂" : "Run a Software Factory",
          description: zh
            ? "部署、运营并治理 AI 交付：环境、CI/CD、看板与成本。"
            : "Deploy, operate, and govern AI delivery: environments, CI/CD, boards, and cost.",
          href: "learn/run-software-factory",
          outcome: zh ? "稳定运行交付流水线" : "Operate a delivery pipeline",
        },
      ],
      guides: [
        {
          title: zh ? "需求写法" : "Requirements writing",
          description: zh
            ? "把验收标准写成可观察的行为"
            : "Write acceptance criteria as observable behavior",
          href: "learn/requirements-writing",
        },
        {
          title: zh ? "方案与工单" : "Blueprints and work orders",
          description: zh
            ? "区分设计决定与可执行任务"
            : "Separate design decisions from executable tasks",
          href: "learn/blueprints-work-orders",
        },
        {
          title: zh ? "反馈与验收" : "Feedback and review",
          description: zh
            ? "用证据判断缺陷、新范围或解释请求"
            : "Judge defects, new scope, or questions with evidence",
          href: "learn/feedback-review",
        },
      ],
      next: [
        {
          title: zh ? "Docs · 快速开始" : "Docs · Quickstart",
          description: zh
            ? "把一条 Issue 推到交付看板并审阅证据"
            : "Take an Issue to the delivery board and review evidence",
          href: "getting-started/quickstart",
        },
        {
          title: zh ? "API · 程序化触发" : "API · Trigger programmatically",
          description: zh
            ? "用已实现的 HTTP、Webhook 与 MCP 接口集成"
            : "Integrate with the implemented HTTP, webhook, and MCP surfaces",
          href: "api",
        },
      ],
    },
    api: {
      paths: [
        {
          label: zh ? "API 参考" : "API Reference",
          title: zh ? "调用当前 HTTP 接口" : "Call the current HTTP API",
          description: zh
            ? "鉴权、发现工作空间资源，并启动一次 Automation 运行。"
            : "Authenticate, discover workspace resources, and start an Automation run.",
          href: "developer/api-reference",
          outcome: zh ? "完成一次可验证调用" : "Complete one verifiable call",
        },
        {
          label: zh ? "Webhook" : "Webhooks",
          title: zh ? "通过 Webhook 触发 Job" : "Trigger a Job with a webhook",
          description: zh
            ? "从外部系统启动已发布的 Job，并查询运行结果。"
            : "Start a published Job from an external system and query its run for the result.",
          href: "integrations/webhooks",
          outcome: zh ? "按运行 ID 查询" : "Look up a run by ID",
        },
        {
          label: "MCP",
          title: zh ? "让 Agent 发现 Job" : "Let agents discover Jobs",
          description: zh
            ? "通过 Automation MCP 暴露已注册的 Job 工具。"
            : "Expose registered Job tools through Automation MCP.",
          href: "integrations/mcp",
          outcome: zh ? "核对 MCP 边界" : "Confirm the MCP boundary",
        },
      ],
      guides: [
        {
          title: zh ? "认证" : "Authentication",
          description: zh
            ? "登录令牌与 Personal Automation Token"
            : "Login tokens and Personal Automation Tokens",
          href: "developer/authentication",
        },
        {
          title: zh ? "OpenAPI" : "OpenAPI",
          description: zh
            ? "从你实际部署的后端读取 schema"
            : "Read the schema from the backend you actually run",
          href: "integrations/openapi",
        },
        {
          title: "CLI / SDK",
          description: zh
            ? "设备 CLI 与基于 schema 的小客户端；无通用 SDK 包"
            : "Device CLI and schema-based clients; no general SDK package",
          href: "developer/cli-sdk",
        },
        {
          title: zh ? "平台架构" : "Platform architecture",
          description: zh
            ? "会话、Job 与交付记录如何区分"
            : "How sessions, Jobs, and delivery records differ",
          href: "developer/architecture",
        },
      ],
      next: [
        {
          title: zh ? "Docs · 集成总览" : "Docs · Integrations overview",
          description: zh
            ? "仓库与消息渠道等产品连接"
            : "Product connections such as repositories and chat channels",
          href: "integrations/overview",
        },
        {
          title: zh ? "Learn · 构建工作流" : "Learn · Build Workflows",
          description: zh
            ? "按课程路径配置自动化与智能体"
            : "Follow the course path to configure automations and agents",
          href: "learn/build-with-ai-workforce",
        },
      ],
    },
  };
  return content[portal];
}
