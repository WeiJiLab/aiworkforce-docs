---
title: "Your first workflow"
description: "Create a Job, run it once by hand, and only then enable a trigger."
sidebar:
  label: Your first workflow
last_verified: "2026-11-18"
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

Start with Build inspection. This scenario summarizes the last 24 hours of CI results and links each finding to its build.

<picture>
  <source media="(max-width: 52rem)" srcset="/illustrations/first-workflow/en-compact.svg" />
  <img src="/illustrations/first-workflow/en.svg" alt="Create an employee from a template, use the Build inspection scenario, check a manual run, then enable its schedule. A board template can also supply a testing lane pipeline." />
</picture>

## 1. Connect a project and choose an employee

Choose a project with CI history in your workspace. Use an existing employee that can read the build results, or create one from a published **employee template** with the role and entry Skill you need. Once initialization finishes, configure the tools and read permissions for the project’s CI records. Ask the employee to read the log of a known build. [Create an employee from a template](/getting-started/first-employee/)

## 2. Create a Job from a scenario template

Open **Automations → New → Create from template**. Search for **Build inspection** and select it. The editor fills in the task instructions and suggests a daily 08:30 schedule. Select your employee, specify the project and build source, and use a fresh session for the first run. The task asks for failed builds, related commits, possible causes, and links to the builds. The same catalog includes **Issue to PR**, **PR risk review**, and **Daily project summary**.

## 3. Check the report and enable the schedule

Run the Job manually and open its run record and session. Pick a known failed build. Follow the report’s link and check the commit and failed step against the build log. If the employee cannot read the log, check its project permissions and run the Job again.

Once the report checks out, confirm the time zone and next scheduled run. Publish the Job and enable automatic execution. Find the next inspection report in the Job’s run history. [Runs and recovery](/automate/runs-recovery/)

## Optional: start a lane pipeline from a board template

To assign cards to a QA employee, open **Workbench → New delivery project** and select a published **board template**. Preview the lanes, pipelines, shared Skills and MCP servers it includes. Assign a ready employee to each required lane. [Set up a software factory](/getting-started/first-software-factory/)

For example, choose a template with a test admission pipeline. Open **Automations → Pipeline**, then select the board and its testing lane. The admission node selects eligible cards and the QA employee tests each one. Check the input mapping between the nodes, enable the pipeline, and run it manually. Open the node records to see which employee received each card. [Configure a lane pipeline](/automate/workflow-builder/#compose-a-lane-pipeline)
