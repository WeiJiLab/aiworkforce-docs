Build a Cosmos workflow that turns coverage gaps into draft PRs with scaffolded unit-test stubs, so test debt gets a concrete starting point instead of another backlog ticket.

Trigger: every merged PR to the default branch (GitHub / GitLab / Bitbucket webhook), plus a nightly cron that scans the full repo.

Steps:
1. Pull the coverage report for the merged change from the supported tool: nyc for JS / TS, pytest-cov for Python, JaCoCo for JVM, SimpleCov for Ruby: and diff it against the stored baseline. Capture the raw report so it can ride along on the eventual PR.
2. Decision: "Tool supported?". If no coverage tool or test framework can be detected, open a setup incident routed to the QA maintainers with a one-shot config suggestion (which tool, where the config goes, the minimum CI invocation) and end. Otherwise continue.
3. Decision: "Uncovered delta ≥ threshold?". If newly uncovered lines fall below the configured threshold (default 5% of changed lines), append a clean-run snapshot to the coverage baseline and end: do not open a noisy PR for trivial deltas. Otherwise continue.
4. Rank uncovered lines, branches, and functions by criticality: business-logic paths and error-handling branches first, high-traffic code second, scaffolding and boilerplate last. Carry the source location, signature, and adjacent context for the top N gaps so the scaffold step has enough to work with.
5. Scaffold unit-test stubs for the top N gaps. An agent reads each gap's source and writes a test file with imports, fixtures, edge-case placeholders (null / empty / boundary / error), and a TODO marker per assertion so the human extending it sees exactly what to fill in.
6. Decision: "Stubs compile?". Run an import / type check and a dry-run test discovery against the scaffolded stubs. If everything compiles, open the PR directly. If anything fails, route through the annotation step before opening the PR: never block on a compile failure, since the stubs are still a useful starting point.
7. Annotate compile or import failures inline on the offending stubs as PR review comments so the author can fix them in place. The PR still opens; the failures are flagged, not hidden.
8. Open a draft PR against the default branch with the test-stub commit, the coverage report diff, and a list of the uncovered paths in the description. Never auto-merge: the PR is a draft on purpose.
9. Assign the PR to the original PR author (or the last commit author on the nightly scan), apply the `test-debt` label, and post a one-line link to the on-call QA Slack channel. When the human extends the stubs and the PR merges, refresh the coverage baseline so the next run measures from there.

Constraints:
- Never auto-merge a coverage PR: a human must review the stubs and fill in the assertions before merge.
- Always dedupe against any open `test-debt` PR for the same files before opening a new one: a noisy backlog defeats the workflow.
- Always carry the source-of-truth coverage tool's raw report in the PR description so the reviewer can verify the numbers without re-running CI.
- If the repo has no coverage config, ship a concrete setup suggestion in the incident body: do not silently fail.
- Keep the coverage baseline append-only so trend dashboards (gap-by-module, time-to-close, churn vs coverage) keep working over time.