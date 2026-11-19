---
title: "Review results and artifacts"
description: "Inspect generated files, file changes, sources, and verification results before accepting work."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-17"
---

An artifact is something an employee produces, such as a report, source file, or linked pull request. Evidence explains why you should trust a claim about that work. Review both before accepting a result.

## Inspect session outputs

Open the employee session and use its artifact resources to find produced files and changed files. Select a file to open its supported preview or source view. When the session has an associated pull request, use the PR entry to inspect it.

A file listed in the session is an output to review. It does not, by itself, prove that the employee used the right input or satisfied the task's acceptance criteria.

## Understand file changes

When the execution environment provides the required versions, the changes view compares files with the version before the session's first run. Inspect the actual edits and check that their scope matches the request.

Some sessions have no usable baseline, overlapping edits, restored files, or an incomplete ending version. The interface explains when a precise comparison is unavailable. In that case, read the full file and obtain additional verification before attributing every change to the session.

Large or binary files may not have an inline diff. Truncated content is a partial view; open the project file through the available file browser when you need the full result.

## Review evidence against criteria

For a research or reporting task, follow source links and check quoted material. For software work, inspect the implementation, test results, and associated review information. Confirm which checks actually ran and what remains unverified.

For inbox items, evidence may include a source URL and an excerpt. Keep that observation separate from a conclusion that the request has been resolved.

## Troubleshooting

If the artifact list fails to load, use its reload action and inspect the reported error. If a preview is unavailable, try the source or project-file view offered by the product. If evidence is missing, ask the employee for the specific source or verification result rather than accepting an unsupported completion claim.

Continue with [Assign a task to a digital employee](/user-guide/agent-chat/), [inbox and tasks](/user-guide/inbox-tasks/), and the [Issue to PR recipe](/recipes/issue-to-pr/).
