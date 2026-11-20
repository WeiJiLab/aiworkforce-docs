Build a Cosmos workflow that watches network health and surfaces intrusion or instability.

Trigger: continuous: every metric tick from our network telemetry pipeline, plus any high-priority security event from the IDS / firewall.

Steps:
1. Collect signals across the fleet: server-to-server latency and jitter, packet loss, traffic volume per link, authentication events, port-scan activity, geo of inbound connections, lateral movement between subnets.
2. Run an anomaly pass. Flag anything that drifts from the rolling baseline: latency or jitter spikes between servers, traffic patterns that look like reconnaissance, brute-force auth, sudden cross-zone movement, or unexpected outbound destinations.
3. Decision: "Anything unusual?".
   - If no, record a healthy baseline snapshot and end.
   - If yes, continue.
4. Classify the anomaly into a bucket: latency degradation, intrusion suspicion (which kind), capacity / traffic anomaly, or unknown.
5. Pull related context: application and system logs from the affected hosts for the same window, recent firewall rule changes, recent deploys, ongoing maintenance windows, and the relevant runbook if one exists.
6. Run a safety filter that suppresses known-benign events: planned maintenance windows, scheduled chaos / failover drills, and approved penetration tests.
7. Decision: "Explained by a known event?".
   - If yes, mark the anomaly as expected, log it on the timeline and end.
   - If no, continue.
8. Assess the severity. Combine impact (how many services / users affected) and confidence (how sure we are this is real and malicious or destabilising). Output a level: low, medium, high, critical.
9. Open an incident in the on-call system (PagerDuty, Linear, Jira) with the anomaly summary, the correlated logs, the diagnosed bucket, and the severity.
10. Decision: "High severity?". Treat high and critical as page-worthy.
   - If yes, page the right responder: the security on-call for intrusion-class anomalies, the network on-call for latency / capacity anomalies.
   - If no, notify the relevant team channel (Slack / Teams) with a link to the incident and don't page anyone.

Constraints:
- Always attach the correlated log excerpts and the firewall / deploy diff to the incident; the responder should not have to dig.
- Never page on a known-benign event (maintenance, drill, approved pentest).
- Keep the healthy-baseline log append-only so we can build trend dashboards (anomaly rate, false-positive rate, MTTA / MTTR) later.