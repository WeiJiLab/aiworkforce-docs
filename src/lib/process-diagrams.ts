import { withBase } from "./site.mjs";

type Copy = readonly [english: string, chinese: string];
interface Step {
  readonly label: Copy;
  readonly detail: Copy;
  readonly href: string;
  readonly anchor?: Copy;
  readonly human?: boolean;
}
interface Diagram {
  readonly title: Copy;
  readonly description: Copy;
  readonly steps: readonly Step[];
  readonly feedback?: {
    readonly from: number;
    readonly to: number;
    readonly label: Copy;
  };
  readonly layout?: "recovery" | "request";
}

export const processDiagrams = {
  "delivery-loop": {
    title: ["A change through delivery", "一项变更怎样完成"],
    description: [
      "Agree the scope, execute, verify the revision in its environment, and review the evidence. Failed checks return the work for repair; merge and release follow the project's configured process.",
      "确认范围、执行工作、核对受测版本与环境，再依据证据审阅。验证失败时返回修复；后续合并和发布按项目配置的流程进行。",
    ],
    steps: [
      {
        label: ["Agree scope", "确认范围"],
        detail: ["Goals and criteria", "需求与标准"],
        href: "software-factory/intake",
        human: true,
      },
      {
        label: ["Do the work", "执行工作"],
        detail: ["Changes and outputs", "变更与产物"],
        href: "software-factory/dispatch",
      },
      {
        label: ["Verify results", "验证结果"],
        detail: ["Revision and environment", "版本与环境"],
        href: "software-factory/build-test",
      },
      {
        label: ["Review evidence", "人工审阅"],
        detail: ["Accept or return", "接受或退回"],
        href: "software-factory/review-release",
        human: true,
      },
    ],
    feedback: {
      from: 2,
      to: 1,
      label: ["Failed check: repair and retest", "未通过，返回修复并重新验证"],
    },
  },
  "automation-run": {
    title: ["One trigger, one run", "一次触发，一次运行"],
    description: [
      "Define the work and inspect a manual trial before enabling automatic triggers. Each later trigger starts another run with its own result.",
      "先约定工作并检查一次手动试跑，再启用自动触发。之后每次触发产生另一次运行，各自保留结果。",
    ],
    steps: [
      {
        label: ["Define work", "约定工作"],
        detail: ["Goal, method, limits", "目标与边界"],
        href: "automate/workflow-builder",
      },
      {
        label: ["Choose a trigger", "选择触发"],
        detail: ["Manual, event, schedule", "手动或自动"],
        href: "automate/triggers-schedules",
      },
      {
        label: ["Start one run", "一次运行"],
        detail: ["Execute and record", "执行与记录"],
        href: "getting-started/first-automation",
      },
      {
        label: ["Check results", "检查结果"],
        detail: ["Outputs and evidence", "产物与证据"],
        href: "automate/runs-recovery",
        human: true,
      },
    ],
  },
  "worker-lifecycle": {
    title: [
      "Expertise becomes a reusable worker",
      "专家方法怎样变成可复用能力",
    ],
    description: [
      "Demonstrate real work, agree responsibilities and acceptance, connect tools, and try real tasks before publishing. Teams use run feedback to improve later versions and explicitly adopt them.",
      "从真实专家流程出发，明确职责与验收，接入工具并用任务试验，再发布供团队采用。运行反馈用于改进后续版本，已有员工采用新版本需明确安排。",
    ],
    steps: [
      {
        label: ["Show the work", "专家示范"],
        detail: ["A real procedure", "真实流程"],
        href: "build/overview",
        anchor: ["start-with-the-work", "从工作本身开始"],
        human: true,
      },
      {
        label: ["Agree criteria", "明确标准"],
        detail: ["Role and acceptance", "职责与验收"],
        href: "build/employee-definition",
      },
      {
        label: ["Connect tools", "接入工具"],
        detail: ["Authorized resources", "授权资源"],
        href: "integrations/employee-tools",
      },
      {
        label: ["Try real tasks", "任务试验"],
        detail: ["Check the evidence", "结果与证据"],
        href: "build/testing",
      },
      {
        label: ["Publish a version", "发布复用"],
        detail: ["Teams adopt it", "团队采用"],
        href: "build/publishing",
        human: true,
      },
    ],
    feedback: {
      from: 4,
      to: 1,
      label: [
        "Run feedback improves the next version",
        "运行反馈，改进下一版本",
      ],
    },
  },
  "run-recovery": {
    title: ["Follow work and recover from a block", "工作遇阻时怎样继续"],
    description: [
      "Prepare inputs, permissions, and the environment, then follow execution and inspect results. When work is blocked, preserve the record, resolve the cause, and explicitly resume or hand it back.",
      "准备输入、权限与环境，跟进执行并核对结果。遇阻时保留记录，由人处理原因，再按实际状态恢复或明确交还。",
    ],
    layout: "recovery",
    steps: [
      {
        label: ["Prepare work", "准备任务"],
        detail: ["Inputs and permissions", "输入与授权"],
        href: "workflows/run",
        anchor: ["check-readiness", "检查就绪条件"],
      },
      {
        label: ["Follow execution", "跟进执行"],
        detail: ["Progress and records", "进展与记录"],
        href: "automate/runs-recovery",
      },
      {
        label: ["Check results", "核对结果"],
        detail: ["Outputs and evidence", "产物与证据"],
        href: "user-guide/artifacts-evidence",
      },
      {
        label: ["Resolve the block", "人处理问题"],
        detail: ["Human intervention", "补充或修复"],
        href: "resources/troubleshooting",
        human: true,
      },
      {
        label: ["Hand work back", "明确恢复"],
        detail: ["Confirm how to continue", "交还执行"],
        href: "user-guide/human-approval",
        human: true,
      },
    ],
  },
  "improvement-loop": {
    title: [
      "Use real runs to improve the next version",
      "用运行反馈改进下一版本",
    ],
    description: [
      "Teams inspect failures and human effort, improve the method, repeat the relevant cases, and adopt an approved version. This is a team improvement process; it does not imply automatic learning or automatic rollout.",
      "团队从失败和人工投入中选择改进项，修改方法，用案例复验后发布并采用下一版本。这是团队改进流程，不表示自动学习或自动升级。",
    ],
    steps: [
      {
        label: ["Read run records", "运行记录"],
        detail: ["Results and evidence", "结果与证据"],
        href: "software-factory/observability",
      },
      {
        label: ["Find the friction", "分析问题"],
        detail: ["Failures and effort", "失败与人力"],
        href: "operate/overview",
        anchor: ["choose-a-specific-improvement", "选择具体改进项"],
      },
      {
        label: ["Improve methods", "改进方法"],
        detail: ["Procedures and tools", "流程与工具"],
        href: "build/skills",
      },
      {
        label: ["Repeat the cases", "案例复验"],
        detail: ["Acceptance criteria", "验收标准"],
        href: "software-factory/evaluation",
      },
      {
        label: ["Adopt a version", "发布采用"],
        detail: ["Version and scope", "版本与范围"],
        href: "build/publishing",
        human: true,
      },
    ],
    feedback: {
      from: 4,
      to: 0,
      label: ["New tasks supply the next feedback", "新任务继续提供反馈"],
    },
  },
  "integration-trust": {
    title: ["From a connection to usable tools", "连接怎样成为可用能力"],
    description: [
      "Choose the resource needed for the task, connect it, authorize the executor, and verify a small real operation before relying on it. A connected account alone does not grant worker access.",
      "选择任务所需资源，建立连接、授权执行者，再用一次小任务验证实际可用性。账号连接成功后，仍需核对员工权限。",
    ],
    steps: [
      {
        label: ["Choose resources", "选择资源"],
        detail: ["Only what work needs", "只选任务所需"],
        href: "integrations/overview",
        anchor: ["choose-the-purpose", "先选择连接目的"],
      },
      {
        label: ["Connect an account", "建立连接"],
        detail: ["External identity", "外部身份"],
        href: "integrations/code-repositories",
      },
      {
        label: ["Authorize tools", "授权执行者"],
        detail: ["Limit allowed actions", "操作范围"],
        href: "deployment/security",
        human: true,
      },
      {
        label: ["Try a small task", "小任务验证"],
        detail: ["Inspect real results", "实际结果"],
        href: "integrations/employee-tools",
      },
      {
        label: ["Use it in work", "用于工作"],
        detail: ["Keep the evidence", "调用证据"],
        href: "workflows/run",
      },
    ],
  },
  "api-invocation": {
    title: [
      "Start and follow work from another system",
      "外部系统怎样启动并跟踪工作",
    ],
    description: [
      "An authorized caller starts work, receives a run record, then queries its state and results. An accepted request is not a completed task; inspect the final output and evidence. This flow does not use outbound event subscriptions.",
      "外部系统发起已授权任务，取得运行记录后查询状态与结果。工作被接受后仍需跟踪完成情况，并核对产物与证据；此流程不使用出站事件订阅。",
    ],
    layout: "request",
    steps: [
      {
        label: ["Start authorized work", "发起已授权任务"],
        detail: ["Choose caller permissions", "选择调用权限"],
        href: "developer/authentication",
      },
      {
        label: ["Receive a run record", "返回运行记录"],
        detail: ["Follow asynchronous work", "跟踪异步工作"],
        href: "developer/api-reference",
      },
      {
        label: ["Query state and results", "查询状态与结果"],
        detail: ["Read the run", "读取本次运行"],
        href: "developer/api-reference",
      },
      {
        label: ["Return state and outputs", "返回状态与产物"],
        detail: ["Check the evidence", "检查证据"],
        href: "user-guide/artifacts-evidence",
      },
    ],
  },
} as const satisfies Record<string, Diagram>;

