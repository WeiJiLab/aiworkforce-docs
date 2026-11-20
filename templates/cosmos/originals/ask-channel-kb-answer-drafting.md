Build a Cosmos workflow that turns Slack ask-channel questions into reviewed customer answers and future-proof documentation.

Trigger: a new question is posted in a monitored ask-channel or customer-facing Slack thread.

Steps:
1. Capture the thread context: original question, replies, customer/account if available, mentioned product area, links, screenshots, and any prior answers in the same thread.
2. Classify the request by intent and risk: how-to, troubleshooting, product limitation, bug symptom, pricing/billing, security/compliance, or unknown. Mark high-risk categories for stricter review.
3. Search the public documentation, help center, existing knowledge base, runbooks approved for support use, and recently answered similar questions.
4. Pull only approved internal context when public docs are incomplete. Prefer canonical KB pages, support macros, release notes, and source-owned runbooks over ad hoc Slack opinions.
5. Decision: "Enough trusted context to answer?".
   - If no, route the thread to a human owner with the missing context called out, then resume once the owner supplies the answer.
   - If yes, continue.
6. Draft a concise customer-ready answer. Include direct steps, caveats, links to existing docs, and a friendly acknowledgement. Keep the voice human and avoid internal jargon.
7. Run a safety filter for secrets, unreleased roadmap details, internal-only URLs, infrastructure details, customer data from other accounts, and unsupported commitments.
8. Hold the draft for human review. The reviewer can approve, edit, reject, or ask the agent to revise with specific feedback. Never post externally without approval.
9. Once approved, post the answer back to the original Slack thread or support conversation and log the source links used to create it.
10. Decision: "Would docs prevent this question next time?".
    - If no, log the answered question for analytics and end.
    - If yes, continue.
11. Draft a documentation or knowledge-base update: new FAQ, troubleshooting section, support macro, or public docs PR. Include the sanitized question, proposed answer, source citations, and suggested placement.
12. A documentation owner reviews the proposed update before publish. Track the answer-to-docs loop so repeated questions trend down over time.

Constraints:
- Human approval is mandatory before any customer-visible reply is posted.
- Never expose secrets, internal codenames, private roadmap commitments, or another customer's data.
- Prefer citations to canonical docs and KB sources; if the answer depends on a human SME, record that source for auditability.
- Documentation drafts must be reusable, not a copy of one customer's private thread.