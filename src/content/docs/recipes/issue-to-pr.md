---
title: "Issue to PR"
description: "Turn a reviewed inbox Issue into a scoped delivery card and inspect its code and verification results."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

This recipe follows a small defect from the workspace inbox to a delivery card and its code review evidence. Use a low-impact change such as correcting a validation message. The goal is a traceable change whose requirements and verification can be inspected.

## Prerequisites

You need a workspace with an execution employee, an Issue that supports development delivery, and a configured workbench project. Its repositories, lane employees, and any required test pipelines must be ready. Workspace credentials must be explicitly authorized for the execution employees that need them.

## 1. Inspect the Issue

Open the workspace's **Inbox** from workspace management. Read the source, description, and observations. Confirm that the problem is reproducible and that this Issue belongs to the intended workspace.

For example, the project form shows “Invalid input” when you submit it with an empty name. Record the form, the steps to reproduce the issue, and the expected message, “Enter a project name.” If an Automation collected the Issue, open its collection receipt for the source details.

## 2. Route it to a workbench draft

Use the Issue's workbench routing action and choose the intended project. Confirm the destination. The resulting card is a **draft awaiting human confirmation**; moving an Issue does not authorize immediate development.

Open the linked draft and clarify:

- The exact behavior to change and what is outside scope.
- Acceptance criteria that can be checked.
- The repositories that may be modified.

For the message fix, confirm that submitting an empty name displays “Enter a project name.” and that submitting a valid name still succeeds.

Complete the requirements confirmation through the card's current human request. If clarification is still needed, answer in the associated requirements session.

## 3. Follow the execution

Open the delivery workbench and inspect the card's progress and execution sessions. Configured lane orchestration picks up ready work. Watch for questions, approvals, permission failures, or test failures and respond to the recorded blocker.

If manual investigation is needed, take over and keep a written decision. Hand the work back explicitly after resolving the blocker. A shared batch may include other cards, so review its members before batch operations.

## 4. Review the code and evidence

Open the card's deliverables and follow the recorded code reference. Depending on the project's code-host integration and delivery path, this may be a branch, a commit, or a PR. Review the diff against the confirmed scope. For the message fix, check both submissions in the project's test environment and record the environment, the exact commit tested, and the result for each criterion. If the project tests a batch candidate, record the revision it deployed for testing.

If a check fails, return the change for repair with the reproduction steps and test result. After a fix, rerun the checks on the new commit and link the new result. Record the review decision with the evidence for that revision.

If the project also handles merge and release, check their records separately. Confirm which revision reached production, then check the cleanup result. See [Review and release](/software-factory/review-release/) for what to check at each stage.

## Related guides

- [Software Factory overview](/software-factory/overview/)
- [Inbox and tasks](/user-guide/inbox-tasks/)
- [Evidence and trace](/software-factory/evidence/)
