Build a Cosmos workflow that keeps downstream systems in sync whenever a policy or SOP document changes.

Trigger: a push or merge to any file matching a configured policy path pattern (e.g. policies/**, sops/**, customer-rules/**) in the main branch.

Steps:
1. Read the diff. Extract what changed: which rules were added, modified, or removed, and what the intent of the change is (from the commit message and the document context).
2. Identify downstream systems. For each changed rule or policy section, determine which downstream artifacts are affected:
   - Agent prompts (system prompts, few-shot examples, instructions)
   - Routing rules or decision tables
   - Response templates
   - Code logic (conditional branches, validation rules, rate limits)
   - Configuration files (feature flags, model parameters)
3. For each affected artefact, determine the change type:
   - Prompt update: the agent's instructions need rewording to reflect the new policy.
   - Code change: a conditional, a constant, or a validation rule needs updating.
   - Config update: a feature flag or a parameter threshold changes.
4. Decision: "Any changes require code modification?".
   - If yes, implement the code changes on a new branch.
   - Run the relevant unit tests and integration tests for the changed paths.
5. Implement prompt and config updates on the same branch.
6. Decision: "All tests passing?".
   - If no, analyse the failure. Patch and re-run up to the retry limit. If still failing, post a comment on the policy commit explaining the blockage and notify the BA.
   - If yes, continue.
7. Open a pull request with: a summary of the policy change, a table showing each affected artefact and the change type applied, the diff, and the test results.
8. A human reviewer approves and merges. The pipeline is now current.

Constraints:
- Never auto-merge without a human review: policy changes affect live behavior.
- Always produce a mapping table (policy change → affected artefact → change type) in the PR so reviewers can audit the propagation.
- Keep a changelog of policy-driven updates separate from regular engineering commits so compliance audits are easy.