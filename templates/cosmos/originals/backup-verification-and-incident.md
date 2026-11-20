Build a Cosmos workflow that verifies every backup and opens a fully-documented incident when something is wrong.

Trigger: at the end of each scheduled backup window (daily, hourly, or whatever cadence is configured), and also on every backup-completion event from the backup tool.

Steps:
1. Enumerate every backup that was expected to run during the window: pull the list from the schedule and the asset inventory (databases, services, volumes, object stores).
2. Verify each artefact: it exists, its size is in the expected range, its checksum matches, and the backup tool reported success.
3. Run a sampled restore test: pick a configurable subset of artifacts and restore them to a scratch environment to confirm they are not silently corrupted.
4. Decision: "All backups healthy?".
   - If yes, record the run as healthy on the backup status board and end.
   - If no, continue.
5. Diagnose every failure individually. Classify the root cause into a known bucket: not enough disk space, network timeout, target server down, permission denied, expired credentials, corrupted artefact, missing dependency, quota exceeded, or unknown.
6. Correlate the failure window with the application logs. For each failed backup, pull the logs from the source service and any adjacent services for the same time range; surface anything that looks related (errors, restarts, deploys, traffic spikes, lock waits).
7. Compose an incident report that includes: which backups failed, the diagnosed cause for each, the relevant log excerpts, a timeline, and what was attempted automatically.
8. Decision: "Auto-recoverable?". Only known-transient causes (network timeout, momentary lock wait, brief quota exhaustion) qualify.
   - If yes, retry the backup, re-verify, and update the run record.
   - If no, continue.
9. Open an incident in the on-call system (PagerDuty, Linear, Jira: whichever is configured) with the report attached. Include the affected assets, the diagnosed cause, the correlated log excerpts, and the runbook link if one exists.
10. Page the on-call engineer with a one-paragraph summary plus the link to the full incident.

Constraints:
- Never silently swallow a failure: every backup that failed must end up either retried-and-healthy or as an incident.
- Always attach the correlated log excerpts to the incident; the on-call should not have to dig for them.
- Keep the run record append-only so we can build trend dashboards (failure rate, MTTR, recurring causes) later.