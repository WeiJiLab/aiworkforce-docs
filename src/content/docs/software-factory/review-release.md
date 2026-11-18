---
title: "Review and release"
description: "Follow code, verification, merge, production release, and cleanup evidence while making explicit human decisions."
sidebar:
  label: Review and release
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

Review establishes whether a particular change satisfies its confirmed requirement. Release establishes whether the accepted change reached the intended environment. This page is that delivery flow. The rules for which recorded result may move a card, and which waiver is valid, are [release governance](/software-factory/release-governance/).

## Prepare a reviewable change

Open the card in the delivery workbench and read its current requirement, acceptance criteria, editable repositories, and execution records. Follow the recorded branch, commit, or PR reference. Confirm that the code you are reviewing is the code covered by the evidence.

Start with scope: does the change solve the agreed problem, and did it modify anything outside the permitted boundary? Then examine behavior: normal input, missing input, permissions, and failure cases relevant to the criteria. Ask for focused evidence where the record is incomplete.

## Read the delivery stages separately

The built-in delivery flow records several outcomes:

| Stage              | What to inspect                                                            |
| ------------------ | -------------------------------------------------------------------------- |
| Development        | Code references, changed files, employee summary, and performed checks.    |
| Test release       | Candidate batch membership, repositories, and configured test deployment.  |
| Test verification  | Results for member cards and the revision or candidate actually exercised. |
| Merge to main      | The recorded merge result for the passing batch.                           |
| Production release | Release results recorded for merged cards and their repositories.          |
| Resource cleanup   | Cleanup outcome after production release; failures may need retry.         |

After a successful merge, the batch closes. Production release proceeds by scanning merged cards, and resource cleanup follows through the Done lane. A closed batch therefore does not, by itself, mean production release or cleanup finished. Custom boards may use a different arrangement; follow the configured lanes and records.

## Make a precise human decision

When the card presents a question or approval request, read its subject and scope before answering. Approving requirements confirms that revision of the requirement; approving a release action concerns that action. Neither substitutes for the other.

Useful responses name the decision, its scope, and supporting evidence. For example: “Approve the stated requirements for the frontend repository only; preserve the current server naming policy.” If a test is intentionally waived, name the exact check, reason, affected scope, and unresolved risk rather than saying only “continue.”

A batch-level response can resume all member cards. Review batch membership before approving or retrying shared work. Submission continues execution; downstream verification and flow rules still determine the final result.

## Handle a blocked or rejected change

Use the current blocker and execution record to decide whether the employee needs clarification, a corrected credential, a code fix, or manual investigation. Tests that fail can return work to development under the configured flow. Avoid creating parallel repair sessions without first checking the active execution.

If a person takes over, record what was done and explicitly hand work back through the available recovery action when ready. Resuming a pause does not clear a takeover. Ending the platform's PR follow-up does not close an external PR and leaves the card in manual handling until it is handed back.

## Report what actually shipped

State which requirement and code reference were verified, which checks ran, and what the release record confirms. If merge succeeded but deployment failed, report those as separate outcomes. If cleanup failed after a successful release, keep the cleanup issue visible without misdescribing the release result.

Automated merge and release require the project's actual code-host and pipeline integrations, execution resources, and employee authorizations. The presence of a delivery card supplies none of those permissions by itself.

This page stays the review path. The records around it are [evidence and trace](/software-factory/evidence/), [quality gates](/software-factory/quality-gates/), and [release governance](/software-factory/release-governance/).

Continue with [Software Factory overview](/software-factory/overview/), [Issue to PR](/recipes/issue-to-pr/), and [feedback review](/learn/feedback-review/).

## Further reading

For another product's approach to separating implementation, review, and merge, see [Augment's PR → Merge guide](https://docs.augmentcode.com/cosmos/software-factory/pr-to-merge). The stage and recovery behavior above describes AI Workforce.
