export type HomeSection =
  | "cta"
  | "getting-started"
  | "build-software"
  | "automate-work"
  | "use-employees"
  | "build"
  | "run-workflows"
  | "daemon"
  | "integrations"
  | "agents";
export type LandingPortal = "developer" | "learn" | "build";
export type PortalSection = "paths" | "guides" | "next" | "operate";

export interface LandingGuide {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

type GettingStartedGuide = LandingGuide & {
  readonly guides?: readonly Pick<LandingGuide, "title" | "href">[];
};

interface HomeContent {
  readonly primaryCta: LandingGuide;
  readonly secondaryCta: LandingGuide;
  readonly gettingStarted: readonly GettingStartedGuide[];
  readonly buildSoftware: readonly LandingGuide[];
  readonly automateWork: readonly LandingGuide[];
  readonly useEmployees: readonly LandingGuide[];
  readonly build: readonly LandingGuide[];
  readonly runWorkflows: readonly LandingGuide[];
  readonly daemon: readonly LandingGuide[];
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
  readonly operate: readonly LandingGuide[];
  readonly next: readonly LandingGuide[];
}

import { withBase } from "./site.mjs";

export function localizedGuideHref(href: string, zh: boolean): string {
  const [path, fragment] = href.split("#");
  return (
    withBase(`${zh ? "/zh-cn" : ""}/${path}/`) +
    (fragment ? `#${fragment}` : "")
  );
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
    gettingStarted: [
      guide(
        zh ? "创建数字员工" : "Create a digital employee",
        zh
          ? "在工作空间选用已发布的模板，等待员工就绪。"
          : "Use a published template in your workspace and wait for the employee to be ready.",
        "getting-started/first-employee",
      ),
      guide(
        zh ? "使用专家工作台" : "Use the expert workbench",
        zh
          ? "打开员工会话，交办一项专业任务，跟进执行并审阅产物。"
          : "Open an employee session, assign a task in their area of expertise, and review the results.",
        "user-guide/agent-chat",
      ),
      {
        ...guide(
          zh ? "使用交付工作台" : "Use the delivery workbench",
          zh
            ? "在看板上推进卡片，跟踪任务交接并核对交付证据。"
            : "Move cards through the board, track handoffs, and review delivery evidence.",
          "workflows/kanban-workbench",
        ),
        guides: [
          {
            title: zh
              ? "在已有看板上交付第一条 Issue"
              : "Deliver your first Issue on an existing board",
            href: "getting-started/quickstart",
          },
          {
            title: zh
              ? "配置团队的第一个交付看板"
              : "Set up your team’s first delivery board",
            href: "getting-started/first-software-factory",
          },
          {
            title: zh
              ? "跟进交付看板的首次运行"
              : "Follow the first run on a delivery board",
            href: "getting-started/first-automation",
          },
        ],
      },
    ],
    buildSoftware: [
      guide(
        zh ? "软件工厂概览" : "Software Factory overview",
        zh
          ? "用四条回路把需求、实现、审阅和反馈连成可重复的交付。"
          : "Connect requirements, implementation, review, and feedback into four delivery loops.",
        "software-factory/overview",
      ),
      guide(
        zh ? "配置软件工厂" : "Configure the factory",
        zh
          ? "连接代码托管和运行位置，指派泳道员工，并启动第一张卡片。"
          : "Connect a code host and runtime, assign lane employees, and start the first card.",
        "getting-started/first-software-factory",
      ),
      guide(
        zh ? "需求 → 卡片" : "Requirements → card",
        zh
          ? "把功能说明收成经过审阅的范围和一张已确认的卡片。"
          : "Turn a feature brief into a reviewed scope and a confirmed card.",
        "software-factory/requirements-to-card",
      ),
      guide(
        zh ? "卡片 → PR" : "Card → pull request",
        zh
          ? "实现已确认的卡片，并留下供审阅的变更。"
          : "Implement a confirmed card and record a change for review.",
        "software-factory/card-to-pr",
      ),
      guide(
        zh ? "PR → 合并" : "Pull request → merge",
        zh
          ? "在人接受合并和发布之前，审阅、修复并核对变更。"
          : "Review, repair, and verify a change before a person accepts merge and release.",
        "software-factory/pr-to-merge",
      ),
      guide(
        zh ? "信号 → 卡片" : "Signal → card",
        zh
          ? "调查反馈和事件，再决定哪一项后续工作成为卡片。"
          : "Investigate feedback and incidents, then decide which follow-up becomes a card.",
        "software-factory/signal-to-card",
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
      guide(
        zh ? "智能体交接" : "Agent handoffs",
        zh
          ? "在步骤之间传递上下文与责任。"
          : "Pass context and responsibility between steps.",
        "automate/agent-handoff",
      ),
    ],
    useEmployees: [
      guide(
        zh ? "使用专家工作台" : "Use the expert workbench",
        zh
          ? "打开会话，给员工一个目标和清楚的验收标准。"
          : "Open a session and give the employee a goal and acceptance criteria.",
        "user-guide/agent-chat",
      ),
      guide(
        zh ? "提供任务上下文" : "Provide task context",
        zh
          ? "提供任务所需的文档、文件与团队约定。"
          : "Supply the documents, files, and team agreements the task needs.",
        "user-guide/knowledge-context",
      ),
      guide(
        zh ? "查看执行进度" : "Track execution progress",
        zh
          ? "查看会话状态、执行计划和工具动作。"
          : "Check session status, execution plans, and tool activity.",
        "user-guide/sessions-planning",
      ),
      guide(
        zh ? "人工确认" : "Human approval",
        zh
          ? "在需要时确认范围、回应请求或接管执行。"
          : "Confirm scope, respond to requests, or take over execution.",
        "user-guide/human-approval",
      ),
      guide(
        zh ? "审阅结果与产物" : "Review results and artifacts",
        zh
          ? "按验收标准检查生成文件、变更和验证证据。"
          : "Check generated files, changes, and evidence against the acceptance criteria.",
        "user-guide/artifacts-evidence",
      ),
      guide(
        zh ? "创建数字员工" : "Create a digital employee",
        zh
          ? "在工作空间里选用已发布模板，并验收第一份结果。"
          : "Use a published template in a workspace and review its first result.",
        "getting-started/first-employee",
      ),
    ],
    build: [
      guide(
        zh ? "定制与扩展" : "Customize & Extend",
        zh
          ? "从维护工程师的一项职责开始，用样例验证模板，再交给项目团队。"
          : "Start with one maintenance responsibility, test the template and hand it to the project team.",
        "build",
      ),
      guide(
        zh ? "岗位模板构建" : "Role template builder",
        zh
          ? "把访谈确认的职责、交付证据和接管条件写进草稿。"
          : "Draft the responsibilities, evidence and handoff conditions agreed in the interview.",
        "build/builder",
      ),
      guide(
        zh ? "标准数字员工市场" : "Standard employee marketplace",
        zh
          ? "将验证过的岗位能力包同步为模板，也可从外部插件构建。"
          : "Sync a tested role package to a template or start a draft from an external plugin.",
        "build/market",
      ),
      guide(
        zh ? "发布与分发" : "Publishing",
        zh
          ? "把校验过的 Agent 包发布为模板。"
          : "Publish a validated Agent Package as a template.",
        "build/publishing",
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
    daemon: [
      guide(
        zh ? "在你的电脑上执行" : "Run tools on your computer",
        zh
          ? "Daemon 只在你管理的电脑上执行工具。对话和模型循环仍在平台。"
          : "A daemon runs tools on a computer you manage. The conversation and model loop stay on the platform.",
        "deployment/daemon",
      ),
      guide(
        zh ? "我的机器" : "My machines",
        zh
          ? "配对电脑并确认设备已上线。"
          : "Pair your computer and confirm the worker is online.",
        "deployment/daemon/my-machines",
      ),
      guide(
        zh ? "会话执行位置" : "Session execution location",
        zh
          ? "在第一条消息之前，为会话选择执行工具的电脑。"
          : "Choose the computer that will run tools before sending the first message.",
        "deployment/daemon/session-execution",
      ),
      guide(
        zh ? "故障排查" : "Troubleshooting",
        zh
          ? "检查配对、离线状态和工作目录。"
          : "Diagnose pairing, offline workers, and working directory issues.",
        "deployment/daemon/troubleshooting",
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
          ? "程序化集成见 Developer 栏目。"
          : "Programmatic integration lives under Developer.",
        "developer",
      ),
    ],
    agents: {
      title: zh ? "供 Agent 阅读" : "Documentation for agents",
      description: zh
        ? "每页可读取 Markdown 原文。索引按 Docs / Learn / Customize & Extend / Developer 分组，并标出规划中的能力。"
        : "Read any page as Markdown. The index follows Docs, Learn, Customize & Extend, and Developer and marks planned capabilities.",
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
      operate: [],
      next: [
        {
          title: zh ? "Docs · 快速开始" : "Docs · Quickstart",
          description: zh
            ? "把一条 Issue 推到交付看板并审阅证据"
            : "Take an Issue to the delivery board and review evidence",
          href: "getting-started/quickstart",
        },
        {
          title: zh ? "定制与扩展" : "Customize & Extend",
          description: zh
            ? "为软件工厂的任务定制、评测和发布 Agent 能力"
            : "Customize, evaluate, and publish agent capabilities for Software Factory tasks",
          href: "build",
        },
        {
          title: zh
            ? "Developer · 程序化触发"
            : "Developer · Trigger programmatically",
          description: zh
            ? "用已实现的 HTTP、Webhook 与 MCP 接口集成"
            : "Integrate with the implemented HTTP, webhook, and MCP surfaces",
          href: "developer",
        },
      ],
    },
    developer: {
      paths: [
        {
          label: "Webhook",
          title: zh ? "工单创建时自动分析" : "Analyze each new ticket",
          description: zh
            ? "给分析 Job 配置入站 Webhook，让工单系统在创建事件发生时发送工单内容。"
            : "Configure an inbound webhook on the analysis Job so the ticket system can send each new ticket as it arrives.",
          href: "integrations/webhooks",
          outcome: zh ? "配置 Webhook" : "Set up a webhook",
        },
        {
          label: "REST API",
          title: zh
            ? "给工单加一个「重新分析」按钮"
            : "Add a “Run analysis again” button",
          description: zh
            ? "用户点击按钮时，由业务后端通过 REST API 启动指定 Job，再按运行 ID 查询状态和结果。"
            : "When a user clicks the button, have your backend start a specific Job through the REST API and look up its status and result by run ID.",
          href: "developer/api-reference",
          outcome: zh ? "查看 REST 请求示例" : "See the REST requests",
        },
        {
          label: "Automation MCP",
          title: zh
            ? "让外部 Agent 在对话中选择分析工具"
            : "Let an agent choose when to analyze a ticket",
          description: zh
            ? "让兼容 MCP 的 Agent 发现凭据允许调用的 Job，再根据对话决定是否调用工单分析。"
            : "Let an MCP client discover the Jobs its credential can invoke and choose the ticket analysis tool when the conversation calls for it.",
          href: "integrations/mcp",
          outcome: zh ? "连接 Automation MCP" : "Connect to Automation MCP",
        },
        {
          label: "CLI",
          title: zh
            ? "在团队的 Linux 机器上运行诊断工具"
            : "Run diagnostics on your team’s Linux machine",
          description: zh
            ? "用设备执行器 CLI 配对目标机器，确认 worker 在线后，在会话中授权使用设备工具。"
            : "Pair the machine with the device executor CLI, verify the worker is online, then authorize its tools in the session.",
          href: "integrations/cli",
          outcome: zh ? "配对设备" : "Pair a device",
        },
        {
          label: "Viewer App",
          title: zh
            ? "在报告里按严重程度查看问题"
            : "Group findings by severity in a report",
          description: zh
            ? "先用内置 JSON 查看器打开分析报告。需要分组展示时，再为同一份文件开发 Viewer App。"
            : "Open the analysis report in the built-in JSON viewer. To group findings by severity, add a custom view for the same file.",
          href: "developer/viewer-apps",
          outcome: zh ? "开发查看器" : "Build a viewer",
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
      operate: [],
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
    build: {
      paths: [
        {
          label: zh ? "构建" : "Build",
          title: zh ? "构建岗位模板草稿" : "Draft a role template",
          description: zh
            ? "用岗位访谈里的一次 CI 故障写明要查什么、交什么、何时转交给人。"
            : "Use a CI failure from the interview to specify what to investigate, what evidence to return and when to hand back.",
          href: "build/builder",
          outcome: zh ? "可试跑的草稿" : "A draft to test",
        },
        {
          label: zh ? "测试" : "Test",
          title: zh ? "验证排障结果" : "Verify a diagnosis",
          description: zh
            ? "核对诊断中的日志引用，检查缺少材料和请求发布时的应答。"
            : "Check the log citations and the responses to a missing log or a request to release.",
          href: "build/testing",
          outcome: zh ? "可复查的结果" : "Reviewable results",
        },
        {
          label: zh ? "发布" : "Publish",
          title: zh ? "发布模板" : "Publish a template",
          description: zh
            ? "同步模板，在目标空间创建员工，用本项目的 CI 故障验收一次交付。"
            : "Sync the template, create an employee in the target workspace and review its diagnosis on a project CI failure.",
          href: "build/publishing",
          outcome: zh ? "可安装的模板" : "An installable template",
        },
      ],
      guides: [
        {
          title: "Skills",
          description: zh
            ? "编写可复用的方法、输入和输出格式"
            : "Describe a reusable method, its inputs, and its output format",
          href: "build/skills",
        },
        {
          title: "Plugins",
          description: zh
            ? "组织 Skills 和相关 Agent，并为能力设置版本"
            : "Organize skills and related agents in a versioned plugin",
          href: "build/plugins",
        },
        {
          title: zh ? "工具与权限" : "Tools and permissions",
          description: zh
            ? "声明需要哪些工具，再为实例配置实际访问权限"
            : "Declare tool requirements and configure access for the instance",
          href: "build/tools",
        },
        {
          title: zh ? "MCP 依赖" : "MCP dependencies",
          description: zh
            ? "在清单中声明服务，按工作空间配置连接与授权"
            : "Declare services in the manifest and configure connections and access for the workspace",
          href: "build/mcp-integration",
        },
      ],
      operate: [
        {
          title: zh ? "项目" : "Projects",
          description: zh
            ? "交付项目与工作空间边界"
            : "Delivery projects and workspace boundaries",
          href: "user-guide/projects",
        },
        {
          title: zh ? "权限" : "Permissions",
          description: zh
            ? "团队访问与授权边界"
            : "Team access and authorization boundaries",
          href: "administration/teams-access",
        },
        {
          title: zh ? "模型与成本" : "Models and cost",
          description: zh
            ? "模型通道与用量观察"
            : "Model channels and usage visibility",
          href: "models/overview",
        },
        {
          title: zh ? "评测与治理" : "Evaluation and governance",
          description: zh
            ? "验收、评测与发布门禁"
            : "Acceptance, evaluation, and release gates",
          href: "operate/evaluation-governance",
        },
        {
          title: zh ? "自托管" : "Self-host",
          description: zh
            ? "在自己的基础设施上运行服务栈"
            : "Run the service stack on infrastructure you operate",
          href: "deployment/self-host",
        },
      ],
      next: [
        {
          title: zh ? "文档 · 从模板创建员工" : "Docs · Create from a template",
          description: zh
            ? "使用者在工作空间安装已发布模板"
            : "A workspace user installs a published template",
          href: "getting-started/first-employee",
        },
        {
          title: zh ? "学习 · 创建智能体" : "Learn · Create an agent",
          description: zh
            ? "课程里的短路径，详细步骤在本栏目"
            : "The short course path; the reference stays in this portal",
          href: "learn/build-with-ai-workforce/create-an-agent",
        },
      ],
    },
  };
  return content[portal];
}
