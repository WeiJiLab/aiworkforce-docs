Build a Cosmos workflow that triages every new pull request on our GitHub repositories.

Trigger: a webhook fires whenever a pull request is opened or updated.

Steps:
1. Cosmos gathers context: the diff, related files, the repo's conventions and any prior review notes.
2. Run an AI review pass that flags bugs, style issues and risky changes.
3. Decision: "Safe to auto-approve?". Compare the AI confidence score against a configurable threshold:
   - If yes, post an approval review on behalf of Cosmos.
   - If no, request a human review and assign the matching CODEOWNERS.
4. Either path ends by posting a single summary comment on the PR with inline review comments and a checklist.

Keep the flow auditable: every action posts back to the PR so reviewers can see what Cosmos saw, what it decided, and why.