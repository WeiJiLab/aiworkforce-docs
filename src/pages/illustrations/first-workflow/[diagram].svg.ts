import type { APIRoute } from "astro";

const copy = {
  en: {
    title: "Build inspection from a template",
    job: "Your first build inspection",
    steps: [
      ["Connect CI", "Pick a project and", "its build history."],
      ["Employee template", "Create an employee.", "Grant CI read access."],
      [
        "Scenario template",
        "Build inspection fills in",
        "the task and schedule.",
      ],
      ["Run manually", "Check a reported failure", "against the build log."],
      ["Enable the Job", "Confirm the time zone", "and daily 08:30 rule."],
    ],
    pipeline: "Optional · Board template",
    scope: "Preview lanes, pipelines, Skills and MCP servers.",
    first: ["Admission", "Select cards"],
    next: ["QA employee", "Test each card"],
    mapping: "QA receives one admitted card at a time.",
  },
  "zh-cn": {
    title: "从模板开始第一次构建巡检",
    job: "第一次构建巡检",
    steps: [
      ["接入项目", "选定工作空间和项目，", "接入 CI 构建记录。"],
      ["使用员工模板", "创建执行员工，", "授予 CI 读取权限。"],
      ["选择场景模板", "「构建巡检」预填任务", "说明和建议日程。"],
      ["手动试运行", "打开报告中的构建链接，", "对照日志核实失败步骤。"],
      ["启用自动执行", "确认时区和每天 08:30", "的巡检规则。"],
    ],
    pipeline: "可选 · 使用看板模板",
    scope: "预览泳道、编排、共享 Skill 和 MCP 服务。",
    first: ["测试准入", "选择待测卡片"],
    next: ["测试员工", "逐卡执行验证"],
    mapping: "通过准入的卡片逐张交给测试员工。",
  },
} as const;

export function getStaticPaths() {
  return (["en", "zh-cn"] as const).flatMap((locale) =>
    [false, true].map((compact) => ({
      params: { diagram: `${locale}${compact ? "-compact" : ""}` },
      props: { locale, compact },
    })),
  );
}

// Each vignette uses the same 105 × 66 drawing area.
const artwork = [
  `<rect x="10" y="8" width="68" height="48" rx="5"/><path d="M10 20h68m-58-6h3m4 0h3m5 14-8 8 8 8m12-16 8 8-8 8"/><ellipse class="seal" cx="78" cy="40" rx="13" ry="5"/><path class="seal" d="M65 40v12c0 7 26 7 26 0V40c0 7-26 7-26 0Z"/>`,
  `<rect x="14" y="6" width="72" height="49" rx="5"/><path d="M14 19h72M22 13h2m5 0h2"/><circle class="tint" cx="32" cy="33" r="5"/><path d="M23 46q2-12 18-4m7-12h25m-25 8h17"/><rect class="seal" x="63" y="42" width="31" height="16" rx="4"/><path d="m71 50 3 3 7-8"/>`,
  `<rect x="11" y="8" width="76" height="48" rx="5"/><path d="M11 20h76m-66-6h3m4 0h3"/><rect class="tint" x="18" y="26" width="20" height="21" rx="2"/><path d="M44 29h29m-29 8h20"/><rect class="seal" x="65" y="41" width="28" height="17" rx="5"/><path d="m71 48 5 4 9-8"/>`,
  `<rect x="14" y="6" width="72" height="49" rx="5"/><path d="M14 19h72M22 13h2m5 0h2"/><path class="tint" d="m24 28 12 8-12 8z"/><path d="M43 31h29m-29 9h18"/><circle class="seal" cx="83" cy="48" r="12"/><path d="m77 48 4 4 7-8"/>`,
  `<rect x="16" y="10" width="62" height="44" rx="5"/><path d="M16 23h62M29 6v10m36-10v10m-38 17h6m8 0h6m8 0h6m-34 9h6m8 0h6"/><circle class="seal" cx="77" cy="46" r="14"/><path d="M77 37v9l7 4"/>`,
];

export const GET: APIRoute = ({ props }) => {
  const { locale, compact } = props as {
    locale: keyof typeof copy;
    compact: boolean;
  };
  const t = copy[locale];
  const width = compact ? 360 : 960;
  const height = compact ? 822 : 408;
  const steps = t.steps
    .map(([title, line1, line2], i) => {
      const x = compact ? 16 : 12 + 190 * i;
      const y = compact ? 49 + 109 * i : 52;
      const tx = compact ? 118 : 10;
      const ty = compact ? 28 : 99;
      return `<g transform="translate(${x} ${y})"><rect class="card" width="${compact ? 328 : 176}" height="${compact ? 98 : 162}" rx="9"/>
      <g class="drawing" transform="translate(${compact ? 3 : 37} ${compact ? 19 : 9})">${artwork[i]}</g>
      <circle cx="${compact ? 16 : 20}" cy="17" r="11" fill="#18587b"/><text class="number" x="${compact ? 16 : 20}" y="22">${i + 1}</text>
      <text class="step" x="${tx}" y="${ty}">${title}</text><text class="small" x="${tx}" y="${ty + 24}">${line1}</text><text class="small" x="${tx}" y="${ty + 44}">${line2}</text>
      ${i === t.steps.length - 1 ? "" : compact ? '<path class="arrow" d="M55 98v9m-3-3 3 3 3-3"/>' : '<path class="arrow" d="M177 78h11m-4-4 4 4-4 4"/>'}</g>`;
    })
    .join("");
  const pipelineY = compact ? 607 : 235;
  function node(label: readonly string[], second: boolean) {
    const x = compact ? (second ? 187 : 17) : second ? 488 : 20;
    const y = compact ? 85 : 65;
    return `<g transform="translate(${x} ${y})"><rect width="${compact ? 124 : 420}" height="56" rx="7" class="node"/><text x="12" y="23" class="node-title">${label[0]}</text><text x="12" y="44" class="small">${label[1]}</text></g>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" lang="${locale}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title desc">
    <title id="title">${t.title}</title><desc id="desc">${t.steps.map((s) => s.join(" ")).join(" ")} ${t.pipeline}. ${t.mapping}</desc>
    <style>text{font-family:system-ui,'PingFang SC','Microsoft YaHei',sans-serif;fill:#16394a}.section,.step,.node-title{font-weight:650}.section{font-size:20px}.step{font-size:17px}.node-title{font-size:16px}.small{font-size:13.5px;fill:#385768}.number{font-size:14px;fill:white;text-anchor:middle;font-weight:700}.card,.node,.drawing{fill:white;stroke:#bbd0d8}.drawing,.arrow{stroke:#235976;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.tint,.seal{fill:#ddf1f1}.arrow{fill:none}.node{stroke:#9ac8bf}</style>
    <rect width="100%" height="100%" rx="12" fill="#f3f7f8"/><text x="20" y="33" class="section">${t.job}</text>${steps}
    <g transform="translate(16 ${pipelineY})"><rect width="${width - 32}" height="${height - pipelineY - 14}" rx="9" fill="#e9f6f1" stroke="#a0c9bb"/>
    <text x="17" y="27" class="section">${t.pipeline}</text><text x="17" y="49" class="small">${t.scope}</text>${node(t.first, false)}${node(t.next, true)}
    <path class="arrow" d="${compact ? "M147 113h32m-5-5 5 5-5 5" : "M446 93h35m-5-5 5 5-5 5"}"/>
    <text x="17" y="${compact ? 167 : 142}" class="small">${t.mapping}</text></g></svg>`;
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
};