export type ProcessDiagramId = keyof typeof processDiagrams;
export const processDiagramIds = Object.keys(
  processDiagrams,
) as ProcessDiagramId[];

function escapeXml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );
}

export function processHref(href: string, zh: boolean): string {
  return withBase(`${zh ? "/zh-cn" : ""}/${href}/`);
}

function stepHref(step: Step, zh: boolean): string {
  const href = processHref(step.href, zh);
  return step.anchor
    ? `${href}#${encodeURIComponent(step.anchor[zh ? 1 : 0])}`
    : href;
}

export function diagramAssetHref(id: ProcessDiagramId, zh: boolean): string {
  return withBase(`/diagrams/${zh ? "zh-cn" : "en"}/${id}.svg`);
}

const svgStyle = `
.process-svg{color:var(--docs-ink,#182e40);font-family:"MiSans","PingFang SC","Microsoft YaHei",system-ui,sans-serif}
.process-svg .process-node rect{fill:var(--docs-surface,#fff);stroke:var(--docs-accent,#08789b);stroke-width:1.7}
.process-svg .process-node--human rect{fill:var(--process-human-bg,#fff7ed);stroke:var(--process-human,#986119)}
.process-svg .process-node text{fill:var(--docs-ink,#182e40);pointer-events:none}
.process-svg .process-node .process-detail{fill:var(--docs-muted,#536674)}
.process-svg .process-node:hover rect,.process-svg .process-node:focus-visible rect{fill:var(--docs-hover,#eaf4f6);stroke-width:3}
.process-svg .process-node:focus-visible{outline:none}
.process-svg .process-node:hover .process-label,.process-svg .process-node:focus-visible .process-label{text-decoration:underline;text-underline-offset:4px}
.process-svg .process-edge{fill:none;stroke:var(--docs-accent,#08789b);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.process-svg .process-feedback{fill:var(--docs-accent,#08789b);font-size:16px}
.process-svg .process-lane{stroke:var(--docs-line,#c9d7df);stroke-width:1.6;stroke-dasharray:5 5}
`;

