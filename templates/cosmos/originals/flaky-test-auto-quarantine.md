Build a Cosmos workflow that auto-quarantines flaky tests as soon as they appear in CI, opens deduped tickets with a root-cause hypothesis attached, and reserves consistent failures for a real regression incident.

Trigger: every CI test run completion event from GitHub Actions, CircleCI, or Jenkins (webhook on workflow / job finished, regardless of pass or fail).

Steps:
1. Parse the test report from the CI provider and extract every failed test with its suite, file, line, retry count, failing assertion, and log excerpt.
2. Decision: "Any failures?". If the run was clean, append a clean-run snapshot to the flake log and end. Otherwise continue.
3. For each failed test, query the flake history over the last N runs from the test-results store: pass / fail counts, runs since last green, runs against the same commit SHA, and whether passes and fails interleave without code changes.
4. In parallel, an agent reads the failure logs, retry behavior, timing and stack trace to propose a root-cause hypothesis: race condition, ordering / timing dependency, environment or resource contention, external dependency flake, or a genuine product bug. The hypothesis is attached to whichever ticket the run produces.
5. Decision: "Consistent failure?". A test that has failed every recent run on the same code is not a flake: it is a regression. If yes, skip quarantine and open a regression incident with the failing assertion, log excerpt, blame range, and the root-cause hypothesis, then route to on-call or to the commit author. End that branch.
6. Decision: "Known flaky?". A test that already has an open flake ticket is known. If yes, append the new evidence (run id, fail count, latest log excerpt, refreshed hypothesis) to the existing ticket, bump the flake-count metric in the observability store, and end that branch.
7. New flake: apply the quarantine: add a `@quarantine` annotation (or the framework equivalent) to the test in a feature branch, open the quarantine PR against the default branch, and post a comment on the offending CI run's PR explaining what was quarantined and why.
8. Open the flake ticket in Linear / Jira with the pass / fail history, last-green commit, log excerpts, retry behavior, the root-cause hypothesis, and a link to the quarantine PR. Assign to the test's CODEOWNERS or the last author of the test file.

Constraints:
- Never quarantine a test that fails consistently on the same code: that is a real regression and must page or assign instead.
- Always attach the root-cause hypothesis to the ticket so the owning team starts from a thesis instead of a blank page.
- Always dedupe against the open flake ticket before opening a new one: a noisy backlog is as bad as a missed flake.
- Keep the flake log append-only so trend dashboards (flakes by suite, time-to-fix, recurring root causes) keep working over time.