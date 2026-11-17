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
      portal: "Docs",
      title: zh ? "使用数字员工" : "Work with AI employees",
      description: zh
        ? "进入工作空间，创建员工，完成并验收你的第一项任务。"
        : "Open a workspace, create an employee, and review the result of your first task.",
      href: "getting-started/quickstart",
      audience: zh ? "业务用户与团队成员" : "For users and teams",
      icon: "learn",
    },
    {
      portal: "Learn",
      title: zh ? "把工作定义清楚" : "Define useful work",
      description: zh
        ? "先明确问题、工作边界和验收标准，再组织员工协作与交付。"
        : "Frame the problem, scope, and acceptance criteria before coordinating delivery.",
      href: "learn",
      audience: zh
        ? "产品、Builder、FDE 与交付负责人"
        : "For product and delivery teams",
      icon: "build",
    },
    {
      portal: "Developers",
      title: zh ? "构建与集成" : "Build and integrate",
      description: zh
        ? "编写员工包，接入工具与 API，并理解运行环境和授权边界。"
        : "Build employee packages, connect tools and APIs, and understand runtime authorization.",
      href: "developer",
      audience: zh
        ? "Builder、FDE、开发者与平台工程师"
        : "For builders and developers",
      icon: "integrate",
    },
  ];
  const domains: readonly (readonly [string, string, string])[] = [
    [
      zh ? "组织工作空间" : "Organize a workspace",
      zh
        ? "选择工作空间，准备项目与工作上下文"
        : "Choose a workspace and prepare project context",
      "user-guide/workspace",
    ],
    [
      zh ? "创建与配置员工" : "Set up an employee",
      zh
        ? "从模板创建员工，检查初始化与可用能力"
        : "Create from a template and check readiness and capabilities",
      "user-guide/ai-employees",
    ],
    [
      zh ? "开展任务会话" : "Work in a conversation",
      zh
        ? "提供目标、资料与约束，跟进员工执行"
        : "Supply goals, materials, and constraints, then follow execution",
      "user-guide/agent-chat",
    ],
    [
      zh ? "处理任务收件箱" : "Triage the Task inbox",
      zh
        ? "查看事项来源，确认后续行动与交付入口"
        : "Review an item's source and decide its next action",
      "user-guide/inbox-tasks",
    ],
    [
      zh ? "安排重复工作" : "Automate recurring work",
      zh
        ? "配置 Job 与触发器，查看运行结果并处理恢复"
        : "Configure Jobs and triggers, review runs, and recover work",
      "automate/fundamentals",
    ],
    [
      zh ? "连接外部资源" : "Connect external resources",
      zh
        ? "代码仓库、业务连接与外部工具"
        : "Code repositories, business connectors, and tools",
      "integrations/overview",
    ],
    [
      zh ? "管理团队访问" : "Manage team access",
      zh
        ? "角色权限、配置、监控与用量"
        : "Roles, access, configuration, and usage monitoring",
      "administration/teams-access",
    ],
    [
      zh ? "模型与成本" : "Models & costs",
      zh
        ? "模型选择、Token 用量与成本理解"
        : "Model selection, token usage, and cost estimates",
      "models/overview",
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
        ? "AI Workforce 工作示意：在工作空间中提供上下文，数字员工使用技能与工具执行任务，产物和证据交由团队审阅。"
        : "AI Workforce connects workspace context to employee execution with skills and tools, producing artifacts and evidence for team review.",
      title: zh ? "从上下文到可验收的工作" : "From context to reviewable work",
      nodes: [
        {
          caption: "CONTEXT",
          title: zh ? "工作空间" : "Workspace",
          detail: zh
            ? "任务目标 · 项目资料 · 授权资源"
            : "Goals · Project context · Authorized resources",
          icon: "context",
        },
        {
          caption: "EXECUTION",
          title: zh ? "数字员工" : "AI employee",
          detail: zh
            ? "明确职责 · Skills · Tools"
            : "Responsibilities · Skills · Tools",
          icon: "build",
        },
        {
          caption: "REVIEW",
          title: zh ? "产物与证据" : "Artifacts & evidence",
          detail: zh
            ? "执行记录 · 来源 · 可审阅的成果"
            : "Run history · Sources · Reviewable outputs",
          icon: "review",
        },
      ],
      control: zh
        ? "在关键决策与验收环节，由人保留判断与控制。"
        : "People retain judgment and control at key decisions and acceptance.",
    },
    agents: {
      title: zh ? "供 Agent 阅读" : "Documentation for agents",
      description: zh
        ? "使用每页标题旁的原文入口，或将完整文档索引交给 Coding Agent。"
        : "Read a page as Markdown using its title action, or share the complete index with your coding agent.",
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
