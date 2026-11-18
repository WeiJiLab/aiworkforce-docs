/**
 * Docs / Learn / API portals share English and Chinese slugs.
 * File ids keep existing guide URLs when a page changes section.
 */

export const Portal = {
  Docs: "docs",
  Learn: "learn",
  Api: "api",
};

export function starlightSlug(id) {
  return id.replace(/\/index$/, "") || "index";
}

export function groupPages(group) {
  return group.items.flatMap((item) =>
    typeof item === "string" ? [item] : groupPages(item),
  );
}

/** Nested groups use the same shape as top-level groups (label/zh/items). */
function nested(label, zh, items, collapsed = true) {
  return { label, zh, collapsed, items };
}

export const PORTALS = {
  [Portal.Docs]: {
    label: "Docs",
    zhLabel: "文档",
    description: ["Product reference", "产品参考"],
    landing: "index",
    groups: [
      {
        label: "Get started",
        zh: "开始使用",
        collapsed: false,
        items: [
          "getting-started/introduction",
          "getting-started/quickstart",
          "getting-started/first-software-factory",
          "getting-started/delivery-board-troubleshooting",
          "getting-started/core-concepts",
          "getting-started/first-automation",
          "getting-started/platform-overview",
        ],
      },
      {
        label: "Software Factory",
        zh: "软件工厂",
        collapsed: false,
        items: [
          "software-factory/overview",
          "software-factory/requirements-to-card",
          "software-factory/card-to-pr",
          "software-factory/pr-to-merge",
          "software-factory/signal-to-card",
          "workflows/issue-automation",
          "workflows/kanban-workbench",
          "workflows/pull-request-automation",
          "recipes/issue-to-pr",
          nested("Software Factory path", "软件工厂路径", [
            "software-factory/intake",
            "software-factory/dispatch",
            "software-factory/orchestration",
            "software-factory/build-test",
            "software-factory/business-verification",
            "software-factory/quality-gates",
            "software-factory/review-release",
            "software-factory/release-governance",
          ]),
        ],
      },
      {
        label: "Automate Work",
        zh: "自动化工作",
        collapsed: true,
        items: [
          "workflows/concepts",
          "workflows/applications",
          "automate/fundamentals",
          "automate/workflow-builder",
          "automate/triggers-schedules",
          "automate/event-driven",
          "automate/watchers-webhooks",
          "automate/loops",
          "automate/approvals",
          "workflows/custom-workflows",
          "workflows/research-monitoring",
        ],
      },
      {
        label: "Build Workflows",
        zh: "构建工作流",
        collapsed: true,
        items: [
          "user-guide/ai-employees",
          nested("Employees", "数字员工", [
            "getting-started/first-employee",
            "build/employee-definition",
            "build/prompts-rules",
            "user-guide/workspace",
            "user-guide/agent-chat",
            "user-guide/sessions-planning",
            "user-guide/inbox-tasks",
            "user-guide/human-approval",
            "user-guide/knowledge-context",
          ]),
          nested("Capabilities", "能力", [
            "build/skills-plugins",
            "build/skills",
            "build/plugins",
            "build/tools",
            "build/mcp-integration",
            "integrations/employee-tools",
          ]),
          nested("Composition and lifecycle", "组合与生命周期", [
            "automate/agent-handoff",
            "build/composition",
            "build/hooks-subagents",
            "build/testing",
            "build/templates",
            "build/publishing",
            "build/architecture",
          ]),
        ],
      },
      {
        label: "Run Workflows",
        zh: "运行工作流",
        collapsed: true,
        items: [
          "deployment/runtime-environments",
          "software-factory/harness",
          "software-factory/environments",
          "software-factory/cicd",
          "automate/runs-recovery",
          "software-factory/evidence",
          "user-guide/artifacts-evidence",
        ],
      },
      {
        label: "Integrations",
        zh: "集成",
        collapsed: true,
        items: [
          "integrations/overview",
          nested("Code hosting", "代码托管", [
            "integrations/github",
            "integrations/gitlab",
            "integrations/yunxiao",
            "integrations/code-repositories",
          ]),
          nested("Issue import", "事项导入", [
            "integrations/jira",
            "integrations/linear",
          ]),
          nested("Messaging", "消息渠道", [
            "integrations/feishu",
            "integrations/dingtalk",
            "integrations/slack",
            "integrations/microsoft-teams",
            "integrations/wecom",
            "integrations/wechat",
          ]),
          nested("Monitoring", "监控告警", [
            "integrations/sentry",
            "integrations/pagerduty",
          ]),
        ],
      },
      {
        label: "Operate",
        zh: "运营",
        collapsed: true,
        items: [
          "user-guide/projects",
          "administration/teams-access",
          "administration/configuration",
          "models/overview",
          "administration/analytics",
          "software-factory/evaluation",
          "operate/evaluation-governance",
          "software-factory/observability",
          "operate/audit",
          "deployment/security",
          "deployment/self-host",
        ],
      },
      {
        label: "Resources",
        zh: "资源",
        collapsed: true,
        items: [
          "resources/best-practices",
          "resources/examples",
          "resources/troubleshooting",
          "resources/releases-support",
          "concepts/glossary",
        ],
      },
    ],
  },
  [Portal.Learn]: {
    label: "Learn",
    zhLabel: "学习",
    description: ["Tutorials and courses", "教程与课程"],
    landing: "learn",
    groups: [
      {
        label: "Software Factory Foundations",
        zh: "软件工厂基础",
        collapsed: false,
        items: [
          "learn/software-factory-foundations/index",
          "learn/software-factory-foundations/what-is-ai-software-factory",
          "learn/software-factory-foundations/how-agentic-workflows-work",
          "learn/software-factory-foundations/from-issue-to-delivery",
          "learn/software-factory-foundations/agents-environments-tools",
          "learn/software-factory-foundations/verification-evidence",
          "learn/software-factory-foundations/human-in-the-loop",
        ],
      },
      {
        label: "Build with AI Workforce",
        zh: "用 AI Workforce 构建",
        collapsed: false,
        items: [
          "learn/build-with-ai-workforce/index",
          "learn/build-with-ai-workforce/create-first-workflow",
          "learn/build-with-ai-workforce/connect-github",
          "learn/build-with-ai-workforce/build-issue-automation",
          "learn/build-with-ai-workforce/create-an-agent",
          "learn/build-with-ai-workforce/add-skills-tools",
          "learn/build-with-ai-workforce/connect-mcp",
          "learn/build-with-ai-workforce/design-handoffs",
          "learn/build-with-ai-workforce/test-evaluate-workflow",
          "learn/build-with-ai-workforce/publish-workflow",
        ],
      },
      {
        label: "Run a Software Factory",
        zh: "运行软件工厂",
        collapsed: true,
        items: [
          "learn/run-software-factory/index",
          "learn/run-software-factory/set-up-software-factory",
          "learn/run-software-factory/configure-environments",
          "learn/run-software-factory/connect-cicd",
          "learn/run-software-factory/configure-coding-agents",
          "learn/run-software-factory/kanban-automation",
          "learn/run-software-factory/automate-issue-processing",
          "learn/run-software-factory/configure-verification",
          "learn/run-software-factory/set-up-governance",
          "learn/run-software-factory/monitor-runs-cost",
          "learn/run-software-factory/scale-autonomous-development",
        ],
      },
      {
        label: "Practice playbooks",
        zh: "实践手册",
        collapsed: true,
        items: [
          "learn/requirements-writing",
          "learn/blueprints-work-orders",
          "learn/feedback-review",
        ],
      },
    ],
  },
  [Portal.Api]: {
    label: "API",
    zhLabel: "API",
    description: ["Integrate programmatically", "程序化集成"],
    landing: "api",
    groups: [
      {
        label: "API Reference",
        zh: "API 参考",
        collapsed: false,
        items: [
          "developer/authentication",
          "developer/api-reference",
          "integrations/openapi",
        ],
      },
      {
        label: "Developer Guides",
        zh: "开发指南",
        collapsed: false,
        items: ["developer/architecture", "developer/contributing"],
      },
      {
        label: "SDK / CLI",
        zh: "SDK / CLI",
        collapsed: true,
        items: ["developer/cli-sdk", "integrations/sdk", "integrations/cli"],
      },
      {
        label: "Webhooks",
        zh: "Webhooks",
        collapsed: true,
        items: ["integrations/webhooks"],
      },
      {
        label: "MCP",
        zh: "MCP",
        collapsed: true,
        items: ["integrations/mcp"],
      },
    ],
  },
};

