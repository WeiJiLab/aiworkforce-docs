---
title: "Work intake and backlog"
description: "Turn an incoming request into a confirmed draft before any employee changes code."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Intake is how a request becomes a delivery draft. The backlog is the set of drafts and cards a team has not yet accepted into development. Collecting an item is not that acceptance. A feature brief follows [Requirements → card](/software-factory/requirements-to-card/) until the card is confirmed.

## Where requests enter

A workspace Task inbox holds collected or imported requests. An automation can add items when **Collect tasks / issues** is configured and the run records a server receipt. A chat summary is not a saved Issue. Items can also be routed into a workbench project, where they become drafts. See [Task inbox](/user-guide/inbox-tasks/) for how to review and route items.

A draft waits for a person. Confirm the scope, the acceptance criteria, and the repositories the change may touch. Confirming a requirement does not grant repository credentials and does not make an unconfigured pipeline usable. If the criteria are still ambiguous, leave the card as a draft. See [human approval](/user-guide/human-approval/).

## Keep the backlog inspectable

Each item should show its source and its review state. A stable source identity matters when the same source is checked again. An earlier successful collection does not prove the current run updated the item. Items that are not software work stay in the inbox. Do not move them onto a board to make the backlog look complete.

[Requirements writing](/learn/requirements-writing/) is the method for the criteria themselves. [Projects](/user-guide/projects/) is the workbench configuration those cards depend on. The next step after a ready card is [task dispatch](/software-factory/dispatch/).
