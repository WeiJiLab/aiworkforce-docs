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

import { withBase } from "./site.mjs";

export function localizedGuideHref(href: string, zh: boolean): string {
  return withBase(`${zh ? "/zh-cn" : ""}/${href}/`);
}

export function getHomeContent(zh: boolean): HomeContent {
  const paths: readonly HomePath[] = [
    {
      portal: zh ? "快速入门" : "Quickstart",
      title: zh ? "交付第一项变更" : "Deliver your first change",
      description: zh
        ? "把一条 Issue 转成交付卡片，跟踪实现，并审阅代码变更与验证证据。"
        : "Route an Issue to the delivery board, follow implementation, and review the change and its verification evidence.",
      href: "getting-started/quickstart",
      audience: zh ? "已有交付项目" : "For a configured delivery project",
      icon: "learn",
    },
    {
      portal: zh ? "自动化工作流" : "Workflow Automation",
      title: zh ? "让工作按规则触发" : "Run work on a trigger",
      description: zh
        ? "手动验证一个 Job，再启用定时或事件触发，并在运行历史中检查结果。"
        : "Check one Job in a manual run, then enable a schedule or event trigger and inspect its run history.",
      href: "getting-started/first-automation",
      audience: zh
        ? "重复任务与事项采集"
        : "For recurring jobs and work intake",
      icon: "build",
    },
    {
      portal: zh ? "软件工厂" : "Software Factory",
      title: zh ? "准备交付项目" : "Set up a delivery project",
      description: zh
        ? "了解项目如何关联看板、代码仓库、流水线资源和各泳道的执行角色。"
        : "See how a project connects the board, repositories, pipeline resources, and the execution roles for each lane.",
      href: "getting-started/first-software-factory",
      audience: zh ? "首次配置交付工作台" : "For teams preparing a workbench",
      icon: "integrate",
    },
  ];
  const domains: readonly (readonly [string, string, string])[] = [
    [
      zh ? "软件工厂" : "Software Factory",
      zh
        ? "在交付看板上推进 Issue，验证代码变更，再按项目规则审阅与发布"
        : "Move Issues through the board, verify changes, and follow the project’s review and release process",
      "software-factory/overview",
    ],
    [
      zh ? "自动化工作流" : "Workflow Automation",
      zh
        ? "管理 Job、触发规则、任务交接和失败恢复"
        : "Manage Jobs, triggers, handoffs, and run recovery",
      "automate/fundamentals",
    ],
    [
      zh ? "工作空间与会话" : "Workspace and sessions",
      zh
        ? "在工作空间中协作、管理收件箱并审阅执行产物"
        : "Collaborate in a workspace, manage the inbox, and review artifacts",
      "user-guide/workspace",
    ],
    [
      zh ? "构建数字员工" : "Build AI employees",
      zh
        ? "员工结构、技能、插件、工具与 MCP 依赖"
        : "Employee structure, skills, plugins, tools, and MCP dependencies",
      "build/architecture",
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
      ? "先在已有项目中交付一次小改动，或从配置项目和触发规则开始。"
      : "Try a small change in an existing project, or start by setting up a project or a trigger.",
    overview: {
      description: zh
        ? "软件工厂从 Issue 或需求开始，在交付看板确认范围并分派实现，完成验证后依据证据作出审阅决定。"
        : "Software Factory takes an Issue or requirement through scope confirmation, implementation, verification, and an evidence-based review on the delivery board.",
      title: zh ? "从 Issue 到审阅" : "From Issue to review",
      nodes: [
        {
          caption: "INTAKE",
          title: zh ? "需求进入" : "Work intake",
          detail: zh ? "收件箱 · Issue" : "Inbox · Issue",
          icon: "context",
        },
        {
          caption: "SCOPE",
          title: zh ? "确认交付范围" : "Confirm scope",
          detail: zh ? "卡片 · 验收标准" : "Card · Acceptance criteria",
          icon: "context",
        },
        {
          caption: "IMPLEMENTATION",
          title: zh ? "实现变更" : "Implement",
          detail: zh ? "泳道分派 · 代码变更" : "Lane assignment · Code change",
          icon: "build",
        },
        {
          caption: "VERIFICATION",
          title: zh ? "验证结果" : "Verify",
          detail: zh
            ? "测试环境 · 检查结果"
            : "Test environment · Check results",
          icon: "review",
        },
        {
          caption: "EVIDENCE",
          title: zh ? "核对证据" : "Inspect evidence",
          detail: zh ? "提交版本 · 测试记录" : "Commit · Test record",
          icon: "review",
        },
        {
          caption: "REVIEW",
          title: zh ? "人工审阅" : "Review",
          detail: zh ? "验收或退回" : "Accept or return",
          icon: "review",
        },
      ],
      control: zh
        ? "数字员工执行泳道任务，团队确认需求范围并作出验收和发布决定。"
        : "AI employees execute lane tasks. The team confirms scope and makes acceptance and release decisions.",
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
