Build a Cosmos workflow that keeps documentation in sync with the codebase by updating docs on every merge.

Trigger: a pull request is merged to the main branch of any configured repository.

Steps:
1. Read the merged diff in full. Extract: new or changed functions, classes, and types in the public API; changed configuration options or environment variables; changed CLI commands or flags; modified or removed behavior described anywhere in the existing docs.
2. Map diff changes to documentation. For each changed symbol or behavior:
   a. Search the docs repository for pages that reference it (by function name, config key, CLI flag, etc.).
   b. If a page exists and its content is now inaccurate: mark it as "needs update".
   c. If no page exists for a new public symbol: mark it as "needs creation".
   d. If a symbol was removed or deprecated: mark the referencing page as "needs deprecation notice".
3. Decision: "Any documentation changes needed?".
   - If no changes needed, log the PR as "docs-clean" and end.
   - If yes, continue.
4. For each "needs update" page: rewrite the stale section with accurate content derived from the diff, the new code, and any inline docstrings.
5. For each "needs creation" page: draft a new documentation page following the project's doc style guide (pulled from the docs repository's CONTRIBUTING or style guide file).
6. For each "needs deprecation notice": add a deprecation warning with the version it was deprecated in and (if known) the replacement.
7. Update the CHANGELOG with a concise entry for each user-facing change introduced by the PR, grouped by type (Added, Changed, Fixed, Deprecated, Removed).
8. Open a pull request against the docs repository with all the above changes. The PR description links back to the originating code PR, and lists each documentation change with a brief rationale.
9. Notify the original PR author and the docs owner in Slack.

Constraints:
- Never publish docs that reference internal-only identifiers, credentials, or unreleased feature names.
- Scope updates to what changed in the PR: do not perform broad rewrites beyond the affected pages.
- If a page is owned by a specific team (indicated by a CODEOWNERS entry), add them as reviewers on the docs PR rather than auto-merging.