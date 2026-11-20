Build a Cosmos workflow that continuously audits the repo's dependencies for license compliance: rebuild the SBOM, classify each license, reconcile against the org's exception registry, ticket and block on anything unapproved, and append every scan to a tamper-evident audit log.

Trigger: a commit webhook on every lockfile change (package-lock.json, pnpm-lock.yaml, yarn.lock, poetry.lock, requirements.txt, go.sum, Cargo.lock, packages.lock.json, Gemfile.lock, etc.), plus a weekly full-repo cron so drift never goes unnoticed.

Steps:
1. Extract the dependency tree from every lockfile in the repo. Walk transitive closures per stack: never trust the top-level manifest alone.
2. Build an SBOM in SPDX or CycloneDX format, one document per stack, with pinned versions, hashes, and source URLs.
3. Query each dependency's declared license from its package registry (npm, PyPI, Maven Central, crates.io, NuGet, RubyGems, Go proxy, etc.). Cache responses keyed by name + version so the next scan is fast.
4. Classify every license string against a normalized SPDX identifier and bucket it: approved (MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC), requires-review (LGPL, MPL-2.0, EPL), restricted (GPL, AGPL, proprietary, custom EULA), or unknown (no license string, ambiguous, multiple inconsistent declarations).
5. Cross-check restricted and requires-review findings against the org's license-exception registry: pre-approved packages with documented legal sign-off (package name, version range, license, approver, expiry). Drop any entry whose exception is expired or version-mismatched.
6. Decision: "Any restricted or unknown licenses without a valid exception?".
   - If no, record a clean compliance snapshot (scan id, head sha, SBOM hash, package count, license histogram) and continue to the audit log.
   - If yes, continue to ticketing.
7. For each flagged dependency, open a ticket in Linear (or Jira) with: package name + version, declared license + classification, every usage location (file paths and import sites pulled from the dependency graph), and a remediation recommendation: drop-in replacement under an approved license, exception request with the legal justification it would need, or removal. Dedupe against existing open tickets keyed by package + version + license so the same flag does not get re-opened on every commit.
8. Post a summary comment on the triggering PR (top-level, one comment per scan) listing the flagged dependencies, the opened ticket links, and the merge-gate verdict; set the merge gate to blocking until each ticket is resolved or an exception is filed.
9. Append the run: clean or flagged: to the append-only compliance audit log: scan id, head sha, SBOM hash, license histogram, flagged-package list, ticket ids, verdict, timestamp. The log is the source of truth for trend dashboards (restricted-count over time, MTTR per ticket, exception coverage).
10. Publish the compliance verdict for this scan run (block / clean / pending-exception) so downstream workflows and the PR status check can read it.

Constraints:
- Never let a restricted-license package merge without a valid, in-date exception: the merge gate is non-negotiable.
- Always attach the full usage-location context to every ticket (file paths, import sites, transitive parents) so engineering can act without re-running the scan.
- Read-only access to package registries and the exception registry; tickets and the audit log are the only writes.
- The compliance audit log is append-only: never edit or delete past entries; corrections are added as new entries that supersede.
- Dedupe tickets by package + version + license so noisy lockfile churn does not pollute the legal queue.