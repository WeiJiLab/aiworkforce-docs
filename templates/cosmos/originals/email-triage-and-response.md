Build a Cosmos workflow that triages high-volume inbound email and sends accurate, context-aware replies.

Trigger: a new email arrives in the monitored inbox (via Gmail / Outlook API, or a forwarding webhook).

Steps:
1. Parse the email. Extract: sender, subject, body text, attachments, thread history if it is a reply, and any structured data (order numbers, invoice IDs, reference codes) mentioned in the body.
2. Classify intent. Categorize the email into one of the configured intents for this organization, for example: order status request, invoice dispute, shipment delay notification, vendor rate confirmation, policy question, complaint, or spam/noise. Assign an urgency level: urgent, standard, low.
3. Pull context. Based on the extracted reference codes and sender identity, query the relevant system (TMS, CRM, ERP, or database) for the matching records: order status, shipment location, account history, outstanding issues.
4. Decision: "Sufficient context to respond?".
   - If no, flag the email as "needs data" and route to a human agent with the gap explained.
   - If yes, continue.
5. Draft a response. Using the organization's tone guidelines and the relevant SOP for this intent, compose a reply that directly addresses the sender's question with the retrieved context. Keep it concise and professional.
6. Run a safety filter. Check the draft for: references to internal-only information, promises that exceed authorised scope (e.g. committing to SLA terms not in the SOP), and any PII that should not be included.
7. Decision: "Routine and within SOP?".
   - If yes, send the reply automatically and log the interaction.
   - If no, hold the draft in a review queue. Notify a human agent in Slack with the draft and the reason it was held.
8. Human agent reviews the held draft. They can approve-and-send, edit-and-send, or reject (which triggers a manual reply path).
9. Log every interaction (email ID, classification, intent, latency, auto-sent or human-approved, response summary) to the audit log.

Constraints:
- Never auto-send responses to complaints, legal notices, or emails flagged as containing dispute language.
- Always cite the source data (order record, shipment status) that the response was based on, in the log if not in the reply.
- Keep response SLAs visible: flag any email that has been in the queue for longer than the configured SLA window.