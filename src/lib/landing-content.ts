export type HomeSection = "overview" | "paths" | "domains" | "agents";
export type LandingPortal = "developers" | "learn";
export type PortalSection = "paths" | "guides" | "next";

export interface LandingGuide {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

interface HomePath extends LandingGuide {
  readonly portal: string;
  readonly audience: string;
  readonly icon: "learn" | "build" | "integrate";
}

interface HomeContent {
  readonly paths: readonly HomePath[];
  readonly domains: readonly LandingGuide[];
  readonly pathsIntro: string;
  readonly overview: {
    readonly description: string;
    readonly title: string;
    readonly nodes: readonly {
      readonly caption: string;
      readonly title: string;
      readonly detail: string;
      readonly icon: "context" | "build" | "review";
    }[];
    readonly control: string;
  };
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

export function localizedGuideHref(href: string, zh: boolean): string {
  return `${zh ? "/zh-cn" : ""}/${href}/`;
}

export function getHomeContent(zh: boolean): HomeContent {
  const paths: readonly HomePath[] = [
    {
      portal: zh ? "使用者" : "User",
      title: zh ? "把任务交给数字员工" : "Assign work to employees",
      description: zh
        ? "选择员工、提供上下文、观察执行，并审阅产物后再确认下一步。"
        : "Choose an employee, supply context, follow execution, and review the result before the next action.",
      href: "getting-started/quickstart",
      audience: zh ? "业务用户与团队成员" : "For people using employees",
      icon: "learn",
    },
    {
      portal: zh ? "构建者" : "Builder",
      title: zh ? "定义可复用的数字员工" : "Define reusable employees",
      description: zh
        ? "用职责、技能、插件和工具组成员工，再验证并发布模板。"
        : "Compose a role from responsibilities, skills, plugins, and tools, then test and publish it.",
      href: "build/architecture",
      audience: zh ? "Builder 与 FDE" : "For builders and FDEs",
      icon: "build",
    },
    {
      portal: zh ? "平台工程师" : "Platform engineer",
      title: zh ? "运行、授权并治理执行" : "Run, authorize, and govern",
      description: zh
        ? "连接运行时、权限、模型、成本、审计和交付门禁。"
        : "Connect runtime, permissions, models, cost, audit, and delivery gates.",
      href: "deployment/runtime-environments",
      audience: zh ? "平台与集成工程师" : "For platform engineers",
      icon: "integrate",
    },
  ];
  const domains: readonly (readonly [string, string, string])[] = [
    [
      zh ? "使用数字员工" : "Use AI Workforce",
      zh
        ? "工作空间、会话、上下文、收件箱与审阅"
        : "Workspaces, sessions, context, inbox, and review",
      "user-guide/ai-employees",
    ],
    [
      zh ? "构建数字员工" : "Build AI employees",
      zh
        ? "员工结构、技能、插件、工具与 MCP 依赖"
        : "Employee structure, skills, plugins, tools, and MCP dependencies",
      "build/architecture",
    ],
    [
      zh ? "自动化工作" : "Automate work",
      zh
        ? "事件、周期任务、委派和人工介入，不只是定时作业"
        : "Events, recurring work, handoff, and approval — not only schedules",
      "automate/fundamentals",
    ],
    [
      zh ? "软件工厂" : "Software Factory",
      zh
        ? "从需求进入、分派、执行、验证到证据和发布"
        : "From intake and dispatch through execution, verification, evidence, and release",
      "software-factory/overview",
    ],
    [
      zh ? "集成与开发" : "Integrations & developer",
      zh
        ? "产品连接、HTTP API、MCP 与设备 CLI"
        : "Product connections, the HTTP API, MCP, and the device CLI",
      "integrations/overview",
    ],
    [
      zh ? "运营与治理" : "Operate & govern",
      zh
        ? "团队权限、模型成本、运行时、审计与门禁"
        : "Access, model cost, runtime, audit, and quality gates",
      "administration/teams-access",
    ],
  ];
  return {
    paths,
    domains: domains.map(([title, description, href]) => ({
      title,
      description,
      href,
    })),
    pathsIntro: zh
      ? "根据你希望完成的工作，从一条路径开始。"
      : "Start with the work you want to do.",
    overview: {
      description: zh
        ? "AI Workforce 由六层抽象组成：员工能力、执行、编排、工程基础设施、质量保证和工作管理。它们共同完成从任务输入到可验证交付。"
        : "AI Workforce is six cooperating layers: workforce capability, execution, orchestration, engineering infrastructure, quality assurance, and work management.",
      title: zh ? "同一套产品抽象" : "One product architecture",
      nodes: [
        {
          caption: "CAPABILITY",
          title: zh ? "员工能力" : "Workforce capability",
          detail: zh
            ? "员工 · Skills · Plugins"
            : "Employee · Skills · Plugins",
          icon: "build",
        },
        {
          caption: "EXECUTION",
          title: zh ? "执行" : "Execution",
          detail: zh
            ? "Agent · Harness · Runtime"
            : "Agent · Harness · Runtime",
          icon: "build",
        },
        {
          caption: "ORCHESTRATION",
          title: zh ? "编排" : "Orchestration",
          detail: zh ? "自动化 · 任务分派" : "Automation · Dispatcher",
          icon: "context",
        },
        {
          caption: "INFRASTRUCTURE",
          title: zh ? "工程基础设施" : "Engineering infrastructure",
          detail: zh ? "环境 · CI/CD" : "Environment · CI/CD",
          icon: "context",
        },
        {
          caption: "QUALITY",
          title: zh ? "质量保证" : "Quality & assurance",
          detail: zh
            ? "验证 · 证据 · 评测"
            : "Verification · Evidence · Evaluation",
          icon: "review",
        },
        {
          caption: "WORK",
          title: zh ? "工作管理" : "Work management",
          detail: zh ? "收件箱 · 产物 · 项目" : "Inbox · Artifacts · Projects",
          icon: "review",
        },
      ],
      control: zh
        ? "人在确认需求、接管执行和决定发布时保留判断。"
        : "People keep judgment when confirming scope, taking over execution, and approving release.",
    },
    agents: {
      title: zh ? "供 Agent 阅读" : "Documentation for agents",
      description: zh
        ? "每页可读取 Markdown 原文。索引按同一套信息架构分组，并标出有限制或规划中的能力。"
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
          title: zh ? "Docs · 在平台中使用能力" : "Docs · Use the capability",
          description: zh
            ? "创建工作空间员工，开展会话并审阅实际结果"
            : "Create a workspace employee, start work, and review the result",
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
          title: zh ? "Docs · 开始实际协作" : "Docs · Start working together",
          description: zh
            ? "在工作空间中创建员工，准备资料并完成第一项任务"
            : "Create an employee, prepare context, and complete a first task in a workspace",
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
