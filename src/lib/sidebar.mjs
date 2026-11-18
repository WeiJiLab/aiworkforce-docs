/** Single information architecture shared by English and Chinese. File ids keep existing URLs. */
export const homeId = "index";

export const groups = [
  {
    label: "Get started",
    zh: "开始使用",
    pages: [
      "getting-started/introduction",
      "getting-started/platform-overview",
      "getting-started/core-concepts",
      "getting-started/quickstart",
      "getting-started/first-employee",
      "getting-started/first-automation",
      "getting-started/first-software-factory",
    ],
  },
  {
    label: "Use AI Workforce",
    zh: "使用数字员工",
    pages: [
      "user-guide/workspace",
      "user-guide/projects",
      "user-guide/ai-employees",
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
    pages: [
      "build/architecture",
      "build/employee-definition",
      "build/prompts-rules",
      "build/skills-plugins",
      "build/skills",
      "build/plugins",
      "build/tools",
      "build/mcp-integration",
      "build/composition",
      "build/hooks-subagents",
      "build/testing",
      "build/publishing",
      "build/templates",
    ],
  },
  {
    label: "Automate work",
    zh: "自动化工作",
    pages: [
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
    label: "Software Factory",
    zh: "软件工厂",
    pages: [
      "software-factory/overview",
      "software-factory/intake",
      "software-factory/dispatch",
      "software-factory/orchestration",
      "software-factory/harness",
      "software-factory/environments",
      "software-factory/cicd",
      "software-factory/build-test",
      "software-factory/business-verification",
      "software-factory/evidence",
      "software-factory/evaluation",
      "software-factory/observability",
      "software-factory/quality-gates",
      "software-factory/review-release",
      "software-factory/release-governance",
    ],
  },
  {
    label: "Integrations & developer",
    zh: "集成与开发",
    pages: [
      "integrations/overview",
      "integrations/code-repositories",
      "integrations/employee-tools",
      "developer/index",
      "developer/architecture",
      "developer/api-reference",
      "developer/authentication",
      "integrations/webhooks",
      "integrations/mcp",
      "integrations/agent-protocol",
      "integrations/sdk",
      "integrations/cli",
      "integrations/openapi",
      "developer/cli-sdk",
      "developer/contributing",
    ],
  },
  {
    label: "Operate & govern",
    zh: "运营与治理",
    pages: [
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
    pages: [
      "concepts/glossary",
      "resources/troubleshooting",
      "resources/releases-support",
      "resources/best-practices",
      "learn/index",
      "learn/requirements-writing",
      "learn/blueprints-work-orders",
      "learn/feedback-review",
      "recipes/issue-to-pr",
      "resources/examples",
    ],
  },
];

export const orderedIds = [homeId, ...groups.flatMap((group) => group.pages)];

export function starlightSlug(id) {
  return id.replace(/\/index$/, "") || "index";
}

export function sectionFor(id) {
  const page = id.replace(/\/index$/, "") || id;
  return groups.find((group) =>
    group.pages.some((item) => starlightSlug(item) === page || item === id),
  );
}
