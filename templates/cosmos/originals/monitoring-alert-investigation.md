Build a Cosmos workflow that automatically investigates a monitoring alert the moment it fires.

Trigger: a webhook from any monitoring or alerting system (Grafana, PagerDuty, Datadog, CloudWatch, custom alert manager) when an alert transitions to firing state.

Steps:
1. Parse the alert payload. Extract: alert name, firing condition, affected service or host, the metric or log pattern that triggered it, the start time, and the severity level.
2. Pull the surrounding context window (configurable, default ±30 minutes around the alert start time):
   a. Application logs for the affected service: filter for errors, warnings, and stack traces.
   b. Infrastructure metrics: CPU, memory, disk, network for the affected host(s).
   c. Distributed traces (if available): look for latency spikes, error rates, or broken spans in the affected service.
3. Pull recent deployments. List all deploys to any related service in the past 24 hours (from CI/CD system, deployment records, or Git tags). Flag any deploy that landed within 30 minutes before the alert fired.
4. Pull recent code changes. If a suspicious deploy was found, fetch the associated diff and scan for changes that could explain the alert (error handling removed, timeout values changed, new dependency introduced, config changed).
5. Synthesise a root-cause hypothesis. Rank candidate causes by likelihood: recent deploy, upstream dependency degradation, traffic spike, resource exhaustion, data anomaly, known-recurring issue.
6. Decision: "Auto-remediable?". Check whether the top hypothesis matches a configured auto-remediation playbook (e.g. "OOM → restart pod", "disk full → clean old logs", "high error rate after deploy → rollback").
   - If yes and severity allows auto-remediation: execute the playbook, monitor the alert for resolution, and post results.
   - If no, continue.
7. Compose a structured investigation report: alert summary, timeline, log excerpts, deploy diff (if relevant), ranked hypotheses with evidence, and recommended next actions with runbook links.
8. Decision: "Alert resolved during investigation?".
   - If yes: post the report as an informational note on the incident. No page needed.
   - If no: post the report and escalate: page the on-call engineer with the fully-prepared context packet so they start with a hypothesis, not a blank slate.

Constraints:
- Never auto-remediate a Critical severity alert: always escalate with the report.
- Always attach the log excerpts and the deploy diff directly to the report: the on-call should not have to re-run queries.
- Throttle alert triggers: if the same alert fires more than N times per hour, deduplicate into a single investigation session.