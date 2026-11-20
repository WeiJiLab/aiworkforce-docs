Build a Cosmos workflow that continuously measures codebase health and alerts when quality regresses.

Trigger: a scheduled run (e.g. nightly), plus on every merge to the main branch of any connected repository.

Steps:
1. Enumerate connected repositories. Pull the list from the Cosmos environment configuration.
2. For each repository, run the health scan. Evaluate the following criteria (each scored 0–100):
   a. **AGENTS.md coverage**: does an AGENTS.md (or equivalent) exist? Does it cover the required sections (codebase overview, coding conventions, test instructions, agent-specific notes)? Score by completeness.
   b. **Test coverage**: pull the latest coverage report from CI. Score against the configured target (default: 80%).
   c. **Pre-commit hooks**: are pre-commit hooks configured? Do they include linting, formatting, and secrets-detection?
   d. **CI pipeline health**: what is the pass rate of the main branch CI pipeline over the past 30 runs? Flag if below 90%.
   e. **Dependency freshness**: how many direct dependencies have a newer major or minor version available? Score by ratio of up-to-date packages.
   f. **Documentation coverage**: for public APIs and exported functions, what percentage have docstrings or inline documentation?
3. Compute a composite health score for each repository (weighted average of the above). Compare to the score from the last run.
4. Decision: "Score regressed?".
   - If the composite score dropped by more than the configured threshold (default: 5 points), post a Slack alert to the repository's owner team with the delta and the specific criteria that regressed.
   - In all cases, update the health score log and continue.
5. Generate a scorecard report. For each repository: the composite score, per-criterion scores, a delta vs last run, and the top 3 recommended actions to improve the lowest-scoring criteria.
6. Post the scorecard to a configured Slack channel or dashboard. For repositories below the minimum threshold, apply a "health-warning" tag in the repository.

Constraints:
- Never fail a CI run based on the health score: it is advisory, not a hard gate (unless explicitly configured otherwise).
- Keep the score history append-only so we can build trend charts over time.
- Always include the recommended actions: a score without guidance is noise.