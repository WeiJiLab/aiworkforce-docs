---
title: "Issue to PR"
description: "Turn a reviewed inbox Issue into a scoped delivery card and inspect its code and verification results."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

This recipe follows a small defect from the workspace inbox to a delivery card and its code review evidence. Use a low-impact change such as correcting a validation message. The goal is a traceable change whose requirements and verification can be inspected.

## Prerequisites

You need a workspace with an execution employee, an Issue that supports development delivery, and a configured workbench project. Its repositories, lane employees, and any required test pipelines must be ready. Workspace credentials must be explicitly authorized for the execution employees that need them.

## 1. Inspect the Issue

Open the workspace's **Inbox** from workspace management. Read the source, description, and observations. Confirm that the problem is reproducible and that this Issue belongs to the intended workspace.

For example, describe the current validation message, the expected replacement, and the screen where it appears. Include steps that someone else can use to verify the result. If the Issue was collected by an Automation, inspect its collection receipt rather than relying only on the run's chat summary.

## 2. Route it to a workbench draft

Use the Issue's workbench routing action and choose the intended project. Confirm the destination. The resulting card is a **draft awaiting human confirmation**; moving an Issue does not authorize immediate development.

Open the linked draft and clarify:

- The exact behavior to change and what is outside scope.
- Acceptance criteria that can be checked.
- The repositories that may be modified.

Complete the requirements confirmation through the card's current human request. If clarification is still needed, answer in the associated requirements session.

## 3. Follow the execution

Open the delivery workbench and inspect the card's progress and execution sessions. Configured lane orchestration picks up ready work. Watch for questions, approvals, permission failures, or test failures and respond to the recorded blocker.

If manual investigation is needed, take over and keep a written decision. Hand the work back explicitly after resolving the blocker. A shared batch may include other cards, so review its members before batch operations.

## 4. Review the code and evidence

Open the card's deliverables and follow the recorded branch, commit, or PR reference. Review the actual diff and test results against the confirmed acceptance criteria. PR availability depends on the configured code-host integration and delivery path; use the actual recorded reference.

Continue to inspect merge and release results if the project is configured to perform them. A linked PR or an employee's completion message does not by itself prove that testing, merge, or production release finished.

## Related guides

- [Software Factory overview](/software-factory/overview/)
- [Inbox and tasks](/user-guide/inbox-tasks/)
- [Artifacts and evidence](/user-guide/artifacts-evidence/)
