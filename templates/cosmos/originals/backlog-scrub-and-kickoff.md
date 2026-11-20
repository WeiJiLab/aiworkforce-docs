Build a Cosmos workflow that scrubs the Linear backlog and then kicks off implementation agents on the top ready-to-build tickets.

Trigger: a weekly schedule (e.g. Monday morning before standup), or manually triggered by an engineer or PM.

Steps:
1. Pull every open, unstarted ticket from Linear or Jira. Include full descriptions, labels, assignees, creation dates, last-updated dates, linked issues, and any related PRs.

── Scrubbing pass ──
2. Detect and merge duplicates. Find tickets with highly similar titles or descriptions. For confirmed duplicates, close the older ticket with a "Duplicate of #X" comment and migrate any useful context into the surviving ticket.
3. Enrich vague tickets. For tickets with a description shorter than a configurable word threshold or with placeholder text ("TBD", "see Slack"), search the codebase and recent Slack/Notion context to add a meaningful description, affected files, and a suggested acceptance criterion.
4. Flag stale tickets. Identify tickets that have been open for longer than a configurable threshold (default: 30 days) with no recent updates. Add a "stale" label and post a comment asking the reporter whether the ticket is still relevant.
5. Re-score priorities. Apply the same scoring model as the backlog-prioritization workflow (impact, effort, urgency, strategic alignment) to any ticket whose score is missing or older than 7 days. Update ticket priority in Linear accordingly.

── Kickoff pass ──
6. Identify the top N ready-to-build tickets (default: N = 3). "Ready to build" means: priority is High or Critical, description is sufficiently detailed, no open blockers, no assignee yet.
7. For each ready-to-build ticket, spawn a PR Author expert session: assign the ticket to the Cosmos agent, create a branch, and start implementation. The PR Author expert follows the standard ticket-to-PR pattern.
8. Post a Slack summary in the team channel:
   - What was cleaned: X duplicates merged, Y vague tickets enriched, Z stale tickets flagged.
   - What was kicked off: list of tickets now being implemented by agents, with links.
   - Optional: post a poll asking the team to react with 👍/👎 on the priority order for the kicked-off tickets.

Constraints:
- Never close a duplicate ticket without migrating its unique context into the surviving ticket.
- Never kick off a PR Author agent on a ticket that has an explicit "needs design" or "blocked" label.
- Always give the team a chance to override: the Slack summary should include a 15-minute window before agents start branching, if the "confirm before kickoff" option is enabled.