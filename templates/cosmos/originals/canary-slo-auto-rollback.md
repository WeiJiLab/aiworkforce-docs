Build a Cosmos workflow that gates a Kubernetes canary deployment on live SLO metrics, advances traffic when the canary is healthy, and rolls back automatically when it isn't.

Trigger: a new canary deployment event from the Kubernetes control plane (Argo Rollouts / Flagger / native Deployment with a canary track), keyed on the workload name and the canary revision.

Steps:
1. Pull the baseline SLOs for the workload from Datadog and Prometheus through Grafana: p50, p95, p99 latency, error rate, and saturation over the last 7 days of stable traffic on the same service. Cache the baseline keyed by workload + route + method.
2. Decision: "Baseline available?". Sufficient stable history (≥ 24h of clean traffic, ≥ N requests / route).
   - If no, fail safe to a manual approval gate before any traffic shift.
   - If yes, continue to sampling.
3. Manual approval gate: page the release operator on Slack, surface the workload, the missing-baseline reason, and the proposed ramp ladder. Operator must explicitly approve before the canary receives traffic.
4. Sample canary metrics over a 5-minute window: p50/p95/p99 latency, error rate (5xx + application errors), saturation (CPU, memory, in-flight requests). In the same step, probe canary pods for reachability from the SLO scraper.
5. Decision: "Network healthy?". All scrape probes returned within timeout, no partition between SLO collectors and the canary.
   - If no, pause the rollout (hold the current traffic split, do not roll back), alert release-ops on Slack, and stop: a partitioned reading is not a real SLO breach.
   - If yes, continue.
6. Decision: "Significant traffic?". Canary received ≥ the per-route minimum sample size for a meaningful comparison (configurable; default ~1k requests / route or the same threshold the baseline used).
   - If no, extend the observation window: wait one more 5-minute cycle and resample.
   - If yes, continue.
7. Compare canary vs baseline. Score each metric against the baseline window: error_rate_canary / error_rate_baseline, p99_canary / p99_baseline, saturation deltas. Record the verdict for this window in the canary audit log.
8. Decision: "Breached for 2 consecutive windows?". Breach = error rate > 2× baseline OR p99 latency > 1.5× baseline, sustained across the previous and current 5-minute window.
   - If yes, halt the traffic ramp, execute the automated rollback (kubectl rollout undo / Argo Rollouts abort), open a PagerDuty incident with the breach evidence and audit trail, and stop.
   - If no, continue to the ramp evaluation.
9. Decision: "At 100% traffic?". The canary is currently receiving full production traffic and has just cleared the final healthy window.
   - If yes, promote the canary to stable, post a Slack notification with the rollout summary, append the success entry to the audit log, and stop.
   - If no, continue to advance.
10. Advance the ramp one step on the 10% → 25% → 50% → 100% ladder over a 30–60 minute total budget, then loop back to sampling for the next window.

Constraints:
- Never roll back on a single bad window: require two consecutive breaches to filter transient noise.
- Never roll back on a network-partition reading: pause and alert instead, the data is unreliable.
- Always gate on a baseline; missing baseline means human approval, never auto-advance.
- Always write every window verdict, the final outcome, and the rollback / promotion action to an append-only audit log keyed by workload + revision so trends and post-mortems can be built later.
- Never expose raw scrape credentials or PagerDuty routing keys in Slack messages or the audit log.