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
      "getting-started/first-software-factory",
      "getting-started/core-concepts",
      "getting-started/first-automation",
      "getting-started/first-employee",
    ],
  },
  {
    label: "Workflows",
    zh: "工作流",
    collapsed: true,
    items: [
      "workflows/concepts",
      "automate/fundamentals",
      "automate/workflow-builder",
      {
        label: "Triggers and control",
        zh: "触发与控制",
        collapsed: true,
        pages: [
          "automate/triggers-schedules",
          "automate/event-driven",
          "automate/watchers-webhooks",
          "automate/loops",
          "automate/approvals",
          "automate/runs-recovery",
          "automate/agent-handoff",
        ],
      },
    ],
  },
  {
    label: "Workflow applications",
    zh: "工作流应用",
    collapsed: false,
    items: [
      "workflows/applications",
      "software-factory/overview",
      "recipes/issue-to-pr",
      "workflows/kanban-workbench",
      "workflows/issue-automation",
      "workflows/pull-request-automation",
      "workflows/research-monitoring",
      "workflows/custom-workflows",
      {
        label: "Software Factory path",
        zh: "软件工厂路径",
        collapsed: true,
        pages: [
          "software-factory/intake",
          "software-factory/dispatch",
          "software-factory/orchestration",
          "software-factory/review-release",
          "software-factory/release-governance",
        ],
      },
    ],
  },
  {
    label: "Agents and capabilities",
    zh: "智能体与能力",
    collapsed: true,
    items: [
      "user-guide/ai-employees",
      "build/employee-definition",
      "build/prompts-rules",
      {
        label: "Working with employees",
        zh: "使用数字员工",
        collapsed: true,
        pages: [
          "user-guide/workspace",
          "user-guide/projects",
          "user-guide/agent-chat",
          "user-guide/sessions-planning",
          "user-guide/inbox-tasks",
          "user-guide/human-approval",
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
          "user-guide/knowledge-context",
        ],
      },
      {
        label: "Composition and lifecycle",
        zh: "组合与生命周期",
        collapsed: true,
        pages: [
          "build/composition",
          "build/hooks-subagents",
          "build/testing",
          "build/templates",
          "build/publishing",
          "build/architecture",
        ],
      },
    ],
  },
  {
    label: "Execution and operations",
    zh: "执行与运营",
    collapsed: true,
    items: [
      "deployment/runtime-environments",
      "deployment/self-host",
      {
        label: "Delivery execution",
        zh: "交付执行",
        collapsed: true,
        pages: [
          "software-factory/harness",
          "software-factory/environments",
          "software-factory/cicd",
          "software-factory/build-test",
          "software-factory/business-verification",
          "software-factory/evidence",
          "user-guide/artifacts-evidence",
          "software-factory/evaluation",
          "software-factory/quality-gates",
          "software-factory/observability",
        ],
      },
      {
        label: "Operate",
        zh: "运营",
        collapsed: true,
        pages: [
          "models/overview",
          "deployment/security",
          "administration/teams-access",
          "administration/configuration",
          "administration/analytics",
          "operate/evaluation-governance",
          "operate/audit",
        ],
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
        label: "Product connections",
        zh: "产品连接",
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
    label: "Resources",
    zh: "资源",
    collapsed: true,
    items: [
      "getting-started/platform-overview",
      "learn/index",
      "learn/requirements-writing",
      "learn/blueprints-work-orders",
      "learn/feedback-review",
      "resources/best-practices",
      "resources/examples",
      "resources/troubleshooting",
      "resources/releases-support",
      "concepts/glossary",
    ],
  },
];

export function groupPages(group) {
  return group.items.flatMap((item) =>
    typeof item === "string" ? [item] : item.pages,
  );
}

export const orderedIds = [homeId, ...groups.flatMap(groupPages)];

export const plannedIds = groupPages(
  groups.find((group) => group.label === "Planned") ?? { items: [] },
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
