Build a Cosmos workflow that triages on-call incidents by correlating telemetry and proposing ranked root-cause hypotheses.

Trigger: a PagerDuty incident is created at severity P2 or higher, or an equivalent high-urgency alert from Datadog or Prometheus fires.

Steps:
1. Extract incident metadata from the page: affected services, start and ack timestamps, severity, and any customer-impact signal already attached (status-page entries, support tickets, error budget burn).
2. Query time-correlated observability signals in a ±15 minute window around the incident: error-rate spikes per service, latency percentile jumps (p50, p95, p99), recent deploys (GitHub, Kubernetes, ArgoCD), infrastructure changes (Terraform plans, CloudFormation events, feature-flag flips), and upstream dependency failures from API health checks.
3. Decision: "Any correlated signals?".
   - If no, flag the incident as novel, post a short "no correlated signals found" note to on-call, and end.
   - If yes, continue.
4. Fetch distributed traces from Datadog or Jaeger for failed requests in the window. Walk the call chain to highlight slow or erroring spans and the services they cross. If trace data is missing, record a metrics-only flag and continue.
5. Run a safety guard around the LLM call: enforce a per-incident token budget, retry rate-limit errors with exponential backoff, and fall back to the smaller model on repeated 429s.
6. Use an LLM agent to analyse the correlated signals and rank root-cause hypotheses with confidence scores (e.g. "85% likely: DB connection pool exhaustion post-deploy", "60% likely: Upstream payment API timeout cascade"). Cite the exact metric, trace, deploy or change behind each hypothesis.
7. Decision: "Usable hypothesis?". A usable hypothesis has a confidence at or above the configured threshold and at least one cited piece of evidence.
   - If no, escalate to the SRE on-call rotation with the raw correlation bundle so a human can take it from here, and end.
   - If yes, continue.
8. Append the full correlation report (signals, traces, hypotheses, evidence links) to the PagerDuty incident timeline as an append-only note so the responder and the post-mortem both have it.

Constraints:
- Always cite evidence: every hypothesis must link to a dashboard, trace ID, log query or change record. Never post bare claims.
- Never auto-resolve, ack, or roll back the incident. The workflow only proposes; the on-call decides.
- Always strip secrets, tokens and customer PII from anything posted to Slack or attached to PagerDuty.
- Always keep the correlation report append-only on the PagerDuty timeline so MTTA / MTTR trends can be built later.
- Cap LLM spend per incident; on repeated rate-limit failures escalate to SRE rather than retry forever.