function lines(value: string, limit: number): string[] {
  if (value.length <= limit) return [value];
  if (!value.includes(" ")) {
    const characters = Array.from(value);
    return Array.from(
      { length: Math.ceil(characters.length / limit) },
      (_, index) =>
        characters.slice(index * limit, (index + 1) * limit).join(""),
    );
  }
  const words = value.split(" ");
  const result = [""];
  for (const word of words) {
    const last = result.length - 1;
    if (result[last] && `${result[last]} ${word}`.length > limit)
      result.push(word);
    else result[last] += `${result[last] ? " " : ""}${word}`;
  }
  return result;
}

interface Position {
  readonly x: number;
  readonly y: number;
}

interface SvgLayout {
  readonly width: number;
  readonly height: number;
  readonly boxWidth: number;
  readonly textLimit: number;
  readonly positions: readonly Position[];
}

interface SvgContext {
  readonly diagram: Diagram;
  readonly locale: 0 | 1;
  readonly zh: boolean;
  readonly narrow: boolean;
  readonly prefix: string;
  readonly layout: SvgLayout;
}

interface SvgLabel {
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly className: string;
  readonly size: number;
  readonly limit: number;
}

const nodeGeometry = {
  height: 106,
  centerY: 53,
  top: 20,
  radius: 10,
  labelY: 44,
  detailY: 81,
  lineHeight: 20,
  detailSize: 16,
} as const;

