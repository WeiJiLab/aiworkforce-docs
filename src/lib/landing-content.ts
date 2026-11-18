import { withBase } from "./site.mjs";

export type HomeSection = "cta" | "paths" | "agents";
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
  readonly paths: readonly LandingGuide[];
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
        ? "在已就绪的看板上完成一项小需求。"
        : "Complete a small request on a ready delivery board.",
      "getting-started/quickstart",
    ),
    secondaryCta: guide(
      zh ? "查看交付示例" : "View a delivery example",
      zh
        ? "跟踪一次表单修复，查看验收标准、代码变更和审阅证据。"
        : "Follow a form fix from acceptance criteria to code and verification evidence.",
      "recipes/issue-to-pr",
    ),
    paths: [
      guide(
        zh ? "配置交付看板" : "Set up a delivery board",
        zh
          ? "创建看板，准备仓库、员工和验证资源，并试跑第一张卡片。"
          : "Create a board, prepare its repository, workers, and checks, then try the first card.",
        "getting-started/first-software-factory",
      ),
      guide(
        zh ? "构建可复用能力" : "Build a reusable worker",
        zh
          ? "把专家流程变成有职责、工具和验收标准的 AI worker。"
          : "Turn an expert procedure into an AI worker with tools and acceptance criteria.",
        "build/overview",
      ),
      guide(
        zh ? "准备并运行工作" : "Prepare and run work",
        zh
          ? "准备执行条件，跟进结果，并明确处理遇阻与恢复。"
          : "Prepare execution, follow results, and handle blocks and recovery.",
        "workflows/run",
      ),
    ],
    agents: {
      title: zh ? "供 Agent 阅读" : "Documentation for agents",
      description: zh
        ? "每页可读取 Markdown 原文。流程图同步提供步骤说明与指南链接，索引按 Docs / Learn / API 分组。"
        : "Read any page as Markdown, including diagram steps and guide links. The index follows Docs, Learn, and API.",
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
            ? "用同一项小需求理解执行、验证与人工审阅。"
            : "Follow one small change through execution, verification, and human review.",
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
          outcome: zh ? "验证并复用工作方法" : "Validate and reuse a method",
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
          title: zh ? "从外部系统触发任务" : "Trigger work from another system",
          description: zh
            ? "调用已发布的 Job，取得运行记录并查询结果。"
            : "Invoke a published Job, retain its run record, and query the result.",
          href: "integrations/webhooks",
          outcome: zh ? "跟踪一次外部调用" : "Follow one external invocation",
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
