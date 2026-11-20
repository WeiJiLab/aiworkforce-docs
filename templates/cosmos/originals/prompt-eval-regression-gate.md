Build a Cosmos workflow that gates every release candidate of an LLM-powered feature on a prompt-evaluation regression suite. Replay the same eval set against the candidate, compare every scenario to the last shipped baseline, block the release if anything critical regressed, and only promote the baseline once the candidate is clean.

Trigger: every new model checkpoint published to the model registry, plus every push to a release-candidate branch in the repo (for example branches matching `release/*` or `rc-*`).

Steps:
1. Fetch the baseline scores and example outputs from the last shipped version (the current production checkpoint or release tag) so every comparison is apples-to-apples.
2. Run the eval suite against the candidate. Replay the full scenario set: golden prompts, adversarial probes, safety jailbreak attempts, latency / cost benchmarks: and capture per-scenario scores for accuracy, safety, latency (p50 / p95) and cost per call.
3. Compare candidate to baseline. Compute deltas per scenario and per metric, plus aggregate movement on each metric. Flag any scenario that crossed its configured floor (accuracy drop, safety score drop, latency or cost ceiling breached).
4. Decision: "Any critical scenario regressed?". A critical regression is a scenario tagged critical that crosses its floor, or aggregate movement past the release-gate threshold.
   - If yes, open an incident in Linear / Jira with the failing scenarios, candidate vs baseline scores, the actual model outputs side-by-side, and a one-paragraph summary. Block the release gate and notify the ML team channel so the fix loop can start. The workflow exits to the eval-history log; the next checkpoint or RC push re-enters the gate.
   - If no, continue.
5. Flag near-miss edge cases: any scenario inside the warning band, close to the floor but not over it: and queue them for the ML team to triage asynchronously so the next baseline isn't blind to drift.
6. Promote the candidate scores and example outputs as the new baseline so the next candidate is compared against this version, not the old one.

The clean path ends by marking the release gate green so the deploy pipeline can ship the candidate. Every run: block or allow: appends the run id, candidate identifier, baseline identifier, every per-scenario score and delta, the decision, the near-miss queue and the incident link when one was opened to the append-only eval-history log so trend dashboards (regression rate, recurring failure scenarios, accuracy / safety drift, MTTR on blocked releases) can be built on top.

Constraints:
- Never ship a candidate with a known critical regression. The gate is mandatory; no manual override that bypasses the recorded comparison.
- Always attach example outputs and per-scenario score deltas to the incident; the ML team must be able to reproduce the regression without rerunning the suite.
- Always keep the eval-history log append-only: never overwrite a prior run record, even when the same candidate is re-evaluated later.
- Always update the baseline only after a clean gate, never before, so a regression cannot poison the comparison floor for the next candidate.