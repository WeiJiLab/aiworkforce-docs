export type HomeSection =
  | "cta"
  | "applications"
  | "lifecycle"
  | "blocks"
  | "explore"
  | "guides"
  | "agents";
export type LandingPortal = "developers" | "learn";
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
  readonly lifecycle: {
    readonly description: string;
    readonly nodes: readonly {
      readonly title: string;
      readonly detail: string;
    }[];
    readonly note: string;
  };
  readonly blocks: readonly LandingGuide[];
  readonly explore: readonly LandingGuide[];
  readonly guides: readonly LandingGuide[];
  readonly agents: {
    readonly title: string;
    readonly description: string;
    readonly links: readonly LandingGuide[];
  };
}

export interface PortalPath extends LandingGuide {
  readonly label: string;
  readonly outcome: string;
  readonly icon:
    "build" | "connect" | "runtime" | "requirements" | "plan" | "review";
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

export function getHomeContent(zh: boolean): HomeContent {
  const guide = (
    title: string,
    description: string,
    href: string,
  ): LandingGuide => ({ title, description, href });
  return {
    primaryCta: guide(
      zh ? "交付第一项变更" : "Deliver your first change",
      zh
        ? "把一条 Issue 送到交付看板，跟踪实现，并审阅验证证据。"
        : "Take an Issue through the delivery board, then review the change and its evidence.",
      "getting-started/quickstart",
    ),
    secondaryCta: guide(
      zh ? "查看工作流应用" : "Explore workflow applications",
      zh
        ? "软件工厂、看板和 Issue 共用同一套工作流。"
        : "Software Factory, the board, and issues share one workflow model.",
      "workflows/applications",
    ),
    applications: [
      guide(
        zh ? "软件工厂" : "Software Factory",
        zh
          ? "把需求和 Issue 交由数字员工执行、验证，并形成可审阅的 Pull Request。"
          : "Carry requirements and issues through employee execution, verification, and a reviewed pull request.",
        "software-factory/overview",
      ),
      guide(
        zh ? "看板自动化工作台" : "Kanban Automation Workbench",
        zh
          ? "让交付看板按真实执行状态持续推进，而不是手工维护状态标签。"
          : "Keep a delivery board moving from real execution state, not from hand-edited status labels.",
        "workflows/kanban-workbench",
      ),
      guide(
        zh ? "Issue 自动化" : "Issue Automation",
        zh
          ? "从 GitHub Issue 或收件箱事项把情况查清，确认后再进入交付。"
          : "Start from a GitHub issue or inbox item, investigate it, and route confirmed work into delivery.",
        "workflows/issue-automation",
      ),
    ],
    lifecycle: {
      description: zh
        ? "一次工作从触发开始，带上上下文，由数字员工执行，再经过验证，直到交付。"
        : "Work starts with a trigger, then context and employees, then execution, verification, and delivery.",
      nodes: [
        {
          title: zh ? "触发" : "Trigger",
          detail: zh
            ? "手动、日程、事件或看板"
            : "Manual, schedule, event, or board",
        },
        {
          title: zh ? "上下文" : "Context",
          detail: zh
            ? "仓库、事项、文档与记忆"
            : "Repository, issue, documents, memory",
        },
        {
          title: zh ? "智能体" : "Agents",
          detail: zh ? "数字员工、技能与工具" : "Employees, skills, and tools",
        },
        {
          title: zh ? "执行" : "Execution",
          detail: zh
            ? "运行时与环境中的一次运行"
            : "A run in a runtime and environment",
        },
        {
          title: zh ? "验证" : "Verification",
          detail: zh ? "测试、验收与人工比较" : "Tests, acceptance, and review",
        },
        {
          title: zh ? "交付" : "Delivery",
          detail: zh
            ? "Issue、Pull Request 或通知"
            : "Issue, pull request, or notice",
        },
      ],
      note: zh
        ? "确认范围、接管执行和决定发布，仍然由人负责。"
        : "People keep judgment when confirming scope, taking over execution, and approving release.",
    },
    blocks: [
      guide(
        zh ? "智能体与数字员工" : "Agents and employees",
        zh
          ? "负责执行工作流里的具体步骤。"
          : "The participants that perform steps inside a workflow.",
        "user-guide/ai-employees",
      ),
      guide(
        zh ? "技能与插件" : "Skills and plugins",
        zh
          ? "员工可以调用的可复用工作方法。"
          : "Reusable methods an employee can call.",
        "build/skills-plugins",
      ),
      guide(
        zh ? "工具与 MCP" : "Tools and MCP",
        zh
          ? "一次操作，或 MCP 服务暴露的外部工具。"
          : "An operation, or external tools exposed by an MCP server.",
        "build/mcp-integration",
      ),
      guide(
        zh ? "触发与事件" : "Triggers and events",
        zh
          ? "决定工作流何时启动，而不是工作流本身。"
          : "When a workflow starts. Not the workflow itself.",
        "automate/triggers-schedules",
      ),
      guide(
        zh ? "运行时与环境" : "Runtime and environments",
        zh
          ? "工作实际运行所在的基础设施和工作空间资源。"
          : "The infrastructure and workspace resources where execution happens.",
        "deployment/runtime-environments",
      ),
      guide(
        zh ? "验证与证据" : "Verification and evidence",
        zh
          ? "证明工作完成，而不只是对话结束。"
          : "Proof that the work finished, not only that the conversation ended.",
        "software-factory/evidence",
      ),
    ],
    explore: [
      guide(
        zh ? "工作流" : "Workflows",
        zh
          ? "定义如何完成工作，以及自动化如何启动它。"
          : "How work is defined, and how automation starts it.",
        "workflows/concepts",
      ),
      guide(
        zh ? "智能体与能力" : "Agents and capabilities",
        zh
          ? "数字员工、技能、插件、工具和上下文。"
          : "Employees, skills, plugins, tools, and context.",
        "user-guide/ai-employees",
      ),
      guide(
        zh ? "执行与运营" : "Execution and operations",
        zh
          ? "运行时、环境、证据、模型、权限和审计。"
          : "Runtime, environments, evidence, models, access, and audit.",
        "deployment/runtime-environments",
      ),
      guide(
        zh ? "集成与开发" : "Integrations and developer",
        zh
          ? "代码仓库、消息渠道、API、Webhook 和 CLI。"
          : "Repositories, chat, the API, webhooks, and the CLI.",
        "integrations/overview",
      ),
    ],
    guides: [
      guide(
        zh ? "交付第一项变更" : "Deliver your first change",
        zh
          ? "把一条 Issue 送到交付看板，审阅代码变更和验证证据。"
          : "Take one Issue through the delivery board and review the evidence.",
        "getting-started/quickstart",
      ),
      guide(
        zh ? "自动化一个 GitHub Issue" : "Automate a GitHub issue",
        zh
          ? "轮询到 Issue 事件后启动 Job，确认过的事项再进入交付。"
          : "Start a Job from a polled issue event, then send confirmed work into delivery.",
        "workflows/issue-automation",
      ),
      guide(
        zh ? "建立持续运行的看板工作流" : "Build an autonomous Kanban workflow",
        zh
          ? "用交付看板的泳道和批次推进卡片。"
          : "Move cards with the delivery board's lanes and batches.",
        "workflows/kanban-workbench",
      ),
      guide(
        zh ? "创建软件工厂" : "Create a Software Factory",
        zh
          ? "用一张已确认的卡片走完执行、验证和审阅。"
          : "Follow one confirmed card through execution, verification, and review.",
        "getting-started/first-software-factory",
      ),
      guide(
        zh ? "自动化 Pull Request 审阅" : "Automate pull request reviews",
        zh
          ? "收到 Pull Request 事件后启动员工。合并仍由发布泳道和人决定。"
          : "Start an employee on a pull request event. Merge stays with the release lane and a person.",
        "workflows/pull-request-automation",
      ),
      guide(
        zh ? "创建定时调研工作流" : "Create a scheduled research workflow",
        zh
          ? "按日程让一名员工开始工作，再由人审阅产物。"
          : "Schedule one employee, then review the artifact yourself.",
        "workflows/research-monitoring",
      ),
    ],
    agents: {
      title: zh ? "供 Agent 阅读" : "Documentation for agents",
      description: zh
        ? "每一页都有 Markdown 原文可以读。索引按同一套结构分组，并标出部分支持或规划中的能力。"
        : "Read any page as Markdown. The index follows this information architecture and marks limited or planned capabilities.",
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
    developers: {
      paths: [
        {
          label: zh ? "员工构建" : "Employee packages",
          title: zh ? "实现一个员工角色" : "Implement an employee role",
          description: zh
            ? "把职责、输入、输出与约束写入员工包，配置入口 Skill 并验证结构。"
            : "Package responsibilities, inputs, outputs, and constraints with an entry skill and structural validation.",
          href: "build/employee-definition",
          outcome: zh ? "从员工定义开始" : "Start with an employee definition",
          icon: "build",
        },
        {
          label: zh ? "程序集成" : "Programmatic access",
          title: zh ? "对接平台接口" : "Integrate with the platform",
          description: zh
            ? "核对当前实现中的 API、鉴权与工作空间范围，建立可验证的调用流程。"
            : "Check implemented APIs, authentication, and workspace scope before building a verifiable request flow.",
          href: "developer/api-reference",
          outcome: zh ? "从 API 范围开始" : "Start with the API surface",
          icon: "connect",
        },
        {
          label: zh ? "运行与部署" : "Runtime and deployment",
          title: zh ? "准备执行环境" : "Prepare an execution environment",
          description: zh
            ? "理解托管与本地运行方式，检查设备、工具、凭据与授权之间的关系。"
            : "Understand hosted and local execution, including devices, tools, credentials, and authorization.",
          href: "deployment/runtime-environments",
          outcome: zh ? "从运行边界开始" : "Start with runtime boundaries",
          icon: "runtime",
        },
      ],
      guides: [
        {
          title: zh ? "Skills 与 Plugins" : "Skills and plugins",
          description: zh
            ? "组织可复用的工作方法、能力包和验证样例"
            : "Organize reusable methods, capability packages, and validation examples",
          href: "build/skills-plugins",
        },
        {
          title: zh ? "工具与 MCP" : "Tools and MCP",
          description: zh
            ? "连接外部工具，明确连接配置与实际访问权限"
            : "Connect external tools and distinguish configuration from access",
          href: "build/mcp-integration",
        },
        {
          title: zh ? "Hooks 与 Subagents" : "Hooks and subagents",
          description: zh
            ? "理解执行扩展、任务委派与运行时支持范围"
            : "Understand execution extensions, delegation, and runtime support",
          href: "build/hooks-subagents",
        },
        {
          title: zh ? "平台架构" : "Platform architecture",
          description: zh
            ? "连接产品资源、执行上下文与持久化记录"
            : "Connect product resources, execution context, and persisted records",
          href: "developer/architecture",
        },
        {
          title: zh ? "认证与授权" : "Authentication and authorization",
          description: zh
            ? "检查身份、工作空间访问与资源授权边界"
            : "Check identity, workspace access, and resource authorization",
          href: "developer/authentication",
        },
        {
          title: "CLI / SDK",
          description: zh
            ? "使用已有命令与客户端，核对当前支持范围"
            : "Use existing commands and clients within their supported scope",
          href: "developer/cli-sdk",
        },
      ],
      next: [
        {
          title: zh ? "Learn · 先明确交付要求" : "Learn · Frame the delivery",
          description: zh
            ? "与产品和交付团队确认需求、工作边界与验收证据"
            : "Agree on requirements, scope, and evidence with product and delivery teams",
          href: "learn",
        },
        {
          title: zh
            ? "Docs · 交付第一项变更"
            : "Docs · Deliver your first change",
          description: zh
            ? "在已配置的交付项目中，从 Issue 走到代码变更与验证证据"
            : "Take an Issue through implementation and verification in a configured delivery project",
          href: "getting-started/quickstart",
        },
      ],
    },
    learn: {
      paths: [
        {
          label: zh ? "需求" : "Requirements",
          title: zh ? "明确要解决的问题" : "Define the problem to solve",
          description: zh
            ? "描述用户结果、现状与约束，把验收标准写成可观察的行为。"
            : "Describe the user outcome, current behavior, and constraints with observable acceptance criteria.",
          href: "learn/requirements-writing",
          outcome: zh ? "得到可确认的需求" : "Reach an agreed requirement",
          icon: "requirements",
        },
        {
          label: zh ? "方案与任务" : "Design and work orders",
          title: zh
            ? "把目标拆成可执行工作"
            : "Turn the goal into executable work",
          description: zh
            ? "区分技术方案与执行任务，明确依赖、修改范围和每一步的验证方式。"
            : "Separate design decisions from execution tasks, with dependencies, scope, and checks for each step.",
          href: "learn/blueprints-work-orders",
          outcome: zh
            ? "得到有边界的执行计划"
            : "Prepare a bounded execution plan",
          icon: "plan",
        },
        {
          label: zh ? "反馈与验收" : "Feedback and review",
          title: zh ? "用证据判断交付结果" : "Judge the result with evidence",
          description: zh
            ? "区分新需求、缺陷与解释请求，基于验收标准给出可行动的反馈。"
            : "Distinguish new scope, defects, and questions, then give actionable feedback against agreed criteria.",
          href: "learn/feedback-review",
          outcome: zh ? "形成明确的下一步决定" : "Make the next decision clear",
          icon: "review",
        },
      ],
      guides: [
        {
          title: zh ? "提示词与规则" : "Prompts and rules",
          description: zh
            ? "组织稳定约束与当前任务输入，让职责和边界保持清楚"
            : "Separate stable constraints from task inputs so responsibilities stay clear",
          href: "build/prompts-rules",
        },
        {
          title: zh
            ? "从 Issue 到 Pull Request"
            : "From an issue to a pull request",
          description: zh
            ? "贯穿事项整理、需求确认、执行、验证与人工审阅"
            : "Follow intake, requirements confirmation, execution, verification, and review",
          href: "recipes/issue-to-pr",
        },
      ],
      next: [
        {
          title: zh
            ? "Docs · 交付第一项变更"
            : "Docs · Deliver your first change",
          description: zh
            ? "将已明确的需求推进到交付看板，跟踪实现并审阅验证证据"
            : "Route a scoped request to the delivery board, follow implementation, and review the verification evidence",
          href: "getting-started/quickstart",
        },
        {
          title: zh
            ? "Developers · 实现需要的能力"
            : "Developers · Implement the capability",
          description: zh
            ? "将已明确的职责与交付要求落实为员工包、工具或平台集成"
            : "Turn agreed responsibilities and delivery needs into packages, tools, or integrations",
          href: "developer",
        },
      ],
    },
  };
  return content[portal];
}
