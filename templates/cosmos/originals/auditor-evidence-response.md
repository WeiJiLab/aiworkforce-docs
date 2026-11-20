Build a Cosmos workflow that responds to an auditor's evidence questionnaire end-to-end: ingest the questions, fan out across the landscape's services to collect verifiable evidence with full metadata, build any requested table extracts, and ship a documented report: looping a human in for anything Cosmos cannot answer on its own.

Trigger: an auditor uploads (or forwards) a question form / questionnaire into the system.

Steps:
1. Parse the questionnaire. Structure each ask into a normalized record (id, question, requested format, scope / time window) so every downstream step can address questions individually.
2. Plan evidence sources. An audit-expert agent maps every question to the services in the landscape that can answer it: identity, code repos, ticketing, deploy pipeline, monitoring, data warehouse, HR, finance, etc. Output is a per-question source plan.
3. Connect to services. Cosmos opens read-only sessions against each planned service using the existing service auth (no write scopes, no destructive verbs).
4. Search & collect evidence. For each question, run the planned queries against the mapped services and pull logs, records and approval trails that answer it.
5. Capture action metadata. For every collected artefact, record timestamp, actor (who took the action) and approval (who signed off, when, via which mechanism). Missing metadata is recorded as "not recorded by source", never invented.
6. Decision: "Evidence found?". A question is answered when at least one verifiable artefact exists for it, with the metadata required by the question.
   - If yes, continue to extract / draft.
   - If no, route the question to the open-questions list with the full search trail (systems queried, filters used, time windows) and hand it to a human.
7. Human steers open questions. A reviewer reads the open list, redirects the agent (different system, broader filter, alternate owner) or supplies the missing context, and the workflow loops back through collection for those redirected items.
8. Build requested extracts. For questions that ask for a table or dataset, materialize the extract in the format the auditor asked for: CSV, XLSX, JSON or PDF: and attach it to the question.
9. Draft the answer per question. For each answered question, write a short answer that cites the underlying evidence and metadata (artefact id, system, timestamp, actor, approval).
10. Compile the audit report. One section per question with the drafted answer, the evidence citations and any extract; a separate section lists the still-open questions with the full search trail so the auditor sees exactly what was attempted.
11. Deliver the report to the auditor. Package the document, the extracts and the audit trail and ship it to the auditor's intake channel.

Constraints:
- Read-only access across every service in the landscape: no write, update or delete verbs, ever.
- Never fabricate evidence. When a field (actor, approval, timestamp) is not available from the source system, mark it "not recorded by source" instead of guessing.
- Always preserve the full search trail (systems queried, filters used, time windows) for unanswered questions: that trail is itself audit evidence.
- Every artefact in the report must link back to its source so the auditor can re-verify it independently.
- Do not auto-submit the report to the auditor without human sign-off on the open-questions section.