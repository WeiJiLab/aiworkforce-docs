Build a Cosmos workflow that acts as a persistent maintenance agent for every open pull request.

Trigger: a pull request is opened or updated (subscribe to all PR events: review submitted, CI status changed, base branch updated, merge conflict detected).

Steps: the agent handles three distinct event types:

── Review comment received ──
1. Read the full review. Classify each comment as: a concrete change request (implementable), an open question or design discussion (needs author input), or a nit/optional suggestion.
2. For each concrete change request:
   a. Read the relevant file and the context around the change.
   b. Implement the requested fix: refactoring, renaming, adding tests, updating logic.
   c. Reply to the comment thread: "Done: [one sentence summary of what changed, with the commit link]."
3. For questions or design decisions, flag them in the PR with a comment: "This requires a decision from the author: [the question]." Notify the PR author in Slack.
4. Push the fixes as a single commit with the message "address review: [summary of changes]".

── CI failure on the branch ──
5. Fetch the failure log. Classify as: code error, test failure, lint violation, dependency issue, or flaky infra.
6. If flaky infra: re-trigger once without touching code.
7. If a real failure: implement a targeted fix (same logic as the CI auto-fix workflow), push it, and re-trigger CI.
8. If the fix fails after retry limit: comment on the PR with the diagnosis and assign back to the author.

── Branch behind base / merge conflict ──
9. Rebase the branch on the latest base branch commit.
10. If the rebase completes cleanly: push the rebased branch.
11. If there are conflicts Cosmos can resolve (pure formatting, import order, adjacent non-overlapping changes): resolve them, complete the rebase, and push.
12. If there are semantic conflicts (overlapping logic changes): comment on the PR describing the conflict and assign the rebase to the author.

Constraints:
- Never force-push a branch that is shared with other contributors without confirmation.
- Never implement a review comment that says "let's discuss" or "what do you think": those are discussions, not requests.
- Always reply in the comment thread for every comment actioned, so reviewers see exactly what changed.