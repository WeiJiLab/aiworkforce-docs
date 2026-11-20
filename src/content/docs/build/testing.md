---
title: "Employee testing"
description: "Test an Agent Package with structural validation and a small set of task trials."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Test an employee at three points. Validate the package structure, run draft evaluations before submitting the build, and try the published package on the workspace employee that will use it.

<div id="validate-the-package" aria-hidden="true"></div>

## Validate the Agent Package

Run **Validate** in the builder. Fix missing files, manifest fields, unknown Skill references, conflicting boundaries, and exposed credentials before evaluating the draft.

## Evaluate the current draft

A system administrator can open **Agent evaluation** from the bound build and select **Current draft** under **Build and regression**. Use that draft to run the available evaluation cases before **Submit build**. See [FDE Agent tests](/build/agent-tests/).

## Try three requests

Use the entry skill and the constraints from [agent definition](/build/employee-definition/).

1. **Normal.** Supply the required inputs. The output should match the declared output and cite the sources you provided.
2. **Missing input.** Omit a required input. The employee should ask for it instead of inventing the result.
3. **Out of scope.** Ask for something listed under `non_responsibilities`. The employee should refuse that action.

Repeat the same three requests after you change instructions or skills. Compare the new outputs with the previous ones. If the employee calls a tool, confirm the call was authorized and that the tool result appears in the trace. [Tools](/build/tools/) explains a declaration that never becomes a call.

## Read the instance, not only the file

Create a workspace employee from the published template and refresh **Methods and capabilities**. File edits that never reached the instance will not show up in a session. Test the instance you expect people to use.

Record the template version, the three inputs, and what you accepted. That note is the evaluation evidence for the role until a fuller evaluation workflow exists.