const wideLayout = {
  width: 680,
  left: 20,
  outerSpace: 40,
  boxWidth: 144,
  fiveStepBoxWidth: 112,
  textLimit: 19,
  fiveStepTextLimit: 13,
  height: 152,
  feedbackHeight: 228,
} as const;

const narrowLayout = {
  width: 360,
  left: 36,
  boxWidth: 288,
  textLimit: 30,
  stepStride: 132,
  feedbackExtraHeight: 46,
  returnX: 14,
  blockedX: 346,
} as const;

const recoveryLayout = {
  mainSteps: 3,
  boxWidth: 180,
  textLimit: 23,
  topStride: 230,
  branchLeft: 130,
  branchStride: 240,
  branchTop: 208,
  branchRouteY: 170,
  blockedStartOffset: 55,
  returnInset: 25,
  height: 338,
} as const;

const edgeGeometry = {
  startGap: 4,
  endGap: 7,
  verticalStartGap: 3,
  feedbackStartGap: 2,
  recoveryEndGap: 6,
  feedbackRouteY: 190,
  feedbackLabelY: 217,
  narrowFeedbackLabelInset: 13,
} as const;

const requestLayout = {
  height: 360,
  wideLeft: 100,
  narrowLeft: 34,
  headingY: 24,
  laneTop: 45,
  laneBottom: 330,
  firstStepY: 82,
  stepStride: 72,
  startInset: 8,
  endInset: 12,
  hitAreaInset: 4,
  hitAreaTop: 31,
  hitAreaHeight: 53,
  hitAreaRadius: 6,
  labelOffset: 7,
  arrowOffset: 13,
} as const;

const standaloneSvgStyle = `@media(prefers-color-scheme:dark){.process-svg{--docs-ink:#f1f2f6;--docs-muted:#c4c8d2;--docs-accent:#91d9ef;--docs-surface:#121923;--docs-hover:#193646;--docs-line:#667085;--process-human:#efbe83;--process-human-bg:#382b20}}`;

function layoutBox(diagram: Diagram, narrow: boolean) {
  if (narrow)
    return {
      boxWidth: narrowLayout.boxWidth,
      textLimit: narrowLayout.textLimit,
    };
  if (diagram.layout === "recovery")
    return {
      boxWidth: recoveryLayout.boxWidth,
      textLimit: recoveryLayout.textLimit,
    };
  return diagram.steps.length === 5
    ? {
        boxWidth: wideLayout.fiveStepBoxWidth,
        textLimit: wideLayout.fiveStepTextLimit,
      }
    : { boxWidth: wideLayout.boxWidth, textLimit: wideLayout.textLimit };
}

function layoutHeight(diagram: Diagram, narrow: boolean): number {
  if (diagram.layout === "request") return requestLayout.height;
  if (narrow)
    return (
      diagram.steps.length * narrowLayout.stepStride +
      (diagram.feedback ? narrowLayout.feedbackExtraHeight : 0)
    );
  if (diagram.layout === "recovery") return recoveryLayout.height;
  return diagram.feedback ? wideLayout.feedbackHeight : wideLayout.height;
}

