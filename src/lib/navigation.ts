export enum Portal {
  Docs = "docs",
  Developers = "developers",
  Learn = "learn",
}

interface NavigationGroup {
  readonly label: string;
  readonly zh: string;
  readonly pages: readonly string[];
}

interface PortalDefinition {
  readonly label: string;
  readonly description: readonly [string, string];
  readonly landing: string;
  readonly groups: readonly NavigationGroup[];
}

export const PORTALS: Readonly<Record<Portal, PortalDefinition>> = {
  [Portal.Docs]: {
    label: "Docs",
    description: ["Use AI Workforce", "使用数字员工"],
    landing: "index",
    groups: [
      {
        label: "Get started",
        zh: "开始使用",
        pages: [
          "getting-started/introduction",
          "getting-started/platform-overview",
          "getting-started/core-concepts",
          "getting-started/quickstart",
        ],
      },
      {
        label: "Work with employees",
        zh: "使用数字员工",
        pages: [
          "user-guide/workspace",
          "user-guide/ai-employees",
          "user-guide/agent-chat",
          "user-guide/sessions-planning",
          "user-guide/knowledge-context",
          "user-guide/inbox-tasks",
          "user-guide/artifacts-evidence",
        ],
      },
      {
        label: "Automations",
        zh: "自动化",
        pages: [
          "automate/fundamentals",
          "automate/triggers-schedules",
          "automate/runs-recovery",
        ],
      },
      {
        label: "Software factory",
        zh: "软件工厂",
        pages: ["software-factory/overview", "software-factory/review-release"],
      },
      {
        label: "Connections",
        zh: "连接与集成",
        pages: [
          "integrations/overview",
          "integrations/code-repositories",
          "integrations/employee-tools",
        ],
      },
      {
        label: "Administration",
        zh: "团队与管理",
        pages: [
          "administration/teams-access",
          "administration/configuration",
          "administration/analytics",
          "models/overview",
        ],
      },
      {
        label: "Resources",
        zh: "资源与支持",
        pages: [
          "concepts/glossary",
          "resources/troubleshooting",
          "resources/releases-support",
        ],
      },
    ],
  },
  [Portal.Developers]: {
    label: "Developers",
    description: ["Build and integrate", "构建与集成"],
    landing: "developer",
    groups: [
      {
        label: "Build employees",
        zh: "构建数字员工",
        pages: [
          "build/employee-definition",
          "build/skills-plugins",
          "build/hooks-subagents",
          "build/mcp-integration",
        ],
      },
      {
        label: "APIs and protocols",
        zh: "API 与协议",
        pages: [
          "developer/architecture",
          "developer/authentication",
          "developer/api-reference",
          "developer/cli-sdk",
        ],
      },
      {
        label: "Runtime and deployment",
        zh: "运行环境与部署",
        pages: ["deployment/runtime-environments", "deployment/security"],
      },
      {
        label: "Contribute",
        zh: "参与贡献",
        pages: ["developer/contributing"],
      },
    ],
  },
  [Portal.Learn]: {
    label: "Learn",
    description: ["Methods and practice", "方法与实践"],
    landing: "learn",
    groups: [
      {
        label: "Best practices",
        zh: "最佳实践",
        pages: [
          "learn/requirements-writing",
          "learn/blueprints-work-orders",
          "build/prompts-rules",
          "learn/feedback-review",
        ],
      },
      {
        label: "End-to-end guides",
        zh: "端到端实践",
        pages: ["recipes/issue-to-pr"],
      },
    ],
  },
};

/** Existing article URLs remain stable when their reading destination changes. */
export function canonicalPage(id: string): string {
  return (
    id
      .replace(/^\/+|\/+$/g, "")
      .replace(/^zh-cn(?:\/|$)/, "")
      .replace(/\.mdx?$/, "")
      .replace(/\/?index$/, "") || "index"
  );
}

const pagePortals = new Map(
  Object.entries(PORTALS).flatMap(([portal, definition]) =>
    [
      definition.landing,
      ...definition.groups.flatMap((group) => group.pages),
    ].map((page) => [page, portal as Portal] as const),
  ),
);

export function getPortal(id: string): Portal {
  const page = canonicalPage(id);
  const portal = pagePortals.get(page);
  if (!portal) throw new Error(`Documentation page has no destination: ${id}`);
  return portal;
}

export function portalDestinations(locale?: string) {
  const zh = locale === "zh-cn";
  const base = zh ? "/zh-cn" : "";
  return Object.entries(PORTALS).map(([id, definition]) => ({
    id: id as Portal,
    label: definition.label,
    description: definition.description[zh ? 1 : 0],
    href: `${base}/${definition.landing === "index" ? "" : `${definition.landing}/`}`,
  }));
}

/** Starlight resolves translated labels and page titles before route filtering. */
export function portalSidebars() {
  return Object.entries(PORTALS).map(([id, definition]) => ({
    label: id,
    items: [
      {
        slug: definition.landing,
        label: `${definition.label} overview`,
        translations: { "zh-CN": `${definition.label} 概览` },
      },
      ...definition.groups.map((group) => ({
        label: group.label,
        translations: { "zh-CN": group.zh },
        collapsed: false,
        items: [...group.pages],
      })),
    ],
  }));
}
