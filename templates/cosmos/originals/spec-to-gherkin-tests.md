Build a Cosmos workflow that converts a PM's spec into runnable tests automatically.

Trigger: a Jira or Linear ticket transitions to "Ready for Development" (or an equivalent status), or a ticket's acceptance criteria section is updated.

Steps:
1. Read the ticket. Extract the full acceptance criteria section, the user story, the scope, and any linked design or technical spec documents.
2. Identify testable criteria. Classify each acceptance criterion as: functional (can be expressed as a Gherkin scenario), non-functional (performance, accessibility: flag separately), or ambiguous (needs clarification from the PM).
3. Decision: "Ambiguous criteria present?".
   - If yes, post a comment on the ticket listing the ambiguous items, tag the PM, and wait for a response before continuing.
   - If no, continue immediately.
4. Generate Gherkin scenarios. For each functional criterion, write one or more Given/When/Then scenarios that are precise, unambiguous, and independent. Cover the happy path plus the most important edge and error cases.
5. Generate executable test code from the Gherkin feature file, using the project's configured test framework and step-definition conventions (Playwright, Cypress, pytest-bdd, Cucumber JVM, etc.). Re-use existing step definitions where they already exist.
6. Run the generated tests in the CI environment against the current codebase.
7. Decision: "All scenarios passing?".
   - If yes, continue.
   - If no, analyse the failure. If the failure is a test code error (wrong selector, assertion mismatch), patch the test and re-run. If the failure is a genuine missing feature (the acceptance criterion is not yet implemented), mark the scenario as "expected-fail / pending" with a TODO comment and continue.
8. Open a pull request with the Gherkin feature file and the step definitions. The PR description links back to the ticket and lists which scenarios are passing, pending, or expected-fail.

Constraints:
- Gherkin scenarios must be written in plain English understandable by the PM: avoid test-framework jargon inside feature files.
- Never mark a genuinely failing functional scenario as "passing": surface it honestly as pending.
- Keep one feature file per ticket so traceability is clear.