function layoutPositions(
  diagram: Diagram,
  narrow: boolean,
  boxWidth: number,
): readonly Position[] {
  return diagram.steps.map((_, index) => {
    if (narrow)
      return {
        x: narrowLayout.left,
        y: nodeGeometry.top + index * narrowLayout.stepStride,
      };
    if (diagram.layout === "recovery")
      return index < recoveryLayout.mainSteps
        ? {
            x: wideLayout.left + index * recoveryLayout.topStride,
            y: nodeGeometry.top,
          }
        : {
            x:
              recoveryLayout.branchLeft +
              (index - recoveryLayout.mainSteps) * recoveryLayout.branchStride,
            y: recoveryLayout.branchTop,
          };
    const gap =
      (wideLayout.width -
        wideLayout.outerSpace -
        diagram.steps.length * boxWidth) /
      (diagram.steps.length - 1);
    return {
      x: wideLayout.left + index * (boxWidth + gap),
      y: nodeGeometry.top,
    };
  });
}

function createSvgContext(
  id: ProcessDiagramId,
  zh: boolean,
  narrow: boolean,
): SvgContext {
  const diagram: Diagram = processDiagrams[id];
  const box = layoutBox(diagram, narrow);
  return {
    diagram,
    locale: zh ? 1 : 0,
    zh,
    narrow,
    prefix: `${id}-${zh ? "zh" : "en"}-${narrow ? "narrow" : "wide"}`,
    layout: {
      width: narrow ? narrowLayout.width : wideLayout.width,
      height: layoutHeight(diagram, narrow),
      ...box,
      positions: layoutPositions(diagram, narrow, box.boxWidth),
    },
  };
}

function renderPath(context: SvgContext, d: string): string {
  return `<path class="process-edge" d="${d}" marker-end="url(#${context.prefix}-arrow)"/>`;
}

function renderEdge(context: SvgContext, from: number, to: number): string {
  const { boxWidth, positions } = context.layout;
  const a = positions[from];
  const b = positions[to];
  const d = context.narrow
    ? `M${a.x + boxWidth / 2} ${a.y + nodeGeometry.height + edgeGeometry.verticalStartGap} V${b.y - edgeGeometry.endGap}`
    : `M${a.x + boxWidth + edgeGeometry.startGap} ${a.y + nodeGeometry.centerY} H${b.x - edgeGeometry.endGap}`;
  return renderPath(context, d);
}

function renderLabel({ text, x, y, className, size, limit }: SvgLabel): string {
  const split = lines(text, limit);
  const baseline = y - ((split.length - 1) * nodeGeometry.lineHeight) / 2;
  const spans = split
    .map(
      (line, index) =>
        `<tspan x="${x}" dy="${index ? nodeGeometry.lineHeight : 0}">${escapeXml(line)}</tspan>`,
    )
    .join("");
  return `<text class="${className}" x="${x}" y="${baseline}" text-anchor="middle" font-size="${size}"${className === "process-label" ? ' font-weight="600"' : ""}>${spans}</text>`;
}

function renderNode(context: SvgContext, step: Step, index: number): string {
  const { locale, zh, narrow, diagram } = context;
  const { boxWidth, positions, textLimit } = context.layout;
  const compact =
    !narrow && diagram.layout !== "recovery" && diagram.steps.length === 5;
  const position = positions[index];
  const center = position.x + boxWidth / 2;
  const title = renderLabel({
    text: step.label[locale],
    x: center,
    y: position.y + nodeGeometry.labelY,
    className: "process-label",
    size: zh && !compact ? 20 : 18,
    limit: textLimit,
  });
  const detail = renderLabel({
    text: step.detail[locale],
    x: center,
    y: position.y + nodeGeometry.detailY,
    className: "process-detail",
    size: nodeGeometry.detailSize,
    limit: zh && !narrow ? 6 : compact ? textLimit : textLimit + 1,
  });
  const ariaLabel = escapeXml(`${step.label[locale]}: ${step.detail[locale]}`);
  return `<a class="process-node${step.human ? " process-node--human" : ""}" href="${escapeXml(stepHref(step, zh))}" tabindex="0" aria-label="${ariaLabel}"><rect x="${position.x}" y="${position.y}" width="${boxWidth}" height="${nodeGeometry.height}" rx="${nodeGeometry.radius}"/>${title}${detail}</a>`;
}

