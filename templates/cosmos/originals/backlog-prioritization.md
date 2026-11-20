Build a Cosmos workflow that scores and ranks the open backlog so the team always walks into planning with a data-backed order.

Trigger: a weekly schedule (e.g. Friday afternoon before the Monday planning meeting), or manually triggered on demand.

Steps:
1. Pull all open, unstarted tickets from Linear or Jira. Exclude tickets in "Won't Fix", "Duplicate", or "Blocked on external" status. Include the full description, comments, labels, linked issues, and the reporter.
2. For each ticket, score it across four dimensions (each 1–5):
   a. **User impact**: how many users are affected, and how severely? Use signals: number of upvotes, linked support tickets, affected customer tier, mention frequency in feedback channels.
   b. **Implementation effort**: estimate the complexity and time to implement. Use signals: lines-of-code scope, number of files likely affected, prior similar tickets' cycle time, labels like "large" or "quick-win".
   c. **Urgency**: how time-sensitive is this? Use signals: due dates, SLA commitments, escalations, keyword signals ("P0", "outage", "regression", "legal").
   d. **Strategic alignment**: how closely does this ticket map to the current quarter's strategic goals? Pull the goals from the configured source (Notion, Linear roadmap, or a configured text file) and compute semantic similarity.
3. Compute a weighted priority score. Default weights: impact 35%, urgency 30%, strategic alignment 25%, effort 10% (inversely weighted: lower effort = higher score). Weights are configurable.
4. Rank the backlog by priority score. Group the top 20% as "This sprint", the next 30% as "Next sprint", and the rest as "Later".
5. Generate per-ticket reasoning for the top 20 tickets. For each one, write 1–2 sentences explaining why it ranked where it did.
6. Post the ranked backlog as a structured Slack message or Linear saved view. Include: the tier groupings, each ticket's score and reasoning, and a note on any tickets that were scored low despite high attention (i.e. appear hot but score poorly: a useful signal for the PM).

Constraints:
- Never commit the ranking as final: it is always advisory. Every ticket should include a "override reason" field so the PM can record why they moved something up or down.
- Always show the reasoning alongside the score: a score without explanation is untrustworthy.
- Keep the score history so we can compare rankings week over week and detect drift.