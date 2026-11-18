import type { APIRoute } from "astro";

const copy = {
  en: {
    title: "AI Workforce bootstrap template",
    lanes: [
      "Requirements",
      "Development",
      "Test deployment",
      "Testing",
      "Merge to main",
      "Production",
    ],
    workspace: "Create a board in your workspace",
    steps: [
      [
        "Choose a template",
        "Open the new board wizard.",
        "Preview lanes and pipelines.",
      ],
      [
        "Assign employees",
        "Select a ready employee",
        "for each required lane.",
      ],
      [
        "Review and create",
        "Check tools and sources.",
        "Wait for initialization.",
      ],
      ["Follow a card", "Confirm a requirement.", "Inspect a lane run."],
    ],
  },
  "zh-cn": {
    title: "AI Workforce 自举看板模板",
    lanes: ["需求", "开发", "测试发布", "测试验证", "合入主干", "生产发布"],
    workspace: "在工作空间用模板创建看板",
    steps: [
      ["选择看板模板", "进入创建看板向导，", "预览泳道和编排。"],
      ["指派泳道员工", "给每条必配泳道选择", "一个可用的员工实例。"],
      ["确认并初始化", "核对共享能力和来源，", "确认创建看板。"],
      ["跟进第一张卡片", "确认一条需求，查看卡片", "对应的泳道运行记录。"],
    ],
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
  `<rect x="11" y="8" width="76" height="48" rx="5"/><path d="M11 20h76m-66-6h3m4 0h3"/><rect class="tint" x="18" y="26" width="20" height="21" rx="2"/><path d="M44 29h29m-29 8h20"/><rect class="seal" x="65" y="41" width="28" height="17" rx="5"/><path d="m71 48 5 4 9-8"/>`,
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
  const width = compact ? 360 : 840;
  const height = compact ? 605 : 310;
  const steps = t.steps
    .map(([title, line1, line2], i) => {
      const x = compact ? 16 : 14 + 206 * i;
      const y = compact ? 172 + 107 * i : 132;
      const tx = compact ? 118 : 10;
      const ty = compact ? 28 : 99;
      return `<g transform="translate(${x} ${y})"><rect class="card" width="${compact ? 328 : 191}" height="${compact ? 98 : 162}" rx="9"/>
      <g class="drawing" transform="translate(${compact ? 3 : 48} ${compact ? 19 : 9})">${artwork[i]}</g>
      <circle cx="${compact ? 16 : 20}" cy="17" r="11" fill="#18587b"/><text class="number" x="${compact ? 16 : 20}" y="22">${i + 1}</text>
      <text class="step" x="${tx}" y="${ty}">${title}</text><text class="small" x="${tx}" y="${ty + 24}">${line1}</text><text class="small" x="${tx}" y="${ty + 44}">${line2}</text>
      ${i === t.steps.length - 1 ? "" : compact ? '<path class="arrow" d="M55 98v9m-3-3 3 3 3-3"/>' : '<path class="arrow" d="M192 78h12m-4-4 4 4-4 4"/>'}</g>`;
    })
    .join("");
  const lanes = t.lanes
    .map((lane, index) => {
      const columns = compact ? 3 : 6;
      const x = 15 + (index % columns) * (compact ? 111 : 136);
      const y = 48 + Math.floor(index / columns) * 35;
      return `<g transform="translate(${x} ${y})"><rect class="node" width="${compact ? 105 : 130}" height="28" rx="5"/><text x="${compact ? 52 : 65}" y="19" class="lane">${lane}</text></g>`;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" lang="${locale}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title desc">
    <title id="title">${t.title}</title><desc id="desc">${t.steps.map((s) => s.join(" ")).join(" ")} ${t.lanes.join(", ")}</desc>
    <style>text{font-family:system-ui,'PingFang SC','Microsoft YaHei',sans-serif;fill:#16394a}.section,.step,.node-title{font-weight:650}.section{font-size:20px}.step{font-size:17px}.node-title{font-size:16px}.small{font-size:13.5px;fill:#385768}.number{font-size:14px;fill:white;text-anchor:middle;font-weight:700}.card,.node,.drawing{fill:white;stroke:#bbd0d8}.drawing,.arrow{stroke:#235976;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.tint,.seal{fill:#ddf1f1}.arrow{fill:none}.node{fill:#e7f5ef;stroke:#9ac8bf}.lane{font-size:13px;text-anchor:middle}</style>
    <rect width="100%" height="100%" rx="12" fill="#f3f7f8"/>
    <text x="16" y="33" class="section">${t.title}</text>
    ${lanes}<text x="16" y="${compact ? 151 : 113}" class="section">${t.workspace}</text>${steps}</svg>`;
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
};
