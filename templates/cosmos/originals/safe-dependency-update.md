Build a Cosmos workflow that updates project dependencies safely: vet every bump for security concerns, ship only the safe ones, loop on regressions, and drive the resulting PR through AI review and human validation before merging.

Trigger: a weekly cron sweep of the repository's lockfile, plus an on-demand entry point so a maintainer can run the workflow manually.

Steps:
1. Capture a baseline. Run the project's regression / E2E suite (whichever the repo uses: `npm test`, the dedicated E2E script, or an AI-driven end-to-end pass against the running app) on the current main branch and store the result as the pre-update snapshot. This is the "before" Cosmos compares everything against.
2. Enumerate outdated packages. Use the project's package manager to list every dependency with an available upgrade (`npm outdated`, `pnpm outdated`, `yarn outdated`, `pip list --outdated`, etc.) and pull the current vs target versions from the lockfile.
3. Research each package on the open web. For every outdated dependency, search for: published CVEs and security advisories (GitHub Security tab, npm advisory db, OSV, NVD), the maintainer's recent activity (deprecation notices, ownership changes, suspicious recent releases), and credible blog posts or issues raising concerns about the new version. Capture a one-line verdict per package with the source link.
4. Decision: "Safe to update?". A package is safe when there is no active CVE on the target version, no maintainer red flag, and no credible third-party warning. Anything else is flagged.
   - If a package is flagged, defer it: park it in a "needs human review" list with the reason and the source link, and exclude it from this run.
   - If a package is safe, include it in the batch.
5. Create an update branch off main and apply the safe bumps via the project's package manager (never hand-edit the manifest). Re-generate the lockfile.
6. Re-run the same E2E / regression suite on the update branch.
7. Decision: "Regression vs baseline?". Compare the new run against the pre-update snapshot.
   - If yes, an AI agent step diagnoses the regression, applies a minimal fix on the branch, and the workflow loops back to step 6 to re-run the suite. Repeat until the suite matches the baseline or a max-attempts guard trips.
   - If no, continue.
8. Open a pull request. Title summarises the bumps; description lists every package updated, the version delta, the security verdict and source link from step 3, and a note about any deferred packages.
9. Run an AI PR review pass over the diff. Flag risky changes, missed callsites, lockfile anomalies, and anything that conflicts with the repo's conventions.
10. Decision: "Review concerns?".
    - If yes, an AI agent step applies the review fixes on the branch. If the fix changes runtime behavior, loop back to step 6 (rerun E2E); if it is purely stylistic / metadata, fall through to step 11.
    - If no, continue.
11. Send the PR to a human reviewer for validation. Pause and wait for their decision.
12. Decision: "Human accepted?".
    - If yes, merge the PR (squash, default branch protection respected) and close the update branch.
    - If no, wait for the reviewer's indication, apply the requested changes, and loop back through step 9 (AI re-review) so the same gates run on the updated diff.

Constraints:
- Never apply a bump for a package that has an active CVE on the target version or a credible security red flag: defer it for human review instead.
- Never edit `package.json` / `requirements.txt` / `Cargo.toml` by hand; always go through the package manager so the lockfile and resolver stay consistent.
- Always re-run the full regression suite after any fix that changes runtime behavior: both regression-fix loops and review-fix loops.
- Never auto-merge; the final merge requires explicit human approval.
- Keep the deferred-package list and per-run security verdicts append-only so the team can build trend dashboards (packages held back, recurring CVEs, time-to-update) over time.