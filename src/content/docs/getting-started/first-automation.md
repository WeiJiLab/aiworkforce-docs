---
title: "Follow the first run on a delivery board"
description: "Initialize lanes and pipelines from a published board template and follow the first card through a run."
last_verified: "2026-11-20"
prev: false
next: false
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Create a delivery board in your workspace from a published board template. The template defines the lanes, their prompts and tasks, employee requirements, and automation recipes. Assign employees to the required lanes during setup. After initialization, the board maintains its own delivery policy.

<picture>
  <source media="(max-width: 52rem)" srcset="/illustrations/first-workflow/en-compact.svg" />
  <img src="/illustrations/first-workflow/en.svg" alt="Delivery lanes in a board template and the steps to assign employees, initialize the board, and follow a card." />
</picture>

## 1. Choose a published board template

Administrators maintain organization templates under **Admin console → Board templates**. They can also capture a template from an existing board.

In your workspace, open **Workbench → New delivery project**. Select an available published template in the board wizard. Expand **View the full flow and automations** to see which pipelines belong to each lane. Name the board and check the lane order. The [BoardFlow templates](/software-factory/templates/) guide lists the ten curated scenarios and their handoff artifacts.

## 2. Assign employees and initialize the board

Choose an available digital employee instance for each required lane. Review the shared MCP servers and Skills selected by the template and adjust them as needed. Connect an external work item source if you need synchronization. Review the configuration and select **Create board**. After successful initialization, the board activates with its configured automations. [Set up a software factory](/getting-started/first-software-factory/)

## 3. Follow one card through a pipeline run

Open the board and start a requirements session or create a draft from **Task inbox**. Review scope and acceptance criteria and answer any requested confirmation. The standard intake orchestration can move clarified cards automatically. Use **Lane flow** to locate the orchestration run and compare its nodes and session with the card. See [Workflow builder](/automate/workflow-builder/#compose-a-lane-pipeline).

For a standalone task with one employee, create a Job. Run it manually and inspect the result before enabling a schedule. [Compose a Job](/automate/workflow-builder/#compose-a-job)
