Build a Cosmos workflow that turns meeting notes into tracked Linear work and, when appropriate, a linked implementation PR.

Trigger: meeting notes, a transcript, or a recording summary is added to the monitored workspace after a planning, customer, support, incident, or engineering sync.

Steps:
1. Parse the meeting artifact. Extract attendees, teams mentioned, decisions, open questions, action items, customer names if present, deadlines, impacted product areas, links, screenshots, and any explicit owners.
2. Normalize each actionable item into a candidate work item with: title, problem statement, expected outcome, source meeting link, evidence snippets, proposed priority, and whether it looks like a bugfix, product change, docs task, investigation, or follow-up.
3. Search Linear for existing tickets that match the same customer, product area, bug symptom, feature request, or decision. Include recently closed tickets and duplicates in the search.
4. Decision: "Matching ticket already exists?".
   - If yes, update the existing ticket with the meeting summary, new decisions, owner hints, acceptance criteria, and links back to the notes. Do not create a duplicate.
   - If no, create a new Linear ticket with the normalized title, context, acceptance criteria, source links, labels, priority, and team.
5. Assign or recommend the right owner by combining explicit meeting owners, CODEOWNERS, service ownership, recent commit history, Linear team ownership, and prior related tickets. If confidence is low, route to the team's triage queue instead of assigning directly.
6. Decision: "Ready for implementation?".
   - If it is only a discussion, research task, roadmap idea, or ambiguous follow-up, leave it as a tracked Linear ticket and stop.
   - If it is a clear bugfix or scoped product/code change, continue.
7. Ask the PR Author agent to start the implementation. It creates a branch, gathers codebase context, makes the change, writes or updates tests, and opens a draft PR.
8. Link the PR back to the Linear ticket, add the ticket ID to the PR title/body, and copy the implementation summary, test plan, risks, and remaining questions into Linear.
9. Human reviewer checks the PR and Linear ticket. The agent iterates on requested changes, keeps the ticket updated, and marks it ready for merge only after review.
10. Post a concise meeting follow-up summary with links to the updated tickets and PRs so attendees can see what was captured and what still needs human decision.

Constraints:
- Never create duplicate tickets when an existing Linear issue covers the same work; update and link instead.
- Do not auto-assign when ownership confidence is low or when the meeting notes contradict repository ownership signals.
- PR Author should only start work for implementation-ready bugfixes or scoped changes with enough acceptance criteria.
- Always preserve traceability from meeting notes to Linear ticket to PR and back.