Build a Cosmos workflow that automatically diagnoses and fixes CI build failures.

Trigger: a CI run completes with a failure status on any branch (GitHub Actions, Jenkins, BuildKite, or any CI system that can emit a webhook).

Steps:
1. Fetch the full build log for the failing run. Extract: the failure category (compilation error, test assertion failure, lint / formatter violation, missing or incompatible dependency, infrastructure / flaky runner), the specific error messages, the file paths and line numbers mentioned, and the commit SHA that introduced the failure.
2. Classify the failure. Determine whether this is:
   a. A code error introduced by the latest commit (regression).
   b. A pre-existing failure that the latest commit surfaced (latent bug).
   c. A dependency or environment issue (version mismatch, missing package, network timeout).
   d. A known-flaky test or infrastructure hiccup (runner OOM, intermittent network).
3. Decision: "Flaky or infrastructure issue?".
   - If yes, re-trigger the CI run once as a retry and log the occurrence. Do not touch the code.
   - If no, continue.
4. Locate the root cause in the codebase. For compilation and test failures, read the referenced files and the diff introduced by the failing commit. For dependency issues, inspect the lockfile and the package manifest.
5. Implement a targeted fix on the same branch:
   - Compilation error: correct the type, import, or syntax issue.
   - Test failure: if the test expectation is stale (the code changed intentionally), update the expected value. If the code is wrong, fix the code.
   - Lint/format violation: apply the formatter or fix the rule violation.
   - Dependency issue: update the lockfile or pin the correct version.
6. Push the fix commit with a message like "fix(ci): resolve [error type] in [file]" and re-trigger CI.
7. Decision: "CI now passing?".
   - If yes, post a comment on the PR: "CI was failing due to [root cause]. Fixed in [commit link]. All checks passing."
   - If no and retry count < limit, return to step 4 with the new failure log.
   - If no and retry limit reached, post a structured diagnosis on the PR (failure type, root cause hypothesis, attempted fixes, log excerpt) and assign the PR back to the author.

Constraints:
- Never modify test assertions to make them trivially pass (e.g. changing expected values to match wrong output). Only update expectations when the code change was intentional and the new behavior is correct.
- Always push fix commits as separate commits from the original change, never amend, so the author can see exactly what Cosmos changed.
- Keep a log of all auto-fix attempts (PR, failure type, fix applied, outcome) for quality monitoring.