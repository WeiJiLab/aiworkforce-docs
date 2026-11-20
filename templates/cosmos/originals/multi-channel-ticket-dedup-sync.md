Build a Cosmos workflow that unifies customer support tickets across every connected channel: detect duplicates the moment a ticket lands, link the matching records in both systems of record, and keep replies and resolutions in sync.

Trigger: a real-time webhook fires whenever a ticket is created in any connected channel: Zendesk, Intercom, email, a tagged Slack thread, or a Salesforce Case. The workflow runs once per inbound ticket.

Steps:
1. Extract metadata from the inbound ticket: customer ID, subject, body, channel, timestamp, and attachment list. Normalise into a single canonical shape so the downstream steps don't have to special-case per channel.
2. Run a channel-API health guard. If the source or any destination channel times out or returns an auth error, queue the sync, retry every 5 minutes with exponential backoff, and only proceed once every channel needed to make a deduplication decision is reachable. After repeated retries, escalate to support ops instead of looping silently.
3. Embed the ticket and rank peers. Compute an embedding of the subject + body, compare it against open tickets across every connected channel, and combine the semantic score with a fuzzy match on the customer ID and subject line.
4. Decision: "Duplicate found?".
   - If yes, continue to the confidence check.
   - If no, open the canonical ticket in the system of record (e.g. Zendesk for a Slack thread that was never escalated), then continue to cross-linking so the source and the canonical ticket are linked from the start.
5. Decision: "Confidence above 70%?".
   - If yes, continue to the merge step.
   - If no, hand the candidate match to a support agent for review and stop the auto-merge. Both tickets stay open until the agent confirms or rejects the merge.
6. Apply the configured merge precedence to pick which ticket is canonical (default order: Salesforce Case > Zendesk > Intercom > email > Slack thread). If both tickets are unresolved, the lower-precedence one is folded into the higher; if one is already resolved, the duplicate is closed and the resolution notes are copied across.
7. Cross-link the records bidirectionally so an agent looking at either ticket sees the other (Zendesk ticket #123 ↔ Slack thread #456, etc.) and the full conversation history is one click away.
8. Mirror agent replies and status changes between the linked tickets in near-real-time. When an agent replies in Zendesk, post the reply on the linked Slack thread (and vice versa); when one ticket closes, close the others and propagate the resolution notes so the customer never sees a stale status.
9. Append every decision (match, confidence score, merge action, manual-review punt) to a dedup audit log so the team can trend duplicate volume by channel and tune the confidence threshold over time.

Constraints:
- Never auto-merge a match below the configured confidence threshold (default 70%): route it to the human review queue instead.
- Never close a ticket without copying the resolution notes and the canonical ticket reference back to the duplicate.
- Always preserve the original channel of contact on the canonical ticket so reporting can attribute the touchpoint.
- Never expose internal customer IDs, account-level secrets, or unredacted PII in cross-channel replies: strip them on the way out.
- Channel-API failures must be retried, queued, and escalated; they must not silently drop a sync.