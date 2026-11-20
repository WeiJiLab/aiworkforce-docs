Build a Cosmos workflow that runs a full end-to-end Playwright suite on every pull request.

Trigger: a pull request is opened, updated, or marked ready-for-review.

Steps:
1. Deploy the PR branch to a dedicated preview environment (Vercel, Railway, a ephemeral Kubernetes namespace, or whatever the project uses). Poll until the environment is live and healthy (readiness probe passes).
2. Run the full Playwright end-to-end test suite against the preview URL. Capture: pass/fail per test, execution time, screenshots on failure, Playwright traces for all failed tests, and any console errors.
3. Analyse failures. For each failing test:
   a. Check the flakiness index: how often has this test failed in the last N runs on unrelated PRs? If the failure rate is above the flakiness threshold, classify as "flaky".
   b. Otherwise, classify as a genuine regression and extract the root cause: which assertion failed, what the actual vs expected values were, and which line of the PR diff is most likely responsible.
4. Decision: "Any genuine regressions?".
   - If no, post a green report on the PR ("All E2E checks passed") and optionally attach the trace archive.
   - If yes, continue.
5. Post a structured failure report on the PR. For each genuine regression: test name, failure message, screenshot, trace link, and the PR diff line most likely responsible. Apply a "e2e-failing" label to block merge.
6. Separately, report any flaky failures in a collapsible section so they are visible but do not block the PR.
7. Notify the PR author in Slack with a one-line summary and a link to the detailed report.

Constraints:
- Never classify a test as flaky without checking its history: a test that has only ever passed on main but fails on this PR is a regression, not a flaky test.
- Always attach a screenshot and a trace for every genuine failure so the author can reproduce without re-running.
- Clean up preview environments automatically after the PR is closed or merged.