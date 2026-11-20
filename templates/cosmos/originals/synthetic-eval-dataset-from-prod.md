Build a Cosmos workflow that generates a fresh synthetic evaluation dataset from real production prompts each week, then gates the next model release on it. Sample diverse traffic from the last seven days, scrub PII, expand the sample with synthetic variants, label every example against the current baseline, and replay the eval suite on the candidate. Block any release that regresses past the configured floor.

Trigger: weekly cron (Mondays 02:00 UTC) plus an on-demand fire when a new candidate model is published to the model registry.

Steps:
1. Sample production logs from the last seven days via the log warehouse. Pull LLM prompts, user queries and API requests, stratified across intents, user cohorts and surface area so the sample is representative, not just the heaviest features.
2. Decision: "Did sampling return at least 100 diverse prompts?". A run with too few samples cannot produce a reliable eval set.
   - If no, skip dataset generation, post a one-line notice to the ML channel and record the run as a clean no-op in the eval-history log so the next cron pass starts fresh.
   - If yes, continue.
3. Redact PII and secrets. Run a named-entity sweep plus a secret / token scrubber over every sampled prompt. Strip customer names, emails, phone numbers, addresses, account ids, API keys and any proprietary data.
4. Decision: "Is the redaction clean?". Re-scan the redacted set for residual entities and known secret patterns.
   - If residual PII or secrets are detected, halt the run, file a compliance incident with the failing samples (redacted hashes only, never the raw values) and page the privacy on-call. Do not pass the data on to any LLM.
   - If clean, continue.
5. Generate and label synthetic variants. Use an LLM to expand each cleaned prompt with paraphrases, adversarial rewrites and edge-case mutations to grow the set 5–10x. For every variant, label ground truth either by running the current production checkpoint and recording its output as the baseline, or by routing critical / ambiguous examples through a human labelling queue.
6. Store the dataset in the versioned eval repository keyed by run id, with metadata (model version sampled against, sampling date, intent distribution, synthetic vs real flag, baseline label source). The repository is append-only: never overwrite a prior run.
7. Run the eval suite on the candidate model against the freshly stored dataset. Capture per-scenario scores for accuracy, latency (p50 / p95) and cost per call, then compare to the production baseline.
8. Decision: "Did the candidate regress more than 5% on any tracked metric?".
   - If yes, block the deploy, open an incident with candidate vs baseline scores and example outputs side-by-side, and append the run record to the eval-history log so trend dashboards stay honest.
   - If no, post a pass report (summary + dashboard link) to the ML channel and append the run record to the eval-history log.

Constraints:
- Never run the synthetic-variant LLM call on data that has not passed the redaction verification step. PII leaving the redactor is a workflow halt, not a warning.
- Always sample stratified across intents and cohorts; a run dominated by one feature or one customer is not representative and must be rejected before generation.
- Always keep the eval-history log and the dataset repository append-only: never overwrite a prior run record or dataset version, even when re-running the same week.
- Never auto-promote a candidate that regressed past the floor, and never silently lower the floor to make a regressing candidate pass.
- Always store labels with their source (baseline-model vs human-labelled) so downstream metrics can be reweighted when the baseline itself is replaced.