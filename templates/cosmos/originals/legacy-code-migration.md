Build a Cosmos workflow that migrates a legacy codebase to a modern stack one module at a time.

Trigger: a scheduled run (e.g. nightly), or manually triggered by an engineer specifying a module name or path.

Steps:
1. Select the next module to migrate. Use a migration queue stored in VFS: a prioritized list of modules ordered by dependency depth (leaf modules first) and business criticality. Mark the selected module as "in progress".
2. Analyse the legacy module. Parse the source code to extract: exported functions and types, internal state, side effects, external dependencies (DB calls, file I/O, inter-module calls), and existing inline documentation.
3. Map the module to the target stack. Produce a translation plan that shows each legacy construct and its modern equivalent. Surface any patterns that have no direct equivalent and flag them for human review before proceeding.
4. Decision: "Translation plan has unresolved blockers?".
   - If yes, post a comment on the migration ticket with the blockers, notify the assigned engineer, and pause this module.
   - If no, continue.
5. Translate the module. Generate the modern-stack implementation following the project's conventions (pulled from AGENTS.md or equivalent). Ensure that function signatures, error handling, and data types match the agreed translation plan.
6. Write tests. For each exported function, generate unit tests that cover: the happy path, edge cases surfaced in the legacy code, and any error paths. Aim for ≥ 80% line coverage on the new module.
7. Run the tests. If any fail, the agent analyzes the failure, patches the implementation or the test, and re-runs: up to a configurable retry limit.
8. Decision: "All tests passing?".
   - If no after retries, post the failure summary, flag the module as "needs human", and end.
   - If yes, continue.
9. Open a pull request with: the translated module, the test suite, a migration notes section explaining each non-trivial translation decision, and a diff against the legacy code for easy comparison.
10. A human engineer reviews the PR. They can request changes; the agent iterates.
11. Once the PR is merged, mark the module as "done" in the migration queue, update the progress dashboard (modules done / remaining, coverage trend), and trigger the next module if auto-advance is enabled.

Constraints:
- Never merge without a human approval step: this is non-negotiable for production code.
- Always generate tests before opening a PR; a module with no tests is not considered migrated.
- Keep the migration queue and progress log in an append-only file so engineering leadership can track the effort over time.