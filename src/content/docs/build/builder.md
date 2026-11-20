---
title: Role template builder
description: Turn a responsibility agreed with a role owner into a draft, check it against sample tasks, then submit the package.
translation:
  source: en
  status: complete
  sourceVersion: "2026-11-20"
---

Open **Role template builder** in the FDE workbench with the agreement from your role interview. In this example the maintainer delegates CI diagnosis and keeps the release decision.

## Start the draft

Select **New role template draft** and enter a **Plugin ID** such as `software-maintainer`. Select **New session** in the builder and give it a requirement you can check against a sample log.

> Identify the failed CI step and cite the log lines that support the finding. If the log is missing, ask the requester for it. Hand production release requests to the maintainer.

Additional sessions use the same plugin ID and keep the earlier sessions and requirement files. The composer shows the requirement worktree path. Once bound, you can open the plugin files from the session. For package contents, see [Agent definition](/build/employee-definition/), [Agent instructions](/build/prompts-rules/) and [Skills and plugins](/build/skills-plugins/).

## Check the work and hand it over

Run **Validate** to check the package structure. Try the three cases in the requirement and compare the answers with the maintainer’s expectations. Ask an administrator to run **Plugin evaluation and regression** when you need a recorded draft regression run. [Role capability tests](/build/agent-tests/)

**Submit build** pushes the validated draft to the configured shared marketplace branch. After indexing, sync the package to a template in **Standard employee marketplace**. The payments team can now create and authorize its own employee and review a diagnosis on its own CI log. [Publishing and distribution](/build/publishing/) · [Create a workspace employee](/getting-started/first-employee/)

## Other starting points

If an existing plugin contains the diagnostic method, choose **Build a role template from this plugin** in the [standard employee marketplace](/build/market/). The builder copies its source to a separate requirement worktree and opens a build session.

If the builder has not been initialized, ask a system administrator to initialize it in **Admin console → Employee marketplace**. Use **Retry initialization** when an initialization step fails.
