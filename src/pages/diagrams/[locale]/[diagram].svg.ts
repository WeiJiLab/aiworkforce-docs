import type { APIRoute, GetStaticPaths } from "astro";
import {
  processDiagramIds,
  renderProcessSvg,
  type ProcessDiagramId,
} from "../../../lib/process-diagrams";

export const getStaticPaths: GetStaticPaths = () =>
  ["en", "zh-cn"].flatMap((locale) =>
    processDiagramIds.map((diagram) => ({ params: { locale, diagram } })),
  );

export const GET: APIRoute = ({ params }) =>
  new Response(
    renderProcessSvg(
      params.diagram as ProcessDiagramId,
      params.locale === "zh-cn",
      false,
      true,
    ),
    {
      headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
    },
  );
