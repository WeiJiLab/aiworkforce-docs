Build a Cosmos workflow that tracks secret expiry across configured vaults, rotates credentials before they lapse, validates each new value in staging, and ships an audit trail of every rotation.

Trigger: a weekly cron sweep across all configured vaults (HashiCorp Vault, AWS Secrets Manager, 1Password Connect, plus environment-variable references), plus an on-demand fire when any monitored secret is within 7 days of its expiry timestamp.

Steps:
1. Enumerate every secret across the configured vaults and pull each one's expiry metadata (TTL, lease end, certificate notAfter, manual expiry tag). For secrets with no expiry metadata, infer one from the vault's rotation policy; if no policy is set, flag the secret in the audit trail and skip it this run.
2. Decision: "Any secret within 7 days of expiry?".
   - If no, record a clean sweep (timestamp, secrets checked, next expiry date) to the SIEM trail and end.
   - If yes, continue with the at-risk set.
3. Generate a replacement value for each at-risk secret. Prefer the vault's built-in rotation policy (Vault dynamic secret, AWS Secrets Manager rotation Lambda, 1Password rotation hook). Fall back to an OpenSSL-generated cert or crypto-random key for static credentials. Never write the new value to disk outside the vault.
4. Write the new value into the vault, tag the previous version as "deprecated" with the rotation timestamp, and keep the previous version live so dependents can still resolve it during cut-over.
5. Deploy the updated secret reference to a staging environment that mirrors the production dependency graph. Use the existing IaC / config-as-code pipeline; never hand-edit production-adjacent config.
6. Run a smoke-test agent against staging: open a connection through every dependent service that uses the secret, verify auth succeeds, and confirm the previous version is also still accepted so a stale dependent does not break during the rollout window.
7. Decision: "Smoke tests passed?".
   - If no, revert the staging reference to the previous version, page security on-call with the failure log, append the reverted run to the audit trail, and end without touching production.
   - If yes, continue.
8. Pause for a human approval before production rollout. The approver sees the diff, the staging smoke-test report, and the maintenance-window check for any service that shares this secret.
9. After approval, promote the new secret reference to production through the same IaC pipeline, then notify stakeholders (security channel, dependent-service owners) on Slack with the rotation summary, timestamp, and next expiration date.

Constraints:
- Never write a generated secret value anywhere outside the vault: no logs, no ticket bodies, no Slack posts, no PR descriptions.
- Never auto-promote to production. The human approval gate before rollout is mandatory, even for low-risk secrets.
- Always keep the previous version live until staging confirms the new value works end-to-end; rotation is a cut-over, not a hard swap.
- Always coordinate rotation with the maintenance window for any secret that fans out to multiple dependent services; if no window is available, pause for human scheduling.
- Always record the rotation event: clean sweep, successful promotion, or failed-then-reverted run: in an append-only audit trail so SOC 2 evidence and trend analysis (MTTR for rotation, near-expiry rate) can be built later.