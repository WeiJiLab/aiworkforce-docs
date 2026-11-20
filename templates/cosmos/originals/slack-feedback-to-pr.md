Build a Cosmos workflow that turns a Slack feedback message into a merged pull request with no human filing anything.

Trigger: a new message is posted in a designated feedback Slack channel (e.g. #feedback-billing, #feedback-search).

Steps:
1. Classify the message. Determine whether it is a genuine bug, a feature/enhancement request, a documentation gap, or noise (thank-you, off-topic, duplicate intent). If it is noise, react with an emoji and end.
2. Enrich the feedback. Search the codebase and recent commit history for the area of code most likely responsible. Pull any related existing tickets that are already open or recently closed for the same area.
3. Decision: "Duplicate of an existing open ticket?".
   - If yes, link the Slack message to the existing ticket, notify the reporter, and end.
   - If no, continue.
4. Open a ticket in Linear or Jira with a clear title, a description derived from the feedback message, the affected area, the enriched codebase context, and a link back to the Slack message. Assign a severity and initial priority.
5. Assign the ticket to an implementation agent (or the relevant team queue). The agent creates a new branch, implements the fix or enhancement, writes tests, and self-reviews the diff.
6. The agent opens a pull request against the main branch, with the ticket reference in the title, a summary of what changed, and a checklist of the acceptance criteria from the ticket.
7. A human maintainer reviews the PR. They can request changes; the agent iterates.
8. Decision: "PR approved and merged?".
   - If no, loop back to the revision step.
   - If yes, continue.
9. Post a reply in the original Slack thread: "Shipped in [PR link]: [one-sentence summary of the change]." React with ✅.

Constraints:
- Never implement a change that touches auth, billing, or data-deletion paths without a human review step flagged explicitly in the PR.
- Always link ticket ↔ PR ↔ Slack message so the chain of evidence is traceable.
- Keep the feedback triage log append-only for trend analysis (volume, category, area, cycle time).