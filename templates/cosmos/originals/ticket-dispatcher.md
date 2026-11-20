Build a Cosmos workflow that classifies and routes every new ticket to the right owner before a human reads it.

Trigger: a new ticket is created in Linear, Jira, GitHub Issues, or a connected support desk.

Steps:
1. Parse the ticket. Extract: title, description, reporter, attachments, labels already applied, linked tickets or PRs, and any structured fields (component, version, environment) filled in by the reporter.
2. Classify the ticket. Determine:
   a. **Type**: bug, feature request, question/support, incident, chore/task, or security report.
   b. **Component area**: from a configured list (e.g. authentication, billing, API, data pipeline, frontend, infrastructure, security). Use the description text, labels, and any stack traces or error messages to infer the component if not explicitly set.
   c. **Severity**: P0 (production down / data loss), P1 (major feature broken), P2 (degraded but workaround exists), P3 (cosmetic / minor).
3. Enrich the ticket. Search for related open tickets, recent incidents, and similar closed issues to surface patterns. Add this context as a comment on the ticket.
4. Look up the routing table. Match the type + component + severity combination against the configured routing rules. The routing table maps combinations to: team queue, individual assignee, or escalation path.
5. Decision: "Routing rule matched?".
   - If no match found, route to the configured triage owner (a human) and add an "unrouted" label with a note explaining what classification was applied and why no rule matched.
   - If matched, continue.
6. Assign the ticket. Set the assignee (team or individual), apply the correct priority, set the SLA tier based on severity and support plan, and apply the relevant component label.
7. Notify the assignee via Slack: ticket title, type, severity, one-sentence summary, and a direct link. For P0 and P1 tickets, page the on-call channel.
8. Log the routing decision (ticket id, classification, routing rule applied, assignee, latency) to the dispatcher audit log.

Constraints:
- Never silently discard an unmatched ticket: always escalate to the triage owner with context.
- P0 incidents must page the on-call channel; do not route them only to a Slack DM.
- Keep the routing table in a configuration file (not hardcoded) so it can be updated without a code deploy.