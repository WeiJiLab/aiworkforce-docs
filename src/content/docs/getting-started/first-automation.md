---
title: "Run your first automation Job"
description: "Initialize lanes and pipelines from a published board template and follow the first card through a run."
last_verified: "2026-11-18"
prev: false
next: false
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Create a delivery board in your workspace from a published board template. The template defines the lanes, their prompts and tasks, employee requirements, and automation recipes. Assign employees to the required lanes during setup. After initialization, the board maintains its own delivery policy.

<picture>
  <source media="(max-width: 52rem)" srcset="/illustrations/first-workflow/en-compact.svg" />
  <img src="/illustrations/first-workflow/en.svg" alt="Six lanes and nine pipelines in the v3 board template, followed by the steps to initialize a board and inspect a card’s run." />
</picture>

## 1. Choose a published board template

Administrators maintain organization templates under **Admin console → Board templates**. They can also capture a template from an existing board. The illustrated AI Workforce bootstrap template (v3) is a published example with six lanes, nine pipelines, one shared MCP server, and zero shared Skills.

In your workspace, open **Workbench → New delivery project**. Select an available published template in the board wizard. Expand **View the full flow and automations** to see which pipelines belong to each lane. Name the board and check the lane order.

## 2. Assign employees and initialize the board

Choose an available digital employee instance for each required lane. Review the shared MCP servers and Skills selected by the template and adjust them as needed. Connect an external work item source if you need synchronization. Review the configuration and select **Create board**. The board and its configured automations can start once initialization checks pass. [Set up a software factory](/getting-started/first-software-factory/)

## 3. Follow one card through a pipeline run

Open the board and start a requirements session, or bring an issue in from the inbox. Confirm the scope and acceptance criteria, then follow the card. Inspect the target lane’s flow to see its execution nodes. Open the corresponding pipeline run and compare the node statuses and employee session with the card to see how far the work progressed. [Configure a lane pipeline](/automate/workflow-builder/#compose-a-lane-pipeline)

For a standalone task with one employee, create a Job. Run it manually and inspect the result before enabling a schedule. [Compose a Job](/automate/workflow-builder/#compose-a-job)
