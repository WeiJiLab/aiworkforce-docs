import type { APIRoute } from "astro";

const copy = {
  en: {
    title: "Your first automation, step by step",
    job: "Automation Job",
    steps: [
      [
        "Define the task",
        "Give a developer an issue.",
        "Ask for steps to reproduce it.",
      ],
      [
        "Run it manually",
        "Open the run and check",
        "the steps against the issue.",
      ],
      ["Add a schedule", "If the result looks right,", "enable one schedule."],
    ],
    pipeline: "Optional · Lane pipeline",
    scope: "Choose a workspace, board, and lane.",
    first: ["Developer", "List repro steps"],
    next: ["QA engineer", "Draft a test case"],
    mapping: "On success, pass the steps to QA as input.",
  },
  "zh-cn": {
    title: "从第一个自动化到泳道编排",
    job: "自动化 Job",
    steps: [
      ["定义任务", "给开发员工一条 Issue，", "请它整理复现步骤。"],
      ["手动运行", "打开运行记录，对照 Issue", "核对员工整理的步骤。"],
      ["添加日程", "确认结果可用后，", "再启用一条定时规则。"],
    ],
    pipeline: "可选 · 泳道编排",
    scope: "选择工作空间、看板和泳道。",
    first: ["开发员工", "整理复现步骤"],
    next: ["测试员工", "起草测试用例"],
    mapping: "开发成功后，将复现步骤传给测试节点。",
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
  `<rect x="14" y="6" width="72" height="49" rx="5"/><path d="M14 19h72M22 13h2m5 0h2"/><circle class="tint" cx="32" cy="33" r="5"/><path d="M23 46q2-12 18-4m7-12h25m-25 8h17"/><rect class="seal" x="63" y="42" width="31" height="16" rx="4"/><path d="m71 50 3 3 7-8"/>`,
  `<rect x="14" y="6" width="72" height="49" rx="5"/><path d="M14 19h72M22 13h2m5 0h2"/><path class="tint" d="m24 28 12 8-12 8z"/><path d="M43 31h29m-29 9h18"/><circle class="seal" cx="83" cy="48" r="12"/><path d="m77 48 4 4 7-8"/>`,
  `<rect x="16" y="10" width="62" height="44" rx="5"/><path d="M16 23h62M29 6v10m36-10v10m-38 17h6m8 0h6m8 0h6m-34 9h6m8 0h6"/><circle class="seal" cx="77" cy="46" r="14"/><path d="M77 37v9l7 4"/>`,
];

export const GET: APIRoute = ({ props }) => {
  const { locale, compact } = props as {
    locale: keyof typeof copy;
    compact: boolean;
  };
  const t = copy[locale];
  const width = compact ? 360 : 744;
  const height = compact ? 605 : 408;
  const steps = t.steps
    .map(([title, line1, line2], i) => {
      const x = compact ? 16 : 16 + 246 * i;
      const y = compact ? 49 + 109 * i : 52;
      const tx = compact ? 118 : 15;
      const ty = compact ? 28 : 99;
      return `<g transform="translate(${x} ${y})"><rect class="card" width="${compact ? 328 : 220}" height="${compact ? 98 : 162}" rx="9"/>
      <g class="drawing" transform="translate(${compact ? 3 : 64} ${compact ? 19 : 9})">${artwork[i]}</g>
      <circle cx="${compact ? 16 : 20}" cy="17" r="11" fill="#18587b"/><text class="number" x="${compact ? 16 : 20}" y="22">${i + 1}</text>
      <text class="step" x="${tx}" y="${ty}">${title}</text><text class="small" x="${tx}" y="${ty + 24}">${line1}</text><text class="small" x="${tx}" y="${ty + 44}">${line2}</text>
      ${i === 2 ? "" : compact ? '<path class="arrow" d="M55 98v9m-3-3 3 3 3-3"/>' : '<path class="arrow" d="M222 78h20m-5-5 5 5-5 5"/>'}</g>`;
    })
    .join("");
  const pipelineY = compact ? 389 : 235;
  function node(label: readonly string[], second: boolean) {
    const x = compact ? (second ? 187 : 17) : second ? 395 : 20;
    const y = compact ? 85 : 65;
    return `<g transform="translate(${x} ${y})"><rect width="${compact ? 124 : 280}" height="56" rx="7" class="node"/><text x="12" y="23" class="node-title">${label[0]}</text><text x="12" y="44" class="small">${label[1]}</text></g>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" lang="${locale}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title desc">
    <title id="title">${t.title}</title><desc id="desc">${t.steps.map((s) => s.join(" ")).join(" ")} ${t.pipeline}. ${t.mapping}</desc>
    <style>text{font-family:system-ui,'PingFang SC','Microsoft YaHei',sans-serif;fill:#16394a}.section,.step,.node-title{font-weight:650}.section{font-size:20px}.step{font-size:18px}.node-title{font-size:16px}.small{font-size:14px;fill:#385768}.number{font-size:14px;fill:white;text-anchor:middle;font-weight:700}.card,.node,.drawing{fill:white;stroke:#bbd0d8}.drawing,.arrow{stroke:#235976;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.tint,.seal{fill:#ddf1f1}.arrow{fill:none}.node{stroke:#9ac8bf}</style>
    <rect width="100%" height="100%" rx="12" fill="#f3f7f8"/><text x="20" y="33" class="section">${t.job}</text>${steps}
    <g transform="translate(16 ${pipelineY})"><rect width="${width - 32}" height="${height - pipelineY - 14}" rx="9" fill="#e9f6f1" stroke="#a0c9bb"/>
    <text x="17" y="27" class="section">${t.pipeline}</text><text x="17" y="49" class="small">${t.scope}</text>${node(t.first, false)}${node(t.next, true)}
    <path class="arrow" d="${compact ? "M147 113h32m-5-5 5 5-5 5" : "M310 93h75m-5-5 5 5-5 5"}"/>
    <text x="17" y="${compact ? 167 : 142}" class="small">${t.mapping}</text></g></svg>`;
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
};