function renderRequestStep(
  context: SvgContext,
  step: Step,
  index: number,
): string {
  const { narrow, zh, locale } = context;
  const { width } = context.layout;
  const left = narrow ? requestLayout.narrowLeft : requestLayout.wideLeft;
  const right = width - left;
  const y = requestLayout.firstStepY + index * requestLayout.stepStride;
  const from =
    index % 2 === 0
      ? left + requestLayout.startInset
      : right - requestLayout.startInset;
  const to =
    index % 2 === 0
      ? right - requestLayout.endInset
      : left + requestLayout.endInset;
  const label = renderLabel({
    text: step.label[locale],
    x: width / 2,
    y: y - requestLayout.labelOffset,
    className: "process-label",
    size: narrow ? 15 : 19,
    limit: 40,
  });
  const arrow = renderPath(
    context,
    `M${from} ${y + requestLayout.arrowOffset} H${to}`,
  );
  return `<a class="process-node" href="${escapeXml(stepHref(step, zh))}" tabindex="0" aria-label="${escapeXml(step.label[locale])}"><rect x="${left + requestLayout.hitAreaInset}" y="${y - requestLayout.hitAreaTop}" width="${right - left - requestLayout.hitAreaInset * 2}" height="${requestLayout.hitAreaHeight}" rx="${requestLayout.hitAreaRadius}" style="stroke:none;fill:transparent"/>${label}${arrow}</a>`;
}

function renderRequest(context: SvgContext): string {
  const { narrow, zh, diagram } = context;
  const left = narrow ? requestLayout.narrowLeft : requestLayout.wideLeft;
  const right = context.layout.width - left;
  const headingSize = narrow ? 17 : 20;
  const headings = `<text x="${left}" y="${requestLayout.headingY}" text-anchor="start" fill="currentColor" font-size="${headingSize}" font-weight="600">${zh ? "外部系统" : "External system"}</text><text x="${right}" y="${requestLayout.headingY}" text-anchor="end" fill="currentColor" font-size="${headingSize}" font-weight="600">AI Workforce</text>`;
  const lanes = `<path class="process-lane" d="M${left} ${requestLayout.laneTop} V${requestLayout.laneBottom} M${right} ${requestLayout.laneTop} V${requestLayout.laneBottom}"/>`;
  const steps = diagram.steps
    .map((step, index) => renderRequestStep(context, step, index))
    .join("");
  return headings + lanes + steps;
}

function renderRecovery(context: SvgContext): string {
  const { boxWidth, positions } = context.layout;
  const active = positions[1];
  const blocked = positions[3];
  const handBack = positions[4];
  const centerY = nodeGeometry.centerY;
  if (context.narrow) {
    return (
      renderPath(
        context,
        `M${active.x + boxWidth} ${active.y + centerY} H${narrowLayout.blockedX} V${blocked.y + centerY} H${blocked.x + boxWidth + edgeGeometry.startGap}`,
      ) +
      renderEdge(context, 3, 4) +
      renderPath(
        context,
        `M${handBack.x} ${handBack.y + centerY} H${narrowLayout.returnX} V${active.y + centerY} H${active.x - edgeGeometry.startGap}`,
      )
    );
  }
  const routeY = recoveryLayout.branchRouteY;
  return (
    renderPath(
      context,
      `M${active.x + recoveryLayout.blockedStartOffset} ${active.y + nodeGeometry.height} V${routeY} H${blocked.x + boxWidth / 2} V${blocked.y - edgeGeometry.endGap}`,
    ) +
    renderEdge(context, 3, 4) +
    renderPath(
      context,
      `M${handBack.x + boxWidth / 2} ${handBack.y} V${routeY} H${active.x + boxWidth - recoveryLayout.returnInset} V${active.y + nodeGeometry.height + edgeGeometry.recoveryEndGap}`,
    ) +
    `<text class="process-feedback" x="${blocked.x + boxWidth / 2 - 40}" y="${routeY - 7}">${context.zh ? "遇阻" : "Blocked"}</text>`
  );
}