export const homeId = PORTALS[Portal.Docs].landing;

export function portalPages(portal) {
  const definition = PORTALS[portal];
  return [
    definition.landing === "index" ? "index" : `${definition.landing}/index`,
    ...definition.groups.flatMap(groupPages),
  ].map((id) => (id.endsWith("/index") || id === "index" ? id : id));
}

/** Normalize landing ids used as file ids in the content collection. */
export function landingFileId(landing) {
  return landing === "index" ? "index" : `${landing}/index`;
}

export function orderedIdsForPortal(portal) {
  const definition = PORTALS[portal];
  const landingId = landingFileId(definition.landing);
  const pages = [landingId, ...definition.groups.flatMap(groupPages)];
  const unique = [];
  const seen = new Set();
  for (const id of pages) {
    const key = starlightSlug(id);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(id);
  }
  return unique;
}

export const orderedIds = Object.values(Portal).flatMap((portal) =>
  orderedIdsForPortal(portal),
);

/** Planned pages removed from the primary IA; keep helper for governance. */
export const plannedIds = [];

export const groups = PORTALS[Portal.Docs].groups;

export function sectionFor(id) {
  const page = starlightSlug(id.replace(/^zh-cn(?:\/|$)/, ""));
  for (const portal of Object.values(Portal)) {
    const definition = PORTALS[portal];
    if (starlightSlug(landingFileId(definition.landing)) === page) {
      return { portal, group: null, definition };
    }
    const group = definition.groups.find((entry) =>
      groupPages(entry).some((item) => starlightSlug(item) === page),
    );
    if (group) return { portal, group, definition };
  }
  return undefined;
}
