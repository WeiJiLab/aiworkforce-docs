Build a Cosmos workflow that detects API contract drift on every PR, gates breaking changes behind API-owner approval, and auto-versions safe drift.

Trigger: a webhook on every pull request that modifies API code (routes, controllers, GraphQL schemas, OpenAPI / Swagger files), plus a nightly cron sweep for a full API scan.

Steps:
1. Extract the current API spec from the PR head: parse OpenAPI / Swagger YAML and the GraphQL schema SDL when present, otherwise generate the spec from route annotations (FastAPI auto-docs, Spring REST Docs, Express decorators, etc.). Track each declared API version (`/v1`, `/v2`) as an independent contract.
2. Decision: "Spec extracted?". A spec is extracted when at least one of the supported sources resolves cleanly.
   - If no, alert devops with the framework, the failing parser, and the offending file paths so the toolchain can be fixed, and end. Treat the first successful run as the baseline going forward.
   - If yes, continue.
3. Fetch the baseline spec for each tracked version: pull the spec from the last release tag (`vN.M.P`), falling back to the main-branch spec if no tagged release exists yet.
4. Diff the current spec against the baseline. Per version, enumerate added, removed, and modified endpoints, parameters, request and response schemas, and status codes. Use a structured differ (OpenAPI-diff for REST, GraphQL Inspector for GraphQL) so the deltas are machine-readable.
5. Classify every delta. Breaking: removed endpoint, required field added, type changed, status-code semantics changed, enum value removed, auth scope tightened. Non-breaking: optional field added, new endpoint, new status code on an existing endpoint, deprecation marker added.
6. Decision: "Breaking change?". A change is breaking when at least one delta in the set is classified breaking.
   - If yes, label the PR `breaking-change`, post a comment with the diff summary and migration impact, block the merge until an API-owner review passes, and route to owner approval. On manual override, bump the major version (1.2.3 → 2.0.0) and document the migration path.
   - If no, auto-increment the minor version (1.2.3 → 1.3.0), commit the updated spec file to the PR branch, and continue.
7. On the breaking path, an API owner reviews the diff and either rejects (workflow stops on the block) or approves with a major bump and migration plan attached.
8. On the non-breaking path, the minor bump and updated spec are committed back to the PR.
9. Generate the changelog snippet for the release notes: list added endpoints, deprecated fields, breaking removals, and concrete migration steps. Cite the diff entries that drove each line.
10. Notify registered consumers (when this is an external API): send a webhook to the consumer registry (Postman / Backstage / Slack channel) with the diff, the new version, and the migration guide. Skip silently for internal-only APIs.
11. Store the versioned spec in the API catalog as an append-only artifact, keyed by `{api-name}@{version}`, so historical contracts are auditable for trend dashboards (drift per quarter, breaking-change frequency, MTTR on owner-approval gates).

Constraints:
- Never auto-merge a PR carrying a breaking-change label: owner approval is mandatory, even on manual override.
- Always cite the diff entry behind every changelog line and every `breaking-change` comment so reviewers can audit the classification.
- Track drift per declared API version independently: never collapse `/v1` and `/v2` into a single baseline.
- Keep the API catalog append-only so trend dashboards can be built later; never overwrite a published contract version.
- Never expose internal-only endpoints, hostnames, or auth scopes in the consumer-facing webhook payload.