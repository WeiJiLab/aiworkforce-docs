/**
 * Docs / Learn / Customize & Extend / Developer portals share English and Chinese slugs.
 * File ids keep existing guide URLs when a page changes section.
 */

export const Portal = {
  Docs: "docs",
  Learn: "learn",
  Build: "build",
  Developer: "developer",
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

const workerSchedulingGuide = "developer/execution-environment-scheduling";
const executionPoolsGuide = "deployment/daemon/execution-pools";

export const PORTALS = {
  [Portal.Docs]: {
    label: "Docs",
    zhLabel: "文档",
    landingLabel: "Docs home",
    landingZh: "文档首页",
    description: ["Product reference", "产品参考"],
    landing: "index",
    groups: [
      {
        label: "Get started",
        zh: "开始使用",
        collapsed: false,
        items: [
          "getting-started/first-employee",
          nested(
            "Use the expert workbench",
            "使用专家工作台",
            [
              "user-guide/agent-chat",
              "getting-started/expert-workbench-example",
            ],
            false,
          ),
          nested(
            "Use the delivery workbench",
            "使用交付工作台",
            [
              "getting-started/quickstart",
              "getting-started/first-software-factory",
              "getting-started/first-automation",
            ],
            false,
          ),
        ],
      },
      {
        label: "Expert workbench",
        zh: "专家工作台",
        collapsed: false,
        items: [
          "user-guide/expert-workbench",
          "user-guide/knowledge-context",
          "user-guide/sessions-planning",
          "user-guide/human-approval",
          "user-guide/artifacts-evidence",
        ],
      },
      {
        label: "Software Factory",
        zh: "软件工厂",
        collapsed: false,
        items: [
          "software-factory/overview",
          nested(
            "Collaboration templates",
            "协作模板",
            [
              "software-factory/templates",
              "software-factory/requirements-to-card",
              "software-factory/card-to-pr",
              "software-factory/pr-to-merge",
              "software-factory/signal-to-card",
            ],
            false,
          ),
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
          "getting-started/delivery-board-troubleshooting",
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
          "user-guide/inbox-tasks",
          "automate/approvals",
          "automate/agent-handoff",
          "workflows/custom-workflows",
          "workflows/research-monitoring",
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
        ],
      },
      {
        label: "Deploy Managed Agents",
        zh: "部署托管智能体",
        collapsed: true,
        items: [
          "deployment/managed-agents",
          "deployment/self-host",
          nested("Self-Hosted Machines", "自托管机器", [
            "deployment/daemon",
            "deployment/daemon/my-machines",
            "deployment/daemon/session-execution",
            executionPoolsGuide,
            "deployment/daemon/troubleshooting",
          ]),
        ],
      },
      {
        label: "Integrations",
        zh: "集成",
        collapsed: true,
        items: [
          "integrations/overview",
          "integrations/employee-tools",
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
        label: "Resources",
        zh: "资源",
        collapsed: true,
        items: [
          "getting-started/introduction",
          "getting-started/core-concepts",
          "user-guide/ai-employees",
          "user-guide/workspace",
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
    landingLabel: "Learning paths",
    landingZh: "学习路径",
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
  [Portal.Build]: {
    label: "Customize & Extend",
    zhLabel: "定制与扩展",
    landingLabel: "Customize & Extend overview",
    landingZh: "定制与扩展概览",
    description: [
      "Customize agent capabilities for your workflows",
      "为业务工作流定制 Agent 能力",
    ],
    landing: "build",
    groups: [
      {
        label: "Define an agent",
        zh: "定义 Agent",
        collapsed: false,
        items: [
          "build/employee-definition",
          "build/prompts-rules",
          "build/builder",
          "build/architecture",
        ],
      },
      {
        label: "Configure capabilities",
        zh: "配置能力",
        collapsed: false,
        items: [
          "build/skills-plugins",
          "build/skills",
          "build/plugins",
          "build/tools",
          "build/mcp-integration",
        ],
      },
      {
        label: "Agent collaboration",
        zh: "Agent 协作",
        collapsed: true,
        items: ["build/composition", "build/hooks-subagents"],
      },
      {
        label: "Testing and evaluation",
        zh: "测试与评测",
        collapsed: true,
        items: ["build/testing", "build/agent-tests"],
      },
      {
        label: "Templates and publishing",
        zh: "模板与发布",
        collapsed: true,
        items: [
          "build/templates",
          "build/publishing",
          "build/market",
          "build/marketplace",
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
        ],
      },
    ],
  },
  [Portal.Developer]: {
    label: "Developer",
    zhLabel: "Developer",
    landingLabel: "Development and integration",
    landingZh: "开发与集成",
    description: ["Build apps and integrations", "开发应用与集成"],
    landing: "developer",
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
        items: [
          "developer/architecture",
          workerSchedulingGuide,
          "developer/contributing",
        ],
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
      {
        label: "Apps",
        zh: "Apps",
        collapsed: false,
        items: [
          "developer/plugin-apps",
          "developer/plugin-app-api",
          "developer/built-in-viewers",
          "developer/viewer-apps",
        ],
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

/** Guides that describe planned capabilities, checked against their frontmatter. */
export const plannedIds = [workerSchedulingGuide];

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
