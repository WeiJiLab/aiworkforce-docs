export type HomeSection =
  | "cta"
  | "applications"
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

interface HomeContent {
  readonly primaryCta: LandingGuide;
  readonly secondaryCta: LandingGuide;
  readonly applications: readonly LandingGuide[];
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
    applications: [
      guide(
        zh ? "交付一条 Issue" : "Deliver an issue",
        zh
          ? "已有看板和 Issue？跟进代码变更，在卡片上核对测试结果。"
          : "Have a board and an issue? Follow the code change and review the test results on the card.",
        "getting-started/quickstart",
      ),
      guide(
        zh ? "配置第一个交付看板" : "Set up a delivery board",
        zh
          ? "工作空间还没有看板？连接仓库，为泳道指派员工，接收第一张卡片。"
          : "Starting with an empty workspace? Connect a repository and assign employees to lanes to receive your first card.",
        "getting-started/first-software-factory",
      ),
      guide(
        zh ? "让员工运行一次 Job" : "Run a Job with one employee",
        zh
          ? "已有可用的数字员工？给它一项任务，手动运行，再检查输出。"
          : "Have an employee ready? Give it a task, run it manually, and check the output.",
        zh
          ? "automate/workflow-builder#组合一个-job"
          : "automate/workflow-builder#compose-a-job",
      ),
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
        zh ? "智能体" : "Agents",
        zh
          ? "工作流内的执行参与者。数字员工是其中一种配置形态。"
          : "Execution participants inside a workflow. Employees are one configured form.",
        "user-guide/ai-employees",
      ),
      guide(
        zh ? "从模板创建员工" : "Create an employee from a template",
        zh
          ? "在工作空间里安装已发布模板，并验收第一份结果。"
          : "Install a published template in a workspace and review its first result.",
        "getting-started/first-employee",
      ),
      guide(
        zh ? "工作空间" : "Workspace",
        zh
          ? "组织员工、权限、连接和待处理工作。"
          : "Organize employees, permissions, connections, and incoming work.",
        "user-guide/workspace",
      ),
      guide(
        zh ? "对话与收件箱" : "Chat and inbox",
        zh
          ? "交任务，并决定哪些事项进入交付。"
          : "Assign a task, and decide which requests enter delivery.",
        "user-guide/agent-chat",
      ),
    ],
    build: [
      guide(
        zh ? "构建数字员工" : "Build AI employees",
        zh
          ? "发现客户工作、构建员工包、发布并评测。"
          : "Discover customer work, build an employee package, publish it, and evaluate it.",
        "build",
      ),
      guide(
        zh ? "数字员工构建器" : "Employee builder",
        zh
          ? "在需求工作树里迭代 Plugin，再校验并提交。"
          : "Iterate a Plugin in a requirement worktree, then validate and submit.",
        "build/builder",
      ),
      guide(
        zh ? "标准数字员工市场" : "Standard employee marketplace",
        zh
          ? "同步内部员工，或把外部插件转成一次构建。"
          : "Sync internal employees, or turn an external plugin into a build.",
        "build/market",
      ),
      guide(
        zh ? "发布与分发" : "Publishing",
        zh
          ? "把校验过的员工包发布为模板。"
          : "Publish a validated employee package as a template.",
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
        ? "每页可读取 Markdown 原文。索引按 Docs / Learn / Build / Developer 分组，并标出规划中的能力。"
        : "Read any page as Markdown. The index follows Docs, Learn, Build, and Developer and marks planned capabilities.",
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
          title: zh ? "构建数字员工" : "Build an AI employee",
          description: zh
            ? "在 FDE 工作台定义岗位、迭代 Plugin 并发布模板"
            : "Define a role, iterate a Plugin, and publish a template in the FDE workbench",
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
        {
          label: "Apps",
          title: zh
            ? "了解内置 Viewer Apps"
            : "Explore the built-in Viewer Apps",
          description: zh
            ? "按产物选择查看器，预览文档、图表和代码变更。"
            : "Choose a viewer for documents, diagrams, or code changes.",
          href: "developer/built-in-viewers",
          outcome: zh
            ? "继续学习如何开发自己的 App"
            : "Learn how to build your own app",
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
          label: zh ? "客户发现" : "Discovery",
          title: zh ? "收集现场材料" : "Collect field material",
          description: zh
            ? "用访谈机器人和会议助手记录客户现场，事实仍要人确认。"
            : "Record customer fieldwork with interview bots and meeting assistants. A person still confirms the facts.",
          href: "build/bots",
          outcome: zh
            ? "留下可回看的访谈和会议"
            : "Keep a reviewable interview or meeting",
        },
        {
          label: zh ? "构建" : "Build",
          title: zh ? "在构建器里改 Plugin" : "Change a Plugin in the builder",
          description: zh
            ? "在需求工作树中对话、校验员工包，再提交构建。"
            : "Talk in a requirement worktree, validate the package, and submit the build.",
          href: "build/builder",
          outcome: zh ? "提交一次通过校验的构建" : "Submit one validated build",
        },
        {
          label: zh ? "发布" : "Publish",
          title: zh ? "把员工包变成模板" : "Turn a package into a template",
          description: zh
            ? "从标准市场选择或转换插件，再发布工作空间可以安装的模板。"
            : "Choose or convert a plugin from the standard marketplace, then publish a template a workspace can install.",
          href: "build/market",
          outcome: zh
            ? "工作空间能安装这个模板"
            : "A workspace can install the template",
        },
      ],
      guides: [
        {
          title: zh ? "员工定义" : "Employee definition",
          description: zh
            ? "把岗位写成职责、输入、输出和约束"
            : "Write the role as responsibility, inputs, outputs, and constraints",
          href: "build/employee-definition",
        },
        {
          title: zh ? "Agent 指令" : "Agent instructions",
          description: zh
            ? "把岗位、任务和仓库指引放在各自的层"
            : "Put role, task, and repository guidance in their own layers",
          href: "build/prompts-rules",
        },
        {
          title: zh ? "Skills 与 Plugins" : "Skills and plugins",
          description: zh
            ? "看清同一个员工包如何拆分"
            : "See how one employee package is divided",
          href: "build/skills-plugins",
        },
        {
          title: zh ? "发布与分发" : "Publishing",
          description: zh
            ? "确认哪些实例收到了已发布模板"
            : "Confirm which instances received the published template",
          href: "build/publishing",
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
