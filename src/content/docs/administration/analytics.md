---
title: "Usage and operational analytics"
description: "Read resource, API, database, and token metrics with the correct time range and evidence coverage."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

The administrator **Monitoring** page provides operational observations about the deployment. Use it to investigate capacity and execution usage; it is not a substitute for reviewing whether an employee completed a useful task.

## Choose a monitoring view

| View                 | Available observations                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| Hosts and containers | Resource levels and histories, container selection, and process information where available.          |
| Project runtime      | Request volume, HTTP concurrency, latency, error rates, endpoint breakdowns, and database statistics. |
| Token usage          | Recorded session-result usage, trends, and breakdowns by template, workspace, employee, or session.   |

Resource and runtime views offer selectable time windows and optional refresh every 15 seconds. Token data is refreshed manually. Check the collection status and sample time before interpreting a chart. An unavailable collector is missing evidence, not evidence of zero load.

## Investigate an API problem

Select the incident's time range, then inspect request volume, average and P95 latency, and error rates. Narrow the endpoint table by route or search, and compare the affected endpoint with the overall service.

Database panels include current connections and lock waits, plus cumulative statistics such as transactions and deadlocks. Cumulative database figures run from the last statistics reset; do not compare them directly with a short HTTP time window.

## Read token usage correctly

Choose a start, an exclusive end, timezone, grouping granularity, and optional template/workspace/employee filters. Usage is counted by the time the result message was produced.

Inspect **With usage / result messages** before comparing totals. The dashboard reads existing usage fields and does not estimate missing records. Cache reads and cache creation are separate categories; intermediate events are not counted again. Retained evidence for deleted sessions can be included, while cleaned-up evidence cannot.

The display uses millions of tokens with two decimal places. Small known values can round to `0.00 M`; a missing value is shown as `—`. When the distribution is truncated to the top 100 groups, the total and trend still include all matching results.

## Turn an observation into action

Record the filters, collection time, affected session or endpoint, and evidence coverage. Compare similar tasks under the same scope before drawing a conclusion. Token totals alone do not measure task quality or establish a supplier invoice.

Continue with [models and costs](/models/overview/) and [troubleshooting](/resources/troubleshooting/).
