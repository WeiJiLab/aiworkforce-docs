---
title: "Example projects"
description: "Use the documented research-assistant package as a worked example. This site does not ship a downloadable catalog."
status: limited
sidebar:
  badge:
    text: Limited
    variant: caution
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-18"
---

The worked example in this documentation is a research assistant that prepares a brief from supplied materials and refuses to publish them. It is an illustration of the package layout, not a template your deployment has necessarily published, and not a repository you can clone from this site.

## What the example contains

```text
research-assistant/
├── .claude-plugin/plugin.json
├── .aiworkforce/employee.yaml
├── .aiworkforce/router.md
├── README.md
└── skills/main/SKILL.md
```

Read it in this order:

1. [Employee architecture](/build/architecture/) for the parts.
2. [Employee definition](/build/employee-definition/) for the role chain and the manifest fields.
3. [Skills](/build/skills/) for `SKILL.md`.
4. [Employee testing](/build/testing/) and [agent evaluation](/software-factory/evaluation/) for the three requests and the evaluation cases.

## What is not in the catalog

There is no marketplace, no zip download, and no promise that the example's `id` exists in your workspace. Publish a package through [publishing and distribution](/build/publishing/) when a builder has validated it. Users then create an instance from that published template.

For an end-to-end engineering path, use [Issue to pull request](/recipes/issue-to-pr/) and [your first Software Factory workflow](/getting-started/first-software-factory/). Those guides follow product records. They are not additional sample repositories.