function renderFeedback(context: SvgContext): string {
  const { diagram, locale, narrow, zh } = context;
  if (!diagram.feedback) return "";
  const { boxWidth, positions, width, height } = context.layout;
  const a = positions[diagram.feedback.from];
  const b = positions[diagram.feedback.to];
  const d = narrow
    ? `M${a.x} ${a.y + nodeGeometry.centerY} H${narrowLayout.returnX} V${b.y + nodeGeometry.centerY} H${b.x - edgeGeometry.startGap}`
    : `M${a.x + boxWidth / 2} ${a.y + nodeGeometry.height + edgeGeometry.feedbackStartGap} V${edgeGeometry.feedbackRouteY} H${b.x + boxWidth / 2} V${b.y + nodeGeometry.height + edgeGeometry.endGap}`;
  const labelY = narrow
    ? height - edgeGeometry.narrowFeedbackLabelInset
    : edgeGeometry.feedbackLabelY;
  const label = `<text class="process-feedback" x="${width / 2}" y="${labelY}" text-anchor="middle"${narrow && !zh ? ' style="font-size:13px"' : ""}>${escapeXml(diagram.feedback.label[locale])}</text>`;
  return renderPath(context, d) + label;
}

function renderFlow(context: SvgContext): string {
  const recovery = context.diagram.layout === "recovery";
  const mainCount = recovery
    ? recoveryLayout.mainSteps
    : context.diagram.steps.length;
  const edges = Array.from({ length: mainCount - 1 }, (_, index) =>
    renderEdge(context, index, index + 1),
  ).join("");
  const branch = recovery ? renderRecovery(context) : "";
  const nodes = context.diagram.steps
    .map((step, index) => renderNode(context, step, index))
    .join("");
  return edges + branch + renderFeedback(context) + nodes;
}

function renderSvgDocument(
  context: SvgContext,
  content: string,
  standalone: boolean,
): string {
  const { diagram, prefix, locale, zh } = context;
  const { width, height } = context.layout;
  const style = svgStyle + (standalone ? standaloneSvgStyle : "");
  const background = standalone
    ? '<rect width="100%" height="100%" fill="var(--docs-surface,#fff)"/>'
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" class="process-svg" viewBox="0 0 ${width} ${height}" role="group" aria-labelledby="${prefix}-title" aria-describedby="${prefix}-desc" lang="${zh ? "zh-CN" : "en"}"${standalone ? ` width="${width}" height="${height}"` : ""}><title id="${prefix}-title">${escapeXml(diagram.title[locale])}</title><desc id="${prefix}-desc">${escapeXml(diagram.description[locale])}</desc><style>${style}</style><defs><marker id="${prefix}-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="var(--docs-accent,#08789b)"/></marker></defs>${background}${content}</svg>`;
}

export function renderProcessSvg(
  id: ProcessDiagramId,
  zh: boolean,
  narrow = false,
  standalone = false,
): string {
  const context = createSvgContext(id, zh, narrow);
  const content =
    context.diagram.layout === "request"
      ? renderRequest(context)
      : renderFlow(context);
  return renderSvgDocument(context, content, standalone);
}

export function processDiagramMarkdown(
  id: ProcessDiagramId,
  zh: boolean,
): string {
  const diagram: Diagram = processDiagrams[id];
  const locale = zh ? 1 : 0;
  const mainSteps =
    diagram.layout === "recovery" ? diagram.steps.slice(0, 3) : diagram.steps;
  const stepLink = (step: Step) =>
    `[${step.label[locale]}](${stepHref(step, zh)}): ${step.detail[locale]}`;
  return [
    `**${diagram.title[locale]}**`,
    diagram.description[locale],
    ...mainSteps.map((step, index) => `${index + 1}. ${stepLink(step)}`),
    ...(diagram.layout === "recovery"
      ? [
          zh
            ? "遇阻时，保留记录并按以下分支处理，再交还执行："
            : "When blocked, preserve the record and follow this branch before handing work back:",
          ...diagram.steps.slice(3).map((step) => `- ${stepLink(step)}`),
        ]
      : []),
    ...(diagram.feedback ? [diagram.feedback.label[locale]] : []),
  ].join("\n\n");
}
