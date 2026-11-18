---
title: "Employee testing"
description: "Test an employee package with structural validation and a small set of task trials."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Testing an employee means two different checks. Validation tells you the package is structurally complete. A task trial tells you the role behaved on inputs you chose. The [employee builder](/build/builder/) provides **Validate** and **Submit build**. Administrators can also queue a stored suite from [FDE Agent tests](/build/agent-tests/). [Execution evaluation](/software-factory/evaluation/) shows how to judge one delivery task from the records you already have. The three trials below are the hand-run check while you change the package.

## Validate the package

Run **Validate** before **Submit build**. Fix missing files, missing manifest fields, unknown skill references, conflicting boundaries, and exposed credentials. A valid result is not a quality score. Publish only after the trials below match the responsibility.

## Try three requests

Use the entry skill and the constraints from [employee definition](/build/employee-definition/).

1. **Normal.** Supply the required inputs. The output should match the declared output and cite the sources you provided.
2. **Missing input.** Omit a required input. The employee should ask for it instead of inventing the result.
3. **Out of scope.** Ask for something listed under `non_responsibilities`. The employee should refuse that action.

Repeat the same three requests after you change instructions or skills. Compare the new outputs with the previous ones. If the employee calls a tool, confirm the call was authorized and that the tool result appears in the trace. [Tools](/build/tools/) explains a declaration that never becomes a call.

## Read the instance, not only the file

Create a workspace employee from the published template and refresh **Methods and capabilities**. File edits that never reached the instance will not show up in a session. Test the instance you expect people to use.

Record the template version, the three inputs, and what you accepted. That note is the evaluation evidence for the role until a fuller evaluation workflow exists.
