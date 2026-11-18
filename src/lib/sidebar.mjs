/** Single information architecture shared by English and Chinese. File ids keep existing URLs. */
export const homeId = "index";

export const groups = [
  {
    label: "Get started",
    zh: "开始使用",
    collapsed: false,
    items: [
      "getting-started/introduction",
      "getting-started/quickstart",
      "getting-started/platform-overview",
      "getting-started/core-concepts",
    ],
  },
  {
    label: "Software Factory",
    zh: "软件工厂",
    collapsed: false,
    items: [
      "software-factory/overview",
      "getting-started/first-software-factory",
      "recipes/issue-to-pr",
      {
        label: "Intake and orchestration",
        zh: "进入与编排",
        collapsed: true,
        pages: [
          "software-factory/intake",
          "software-factory/dispatch",
          "software-factory/orchestration",
        ],
      },
      {
        label: "Execution infrastructure",
        zh: "执行基础设施",
        collapsed: true,
        pages: [
          "software-factory/harness",
          "software-factory/environments",
          "software-factory/cicd",
          "software-factory/build-test",
        ],
      },
      {
        label: "Verification and assurance",
        zh: "验证与保证",
        collapsed: true,
        pages: [
          "software-factory/business-verification",
          "software-factory/evidence",
          "software-factory/evaluation",
          "software-factory/observability",
          "software-factory/quality-gates",
        ],
      },
      {
        label: "Delivery and governance",
        zh: "交付与治理",
        collapsed: true,
        pages: [
          "software-factory/review-release",
          "software-factory/release-governance",
        ],
      },
    ],
  },
  {
    label: "Workflow Automation",
    zh: "自动化工作流",
    collapsed: true,
    items: [
      "getting-started/first-automation",
      "automate/fundamentals",
      "automate/event-driven",
      "automate/triggers-schedules",
      "automate/watchers-webhooks",
      "automate/workflow-builder",
      "automate/agent-handoff",
      "automate/loops",
      "automate/approvals",
      "automate/runs-recovery",
    ],
  },
  {
    label: "Workspace and sessions",
    zh: "工作空间与会话",
    collapsed: true,
    items: [
      "user-guide/workspace",
      "user-guide/projects",
      "user-guide/ai-employees",
      "getting-started/first-employee",
      "user-guide/agent-chat",
      "user-guide/sessions-planning",
      "user-guide/knowledge-context",
      "user-guide/inbox-tasks",
      "user-guide/artifacts-evidence",
      "user-guide/human-approval",
    ],
  },
  {
    label: "Build AI employees",
    zh: "构建数字员工",
    collapsed: true,
    items: [
      {
        label: "Employee foundation",
        zh: "员工基础",
        collapsed: true,
        pages: [
          "build/architecture",
          "build/employee-definition",
          "build/prompts-rules",
        ],
      },
      {
        label: "Capabilities",
        zh: "能力",
        collapsed: true,
        pages: [
          "build/skills-plugins",
          "build/skills",
          "build/plugins",
          "build/tools",
          "build/mcp-integration",
        ],
      },
      {
        label: "Composition",
        zh: "组合",
        collapsed: true,
        pages: ["build/composition", "build/hooks-subagents"],
      },
      {
        label: "Lifecycle",
        zh: "生命周期",
        collapsed: true,
        pages: ["build/testing", "build/publishing", "build/templates"],
      },
    ],
  },
  {
    label: "Integrations and developer",
    zh: "集成与开发",
    collapsed: true,
    items: [
      "integrations/overview",
      {
        label: "Integrations",
        zh: "集成",
        collapsed: true,
        pages: [
          "integrations/code-repositories",
          "integrations/employee-tools",
          "integrations/mcp",
          "integrations/webhooks",
        ],
      },
      {
        label: "Developer platform",
        zh: "开发平台",
        collapsed: true,
        pages: [
          "developer/index",
          "developer/architecture",
          "developer/authentication",
          "developer/api-reference",
          "integrations/openapi",
          "integrations/sdk",
          "integrations/cli",
          "developer/cli-sdk",
          "developer/contributing",
        ],
      },
    ],
  },
  {
    label: "Operate and govern",
    zh: "运营与治理",
    collapsed: true,
    items: [
      "administration/teams-access",
      "administration/configuration",
      "administration/analytics",
      "models/overview",
      "deployment/runtime-environments",
      "deployment/security",
      "operate/evaluation-governance",
      "operate/audit",
    ],
  },
  {
    label: "Resources",
    zh: "资源",
    collapsed: true,
    items: [
      "concepts/glossary",
      "resources/troubleshooting",
      "resources/releases-support",
      "resources/best-practices",
      "learn/index",
      "learn/requirements-writing",
      "learn/blueprints-work-orders",
      "learn/feedback-review",
      "resources/examples",
    ],
  },
  {
    label: "Planned",
    zh: "规划中",
    collapsed: true,
    items: ["integrations/agent-protocol"],
  },
];

export function groupPages(group) {
  return group.items.flatMap((item) =>
    typeof item === "string" ? [item] : item.pages,
  );
}

export const orderedIds = [homeId, ...groups.flatMap(groupPages)];

export const plannedIds = groupPages(
  groups.find((group) => group.label === "Planned"),
);

export function starlightSlug(id) {
  return id.replace(/\/index$/, "") || "index";
}

export function sectionFor(id) {
  const page = id.replace(/\/index$/, "") || id;
  return groups.find((group) =>
    groupPages(group).some(
      (item) => starlightSlug(item) === page || item === id,
    ),
  );
}
