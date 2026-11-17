---
title: "Models and costs"
description: "Choose an available model and reasoning level, and distinguish token usage, reported cost, and reference estimates."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

The models available to a session depend on its employee, runtime kernel, and configured channels. Use the product's available-model list instead of assuming that any provider model name will work.

## Select a model for the task

Open a ready employee's session and inspect **Model** in the composer. Choose from the available options. If a saved selection is currently unavailable, the interface marks it as such; ask the administrator to check the employee's runtime and channel configuration.

Use **Thinking level**, where supported, to adjust reasoning effort. The interface offers a default and levels such as low, medium, high, extra high, and maximum. The selected model and runtime determine what is supported. More reasoning can take longer and is not a guarantee of a better result.

Evaluate a change using the same task, inputs, tools, and acceptance criteria. Inspect correctness, latency, and recorded usage together. Do not attribute improvements to the model if you also changed the prompt, permissions, or context.

## Understand three different measurements

| Measurement                 | Meaning                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| Recorded token usage        | Usage fields supplied by session results, with explicit gaps when unavailable.                |
| Reported cost, unreconciled | An amount reported by the runtime; it has not been reconciled with a supplier invoice.        |
| Official reference estimate | A calculation using applicable entries in the platform's pricing catalog and the known usage. |

Reference estimates do not charge an account or replace the runtime's original cost record. A total can be incomplete when a model, time period, meter, region, channel, or service tier has no applicable verified price.

## Pricing boundaries

The catalog uses exact model identifiers and configured aliases, effective price versions, and separate usage meters. Input, output, cache reads, and cache writes can have different rates. Context-length bands apply to individual requests rather than the task's cumulative input total.

Unknown or expired prices must not be interpreted as free usage. A partial estimate describes only the priced portion. Provider invoices, taxes, tool fees, and contract adjustments require their own verified information; the platform does not automatically reconcile supplier invoices.

This documentation intentionally provides no fixed price table. Administrators should verify the provider's current terms and the configured catalog conditions before using estimates for planning.

See [configuration](/administration/configuration/), [usage analytics](/administration/analytics/), and [artifacts and evidence](/user-guide/artifacts-evidence/).
