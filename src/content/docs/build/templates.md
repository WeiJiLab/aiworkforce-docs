---
title: "Templates"
description: "Use a published template as the starting point for a workspace employee, and know what it does not copy forward."
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-19"
---

A template is a published Agent Package that a workspace can instantiate. It is the unit users see when they create an employee. The package files are what builders edit. Keep those two moments separate.

## What a template should contain

Use [employee architecture](/build/architecture/) as the checklist:

- One role, with responsibilities and exclusions.
- One entry skill and a router that points to it.
- Invocation scenarios a person can recognize.
- Tool and MCP dependencies documented as dependencies, not as embedded secrets.
- A version and a short README that says what the employee will and will not do.

The research assistant used in [agent definition](/build/employee-definition/) and [skills](/build/skills/) is the worked example in this documentation. It is not a downloadable catalog item unless your deployment has published that template. [Example projects](/resources/examples/) points at the same package.

## Create from a template

Users follow [build your first AI employee](/getting-started/first-employee/). They choose the template, name the instance, and wait for initialization. Some templates offer connection choices. Those choices configure the instance. They do not let the user rewrite the role.

If no template fits, do not stretch an unrelated template with a long prompt. Ask a builder to publish a narrower one. A prompt can add task context. It should not be the only place the responsibility exists.

## Change control

Changing a template affects employees created from it afterward. It does not prove existing instances changed. Record the template version in the handoff to the team. When a capability is missing on an instance, compare the instance's applied package with the template you think they used before editing either one.
